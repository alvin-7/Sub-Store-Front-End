<script setup lang='ts'>
import { computed, ref } from 'vue'
import { useGlobalStore } from '@/store/global';
import { useAppNotifyStore } from '@/store/appNotify';
import { useSettingsStore } from '@/store/settings';
import i18n from '@/locales';

interface Props {
  visible: boolean
}

defineProps<Props>()

const { t } = i18n.global;
const { showNotify } = useAppNotifyStore();
const globalStore = useGlobalStore();
const settingsStore = useSettingsStore();
const loading = ref(false)
const password = ref('')

const disabled = computed(() => (!password.value.trim()) || loading.value)

async function handleVerify() {
  const passWord = password.value.trim()

  if (!passWord)
    return showNotify({ title: t('permissionPage.invalid'), type: 'danger' });

  const token = await settingsStore.verify(passWord)
  if (!token) {
    return showNotify({ title: t('permissionPage.invalid'), type: 'danger' });
  }
  try {
    loading.value = true
    showNotify({ title: t('permissionPage.succeed') });
  }
  catch (error: any) {
    password.value = ''
  }
  finally {
    globalStore.setAuth(token)
    this.$router.push({
      path: "/"
    })
    window.location.reload()
  }
}

function handlePress(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleVerify()
  }
}

</script>

<template>
  <nut-popup position="bottom" :style="{ height: '20%' }" :visible="visible" :close-on-click-overlay=false :safe-area-inset-bottom=true :round="true">
    <div class="permission">
      <nut-form>
        <nut-form-item :label="$t('permissionPage.secret')">
          <nut-input v-model="password" type="password" :placeholder="$t('permissionPage.placeholder')" clearable @keypress="handlePress" />
        </nut-form-item>
        <nut-button
          block
          type="primary"
          :disabled="disabled"
          :loading="loading"
          @click="handleVerify"
        >
          {{ $t('permissionPage.submit') }}
        </nut-button>
      </nut-form>
    </div>
  </nut-popup>
</template>
