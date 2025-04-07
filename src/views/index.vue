<template>
  <app-wrapper>
    <default-index-layout title="Home">
      <div class="w-full flex flex-col items-center justify-start">
        <div class="px-4 w-full">
          <app-title-card-container>
            <div class="flex flex-col justify-center items-center w-full">
              <app-currency-switch
                :model-value="modelCurrencyValue"
                default_currency="NGN"
                :availableCurrencies="availableCurrencies"
              />

              <div
                class="w-full py-3 flex flex-col items-center justify-center !pt-6"
              >
                <app-normal-text
                  custom-class="!text-white !font-normal !font-sm pb-1  text-center"
                >
                  Total Balance
                </app-normal-text>

                <app-header-text custom-class="!text-3xl !leading-6 text-white">
                  {{ currencySymbol }}
                  {{
                    Logic.Common.convertToMoney(
                      AuthUser.wallet?.total_balance,
                      true,
                      "",
                      false
                    )
                  }}
                </app-header-text>
              </div>

              <div class="flex w-full justify-between items-center px-6 !pt-4">
                <div
                  class="flex flex-col items-center px-3"
                  v-for="action in actionBtns"
                  :key="action.route"
                  @click="Logic.Common.GoToRoute(`/${action.route}`)"
                >
                  <div
                    class="size-10 rounded-full bg-white flex items-center justify-center"
                  >
                    <app-icon :name="action.icon" custom-class="!size-5" />
                  </div>
                  <app-normal-text class="!text-white pt-1.5">
                    {{ action.text }}
                  </app-normal-text>
                </div>
              </div>
            </div>
          </app-title-card-container>
        </div>

        <!--  -->
        <div class="w-full h-fit py-6">
          <div class="flex items-center justify-between px-4">
            <app-normal-text class="font-semibold !text-gray-800 !text-sm">
              Quick Pay
            </app-normal-text>
            <app-icon
              name="add-circle"
              custom-class="h-5"
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
            <app-normal-text class="font-semibold !text-gray-800 !text-sm">
              Transactions
            </app-normal-text>

            <app-normal-text
              class="text-primary"
              @click="Logic.Common.GoToRoute('/transactions')"
            >
              See all
            </app-normal-text>
          </div>

          <div class="py-2">
            <div v-if="true" class="py-4 !pt-2">
              <app-empty-state
                title="No transactions"
                description="Collect Payments, Make Withdrawals, and Redeem the GRP Tokens you’ve earned."
              />
            </div>
            <template v-else>
              <app-transaction
                class="z-[10]"
                v-for="transaction in recentTransactions"
                :key="transaction.id"
                :data="transaction"
                @click="
                  Logic.Common.GoToRoute('/transaction/' + transaction.id)
                "
              />
            </template>
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
        <app-icon name="green-lovely" custom-class="!h-[90px]" />

        <div
          class="w-full flex flex-col pt-2 pb-6 px-5 items-center justify-center"
        >
          <app-normal-text
            class="text-center w-full !text-lg !font-semibold pb-2"
          >
            Welcome
          </app-normal-text>

          <app-normal-text class="text-center !text-sm !text-gray-two w-full">
            Experience borderless payments without the stress of manual
            conversion to your preferred currency.
          </app-normal-text>
        </div>

        <app-button
          :custom-class="`!bg-secondary !w-full !py-4 !px-8 !text-sm`"
          @click="showWelcomeModal = false"
          variant="secondary"
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
    AppTransaction,
    AppIcon,
    AppTitleCardContainer,
    AppModal,
    HorizontalUserList,
    AppCurrencySwitch,
    AppEmptyState,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"
  import { getPlatforms, onIonViewDidEnter } from "@ionic/vue"
  import { availableCurrencies } from "../composable"
  import { User } from "@greep/logic/src/gql/graphql"

  enum TransactionType {
    Sent = "sent",
    Received = "received",
    Added = "added",
    Redeemed = "redeemed",
  }

  export default defineComponent({
    name: "IndexPage",
    components: {
      AppNormalText,
      AppHeaderText,
      AppButton,
      AppTransaction,
      AppIcon,
      AppModal,
      AppTitleCardContainer,
      HorizontalUserList,
      AppCurrencySwitch,
      AppEmptyState,
    },
    // middlewares: {
    //   fetchRules: [
    //     {
    //       domain: "Wallet",
    //       property: "ManyTransactions",
    //       method: "GetTransactions",
    //       params: [1, 10],
    //       requireAuth: true,
    //       ignoreProperty: false,
    //       silentUpdate: true,
    //     },
    //     {
    //       domain: "Wallet",
    //       property: "ManyPointTransactions",
    //       method: "GetPointTransactions",
    //       params: [1, 10],
    //       requireAuth: true,
    //       ignoreProperty: false,
    //       silentUpdate: true,
    //     },
    //   ],
    // },
    setup() {
      const amount = ref("1000")
      const modelCurrencyValue = ref("NGN")
      const showWelcomeModal = ref(false)
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

      const users = ref<User[]>([])
      // { id: 1, name: "James", avatar: "/images/temps/profile-1.png" },

      const defaultCurrency = ref("NGN")
      const selectedCurrency = ref("NGN")
      const currencySymbol = ref("₦")

      // const ManyTransactions = ref(Logic.Wallet.ManyTransactions)
      // const ManyPointTransactions = ref(Logic.Wallet.ManyPointTransactions)
      // const CurrentGlobalExchangeRate = ref(
      //   Logic.Wallet.CurrentGlobalExchangeRate
      // )

      const AuthUser = ref<User>(Logic.Auth.AuthUser)

      const currentPlatform = computed(() => {
        return getPlatforms()[0]
      })

      const setPageDefaults = () => {
        defaultCurrency.value =
          Logic.Auth.AuthUser?.profile?.default_currency || "NGN"
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

        const hasSeenModal = localStorage.getItem("has_seen_welcome_modal")

        if (!hasSeenModal) {
          showWelcomeModal.value = true
          localStorage.setItem("has_seen_welcome_modal", "true")
        }
        Logic.Auth.watchProperty("AuthUser", AuthUser)
        setPageDefaults()
      })

      const recentTransactions = reactive<
        {
          id: string | number
          title: string
          amount: number
          type: TransactionType
          transactionType: "credit" | "debit"
          date: string
        }[]
      >([
        {
          id: 1,
          title: "Payment to John Doe",
          amount: 50.0,
          type: TransactionType.Sent,
          transactionType: "debit",
          date: "2024-01-26",
        },
        {
          id: 2,
          title: "Received from Jane Smith",
          amount: 100.0,
          type: TransactionType.Received,
          transactionType: "credit",
          date: "2024-01-25",
        },
      ])

      return {
        showWelcomeModal,
        users,
        Logic,
        actionBtns,
        amount,
        modelCurrencyValue,
        currentPlatform,
        defaultCurrency,
        selectedCurrency,
        currencySymbol,
        AuthUser,
        availableCurrencies,
        recentTransactions,
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
