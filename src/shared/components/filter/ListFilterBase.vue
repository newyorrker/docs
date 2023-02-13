<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ components: {  }})

export default class ListFilterBase extends Vue {}

</script>
<style lang="scss">
.documents-list-filter {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;

    & > div {
      flex-basis: 33.3333%;
    }
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
      margin-right: -7px;
      margin-top: -2px;
    }

    svg {
      display: block;
    }
  }

  &__date {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > div {
      width: calc(50% - 27px);
    }
  }

  &__status {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: -8px;
    margin-bottom: -8px;

    & > div {
      margin-bottom: 8px;
    }

    & > div {
      margin-left: 8px;
    }
  }

  & > footer {
    padding: 16px;

    button {
      width: 100%;
      background-color: var(--accent-color);
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
}
</style>