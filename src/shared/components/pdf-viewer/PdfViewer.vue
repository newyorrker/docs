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
    <div class="pdf-viewer__container">
      <vue-pdf-app v-if="blobUrl" class="pdf-viewer__app"
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
import { FileDataLoaderInterface } from "@/types/FileDataLoaderInterface";

@Component({ components: { VuePdfApp }})

export default class PadViewer extends Vue {

  @Prop({required: true}) id: string;
  @Prop({required: true}) name: string;
  @Prop({ required: true}) fileDataLoader: FileDataLoaderInterface;

  idConfig = {
    zoomIn: "vuePdfAppZoomIn",
    zoomOut: "vuePdfAppZoomOut",
  }

  blobUrl: string = "";
  filebase64String: string = "";

  async mounted() {

    try {
      const data = await this.fileDataLoader.load(this.id);
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
  user-select: text;

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