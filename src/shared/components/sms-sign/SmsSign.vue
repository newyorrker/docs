<template>
    <div class="sms-sign">
        <p class="sms-sign__title">Введите код из SMS</p>
        <div class="sms-sign__input">
            <p>Мы отправили код подтверждения на номер:</p>

            <div class="sms-sign__code">
                <input v-for="(value, index) in Object.keys(input)"


                @input="inputHandler($event, index)"
                @keydown="filterKeyDown($event, index)"
                    :value="input[value]"
                    :key="value" type="number"
                    ref="inputs" />
            </div>

            <div class="sms-sign__troubleshooting">
                <p>Не пришло SMS? <a href="">Отправить повторно через 1:39</a></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SmsSign',
  components: {

  },
//   props: {
//     simplePror: {
//       required: true,
//       type: Array as () => SomeTypeInterface[]
//     }
//   },
  data() {
    return {
        input: {
            "0": "",
            "1": "",
            "2": "",
            "3": "",
        } as Record<string, string>
    }
  },
  methods: {
    inputHandler(e: Event, index: number) {
        let value = (e.target as HTMLInputElement | null)?.value;
        const refs = this.$refs as Record<"inputs", HTMLElement[]>;

        if(value && value.length > 1) {
            this.paste(value, index);
            return;
        }

        if(typeof refs === "object") {
            if(value) {
                refs.inputs[index + 1]?.focus();
            }
        }

        this.input[index] = value ?? "";
    },
    filterKeyDown(e: KeyboardEvent, index: number) {

        const refs = this.$refs as Record<"inputs", HTMLElement[]>;

        if (e.key !== undefined) {
            const isControlOrMEta = (e.ctrlKey || e.metaKey);
            const isPaste = e.key === 'v' && isControlOrMEta;
            const isSelectAll = e.key === 'a' && isControlOrMEta;
            if(isPaste || isSelectAll) {
                return;
            }

            const value = (e.target as HTMLInputElement | null)?.value;
            const key = e.key;
            const controlButtons = key === 'Backspace' || key === 'Delete' || key === "Meta" || key === "Control";
            const moreThen1Char = value?.length ?? 0 > 0;

            if(key === 'Backspace') {
                if(!this.input[index]) {
                    refs.inputs[index - 1]?.focus();
                }
            }

            if(moreThen1Char && !controlButtons) {
                refs.inputs[index + 1]?.focus();
                e.preventDefault();
            }

        } else if (e.which !== undefined || e.keyCode != undefined) {
            throw Error("event.key is not supported")
        }
    },
    paste(value: string, index: number) {
        const splitedValue = value.split("");
        const sclicedValues = splitedValue.slice(0, 4);

        Object.keys(this.input)
        .slice(index)
        .forEach((item, index) => {
            this.input[item] = sclicedValues[index]
        });
    }
  }
})

</script>

<style lang="scss">
.sms-sign {
    &__title {
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
        color: #373737;
    }

    &__input {
        & > p {
            font-size: 12px;
            line-height: 150%;
            color: #6D6D72;
        }
    }

    &__troubleshooting {
        p {
            font-size: 12px;
            line-height: 14px;
            color: #9E9E9E;
        }

        a {
            color: #6D6D72;
        }
    }

    &__code {
        display: flex;
        justify-content: center;

        input {
            width: 46px;
            border: 1px solid #C8C7CC;
            border-radius: 4px;
            background-color: transparent;
            font-size: 24px;
            color: #373737;
            text-align: center;
            padding: 12px 0;
        }

        input + input {
            margin-left: 16px;
        }

        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Firefox */
        input[type=number] {
            -moz-appearance: textfield;
        }
    }
}
</style>