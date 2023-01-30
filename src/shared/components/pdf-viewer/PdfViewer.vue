<template>
  <div class="pdf-viewer">
    <div class="pdf-viewer__actions">
      <button :id="idConfig.zoomIn" type="button" title="Zoom in">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
          <path fill="#FFB400" d="M11.435 10.063h-.723l-.256-.247a5.92 5.92 0 0 0 1.437-3.87 5.946 5.946 0 1 0-5.947 5.947 5.92 5.92 0 0 0 3.87-1.437l.247.256v.723L14.637 16 16 14.637l-4.565-4.574Zm-5.489 0A4.111 4.111 0 0 1 1.83 5.946 4.111 4.111 0 0 1 5.946 1.83a4.111 4.111 0 0 1 4.117 4.116 4.111 4.111 0 0 1-4.117 4.117Zm.458-6.404h-.915v1.83h-1.83v.915h1.83v1.83h.915v-1.83h1.83v-.915h-1.83v-1.83Z"/>
        </svg>
      </button>

      <button :id="idConfig.zoomOut" type="button" title="Zoom out">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
          <path fill="#FFB400" d="M11.435 10.063h-.723l-.256-.247a5.92 5.92 0 0 0 1.437-3.87 5.946 5.946 0 1 0-5.947 5.947 5.92 5.92 0 0 0 3.87-1.437l.247.256v.723L14.637 16 16 14.637l-4.565-4.574Zm-5.489 0A4.111 4.111 0 0 1 1.83 5.946 4.111 4.111 0 0 1 5.946 1.83a4.111 4.111 0 0 1 4.117 4.116 4.111 4.111 0 0 1-4.117 4.117Zm.458-4.574H3.659v.915h4.575v-.915h-1.83Z"/>
        </svg>
      </button>

      <button @click="download" type="button" title="Download">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="none">
          <path fill="#FFB400" d="M14 5.647h-4V0H4v5.647H0l7 6.588 7-6.588ZM6 7.53V1.882h2V7.53h1.17L7 9.572 4.83 7.529H6Zm-6 6.589h14V16H0v-1.882Z"/>
        </svg>
      </button>
    </div>
    <pre v-if="data" style="height: 200px; overflow: auto">
      scale - {{data.scale}}
      rotation - {{data.rotation}}
      additionalEvent - {{data.additionalEvent}}
    </pre>
    <div class="pdf-viewer__container">
      <vue-pdf-app v-if="blobUrl" :class="containerClass" @pages-rendered="subscribe"
          :pdf="blobUrl"
          :config="{ toolbar: false, sidebar: false, presentationMode: true, }"
          :page-scale="'page-width'"
          :id-config="idConfig"
          style="position: relative"
        >

        </vue-pdf-app>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import VuePdfApp from "vue-pdf-app";



import Hammer from "hammerjs"

const throttleFunction=(func: any, delay: any)=>{

    // Previously called time of the function
    let prev = 0;
    return (...args: any) => {
      // Current called time of the function
      let now = new Date().getTime();

      // Logging the difference between previously
      // called and current called timings
      console.log(now-prev, delay);

      // If difference is greater than delay call
      // the function again.
      if(now - prev> delay){
        prev = now;

        // "..." is the spread operator here
        // returning the function with the
        // array of arguments
        return func(...args);
      }
    }
  }

@Component({ components: { VuePdfApp }})

export default class PadViewer extends Vue {

  @Prop({required: true}) id: string;
  @Prop({required: true}) name: string;

  idConfig = {
    zoomIn: "vuePdfAppZoomIn",
    zoomOut: "vuePdfAppZoomOut",
  }
  kek = 0

  readonly containerClass = "pdf-viewer__app";

  blobUrl: string = "";
  filebase64String: string = "";

  data: HammerInput & { additionalEvent: "pinchout" | "pinchin" } | null = null;

  subscribe(pdfViewer: { zoomIn: (ticks?: number) => {}, zoomOut: (ticks?: number) => {}}) {

    const element = document.getElementById("viewerContainer") as HTMLElement;

    let pinchZoomEnabled = false;
    function enablePinchZoom(pdfViewer: any) {
        let startX = 0,
            startY = 0;
        let initialPinchDistance = 0;
        let pinchScale = 1;
        const viewer = document.getElementById("viewer");
        const container = document.getElementById("viewerContainer");
        const reset = () => {
            startX = startY = initialPinchDistance = 0;
            pinchScale = 1;
        };
        // Prevent native iOS page zoom
        //document.addEventListener("touchmove", (e) => { if (e.scale !== 1) { e.preventDefault(); } }, { passive: false });
        document.addEventListener("touchstart", (e) => {
            if (e.touches.length > 1) {
                startX = (e.touches[0].pageX + e.touches[1].pageX) / 2;
                startY = (e.touches[0].pageY + e.touches[1].pageY) / 2;
                initialPinchDistance = Math.hypot(
                    e.touches[1].pageX - e.touches[0].pageX,
                    e.touches[1].pageY - e.touches[0].pageY
                );
            } else {
                initialPinchDistance = 0;
            }
        });
        document.addEventListener(
            "touchmove",
            (e) => {
                if (initialPinchDistance <= 0 || e.touches.length < 2) {
                    return;
                }
                //@ts-ignore
                if (e.scale !== 1) {
                    e.preventDefault();
                }
                const pinchDistance = Math.hypot(
                    e.touches[1].pageX - e.touches[0].pageX,
                    e.touches[1].pageY - e.touches[0].pageY
                );
                //@ts-ignore
                const originX = startX + container.scrollLeft;
                //@ts-ignore
                const originY = startY + container.scrollTop;
                pinchScale = pinchDistance / initialPinchDistance;
                //@ts-ignore
                viewer.style.transform = `scale(${pinchScale})`;
                //@ts-ignore
                viewer.style.transformOrigin = `${originX}px ${originY}px`;
            },
            { passive: false }
        );
        document.addEventListener("touchend", (e) => {
            if (initialPinchDistance <= 0) {
                return;
            }
            //@ts-ignore
            viewer.style.transform = `none`;
            //@ts-ignore
            viewer.style.transformOrigin = `unset`;
            pdfViewer.currentScale *= pinchScale;

            const scaleFactor = pdfViewer.currentScale;

            if (scaleFactor < 1) {
              pdfViewer.zoomOut(null, scaleFactor);
            } else if (scaleFactor > 1) {
              pdfViewer.zoomIn(null, scaleFactor);
            }

            //@ts-ignore
            const rect = container.getBoundingClientRect();
            const dx = startX - rect.left;
            const dy = startY - rect.top;
            //@ts-ignore
            container.scrollLeft += dx * (pinchScale - 1);
            //@ts-ignore
            container.scrollTop += dy * (pinchScale - 1);
            reset();
        });
    }
    pinchZoomEnabled = true;
    enablePinchZoom(pdfViewer);


    console.log(element);

    // const hammer = new Hammer(element, {touchAction: "auto"});

    // hammer.get('pinch').set({ enable: true });

    // element.addEventListener("touchstart", function(event) {
    //   console.log(event.touches.length);
    //   if (event.touches.length >= 2) {
    //     hammer.get("pinch").set({ enable: true });
    //   }
    // });
    // element.addEventListener("touchend", function(event) {
    //   if (event.touches.length < 2) {
    //     hammer.get("pinch").set({ enable: false });
    //   }
    // });

    // const h = (data: HammerInput) => {
    //   //@ts-ignore
    //   this.data = data;


    //   const scale = data.scale;

    //   // if (scale > 1){
    //   //   pdfViewer.zoomIn();
    //   // } else {
    //   //   pdfViewer.zoomOut();
    //   // }
    // }

    // const handler = throttleFunction(h, 30)

    // hammer.on("pinch", handler);
  }

  async mounted() {

    try {
      const data = await this.$hrLinkRepository.getDocumentFile(this.id);
      const reader = new FileReader();

      reader.onloadend = () => {
          // @ts-ignore
          this.filebase64String = reader.result;
      };

      reader.readAsDataURL(data);

      const blob = new window.Blob([data], { type: 'application/pdf' });
      this.blobUrl = window.URL.createObjectURL(blob);
    }
    catch(e) {
      this.$store.dispatch('reportError', e);
    }
    finally {
      this.$emit("done");
    }
  }

  download() {
    const platform = this.$store.getters["platform"];
    const name = this.name + ".pdf";

    if (platform === "Web") {
      let a = document.createElement('a');
      a.download = name;
      a.target = "_blank"
      a.href = this.blobUrl;
      document.body.appendChild(a);

      a.click();
    }
    else if(platform === "iOS") {
      try {
        window.webkit.messageHandlers.openFromDataUrl.postMessage?.({
          fileName: name,
          data: this.filebase64String
        });
      }
      catch(e) {
        this.$store.dispatch('reportError', e);
      }
    }
    else {
      // @ts-ignore
      appercode.openFromDataUrl(this.data, name, "application/pdf");
    }
  }

  beforeDestroy() {
    window.URL.revokeObjectURL(this.blobUrl);
  }
}

</script>
<style lang="scss">

#viewerContainer {
  left: 0 !important;
}

#vuePdfApp {
  background-color: white;

  .pdfViewer .page {
    border-image: none;
  }

  .pdfViewer .page .loadingIcon {
    display: none;
  }
}

.pdf-viewer {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;

  &__actions {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 16px;
    top: 17px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
    padding: 2px;
    z-index: 1;

    button {
      background-color: transparent;
      line-height: 1;
      border: 0;
      padding: 6px;
    }

    button + button {
      margin-top: 6px;
    }
  }

  &__container {
    flex: 1;
  }
}
</style>