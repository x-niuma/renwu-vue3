<template>
  <div class="tabbar">
    <van-tabbar route>
      <template v-for="item in menus">
        <van-tabbar-item
          :to="item.path"
          :icon="item.icon"
          :badge="item.dot"
          v-if="item.dot"
          :replace="item.replace"
        >
          {{ item.span }}
        </van-tabbar-item>
        <van-tabbar-item :replace="item.replace" :to="item.path" :icon="item.icon" v-else>
          {{ item.span }}
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { ref, computed, defineComponent } from 'vue'
import { Icon } from 'vant'
import { tabbar } from '@/config'

interface IMenu {
  span: string
  icon: string
  activeIcon: string
  path: string
  dot?: number
  replace?: boolean
}

export default defineComponent({
  components: {
    [Icon.name]: Icon
  },

  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },

  setup() {
    const router = useRouter()
    const active = ref(0)

    const menus = computed(() => {
      return tabbar as IMenu[]
    })

    const handleClick = (item: IMenu, index: number) => {
      index
      router.push(item.path)
    }

    return {
      menus,
      handleClick
    }
  }
})
</script>

<style lang="less" scoped>
.tabbar {
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  display: flex;
  align-items: center;
  height: 50px;
  box-shadow: 1px 1px 10px -3px #e6e1e1;
  .tabbar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #888;
  }
  .span {
    font-size: 10px;
    margin-top: 3px;
  }
  .icon {
    font-size: 20px;
  }
  .is-active {
    color: var(--theme-color-brand);
  }
}
</style>
