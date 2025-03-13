<template>
  <div class="w-full flex flex-col items-center p-5 space-y-8 h-full">
    <div class="w-full flex flex-col space-y-3">
      <!-- Payment Methods List -->
      <div
        v-for="method in paymentMethods"
        :key="method.id"
        class="flex justify-between p-4 border-[1.5px] rounded-xl cursor-pointer"
        :class="{ 'border-[#10BB76] ': selectedMethod === method.id }"
        @click="selectedMethod = method.id"
      >
        <div class="flex flex-col space-y-1">
          <app-header-text class="!font-semibold text-lg">
            {{ method.name }}
          </app-header-text>
          <app-normal-text class="text-sm text-gray-500">
            Fee: {{ method.fee }}
          </app-normal-text>
        </div>

        <AppIcon name="checkbox-input" v-if="selectedMethod == method.id" />
        <p
          class="h-5 w-5 border-[1.5px] border-[#E0E2E4] rounded-full"
          v-else
        ></p>
      </div>
    </div>

    <!-- Bottom button -->
    
    <div
      class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
      style="
        padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;
      "
    >
      <div class="w-full flex flex-col">
        <app-button
          @click="continueToNext"
          :class="`!bg-secondary !py-4 ${
            selectedMethod ? 'opacity-100' : 'opacity-50'
          }`"
        >
          Next
        </app-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import {
    AppNormalText,
    AppButton,
    AppIcon,
    AppHeaderText,
  } from "@greep/ui-components"
  import { ref } from "vue"

  export default defineComponent({
    name: "WalletPaymentMethod",
    components: {
      AppNormalText,
      AppHeaderText,
      AppButton,
      AppIcon,
    },
    emits: ["next"],
    setup(_, { emit }) {
      const selectedMethod = ref("")

      const paymentMethods = ref([
        { id: "bank-transfer", name: "Bank Transfer", fee: "₩500" },
        { id: "mobile-money", name: "Mobile Money", fee: "₩500" },
        { id: "credit-card", name: "Credit Card", fee: "₩700" },
        { id: "paypal", name: "PayPal", fee: "₩300" },
      ])

      const continueToNext = () => {
        emit("next", selectedMethod.value)
      }

      return {
        selectedMethod,
        paymentMethods,
        continueToNext,
      }
    },
  })
</script>
