<template>
  <app-wrapper>
    <subpage-layout title="Reset Passcode" :hideBackBtn="true">
      <div class="w-full flex flex-col items-center justify-start h-full px-4">
        <div class="w-full flex flex-col justify-center items-center">
          <div
            :class="`w-full flex flex-col space-y-2 items-center pt-4 ${
              pinStage !== 'old-pin' ? 'opacity-40' : ''
            }`"
          >
            <app-normal-text custom-class="!text-center">
              Enter Old Passcode
            </app-normal-text>

            <!-- OTP input -->
            <app-otp-input
              :otp-value="oldPinValue"
              type="password"
              :number-of-input="6"
              :should-reset-o-t-p="true"
              :sizeStyle="'!w-[40px] !h-[45px] xs:!w-[30px] xs:!h-[35px] !rounded-[5px]'"
              @change-o-t-p="() => {}"
              @update:filled="oldPinIsFiled"
              :isDisabled="true"
            />
          </div>

          <div
            :class="`w-full flex flex-col space-y-2 items-center pt-6 ${
              pinStage !== 'new-pin' ? 'opacity-40' : ''
            }`"
          >
            <app-normal-text custom-class="!text-center">
              Enter New Passcode
            </app-normal-text>

            <!-- OTP input -->
            <app-otp-input
              :otp-value="newPinValue"
              type="password"
              :number-of-input="6"
              :sizeStyle="'!w-[40px] !h-[45px] xs:!w-[30px] xs:!h-[35px] !rounded-[5px]'"
              :should-reset-o-t-p="true"
              @change-o-t-p="() => {}"
              @update:filled="newPinIsFiled"
              :isDisabled="true"
            />
          </div>

          <div
            :class="`w-full flex flex-col space-y-2 items-center pt-6 ${
              pinStage !== 'confirm-new-pin' ? 'opacity-40' : ''
            }`"
          >
            <app-normal-text custom-class="!text-center">
              Confirm New Passcode
            </app-normal-text>

            <!-- OTP input -->
            <app-otp-input
              :otp-value="confirmNewPinValue"
              type="password"
              :number-of-input="6"
              :sizeStyle="'!w-[40px] !h-[45px] xs:!w-[30px] xs:!h-[35px] !rounded-[5px]'"
              :should-reset-o-t-p="true"
              @change-o-t-p="() => {}"
              @update:filled="otpIsFilledConfirm"
              :isDisabled="true"
            />
          </div>
        </div>

        <div class="w-full flex flex-col pt-8">
          <app-keyboard
            :hasFingerPrint="false"
            @update:model-value="handleKeyBoardPressed"
            v-model="keyboardValue"
          />
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { AppNormalText, AppOtpInput, AppKeyboard } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  import { ref } from "vue"

  export default defineComponent({
    name: "ResetPasscodePage",
    components: {
      AppNormalText,
      AppOtpInput,
      AppKeyboard,
    },
    setup() {
      const FormValidations = Logic.Form
      const itIsPinUpdate = ref(false)

      const oldPinValue = ref("")
      const newPinValue = ref("")
      const confirmNewPinValue = ref("")

      const keyboardValue = ref("")

      const pinStage = ref<"old-pin" | "new-pin" | "confirm-new-pin">("old-pin")

      const handleKeyBoardPressed = (value: any) => {
        if (pinStage.value == "old-pin") oldPinValue.value = value
        else if (pinStage.value == "new-pin") newPinValue.value = value
        else confirmNewPinValue.value = value
      }

      const resetState = () => {
        keyboardValue.value = ""
        pinStage.value = "old-pin"
        oldPinValue.value = ""
        newPinValue.value = ""
        confirmNewPinValue.value = ""
      }

      const oldPinIsFiled = () => {
        if (pinStage.value == "old-pin") {
          keyboardValue.value = ""
          pinStage.value = "new-pin"
        }
      }
      const newPinIsFiled = () => {
        if (pinStage.value == "new-pin") {
          keyboardValue.value = ""

          pinStage.value = "confirm-new-pin"
        }
      }

      const otpIsFilledConfirm = () => {
        const authPasscode = localStorage.getItem("auth_passcode")
        const encryptedAuthData = localStorage.getItem("auth_encrypted_data")

        // check against empty field
        if (
          oldPinValue.value.length != 6 ||
          newPinValue.value.length != 6 ||
          confirmNewPinValue.value.length != 6
        ) {
          return
        }

        if (!encryptedAuthData) {
          Logic.Common.showAlert({
            show: true,
            message: "User not found, please set a new passcode",
            type: "info",
          })

          resetState()
          Logic.Common.GoToRoute("/auth/set-passcode")
          return
        }

        // if old passcode is same as the new  one
        if (authPasscode === newPinValue.value) {
          Logic.Common.showAlert({
            show: true,
            message: "Please, use another code.",
            type: "error",
          })

          resetState()
          return
        }

        // if old passcode is not correct
        if (authPasscode !== oldPinValue.value) {
          Logic.Common.showAlert({
            show: true,
            message: "Old passcode is incorrect. Try again",
            type: "error",
          })
          resetState()
          return
        }

        if (confirmNewPinValue.value !== newPinValue.value) {
          Logic.Common.showAlert({
            show: true,
            message: "New passcode does not match. Try again",
            type: "error",
          })
          resetState()
          return
        }

        const decryptedAuthData: any = Logic.Common.decryptData(
          encryptedAuthData,
          authPasscode
        )

        const authData = {
          email: decryptedAuthData.email,
          password: decryptedAuthData.password,
        }

        const encryptedData = Logic.Common.encryptData(
          authData,
          newPinValue.value
        )

        localStorage.setItem("auth_encrypted_data", encryptedData)
        localStorage.setItem("auth_passcode", newPinValue.value)

        resetState()
        Logic.Common.GoToRoute("/auth/welcome")
      }

      return {
        FormValidations,
        Logic,
        otpIsFilledConfirm,
        handleKeyBoardPressed,
        oldPinIsFiled,
        itIsPinUpdate,
        pinStage,
        keyboardValue,
        oldPinValue,
        newPinValue,
        confirmNewPinValue,
        newPinIsFiled,
      }
    },
  })
</script>
