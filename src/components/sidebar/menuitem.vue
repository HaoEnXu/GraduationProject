<template>
  <div class="menuitem-wrapper">
    <button class="btn-menuitem" @click="onClickItem">
      <span>{{itemName}}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SidebarMenuitem',
  props: {
    itemName: {
      required: true,
      default: '素材管理'
    }
  },
  methods: {
    onClickItem () {
      this.$emit('onClickItem')
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  border: none;
  background: none;
  appearance: none;
  outline: none;
}
.menuitem-wrapper {
  width: 100%;
  height: 40px;
  .btn-menuitem {
    width: 100%;
    height: 100%;
    text-align: left;
    background: #ffffff;
    font-size: 14px;
    color: #101010;
    padding-left: 30px;
    &:hover {
      background: #f1f1f1;
      opacity: 0.5;
    }
    &:active {
      background: #f1f1f1;
      opacity: 0.8;
    }
    &.selected {
      background: #f1f1f1;
    }
  }
}
</style>
