<template>
  <app-wrapper>
    <subpage-layout
      :title="pageTitle"
      :useEmitBack="activeStep !== 1"
      :hideBackBtn="activeStep > 4"
      @back="handleBack"
    >
      <select-beneficiary v-if="activeStep === 1" @next="activeStep = 2" />
      <enter-amount v-if="activeStep === 2" @next="activeStep = 3" />
      <payment-details v-if="activeStep === 3" @next="activeStep = 4" />
      <processing v-if="activeStep === 4" @next="activeStep = 5" />
      <success v-if="activeStep === 5" />
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { ref, computed } from "vue"
  import {
    SelectBeneficiary,
    EnterAmount,
    PaymentDetails,
  } from "../../components/Wallets/SendMoney"

  import {
    PaymentMethod,
    Success,
    Processing,
  } from "../../components/Core/Common"

  export default defineComponent({
    name: "WalletSendMoneyPage",
    components: {
      PaymentMethod,
      Success,
      Processing,
      SelectBeneficiary,
      EnterAmount,
      PaymentDetails,
    },
    setup() {
      const activeStep = ref(1)
      const pageTitle = computed(() => {
        if (activeStep.value === 2) {
          return "Transfer"
        } else if (activeStep.value === 3) {
          return "Confirm Details"
        } else if (activeStep.value === 4) {
          return "Processing"
        } else if (activeStep.value === 5) {
          return ""
        } else {
          return "Send Money" // Default title
        }
      })

      const handleBack = () => activeStep.value--

      return { activeStep, pageTitle, handleBack }
    },
  })
</script>
