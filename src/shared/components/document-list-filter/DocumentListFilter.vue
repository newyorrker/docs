<template>
    <div class="document-list-filter">
        <!-- HEADER -->
        <header>
            <div class="document-list-filter__reset">
                <button>Сбросить</button>
            </div>
            <div class="document-list-filter__title">
                <span>Фильтр</span>
            </div>
            <div class="document-list-filter__close">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                        <path fill="#373737" d="M7.05 5.636 18.364 16.95l-1.414 1.414L5.636 7.05z"/>
                        <path fill="#373737" d="m16.95 5.636 1.414 1.414L7.05 18.364 5.636 16.95z"/>
                    </svg>
                </button>
            </div>
        </header>

        <!-- MAIN -->
        <main>
            <section class="document-list-filter__date">
                <p>Период публикации</p>
                {{ date1 }}
                <div class="document-list-filter__date-container">
                    <date-input v-model="date1" :value="date1"/>
                    —
                    <date-input v-model="date2" :value="date2"/>
                </div>
            </section>
            <section class="document-list-filter__status">
                <p>Статус</p>

                <ul>
                    <li>
                        <button>Подписан</button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path stroke="#EE8056" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 9.3 5.31 5.2L15 1.5"/></svg>
                    </li>
                    <li>
                        <button>Отклонен</button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path stroke="#EE8056" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 9.3 5.31 5.2L15 1.5"/></svg>
                    </li>
                </ul>

            </section>
        </main>

        <footer>
            <button-1>Применить</button-1>
        </footer>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import DateInput from "@/shared/components/controls/date-input/DateInput.vue";
import Button1 from "@/shared/components/controls/buttons/Button1.vue";
// import s from './style.module.scss'


export default defineComponent({
  name: '',
  components: {
    DateInput, Button1
  },
  data() {
    return {
        date1: "",
        date2: ""
    //   s,
    }
  }
})

</script>

<style lang="scss">
.document-list-filter {
    background-color: #F0F0F0;
    padding: 19px 14px 0 16px;

    header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;

        & > div {
            flex-basis: 33.3333%;
        }
    }

    footer {
        margin-top: 20px;

        button {
            width: 100%;
            background-color: #F39420;
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            color: white;
            border: 0;
            border-radius: 4px;
            padding: 11px 0;
            cursor: pointer;
        }
    }

    section {
        p {
            font-weight: 700;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.4px;
            margin: 0;
            margin-bottom: 25px;
        }


    }

    section + section {
        margin-top: 25px;
    }

    &__reset {
        button {
            background-color: transparent;
            border: 0;
            color: #888888;
            font-weight: 500;
            font-size: 13px;
            letter-spacing: 0.6px;
            cursor: pointer;
            padding: 0;
        }
    }

    &__title {
        text-align: center;
        color: #373737;
        font-weight: 600;
        font-size: 15px;
    }

    &__close {
        text-align: right;
        button {
            display: inline-block;
            background-color: transparent;
            border: 0;
            cursor: pointer;

            padding: 6px;
            margin-right: -5px;
            margin-top: -8px;
        }
    }

    &__status {
        ul {
            margin: 0;
            padding: 0;
        }

        li {
            display: flex;
            align-items: center;
            position: relative;
            list-style: none;
        }

        li + li {
            border-top: 1px #C8C7CC solid;
        }

        p {
            margin-bottom: 15px;
        }

        button {
            width: 100%;
            height: 100%;
            background-color: transparent;
            border: 0;
            padding: 10px 0;
            font-size: 14px;
            line-height: 20px;
            text-align: left;

        }

        svg {
            position: absolute;
            right: 0;
        }
    }

    &__date-container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > div {
            width: calc(50% - 27px);
        }
    }
}
</style>