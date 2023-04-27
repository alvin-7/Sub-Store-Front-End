<script setup lang='ts'>
import { computed, ref } from 'vue'
import { useGlobalStore } from '@/store/global';
import { Button, Input, Form, FormItem, OverLay } from '@nutui/nutui';
import { useAppNotifyStore } from '@/store/appNotify';
import i18n from '@/locales';

interface Props {
  visible: boolean
}

defineProps<Props>()

const { t } = i18n.global;
const { showNotify } = useAppNotifyStore();
const globalStore = useGlobalStore();
const loading = ref(false)
const password = ref('')

const disabled = computed(() => (!password.value.trim()) || loading.value)

async function handleVerify() {
  const passWord = password.value.trim()

  console.log(passWord)
  if (!passWord || passWord !== import.meta.env.VITE_API_PASSWORD)
    return showNotify({ title: t('permissionPage.invalid'), type: 'danger' });

  try {
    loading.value = true
    showNotify({ title: t('permissionPage.succeed') });
  }
  catch (error: any) {
    password.value = ''
  }
  finally {
    globalStore.setAuth(true)
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
  <OverLay :visible="visible">
    <div class="permission">
      <Form>
        <FormItem :label="$t('permissionPage.secret')">
          <Input v-model="password" type="password" :placeholder="$t('permissionPage.placeholder')" clearable @keypress="handlePress" />
        </FormItem>
        <Button
          block
          type="primary"
          :disabled="disabled"
          :loading="loading"
          @click="handleVerify"
        >
          {{ $t('permissionPage.submit') }}
        </Button>
        </Form>
    </div>
  </OverLay>
</template>

<style scoped lang="scss">
  .permission {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>
