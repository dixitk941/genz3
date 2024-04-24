<template>
<div class="container-fluid p-0">
<b-overlay :show="show" rounded="sm" @shown="onShown" @hidden="onHidden">
<splitpanes class="default-theme" style="height: 100vh;">
  <pane min-size="60" max-size="100" size="75">
    <div class="container-fluid p-0">
    <b-tabs content-class="p-0" style="border: 3px solid">
      <b-tab active>
        <template slot="title">
          WhiteBoard
        </template>

        <b-tabs class="p-0" content-class="p-0" vertical>
        	<b-tab active title="tab">
        		<whiteboard Id="whiteboard"></whiteboard>
        	</b-tab>
	        <b-tab v-for="i in tabs" :key="'dyn-tab-' + i" :title="'Tab ' + i">

	          <whiteboard Id="'whiteboard' + i"></whiteboard>
	        </b-tab>

	        <!-- New Tab Button (Using tabs-end slot) -->
	        <template v-slot:tabs-end>
	          <b-nav-item role="presentation" @click.prevent="newTab" href="#"><b>+</b></b-nav-item>
	        </template>
	      </b-tabs>
 

          
      </b-tab>
      <b-tab style="border: 3px solid">
        <template slot="title">
          <span class="d-sm-block d-none">Student PDF</span>
        </template>
        <div>
          <input v-model.number="page" type="number" style="width: 5em"> /{{numPages}}
          <div style="height:95vh;overflow:auto;">
              <pdf ref="pdf" :src="'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/annotation-link-text-popup.pdf'" :page="page" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event"></pdf>
          </div>
        </div>
      </b-tab>
      <b-tab style="border: 3px solid">
        <template slot="title">
          <span class="d-sm-block d-none">Teacher PDF</span>
        </template>
          <input v-model.number="page" type="number" style="width: 5em"> /{{numPages}}
          <div style="height:95vh;overflow:auto;">
            <pdf ref="pdf" :src="'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/annotation-link-text-popup.pdf'" :page="page" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event"></pdf>
          </div>
      </b-tab>
      <b-tab style="border: 3px solid">
        <template slot="title">
          <span class="d-sm-block d-none">Teacher LR</span>
        </template>
        <div>
          <div style="height:94vh;">
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQHqWZnNqbzh0NUJ9dICtclzUQRai0jd11EuCEacPKsF0ScHeQwz2rjBUJyylCTiMSf_dvQuYXgdtxN/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="100%" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
          </div>
        </div>
      </b-tab>
      <b-tab style="border: 3px solid">
        <template slot="title">
          <span class="d-sm-block d-none">Student LR</span>
        </template>
        <div>
          
          <div style="height:94vh">
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQHqWZnNqbzh0NUJ9dICtclzUQRai0jd11EuCEacPKsF0ScHeQwz2rjBUJyylCTiMSf_dvQuYXgdtxN/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="100%" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
          </div>
        </div>
      </b-tab>
      <b-tab>
        <template slot="title">
          <span class="d-sm-block d-none">Browser</span>
        </template>
        <div>
          <div style="height:95vh;overflow:auto;">
            <iframe src="https://www.bing.com" frameborder="0" width="100%" height="100%" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
          </div>
        </div>
      </b-tab>
      <template v-slot:tabs-end>
          <b-nav-item :disabled="show" v-b-tooltip.hover title="End Session" @click.prevent="show = true"><b class="text-danger">x</b></b-nav-item>
      </template>
    </b-tabs></div>
  </pane>
  <pane size="25">
  <splitpanes horizontal>
    <pane size="30" style="border: 3px solid;">
      <panel title="Video" bodyClass="p-0">
      <div style="height:30vh;overflow:auto;text-align: center;">   
        <!--<vue-webrtc ref="webrtc" width="100%" roomId="sample-room" />-->
      </div> 
      </panel> 
    </pane>
    <pane min-size="70" max-size="70" size="70">
      <b-tabs active-nav-item-class="bg-primary text-white" fill content-class="p-0">
        <b-tab>
        <template slot="title">
        <b>Chat</b>
        </template>
          <chat :name="name" />
        </b-tab>
        <b-tab>
        <template slot="title">
        <b>User</b>
        </template>
          <user />
        </b-tab>
      </b-tabs>
    </pane>
  </splitpanes>
  </pane>
</splitpanes>

  <template v-slot:overlay>
    <div class="text-center">
      <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
      <p id="cancel-label">Please wait...</p>

      <b-button
        ref="Exit"
        variant="outline-primary"
        size="sm"
        @click="$router.push({name: 'Login'})"
        class="mr-3"
      >
        Confirm
      </b-button>
      <b-button
        ref="cancel"
        variant="outline-danger"
        size="sm"
        aria-describedby="cancel-label"
        @click="show = false"
      >
        Cancel
      </b-button>
    </div>
  </template>
</b-overlay>
</div>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes"
import 'splitpanes/dist/splitpanes.css'
import Whiteboard from "@/components/WhiteBoard.vue";
import chat from "./chat.vue";
import pdf from 'vue-pdf'
import user from './user.vue'

import WebRTC from 'vue-webrtc'
import * as io from 'socket.io-client'
window.io = io

export default {
  props: ['name'],
  components: {
    Splitpanes,
    Pane,
    whiteboard: Whiteboard,
    chat,
    pdf: pdf,
    user
  },
  data () {
      return {
          page: 1,
          numPages: 0,
          show:false,
          tabs: [],
          tabCounter: 0
      }
  },
  methods: {
      error: function(err) {

          console.log(err);
      },
      onShown() {
        // Focus the cancel button when the overlay is showing
        this.$refs.cancel.focus()
      },
      onHidden() {
        // Focus the show button when the overlay is removed
        this.$refs.show.focus()
      },
      closeTab(x) {
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i] === x) {
            this.tabs.splice(i, 1)
          }
        }
      },
      newTab() {
        this.tabs.push(this.tabCounter++)
      }
  },
  mounted: function () {
    this.$refs.webrtc.join()
  }
};
</script>

<style>
.splitpanes__pane {
  position: relative;
}
.h {
  height:30vh;
}


</style>
