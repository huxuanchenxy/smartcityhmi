<template>
  <div class="datav">
    <div class="datav-menu">
      <nav-menu :navs="navs" @change="onNavChange" @home="onProjectChange" ref="navMenuRef" :activeMode="1" />
    </div>
    <div class="datav-main">
      <div class="datav-header">
        <nav-header />
      </div>
      <div class="datav-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, provide } from 'vue'
import { useRouter } from 'vue-router'
import NavHeader from './nav-header.vue'
import NavMenu from './nav-menu.vue'
import { useMessage } from 'naive-ui'
import * as mainMenuJson from "@/../public/templates/main-menu.json";
import * as projectMenuJson from "@/../public/templates/project-menu.json";
import { getProjectMenu } from '@/utils/token-util'

export default defineComponent({
  name: 'ProjectMenus',
  components: {
    NavHeader,
    NavMenu,
  },
  setup() {
    const isFixed = ref(false)
    const navMenuRef = ref(null)
    const mainMenu = (mainMenuJson.default as unknown) as any[];
    const projectMenu = (projectMenuJson.default as unknown) as any[];
    const navs = ref([])

    const router = useRouter()
    const nMessage = useMessage()

    const scroll = () => {
      isFixed.value = true //navMainRef.value.$el.offsetTop > 200
    }

    const onNavChange = (nav: any) => {
      router.push({ name: nav.path })
    }

    const onProjectChange = (project: any) => {
      if (!project) {
        router.push({ name: 'Home' })
        navMenuRef.value.activeNav = 0;
        navMenuRef.value.activeItem = 0;
      }
    }

    onMounted(() => {
      //navs.value = projectMenu;
      const projectMenu = (JSON.parse(getProjectMenu()) as any[]).filter(r => r.enabled);
      navs.value = projectMenu;
      window.addEventListener('scroll', scroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', scroll)
    })

    provide('changeProject', (project: any) => {
      onProjectChange(project);
    })

    return {
      isFixed,
      navs,
      onNavChange,
      onProjectChange,
      navMenuRef
    }
  },
})
</script>

<style lang="scss" scoped>
.datav {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .datav-menu {
    width: 360px;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  .datav-main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-width: 800px;
    width: calc(100vw - 360px);
    padding: 0;
    margin: 0;
    user-select: none;

    .datav-header {
      height: 100px;
    }

    .datav-content {
      color: var(--datav-body-bg);
      background-color: #fff;
      height: calc(100vh - 100px);
      padding: 34px 36px 34px 36px;
    }
  }
}
</style>
