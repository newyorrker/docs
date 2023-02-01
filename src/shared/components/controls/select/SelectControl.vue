<template>
  <div class="selector" :class="{ 'is-active': active }">
    <div class="selector__label" :class="{ 'is-placeholder': !selected }" v-show="!active" @click="onFocus">
      {{ label }}
    </div>
    <input
      type="text"
      @focus="onFocus"
      @input="onSearchInput"
      :value="search"
      ref="input"
      :placeholder="currentPlaceholder"
      v-if="active"
    />
    <div class="selector__arrow" @click="onFocus" v-show="!isLoading">
      <arrow />
    </div>
    <!-- <div class="selector__spinner" v-if="isLoading">
      <spinner></spinner>
    </div> -->

    <div class="selector__items">
      <div
        class="selector__item"
        v-for="item in filteredList"
        :key="item.id"
        :class="{ 'is-selected': isSelected(item) }"
        @click="select(item)"
      >
        {{ item.title }}
      </div>
      <template v-if="!isLoading">
        <div class="selector__item is-non-selectable" v-if="showNotFound">Не найдено</div>
        <div class="selector__item is-non-selectable" v-if="showAjaxHint">Введите несколько символов для начала поиска</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

import { SelectorItem } from './types';
import Arrow from './icons/arrow.vue';

@Component({
  components: { Arrow },
})
export default class Selector extends Vue {
  @Prop({ required: true }) value: any;
  @Prop({ default: '' }) placeholder!: string;
  @Prop({ default: () => [] }) items!: SelectorItem[];
  @Prop({ default: false }) selectModel!: boolean;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: false }) isLoading!: boolean;
  @Prop({ default: false }) isAjax!: boolean;
  @Prop({ default: 'id' }) selectField!: string; //field which will be emitted

  active: boolean = false;
  search: string = '';
  selected: SelectorItem | null = null;
  blockSearchEmit: boolean = false;
  previousEmitValue: string = '';
  isTyping: boolean = false;
  typingTimeout: number = 0;

  get showNotFound() {
    if (this.isLoading || (this.isAjax && this.isTyping)) return false;
    return this.active && this.filteredList.length == 0 && (this.search || !this.isAjax);
  }

  get showAjaxHint() {
    return this.active && this.filteredList.length == 0 && !this.search && this.isAjax;
  }

  mounted() {
    if (this.value) {
      this.setSelected();
    }
  }

  @Watch('search')
  onSearchChange(newValue: string, oldValue: string) {
    if (this.blockSearchEmit) {
      this.blockSearchEmit = false;
      return;
    }
    if (newValue != oldValue && this.previousEmitValue.substring(0, 3) != this.search.substring(0, 3)) {
      this.$emit('searchChanged', this.search);
      this.previousEmitValue = this.search;
    }
  }

  get currentPlaceholder() {
    return this.placeholder;
  }

  get label() {
    if (this.selected && this.selected.title) {
      return this.selected.title;
    }
    return this.placeholder;
  }

  @Watch('value')
  onValueChange() {
    this.setSelected();
  }

  @Watch('items')
  onItemsChange() {
    this.setSelected();
  }

  onSearchInput(event: any) {
    clearTimeout(this.typingTimeout);
    this.search = event.target.value;
    this.isTyping = true;
    this.typingTimeout = setTimeout(() => {
      this.isTyping = false;
    }, 500);
  }

  get normalizedList() {
    return this.items.map(item => {
      if (typeof item == 'string') {
        return { id: item, title: item };
      }
      return item;
    });
  }

  get filteredList() {
    if (this.isAjax && this.search.length == 0) return [];
    const pieces = this.search
      .toLowerCase()
      .trim()
      .split(' ');
    return this.normalizedList.filter((item: any) => {
      let currentTitle = item.title.toLowerCase(),
        result = true;
      pieces.forEach(item => {
        result = result && currentTitle.indexOf(item) >= 0;
      });
      return result;
    });
  }

  setSelected() {
    if (this.selectModel) {
      this.selected = this.value;
    } else {
      const selectedItem = this.normalizedList.find((item: any) => {
        return item[this.selectField] == this.value;
      });
      selectedItem && (this.selected = selectedItem);
    }
  }

  isSelected(item: SelectorItem) {
    if (this.selectModel) {
      return this.value && this.value.id && item.id == this.value.id;
    }
    return item.id == this.value;
  }

  onFocus() {
    if (!this.disabled) {
      this.active = true;
      this.$nextTick(() => {
        if (this.isAjax) {
          this.$refs.input && (this.$refs.input as any).focus();
        }
      });
      setTimeout(() => {
        document.addEventListener('click', this.documentClick);
      }, 500);
    }
  }

  documentClick(e: MouseEvent) {
    if (this.isSelectorElement(e.target as HTMLElement)) {
      return;
    }
    this.blur();
    document.removeEventListener('click', this.documentClick);
  }

  select(item: SelectorItem) {
    if (this.selectModel) {
      this.$emit('input', item);
    } else {
      this.$emit('input', (item as any)[this.selectField]);
    }
    this.$emit('changed', item);
    this.selected = item;
    //this.search = item.title
    this.blur();
  }

  blur() {
    this.blockSearchEmit = true;
    this.search = '';
    this.$refs.input && (this.$refs.input as any).blur();
    this.active = false;
  }

  isSelectorElement(element: HTMLElement) {
    let result = false,
      current = element;
    while (current) {
      result = current == this.$el;
      if (result) {
        break;
      }
      current = current.parentNode as HTMLElement;
    }
    return result;
  }
}
</script>

<style lang="scss">
@import './styles';
</style>
