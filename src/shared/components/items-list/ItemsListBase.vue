<script lang="ts">
import MobileAppButtonType from "@/types/MobileAppButtonType";
import { PagingStateInterface } from "@/types/PagingStateInterface";
import { Vue, Component } from "vue-property-decorator";

@Component({ components: {  }})

export default class ItemsList<T> extends Vue {
  items: T[] = [];

  showFilter = false;

  pagingState: PagingStateInterface = {
    skip: 0,
    take: 20
  }

  isLoading = false;
  isOnRefresh = false;
  loaded = false;

  isError = false;

  mounted() {
    window.clickButton = this.buttonClicked;

    this.getList();
  }

  destroyed() {
    window.clickButton = undefined;
  }

  getList(loadMore = false): Promise<boolean> {
    throw Error("Not implemented error.")
  }

  buttonClicked(button: MobileAppButtonType) {
    throw Error("Not implemented error.")
  }

  async loadMore(done: (noMore: boolean) => void) {
    if(this.isError) {
      done(true);
      return;
    }
    const res = await this.getList(true);
    done(res);
  }

  async refresh(done: () => void) {
    try {
      this.isOnRefresh = true;

      await this.getList();
      done();
    }
    catch(e) {
      this.$store.dispatch('reportError', e);
    }
    finally {
      this.isOnRefresh = false;
    }
  }

  resetEasyRefreshScroll() {
    this.$nextTick(() => {
      const easyRefresh = this.$refs.easyRefresh;
      if(easyRefresh) {
        //@ts-ignore
        easyRefresh.onResize();
      }
    })
  }

  get showList() {
    return this.loaded;
  }

  get showSkel() {
    return this.isLoading && !this.isOnRefresh;
  }
}

</script>
<style lang="scss">
.documents-list {
  height: 100%;
  position: relative;

  &__refresh_error {
    .v-easy-refresh-body > div {
      height: 100%;
    }
  }

  &__list {
    & > div {
      border-top: 1px #C8C7CC solid;
      border-bottom: 1px #C8C7CC solid;
    }

    & > div:first-child {
      border-top: 0;
    }

    & > div:last-child {
      border-bottom: 0;
    }

    & > div + div {
      margin-top: 10px
    }
  }

  &__list_bordered {
    border-bottom: 1px #C8C7CC solid;
  }

  &__list + &__skel {
    border-top: 1px #C8C7CC solid;
  }

  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 18px;
  }

  &__filter {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }

  &__web-filter-toggle-button {
    position: absolute;
    bottom: 0;
  }
}
</style>