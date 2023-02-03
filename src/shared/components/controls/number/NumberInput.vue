<template>
	<input class="number-input" inputmode="numeric" v-bind="$attrs" type="number" />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ components: {  }})

export default class NumberInput extends Vue {}

</script>
<style lang="scss">
	.number-input {
		border: 1px #C8C8C8 solid;
		font-family: -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 15px;
		color: #212121;
		background-color: transparent;
		border-radius: 4px;
		padding: 8px 12px;
		-moz-appearance: textfield;
	}

	.number-input {
		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}
</style>