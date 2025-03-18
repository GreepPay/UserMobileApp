<template>
  <app-wrapper>
    <default-index-layout title="Home">
      <div
        class="w-full flex flex-col items-center justify-start px-6 space-y-4"
      >
        <!-- Balance card section -->
        <app-title-card-container custom-class="rounded-[40px]">
          <div class="space-y-4 flex flex-col justify-center w-full">
            <div
              class="w-full flex flex-col space-y-1 items-center justify-center"
            >
              <app-normal-text
                custom-class="!text-white !font-normal  text-center"
              >
                Total Balance
              </app-normal-text>

              <app-header-text custom-class="!text-3xl !leading-6 text-white">
                ₺
                {{
                  !Number.isNaN(parseFloat(amount))
                    ? Logic.Common.convertToMoney(1000, false, "", false)
                    : "0"
                }}
              </app-header-text>
            </div>

            <div class="flex w-full space-x-3 justify-around items-center px-6">
              <div
                class="space-y-1 flex flex-col items-center"
                v-for="action in actionBtns"
                :key="action.route"
                @click="Logic.Common.GoToRoute(`/wallets/${action.route}`)"
              >
                <app-button iconOnly variant="primary" custom-class="bg-white">
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
            <app-header-text class="font-semibold"> Quick Pay </app-header-text>
            <app-icon name="add-circle" class="size-6" />
          </div>

          <horizontal-user-list :items="users" :imageSize="56" />
        </div>

        <!-- Recent transactions -->
        <div class="w-full flex flex-col space-y-4 pt-2">
          <div class="w-full flex flex-row justify-between items-center">
            <app-header-text class="!text-left"> Transactions </app-header-text>

            <app-normal-text class="text-primary text-right">
              View all
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

    <app-modal
      v-if="showWelcomeModal"
      :close="
        () => {
          showWelcomeModal = false
        }
      "
    >
      <div class="w-full flex flex-col items-center px-4 pb-4">
        <app-icon name="green-lovely" custom-class="size-[96px]" />
        <div
          class="w-full flex flex-col xs:!space-y-0 sm:!space-y-2 md:space-y-2 items-center justify-center"
        >
          <app-header-text class="text-center w-full xs:!text-base sm:!text-lg">
            Welcome
          </app-header-text>
          <app-normal-text class="text-center w-full">
            Experience borderless payments without the stress of manual
            conversion to your preferred currency.
          </app-normal-text>
        </div>

        <app-button
          :custom-class="`!bg-secondary !w-full !py-4  !px-8`"
          @click="showWelcomeModal = false"
        >
          Start using Greep
        </app-button>
      </div>
    </app-modal>
  </app-wrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from "vue"
  import {
    AppImageLoader,
    AppNormalText,
    AppHeaderText,
    AppButton,
    AppTransaction,
    AppIcon,
    AppTitleCardContainer,
    AppModal,
    HorizontalUserList,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  interface User {
    id: number
    name: string
    avatar: string
  }

  export default defineComponent({
    name: "IndexPage",
    components: {
      AppImageLoader,
      AppNormalText,
      AppHeaderText,
      AppButton,
      AppTransaction,
      AppIcon,
      AppModal,
      AppTitleCardContainer,
      HorizontalUserList,
    },
    setup() {
      const amount = ref("1000")
      const showWelcomeModal = ref(false)
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
        { id: 2, name: "Test", avatar: "/images/temps/profile-2.png" },
        { id: 3, name: "Sukky", avatar: "/images/temps/profile-1.png" },
        { id: 4, name: "Samuel", avatar: "/images/temps/profile-1.png" },
        { id: 5, name: "Sukky", avatar: "/images/temps/profile-2.png" },
        { id: 5, name: "Samuel", avatar: "/images/temps/profile-1.png" },
        { id: 5, name: "Sukky", avatar: "/images/temps/profile-2.png" },
      ])

      return {
        showWelcomeModal,
        transactions,
        users,
        Logic,
        actionBtns,
        amount,
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
