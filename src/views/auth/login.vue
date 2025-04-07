<template>
  <app-wrapper>
    <subpage-layout title="Sign In">
      <div
        class="w-full flex flex-col items-center justify-start h-full space-y-6 px-4"
      >
        <!-- Form -->
        <app-form-wrapper
          ref="formComponent"
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
          :loading="loadingState"
        >
          Next
        </app-button>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from "vue"
  import { AppFormWrapper, AppTextField, AppButton } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "LoginPage",
    components: {
      AppFormWrapper,
      AppTextField,
      AppButton,
    },
    setup() {
      const FormValidations = Logic.Form
      const formComponent = ref()
      const loading = ref(false)
      const loadingState = ref(false)

      // Create an instance of Auth
      const formData = reactive({ email: "", password: "" })

      // Function to handle sign-in
      const handleSignIn = async () => {
        const state = formComponent.value?.validate()

        if (state) {
          loadingState.value = true
          Logic.Auth.SignInPayload = {
            email: formData.email,
            password: formData.password,
          }

          try {
            await Logic.Auth.SignIn(true)
            await Logic.Auth.GetAuthUser()

            // Check if passcode has been set
            if (localStorage.getItem("auth_passcode")) {
              Logic.Common.GoToRoute("/")
            } else {
              // Save auth email and pass
              localStorage.setItem(
                "auth_email",
                Logic.Auth.SignInPayload?.email || ""
              )
              localStorage.setItem(
                "auth_pass",
                Logic.Auth.SignInPayload?.password || ""
              )
              Logic.Common.GoToRoute("/auth/setup")
            }
          } catch (err) {
            loadingState.value = false
          } finally {
            loadingState.value = false
          }
        }
      }

      return {
        FormValidations,
        Logic,
        formData,
        formComponent,
        loading,
        loadingState,
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
