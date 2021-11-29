<template>
  <div
    :class="{
      'flex space-x-4': variant === 'horizontal',
    }"
  >
    <ul
      class="tabs"
      :class="{
        'flex items-center': variant === 'vertical',
      }"
    >
      <li
        v-for="(tab, index) in tabList"
        :key="index"
        class="tab-item"
        :class="{
          'tab-selected': index + 1 === activeTab,
        }"
      >
        <label
          :for="`${_uid}${index}`"
          v-text="tab"
          class="tab-label"
          @click="handleTabClick(index + 1)"
        />
      </li>
    </ul>
    <template v-for="(tab, index) in tabList">
      <div :key="index" v-if="index + 1 === activeTab" class="tab-content">
        <slot :name="`tabPanel-${index + 1}`" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    tabList: {
      type: Array,
      required: true,
    },
    variant: {
      type: String,
      required: false,
      default: () => "vertical",
    },
  },
  data() {
    return {
      activeTab: 1,
    };
  },
  methods: {
    handleTabClick(tabIndex: number) {
      this.activeTab = tabIndex;
    },
  },
});
</script>

<style scoped>
.tabs {
  list-style: none;
  white-space: nowrap;
  overflow: auto;
  display: flex;
  border-bottom: solid white 1px;
  padding-left: 0.5em;
}
.tab-item {
  padding-right: 3em;
  color: rgb(230, 230, 230);
  font-size: 12pt;
}
.tab-selected {
  color: white;
  font-weight: bold;
  font-size: 14pt;
}

.tab-label {
  cursor: pointer;
}
.tab-content {
  /* padding: 20px; */
}

@media (max-width: 600px) {
  .tab-item {
    padding-right: 1.5em;
    color: rgb(230, 230, 230);
    font-size: 12pt;
  }
}
</style>
