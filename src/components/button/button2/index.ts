import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Button2 from './src/index.vue'

Button2.install = (app: App): void => {
  app.component(Button2.name, Button2)
  app.component('VButton2Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Button2 as SFCWithInstall<typeof Button2>
