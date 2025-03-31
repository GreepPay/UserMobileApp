<template>
  test
  <!-- <app-wrapper>
    <step-flow-layout
      class="!bg-base-background"
      :buttons="stepActions"
      :has-stepper="false"
      :progressPercent="90"
    >
      <app-form-wrapper
        class="w-full flex flex-col space-y-3 pt-[60px] px-4"
        :parent-refs="parentRefs"
        ref="formWrapper"
      >
        <div class="w-full flex flex-col space-y-3">
          <app-header-text custom-class="w-full text-left">
            Sign In to Your Account
          </app-header-text>

          <app-normal-text custom-class="w-full text-left">
            Enter your email address and password to sign in.
          </app-normal-text>
        </div>

        <div class="w-full flex flex-col pt-2">
          <div class="w-full flex flex-col pb-5">
            <app-text-field
              :focus-border="'border-primary-400'"
              :type="'email'"
              :has-title="true"
              :placeholder="'Enter email'"
              :name="'Email'"
              :inputStyle="'!w-full !flex-grow'"
              ref="email"
              :rules="[FormValidations.RequiredRule, FormValidations.EmailRule]"
              v-model="formData.email"
            >
              <template v-slot:title>Email </template>
            </app-text-field>
          </div>

          <div class="w-full flex flex-col pb-5 space-y-1">
            <app-text-field
              :focus-border="'border-primary-400'"
              :type="'password'"
              :has-title="true"
              :inputStyle="'!w-full !flex-grow'"
              :placeholder="'Enter password'"
              :name="'Password'"
              ref="password"
              :rules="[FormValidations.RequiredRule]"
              v-model="formData.password"
            >
              <template v-slot:title>Password </template>
            </app-text-field>

            <div class="w-full flex flex-row justify-end">
              <span
                @click="Logic.Common.GoToRoute('/auth/forgot-password')"
                class="cursor-pointer flex justify-end"
              >
                <app-normal-text
                  custom-class="!text-right !text-button-purple !font-semibold"
                >
                  Forgot password?
                </app-normal-text>
              </span>
            </div>
          </div>
        </div>

        <div class="w-full flex flex-col space-y-1">
          <app-button
            :class="w-full !py-3  uppercase font-semibold"
            @click.prevent="login"
          >
            Login
          </app-button>
          <AppSSO :from-action="'signup'" :is-relative="true" />
        </div>
      </app-form-wrapper>
    </step-flow-layout>
  </app-wrapper> -->
</template>

<script lang="ts">
  // import { defineComponent, reactive } from "vue";
  // import { useMeta } from "vue-meta";
  // import {
  //   AppFormWrapper,
  //   AppTextField,
  //   FormValidations,
  //   AppNormalText,
  //   AppHeaderText,
  //   AppSSO,
  //   AppButton,
  //   isNumber,
  // } from "@shpt/ui-components";
  // import { Logic } from "@shpt/logic";
  // import { ref } from "vue";

  // export default defineComponent({
  //   components: {
  //     AppFormWrapper,
  //     AppTextField,
  //     AppNormalText,
  //     AppHeaderText,
  //     AppSSO,
  //     AppButton,
  //   },
  //   name: "AuthSignUpSignInPage",
  //   middlewares: {
  //     fetchRules: [],
  //   },
  //   layout: "Auth",
  //   setup() {
  //     useMeta({
  //       title: "Sign In",
  //     });

  //     const formData = reactive({
  //       email: "",
  //       password: "",
  //     });

  //     const formWrapper = ref();

  //     const stepActions = reactive([]);

  //     const login = () => {
  //       const state = formWrapper.value.validate();

  //       if (state) {
  //         Logic.Auth.SignInForm = {
  //           email: isNumber(formData.email)
  //             ? Logic.Form.getPhoneNumber("+234", formData.email)
  //             : formData.email,
  //           password: formData.password,
  //         };

  //         Logic.Auth.SignIn(true)?.then(async (data) => {
  //           if (!data) {
  //             return;
  //           }
  //           if (data?.SignIn && !data?.SignIn.user.email_verified_at) {
  //             Logic.Auth.ResendVerifyEmailForm = {
  //               user_uuid: data?.SignIn.user.uuid || "",
  //             };
  //             await Logic.Auth.ResendVerifyEmail();
  //             Logic.Common.showModal({
  //               show: true,
  //               type: "verify_email",
  //               title: "Verify Your Email",
  //               preventClose: true,
  //               closeAction: () => {
  //                 //
  //               },
  //             });
  //           } else if (data?.SignIn) {
  //             Logic.Common.hideLoader();
  //             Logic.Common.GoToRoute("/");
  //           }
  //         });
  //       }
  //     };

  //     return {
  //       stepActions,
  //       formData,
  //       FormValidations,
  //       Logic,
  //       formWrapper,
  //       login,
  //     };
  //   },
  //   data() {
  //     return {
  //       parentRefs: [],
  //     };
  //   },
  //   mounted() {
  //     const parentRefs: any = this.$refs;
  //     this.parentRefs = parentRefs;
  //   },
  // });
</script>
