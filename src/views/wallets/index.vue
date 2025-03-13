<template>
  <app-wrapper>
    <default-index-layout title="Home">
      <div
        class="w-full flex flex-col items-center justify-center space-y-4 p-5"
      >
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
                Total Balance
              </app-normal-text>

              <app-header-text class="!text-2xl text-white">
                ₺
                {{
                  !Number.isNaN(parseFloat(amount))
                    ? Logic.Common.convertToMoney(1000, false, "", false)
                    : "0"
                }}
              </app-header-text>
            </div>

            <div class="flex space-x-3 justify-between items-center px-6">
              <div
                class="space-y-1 flex flex-col items-center"
                v-for="action in actionBtns"
                :key="action.route"
                @click="Logic.Common.GoToRoute(`/wallets/${action.route}`)"
              >
                <app-button iconOnly custom-class="bg-white">
                  <template #icon>
                    <app-icon
                      :name="action.icon"
                      custom-class="!text-primary"
                      class="size-5"
                    />
                  </template>
                </app-button>

                <app-normal-text class="text-white">
                  {{ action.text }}
                </app-normal-text>
              </div>
            </div>
          </div>
        </app-title-card-container>

        <div class="w-full h-fit space-y-4">
          <div class="flex items-center justify-between">
            <app-header-text class="text-lg font-semibold">
              Quick Pay
            </app-header-text>
            <app-icon name="add-circle" class="size-6" />
          </div>

          <HorizontalUserList :items="users" :imageSize="56" />
        </div>

        <!-- Transaction details -->
        <div class="w-full flex flex-col space-y-4 pt-2">
          <div class="w-full flex flex-row justify-between items-center">
            <app-normal-text class="!text-left font-semibold flex-1 !text-sm">
              Transactions
            </app-normal-text>

            <app-normal-text class="text-primary text-right">
              See all
            </app-normal-text>
          </div>

          <div class="w-full flex flex-col space-y-3">
            <app-transaction
              :data="item"
              v-for="(item, index) in transactions"
              :key="index"
              @click="Logic.Common.GoToRoute(`/wallets/add-money`)"
            />
          </div>
        </div>
      </div>
    </default-index-layout>
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
    AppIcon,
    AppTransaction,
    AppTitleCardContainer,
    AppDropdownSelect,
    HorizontalUserList,
  } from "@greep/ui-components"
  import { ref, reactive } from "vue"
  import { Logic } from "@greep/logic"

  interface User {
    id: number
    name: string
    avatar: string
  }

  export default defineComponent({
    name: "WalletsPage",
    components: {
      AppHeaderText,
      AppButton,
      AppKeyboard,
      AppNormalText,
      AppModal,
      AppIcon,
      AppTransaction,
      AppTitleCardContainer,
      AppDropdownSelect,
      HorizontalUserList,
    },
    setup() {
      const amount = ref("1000")
      const actionBtns = [
        {
          text: "Add",
          icon: "plus",
          route: "add-money",
        },
        {
          text: "Send",
          icon: "arrow-up",
          route: "send-money",
        },
        {
          text: "Scan",
          icon: "scan",
          route: "scan",
        },
      ]
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
      const modalIsOpen = ref(false)

      const amountIsValid = () => {
        return parseFloat(amount.value) > 0 && parseFloat(amount.value) <= 6074
      }

      const continueToNext = () => {
        //   modalIsOpen.value = true;
      }

      const transactions = reactive<
        {
          id: string | number
          title: string
          amount: number
          type: "sent" | "received" | "added" | "redeemed"
          transactionType: "credit" | "debit"
          date: string
        }[]
      >([
        {
          id: 1,
          title: "Timms Closet Ventures",
          amount: 33000,
          type: "sent",
          transactionType: "debit",
          date: "Today",
        },
        {
          id: 2,
          title: "Freelance Payment",
          amount: 50000,
          type: "received",
          transactionType: "credit",
          date: "Yesterday",
        },
        {
          id: 3,
          title: "Wallet Top-Up",
          amount: 100000,
          type: "added",
          transactionType: "credit",
          date: "2 Days Ago",
        },
        {
          id: 4,
          title: "Gift Card Redemption",
          amount: 25000,
          type: "redeemed",
          transactionType: "debit",
          date: "Last Week",
        },
        {
          id: 5,
          title: "Online Shopping",
          amount: 45000,
          type: "sent",
          transactionType: "debit",
          date: "Last Month",
        },
      ])

      const users = ref<User[]>([
        { id: 1, name: "James", avatar: "/images/temps/profile-1.png" },
        { id: 2, name: "Test", avatar: "/images/temps/profile-1.png" },
        { id: 3, name: "Sukky", avatar: "/images/temps/profile-1.png" },
        { id: 4, name: "Samuel", avatar: "/images/temps/profile-1.png" },
        { id: 5, name: "Sukky", avatar: "/images/temps/profile-1.png" },
        { id: 5, name: "Samuel", avatar: "/images/temps/profile-1.png" },
        { id: 5, name: "Sukky", avatar: "/images/temps/profile-1.png" },
      ])

      return {
        amount,
        Logic,
        modalIsOpen,
        transactions,
        users,
        dropdownOptions,
        actionBtns,
        continueToNext,
        amountIsValid,
      }
    },
  })
</script>

<style scoped>
  /* Hide scrollbar but allow horizontal scrolling */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
