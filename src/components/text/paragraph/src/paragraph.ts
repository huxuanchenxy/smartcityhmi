import { DatavComponent } from '@/components/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  initApiConfig, initApiData,
} from '@/components/data-source'
import { createField } from '@/components/data-field'
import { DataEventConfig } from '@/components/data-event'
import { getStaticData } from '@/api/data'

/**
 * Paragraph
 */
export class Paragraph extends DatavComponent {
  config = {
    content: 'DataS 提供运营动态直播、数据综合展示、设备监控预警等多种场景模板，稍加修改就能够直接服务于您的可视化需求。通过拖拽即可实现灵活的可视化布局，在模板的基础上任何人都能够发挥创意，实现您自己的可视化应用。',
    textStyle: {
      fontFamily: 'Microsoft Yahei',
      fontSize: 16,
      color: '#fff',
      fontWeight: 'normal',
    },
    scroll: {
      duration: 5000,
      overScroll: false,
    },
    lineHeight: 36,
    textAlign: 'left',
    textIndent: 32,
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>

  constructor() {
    super('Paragraph', { w: 300, h: 180 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('value', { description: '值' }),
    ]

    this.apis = initApiConfig({
      fields: Object.assign({}, ...fields),
      description: '多行文本接口',
    })

    this.apiData = initApiData(this.id)

    this.events = {}
    this.actions = {}

    return this
  }

  async loadData() {
    try {
      const path = 'text/paragraph'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Paragraph
