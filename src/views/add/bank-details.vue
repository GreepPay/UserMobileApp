<template>
  <app-wrapper
    ref="formComponent"
    :parent-refs="parentRefs"
    class="w-full flex flex-col h-full"
  >
    <subpage-layout title="Mobile Money Details">
      <div class="w-full flex flex-col items-center justify-start h-full p-4">
        <div class="pb-4 w-full">
          <app-text-field
            :has-title="false"
            type="text"
            placeholder="First Name"
            ref="firstName"
            name="First Name"
            use-floating-label
            v-model="formData.firstName"
            :rules="[FormValidations.RequiredRule]"
          >
          </app-text-field>
        </div>

        <div class="pb-4 w-full">
          <app-text-field
            :has-title="false"
            type="text"
            placeholder="Last Name"
            ref="lastName"
            name="Last Name"
            use-floating-label
            v-model="formData.lastName"
            :rules="[FormValidations.RequiredRule]"
          >
          </app-text-field>
        </div>

        <div class="pb-4 w-full">
          <app-text-field
            :has-title="false"
            type="tel"
            placeholder="Mobile Number"
            ref="mobileNumber"
            name="Mobile Number"
            use-floating-label
            v-model="formData.mobileNumber"
            :rules="[FormValidations.RequiredRule]"
          >
          </app-text-field>
        </div>

        <div class="pb-4 w-full">
          <app-select
            :placeholder="'Select Provider'"
            :hasTitle="false"
            :paddings="'py-4 !px-3'"
            :options="providers"
            ref="provider"
            use-floating-label
            v-model="formData.provider"
            auto-complete
          >
          </app-select>
        </div>

        <div class="pb-4 w-full">
          <app-select
            :placeholder="'Reason For Sending'"
            :hasTitle="false"
            :paddings="'py-4 !px-3'"
            :options="reasonsForSending"
            ref="reason"
            v-model="formData.reason"
            use-floating-label
            auto-complete
          >
          </app-select>
        </div>
      </div>

      <!-- Bottom button -->
      <div
        class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
        style="
          padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;
        "
      >
        <div class="w-full">
          <app-button
            variant="secondary"
            :custom-class="`!w-full !py-4`"
            @click="continueToNext"
          >
            Next
          </app-button>
        </div>
      </div>
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive } from "vue"
  import {
    AppFormWrapper,
    AppTextField,
    AppInfoBox,
    AppNormalText,
    AppSelect,
    AppButton,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    components: {
      AppFormWrapper,
      AppTextField,
      AppInfoBox,
      AppNormalText,
      AppSelect,
      AppButton,
    },
    props: {},
    name: "MobileMoneyBankDetailsPage",
    setup() {
      const FormValidations = Logic.Form

      const formData = reactive({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        provider: "",
        reason: "",
      })

      const providers = [
        { key: "mtn", value: "MTN" },
        { key: "airtel", value: "Airtel" },
        { key: "glo", value: "Glo" },
        { key: "9mobile", value: "9Mobile" },
      ]

      const reasonsForSending = [
        { key: "bills", value: "Paying Bills" },
        { key: "gift", value: "Sending as a Gift" },
        { key: "business", value: "Business Transaction" },
        { key: "personal", value: "Personal Use" },
      ]

      const continueToNext = () => {
        Logic.Common.GoToRoute("/add/confirm")
      }

      return {
        FormValidations,
        Logic,
        formData,
        reasonsForSending,
        providers,
        continueToNext,
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
