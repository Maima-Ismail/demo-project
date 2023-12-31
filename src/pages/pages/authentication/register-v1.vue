<script setup>
import authV1BottomShape from "@/assets/images/svg/auth-v1-bottom-shape.svg";
import authV1TopShape from "@/assets/images/svg/auth-v1-top-shape.svg";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";
import AuthProvider from "/src/views/pages/authentication/AuthProvider.vue";
import router from "@/router";
import axios from "axios";

const username = ref(null);
const email = ref(null);
const password = ref(null);
const privacyPolicies = ref(false);
const isPasswordVisible = ref(false);

const signupEmail = async () => {
  try {
    const response = await axios.post("/signup", {
      userName: username.value,
      userEmail: email.value,
      userPassword: password.value,
    });
    router.push("/dashboards/analytics");
  } catch (error) {
    console.log("Error with Sign Up", error);
  }
};
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VImg :src="authV1TopShape" class="auth-v1-top-shape d-none d-sm-block" />

      <!-- 👉 Bottom shape -->
      <VImg
        :src="authV1BottomShape"
        class="auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- 👉 Auth card -->
      <VCard class="auth-card pa-4" max-width="448">
        <VCardItem class="justify-center">
          <template #prepend>
            <div class="d-flex">
              <VNodeRenderer :nodes="themeConfig.app.logo" />
            </div>
          </template>

          <VCardTitle class="font-weight-bold text-h5 py-1">
            {{ themeConfig.app.title }}
          </VCardTitle>
        </VCardItem>

        <VCardText class="pt-2">
          <h5 class="text-h5 font-weight-semibold mb-1">
            Adventure starts here 🚀
          </h5>
          <p class="mb-0">Make your app management easy and fun!</p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="signupEmail()">
            <VRow>
              <!-- Username -->
              <VCol cols="12">
                <VTextField v-model="username" label="Username" />
              </VCol>
              <!-- email -->
              <VCol cols="12">
                <VTextField v-model="email" label="Email" type="email" />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="password"
                  label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center mt-2 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="privacyPolicies"
                    inline
                  />
                  <VLabel for="privacy-policy" style="opacity: 1">
                    <span class="me-1">I agree to</span>
                    <a href="javascript:void(0)" class="text-primary"
                      >privacy policy & terms</a
                    >
                  </VLabel>
                </div>

                <VBtn block type="submit"> Sign up </VBtn>
              </VCol>

              <!-- login instead -->
              <VCol cols="12" class="text-center text-base">
                <span>Already have an account?</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'pages-authentication-login-v1' }"
                >
                  Sign in instead
                </RouterLink>
              </VCol>

              <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol cols="12" class="text-center">
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
