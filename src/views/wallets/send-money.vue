<template>
  <app-wrapper>
    <subpage-layout
      :title="pageTitle"
      :useEmitBack="activeStep !== 1"
      :hideBackBtn="activeStep > 4"
      @back="handleBack"
    >
      <enter-amount v-if="activeStep === 1" @next="activeStep = 2" />
      <payment-method v-if="activeStep === 2" @next="activeStep = 3" />
      <mobile-money-details v-if="activeStep === 3" @next="activeStep = 4" />
      <make-payment v-if="activeStep === 4" @next="activeStep = 5" />
      <processing v-if="activeStep === 5" @next="activeStep = 6" />
      <success v-if="activeStep === 6" />
    </subpage-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { ref, computed } from "vue"
  import {
    MobileMoneyDetails,
    MakePayment,
    EnterAmount,
  } from "../../components/Wallets/AddMoney"

  import {
    PaymentMethod,
    Success,
    Processing,
  } from "../../components/Core/Common"

  export default defineComponent({
    name: "WalletSendMoneyPage",
    components: {
      PaymentMethod,
      MobileMoneyDetails,
      Success,
      MakePayment,
      Processing,
      EnterAmount,
    },
    setup() {
      const activeStep = ref(1)
      const pageTitle = computed(() => {
        if (activeStep.value === 2) {
          return "Transfer"
        } else if (activeStep.value === 3) {
          return "Confirm Details"
        } else if (activeStep.value === 4) {
          return "Make Payment"
        } else if (activeStep.value === 5) {
          return "Processing"
        } else if (activeStep.value === 6) {
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
