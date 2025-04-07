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
              passcode to ensure that only you can open this app.
            </app-normal-text>
          </app-info-box>

          <app-text-field
            :has-title="false"
            type="password"
            placeholder="Old Passcode"
            ref="old_passcode"
            name="Old Passcode"
            use-floating-label
            v-model="formData.old_passcode"
            :rules="[FormValidations.RequiredRule]"
          >
          </app-text-field>

          <app-text-field
            :has-title="false"
            type="password"
            placeholder="New Passcode"
            ref="new_passcode"
            name="New Passcode"
            use-floating-label
            v-model="formData.new_passcode"
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

          <!-- Forgot Passcode -->
          <app-normal-text
            custom-class="!text-green !font-medium !text-base px-2"
          >
            Forgot Passcode?
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
          >
            Confirm
          </app-button>
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
import { reactive } from "vue";
import { defineComponent } from "vue";
import {
  AppNormalText,
  AppButton,
  AppTextField,
  AppInfoBox,
} from "@greep/ui-components";
import { Logic } from "@greep/logic";

export default defineComponent({
  name: "ProfileLoginSettings",
  components: {
    AppNormalText,
    AppButton,
    AppTextField,
    AppInfoBox,
  },
  setup() {
    const FormValidations = Logic.Form;
    const formData = reactive({
      old_passcode: "",
      new_passcode: "",
      confirm_passcode: "",
    });

    const handleConfirm = () => {  
      
      };

    return {
      Logic,
      FormValidations,
      formData,
      handleConfirm,
    };
  },

  data() {
    return {
      parentRefs: [],
    };
  },
  mounted() {
    const parentRefs: any = this.$refs;
    this.parentRefs = parentRefs;
  },
});
</script>
