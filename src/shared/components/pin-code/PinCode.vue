<template>
    <div class="sms-sign" :class="{'sms-sign_error': error}">
        <p class="sms-sign__title">Введите код из SMS или E-mail</p>
        <div class="sms-sign__input">
            <p>Мы отправили код подтверждения на номер:</p>

            <div class="sms-sign__code">
                <input v-for="(currentValue, index) in value"

                @input="inputHandler($event, index)"
                @keydown="filterKeyDown($event, index)"
                    :value="currentValue"
                    :key="index" type="number"
                    inputmode="numeric"
                    ref="inputs" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ components: {  }})

export default class PinCode extends Vue {

    @Prop() value: string[];
    @Prop({default: false}) error: boolean;

    mounted() {
        const inputs = this.getInputRefs();
        console.dir(inputs?.[0]);
        inputs?.[0]?.focus();
        inputs?.[0]?.click();
    }

    inputHandler(e: Event, index: number) {
        let value = (e.target as HTMLInputElement | null)?.value;

        this.input(value, index);
    }

    input(value: string | undefined, index: number) {
        const inputs = this.getInputRefs();

        //paste
        if(value && value.length > 1) {

            this.paste(value, index);
            return;
        }

        if(typeof inputs === "object") {
            if(value) {
                inputs[index + 1]?.focus();
            }
        }

        const result = this.value.map((item, i) => i === index ? value : item);

        this.$emit('input', result);
    }

    getInputRefs() {
        return (this.$refs as Record<"inputs", HTMLElement[]> | undefined)?.inputs;
    }

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
            const moreThen1Char = (value?.length ?? 0) > 0;
            const isE = key === "e";

            if(key === 'Backspace') {
                if(!this.value[index]) {
                    refs.inputs[index - 1]?.focus();
                }
            }

            if((moreThen1Char || isE) && !controlButtons) {
                if(!isE) {
                    refs.inputs[index + 1]?.focus();
                    this.input(key, index);
                }
                e.preventDefault();
            }

        } else if (e.which !== undefined || e.keyCode != undefined) {
            throw Error("event.key is not supported")
        }
    }

    paste(stringValue: string, index: number) {
        const splitedValue = stringValue.split("");
        const neededCharLength = this.value.length - index;
        const sclicedValues = splitedValue.slice(0, neededCharLength);
        const endItemIndex = sclicedValues.length + index - 1;

        /**
         * start change values after index
         * and subtract from current index (i) index from arguments because length of sclicedValues less then length of this.value array
         */
        const result = this.value.map((item , i) => (i >= index) ? sclicedValues[i - index] : item);

        this.getInputRefs()?.[endItemIndex].focus();
        this.$emit('input', result);
    }
}

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

        input:focus, input:focus-visible {
            outline: none;
            border-color: #FFB400;
        }

        input + input {
            margin-left: 8px;
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

.sms-sign_error {
    .sms-sign {
        &__code {
            input {
                outline: none;
                border-color: #FF5249;
            }
        }
    }
}
</style>