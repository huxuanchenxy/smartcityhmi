<template>
  <template v-for="item in config" :key="item.key">
    <template v-if="!item.config.isHide && judgeDisplay(item)">
      <preview-prop-item
        v-if="isFlat"
        :key="item.config.component"
        :data-type="item.config.type"
        :component-type="item.config.component"
        :default-value="item.config.defaultValue"
        :min="item.config.InfiniteMin ? -Infinity : item.config.min"
        :max="item.config.InfiniteMax ? Infinity : item.config.max"
        :step="item.config.step"
        :suffix="item.config.suffix"
        :label="item.config.alias"
        :enums="item.config.enums"
        :inline="item.config.displayMode"
        :flat-value="item.config.flatValue"
      />
      <template v-else-if="item.children">
        <g-field-collapse
          v-if="item.config.displayMode === 'nest'"
          :label="item.config.alias"
          :tooltip="item.config.tip"
          :toggle="!!item.config.toggleCol"
          :model-value="true"
        >
          <preview-prop
            :config="item.children"
            :toggle-col="item.config.toggleCol"
            :level="2"
          />
        </g-field-collapse>
        <g-field-collapse
          v-else-if="item.config.displayMode === 'nest-array'"
          :label="item.config.alias"
          :tooltip="item.config.tip"
          :toggle="!!item.config.toggleCol"
          :model-value="true"
          mode="layout"
          :default-layout="item.config.layout"
          :features="item.config.features"
          :list="item.children"
          :min="item.config.min"
          :max="item.config.max"
          :tab="item.children[0].config.alias"
        >
          <template #default="slotProps">
            <g-field
              v-if="slotProps.item.config.displayMode === 'flat'"
              :label="slotProps.item.config.alias"
              :tooltip="slotProps.item.config.tip"
              :level="2"
              :is-flat="true"
            >
              <preview-prop
                :config="slotProps.item.children"
                :toggle-col="slotProps.item.config.toggleCol"
                :is-flat="true"
                :level="2"
              />
            </g-field>
            <preview-prop
              v-else
              :config="slotProps.item.children"
              :toggle-col="slotProps.item.config.toggleCol"
              :level="2"
            />
          </template>
        </g-field-collapse>
        <g-field
          v-else-if="item.config.displayMode === 'flat'"
          :label="item.config.alias"
          :tooltip="item.config.tip"
          :level="level"
          :is-flat="true"
        >
          <preview-prop
            :config="item.children"
            :toggle-col="item.config.toggleCol"
            :is-flat="true"
            :level="2"
          />
        </g-field>
      </template>
      <g-field
        v-else-if="toggleCol !== item.key"
        :label="item.config.alias"
        :tooltip="item.config.tip"
        :level="level"
      >
        <preview-prop-item
          :key="item.config.component"
          :data-type="item.config.type"
          :component-type="item.config.component"
          :default-value="item.config.defaultValue"
          :min="item.config.InfiniteMin ? -Infinity : item.config.min"
          :max="item.config.InfiniteMax ? Infinity : item.config.max"
          :step="item.config.step"
          :suffix="item.config.suffix"
          :enums="item.config.enums"
          :inline="item.config.displayMode"
          :flat-value="item.config.flatValue"
        />
      </g-field>
    </template>
  </template>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { PropDto } from '../props-config/config'
import PreviewPropItem from './preview-prop-item.vue'

export default defineComponent({
  name: 'PreviewProp',
  components: {
    PreviewPropItem,
  },
  props: {
    config: {
      type: Array as PropType<PropDto[]>,
      required: true,
    },
    toggleCol: String,
    level: {
      type: Number,
      default: 1,
    },
    isFlat: Boolean,
  },
  setup(props) {
    const judgeDisplay = (item: PropDto) => {
      let isok = true
      const { whichEnum } = item.config
      if (whichEnum.field && whichEnum.value) {
        const obj = props.config.find(m => m.key === whichEnum.field)
        if (obj) {
          isok = obj.config.defaultValue === whichEnum.value
        } else {
          isok = false
        }
      }

      return isok
    }

    return {
      judgeDisplay,
    }
  },
})
</script>
