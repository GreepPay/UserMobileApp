<template>
  <app-wrapper>
    <subpage-layout
      title="Merchant"
      class="bg-light-gray-one"
      :showFooter="true"
    >
      <!-- <template #icon-action>
        <app-icon name="add" />
      </template> -->

      <div class="px-4 py-2 w-full">
        <app-image-loader
          class="w-full !bg-green justify-between py-3 px-4 rounded-[32px]"
          photo-url="/images/greep-transparent-logo.svg"
        >
          <div class="flex items-center space-x-2">
            <app-avatar
              :src="'/images/merchant-logos/1.svg'"
              class="!h-[84px] !w-[84px]"
            />

            <div class="h-fit flex flex-col">
              <app-normal-text class="!text-white !text-left !text-xs">
                Boutique
              </app-normal-text>
              <app-normal-text
                class="!text-white font-semibold !text-left !text-base"
              >
                <div class="flex space-x-1 items-center">
                  <span> Kvng Clothes </span>
                  <app-icon name="verify-badge" />
                </div>
              </app-normal-text>
              <app-normal-text class="!text-white !text-left !text-sm">
                Nicosia, Cyprus
              </app-normal-text>
            </div>
          </div>
        </app-image-loader>
      </div>

      <!-- About section -->
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
      <app-list-wrapper
        :items="transactions"
        title=" Transactions between"
        emptyTitle="No transactions available"
        emptyDescription="See all transactions"
      >
        <div class="w-full">
          <app-transaction
            v-for="transaction in transactions"
            :key="transaction.id"
            :data="transaction"
            @click="Logic.Common.GoToRoute('/transaction/' + transaction.id)"
            custom-class="border rounded-2xl px-2  mb-3 !w-full"
          />
        </div>
      </app-list-wrapper>
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
  import { ref, reactive } from "vue"
  import { defineComponent } from "vue"
  import {
    AppNormalText,
    AppIcon,
    AppMerchant,
    AppModal,
    AppTransaction,
    AppMerchantProduct,
    AppListWrapper,
    AppImageLoader,
    AppAvatar,
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
      AppIcon,
      AppMerchant,
      AppModal,
      AppTransaction,
      AppMerchantProduct,
      AppListWrapper,
      AppImageLoader,
      AppAvatar,
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

      const products = [
        {
          id: 1,
          name: "Test Name",
          price: "₦66,000",
          imageUrl: "/images/merchant-products/1.svg",
        },
        {
          id: 4,
          name: "Quick Fashion",
          price: "₦66,000",
          imageUrl: "/images/merchant-products/2.svg",
        },
        {
          id: 5,
          name: "Mega Pharmacy",
          price: "₦66,000",
          imageUrl: "/images/merchant-products/3.svg",
        },
        {
          id: 6,
          name: "Fresh Bites",
          price: "₦66,000",
          imageUrl: "/images/merchant-products/1.svg",
        },
        {
          id: 7,
          name: "Speedy Courier",
          price: "₦66,000",
          imageUrl: "/images/merchant-products/3.svg",
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
        products,
      }
    },
  })
</script>
