<template>
  <div :class="loadingClass"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ToolbarModule } from '@/store/modules/toolbar'

export default defineComponent({
  name: 'HeadLoading',
  computed: {
    loadingClass() {
      return {
        'loading-indicator': true,
        loading: ToolbarModule.loading > 0,
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.loading-indicator {
  position: absolute;
  top: 98px;
  //top: 40px;
  left: 0;
  z-index: 101;
  width: 100%;
  height: 0;
  background: -webkit-gradient(linear, 80% 46%, 10% 21%, from(#15fff3), to(#0b69ff));
  transition: height 0.5s;

  &.loading {
    height: 2px;
    animation: headLadingAnimation 1.5s infinite ease-out;
  }
}

@keyframes headLadingAnimation {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(150%);
  }
}
</style>
