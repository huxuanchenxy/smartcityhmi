<template>
  <div class="setting-panel-gui">
    <g-field
      tooltip="支持从数据中获取标题内容，详见数据面板"
      label="标题名"
    >
      <g-input
        v-model="config.title"
      />
    </g-field>
    <g-field-collapse
      label="文本样式"
    >
      <g-field
        :level="2"
        tooltip="请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体"
        label="字体"
      >
        <g-select
          v-model="config.textStyle.fontFamily"
          :data="fontFamilys"
        />
      </g-field>
      <g-field
        :level="2"
        label="字号"
      >
        <g-input-number
          v-model="config.textStyle.fontSize"
          :min="12"
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
          v-model="config.textStyle.color"
        />
      </g-field>
      <g-field
        :level="2"
        label="字体粗细"
      >
        <g-select
          v-model="config.textStyle.fontWeight"
          :data="fontWeights"
        />
      </g-field>
    </g-field-collapse>
    <g-field
      label="对齐方式"
    >
      <g-select
        v-model="config.textAlign"
        :data="justifyContents"
      />
    </g-field>
    <g-field
      label="文字排列方式"
    >
      <g-select
        v-model="config.writingMode"
        :data="writingModes"
      />
    </g-field>
    <g-field
      label="文字间隔"
    >
      <g-input-number
        v-model="config.letterSpacing"
        :min="-88888"
        :max="88888"
        :step="0.5"
        suffix="px"
      />
    </g-field>
    <g-field-collapse
      v-model="config.backgroundStyle.show"
      :toggle="true"
      label="背景样式"
    >
      <g-field
        :level="2"
        label="背景色"
      >
        <g-color-picker
          v-model="config.backgroundStyle.bgColor"
        />
      </g-field>
      <g-field
        :level="2"
        label="圆角"
      >
        <g-input-number
          v-model="config.backgroundStyle.borderRadius"
          :min="0"
          :max="88888"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field
        :level="2"
        label="边框颜色"
      >
        <g-color-picker
          v-model="config.backgroundStyle.borderColor"
        />
      </g-field>
      <g-field
        :level="2"
        label="边框粗细"
      >
        <g-select
          v-model="config.backgroundStyle.borderStyle"
          :data="lineStyles"
        />
      </g-field>
      <g-field
        :level="2"
        label="边框粗细"
      >
        <g-input-number
          v-model="config.backgroundStyle.borderWidth"
          :min="0"
          :max="88888"
          :step="1"
          suffix="px"
        />
      </g-field>
    </g-field-collapse>
    <g-field
      tooltip="溢出文本加省略号"
      label="省略号"
    >
      <n-switch
        v-model:value="config.ellipsis"
      />
    </g-field>
    <g-field-collapse v-model="config.animation.enable" :toggle="true" label="动画效果">
      <g-field :level="2" label="动画名称">
        <g-input v-model="config.animation.name" />
      </g-field>
      <g-field :level="2" label="持续时间">
        <g-input-number v-model="config.animation.duration" :min="0" :max="10000" :step="100" suffix="ms" />
      </g-field>
      <g-field :level="2" label="动画速率">
        <g-input v-model="config.animation.timing" />
      </g-field>
      <g-field :level="2" label="动画延时">
        <g-input-number v-model="config.animation.delay" :min="0" :max="10000" :step="100" suffix="ms" />
      </g-field>
      <g-field :level="2" label="重复次数">
        <g-input v-model="config.animation.iteration" />
      </g-field>
      <g-field :level="2" label="重复类型">
        <g-input v-model="config.animation.direction" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse
      tooltip="点击标题区域可跳转至设定的超链接"
      label="超链接配置"
    >
      <g-field
        :level="2"
        label="超链接"
      >
        <g-input
          v-model="config.urlConfig.url"
        />
      </g-field>
      <g-field
        :level="2"
        label="是否新开窗口"
      >
        <n-switch
          v-model:value="config.urlConfig.isBlank"
        />
      </g-field>
    </g-field-collapse>
    <g-field
      label="鼠标指针"
    >
      <g-select
        v-model="config.cursor"
        :data="cursorFamily"
      />
    </g-field>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import {
  fontFamilys,
  fontWeights,
  justifyContents,
  writingModes,
  lineStyles,
  cursorFamily,
} from '@/data/select-options'
import { MainTitle2 } from './main-title2'
console.log('main-title2 config.vue 组件被加载') // 添加这一行
export default defineComponent({
  name: 'VMainTitle2Prop',
  props: {
    com: {
      type: Object as PropType<MainTitle2>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    console.log('222',config.value)
    return {
      config,
      cursorFamily,
      fontFamilys,
      fontWeights,
      justifyContents,
      writingModes,
      lineStyles,
    }
  },
})
</script>
