<template>
  <n-popover
    v-model:show="visible"
    :placement="placement"
    trigger="click"
    :width="188"
    :show-arrow="false"
    class="g-select-image-popover"
    :style="{
      '--color': 'var(--datav-gui-bgcolor-back)'
    }"
  >
    <template #trigger>
      <div
        class="datav-gui g-select-image-wrap"
        :class="[
          {
            '--inline --single': !!inline,
          }
        ]"
      >
        <div class="datav-gui g-select-image">
          <div class="g-select-image-selection">
            <div class="g-select-image-selection__inner">
              <div class="g-select-image-selected-wrap">
                <img :src="selectedImg.preview || selectedImg.src" class="g-select-image-img">
                <span>{{ selectedImg.name }}</span>
              </div>
            </div>
            <span class="g-select-image-arrow">
              <n-icon color="var(--datav-gui-font-color-base)">
                <IconSelectArrow />
              </n-icon>
            </span>
          </div>
        </div>
        <span v-if="label" class="g-input__caption">
          {{ label }}
        </span>
      </div>
    </template>
    <div class="g-select-image-dropdown-menu-wrap">
      <ul class="g-select-image-dropdown-menu">
        <template v-if="images && images.length > 0">
          <li
            v-for="img in images"
            :key="img.id"
            class="g-select-image-dropdown-menu-item"
            @click="onSelectImg(img)"
          >
            <img :src="img.preview || img.src" class="g-select-image-img">
            <span>{{ img.name }}</span>
          </li>
        </template>
        <li v-else class="g-select-image-dropdown-menu-item --empty">
          <span>列表为空</span>
        </li>
      </ul>
    </div>
  </n-popover>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, ref } from 'vue'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'
import { DatavImageType } from '@/utils/types'
import { IconSelectArrow } from '@/icons'

export default defineComponent({
  name: 'GSelectImage',
  components: {
    IconSelectArrow,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    images: {
      type: Array as PropType<DatavImageType[]>,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    inline: {
      type: [Boolean, String],
      default: false,
    },
    placement: {
      type: String,
      default: 'left',
    },
  },
  emits: [UPDATE_MODEL_EVENT],
  setup(props, ctx) {
    const visible = ref(false)
    const selectedImg = computed(() => {
      return props.images.find(m => m.id === props.modelValue) || {
        id: 'img-12138',
        name: 'img-12138',
        src: 'data/originPic/custom-bg-border.png',
        border: {
          slice: '32 37 fill',
          width: '32px 37px',
          outset: '0',
          repeat: 'no-repeat',
        },
      }
    })

    const onSelectImg = (img: DatavImageType) => {
      visible.value = false
      ctx.emit(UPDATE_MODEL_EVENT, img.id)
    }

    return {
      visible,
      selectedImg,
      onSelectImg,
    }
  },
})
</script>
