<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="全局">
      <g-field :level="2" tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体" label="字体">
        <g-select v-model="config.global.fontFamily" :data="fontFamilys" />
      </g-field>
      <g-field :level="2" label="排列方式">
        <g-select v-model="config.global.arrangement" :data="arrangements" />
      </g-field>
      <g-field :level="2" label="间隔">
        <g-slider v-model="config.global.distance" :min="-100" :max="500" :step="0.5" suffix="px" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="标题">
      <g-field :level="2" tooltip="支持从数据中获取标题内容，详见数据面板" label="标题名">
        <g-input v-model="config.title.content" />
      </g-field>
      <g-field :level="2" label="文本样式" :is-flat="true">
        <g-input-number v-model="config.title.textStyle.fontSize" :min="12" :max="100" :step="1" suffix="px"
          inline="inline" label="字号" />
        <g-color-picker v-model="config.title.textStyle.color" inline="inline" label="字体颜色" />
        <g-select v-model="config.title.textStyle.fontWeight" :data="fontWeights" inline="inline" label="字体粗细" />
        <g-select v-model="config.title.textStyle.textAlign" :data="justifyContents" inline="inline" label="对齐方式" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="翻牌器">
      <g-field :level="2" tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体" label="字体">
        <g-select v-model="config.counter.fontFamily" :data="fontFamilys" />
      </g-field>
      <g-field :level="2" label="水平对齐">
        <g-select v-model="config.counter.justifyContent" :data="justifyContents" />
      </g-field>
      <g-field :level="2" label="间距" :is-flat="true">
        <g-input-number v-model="config.counter.margin.preNum" :min="-1000" :max="1000" :step="1" suffix="px"
          inline="inline" label="前缀-数字" />
        <g-input-number v-model="config.counter.margin.numSuff" :min="-1000" :max="1000" :step="1" suffix="px"
          inline="inline" label="数字-后缀" />
      </g-field>
      <g-field-collapse label="前缀">
        <g-field :level="2" label="内容">
          <g-input v-model="config.counter.prefix.content" />
        </g-field>
        <g-field :level="2" label="文本样式" :is-flat="true">
          <g-input-number v-model="config.counter.prefix.textStyle.fontSize" :min="12" :max="100" :step="1" suffix="px"
            inline="inline" label="字号" />
          <g-color-picker v-model="config.counter.prefix.textStyle.color" inline="inline" label="字体颜色" />
          <g-select v-model="config.counter.prefix.textStyle.fontWeight" :data="fontWeights" inline="inline-single"
            label="字体粗细" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse label="后缀">
        <g-field :level="2" label="内容">
          <g-input v-model="config.counter.suffix.content" />
        </g-field>
        <g-field :level="2" label="文本样式" :is-flat="true">
          <g-input-number v-model="config.counter.suffix.textStyle.fontSize" :min="12" :max="100" :step="1" suffix="px"
            inline="inline" label="字号" />
          <g-color-picker v-model="config.counter.suffix.textStyle.color" inline="inline" label="字体颜色" />
          <g-select v-model="config.counter.suffix.textStyle.fontWeight" :data="fontWeights" inline="inline-single"
            label="字体粗细" />
        </g-field>
      </g-field-collapse>
    </g-field-collapse>
    <g-field-collapse label="数字">
      <g-field-collapse label="文本样式">
        <g-field :level="2" label="字号">
          <g-input-number v-model="config.numbers.textStyle.fontSize" :min="12" :max="100" :step="1" suffix="px" />
        </g-field>
        <g-field :level="2" label="字体颜色">
          <g-color-picker v-model="config.numbers.textStyle.color" />
        </g-field>
        <g-field :level="2" label="字体粗细">
          <g-select v-model="config.numbers.textStyle.fontWeight" :data="fontWeights" />
        </g-field>
      </g-field-collapse>
      <g-field :level="2" label="数字间隔">
        <g-slider v-model="config.numbers.marginRight" :min="0" :max="10" :step="0.5" />
      </g-field>
      <g-field :level="2" tooltip="注意：字体颜色为渐变色时，字体背景色将会失效。" label="背景色">
        <g-color-picker v-model="config.numbers.bgColor" />
      </g-field>
      <g-field :level="2" label="背景圆角">
        <g-slider v-model="config.numbers.bgRadius" :min="0" :max="1000" :step="1" />
      </g-field>
      <g-field :level="2" label="分隔符背景">
        <n-switch v-model:value="config.numbers.bgSeparating" />
      </g-field>
      <g-field :level="2" label="默认位数">
        <g-slider v-model="config.numbers.digit" :min="0" :max="100" :step="1" />
      </g-field>
      <g-field :level="2" label="小数点位数">
        <g-slider v-model="config.numbers.decimal" :min="0" :max="8" :step="1" />
      </g-field>
      <g-field :level="2" label="除数">
        <g-input-number v-model="config.numbers.divisor" :step="1" />
      </g-field>
      <g-field :level="2" label="千位分隔符">
        <n-switch v-model:value="config.numbers.separatingChart" />
      </g-field>
      <g-field :level="2" tooltip="分隔符最长一位，超出一位取第一位，无法以数字为分隔符" label="千位分隔符符号">
        <g-input v-model="config.numbers.separatingSymbol" />
      </g-field>
      <g-field :level="2" tooltip="分隔符最长一位，超出一位取第一位，无法以数字为分隔符" label="小数分隔符符号">
        <g-input v-model="config.numbers.decimalSymbol" />
      </g-field>
      <g-field :level="2" label="文本位置">
        <g-select v-model="config.numbers.textalign" :data="hAligns"/>
      </g-field>
      <g-field :level="2" label="定宽">
        <g-input-number v-model="config.numbers.fixedWidth" :min="0" :max="100" :step="1" />
      </g-field>
      <g-field :level="2" label="开启动画">
        <n-switch v-model:value="config.numbers.animation" />
      </g-field>
      <g-field :level="2" label="动画时长">
        <g-input-number v-model="config.numbers.duration" :min="0" :step="500" suffix="ms" />
      </g-field>
    </g-field-collapse>
  </div>
  <g-field label="鼠标指针">
    <g-select v-model="config.cursor" :data="cursorFamily" />
  </g-field>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef, computed } from 'vue'
import {
  fontFamilys,
  fontWeights,
  justifyContents,
  cursorFamily,
  hAligns
} from '@/data/select-options'
import { NumberTitleFlop } from './number-title-flop'

export default defineComponent({
  name: 'VNumberTitleFlopProp',
  props: {
    com: {
      type: Object as PropType<NumberTitleFlop>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    const arrangements = computed(() => ([
      { id: 'top', value: '标题在上' },
      { id: 'left', value: '标题在左' },
      { id: 'bottom', value: '标题在下' },
    ]))

    return {
      config,
      arrangements,
      hAligns,
      fontFamilys,
      fontWeights,
      justifyContents,
      cursorFamily,
    }
  },
})
</script>
