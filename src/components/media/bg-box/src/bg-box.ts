import { DatavComponent } from '@/components/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
} from '@/components/data-source'
import { DataEventConfig } from '@/components/data-event'
import { DatavImageType } from '@/utils/types'
import { presetImages as BorderBoxPresetImages } from '@/components/media/border-box/src/border-box'

/**
 * BgBox
 */
export class BgBox extends DatavComponent {
  config = {
    borderRadius: 0,
    fills: [
      {
        fill: '#003a8c',
        opacity: 10,
      },
    ],
    border: {
      show: true,
      type: 'flat',
      flat: {
        width: 1,
        style: 'solid',
        color: '#008bff',
      },
      linearGradient: {
        width: 2,
        color: {
          angle: 135,
          stops: [
            {
              offset: 0,
              color: '#00DEFF',
            },
            {
              offset: 100,
              color: '#008BFF',
            },
          ],
        },
      },
      imageType: 'preset',
      presetImage: 'box38',
      customImage: {
        source: 'data/originPic/custom-bg-border.png',
        slice: '32 37 fill',
        width: '32px 37px',
        outset: '0',
        repeat: 'no-repeat',
      },
    },
    filter: {
      blur: '0px',
    },
    backdropFilter: {
      blur: '0px',
    },
    urlConfig: {
      url: '',
      ifBlank: false,
    },
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>

  constructor() {
    super('BgBox', { w: 300, h: 180 })

    this.initData()
  }

  initData() {
    this.apis = {}
    this.apiData = {}
    this.events = {}
    this.actions = {}

    return this
  }

  async loadData() {}
}

export const borderTypes = [
  { id: 'flat', value: '纯色' },
  { id: 'linearGradient', value: '渐变' },
  { id: 'image', value: '图片' },
]

export const imageTypes = [
  { id: 'preset', value: '预设边框' },
  { id: 'custom', value: '自定义边框' },
]

export const presetImages: DatavImageType[] = [
  ...BorderBoxPresetImages,
  {
    id: 'box19',
    name: '框19',
    src: 'data/bg-box/box19-379-180.png',
    preview: 'data/bg-box/pv-box19-736-416.png',
    border: {
      width: '24px', outset: '0', slice: '24 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box20',
    name: '框20',
    src: 'data/bg-box/box20-379-180.png',
    preview: 'data/bg-box/pv-box20-736-416.png',
    border: {
      width: '30px', outset: '0', slice: '30 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box21',
    name: '框21',
    src: 'data/bg-box/box21-378-180.png',
    preview: 'data/bg-box/pv-box21-736-416.png',
    border: {
      width: '24px', outset: '0', slice: '24 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box22',
    name: '框22',
    src: 'data/bg-box/box22-378-180.png',
    preview: 'data/bg-box/pv-box22-736-416.png',
    border: {
      width: '10px', outset: '0', slice: '10 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box23',
    name: '框23',
    src: 'data/bg-box/box23-379-180.png',
    preview: 'data/bg-box/pv-box23-736-416.png',
    border: {
      width: '30px', outset: '0', slice: '30 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box24',
    name: '框24',
    src: 'data/bg-box/box24-379-180.png',
    preview: 'data/bg-box/pv-box24-736-416.png',
    border: {
      width: '10px 120px 10px 170px', outset: '0', slice: '10 120 10 170 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box25',
    name: '框25',
    src: 'data/bg-box/box25-379-180.png',
    preview: 'data/bg-box/pv-box25-736-416.png',
    border: {
      width: '10px 2px 2px 130px', outset: '0', slice: '10 2 2 130 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box26',
    name: '框26',
    src: 'data/bg-box/box26-379-180.png',
    preview: 'data/bg-box/pv-box26-736-416.png',
    border: {
      width: '10px', outset: '0', slice: '10 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box27',
    name: '框27',
    src: 'data/bg-box/box27-379-180.png',
    preview: 'data/bg-box/pv-box27-736-416.png',
    border: {
      width: '20px', outset: '0', slice: '20 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box28',
    name: '框28',
    src: 'data/bg-box/box28-379-181.png',
    preview: 'data/bg-box/pv-box28-736-416.png',
    border: {
      width: '12px', outset: '0', slice: '12 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box29',
    name: '框29',
    src: 'data/bg-box/box29-379-229.png',
    preview: 'data/bg-box/pv-box29-736-416.png',
    border: {
      width: '16px', outset: '0', slice: '16 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box30',
    name: '框30',
    src: 'data/bg-box/box30-379-225.png',
    preview: 'data/bg-box/pv-box30-736-416.png',
    border: {
      width: '10px', outset: '0', slice: '10 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box31',
    name: '框31',
    src: 'data/bg-box/box31-378-223.png',
    preview: 'data/bg-box/pv-box31-736-416.png',
    border: {
      width: '5px', outset: '0', slice: '5 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box32',
    name: '框32',
    src: 'data/bg-box/box32-378-223.png',
    preview: 'data/bg-box/pv-box32-736-416.png',
    border: {
      width: '10px', outset: '0', slice: '10 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box33',
    name: '框33',
    src: 'data/bg-box/box33-378-223.png',
    preview: 'data/bg-box/pv-box33-736-416.png',
    border: {
      width: '30px', outset: '0', slice: '30 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box34',
    name: '框34',
    src: 'data/bg-box/box34-378-223.png',
    preview: 'data/bg-box/pv-box34-736-416.png',
    border: {
      width: '5px', outset: '0', slice: '5 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box35',
    name: '框35',
    src: 'data/bg-box/box35-378-223.png',
    preview: 'data/bg-box/pv-box35-736-416.png',
    border: {
      width: '20px', outset: '0', slice: '20 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box36',
    name: '框36',
    src: 'data/bg-box/box36-378-180.png',
    preview: 'data/bg-box/pv-box36-736-416.png',
    border: {
      width: '1px', outset: '0', slice: '1 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box37',
    name: '框37',
    src: 'data/bg-box/box37-378-180.png',
    preview: 'data/bg-box/pv-box37-736-416.png',
    border: {
      width: '6px', outset: '0', slice: '6 fill', repeat: 'stretch',
    },
  },
  {
    id: 'box38',
    name: '框38',
    src: 'data/bg-box/box38-380-180.png',
    preview: 'data/bg-box/pv-box38-736-416.png',
    border: {
      width: '14px', outset: '0', slice: '14 fill', repeat: 'stretch',
    },
  },
]

export default BgBox
