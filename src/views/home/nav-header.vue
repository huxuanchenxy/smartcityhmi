<template>
  <div>
    <div class="datav-hearder">
      <div class="menu">
        <!-- <div>当前项目：XXXX项目</div> -->
      </div>
      <div class="user">
        <div class="header-item">
          <n-dropdown :options="profileOpts" placement="bottom-end" :show-arrow="true" @select="handleProfileSelect">
            <span class="user-link-wrap">
              <div class="user-avater" style="display: flex; align-items: center; justify-content: space-between;">
                <n-avatar style="margin-left: 5px; margin-top: 2px;" round :size="30" src="data/originPic/avatar.png" />
                <span class="user-link" style="margin-right: 35px; color: #7E7E7E; font-size: 24px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis ;">
                  {{ nameuser  }}
                </span>
                <n-icon style="margin-right: 5px;">
                  <IconArrowDown />
                </n-icon>
              </div>
            </span>
          </n-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { h, defineComponent, ref, onMounted } from 'vue'
import { NIcon } from 'naive-ui'
import { UserStore } from '@/domains/user'
import { useRouter } from 'vue-router'
import { IconLogout, IconArrowDown, IconPassword } from '@/icons'

export default defineComponent({
  name: 'NavHeader',
  components: {
    IconArrowDown,
    IconPassword,
  },
  setup(props, context) {
    const { name, avatar, doLogout } = UserStore()
    const router = useRouter()
    const nameuser = ref('')
    const activeNav = ref(0)
    const profileOpts = [
      {
        label: '编辑密码',
        key: 'updatePassword',
        icon: () => h(NIcon, null, { default: () => h(IconPassword) }),
      },
      {
        label: '退出',
        key: 'logout',
        icon: () => h(NIcon, null, { default: () => h(IconLogout) }),
      },
    ]

    const logout = () => {
      doLogout().finally(() => {
        router.push({ name: 'Login' })
      })
    }

    const handleProfileSelect = (key: string) => {
      switch (key) {
        case 'logout':
          logout()
          break
        case 'updatePassword':
          let username = localStorage.getItem('loginAccount')

          router.push({ name: 'UpdatePassword', params: { userName: username } })
          break
      }
    }
    onMounted(() => {
      let username = localStorage.getItem('loginAccount')
      nameuser.value = username || '默认用户名';
    })

    return {
      nameuser,
      avatar,
      profileOpts,
      handleProfileSelect,
      activeNav,
    }
  },
})
</script>

<style lang="scss">
.datav-hearder {
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 392px);
  height: 100px;
  background-color: #fff;

  .menu {
    display: flex;
    flex: 1;
    min-width: 800px;
    margin-left: 36px;
    border-bottom: 1px solid #E5EAF4;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    font-size: 22px;
    font-family: '思源黑体Normal';
  }

  .user {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
    z-index: 9;
    min-width: 200px;
    border-bottom: 1px solid #E5EAF4;

    .header-item {
      margin: 0 5px;
      padding: 0 10px;
      cursor: pointer;
      user-select: none;
      color: var(--datav-font-color);
      line-height: 35px;
      height: 35px;
    }

    .user-link-wrap {
      display: flex;
      align-items: center;
    }

    .user-avater {
      border: 1px solid #E4E7EC;
      border-radius: 20px;
      display: flex;
      width: 200px;
      height: 36px;

      .user-link {
        display: inline-block;
        vertical-align: middle;
        margin: 0 4px;

        color: var(--datav-font-color);
      }
    }

  }
}
</style>
