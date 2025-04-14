<template>
  <app-wrapper>
    <default-index-layout title="Home">
      <div class="w-full flex flex-col items-center justify-start">
        <div class="px-4 w-full pt-1">
          <app-title-card-container>
            <div class="flex flex-col justify-center items-center w-full">
              <app-currency-switch
                v-model="modelCurrencyValue"
                :default_currency="defaultCountryCode.code"
                :availableCurrencies="allowedAvailableCurrencies"
                v-model:model-symbol="currencySymbol"
              />

              <div
                class="w-full py-3 flex flex-col items-center space-y-[2px] justify-center !pt-6"
              >
                <app-normal-text
                  custom-class="!text-white !font-normal !font-sm pb-1  text-center"
                >
                  Total Balance
                </app-normal-text>

                <app-header-text
                  custom-class="!text-3xl !leading-6 text-white !font-normal"
                >
                  {{ currencySymbol }}
                  {{
                    Logic.Common.convertToMoney(
                      (AuthUser?.wallet?.total_balance || 0) *
                        (CurrentGlobalExchangeRate?.mid || 0),
                      true,
                      "",
                      false
                    )
                  }}
                </app-header-text>
              </div>

              <div
                class="flex w-full justify-between items-center px-6 !pt-4 pb-4"
              >
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
            <!-- <app-icon
              name="add-circle"
              custom-class="h-5"
              @click="Logic.Common.GoToRoute(`/beneficiaries`)"
            /> -->
          </div>

          <div class="pt-4 px-4">
            <app-horizontal-user-list :items="users" :imageSize="56" />
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
            <div v-if="recentTransactions.length == 0" class="py-4 !pt-2">
              <app-empty-state
                title="No transactions"
                description="Make Payments and Redeem the GRP Tokens you’ve earned."
              />
            </div>
            <template v-else>
              <app-transaction
                class="z-[10]"
                v-for="transaction in recentTransactions"
                :key="transaction.id"
                :data="transaction"
                @click="
                  Logic.Common.GoToRoute('/transactions/' + transaction.id)
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
          showWelcomeModal = false;
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
import { defineComponent, reactive, ref, onMounted, computed } from "vue";
import {
  AppNormalText,
  AppHeaderText,
  AppButton,
  AppTransaction,
  AppIcon,
  AppTitleCardContainer,
  AppModal,
  AppHorizontalUserList,
  AppCurrencySwitch,
  AppEmptyState,
} from "@greep/ui-components";
import { Logic } from "@greep/logic";
import { getPlatforms, onIonViewDidEnter } from "@ionic/vue";
import { availableCurrencies } from "../composable";
import { User } from "@greep/logic/src/gql/graphql";
import { watch } from "vue";

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
    AppHorizontalUserList,
    AppCurrencySwitch,
    AppEmptyState,
  },
  middlewares: {
    fetchRules: [
      {
        domain: "Wallet",
        property: "ManyTransactions",
        method: "GetTransactions",
        params: [1, 10],
        requireAuth: true,
        ignoreProperty: false,
        silentUpdate: true,
      },
      {
        domain: "Wallet",
        property: "ManyPointTransactions",
        method: "GetPointTransactions",
        params: [1, 10],
        requireAuth: true,
        ignoreProperty: false,
        silentUpdate: true,
      },
      {
        domain: "Wallet",
        property: "CurrentGlobalExchangeRate",
        method: "GetGlobalExchangeRate",
        params: [],
        requireAuth: true,
        ignoreProperty: false,
        silentUpdate: true,
      },
    ],
  },
  setup() {
    const defaultCountryCode = computed(() => {
      return availableCurrencies.filter(
        (item) => item.code == Logic.Auth.AuthUser?.profile?.default_currency
      )[0];
    });

    const amount = ref("1000");
    const modelCurrencyValue = ref(defaultCountryCode.value?.code);
    const showWelcomeModal = ref(false);
    const actionBtns = [
      {
        text: "Add",
        icon: "plus",
        route: "add/method",
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
    ];

    const allowedAvailableCurrencies = computed(() => {
      const newAvailableCurrencies = availableCurrencies.filter((item) => {
        return (
          item.code == defaultCountryCode.value?.code ||
          item.code == "USDC" ||
          item.code == "XLM"
        );
      });

      newAvailableCurrencies.push(
        {
          code: "XLM",
          name: "Stellar Lumen",
          symbol: "XLM",
          country_code: "XLM",
          loading: false,
        },
        {
          code: "USDC",
          name: "USD Coin",
          symbol: "$",
          country_code: "US",
          loading: false,
        }
      );

      return reactive(newAvailableCurrencies);
    });

    const recentTransactions = reactive<
      {
        id: string | number;
        title: string;
        amount: number;
        type: TransactionType;
        transactionType: "credit" | "debit";
        date: string;
        currencySymbol: string;
        subAmount: string;
      }[]
    >([]);

    const users = ref<User[]>([]);

    const defaultCurrency = ref(defaultCountryCode.value.code);
    const selectedCurrency = ref(defaultCountryCode.value.code);
    const currencySymbol = ref(defaultCountryCode.value.symbol);

    const ManyTransactions = ref(Logic.Wallet.ManyTransactions);
    const ManyPointTransactions = ref(Logic.Wallet.ManyPointTransactions);
    const CurrentGlobalExchangeRate = ref(
      Logic.Wallet.CurrentGlobalExchangeRate
    );

    const AuthUser = ref<User | undefined>(Logic.Auth.AuthUser);

    const currentPlatform = computed(() => {
      return getPlatforms()[0];
    });

    const setTransactionData = () => {
      recentTransactions.length = 0;

      // Normal transactions
      ManyTransactions.value?.data?.forEach((data) => {
        let typeName: TransactionType = TransactionType.Added;

        if (data.dr_or_cr == "credit" && data.description == "Wallet Topup") {
          typeName = TransactionType.Added;
        } else if (data.dr_or_cr == "debit") {
          typeName = TransactionType.Sent;
        }

        recentTransactions.push({
          id: data.uuid,
          amount:
            data.amount *
            (modelCurrencyValue.value == "USDC"
              ? 1
              : CurrentGlobalExchangeRate.value?.mid || 1),
          title: data.description,
          transactionType: data.dr_or_cr as "credit" | "debit",
          date: Logic.Common.momentInstance(data.created_at).format(
            "YYYY-MM-DD"
          ),
          type: typeName,
          currencySymbol: currencySymbol.value || "",
          subAmount: `USDC ${Logic.Common.convertToMoney(
            data.amount,
            true,
            ""
          )}`,
        });
      });

      // Point transactions
      ManyPointTransactions.value?.data?.forEach((data) => {
        let typeName: TransactionType = TransactionType.Added;

        if (data.dr_or_cr == "credit") {
          typeName = TransactionType.Redeemed;
        } else if (data.dr_or_cr == "debit") {
          typeName = TransactionType.Redeemed;
        }

        recentTransactions.push({
          id: data.uuid,
          amount: data.amount,
          title: data.description,
          transactionType: data.dr_or_cr as "credit" | "debit",
          date: Logic.Common.momentInstance(data.created_at).format(
            "YYYY-MM-DD"
          ),
          type: typeName,
          currencySymbol: currencySymbol.value || "",
          subAmount: `GRP Coin`,
        });
      });

      // Sort transactions desc by date
      recentTransactions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    };

    const setPageDefaults = () => {
      defaultCurrency.value =
        Logic.Auth.AuthUser?.profile?.default_currency ||
        defaultCountryCode.value.code;
      selectedCurrency.value = defaultCurrency.value;
    };

    onIonViewDidEnter(() => {
      setPageDefaults();
      setTransactionData();
    });

    watch(
      [
        ManyPointTransactions,
        ManyTransactions,
        currencySymbol,
        CurrentGlobalExchangeRate,
      ],
      () => {
        setTransactionData();
      }
    );

    onMounted(() => {
      // Register reactive data
      Logic.Wallet.watchProperty("ManyTransactions", ManyTransactions);
      Logic.Wallet.watchProperty(
        "ManyPointTransactions",
        ManyPointTransactions
      );
      Logic.Auth.watchProperty("AuthUser", AuthUser);
      Logic.Wallet.watchProperty(
        "CurrentGlobalExchangeRate",
        CurrentGlobalExchangeRate
      );

      const hasSeenModal = localStorage.getItem("has_seen_welcome_modal");

      if (!hasSeenModal) {
        showWelcomeModal.value = true;
        localStorage.setItem("has_seen_welcome_modal", "true");
      }
      Logic.Auth.watchProperty("AuthUser", AuthUser);

      setPageDefaults();
      setTransactionData();
    });

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
      CurrentGlobalExchangeRate,
      allowedAvailableCurrencies,
      defaultCountryCode,
    };
  },
});
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
