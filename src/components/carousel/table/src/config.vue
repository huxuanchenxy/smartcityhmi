<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="全局">
      <g-field :level="2" label="表格行数">
        <g-input-number v-model="config.global.rowCount" :min="1" :max="50" :step="1" />
      </g-field>
      <g-field :level="2" label="自动轮播">
        <n-switch v-model:value="config.global.isLoop" />
      </g-field>
      <g-field :level="2" tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体" label="字体">
        <g-select v-model="config.global.fontFamily" :data="fontFamilys" />
      </g-field>
      <g-field-collapse v-if="config.global.isLoop === true" label="动画">
        <g-field :level="2" label="动画模式">
          <n-radio-group v-model:value="config.global.animation.mode" size="small">
            <n-radio v-for="pair in pairData2024" :key="pair.key" :value="pair.key">
              {{ pair.value }}
            </n-radio>
          </n-radio-group>
        </g-field>
        <g-field :level="2" label="轮播间隔">
          <g-input-number v-model="config.global.animation.duration" :min="1" :max="3600" :step="1" suffix="秒" />
        </g-field>
        <g-field :level="2" label="单页不轮播">
          <n-switch v-model:value="config.global.animation.singleStop" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse v-model="config.global.highLight.show" :toggle="true" label="高亮">
        <g-field :level="2" tooltip="关闭时, 可指定高亮行" label="自动依次高亮">
          <n-switch v-model:value="config.global.highLight.isOrder" />
        </g-field>
        <g-field v-if="config.global.highLight.isOrder === false" :level="2" label="指定高亮序列号">
          <g-input v-model="config.global.highLight.hlIndex" />
        </g-field>
        <g-field-collapse label="高亮样式">
          <g-field :level="2" label="文本样式" :is-flat="true">
            <g-select v-model="config.global.highLight.hlStyle.textStyle.fontFamily" :data="fontFamilys" inline="inline"
              label="字体" />
            <g-input-number v-model="config.global.highLight.hlStyle.textStyle.fontSize" :min="12" :max="100" :step="1"
              suffix="px" inline="inline" label="字号" />
            <g-color-picker v-model="config.global.highLight.hlStyle.textStyle.color" inline="inline" label="颜色" />
            <g-select v-model="config.global.highLight.hlStyle.textStyle.fontWeight" :data="fontWeights" inline="inline"
              label="字体粗细" />
          </g-field>
          <g-field :level="2" label="背景色">
            <g-color-picker v-model="config.global.highLight.hlStyle.bgColor" />
          </g-field>
          <g-field :level="2" label="边框" :is-flat="true">
            <g-input-number v-model="config.global.highLight.hlStyle.border.width" :min="0" :max="10" :step="1"
              suffix="px" inline="inline" label="粗细" />
            <g-select v-model="config.global.highLight.hlStyle.border.style" :data="lineStyles" inline="inline"
              label="类型" />
            <g-color-picker v-model="config.global.highLight.hlStyle.border.color" inline="inline-single" label="颜色" />
          </g-field>
        </g-field-collapse>
      </g-field-collapse>
      <g-field :level="2" label="空值隐藏行">
        <n-switch v-model:value="config.global.ifRowHidden" />
      </g-field>
      <g-field-collapse label="溢出文本滚动">
        <g-field :level="2" label="是否滚动">
          <n-switch v-model:value="config.global.textAnimate.ifRun" />
        </g-field>
        <g-field :level="2" label="匀速滚动">
          <n-switch v-model:value="config.global.textAnimate.isSpeed" />
        </g-field>
        <g-field v-if="config.global.textAnimate.isSpeed === false" :level="2" label="滚动时间">
          <g-input-number v-model="config.global.textAnimate.animateDur" :min="1" :max="100" :step="0.1" suffix="秒" />
        </g-field>
        <g-field v-if="config.global.textAnimate.isSpeed === true" :level="2" label="速率">
          <g-input-number v-model="config.global.textAnimate.speedRate" :min="0.01" :max="10" :step="0.01"
            suffix="px/s" />
        </g-field>
      </g-field-collapse>
      <g-field :level="2" tooltip="自定义列, 内容类型为图片时 - 非真实图片地址, 用于显示的默认图片" label="默认图片">
        <g-input v-model="config.global.defaultImg" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse v-model="config.header.show" :toggle="true" label="表头">
      <g-field :level="2" label="表头行高">
        <g-slider v-model="config.header.heightPercent" :min="0" :max="100" :step="1" suffix="%" />
      </g-field>
      <g-field :level="2" label="背景色">
        <g-color-picker v-model="config.header.bgColor" />
      </g-field>
      <g-field-collapse label="文本样式">
        <g-field :level="2" label="文本对齐">
          <g-select v-model="config.header.textStyle.textAlign" :data="hAligns" />
        </g-field>
        <g-field :level="2" tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体" label="字体">
          <g-select v-model="config.header.textStyle.fontFamily" :data="fontFamilys" />
        </g-field>
        <g-field :level="2" label="字体颜色">
          <g-color-picker v-model="config.header.textStyle.color" />
        </g-field>
        <g-field :level="2" label="字号">
          <g-slider v-model="config.header.textStyle.fontSize" :min="12" :max="100" :step="1" suffix="px" />
        </g-field>
        <g-field :level="2" label="字体粗细">
          <g-select v-model="config.header.textStyle.fontWeight" :data="fontWeights" />
        </g-field>
      </g-field-collapse>
    </g-field-collapse>
    <g-field-collapse label="行配置">
      <g-field :level="2" label="奇行背景色">
        <g-color-picker v-model="config.row.oddBGColor" />
      </g-field>
      <g-field :level="2" label="偶行背景色">
        <g-color-picker v-model="config.row.evenBGColor" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse v-model="config.idList.show" :toggle="true" label="序列号">
      <g-field :level="2" label="背景色">
        <g-color-picker v-model="config.idList.bgColor" />
      </g-field>
      <g-field :level="2" tooltip="所有列宽占比总和为100%（ 超出则会偏离您输入的值 ）" label="列宽占比">
        <g-slider v-model="config.idList.width" :min="0" :max="100" :step="1" suffix="%" />
      </g-field>
      <g-field :level="2" label="半径占比">
        <g-slider v-model="config.idList.radius" :min="0" :max="100" :step="1" suffix="%" />
      </g-field>
      <g-field :level="2" label="文本样式" :is-flat="true">
        <g-select v-model="config.idList.textStyle.fontFamily" :data="fontFamilys" inline="inline" label="字体" />
        <g-select v-model="config.idList.textStyle.fontWeight" :data="fontWeights" inline="inline" label="文字粗细" />
        <g-input-number v-model="config.idList.textStyle.fontSize" :min="10" :max="100" :step="1" suffix="px"
          inline="inline" label="字号" />
        <g-color-picker v-model="config.idList.textStyle.color" inline="inline" label="颜色" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="自定义列" mode="layout" :default-layout="ToolboxType.horizontal"
      :features="[ToolboxType.vertical, ToolboxType.horizontal,ToolboxType.copy,ToolboxType.add,ToolboxType.remove]" :list="config.series" :min="1" :max="100" tab="标签"
      :add-item="handleAddSeriesItem">
      <template #default="slotProps">
        <g-field :level="2" tooltip="需要与数据中 key 匹配" label="列字段名">
          <g-input v-model="slotProps.item.columnName" />
        </g-field>
        <g-field :level="2" tooltip="表头显示列名称" label="列显示名">
          <g-input v-model="slotProps.item.displayName" />
        </g-field>
        <g-field :level="2" tooltip="所有列宽占比总和为100%（ 超出则会偏离您输入的值 ）" label="列宽占比">
          <g-input-number v-model="slotProps.item.width" :min="0" :max="100" :step="1" suffix="%" />
        </g-field>
        <g-field :level="2" label="内容类型">
          <n-radio-group v-model:value="slotProps.item.dataType" size="small">
            <n-radio v-for="pair in pairData7136" :key="pair.key" :value="pair.key">
              {{ pair.value }}
            </n-radio>
          </n-radio-group>
        </g-field>
        <g-field v-if="slotProps.item.dataType === 'img'" :level="2" label="图片宽度">
          <g-input-number v-model="slotProps.item.widthPercent" :min="0" :max="99999" :step="1" suffix="px" />
        </g-field>
        <g-field v-if="slotProps.item.dataType === 'img'" :level="2" label="图片边距" :is-flat="true">
          <g-input-number v-model="slotProps.item.margin.top" :min="0" :max="99999" :step="1" suffix="px" inline="inline"
            label="顶部" />
          <g-input-number v-model="slotProps.item.margin.bottom" :min="0" :max="99999" :step="1" suffix="px"
            inline="inline" label="底部" />
          <g-input-number v-model="slotProps.item.margin.left" :min="0" :max="99999" :step="1" suffix="px" inline="inline"
            label="左侧" />
          <g-input-number v-model="slotProps.item.margin.right" :min="0" :max="99999" :step="1" suffix="px"
            inline="inline" label="右侧" />
        </g-field>
        <g-field v-if="slotProps.item.dataType === 'text'" :level="2" label="自动换行">
          <n-switch v-model:value="slotProps.item.isBr" />
        </g-field>
        <g-field v-if="slotProps.item.dataType === 'text'" :level="2" label="文本对齐">
          <g-select v-model="slotProps.item.textAlign" :data="hAligns" />
        </g-field>
        <g-field v-if="slotProps.item.dataType === 'text'" :level="2" label="文本样式" :is-flat="true">
          <g-select v-model="slotProps.item.textStyle.fontFamily" :data="fontFamilys" inline="inline" label="字体" />
          <g-select v-model="slotProps.item.textStyle.fontWeight" :data="fontWeights" inline="inline" label="文字粗细" />
          <g-input-number v-model="slotProps.item.textStyle.fontSize" :min="12" :max="100" :step="1" suffix="px"
            inline="inline" label="字号" />
          <g-color-picker v-model="slotProps.item.textStyle.color" inline="inline" label="颜色" />
        </g-field>
      </template>
    </g-field-collapse>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef, computed } from 'vue'
import {
  fontFamilys,
  fontWeights,
  lineStyles,
  hAligns,
} from '@/data/select-options'
import { Table, TableSeries } from './table'
import { ToolboxType } from '@/utils/enums'

export default defineComponent({
  name: 'VTableProp',
  components: {},
  props: {
    com: {
      type: Object as PropType<Table>,
      required: true,
    },
  },
  setup(props) {

    const config = toRef(props.com, 'config')

    const pairData2024 = [
      { key: 'top', value: '全部滚动' },
      { key: 'bottom', value: '逐条滚动' },
    ]

    const pairData7136 = [
      { key: 'text', value: '文本' },
      { key: 'img', value: '图片' },
    ]

    const handleAddSeriesItem = () => {
      return new TableSeries('series1', '类别一')
    }

    return {
      fontFamilys,
      fontWeights,
      lineStyles,
      hAligns,
      config,
      pairData2024,
      pairData7136,
      handleAddSeriesItem,
      ToolboxType
    }
  },
})
</script>
