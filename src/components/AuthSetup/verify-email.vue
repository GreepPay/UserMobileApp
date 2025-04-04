<template>
  <div class="w-full flex flex-col items-center justify-start h-full space-y-6">
    <app-form-wrapper
      ref="formWrapper"
      :parent-refs="parentRefs"
      class="w-full flex flex-col space-y-[20px] h-full"
    >
      <div
        class="w-full flex flex-col space-y-2 pt-4 justify-center items-center"
      >
        <app-normal-text custom-class="!text-center">
          Enter your OTP code here
        </app-normal-text>

        <app-otp-input
          v-model="formData.otp"
          type="tel"
          :number-of-input="numberOfInputs"
          :should-reset-o-t-p="true"
          @change-o-t-p="handleOTPChange"
        />

        <div
          class="w-full flex flex-col pt-3 space-y-2 justify-center items-center"
        >
          <app-normal-text class="text-center !text-veryLightGray">
            Didn’t receive any code?
          </app-normal-text>

          <app-normal-text class="text-center text-primary font-semibold">
            Resend?
          </app-normal-text>
        </div>
      </div>
    </app-form-wrapper>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, ref } from "vue"
  import {
    AppFormWrapper,
    AppNormalText,
    AppOtpInput,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  const auth = Logic.Auth

  export default defineComponent({
    components: {
      AppFormWrapper,
      AppNormalText,
      AppOtpInput,
    },
    name: "AuthSetupVerifyEmail",
    props: {
      numberOfInputs: {
        type: Number,
        default: 4,
      },
    },
    emits: ["verified"],
    setup(_, { emit }) {
      const formWrapper = ref()
      const formData = reactive({ otp: "" })

      // VerifyUserOtpPayload
      const handleOTPChange = (updatedValue: number) => {
        if (updatedValue.toString().length === _.numberOfInputs) {
          auth.VerifyUserOtpPayload = {
            ...auth.VerifyUserOtpPayload,
            otp: updatedValue.toString(),
          }
          handleVerifyEmail()
        }
      }

      const handleVerifyEmail = async () => {
        const response = await auth.VerifyUserOTP(true)
        if (response) emit("verified", response)
      }

      return {
        formData,
        formWrapper,
        handleOTPChange,
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
