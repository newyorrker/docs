<template>
  <div>
    <br>
    <div>
      <a href="../../../../public/res.pdf" target="_blank" download>dowload</a>
    </div>

    <br>
    <br>

    <div class="container">
      <div style="height: 90%">
        <div class="action-bar">
          <button :id="idConfig.zoomIn" type="button" class="action-btn" title="Zoom in">Zoom in</button>
          <br>
          <br>
          <button :id="idConfig.zoomOut" type="button" class="action-btn" title="Zoom out">Zoom out</button>
          <br>
          <br>
          <br>

          <button
            :id="idConfig.download"
            class="action-btn"
            type="button"
            title="Download"
          >
            dowload by the lib
          </button>
        </div>
        <vue-pdf-app v-if="buffer"
          :pdf="buffer"
          :config="{ toolbar: false, sidebar: false, presentationMode: true, }"
          :id-config="idConfig"
          style="position: relative"
        >

        </vue-pdf-app>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import VuePdfApp from "vue-pdf-app";

// import "@mdi/font/css/materialdesignicons.css";

@Component({ components: { VuePdfApp }})

export default class PadViewer extends Vue {

  idConfig = {
    download: "vuePdfAppDownload",
    zoomIn: "vuePdfAppZoomIn",
    zoomOut: "vuePdfAppZoomOut",
  }

  pdf = "./res.pdf";

  buffer = null;


  async mounted() {
    this.buffer = await this.$hrLinkRepository.getDocumentFile("7490d73b-e1d8-4c4a-8b9a-2f54e8c2aecd");
  }

}

</script>
<style lang="scss">

#viewerContainer {
  left: 0 !important;
}

.container {
  height: 95vh;
}

.viewer-header {
  margin-top: 10px;
  position: relative;
  z-index: 9999;
}

.viewer-prepend {
  position: absolute;
  z-index: 99999;
  right: 20px;
  bottom: 0;
  top: 40px;
  width: 80px;
}

.viewer-header .action-btn,
.viewer-prepend .action-btn,
.viewer-footer .action-btn {
  background: white;
  opacity: 0.8;
}

.viewer-footer {
  position: absolute;
  bottom: 3px;
  right: 0;
  left: 0;
}

.action-btn {
  background: transparent;
  padding: 0px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: black;
  border: none;
  outline: none;

  &[disabled] {
    cursor: default;
    background: gray;
  }
  & > span {
    font-size: 28px;
  }
}

.action-bar {
  margin-bottom: 5px;
}

.divider,
.v-divider {
  padding: 3px;
}

.v-divider {
  display: block;
}

.vue-pdf-app-findbar {
  display: inline-block;
  background: white;
  opacity: 0.8;
  padding: 0 3px;
  border-radius: 3px;
}
</style>