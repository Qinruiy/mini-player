<template>
  <div id="app">
    <MINIPlayer
      v-bind:tracks="[
        {
          name: 'Mekanın Sahibi',
          artist: 'Norm Ender',
          cover:
            'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg',
          source:
            'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3',
          url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
        },
        {
          name: 'Everybody Knows',
          artist: 'Leonard Cohen',
          cover:
            'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg',
          source:
            'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3',
          url: 'https://www.youtube.com/watch?v=Lin-a2lTelg',
        },
      ]"
    ></MINIPlayer>
  </div>
</template>

<script>
import MINIPlayer from "./components/index.js";

export default {
  name: "App",
  components: {
    MINIPlayer,
  },
};
</script>
