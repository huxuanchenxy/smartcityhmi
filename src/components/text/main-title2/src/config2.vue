<template>
  <div>我是测试看得到吗2222</div>
  </template>
  
  <script lang='ts'>
  import { defineComponent, PropType, toRef } from 'vue'
  import {
    fontFamilys,
    fontWeights,
    justifyContents,
    writingModes,
    lineStyles,
    cursorFamily,
  } from '@/data/select-options'
  import { MainTitle2 } from './main-title2'
  
  export default defineComponent({
    name: 'VMainTitle2Prop',
    props: {
      com: {
        type: Object as PropType<MainTitle2>,
        required: true,
      },
    },
    setup(props) {
      const config = toRef(props.com, 'config')
  console.log('111',config.value);
      return {
        config,
        cursorFamily,
        fontFamilys,
        fontWeights,
        justifyContents,
        writingModes,
        lineStyles,
      }
    },
  })
  </script>
  