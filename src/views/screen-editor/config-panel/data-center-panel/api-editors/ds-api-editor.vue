<template>
  <div class="ds-wrapper ds-api">
    <p>请求方式</p>
    <div class="datav-new-select-wp">
      <n-select
        v-model:value="apiDataConfig.config.apiMethod"
        :options="apiMethods"
        class="datav-new-select"
        :style="{
          '--border': 'var(--datav-gui-new-select-border)',
          '--color': 'var(--datav-gui-new-select-bgcolor)'
        }"
      />
    </div>
    <p class="url-info">
      <label class="prefix-label textarea-label">URL：</label>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
        class="api-help"
      >重要：跨域问题解决方案</a>
    </p>
    <p class="url-info-text">
      将回调参数配置到url中, 例: http://api.test?value=:value
    </p>
    <g-monaco-editor
      language="plaintext"
      line-numbers="off"
      :height="120"
      :code="apiDataConfig.config.api"
      :completions="variables"
      @blur="updateData"
    />
    <div class="post-request-data">
      <p class="url-info-text">Headers (Optional)</p>
      <g-monaco-editor
        language="json"
        :height="120"
        :auto-format="true"
        :code="apiDataConfig.config.apiHeaders"
        @blur="updateApiHeaders"
      />
    </div>
    <div v-if="apiDataConfig.config.apiMethod === ApiRequestMethod.POST" class="post-request-data">
      <p class="url-info-text">
        <label>POST 请求参数</label>
        <n-select
          v-model:value="apiDataConfig.config.postBodyType"
          :options="postBodyTypeOptions"
          class="datav-new-select"
          :style="{
            '--border': 'var(--datav-gui-new-select-border)',
            '--color': 'var(--datav-gui-new-select-bgcolor)',
            '--width':'200px',
          }"
        />
      </p>
      <g-monaco-editor
        v-if="apiDataConfig.config.postBodyType == PostBodyType.static"
        language="json"
        :height="120"
        :auto-format="true"
        :code="apiDataConfig.config.apiBody"
        @blur="updateApiBody"
      />
      <g-monaco-editor
        v-if="apiDataConfig.config.postBodyType == PostBodyType.function"
        language="javascript"
        :height="120"
        :auto-format="true"
        :code="apiDataConfig.config.postBodyfunc"
        @blur="updatePostBodyFunc"
      />
    </div>
    <n-checkbox v-model:checked="apiDataConfig.config.local" class="ds-checkbox">
      服务器代理请求 (因跨域无法访问时可勾选)
    </n-checkbox>
    <n-checkbox v-model:checked="apiDataConfig.config.cookie" class="ds-checkbox">
      需要 cookie (不选择代理并且需要获取cookie时使用)
    </n-checkbox>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ComputedRef, inject,ref } from 'vue'
import { ApiDataConfig, ApiRequestMethod,PostBodyType } from '@/components/data-source'
import { DatavComponent } from '@/components/datav-component'
import { EditorModule } from '@/store/modules/editor'

export default defineComponent({
  name: 'DsApiEditor',
  setup() {
    const com = inject('com') as ComputedRef<DatavComponent>
    const apiDataConfig = inject('apiDataConfig') as ComputedRef<ApiDataConfig>
    const apiMethods = Object.keys(ApiRequestMethod).map(value => ({ label: value, value }))
    //const apiMethods = [{ lable:'静态参数',value:'static' },{ lable:'函数返回参数',value:'function' }]
    //const postBodyTypeOptions =  Object.keys(PostBodyType).map(value => ({ label: value, value }))
    const postBodyTypeOptions = ref([{ label:'静态参数',value:'static' },{ label:'函数返回参数',value:'function' }])

    const variables = Object.keys(EditorModule.variables.publishersView)

    const updateData = (data: any) => {
      apiDataConfig.value.config.api = data.value
      EditorModule.setSubscribersView({
        id: com.value.id,
        data: data.value,
      })
    }

    const updateApiHeaders = (data: any) => {
      apiDataConfig.value.config.apiHeaders = data.value
    }

    const updateApiBody = (data: any) => {
      apiDataConfig.value.config.apiBody = data.value
    }

    const updatePostBodyFunc = (data: any) => {
      apiDataConfig.value.config.postBodyfunc = data.value
    }

    return {
      ApiRequestMethod,
      apiDataConfig,
      apiMethods,
      postBodyTypeOptions,
      variables,
      updateData,
      updateApiHeaders,
      updateApiBody,
      updatePostBodyFunc,
      PostBodyType,
    }
  },
})
</script>

<style lang="scss" scoped>
.ds-api {
  .url-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .api-help {
      color: var(--datav-main-color);
    }
  }

  .url-info-text {
    margin-bottom: 10px;
  }

  .ds-checkbox {
    line-height: 18px;
    margin-bottom: 10px;
  }

  ::v-deep(.datav-editor) {
    margin-bottom: 10px;
  }
}
</style>
