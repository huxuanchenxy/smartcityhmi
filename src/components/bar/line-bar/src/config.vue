<!--<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="全局">
      <g-field
        :level="2"
        tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体"
        label="字体"
      >
        <g-select v-model="config.global.fontFamily" :data="fontFamilys" />
      </g-field>
      <g-field :level="2" label="边距" :is-flat="true">
        <g-input-number
          v-model="config.global.margin.top"
          :min="-1000"
          ;
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="顶部"
        />
        <g-input-number
          v-model="config.global.margin.bottom"
          :min="-1000"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="底部"
        />
        <g-input-number
          v-model="config.global.margin.left"
          :min="-1000"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="左侧"
        />
        <g-input-number
          v-model="config.global.margin.right"
          :min="-1000"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="右侧"
        />
      </g-field>
      <g-field :level="2" label="组内间距">
        <g-slider
          v-model="config.global.innerPadding"
          :min="-1000"
          :max="1000"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field :level="2" label="组间间距">
        <g-slider
          v-model="config.global.outerPadding"
          :min="-1000"
          :max="1000"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field
        :level="2"
        tooltip="不设时自适应，可以是绝对值例如 40 或者百分数例如 60%。"
        label="柱子宽度"
      >
        <g-select-suggest
          v-model="config.global.barWidth"
          :data="selectSuggests"
          :filters="['auto']"
        />
      </g-field>
      <g-field-collapse
        v-model="config.global.background.show"
        :toggle="true"
        label="背景色"
      >
        <g-field :level="2" label="颜色">
          <g-color-picker v-model="config.global.background.color" />
        </g-field>
      </g-field-collapse>
    </g-field-collapse>
    <g-field-collapse v-model="config.xAxis.show" :toggle="true" label="X轴">
      <g-field :level="2" label="数据类型">
        <n-radio-group v-model:value="config.xAxis.type" size="small">
          <n-radio-button v-for="em in axisTypes" :key="em.id" :value="em.id">
            {{ em.value }}
          </n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field
        v-if="config.xAxis.type === 'value'"
        :level="2"
        label="显示范围"
        :is-flat="true"
      >
        <g-select-suggest
          v-model="config.xAxis.extent.min"
          :data="selectSuggests"
          :filters="['auto', 'dataMin', 'dataMax']"
          inline="inline"
          label="最小值"
        />
        <g-select-suggest
          v-model="config.xAxis.extent.max"
          :data="selectSuggests"
          :filters="['auto', 'dataMin', 'dataMax']"
          inline="inline"
          label="最大值"
        />
      </g-field>
      <g-field-collapse
        v-model="config.xAxis.title.show"
        :toggle="true"
        label="轴标题"
      >
        <g-field :level="2" label="标题显示">
          <g-input v-model="config.xAxis.title.name" />
        </g-field>
        <g-field :level="2" label="位置">
          <g-select
            v-model="config.xAxis.title.location"
            :data="titleLocations"
          />
        </g-field>
        <g-field :level="2" label="展示方式" :is-flat="true">
          <g-input-number
            v-model="config.xAxis.title.display.rotate"
            :min="0"
            :max="360"
            :step="1"
            suffix="度"
            inline="inline"
            label="旋转"
          />
          <g-input-number
            v-model="config.xAxis.title.display.offset"
            :min="-1000"
            :max="1000"
            :step="1"
            suffix="px"
            inline="inline"
            label="偏移"
          />
        </g-field>
        <g-field :level="2" label="文本样式" :is-flat="true">
          <g-input-number
            v-model="config.xAxis.title.textStyle.fontSize"
            :min="12"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="字号"
          />
          <g-color-picker
            v-model="config.xAxis.title.textStyle.color"
            inline="inline"
            label="颜色"
          />
          <g-select
            v-model="config.xAxis.title.textStyle.fontWeight"
            :data="fontWeights"
            inline="inline"
            label="字体粗细"
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.xAxis.axisLine.show"
        :toggle="true"
        label="轴线"
      >
        <g-field :level="2" label="类型">
          <g-select v-model="config.xAxis.axisLine.type" :data="lineStyles" />
        </g-field>
        <g-field :level="2" label="粗细">
          <g-input-number
            v-model="config.xAxis.axisLine.width"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field :level="2" label="颜色">
          <g-color-picker v-model="config.xAxis.axisLine.color" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.xAxis.axisTick.show"
        :toggle="true"
        label="轴刻度"
      >
        <g-field :level="2" label="类型">
          <g-select v-model="config.xAxis.axisTick.type" :data="lineStyles" />
        </g-field>
        <g-field :level="2" label="粗细">
          <g-input-number
            v-model="config.xAxis.axisTick.width"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field :level="2" label="颜色">
          <g-color-picker v-model="config.xAxis.axisTick.color" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.xAxis.axisLabel.show"
        :toggle="true"
        label="轴标签"
      >
        <g-field
          v-if="config.xAxis.type === 'value'"
          :level="2"
          tooltip="整数参照 d, 浮点参照 .1f"
          label="显示格式"
        >
          <g-select
            v-model="config.xAxis.axisLabel.valueFormat"
            :data="valueFormats"
          />
        </g-field>
        <g-field
          v-if="config.xAxis.type === 'time'"
          :level="2"
          tooltip="时间请参照 YYYY/MM/DD HH:mm:ss"
          label="显示格式"
        >
          <g-select
            v-model="config.xAxis.axisLabel.timeFormat"
            :data="timeFormats"
          />
        </g-field>
        <g-field :level="2" label="两端间距">
          <g-input-number
            v-model="config.xAxis.axisLabel.boundaryGap"
            :min="0"
            :max="100"
            :step="1"
            suffix="%"
          />
        </g-field>
        <g-field :level="2" label="展示方式" :is-flat="true">
          <g-input-number
            v-model="config.xAxis.axisLabel.display.rotate"
            :min="0"
            :max="360"
            :step="1"
            suffix="度"
            inline="inline"
            label="旋转"
          />
          <g-input-number
            v-model="config.xAxis.axisLabel.display.margin"
            :min="-1000"
            :max="1000"
            :step="1"
            suffix="px"
            inline="inline"
            label="偏移"
          />
        </g-field>
        <g-field :level="2" label="对齐方式">
          <g-select v-model="config.xAxis.axisLabel.align" :data="hAligns" />
        </g-field>
        <g-field :level="2" label="文本样式" :is-flat="true">
          <g-input-number
            v-model="config.xAxis.axisLabel.textStyle.fontSize"
            :min="12"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="字号"
          />
          <g-color-picker
            v-model="config.xAxis.axisLabel.textStyle.color"
            inline="inline"
            label="颜色"
          />
          <g-select
            v-model="config.xAxis.axisLabel.textStyle.fontWeight"
            :data="fontWeights"
            inline="inline"
            label="字体粗细"
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.xAxis.grid.show"
        :toggle="true"
        label="网格线"
      >
        <g-field :level="2" label="线型样式" :is-flat="true">
          <g-select
            v-model="config.xAxis.grid.line.type"
            :data="lineStyles"
            inline="inline"
            label="类型"
          />
          <g-input-number
            v-model="config.xAxis.grid.line.width"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="粗细"
          />
          <g-color-picker
            v-model="config.xAxis.grid.line.color"
            inline="inline-single"
            label="颜色"
          />
          <g-input-number
            v-if="config.xAxis.grid.line.type === 'dashed'"
            v-model="config.xAxis.grid.line.dashedLength"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="长度"
          />
          <g-input-number
            v-if="config.xAxis.grid.line.type === 'dashed'"
            v-model="config.xAxis.grid.line.dashedSpace"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="间距"
          />
        </g-field>
      </g-field-collapse>
    </g-field-collapse>
    <g-field-collapse v-model="config.yAxis.show" :toggle="true" label="Y轴">
      <g-field :level="2" label="数据类型">
        <n-radio-group v-model:value="config.yAxis.type" size="small">
          <n-radio-button v-for="em in axisTypes" :key="em.id" :value="em.id">
            {{ em.value }}
          </n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field
        v-if="config.yAxis.type === 'value'"
        :level="2"
        tooltip="默认使用数据中的最大最小值, 如若不符合需求请点击下拉框输入最大最小值"
        label="显示范围"
        :is-flat="true"
      >
        <g-select-suggest
          v-model="config.yAxis.extent.min"
          :data="selectSuggests"
          :filters="['auto', 'dataMin', 'dataMax']"
          inline="inline"
          label="最小值"
        />
        <g-select-suggest
          v-model="config.yAxis.extent.max"
          :data="selectSuggests"
          :filters="['auto', 'dataMin', 'dataMax']"
          inline="inline"
          label="最大值"
        />
      </g-field>
      <g-field :level="2" label="两端留白">
        <n-switch v-model:value="config.yAxis.boundaryGap" />
      </g-field>
      <g-field-collapse
        v-model="config.yAxis.title.show"
        :toggle="true"
        label="轴标题"
      >
        <g-field :level="2" label="标题显示">
          <g-input v-model="config.yAxis.title.name" />
        </g-field>
        <g-field :level="2" label="位置">
          <g-select
            v-model="config.yAxis.title.location"
            :data="titleLocations"
          />
        </g-field>
        <g-field :level="2" label="展示方式" :is-flat="true">
          <g-input-number
            v-model="config.yAxis.title.display.rotate"
            :min="0"
            :max="360"
            :step="1"
            suffix="度"
            inline="inline"
            label="旋转"
          />
          <g-input-number
            v-model="config.yAxis.title.display.offset"
            :min="-1000"
            :max="1000"
            :step="1"
            suffix="px"
            inline="inline"
            label="偏移"
          />
        </g-field>
        <g-field :level="2" label="文本样式" :is-flat="true">
          <g-input-number
            v-model="config.yAxis.title.textStyle.fontSize"
            :min="12"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="字号"
          />
          <g-color-picker
            v-model="config.yAxis.title.textStyle.color"
            inline="inline"
            label="颜色"
          />
          <g-select
            v-model="config.yAxis.title.textStyle.fontWeight"
            :data="fontWeights"
            inline="inline"
            label="字体粗细"
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.yAxis.axisLine.show"
        :toggle="true"
        label="轴线"
      >
        <g-field :level="2" label="类型">
          <g-select v-model="config.yAxis.axisLine.type" :data="lineStyles" />
        </g-field>
        <g-field :level="2" label="粗细">
          <g-input-number
            v-model="config.yAxis.axisLine.width"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field :level="2" label="颜色">
          <g-color-picker v-model="config.yAxis.axisLine.color" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.yAxis.axisTick.show"
        :toggle="true"
        label="轴刻度"
      >
        <g-field :level="2" label="类型">
          <g-select v-model="config.yAxis.axisTick.type" :data="lineStyles" />
        </g-field>
        <g-field :level="2" label="粗细">
          <g-input-number
            v-model="config.yAxis.axisTick.width"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field :level="2" label="颜色">
          <g-color-picker v-model="config.yAxis.axisTick.color" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.yAxis.axisLabel.show"
        :toggle="true"
        label="轴标签"
      >
        <g-field
          v-if="config.yAxis.type === 'value'"
          :level="2"
          tooltip="整数参照 d, 浮点参照 .1f"
          label="显示格式"
        >
          <g-select
            v-model="config.yAxis.axisLabel.valueFormat"
            :data="valueFormats"
          />
        </g-field>
        <g-field
          v-if="config.yAxis.type === 'time'"
          :level="2"
          tooltip="时间请参照 YYYY/MM/DD HH:mm:ss"
          label="显示格式"
        >
          <g-select
            v-model="config.yAxis.axisLabel.timeFormat"
            :data="timeFormats"
          />
        </g-field>
        <g-field
          :level="2"
          tooltip="默认会采用标签不重叠的策略间隔显示标签，可以设置成 0 强制显示所有标签。"
          label="间隔"
        >
          <g-select-suggest
            v-model="config.yAxis.axisLabel.interval"
            :data="selectSuggests"
            :filters="['auto', '0', '1', '2']"
          />
        </g-field>
        <g-field :level="2" label="展示方式" :is-flat="true">
          <g-input-number
            v-model="config.yAxis.axisLabel.display.rotate"
            :min="0"
            :max="360"
            :step="1"
            suffix="度"
            inline="inline"
            label="旋转"
          />
          <g-input-number
            v-model="config.yAxis.axisLabel.display.margin"
            :min="-1000"
            :max="1000"
            :step="1"
            suffix="px"
            inline="inline"
            label="偏移"
          />
        </g-field>
        <g-field :level="2" label="对齐方式">
          <g-select v-model="config.yAxis.axisLabel.align" :data="hAligns" />
        </g-field>
        <g-field :level="2" label="文本样式" :is-flat="true">
          <g-input-number
            v-model="config.yAxis.axisLabel.textStyle.fontSize"
            :min="12"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="字号"
          />
          <g-color-picker
            v-model="config.yAxis.axisLabel.textStyle.color"
            inline="inline"
            label="颜色"
          />
          <g-select
            v-model="config.yAxis.axisLabel.textStyle.fontWeight"
            :data="fontWeights"
            inline="inline"
            label="字体粗细"
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.yAxis.grid.show"
        :toggle="true"
        label="网格线"
      >
        <g-field :level="2" label="线型样式" :is-flat="true">
          <g-select
            v-model="config.yAxis.grid.line.type"
            :data="lineStyles"
            inline="inline"
            label="类型"
          />
          <g-input-number
            v-model="config.yAxis.grid.line.width"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="粗细"
          />
          <g-color-picker
            v-model="config.yAxis.grid.line.color"
            inline="inline-single"
            label="颜色"
          />
          <g-input-number
            v-model="config.yAxis.grid.line.dashedLength"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="长度"
          />
          <g-input-number
            v-model="config.yAxis.grid.line.dashedSpace"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="间隔"
          />
        </g-field>
      </g-field-collapse>
    </g-field-collapse>
    <g-field-collapse
      v-model="config.tooltip.show"
      :toggle="true"
      label="提示框"
    >
      <g-field :level="2" label="触发方式">
        <n-radio-group v-model:value="config.tooltip.triggerOn" size="small">
          <n-radio-button
            v-for="pair in [
              { key: 'mousemove', value: '悬浮' },
              { key: 'click', value: '点击' },
            ]"
            :key="pair.key"
            :value="pair.key"
          >
            {{ pair.value }}
          </n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field-collapse label="文本样式">
        <g-field :level="2" label="字号">
          <g-input-number
            v-model="config.tooltip.textStyle.fontSize"
            :min="12"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field :level="2" label="颜色">
          <g-color-picker v-model="config.tooltip.textStyle.color" />
        </g-field>
        <g-field :level="2" label="字体粗细">
          <g-select
            v-model="config.tooltip.textStyle.fontWeight"
            :data="fontWeights"
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse label="弹框背景">
        <g-field :level="2" label="背景边距" :is-flat="true">
          <g-input-number
            v-model="config.tooltip.background.padding.h"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="水平"
          />
          <g-input-number
            v-model="config.tooltip.background.padding.v"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="垂直"
          />
        </g-field>
        <g-field :level="2" label="背景色">
          <g-color-picker v-model="config.tooltip.background.color" />
        </g-field>
        <g-field :level="2" label="边框颜色">
          <g-color-picker v-model="config.tooltip.background.borderColor" />
        </g-field>
        <g-field :level="2" label="边框粗细">
          <g-input-number
            v-model="config.tooltip.background.borderWidth"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.tooltip.pointer.show"
        :toggle="true"
        label="轴指示器"
      >
        <g-field :level="2" label="线型样式" :is-flat="true">
          <g-select
            v-model="config.tooltip.pointer.line.type"
            :data="lineStyles"
            inline="inline"
            label="类型"
          />
          <g-input-number
            v-model="config.tooltip.pointer.line.width"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="粗细"
          />
          <g-color-picker
            v-model="config.tooltip.pointer.line.color"
            inline="inline-single"
            label="颜色"
          />
          <g-input-number
            v-if="config.tooltip.pointer.line.type === 'dashed'"
            v-model="config.tooltip.pointer.line.dashedLength"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="长度"
          />
          <g-input-number
            v-if="config.tooltip.pointer.line.type === 'dashed'"
            v-model="config.tooltip.pointer.line.dashedSpace"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="间距"
          />
        </g-field>
      </g-field-collapse>
    </g-field-collapse>
    <g-field-collapse v-model="config.legend.show" :toggle="true" label="图例">
      <g-field :level="2" label="位置">
        <g-select v-model="config.legend.position" :data="legendLocations" />
      </g-field>
      <g-field :level="2" label="布局方式">
        <n-radio-group v-model:value="config.legend.orient" size="small">
          <n-radio-button v-for="em in orients" :key="em.id" :value="em.id">
            {{ em.value }}
          </n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field :level="2" label="文本样式" :is-flat="true">
        <g-input-number
          v-model="config.legend.textStyle.fontSize"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline="inline"
          label="字号"
        />
        <g-color-picker
          v-model="config.legend.textStyle.color"
          inline="inline"
          label="颜色"
        />
        <g-select
          v-model="config.legend.textStyle.fontWeight"
          :data="fontWeights"
          inline="inline-single"
          label="字体粗细"
        />
      </g-field>
      <g-field-collapse
        v-model="config.legend.symbol.show"
        :toggle="true"
        label="图例图标"
      >
        <g-field :level="2" label="图标">
          <g-select-shape
            v-model="config.legend.symbol.icon"
            :shapes="legendIcons"
          />
        </g-field>
        <g-field :level="2" label="宽度">
          <g-input-number
            v-model="config.legend.symbol.width"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field :level="2" label="高度">
          <g-input-number
            v-model="config.legend.symbol.height"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field :level="2" label="间隔">
          <g-input-number
            v-model="config.legend.symbol.gap"
            :min="-1000"
            :max="1000"
            :step="1"
            suffix="px"
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.legend.page.enabled"
        :toggle="true"
        label="翻页功能"
      >
        <g-field :level="2" label="容器尺寸" :is-flat="true">
          <g-input-number
            v-model="config.legend.page.size.width"
            :min="0"
            :max="1000"
            :step="1"
            suffix="px"
            inline="inline"
            label="宽度"
          />
          <g-input-number
            v-model="config.legend.page.size.height"
            :min="0"
            :max="1000"
            :step="1"
            suffix="px"
            inline="inline"
            label="高度"
          />
        </g-field>
        <g-field :level="2" label="翻页按钮" :is-flat="true">
          <g-input-number
            v-model="config.legend.page.button.size"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="尺寸"
          />
          <g-color-picker
            v-model="config.legend.page.button.color"
            inline="inline"
            label="颜色"
          />
          <g-color-picker
            v-model="config.legend.page.button.inactiveColor"
            inline="inline-single"
            label="禁用颜色"
          />
        </g-field>
        <g-field :level="2" label="页码颜色">
          <g-color-picker v-model="config.legend.page.pageNumColor" />
        </g-field>
      </g-field-collapse>
    </g-field-collapse>
    <g-field-collapse
      label="系列"
      mode="layout"
      default-layout="horizontal"
      :features="['vertical', 'horizontal', 'copy', 'add', 'remove']"
      :list="config.series"
      :min="1"
      :max="100"
      tab="系列"
      :add-item="handleAddSeriesItem"
    >
      <template #default="slotProps">
        <g-field
          :level="2"
          tooltip="名称不填时显示数据字段 s 的值"
          label="系列名称"
        >
          <g-input v-model="slotProps.item.name" />
        </g-field>
        <g-field :level="2" label="区域样式" :is-flat="true">
          <g-select-shape
            v-model="slotProps.item.point.icon"
            :shapes="legendIcons"
            inline="inline"
            label="符号"
          />
          <g-color-picker
            v-model="slotProps.item.point.color"
            inline="inline"
            label="填充色"
          />
          <g-color-picker
            v-model="slotProps.item.point.borderColor"
            inline="inline"
            label="描边颜色"
          />
          <g-input-number
            v-model="slotProps.item.point.borderWidth"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="描边粗细"
          />
          <g-select
            v-model="slotProps.item.point.borderType"
            :data="lineStyles"
            inline="inline-single"
            label="描边类型"
          />
          <g-slider
            v-model="slotProps.item.point.opacity"
            :min="0"
            :max="1"
            :step="0.01"
            inline="inline"
            label="透明度"
          />
        </g-field>
        <g-field-collapse
          v-model="slotProps.item.label.show"
          :toggle="true"
          label="标注"
        >
          <g-field :level="2" label="标注字段">
            <g-input v-model="slotProps.item.label.field" />
          </g-field>
          <g-field :level="2" label="数值格式">
            <g-select
              v-model="slotProps.item.label.valueFormat"
              :data="valueFormats"
            />
          </g-field>
          <g-field :level="2" label="前后缀" :is-flat="true">
            <g-input
              v-model="slotProps.item.label.describe.prefix"
              inline="inline"
              label="前缀"
            />
            <g-input
              v-model="slotProps.item.label.describe.suffix"
              inline="inline"
              label="后缀"
            />
          </g-field>
          <g-field :level="2" label="相对偏移" :is-flat="true">
            <g-input-number
              v-model="slotProps.item.label.offset.x"
              :min="-1000"
              :max="1000"
              :step="1"
              suffix="px"
              inline="inline"
              label="水平"
            />
            <g-input-number
              v-model="slotProps.item.label.offset.y"
              :min="-1000"
              :max="1000"
              :step="1"
              suffix="px"
              inline="inline"
              label="垂直"
            />
          </g-field>
          <g-field :level="2" label="旋转角度">
            <g-input-number
              v-model="slotProps.item.label.rotate"
              :min="0"
              :max="360"
              :step="1"
            />
          </g-field>
          <g-field :level="2" label="文本样式" :is-flat="true">
            <g-input-number
              v-model="slotProps.item.label.textStyle.fontSize"
              :min="12"
              :max="100"
              :step="1"
              suffix="px"
              inline="inline"
              label="字号"
            />
            <g-color-picker
              v-model="slotProps.item.label.textStyle.color"
              inline="inline"
              label="颜色"
            />
            <g-select
              v-model="slotProps.item.label.textStyle.fontWeight"
              :data="fontWeights"
              inline="inline-single"
              label="字体粗细"
            />
          </g-field>
          <g-field :level="2" label="描边" :is-flat="true">
            <g-color-picker
              v-model="slotProps.item.label.stroke.color"
              inline="inline"
              label="颜色"
            />
            <g-input-number
              v-model="slotProps.item.label.stroke.width"
              :min="0"
              :max="100"
              :step="1"
              suffix="px"
              inline="inline"
              label="粗细"
            />
          </g-field>
        </g-field-collapse>
      </template>
    </g-field-collapse>
    <g-field-collapse
      v-model="config.animation.enabled"
      :toggle="true"
      label="动画"
    >
      <g-field :level="2" label="持续时间">
        <g-input-number
          v-model="config.animation.duration"
          :min="0"
          :step="100"
          suffix="ms"
        />
      </g-field>
      <g-field :level="2" label="缓动效果">
        <g-select v-model="config.animation.easing" :data="animationEasings" />
      </g-field>
      <g-field :level="2" label="延迟">
        <g-input-number
          v-model="config.animation.delay"
          :min="0"
          :step="100"
          suffix="ms"
        />
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from "vue";
import {
  fontFamilys,
  axisTypes,
  selectSuggests,
  titleLocations,
  fontWeights,
  lineStyles,
  valueFormats,
  timeFormats,
  hAligns,
  legendLocations,
  orients,
  legendIcons,
  animationEasings,
} from "@/data/select-options";
import { LineBar, LineBarSeries } from "./line-bar";

export default defineComponent({
  name: "VLineBarProp",
  props: {
    com: {
      type: Object as PropType<LineBar>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, "config");

    const handleAddSeriesItem = () => {
      return new LineBarSeries("");
    };

    return {
      config,
      handleAddSeriesItem,

      fontFamilys,
      axisTypes,
      selectSuggests,
      titleLocations,
      fontWeights,
      lineStyles,
      valueFormats,
      timeFormats,
      hAligns,
      legendLocations,
      orients,
      legendIcons,
      animationEasings,
    };
  },
});
</script>-->
