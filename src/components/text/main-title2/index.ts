import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import MainTitle2 from './src/index.vue'

MainTitle2.install = (app: App) => {
  app.component(MainTitle2.name, MainTitle2)
  app.component('VMainTitleProp2', loadAsyncComponent(() => import('./src/config.vue')))
}

export default MainTitle2 as SFCWithInstall<typeof MainTitle2>
