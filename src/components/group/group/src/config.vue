<template>
  <div class="setting-panel-gui">
    <g-field-collapse
      label="边框"
    >
      <g-field
        :level="2"
        label="宽度"
      >
        <g-input-number
          v-model="config.borderStyle.borderWidth"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field
        :level="2"
        label="颜色"
      >
        <g-color-picker
          v-model="config.borderStyle.borderColor"
        />
      </g-field>
      <g-field
        :level="2"
        label="圆角"
      >
        <g-input-number
          v-model="config.borderStyle.borderRadius"
          :min="0"
          :max="100"
          :step="1"
        />
      </g-field>
      <g-field
        :level="2"
        label="样式"
      >
        <g-select
          v-model="config.borderStyle.borderStyle"
          :data="lineStyles"
        />
      </g-field>
    </g-field-collapse>
    <g-field-collapse
      v-model="config.header.show"
      :toggle="true"
      label="标题栏"
    >
      <g-field
        :level="2"
        label="可拖动"
      >
        <n-switch
          v-model:value="config.header.draggable"
        />
      </g-field>
      <g-field
        :level="2"
        label="高度"
      >
        <g-input-number
          v-model="config.header.height"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field
        :level="2"
        label="标题内容"
      >
        <g-input
          v-model="config.header.title"
        />
      </g-field>
      <g-field-collapse
        label="字体"
      >
        <g-field
          :level="2"
          label="大小"
        >
          <g-input-number
            v-model="config.header.fontStyle.fontSize"
            :min="0"
            :max="100"
            :step="1"
            suffix="pt"
          />
        </g-field>
        <g-field
          :level="2"
          label="颜色"
        >
          <g-color-picker
            v-model="config.header.fontStyle.fontColor"
          />
        </g-field>
        <g-field
          :level="2"
          label="样式"
        >
          <g-select
            v-model="config.header.fontStyle.fontStyle"
            :data="fontStyles"
          />
        </g-field>
        <g-field
          :level="2"
          label="粗细"
        >
          <g-select
            v-model="config.header.fontStyle.fontWeight"
            :data="fontWeights"
          />
        </g-field>
        <g-field
          :level="2"
          label="字体"
        >
          <g-select
            v-model="config.header.fontStyle.fontFamily"
            :data="fontFamilys"
          />
        </g-field>
        <g-field
          :level="2"
          label="对齐"
        >
          <g-select
            v-model="config.header.fontStyle.textAlign"
            :data="hAligns"
          />
        </g-field>
      </g-field-collapse>
      <g-field
        :level="2"
        label="背景颜色"
      >
        <g-color-picker
          v-model="config.header.color"
        />
      </g-field>
      <g-field
        :level="2"
        label="背景图片"
      >
        <g-upload-image
          v-model="config.header.image"
        />
      </g-field>
      <g-field-collapse
        v-model="config.header.closeButton.show"
        :toggle="true"
        label="关闭按钮"
      >
        <g-field
          :level="2"
          label="颜色"
        >
          <g-color-picker
            v-model="config.header.closeButton.color"
          />
        </g-field>
        <g-field
          :level="2"
          label="大小"
        >
          <g-input-number
            v-model="config.header.closeButton.size"
            :min="0"
            :max="100"
            :step="1"
          />
        </g-field>
        <g-field
          :level="2"
          label="上边距"
        >
          <g-input-number
            v-model="config.header.closeButton.top"
            :min="-1000"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field
          :level="2"
          label="下边距"
        >
          <g-input-number
            v-model="config.header.closeButton.bottom"
            :min="-1000"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field
          :level="2"
          label="左边距"
        >
          <g-input-number
            v-model="config.header.closeButton.left"
            :min="-1000"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field
          :level="2"
          label="右边距"
        >
          <g-input-number
            v-model="config.header.closeButton.right"
            :min="-1000"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
      </g-field-collapse>
    </g-field-collapse>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import {
  lineStyles,
  fontStyles,
  fontWeights,
  fontFamilys,
  hAligns,
} from '@/data/select-options'
import { group } from './group'

export default defineComponent({
  name: 'VGroupProp',
  props: {
    com: {
      type: Object as PropType<group>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    return {
      config,

      lineStyles,
      fontStyles,
      fontWeights,
      fontFamilys,
      hAligns,
    }
  },
})
</script>
