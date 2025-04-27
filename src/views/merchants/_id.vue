<template>
  <app-wrapper>
    <subpage-layout title="Merchant" class="bg-light-gray-one">
      <template #icon-action>
        <app-icon name="add" />
      </template>

      <div class="w-full flex my-2">
        <div
          class="w-full flex items-center justicy-between space-x-2 px-4 bg-white overflow-y-auto py-3"
          @click="showAboutModal = true"
        >
          <app-normal-text class="!font-semibold flex-1 !text-black !text-sm">
            About
          </app-normal-text>
          <app-icon name="chevron-right" class="!h-5" />
        </div>
      </div>

      <!-- Transactions between   -->
      <div class="w-full flex flex-col px-4 py-3 mb-2 bg-white">
        <div class="w-full flex justify-between items-center">
          <app-normal-text class="font-semibold !text-black !text-sm">
            Transactions between
          </app-normal-text>

          <app-normal-text class="text-primary"> See all </app-normal-text>
        </div>

        <div class="py-2">
          <template v-if="merchants">
            <div
              class="flex items-center gap-4 overflow-x-auto h-fit scrollbar-hide"
            >
              <!-- <app-merchant
                v-for="(merchant, index) in merchants"
                :key="index"
                :merchant="merchant"
              /> -->

              <app-transaction
                v-for="transaction in transactions"
                :key="transaction.id"
                :data="transaction"
                @click="
                  Logic.Common.GoToRoute('/transaction/' + transaction.id)
                "
                custom-class="border rounded-2xl px-2 min-w-80"
              />
            </div>
          </template>
          <div v-else class="py-4 !pt-2">
            <app-empty-state
              title="No Similar merchants available"
              description="See all Similar merchants"
            />
          </div>
        </div>
      </div>

      <!-- Similar merchants Merchant -->
      <div class="w-full flex flex-col px-4 py-3 mb-2 bg-white">
        <div class="w-full flex justify-between items-center">
          <app-normal-text class="font-semibold !text-black !text-sm">
            Similar merchants
          </app-normal-text>

          <app-normal-text class="text-primary"> See all </app-normal-text>
        </div>

        <div class="py-2">
          <template v-if="merchants">
            <div
              class="flex items-center gap-4 overflow-x-auto h-fit scrollbar-hide"
            >
              <app-merchant
                v-for="(merchant, index) in merchants"
                :key="index"
                :merchant="merchant"
              />
            </div>
          </template>
          <div v-else class="py-4 !pt-2">
            <app-empty-state
              title="No Similar merchants available"
              description="See all Similar merchants"
            />
          </div>
        </div>
      </div>

      <!--   -->
      <div class="w-full flex flex-col px-4 py-3 mb-2 bg-white">
        <div class="w-full flex justify-between items-center">
          <app-normal-text class="font-semibold !text-black !text-sm">
            Similar merchants
          </app-normal-text>

          <app-normal-text class="text-primary"> See all </app-normal-text>
        </div>

        <div class="py-2">
          <template v-if="merchants">
            <div
              class="flex items-center gap-4 overflow-x-auto h-fit scrollbar-hide"
            >
              <app-merchant
                v-for="(merchant, index) in merchants"
                :key="index"
                :merchant="merchant"
              />
            </div>
          </template>
          <div v-else class="py-4 !pt-2">
            <app-empty-state
              title="No Similar merchants available"
              description="See all Similar merchants"
            />
          </div>
        </div>
      </div>

      <!--   -->
      <div class="w-full flex flex-col px-4 py-3 mb-2 bg-white">
        <div class="w-full flex justify-between items-center">
          <app-normal-text class="font-semibold !text-black !text-sm">
            Similar merchants
          </app-normal-text>

          <app-normal-text class="text-primary"> See all </app-normal-text>
        </div>

        <div class="py-2">
          <template v-if="merchants">
            <div
              class="flex items-center gap-4 overflow-x-auto h-fit scrollbar-hide"
            >
              <app-merchant
                v-for="(merchant, index) in merchants"
                :key="index"
                :merchant="merchant"
              />
            </div>
          </template>
          <div v-else class="py-4 !pt-2">
            <app-empty-state
              title="No Similar merchants available"
              description="See all Similar merchants"
            />
          </div>
        </div>
      </div>

      <!--   -->
      <div class="w-full flex flex-col px-4 py-3 mb-2 bg-white">
        <div class="w-full flex justify-between items-center">
          <app-normal-text class="font-semibold !text-black !text-sm">
            Similar merchants
          </app-normal-text>

          <app-normal-text class="text-primary"> See all </app-normal-text>
        </div>

        <div class="py-2">
          <template v-if="merchants">
            <div
              class="flex items-center gap-4 overflow-x-auto h-fit scrollbar-hide"
            >
              <app-merchant
                v-for="(merchant, index) in merchants"
                :key="index"
                :merchant="merchant"
              />
            </div>
          </template>
          <div v-else class="py-4 !pt-2">
            <app-empty-state
              title="No Similar merchants available"
              description="See all Similar merchants"
            />
          </div>
        </div>
      </div>

      <!--   -->
      <div class="w-full flex flex-col px-4 py-3 mb-2 bg-white">
        <div class="w-full flex justify-between items-center">
          <app-normal-text class="font-semibold !text-black !text-sm">
            Similar merchants
          </app-normal-text>

          <app-normal-text class="text-primary"> See all </app-normal-text>
        </div>

        <div class="py-2">
          <template v-if="merchants">
            <div
              class="flex items-center gap-4 overflow-x-auto h-fit scrollbar-hide"
            >
              <app-merchant
                v-for="(merchant, index) in merchants"
                :key="index"
                :merchant="merchant"
              />
            </div>
          </template>
          <div v-else class="py-4 !pt-2">
            <app-empty-state
              title="No Similar merchants available"
              description="See all Similar merchants"
            />
          </div>
        </div>
      </div>
    </subpage-layout>

    <!-- About Merchant Modal -->
    <app-modal
      v-if="showAboutModal"
      :close="
        () => {
          showAboutModal = false
        }
      "
      :hasTitle="true"
      title="About"
      contentClass="!p-0"
    >
      <div class="w-full flex flex-col">
        <div class="w-full border-b-[4px] text-black p-4 flex flex-col">
          <app-normal-text class="font-semibold !text-sm pb-1">
            Address
          </app-normal-text>
          <app-normal-text class="!text-sm text-gray-two">
            2 Chrysanthou Mylona Street, <br />
            Nicosia, Cyprus.
          </app-normal-text>
        </div>

        <div class="w-full border-b-[4px] text-black p-4 flex flex-col">
          <app-normal-text class="font-semibold !text-sm pb-1">
            Description
          </app-normal-text>
          <app-normal-text class="!text-sm text-gray-two">
            Kvng Clothes offers stylish and unique fashion designed to elevate
            your closet and showcase your individuality. With a focus on
            high-quality materials and nice timeless designs, we deliver
            confidence and elegance in every piece. Discover a fashion
            experience tailored for modern trendsetters who reign in style.
          </app-normal-text>
        </div>
      </div>
    </app-modal>
  </app-wrapper>
</template>

<script lang="ts">
  import { ref, computed, reactive } from "vue"
  import { defineComponent } from "vue"
  import {
    AppNormalText,
    AppButton,
    AppIcon,
    AppMerchant,
    AppTabs,
    AppSearch,
    AppModal,
    AppTransaction,
  } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  enum TransactionType {
    Sent = "sent",
    Received = "received",
    Added = "added",
    Redeemed = "redeemed",
  }

  export default defineComponent({
    name: "MerchantsDetailsPage",
    components: {
      AppNormalText,
      AppButton,
      AppIcon,
      AppMerchant,
      AppTabs,
      AppSearch,
      AppModal,
      AppTransaction,
    },
    setup() {
      const showAboutModal = ref(false)
      const searchQuery = ref("")
      const activeTab = ref("recents")
      const selectedFlterOptions = ref<string[]>([])

      const transactions = reactive<
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

      const merchants = [
        {
          id: 1,
          name: "Test Name",
          category: "Bookstore",
          imageUrl: "/images/merchant-logos/1.svg",
        },

        {
          id: 4,
          name: "Quick Fashion",
          category: "Fashion",
          imageUrl: "/images/merchant-logos/2.svg",
        },
        {
          id: 5,
          name: "Mega Pharmacy",
          category: "Health",
          imageUrl: "/images/merchant-logos/3.svg",
        },
        {
          id: 6,
          name: "Fresh Bites",
          category: "Food",
          imageUrl: "/images/merchant-logos/1.svg",
        },
        {
          id: 7,
          name: "Speedy Courier",
          category: "Logistics",
          imageUrl: "/images/merchant-logos/3.svg",
        },
      ]

      return {
        Logic,
        merchants,
        activeTab,
        searchQuery,
        showAboutModal,
        selectedFlterOptions,
        transactions,
      }
    },
  })
</script>
