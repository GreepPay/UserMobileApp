<template>
  <app-wrapper>
    <default-index-layout title="Merchants" class="bg-light-gray-one">
      <template #title-content>
        <div class="text-black  pb-4 px-3">
          <app-search
            placeholder="Search for anything"
            @update:search="searchQuery = $event"
          />
        </div>
      </template>

      <div class="w-full mt-2.5 overflow-y-auto">
        <!-- Featured Merchant -->
        <app-list-wrapper
          :items="merchants"
          title=" Featured"
          emptyTitle="No Featured available"
          emptyDescription="See all Featured merchants"
        >
          <div
            class="flex items-center gap-4 overflow-x-auto h-fit scrollbar-hide"
          >
            <app-merchant
              v-for="(merchant, index) in merchants"
              :key="index"
              :merchant="merchant"
              @click="Logic.Common.GoToRoute('/merchants/' + merchant.id)"
            />
          </div>
        </app-list-wrapper>

        <!-- Boutiques Merchant -->
        <app-list-wrapper
          :items="merchants"
          title=" Boutiques"
          emptyTitle="No Boutiques available"
          emptyDescription="See all Boutiques merchants"
        >
          <div
            class="flex items-center gap-4 overflow-x-auto h-fit scrollbar-hide"
          >
            <app-merchant
              v-for="(merchant, index) in merchants"
              :key="index"
              :merchant="merchant"
              @click="Logic.Common.GoToRoute('/merchants/' + merchant.id)"
            />
          </div>
        </app-list-wrapper>

        <!-- Supermarket Merchant -->
        <app-list-wrapper
          :items="merchants"
          title=" Supermarket"
          emptyTitle="No Supermarket available"
          emptyDescription="See all Supermarket merchants"
        >
          <div
            class="flex items-center gap-4 overflow-x-auto h-fit scrollbar-hide"
          >
            <app-merchant
              v-for="(merchant, index) in merchants"
              :key="index"
              :merchant="merchant"
              @click="Logic.Common.GoToRoute('/merchants/' + merchant.id)"
            />
          </div>
        </app-list-wrapper>
      </div>
    </default-index-layout>
  </app-wrapper>
</template>

<script lang="ts">
  import { ref } from "vue"
  import { defineComponent } from "vue"
  import { AppSearch, AppMerchant, AppListWrapper } from "@greep/ui-components"
  import { Logic } from "@greep/logic"

  export default defineComponent({
    name: "MerchantsPage",
    components: {
      AppMerchant,
      AppSearch,
      AppListWrapper,
    },
    setup() {
      const searchQuery = ref("")
      const merchants = [
        {
          id: 1,
          name: "Test Name",
          category: "Bookstore",
          imageUrl: "/images/merchant-logos/1.svg",
        },
        {
          id: 2,
          name: "City Electronics",
          category: "Electronics",
          imageUrl: "/images/merchant-logos/3.svg",
        },
        {
          id: 3,
          name: "Green Groceries",
          category: "Groceries",
          imageUrl: "/images/merchant-logos/2.svg",
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
        {
          id: 8,
          name: "The Coffee House",
          category: "Cafe",
          imageUrl: "/images/merchant-logos/1.svg",
        },
        {
          id: 9,
          name: "Daily Wear",
          category: "Clothing",
          imageUrl: "/images/merchant-logos/2.svg",
        },
        {
          id: 10,
          name: "Tech World",
          category: "Gadgets",
          imageUrl: "/images/merchant-logos/1.svg",
        },
        {
          id: 11,
          name: "Book Haven",
          category: "Books",
          imageUrl: "/images/merchant-logos/3.svg",
        },
        {
          id: 12,
          name: "Fitness First",
          category: "Fitness",
          imageUrl: "/images/merchant-logos/2.svg",
        },
      ]

      return {
        merchants,
        searchQuery,
        Logic,
      }
    },
  })
</script>
