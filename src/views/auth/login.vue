<template>
  <app-wrapper>
    <subpage-layout title="Sign In">
      <div
        class="w-full flex flex-col items-center justify-start h-full space-y-6 px-4"
      >
        <!-- Form -->
        <app-form-wrapper
          ref="formWrapper"
          :parent-refs="parentRefs"
          class="w-full flex flex-col space-y-3 pt-2"
        >
          <app-text-field
            :has-title="false"
            type="email"
            placeholder="Enter email address"
            ref="email"
            name="Email address"
            use-floating-label
            v-model="formData.email"
            :rules="[FormValidations.RequiredRule, FormValidations.EmailRule]"
          >
          </app-text-field>

          <app-text-field
            :has-title="false"
            type="password"
            placeholder="Password"
            ref="password"
            name="password"
            use-floating-label
            v-model="formData.password"
            :rules="[FormValidations.RequiredRule]"
          />
        </app-form-wrapper>
      </div>

      <!-- Bottom section -->
      <div
        class="w-full flex flex-col px-4 fixed z-50 bottom-0 left-0 pt-4 bg-white"
        style="padding-bottom: calc(env(safe-area-inset-bottom) + 16px)"
      >
        <app-button
          variant="secondary"
          class="!py-4 col-span-4"
          @click="handleSignIn"
          :disabled="!isFormValid"
          :loading="loading"
        >
          Next
        </app-button>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, computed } from "vue"
  import { AppFormWrapper, AppTextField, AppButton } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  const auth = Logic.Auth

  export default defineComponent({
    name: "LoginPage",
    components: {
      AppFormWrapper,
      AppTextField,
      AppButton,
    },
    setup() {
      const FormValidations = Logic.Form
      const formWrapper = ref()
      const loading = ref(false)

      // Create an instance of Auth
      const formData = reactive({ email: "", password: "" })

      // computed
      const isFormValid = computed(() => formWrapper.value?.validate())

      // Function to handle sign-in
      const handleSignIn = async () => {
        loading.value = true
        // Set the SignInPayload before calling SignIn
        auth.SignInPayload = {
          email: formData.email,
          password: formData.password,
        }

        // Call SignIn method
        const response = await auth.SignIn(true)

        loading.value = false
        console.log("response", response)

        // confirm if response is before next step
        if (response) {
          console.log("Login successful:", response)
        } else {
          console.error("Login failed")
        }
        Logic.Common.GoToRoute("/auth/verify-email")
      }

      return {
        FormValidations,
        Logic,
        formData,
        formWrapper,
        isFormValid,
        loading,
        handleSignIn,
      }
    },
    data() {
      return {
        parentRefs: [],
      }
    },
    mounted() {
      const parentRefs: any = this.$refs
      this.parentRefs = parentRefs
    },
  })
</script>
