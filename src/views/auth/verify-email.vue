<template>
  <app-wrapper>
    <subpage-layout title="Verify Email">
      <div
        class="w-full flex flex-col items-center justify-start h-full space-y-6 px-4"
      >
        <auth-setup-verify-email @verified="isEmailVerified = $event" />
      </div>

      <!-- Bottom section -->
      <div
        class="w-full flex flex-col px-4 fixed z-50 bottom-0 left-0 pt-4 bg-white"
        style="padding-bottom: calc(env(safe-area-inset-bottom) + 16px)"
      >
        <app-button
          variant="secondary"
          class="!py-4 col-span-4"
          :loading="loading"
          :disabled="!isEmailVerified"
          @click="emit('next')"
        >
          Next
        </app-button>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue"
  import { AppButton } from "@greep/ui-components"
  import AuthSetupVerifyEmail from "../../components/AuthSetup/verify-email.vue"
  import { Logic } from "@greep/logic"
  const auth = Logic.Auth

  export default defineComponent({
    name: "VerifyEmailPage",
    components: {
      AuthSetupVerifyEmail,
      AppButton,
    },
    emits: ["next"],
    setup(_, { emit }) {
      const loading = ref(false)
      const isEmailVerified = ref(false)

      const handleVerifiedEmail = () => {
        console.log(87667)
        console.log(" auth.VerifyUserOtpPayload ", auth.VerifyUserOtpPayload)
      }

      const handleNext = () => {
        Logic.Common.GoToRoute("/auth/welcome")
      }

      return {
        loading,
        Logic,
        isEmailVerified,
        handleNext,
        handleVerifiedEmail,
        // handleVerifyEmail,
        emit,
      }
    },
  })
</script>
