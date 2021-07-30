<template>
  <div class="App">
    <mini-player :tracks="tracks"></mini-player>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MiniPlayer, { Track } from "./mini-player.vue";

export default defineComponent({
  components: {
    MiniPlayer,
  },
  setup() {
    const tracks: Track[] = [
      {
        name: "Mekanın Sahibi",
        artist: "Norm Ender",
        cover:
          "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
        source:
          "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
        url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
      },
      {
        name: "Everybody Knows",
        artist: "Leonard Cohen",
        cover:
          "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
        source:
          "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
        url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
      },
    ];

    return {
      tracks,
    };
  },
});
</script>

<style scoped>
.App {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
