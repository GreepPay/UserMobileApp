<template>
  <app-wrapper>
    <subpage-layout title="Login Settings">
      <div
        class="w-full flex flex-col items-center justify-start h-full space-y-6 p-4"
      >
        <app-form-wrapper
          ref="formComponent"
          :parent-refs="parentRefs"
          class="w-full flex flex-col space-y-[20px] h-full"
        >
          <app-info-box>
            <app-normal-text custom-class="!leading-5">
              Enter new
              <span class="font-semibold">6-digit </span>
              password to ensure that only you can open this app.
            </app-normal-text>
          </app-info-box>

          <app-text-field
            :has-title="false"
            type="password"
            placeholder="Current Password"
            ref="currennt_password"
            name="Current Password"
            use-floating-label
            v-model="formData.currennt_password"
            :rules="[
              FormValidations.RequiredRule,
              FormValidations.PasswordRule,
            ]"
          >
          </app-text-field>

          <app-text-field
            :has-title="false"
            type="password"
            placeholder="New Password"
            ref="new_password"
            name="New Password"
            use-floating-label
            v-model="formData.new_password"
            :rules="[
              FormValidations.RequiredRule,
              FormValidations.PasswordRule,
            ]"
          >
          </app-text-field>

          <app-text-field
            :has-title="false"
            type="password"
            placeholder="Confirm Password"
            ref="confirm_password"
            name="Confirm New Password"
            use-floating-label
            v-model="formData.confirm_password"
            :rules="[
              FormValidations.RequiredRule,
              FormValidations.handleConfirmPassword(
                formData.new_password,
                formData.confirm_password
              ),
            ]"
          >
          </app-text-field>

          <!-- Forgot Password -->
          <app-normal-text
            custom-class="!text-green px-2"
            @click="Logic.Common.GoToRoute('/auth/reset-passcode')"
          >
            Forgot Password?
          </app-normal-text>
        </app-form-wrapper>

        <!-- Bottom section -->
        <div
          class="w-full flex flex-col px-4 fixed z-50 bottom-0 left-0 pt-4 bg-white"
          style="padding-bottom: calc(env(safe-area-inset-bottom) + 16px)"
        >
          <app-button
            variant="secondary"
            class="!py-4 col-span-4"
            @click="handleConfirm"
            :loading="loadingState"
          >
            Confirm
          </app-button>
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { reactive, ref, defineComponent } from "vue"
  import {
    AppNormalText,
    AppButton,
    AppTextField,
    AppInfoBox,
    AppFormWrapper,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "ProfileLoginSettings",
    components: {
      AppNormalText,
      AppButton,
      AppTextField,
      AppInfoBox,
      AppFormWrapper,
    },
    setup() {
      const FormValidations = Logic.Form
      const formComponent = ref()
      const loadingState = ref(false)
      const formData = reactive({
        currennt_password: "",
        new_password: "",
        confirm_password: "",
      })

      const handleConfirm = async () => {
        const state = formComponent.value?.validate()

        if (state) {
          if (formData.currennt_password === formData.new_password) {
            Logic.Common.showAlert({
              show: true,
              message: "Set a different new password",
              type: "error",
            })

            return
          }

          loadingState.value = true
          Logic.Auth.UpdatePasswordPayload = {
            current_password: formData.currennt_password,
            new_password: formData.new_password,
          }

          try {
            await Logic.Auth.UpdatePassword(true)
            await Logic.Auth.GetAuthUser()

            localStorage.removeItem("auth_passcode")

            Logic.Common.GoToRoute("/auth/login")
          } catch (err) {
            loadingState.value = false
          } finally {
            loadingState.value = false
          }
        }
      }

      return {
        Logic,
        loadingState,
        FormValidations,
        formData,
        handleConfirm,
        formComponent,
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
