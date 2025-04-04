<template>
  <app-wrapper>
    <default-index-layout title="Home">
      <div class="w-full flex flex-col items-center justify-start">
        <div class="px-4 w-full">
          <app-title-card-container>
            <div
              class="flex flex-col space-y-3 justify-center items-center w-full"
            >
              <app-currency-switch
                :model-value="modelCurrencyValue"
                default-currency="USD"
              />

              <div
                class="w-full py-3 flex flex-col items-center justify-center"
              >
                <app-normal-text
                  custom-class="!text-white !font-normal !font-sm pb-1  text-center"
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

              <div class="flex w-full justify-between items-center px-6">
                <div
                  class="flex flex-col items-center px-3s"
                  v-for="action in actionBtns"
                  :key="action.route"
                  @click="Logic.Common.GoToRoute(`/${action.route}`)"
                >
                  <app-button
                    iconOnly
                    variant="primary"
                    custom-class="bg-white"
                  >
                    <template #icon>
                      <app-icon :name="action.icon" />
                    </template>
                  </app-button>

                  <app-normal-text class="!text-white !text-lg pt-1.5">
                    {{ action.text }}
                  </app-normal-text>
                </div>
              </div>
            </div>
          </app-title-card-container>
        </div>

        <div class="w-full h-fit py-6">
          <div class="flex items-center justify-between px-4">
            <app-header-text class="font-semibold"> Quick Pay </app-header-text>
            <app-icon
              name="add-circle"
              custom-class="size-6"
              @click="Logic.Common.GoToRoute(`/beneficiaries`)"
            />
          </div>

          <div class="pt-4">
            <horizontal-user-list :items="users" :imageSize="56" />
          </div>
        </div>

        <!-- Recent transactions -->
        <div class="w-full flex flex-col px-4">
          <div class="w-full flex justify-between items-center">
            <app-header-text class="!text-left"> Transactions </app-header-text>
            <app-normal-text
              class="text-primary !text-lg text-right"
              @click="Logic.Common.GoToRoute(`/transactions`)"
            >
              See all
            </app-normal-text>
          </div>

          <div class="py-2">
            <app-transactions :transactions="transactions" />
          </div>
        </div>
      </div>
    </default-index-layout>

    <!-- Welcome Modal -->
    <app-modal
      v-if="showWelcomeModal"
      :close="
        () => {
          showWelcomeModal = false
        }
      "
    >
      <div class="w-full flex flex-col items-center">
        <app-icon name="green-lovely" custom-class="size-[96px]" />

        <div
          class="w-full flex flex-col pt-2 pb-6 px-5 items-center justify-center"
        >
          <app-header-text class="text-center w-full !text-xl">
            Welcome
          </app-header-text>

          <app-normal-text class="text-center !text-lg !text-gray-two w-full">
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
  import { defineComponent, reactive, ref, onMounted, computed } from "vue"
  import {
    AppNormalText,
    AppHeaderText,
    AppButton,
    AppTransactions,
    AppIcon,
    AppTitleCardContainer,
    AppModal,
    HorizontalUserList,
    AppCurrencySwitch,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  import { getPlatforms, onIonViewDidEnter } from "@ionic/vue"
  // import { User } from "@greep/logic/src/gql/graphql";

  interface User {
    id: number
    name: string
    avatar: string
  }

  export default defineComponent({
    name: "IndexPage",
    components: {
      AppNormalText,
      AppHeaderText,
      AppButton,
      AppTransactions,
      AppIcon,
      AppModal,
      AppTitleCardContainer,
      HorizontalUserList,
      AppCurrencySwitch,
    },
    setup() {
      // const Test =  reactive(Logic.Auth.Test);

      const amount = ref("1000")
      const modelCurrencyValue = ref("USD")
      const showWelcomeModal = ref(true)
      const actionBtns = [
        {
          text: "Add",
          icon: "plus",
          route: "add",
        },
        {
          text: "Send",
          icon: "arrow-up",
          route: "send",
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

      

      const defaultCurrency = ref("USD")

      const selectedCurrency = ref("USD")

      const currentPlatform = computed(() => {
        return getPlatforms()[0]
      })

      const setPageDefaults = () => {
        defaultCurrency.value =
          Logic.Auth.AuthUser?.profile?.default_currency || "USD"
        selectedCurrency.value = defaultCurrency.value
      }

      onIonViewDidEnter(() => {
        setPageDefaults()
      })

      onMounted(() => {
        // Register reactive data
        // Logic.Wallet.watchProperty("ManyTransactions", ManyTransactions)
        // Logic.Wallet.watchProperty(
        //   "ManyPointTransactions",
        //   ManyPointTransactions
        // )
        // Logic.Wallet.watchProperty(
        //   "CurrentGlobalExchangeRate",
        //   CurrentGlobalExchangeRate
        // )
        // Logic.Auth.watchProperty("AuthUser", AuthUser)
        setPageDefaults()
      })

      return {
        showWelcomeModal,
        transactions,
        users,
        Logic,
        actionBtns,
        amount,
        modelCurrencyValue,
        currentPlatform,
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
