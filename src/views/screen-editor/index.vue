<template>
  <div class="g-layout is-vertical edit-container">
    <div class="g-header">
      <header-toolbar />
    </div>
    <div id="edit-main-wp" class="g-layout edit-main-wp">
      <layer-panel />
      <components-panel />
      <filter-manager-drawer />
      <div class="g-layout edit-main">
        <toolbox-panel />
        <g-loading :spinning="loading">
          <canvas-main />
        </g-loading>
        <footer-toolbar />
      </div>
      <config-panel />
    </div>
  </div>
  <editor-context-menu />
</template>

<script lang='ts'>
import { defineComponent, onMounted, onUnmounted , ref, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { ToolbarModule } from '@/store/modules/toolbar'
import { DebugModule } from '@/store/modules/debug'
import { EditorModule } from '@/store/modules/editor'
import { FilterModule } from '@/store/modules/filter'
import { UploadImagesModule } from '@/store/modules/images'
import { getSysTemplate } from '@/api/templates'
import { useMock } from '@/data/mock'
import { loadAsyncComponent } from '@/utils/async-component'
import { ThreedModule } from '@/store/modules/threed'

export default defineComponent({
  name: 'ScreenEditor',
  components: {
    HeaderToolbar: defineAsyncComponent(() => import('./header-toolbar/index.vue')),
    FooterToolbar: defineAsyncComponent(() => import('./footer-toolbar/index.vue')),
    EditorContextMenu: defineAsyncComponent(() => import('./editor-context-menu/index.vue')),
    CanvasMain: loadAsyncComponent(() => import('./canvas-main/index.vue')),
    LayerPanel: loadAsyncComponent(() => import('./layer-panel/index.vue')),
    ComponentsPanel: loadAsyncComponent(() => import('./components-panel/index.vue')),
    ConfigPanel: loadAsyncComponent(() => import('./config-panel/index.vue')),
    ToolboxPanel: loadAsyncComponent(() => import('./toolbox-panel/index.vue')),
    FilterManagerDrawer: loadAsyncComponent(() => import('./data-filter/filter-manager-drawer.vue')),
  },
  props: {
    projectId: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    const route = useRoute()
    const loading = ref(true)

    DebugModule.enableDebug()
    EditorModule.setEditMode()

    const leaveEvent = async e =>{
      e.preventDefault()

      e = e || window.event

      console.log('before', e, e.cancelable,JSON.stringify(e))
      const isChanged = await EditorModule.isChanged()
      console.log('leaveEvent isChanged',isChanged)
      if(isChanged)
      {
        if (e) {
          e.returnValue = '您是否确认离开此页面-您的编辑可能不会被保存'
        }
        console.log('leaveEvent e true',e)
      }
      else{
        // if(e)
        // {
        //   e.returnValue = ''
        // }
        e = window.Event
        console.log('leaveEvent e false',e)
      }

    }

    onMounted(async () => {
      try {
        const tplId = parseInt(route.query.tpl as string)
        if (tplId > 0) {
          const { data } = await getSysTemplate(tplId)
          if (data) {
            const { config } = data
            EditorModule.setEditorOption({
              screen: {
                id: +props.projectId,
                name: data.name,
              },
              config: {
                width: config.width,
                height: config.height,
                bgimage: config.bgimage,
                bgcolor: config.bgcolor,
                styleFilterParams: config.styleFilterParams,
              },
              coms: config.coms,
              variables: config.variables,
            })

            FilterModule.setFilterOption({
              dataFilters: config.dataFilters ?? [],
            })
          }
          if (tplId === 1) {
            useMock()
          }
        } else {
          const screenId = +props.projectId
          await EditorModule.loadScreen(screenId)
          FilterModule.loadFilters(screenId)
          UploadImagesModule.loadUploadImages(screenId)
          //ThreedModule.loadThreedModelList(2)
          EditorModule.loadComs(screenId)
          await ThreedModule.loadThreedModelList(EditorModule.screen.groupId)
        }
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
        document.title = `${EditorModule.screen.name} | 编辑器`
        EditorModule.autoCanvasScale(() => ({
          offsetX: ToolbarModule.getPanelOffsetX,
          offsetY: ToolbarModule.getPanelOffsetY,
        }))
      }

      window.addEventListener('beforeunload',leaveEvent)
    })

    onUnmounted(()=>{
      window.removeEventListener('beforeunload',leaveEvent)
    })

    return {
      loading,
      leaveEvent,
    }
  },
})
</script>

<style lang="scss" scoped>
.edit-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.edit-main-wp {
  position: relative;
  z-index: 1;
  height: 100%;
  overflow: hidden;
  background: url('../images/bg-canvas.png');
  flex-wrap: nowrap;
}

.edit-main {
  position: relative;
  z-index: 2;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
}
</style>
