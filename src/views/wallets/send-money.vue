<template>
  <app-wrapper>
    <subpage-layout title="Add Money">
      <div class="w-full flex flex-col items-center p-5 pt-8 space-y-8 h-full">
        <app-title-card-container>
          <div class="space-y-4 flex flex-col justify-center">
            <div class="flex items-center justify-center">
              <app-dropdown-select
                :options="dropdownOptions"
                :showTitle="false"
              />
            </div>

            <div class="w-full flex flex-col items-center justify-center">
              <app-normal-text class="!text-white !font-normal text-center">
                Amount
              </app-normal-text>

              <app-header-text class="!text-2xl text-white">
                ₺
                {{
                  !Number.isNaN(parseFloat(amount))
                    ? Logic.Common.convertToMoney(amount, false, "", false)
                    : "0"
                }}
              </app-header-text>
            </div>
          </div>
        </app-title-card-container>

        <!-- keyboard -->
        <app-keyboard v-model="amount" />

        <div
          :class="`w-full flex flex-col items-center justify-center ${
            parseFloat(amount) > maximumAmount ? 'visible' : 'invisible'
          }`"
        >
          <app-normal-text class="!text-red-500">
            Maximum withdrawal amount is
            <span class="!font-semibold pl-1">
              ₺
              {{ Logic.Common.convertToMoney(maximumAmount, false, "", false) }}
            </span>
          </app-normal-text>
        </div>
      </div>

      <div
        class="w-full fixed bg-white dark:bg-black bottom-0 left-0 pt-4 px-4"
        style="
          padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;
        "
      >
        <div class="w-full flex flex-col">
          <app-button
            :class="`!bg-secondary !py-4 ${
              amountIsValid() ? 'opacity-100' : 'opacity-50'
            }`"
            @click="amountIsValid() ? continueToNext() : null"
          >
            Next
          </app-button>
        </div>
      </div>
    </subpage-layout>

    <app-modal
      v-if="modalIsOpen"
      title="Choose Withdrawal Method"
      canClose
      :close="
        () => {
          modalIsOpen = false
        }
      "
    >
      <div class="w-full flex flex-col space-y-1 px-4 pb-4">
        <app-normal-text class="!text-left !text-gray-500">
          How do you want to receive your funds?
        </app-normal-text>
      </div>
    </app-modal>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import {
    AppHeaderText,
    AppButton,
    AppKeyboard,
    AppNormalText,
    AppModal,
    AppTitleCardContainer,
    AppAvatar,
    AppDropdownSelect,
  } from "@greep/ui-components"
  import { ref } from "vue"
  import { Logic } from "@greep/logic"
  import {
    PaymentMethod,
    MobileMoneyDetails,
    Success,
    MakePayment,
    EnterAmount,
  } from "../../components/Wallets/AddMoney"

  export default defineComponent({
    name: "WalletSendMoneyPage",
    components: {
      AppHeaderText,
      AppButton,
      AppKeyboard,
      AppNormalText,
      AppModal,
      AppTitleCardContainer,
      AppAvatar,
      AppDropdownSelect,
      //
      PaymentMethod,
      MobileMoneyDetails,
      Success,
      MakePayment,
      EnterAmount,
    },
    setup() {
      const amount = ref("0")
      const maximumAmount = 10000

      const modalIsOpen = ref(false)

      const amountIsValid = () => {
        return (
          parseFloat(amount.value) > 0 &&
          parseFloat(amount.value) <= maximumAmount
        )
      }

      const continueToNext = () => {
        // Implement the logic for choosing the withdrawal method and calling the next step.
      }

      const dropdownOptions = [
        { title: "Home", icon: "images/temps/profile-1.png", value: "home" },
        {
          title: "Profile",
          icon: "images/temps/profile-1.png",
          value: "profile",
        },
        {
          title: "Settings",
          icon: "images/temps/profile-1.png",
          value: "settings",
        },
      ]
      return {
        amount,
        Logic,
        modalIsOpen,
        maximumAmount,
        continueToNext,
        amountIsValid,
        dropdownOptions,
      }
    },
  })
</script>
