<template>
  <app-wrapper :innerClass="'!bg-transparent'">
    <div
      class="!bg-transparent h-screen w-full fixed top-0 left-0 z-[9999999999999]"
      id="videoContainer"
    >
      <div
        :class="`w-full flex flex-col items-center justify-start space-y-2 fixed !font-inter h-screen !pt-0 top-0 left-0 z-[9999999999999]  px-4 !bg-transparent`"
      >
        <div id="reader" width="0px" class="hidden"></div>
        <div
          class="w-full flex flex-row items-center justify-between !bg-opacity-100 !opacity-100 z-[99999] !bg-transparent"
          style="padding-top: calc(env(safe-area-inset-top)) !important"
        >
          <div class="flex flex-row items-center w-full justify-between">
            <div
              @click="
                Logic.Common.goBack();
                CameraPreview.stop();
              "
            >
              <app-icon :name="'arrow-left-white'" :customClass="'h-[28px]'" />
            </div>
            <app-header-text :color="'!text-white'" class="!font-semibold">
              Scan To Pay
            </app-header-text>

            <div :class="`w-[40px] h-[40px] xs:w-[43px] xs:h-[43px] invisible`">
              <app-icon :name="'arrow-left-white'" :customClass="'h-[28px]'" />
            </div>
          </div>
        </div>

        <div
          class="h-full flex-grow flex flex-col space-y-3 w-full items-center justify-center"
        >
          <div
            :class="`w-[95%]  !h-[330px]  flex flex-col transparent-center  items-center rounded-[22px] relative `"
            id="scanContainer"
          ></div>
          <div
            class="w-full flex flex-row justify-center items-start z-[99999] pt-3"
            style="
              padding-bottom: calc(
                env(safe-area-inset-bottom) + 16px
              ) !important;
            "
          >
            <div
              @click="startScanning()"
              class="w-[60px] h-[60px] xs:w-[50px] xs:h-[50px] rounded-full bg-white shadow-custom flex flex-row justify-center items-center"
              v-if="snappedImages.length == 0"
            >
              <app-icon :name="'scan'" :customClass="'h-[28px] xs:h-[22px]'">
              </app-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-wrapper>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from "vue";
import { onIonViewDidEnter, onIonViewDidLeave } from "@ionic/vue";
import { Logic } from "@greep/logic";
import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions,
} from "@capacitor-community/camera-preview";
import fixOrientation from "fix-orientation";
import { AppHeaderText, AppIcon } from "@greep/ui-components";
import { Html5Qrcode } from "html5-qrcode";
import AppWrapper from "@/components/AppWrapper.vue";
export default defineComponent({
  components: {
    AppWrapper,
    AppHeaderText,
    AppIcon,
  },
  name: "ScanQrCode",
  middlewares: {
    fetchRules: [],
    enforceTransparency: true,
  },
  layout: "Onboarding",
  setup() {
    const showScanImage = ref(false);

    const rotateVideo = ref(false);

    const imageFileUrl = ref("");

    const scanInterval = ref();

    const selfieVideoElement = ref<any>(document.getElementById("videoScan"));

    const selfieCanvasElement = ref<any>(document.getElementById("scanCanvas"));

    const showScan = ref(false);

    const snappedImages = ref<
      {
        url: string;
        blob: Blob;
      }[]
    >([]);

    const showVideoRecorder = async () => {
      showScanImage.value = false;
      selfieVideoElement.value = document.getElementById("video");
      selfieCanvasElement.value = document.getElementById("scanCanvas");

      const cameraPreviewOptions: CameraPreviewOptions = {
        position: "rear",
        disableAudio: true,
        parent: "videoContainer",
        toBack: true,
        rotateWhenOrientationChanged: false,
        width: window.screen.width,
        height: window.screen.height,
        enableHighResolution: true,
      };

      CameraPreview.start(cameraPreviewOptions);
    };

    const startScanning = async () => {
      showScan.value = true;

      const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
        quality: 50,
      };

      const result = await CameraPreview.capture(cameraPreviewPictureOptions);
      const base64PictureData = result.value;
      await fixOrientation(
        "data:image/jpeg;base64," + base64PictureData,
        { image: true },
        (fixed: string) => {
          Logic.Common.base64ToBlob(fixed).then((blobImage) => {
            const imageFile = new File([blobImage], "scanned-image", {
              type: blobImage.type,
              lastModified: new Date().getTime(),
            });
            const html5QrCode = new Html5Qrcode(/* element id */ "reader");

            console.log(imageFile);
            html5QrCode
              .scanFile(imageFile, false)
              .then((decodedText) => {
                // success, use decodedText
                // const fullData = JSON.parse(decodedText);
                console.log(decodedText);

                try {
                  const decodedTextJson: {
                    amount: string;
                    currency: string;
                    uuid: string;
                  } = JSON.parse(decodedText);

                  if (
                    decodedTextJson.amount &&
                    decodedTextJson.currency &&
                    decodedTextJson.uuid
                  ) {
                    Logic.Common.GoToRoute(
                      `/send/enter-amount?beneficiary=${decodedTextJson.uuid}&amount=${decodedTextJson.amount}&currency=${decodedTextJson.currency}`
                    );
                  } else {
                    Logic.Common.showAlert({
                      show: true,
                      type: "error",
                      message: "No Valid QR code found",
                    });
                  }
                } catch (error) {
                  console.error("Error parsing JSON:", error);
                  Logic.Common.showAlert({
                    show: true,
                    type: "error",
                    message: "No Valid QR code found",
                  });
                }
              })
              .catch(() => {
                showScan.value = false;
                // failure, handle it.
                console.log(`Error scanning file - No qrcode`);
                Logic.Common.showAlert({
                  show: true,
                  type: "error",
                  message: "No Valid QR code found",
                });
              });
            showScan.value = false;
          });
        }
      );
    };

    onIonViewDidEnter(() => {
      setTimeout(() => {
        showVideoRecorder();
      }, 300);
    });

    onIonViewDidLeave(() => {
      clearInterval(scanInterval.value);
      setTimeout(() => {
        CameraPreview.stop();
      }, 1000);
    });

    onUnmounted(() => {
      setTimeout(() => {
        CameraPreview.stop();
      }, 1000);
    });

    return {
      Logic,
      showScanImage,
      rotateVideo,
      imageFileUrl,
      showScan,
      CameraPreview,
      snappedImages,
      startScanning,
    };
  },
});
</script>
<style scoped>
.transparent-center {
  box-shadow: 0 0 0 5000px rgba(10, 20, 30, 0.7) !important;
  -webkit-appearance: none;
  -webkit-box-shadow: 0 0 0 5000px rgba(10, 20, 30, 0.7) !important;
  appearance: none;
}
</style>
