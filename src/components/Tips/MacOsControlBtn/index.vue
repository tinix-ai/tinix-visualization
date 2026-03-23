<template>
  <div class="go-apple-control-btn">
    <template v-for="item in filterBtnList" :key="item.key">
      <div
        class="btn"
        :class="[item.key, disabled && 'disabled', mini && 'mini']"
        @click.stop="handleClick(item.key)"
      >
        <n-icon size="10" class="icon-base" :class="{ hover: !disabled }">
          <component :is="item.icon"></component>
        </n-icon>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { icon } from '@/plugins'
import { computed } from 'vue'
import { screenfullFn } from '@/utils'

const emit = defineEmits(['close', 'remove', 'resize', 'fullResize'])

const props = defineProps({
  // mini Phiên bản
  mini: {
    request: false,
    type: Boolean,
    default: false
  },
  // Vô hiệu hóa tất cả các nút
  disabled: {
    request: false,
    type: Boolean,
    default: false
  },
  // nút để ẩn
  hidden: {
    request: false,
    type: Array,
    default() {
      return []
    }
  },
  // Sử dụng tính năng toàn màn hình
  narrow: {
    request: false,
    type: Boolean,
    default: false
  }
})

const { CloseIcon, RemoveIcon, ResizeIcon } = icon.ionicons5

const filterBtnList = computed(() => {
  const res = btnList.filter(e => {
    return props.hidden.findIndex(p => e.key == p) === -1
  })
  return res
})

const isFull = computed(() => {
  return props.narrow && screenfullFn(true)
})

const btnList: {
  title: string
  key: 'close' | 'remove' | 'resize' | 'fullResize'
  icon: any
}[] = [
  {
    title: window['$t']('views_components.auto_506'),
    key: 'close',
    icon: CloseIcon
  },
  {
    title: window['$t']('views_components.auto_505'),
    key: 'remove',
    icon: RemoveIcon
  },
  {
    title: isFull.value ? window['$t']('views_components.auto_505') : window['$t']('views_components.auto_504'),
    key: props.narrow ? 'fullResize' : 'resize',
    icon: ResizeIcon
  }
]

const handleClick = (key: 'close' | 'remove' | 'resize' | 'fullResize') => {
  if (key === 'fullResize') screenfullFn()
  // Thu nhỏ và đóng toàn màn hình
  if (key === 'remove') screenfullFn(true) && screenfullFn()
  emit(key)
}
</script>

<style lang="scss" scoped>
@include go('apple-control-btn') {
  display: flex;
  &:hover {
    .btn {
      .hover {
        cursor: pointer;
        opacity: 1;
      }
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    margin: 0 4px;
    color: $--color-text;
    font-weight: bold;
    border-radius: 50%;
    &.mini {
      width: 8px;
      height: 8px;
      margin: 0 2px;
    }
    &.disabled {
      pointer-events: none;
    }
    .icon-base {
      opacity: 0;
    }
    .hover {
      @extend .go-transition;
    }
  }
  .close {
    background-color: $--color-red;
  }
  .remove {
    background-color: $--color-warn;
  }
  .resize,
  .fullResize {
    background-color: $--color-success;
  }
}
</style>
