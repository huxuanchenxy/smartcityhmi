import { DatavComponent } from '@/components/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  initApiConfig, initApiData
} from '@/components/data-source'
import { DataEventConfig } from '@/components/data-event'
import { createField } from '@/components/data-field'
import { getStaticData } from '@/api/data'

export const TableEvent = {
  rowClicked: 'rowClicked',
  dataFlipped: 'data-flipped',
  dataHighLight: 'data-highLight',
  scrollEnd: 'scroll-end',
}

/**
 * TableSeries
 */
export class TableSeries {
  columnName: string
  displayName: string

  width = 20
  dataType = 'text'
  widthPercent = 50
  margin = {
    top: 0,
    bottom: 10,
    left: 0,
    right: 10,
  }
  isBr = false
  textAlign = 'left'
  textStyle = {
    fontFamily: 'Microsoft Yahei',
    fontWeight: 'normal',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  }

  constructor(columnName: string, displayName: string) {
    this.columnName = columnName
    this.displayName = displayName
  }
}

/**
 * Table
 */
export class Table extends DatavComponent {
  config = {
    global: {
      rowCount: 5,
      isLoop: true,
      fontFamily: 'arial',
      animation: {
        mode: 'bottom',
        duration: 2,
        singleStop: true,
      },
      highLight: {
        show: false,
        isOrder: true,
        hlIndex: '3,4',
        hlStyle: {
          textStyle: {
            fontFamily: 'arial',
            fontSize: 12,
            color: '#fff',
            fontWeight: 'normal',
          },
          bgColor: 'rgb(154, 205, 50)',
          border: {
            width: 1,
            style: 'solid',
            color: '#f00',
          },
        },
      },
      ifRowHidden: true,
      textAnimate: {
        ifRun: true,
        isSpeed: true,
        animateDur: 2,
        speedRate: 0.03,
      },
      defaultImg: 'https://files.pengxiaotian.com/datav/datav-img-placeholder.png',
    },
    header: {
      show: true,
      heightPercent: 20,
      bgColor: 'rgb(10, 115, 255)',
      textStyle: {
        textAlign: 'left',
        fontFamily: 'arial',
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'normal',
      },
    },
    row: {
      oddBGColor: 'rgb(10, 115, 255)',
      evenBGColor: 'rgb(36, 130, 255)',
    },
    idList: {
      show: true,
      bgColor: 'rgb(44, 156, 255)',
      width: 12,
      radius: 60,
      textStyle: {
        fontFamily: 'Microsoft Yahei',
        fontWeight: 'normal',
        fontSize: 10,
        color: '#ffffff',
      },
    },
    series: [] as TableSeries[],
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('Table', { w: 300, h: 200 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('index', {
        type: 'number',
        description: '索引值',
      }),
    ]

    this.apis = initApiConfig({
      fields: Object.assign({}, ...fields),
    })


    this.apiData = initApiData(this.id)

    this.events = {}

    this.actions = {}

    this.config.series.push(
      new TableSeries('area', '地区'),
      new TableSeries('pv', '流量(pv)'),
    )

    const item = new TableSeries('attribute', '用户行为特征')
    item.width = 53
    this.config.series.push(item)

    return this
  }

  async loadData() {
    try {
      const path = 'carousel/table'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Table

export const defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAABBCAMAAADygeqaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxIAAAsSAdLdfvwAAADhUExURUdwTADY3BPL1gDZ3ADZ3ATY3ADZ3ADZ3ADZ3ADZ3NTF2ATY3AHW2wXV2gDZ3ADZ3ADZ3ADZ3DCCq0HG1AbZ3ALZ3ADZ3AfS2ADZ3ADZ3ADZ3Me2yRwpcrehwcSzzkNOld/j6G+SpMSsyS9BiD6yxZqNusGuxMrh5iGUtNbA1xSRslxRnKuvyJyFtDSju2xeoADZ3AQvdQEeYw9BiQQpbj2uwDGHrNvn6UBBkSt6pjgseUfN0ws4gRFymwIjVROYrLObuRpKihdZjDE5hnNypzWBiKyMnqG80UnY2VuCrg53iWrCbhYAAAAwdFJOUwAhD3M6kqmI2wj+Y0MaKUx/bO4Fv1vzMlL65/n8G32X7f1O1efzpu2tzHtUPijJ36w5cUEAAAL/SURBVFjD7ZVpc5swEIYFiBtxBDDER2IncdIjaTHGqe/4Ttr//4O6C7ZDZxrSzrj9pGfGFqxgX+0hQQiHw+FwOBzO3/DhrMzNXfvurt1uN7rdxtXJNKLV7BEY4W80ev6WYywaxkf/dIFcpmlvulyuVqvZQaKxMwzj/oTJYs00zXrAtLnebDbdZ2OxWxjG7WFel0Kf2bEkUMIoMalpRaLABMG2LYlFgufRSLIipkdVIp9SIBcZ5qzH4+Gm2zpMCy4NTRdcy75uWq4kOaFgma7lxMwV3TAOVY/Fihw5VRr+NYpAKP1+fzkcTpvj8Xh9eZwWJFtVVTN0VYfEiuVRxbQ92QURk1JZNR3Z8x2FymFltqxlhhp9ZNrroca1eJwVpdiyWRhGokVEymLJij1LYJ5neWYo2qZNqeRQEVJZ3b+jZZodJNIsa44/n3yPCGfQtv1pLpHNe1l6jX1L1SO4RoYZE9UyEto8tn8AMMH2ZtlHk5fBrN/LwP8cspWHYSdHNJ0QBS9okJRwVfx3guKB4g35LQ3xZjJ5mTz1M5CYTw8F9169SYSe4xiUhBON1nJbVMMHABQT38xWOJlMBk9Psx5orIcP+4bTkqQuyyoOIrxfB5kwlmUZRg0GCqHV4NqEcGo2ITEIxhUlCSaDAYqs5s3hsW8t8AnVgmW6YZKco886JEWCa9xxDvoE//WoniQK0WEtQeWxNUCN2ezHdvP1NVwl2GeAaejFBjU118Ssi7mNgX/VxFJ5uIzK3pJB4xEktuXzNpIlT8ayupANgRAYzgUw1BkpbmgRFbaClgdTfWzdDB5H3zvb7W3JKBXFDXDpiblfOqTII0UKIao8RWgDauydTWKCxG7X6TyU9k2t0KB532IgmBRL0XD75LYkKkrt5HfuexvR/9JZwGfjohyGlqMKxQj96QeaJkcWprGwQWF8RdMUvA3Ed3f7vYG0yttGzyG+vr/Ao74YiP6LTcRn/uRIuQWJi3/8aW+d9gP7ey6Mq38tQVoXhMPhcDgcDuc/8xNsRHRmPkNeHAAAAABJRU5ErkJggg=='
