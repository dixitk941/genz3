<template>
<div class="relative">


      <canvas id="" :id="Id" resize v-bind:style="{backgroundImage: `url(${bgImg})` , background: bgColor }"></canvas>


    <mainPanel></mainPanel>
    <historyPanel></historyPanel>
    <bgPanel></bgPanel>
  
    
</div>
</template>

<script>

import paper from "paper";
import MainPanel from "./panel/MainPanel";
import HistoryPanel from "./panel/HistoryPanel";
import bgPanel from "./panel/bgPanel";

export default {
  props: [
    'Id'
  ],
  components: {
    mainPanel: MainPanel,
    historyPanel: HistoryPanel,
    bgPanel,
  },

  created() {
    paper.install(window);
  },
  mounted() {
    paper.setup(this.Id);
  },
  computed: {
    bgColor: function() {
      return this.$store.getters.bgArgs.color;
    },
    bgImg: function() {
      return this.$store.getters.bgArgs.img;
    },
  },
  
};
</script>

<style lang="scss">
canvas {
  height: 94vh;
  width: 100%;
}





div.relative {
  position: relative;
}

</style>