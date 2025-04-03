<template>
  <div class="w-full flex flex-col items-center justify-start h-full space-y-6">
    <app-form-wrapper
      ref="formWrapper"
      :parent-refs="parentRefs"
      class="w-full flex flex-col space-y-[20px] h-full"
    >
      <app-info-box>
        <app-normal-text custom-class="!leading-5">
          Enter a
          <span class="font-semibold">6-digit </span>
          passcode to ensure that only you can open this app.
        </app-normal-text>
      </app-info-box>

      <app-text-field
        :has-title="false"
        type="password"
        placeholder="Passcode"
        ref="passcode"
        name="Passcode"
        use-floating-label
        v-model="formData.passcode"
        :rules="[FormValidations.RequiredRule]"
      >
      </app-text-field>

      <app-text-field
        :has-title="false"
        type="password"
        placeholder="Confirm Passcode"
        ref="confirm_passcode"
        name="Confirm Passcode"
        use-floating-label
        v-model="formData.confirm_passcode"
        :rules="[FormValidations.RequiredRule]"
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
  const auth = Logic.Auth

  export default defineComponent({
    components: {
      AppFormWrapper,
      AppTextField,
      AppInfoBox,
      AppNormalText,
    },
    props: { attemptToNext: Boolean },
    name: "AuthSetupAccountInfo",
    emits: ["update:isValid"],

    setup(props, { emit }) {
      const FormValidations = Logic.Form
      const formWrapper = ref<any>(null)

      const formData = reactive({
        passcode: "",
        confirm_passcode: "",
      })

      const updateSignUpPayloadAndSignUp = () => {
        auth.SignUpPayload = {
          ...auth.SignUpPayload,
          password: formData.passcode,
        }
      }

      const validateForm = () => {
        if (formWrapper.value) {
          const isValid = formWrapper.value.validate()
          if (isValid) updateSignUpPayloadAndSignUp()
          emit("update:isValid", isValid)
        }
      }

      //
      watch(
        () => props.attemptToNext,
        (newVal) => {
          if (newVal) validateForm()
        }
      )

      return {
        FormValidations,
        Logic,
        formData,
        formWrapper,
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
