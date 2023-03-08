<template>
  <div class="two-layout">
    <div class="head">
      <slot name="head"></slot>
    </div>
    <div class="main">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.two-layout {
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.head {
  flex-shrink: 0;
}

.main {
  overflow: auto;
  flex: 1;
}
</style>