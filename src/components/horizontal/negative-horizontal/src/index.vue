<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <v-chart :option="option" autoresize :update-options="{ notMerge: true }" @click="onClick" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, toRef,getCurrentInstance } from 'vue'
import { groupBy } from 'lodash-es'
import dayjs from 'dayjs'
import VChart from 'vue-echarts'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { useDataCenter, getFieldMap } from '@/mixins/data-center'
import { ApiModule } from '@/store/modules/api'
import { getAutoValue, getLimitValue, valueFormater } from '@/utils/echarts-utils'
import { NegativeHorizontal } from './negative-horizontal'
import { useEventCenter } from '@/mixins/event-center'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

export default defineComponent({
  name: 'VNegativeHorizontal',
  components: {
    VChart,
  },
  props: {
    com: {
      type: Object as PropType<NegativeHorizontal>,
      required: true,
    },
  },
  setup(props) {
    const { datavEmit } = useDataCenter(props.com)
    useEventCenter(props.com)
    const mitter = getCurrentInstance()?.appContext.config.globalProperties.mitter

    const dv_data = computed(() => {
      return ApiModule.dataMap[props.com.id]?.source ?? []
    })

    const dv_field = computed(() => {
      return getFieldMap(props.com.apis.source.fields)
    })

    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')



    const wrapperStyle = computed(() => {
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
      }
    })

    const chartData = computed(() => {
      const groups = groupBy(dv_data.value, item => item[dv_field.value.x])
      return {
        keys: Object.keys(groups),
        values: Object.values(groups),
      }
    })


    const getSeries = () => {
      const { global, series } = config.value
      const { values } = chartData.value
      return series.map((item, idx) => {
        return {
          type: item.type,
          name: item.name,
          label: {
            show: item.label.show,
            position: item.label.position,
            ...item.label.textStyle,
            offset: [item.label.offsetX, item.label.offsetY],
            formatter: function (params) {
              return Math.abs(parseInt(params.value));
            },
          },
          itemStyle: {
            color: item.color.type === 'gradient'
              ? new graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: item.color.from,
              }, {
                offset: 1,
                color: item.color.to,
              }])
              : item.color.value,
          },
          barGap: `${global.innerPadding}%`,
          barCategoryGap: `${global.outerPadding}%`,
          showBackground: global.background.show,
          backgroundStyle: {
            color: global.background.color,
          },
          stack: 'Total',
          data: values.map(v => {
            const obj = v[idx]
            return {
              value: obj ? obj[dv_field.value.y] : null,
              dataRef: obj ?? {},
            }
          }),
        }
      })
    }

    const option = computed(() => {
      const { global, xAxis, yAxis, tooltip, legend, animation } = config.value
      const [legendTop, legendLeft] = legend.position.split('-')
      const pointerLineStyle = {
        type: tooltip.pointer.line.type === 'dashed'
          ? [tooltip.pointer.line.dashedLength, tooltip.pointer.line.dashedSpace]
          : tooltip.pointer.line.type,
        width: tooltip.pointer.line.width,
        color: tooltip.pointer.line.color,
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
          trigger: tooltip.pointer.show ? 'axis' : 'item',
          axisPointer: {
            type: tooltip.pointer.show ? 'cross' : 'none',
            label: {
              show: false,
            },
            lineStyle: pointerLineStyle,
            crossStyle: pointerLineStyle,
          },
          borderWidth: 0,
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
              ? null : legend.symbol.icon
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
            boundaryGap: xAxis.axisLabel.boundaryGap,
            interval: getAutoValue(xAxis.axisLabel.interval),
            rotate: xAxis.axisLabel.display.rotate,
            margin: xAxis.axisLabel.display.margin,
            align: xAxis.axisLabel.align,
            ...xAxis.axisLabel.textStyle,
            formatter: (val: string) => {
              if (xAxis.type === 'time') {
                return dayjs(val).format(xAxis.axisLabel.timeFormat)
              }
              return val
            },
          },
          splitLine: {
            show: xAxis.grid.show,
            lineStyle: {
              type: xAxis.grid.line.type === 'dashed'
                ? [xAxis.grid.line.dashedLength, xAxis.grid.line.dashedSpace]
                : xAxis.grid.line.type,
              width: xAxis.grid.line.width,
              color: xAxis.grid.line.color,
            },
          }
        },
        yAxis: {
          show: yAxis.show,
          type: 'category',
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
          boundaryGap: [`${yAxis.axisLabel.boundaryGap}%`, `${yAxis.axisLabel.boundaryGap}%`],
          axisLabel: {
            show: yAxis.axisLabel.show,
            rotate: yAxis.axisLabel.display.rotate,
            margin: yAxis.axisLabel.display.margin,
            align: yAxis.axisLabel.align,
            ...yAxis.axisLabel.textStyle,
            formatter: (val: string) => {
              return valueFormater(val, yAxis.axisLabel.valueFormat)
            },
          },
          splitLine: {
            show: yAxis.grid.show,
            lineStyle: {
              type: yAxis.grid.line.type === 'dashed'
                ? [yAxis.grid.line.dashedLength, yAxis.grid.line.dashedSpace]
                : yAxis.grid.line.type,
              width: yAxis.grid.line.width,
              color: yAxis.grid.line.color,
            },
          },
          min: getLimitValue(yAxis.extent.min),
          max: getLimitValue(yAxis.extent.max),
          splitNumber: yAxis.splitNumber > 0 ? yAxis.splitNumber : null,
          data: chartData.value.keys,
        },
        animation: animation.enabled,
        animationDuration: animation.duration,
        animationEasing: animation.easing as any,
        animationDelay: animation.delay,
        series: getSeries(),
      }
      return opts
    })

    const onClick = (params: any) => {
  if (props.com.handles
    && props.com.handles.clickChart
    && props.com.handles.clickChart.fields
    && props.com.handles.clickChart.fields.length > 0) {

    props.com.handles.clickChart.fields.forEach(field => {
      field.value = params.data.dataRef;
      // emit自定义事件
      mitter.emit(field.targetComId, field);
    })
  }
}

    return {
      wrapperStyle,
      option,
      onClick,
    }
  },
})
</script>
