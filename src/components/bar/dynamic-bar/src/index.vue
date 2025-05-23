<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <v-chart
      :option="option"
      autoresize
      :update-options="{ notMerge: true }"
      @click="onClick"
    />
  </div>
</template>

<script lang='ts' setup>
import { PropType, computed, toRef ,getCurrentInstance } from 'vue'
import { groupBy } from 'lodash-es'
import dayjs from 'dayjs'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { AnimationEasing } from '@/utils/types'
import { useDataCenter, getFieldMap } from '@/mixins/data-center'
import { ApiModule } from '@/store/modules/api'
import {
  getAutoValue,
  getLimitValue,
  valueFormater,
} from '@/utils/echarts-utils'
import { DynamicBar } from './dynamic-bar'
import { useEventCenter } from '@/mixins/event-center'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

const props = defineProps({
  com: {
    type: Object as PropType<DynamicBar>,
    required: true,
  },
})

const { datavEmit } = useDataCenter(props.com)
useEventCenter(props.com)
const mitter = getCurrentInstance()?.appContext.config.globalProperties.mitter

const dv_data = computed(() => {
  return ApiModule.dataMap[props.com.id]?.source ?? {}
})

const dv_field = computed(() => {
  return getFieldMap(props.com.apis.source.fields)
})

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const wrapperStyle = computed(() => {
  return {
    transform: 'translateZ(0)',
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})

const chartData = computed(() => {
  return groupBy(dv_data.value, item => item[dv_field.value.s])
})

const getSeries = (keys: string[]) => {
  const { global, yAxis, series } = config.value
  return series.map((item, idx) => {
    const sname = keys[idx]
    let data = []
    if (sname) {
      data = chartData.value[sname].map(m => {
        return {
          value: m[dv_field.value.y],
          dataRef: m ?? {},
        }
      })
    }
    return {
      type: item.type,
      name: item.name || sname,
      symbol: item.point.icon,
      itemStyle: {
        ...item.point,
      },
      label: {
        show: item.label.show,
        ...item.label.textStyle,
        offset: [item.label.offset.x, item.label.offset.y],
        rotate: item.label.rotate,
        textBorderColor: item.label.stroke.color,
        textBorderWidth: item.label.stroke.width,

        // formatter 函数变化时，并不会更新视图，所以平铺到 option 里
        field: item.label.field,
        valueFormat: item.label.valueFormat,
        prefix: item.label.describe.prefix,
        suffix: item.label.describe.suffix,
        formatter: (params: any) => {
          let val = params.data.dataRef[item.label.field] ?? params.value
          if (yAxis.type === 'value') {
            val = valueFormater(val, item.label.valueFormat)
          }
          return item.label.describe.prefix + val + item.label.describe.suffix
        },
      },
      barGap: `${global.innerPadding}%`,
      barCategoryGap: `${global.outerPadding}%`,
      emphasis: {
        focus: 'series',
      },
      data,
    }
  })
}

const option = computed(() => {
  const { global, xAxis, yAxis, tooltip, legend, animation } = config.value
  const [legendTop, legendLeft] = legend.position.split('-')
  const pointerLineStyle = {
    type:
        tooltip.pointer.line.type === 'dashed'
          ? [tooltip.pointer.line.dashedLength, tooltip.pointer.line.dashedSpace]
          : tooltip.pointer.line.type,
    width: tooltip.pointer.line.width,
    color: tooltip.pointer.line.color,
  }

  let data = []
  const keys = Object.keys(chartData.value)
  if (keys.length > 0) {
    data = chartData.value[keys[0]].map(m => m[dv_field.value.x])
  }
  const opts = {
    textStyle: {
      fontFamily: global.fontFamily,
    },
    grid: {
      ...global.margin,
    },
    tooltip: {
      show: tooltip.show,
      textStyle: {
        ...tooltip.textStyle,
      },
      padding: [tooltip.background.padding.v, tooltip.background.padding.h],
      backgroundColor: tooltip.background.color,
      triggerOn: tooltip.triggerOn,
      trigger: tooltip.pointer.show ? 'axis' : 'item',
      axisPointer: {
        type: tooltip.pointer.show ? 'cross' : 'none',
        label: {
          show: false,
        },
        lineStyle: pointerLineStyle,
        crossStyle: pointerLineStyle,
      },
      borderWidth: tooltip.background.borderWidth,
      borderColor: tooltip.background.borderColor,
    },
    legend: {
      show: legend.show,
      top: legendTop,
      left: legendLeft,
      orient: legend.orient,
      textStyle: {
        ...legend.textStyle,
      },
      icon: legend.symbol.show
        ? legend.symbol.icon === 'auto'
          ? null
          : legend.symbol.icon
        : 'none',
      itemWidth: legend.symbol.width,
      itemHeight: legend.symbol.height,
      itemGap: legend.symbol.gap,
      type: legend.page.enabled ? 'scroll' : 'plain',
      width: legend.page.enabled ? legend.page.size.width : 'auto',
      height: legend.page.enabled ? legend.page.size.height : 'auto',
      pageIconSize: legend.page.button.size,
      pageIconColor: legend.page.button.color,
      pageIconInactiveColor: legend.page.button.inactiveColor,
      pageTextStyle: {
        color: legend.page.pageNumColor,
      },
    },
    xAxis: {
      show: xAxis.show,
      type: xAxis.type,
      boundaryGap: xAxis.boundaryGap,
      name: xAxis.title.show ? xAxis.title.name : '',
      nameLocation: xAxis.title.location,
      nameRotate: xAxis.title.display.rotate,
      nameGap: xAxis.title.display.offset,
      nameTextStyle: {
        ...xAxis.title.textStyle,
      },
      axisLine: {
        show: xAxis.axisLine.show,
        lineStyle: {
          type: xAxis.axisLine.type,
          width: xAxis.axisLine.width,
          color: xAxis.axisLine.color,
        },
      },
      axisTick: {
        show: xAxis.axisTick.show,
        lineStyle: {
          type: xAxis.axisTick.type,
          width: xAxis.axisTick.width,
          color: xAxis.axisTick.color,
        },
        alignWithLabel: true,
      },
      axisLabel: {
        show: xAxis.axisLabel.show,
        interval: getAutoValue(xAxis.axisLabel.interval),
        rotate: xAxis.axisLabel.display.rotate,
        margin: xAxis.axisLabel.display.margin,
        align: xAxis.axisLabel.align,
        ...xAxis.axisLabel.textStyle,
        timeFormat: xAxis.axisLabel.timeFormat,
        valueFormat: xAxis.axisLabel.valueFormat,
        formatter: (val: string) => {
          if (xAxis.type === 'time') {
            return dayjs(val).format(xAxis.axisLabel.timeFormat)
          } else if (xAxis.type === 'value') {
            return valueFormater(val, xAxis.axisLabel.valueFormat)
          }
          return val
        },
      },
      splitLine: {
        show: xAxis.grid.show,
        lineStyle: {
          type:
              xAxis.grid.line.type === 'dashed'
                ? [xAxis.grid.line.dashedLength, xAxis.grid.line.dashedSpace]
                : xAxis.grid.line.type,
          width: xAxis.grid.line.width,
          color: xAxis.grid.line.color,
        },
      },
      min: xAxis.type === 'value' ? getLimitValue(xAxis.extent.min) : undefined,
      max: xAxis.type === 'value' ? getLimitValue(xAxis.extent.max) : undefined,
      data,
    },
    yAxis: {
      show: yAxis.show,
      type: yAxis.type,
      name: yAxis.title.show ? yAxis.title.name : '',
      nameLocation: yAxis.title.location,
      nameRotate: yAxis.title.display.rotate,
      nameGap: yAxis.title.display.offset,
      nameTextStyle: {
        ...yAxis.title.textStyle,
      },
      axisLine: {
        show: yAxis.axisLine.show,
        lineStyle: {
          type: yAxis.axisLine.type,
          width: yAxis.axisLine.width,
          color: yAxis.axisLine.color,
        },
      },
      axisTick: {
        show: yAxis.axisTick.show,
        lineStyle: {
          type: yAxis.axisTick.type,
          width: yAxis.axisTick.width,
          color: yAxis.axisTick.color,
        },
        alignWithLabel: true,
      },
      boundaryGap: [
        `${yAxis.axisLabel.boundaryGap}%`,
        `${yAxis.axisLabel.boundaryGap}%`,
      ],
      axisLabel: {
        show: yAxis.axisLabel.show,
        rotate: yAxis.axisLabel.display.rotate,
        margin: yAxis.axisLabel.display.margin,
        align: yAxis.axisLabel.align,
        ...yAxis.axisLabel.textStyle,
        timeFormat: yAxis.axisLabel.timeFormat,
        valueFormat: yAxis.axisLabel.valueFormat,
        formatter: (val: string) => {
          if (yAxis.type === 'time') {
            return dayjs(val).format(yAxis.axisLabel.timeFormat)
          } else if (yAxis.type === 'value') {
            return valueFormater(val, yAxis.axisLabel.valueFormat)
          }
          return val
        },
      },
      splitLine: {
        show: yAxis.grid.show,
        lineStyle: {
          type:
              yAxis.grid.line.type === 'dashed'
                ? [yAxis.grid.line.dashedLength, yAxis.grid.line.dashedSpace]
                : yAxis.grid.line.type,
          width: yAxis.grid.line.width,
          color: yAxis.grid.line.color,
        },
      },
      min: yAxis.type === 'value' ? getLimitValue(yAxis.extent.min) : undefined,
      max: yAxis.type === 'value' ? getLimitValue(yAxis.extent.max) : undefined,
    },
    animation: animation.enabled,
    animationDuration: animation.duration,
    animationEasing: animation.easing as AnimationEasing,
    animationDelay: animation.delay,
    series: getSeries(keys),
  }
  return opts
})

const onClick = (params: any) => {
  if (props.com.handles
      && props.com.handles.clickChart
      && props.com.handles.clickChart.fields
      && props.com.handles.clickChart.fields.length > 0) {

    props.com.handles.clickChart.fields.forEach(field => {
      field.value = params.data.dataRef
      // emit自定义事件
      mitter.emit(field.targetComId, field)
    })
  }
}
</script>
