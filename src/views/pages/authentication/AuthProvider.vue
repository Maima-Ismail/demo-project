<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import router from '@/router'
import { useProjectStore } from '@/views/dashboards/analytics/useProjectStore'
const authProviders = [
  {
    icon: 'fa-google',
    color: '#dd4b39',
  }, 
]
const loginWithGoogle = async () => {
      const store = useProjectStore()
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      try {
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        store.setUser(user)
      } catch (error) {
        console.log('Error logging in with google', error)
      }
      router.push('/dashboards/analytics')
    }
</script>

<template>
  <div class="d-flex justify-center flex-wrap gap-3">
    <VBtn
      v-for="link in authProviders"
      :key="link.icon"
      icon
      variant="tonal"
      size="38"
      :color="link.color"
      class="rounded"
      @click="loginWithGoogle()"
    >
      <VIcon
        size="18"
        :icon="link.icon"
      />
    </VBtn>
  </div>
</template>
