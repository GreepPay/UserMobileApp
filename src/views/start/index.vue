<template>
  <app-wrapper>
    <div
      :class="`w-full  flex flex-col lg:text-sm mdlg:text-[12px] text-xs   overflow-y-hidden !font-inter bg-white`"
      :style="`height: ${mobileFullHeight ? mobileFullHeight.height : ''};`"
    >
      <!-- Slide indicator -->
      <div
        v-if="slidePosition <= 2"
        class="flex justify-center items-center fixed w-full top-0 left-0 px-4 z-50"
        :style="`${paddings.paddingTop} ${paddings.paddingBottom}`"
      >
        <div class="w-[80%] rounded-[99px] bg-light-gray-two h-[6px] relative">
          <div
            :class="`absolute top-0 left-0 bg-black h-full ${
              slidePosition == 2 ? 'rounded-[99px]' : 'rounded-l-[99px]'
            }`"
            :style="`width: ${((slidePosition + 1) / totalSlides) * 100}%;`"
          ></div>
        </div>
      </div>

      <!--  -->
      <app-swiper
        :free-mode="false"
        :show-pagination="false"
        :space-between="0"
        :slide-per-view="1"
        :currentSlidePosition="currentSlidePosition"
        custom-class="!h-full "
        :swiperClass="''"
        v-model="slidePosition"
        id="swiperContainer"
      >
        <!-- Slide 1 -->
        <swiper-slide
          class="!flex !flex-col items-start relative justify-center bg-white h-screen"
        >
          <div
            class="w-full flex flex-col items-center h-full relative space-y-2 justify-between"
            :style="`${paddings.paddingTop} ${paddings.paddingBottom}`"
          >
            <!-- Main section -->
            <div
              class="w-full flex flex-col items-center justify-center space-y-5 -mt-8 h-full"
            >
              <img
                src="/images/onboarding/slide-1.png"
                alt="Slide 1"
                class="h-[210px]"
              />

              <div
                class="flex flex-col space-y-2 items-center px-4 justify-center"
              >
                <app-header-text class="text-center px-4">
                  Borderless Transactions With Multiple Currencies
                </app-header-text>

                <app-normal-text
                  class="text-center text-gray-two px-4 !text-sm"
                >
                  Set a default national or crypto currency and make instant
                  transfers to others, no matter their currency.
                </app-normal-text>
              </div>
            </div>

            <!-- Button -->
            <div
              class="flex flex-col justify-center items-center px-4 pt-4 w-full"
            >
              <app-button
                class="!w-full !py-4 font-semibold"
                variant="secondary"
                @click="currentSlidePosition = 1"
              >
                Next
              </app-button>
            </div>
          </div>
        </swiper-slide>

        <!-- Slide 2 -->
        <swiper-slide
          class="!flex !flex-col items-start relative justify-center bg-white h-screen"
        >
          <div
            class="w-full flex flex-col items-center h-full relative space-y-2 justify-between"
            :style="`${paddings.paddingTop} ${paddings.paddingBottom}`"
          >
            <!-- Main section -->
            <div
              class="w-full flex flex-col items-center justify-center space-y-5 -mt-8 h-full"
            >
              <img
                src="/images/onboarding/slide-2.png"
                alt="Slide 2"
                class="h-[210px]"
              />

              <div
                class="flex flex-col space-y-2 items-center px-8 py-4 justify-center"
              >
                <app-header-text class="text-center">
                  Deposit Funds With Any Currency, Anytime
                </app-header-text>

                <app-normal-text
                  class="text-center text-gray-two px-4 !text-sm"
                >
                  Add money to your wallet using any currency, and it instantly
                  converts to your default currency.
                </app-normal-text>
              </div>
            </div>

            <!-- Button -->
            <div
              class="flex flex-col justify-center items-center px-4 pt-4 w-full"
            >
              <app-button
                class="!w-full !py-4 font-semibold"
                variant="secondary"
                @click="currentSlidePosition = 2"
              >
                Next
              </app-button>
            </div>
          </div>
        </swiper-slide>

        <!-- Slide 3 -->
        <swiper-slide
          class="!flex !flex-col items-start relative justify-center bg-white h-screen"
        >
          <div
            class="w-full flex flex-col items-center h-full relative space-y-2 justify-between"
            :style="`${paddings.paddingTop} ${paddings.paddingBottom}`"
          >
            <!-- Main section -->
            <div
              class="w-full flex flex-col items-center justify-center space-y-5 px-4 -mt-8 h-full"
            >
              <img
                src="/images/onboarding/slide-3.png"
                alt="Slide 3"
                class="h-[210px]"
              />

              <div
                class="flex flex-col space-y-2 items-center p-4 justify-center"
              >
                <app-header-text class="text-center">
                  Earn GRP - Our Very Own Crypto Token
                </app-header-text>

                <app-normal-text
                  class="text-center text-gray-two px-4 !text-sm"
                >
                  Get rewarded with our token per transaction; redeem GRP tokens
                  directly to your default currency.
                </app-normal-text>
              </div>
            </div>

            <!-- Button -->
            <div
              class="flex flex-col justify-center items-center px-4 pt-4 w-full"
            >
              <app-button
                class="!w-full !py-4 font-semibold"
                variant="secondary"
                @click="currentSlidePosition = 3"
              >
                Next
              </app-button>
            </div>
          </div>
        </swiper-slide>

        <!-- Slide 4 -->
        <swiper-slide
          class="!flex !flex-col items-start relative justify-center bg-white h-screen"
        >
          <div
            class="w-full flex flex-col items-center h-full relative space-y-2 justify-between"
            :style="`${paddings.paddingTop} ${paddings.paddingBottom}`"
          >
            <!-- Main section -->
            <div
              class="w-full flex flex-col items-center justify-center space-y-5 px-4 h-full"
            >
              <img src="/images/logo.png" alt="logo" class="w-[100px]" />
            </div>

            <!-- Button -->
            <div
              class="flex flex-col justify-center items-center px-4 pt-4 w-full"
            >
              <div class="bg-light-gray-one p-5 rounded-2xl mb-5">
                <app-header-text
                  class="!text-center text-veryLightGray !font-normal !text-sm"
                >
                  By clicking the
                  <span class="font-semibold"> “Create Account” </span> button
                  below, you agree to our
                  <span class="font-semibold text-green">
                    Terms of Service, Terms & Conditions,
                  </span>
                  and
                  <span class="font-semibold text-green"> Privacy Policy.</span>
                </app-header-text>
              </div>

              <div
                class="grid grid-cols-3 gap-4 items-center justify-center w-full"
              >
                <app-button
                  class="!col-span-1 !py-4 font-semibold !text-center"
                  variant="secondary"
                  outlined
                  @click="Logic.Common.GoToRoute('/auth/login')"
                >
                  Sign In
                </app-button>

                <app-button
                  class="!col-span-2 !py-4 border-secondary"
                  variant="secondary"
                  @click="Logic.Common.GoToRoute('/auth/setup')"
                >
                  Create account
                </app-button>
              </div>
            </div>
          </div>
        </swiper-slide>
      </app-swiper>
    </div>
  </app-wrapper>
</template>

<script lang="ts">
import { defineComponent, watch, ref, onMounted } from "vue";
import AppWrapper from "../../components/AppWrapper.vue";
import { Logic } from "@greep/logic";
import {
  AppNormalText,
  AppHeaderText,
  AppButton,
  AppSwiper,
} from "@greep/ui-components";
import { SwiperSlide } from "swiper/vue";
import { safeAreaInsetBottom, safeAreaInsetTop } from "../../composable";
import { onUnmounted } from "vue";
import { computed } from "vue";
import { getPlatforms } from "@ionic/vue";

export default defineComponent({
  components: {
    AppWrapper,
    AppSwiper,
    SwiperSlide,
    AppButton,
    AppHeaderText,
    AppNormalText,
  },
  name: "StartWelcomePage",
  layout: "Onboarding",
  middlewares: {},
  setup() {
    localStorage.setItem("user_onboarded", "true");

    const slidePosition = ref(0);

    const currentSlidePosition = ref(0);

    const totalSlides = ref(3);

    watch(slidePosition, () => {
      currentSlidePosition.value = slidePosition.value;
    });

    const innerHeight = ref(window.innerHeight);

    const updateHeight = () => {
      innerHeight.value = window.innerHeight;
    };

    onMounted(() => {
      updateHeight();
      window.addEventListener("resize", updateHeight);
      localStorage.clear();
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateHeight);
    });

    const paddings = computed(() => {
      const platformIsIOS =
        getPlatforms()[0] === "iphone" ||
        getPlatforms()[0] === "ipad" ||
        getPlatforms()[0] === "ios";

      if (platformIsIOS) {
        return {
          paddingTop: `padding-top: calc(env(safe-area-inset-top) + 16px) !important;`,
          paddingBottom: `padding-bottom: calc(env(safe-area-inset-bottom) + 16px) !important;`,
        };
      }

      const platformIsAndroid = getPlatforms()[0] == "android";

      if (platformIsAndroid) {
        return {
          paddingTop: `padding-top: calc(env(safe-area-inset-top) + 45px) !important;`,
          paddingBottom: `padding-bottom: calc(env(safe-area-inset-bottom) + 45px) !important;`,
        };
      }

      return {
        paddingTop: `padding-top: calc(${safeAreaInsetTop.value}px + 16px);`,
        paddingBottom: `padding-bottom: calc(${safeAreaInsetBottom.value}px + 16px);`,
      };
    });

    const mobileFullHeight = computed(() => {
      return {
        height: `${innerHeight.value}px`,
      };
    });

    return {
      Logic,
      slidePosition,
      currentSlidePosition,
      totalSlides,
      mobileFullHeight,
      paddings,
    };
  },
});
</script>
