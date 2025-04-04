<template>
  <div class="w-full flex flex-col items-center justify-start h-full space-y-6">
    <app-form-wrapper
      ref="formComponent"
      :parent-refs="parentRefs"
      class="w-full flex flex-col space-y-[20px] h-full"
    >
      <app-info-box>
        <app-normal-text custom-class="!leading-5">
          <span class="font-semibold">Set your account password.</span>
          Secure your account with a strong password.
        </app-normal-text>
      </app-info-box>

      <app-text-field
        :has-title="false"
        type="password"
        placeholder="Password"
        ref="password"
        name="Password"
        use-floating-label
        v-model="formData.password"
        :rules="[FormValidations.RequiredRule, FormValidations.PasswordRule]"
      >
      </app-text-field>

      <app-text-field
        :has-title="false"
        type="password"
        placeholder="Confirm Password"
        ref="confirm_password"
        name="Confirm Password"
        use-floating-label
        v-model="formData.confirm_password"
        :rules="[
          FormValidations.RequiredRule,
          FormValidations.handleConfirmPassword(
            formData.password,
            formData.confirm_password
          ),
        ]"
      >
      </app-text-field>
    </app-form-wrapper>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, watch, ref } from "vue"
  import {
    AppFormWrapper,
    AppTextField,
    AppInfoBox,
    AppNormalText,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    components: {
      AppFormWrapper,
      AppTextField,
      AppInfoBox,
      AppNormalText,
    },
    props: {},
    name: "AuthSetupPassword",
    setup() {
      const FormValidations = Logic.Form
      const formComponent = ref<any>(null)

      const formData = reactive({
        password: "DanielScript@10",
        confirm_password: "DanielScript@10",
      })

      const continueWithForm = () => {
        const state = formComponent.value?.validate()
        if (state) {
          return formData
        } else {
          return
        }
      }

      return {
        FormValidations,
        Logic,
        formData,
        formComponent,
        continueWithForm,
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
