<template>
  <div
    :class="['api-editor', {
      '--disable-fold': !collapse,
      '--fold': collapse && visible
    }]"
  >
    <div class="api-editor-title">
      <div class="api-desc ellipsis2" @click="toggle">
        <n-icon v-if="collapse" class="api-fold-icon">
          <IconArrowRight />
        </n-icon>
        {{ apiConfig.description || '数据接口' }}
      </div>
      <div class="api-status success">
        <display-api-status :status="totalStatus" success-text="配置完成" />
      </div>
    </div>
    <div v-show="visible" class="attr-source-wp">
      <div class="data-attr-table-container">
        <table class="data-attr-table">
          <thead class="table-head">
            <tr class="table-head-row">
              <th class="th-item column-item attr-name">
                字段
              </th>
              <th class="th-item column-item attr-value">
                映射
              </th>
              <th class="th-item column-item attr-status">
                状态
              </th>
            </tr>
          </thead>
          <tbody class="table-body">
            <template v-if="Object.keys(apiConfig.fields).length > 0">
              <tr
                v-for="(fc, fn) in apiConfig.fields"
                :key="fn"
                class="table-body-row"
              >
                <td class="column-item attr-name">
                  <n-tooltip placement="left">
                    <template #trigger>
                      <span class="ellipsis2">{{ fn }}</span>
                    </template>
                    {{ fc.description }}
                  </n-tooltip>
                </td>
                <td class="column-item attr-value">
                  <new-input
                    :model-value="fc.map"
                    placeholder="可自定义"
                    class="attr-input"
                    @change="fc.map = $event"
                  />
                </td>
                <td class="column-item attr-status">
                  <display-api-status :status="fieldsStatus[fn]" :optional="fc.optional" />
                </td>
              </tr>
            </template>
            <tr v-else class="table-body-row">
              <td class="column-item attr-name">
                <span>任意</span>
              </td>
              <td class="column-item attr-value"></td>
              <td class="column-item attr-status">
                <display-api-status status="completed" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="data-source">
        <div class="data-result-title">
          数据响应结果
        </div>
        <div class="auto-update-config">
          <n-checkbox v-model:checked="apiConfig.useAutoUpdate" class="auto-update-checkbox">
            自动更新选项
          </n-checkbox>
          <new-input
            :model-value="apiConfig.autoUpdate"
            type="number"
            :disabled="!apiConfig.useAutoUpdate"
            class="update-interval-input"
            @change="apiConfig.autoUpdate = $event"
          />
          秒一次
          <!-- <new-input
            :model-value="apiDataConfig.config.isAppendDataList"
            type="number"
            :disabled="!apiConfig.useAutoUpdate"
            class="update-interval-input"
            @change="apiDataConfig.config.isAppendDataList = $event"
          />
          增量更新-->
          <n-checkbox v-model:checked="apiConfig.isAppendDataList" class="auto-update-checkbox" :disabled="!apiConfig.useAutoUpdate">
            增量更新
          </n-checkbox>
        </div>
        <div class="data-flow-wp">
          <div class="ds-line">
            <div class="ds-title">
              <span class="ds-type-text">{{ datasources[apiDataConfig.type] }}</span>
            </div>
            <n-button
              size="tiny"
              class="ds-action-btn"
              @click="openSourceDrawer"
            >
              配置数据源
            </n-button>
          </div>
          <div class="ds-line mt5">
            <span>数据响应结果 ( 只读 ) </span>
            <n-tooltip placement="left">
              <template #trigger>
                <n-icon class="refresh-btn" @click="refreshData">
                  <IconRefresh />
                </n-icon>
              </template>
              刷新数据
            </n-tooltip>
          </div>
          <div class="ds-dots">
            <span class="ds-dot" :class="[totalStatus === 'completed' ? 'active' : 'error']"></span>
            <span class="ds-dot"></span>
            <span class="ds-dot"></span>
          </div>
        </div>
        <div class="data-response">
          <g-monaco-editor
            language="json"
            :read-only="true"
            :auto-format="true"
            :code="datav_data"
            :height="250"
            full-screen-title="数据响应结果"
          />
        </div>
      </div>
    </div>
    <source-drawer ref="sourceDrawerRef" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed, ComputedRef, inject, provide } from 'vue'
import { DatavComponent } from '@/components/datav-component'
import { ApiConfig, ApiDataConfig, FieldStatus, createDataSources, ApiStatus } from '@/components/data-source'
import { DebugModule } from '@/store/modules/debug'
import { ApiModule } from '@/store/modules/api'
import { setDatavData } from '@/mixins/data-center'
import { IconArrowRight, IconRefresh } from '@/icons'
import DisplayApiStatus from '../components/display-api-status.vue'
import SourceDrawer from './source-drawer.vue'

export default defineComponent({
  name: 'SourcePanel',
  components: {
    DisplayApiStatus,
    SourceDrawer,
    IconArrowRight,
    IconRefresh,
  },
  props: {
    apiName: {
      type: String,
      required: true,
    },
    activeName: String,
    collapse: Boolean,
  },
  setup(props) {
    const visible = computed(() => props.apiName === props.activeName)
    const sourceDrawerRef = ref(null)
    const datasources = createDataSources()

    const com = inject('com') as ComputedRef<DatavComponent>
    const apiConfig = computed((): ApiConfig => com.value.apis[props.apiName])
    const apiDataConfig = computed((): ApiDataConfig => com.value.apiData[props.apiName])

    provide('apiConfig', apiConfig)
    provide('apiDataConfig', apiDataConfig)
    provide('apiName', props.apiName)

    const datav_data = computed(() => {
      const comData = ApiModule.dataMap[com.value.id]
      return comData ? comData[props.apiName] : ''
    })

    const fieldsStatus = computed(() => {
      const comFields = DebugModule.fieldStatusMap[com.value.id]
      return comFields ? comFields[props.apiName] : {}
    })

    const totalStatus = computed(() => {
      const list = Object.values(fieldsStatus.value)
      if (list.includes(FieldStatus.loading)) {
        return ApiStatus.loading
      }

      if (list.includes(FieldStatus.failed)) {
        return ApiStatus.incomplete
      }

      return ApiStatus.completed
    })

    const changePanel = inject('changePanel') as Function

    const toggle = () => {
      if (props.collapse) {
        changePanel(props.apiName)
      }
    }

    const openSourceDrawer = () => {
      sourceDrawerRef.value?.open()
    }

    const refreshData = () => {
      setDatavData(com.value.id, props.apiName, apiConfig.value, apiDataConfig.value)
    }

    return {
      visible,
      sourceDrawerRef,
      datasources,
      com,
      apiConfig,
      apiDataConfig,
      fieldsStatus,
      totalStatus,
      datav_data,
      toggle,
      openSourceDrawer,
      refreshData,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './source-panel.scss';
</style>
