<template>
  <input
    :type="type"
    :value="internalValue"
    @input="updateInternalValue"
    :placeholder="placeholder"
  />
</template>

<script>
import _debounce from "lodash/debounce";

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    type: { type: String, default: "text" },
    placeholder: String,
  },
  data() {
    return {
      internalValue: this.value,
      touched: false,
    };
  },
  watch: {
    value(value) {
      if (!this.touched) this.internalValue = value;
    },
  },
  methods: {
    updateInternalValue(event) {
      this.touched = true;
      this.updateValue(event.target.value);
    },
    updateValue: _debounce(function (value) {
      this.touched = false;
      this.$emit("input", value);
      this.$emit("update:value", value);
    }, 600),
  },
};
</script>
