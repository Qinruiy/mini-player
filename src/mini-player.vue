<template>
  <div class="player">
    <div class="player__top">
      <div class="player-cover">
        <transition-group
          :name="transitionName"
          v-for="(track, index) in tracks"
          :key="index"
        >
          <div
            v-if="index === currentTrackIndex"
            class="player-cover__item"
            :style="{ backgroundImage: `url(${track.cover})` }"
          ></div>
        </transition-group>
      </div>
      <div class="player-controls">
        <a
          :href="currentTrack.url"
          target="_blank"
          class="player-controls__item"
        >
          <svg class="icon">
            <use xlink:href="#icon-link"></use>
          </svg>
        </a>
        <div class="player-controls__item" @click="prevTrack">
          <svg class="icon">
            <use xlink:href="#icon-prev"></use>
          </svg>
        </div>
        <div class="player-controls__item" @click="nextTrack">
          <svg class="icon">
            <use xlink:href="#icon-next"></use>
          </svg>
        </div>
        <div class="player-controls__item -xl js-play" @click="playAction">
          <svg class="icon">
            <use xlink:href="#icon-play" v-if="paused"></use>
            <use xlink:href="#icon-pause" v-else></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="progress" ref="progress">
      <div class="progress__top">
        <div class="album-info" v-if="currentTrack">
          <div class="album-info__name">{{ currentTrack.artist }}</div>
          <div class="album-info__track">
            {{ currentTrack.name }}
          </div>
        </div>
        <div class="progress__duration">{{ durationText }}</div>
      </div>
      <div class="progress__bar" @click="clickProgress">
        <div class="progress__current" :style="{ width: barWidth }"></div>
      </div>
      <div class="progress__time">{{ currentTimeText }}</div>
    </div>
    <div v-show="false">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        hidden
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <symbol id="icon-pause" viewBox="0 0 32 32">
            <title>icon-pause</title>
            <path
              d="M16 0.32c-8.64 0-15.68 7.040-15.68 15.68s7.040 15.68 15.68 15.68 15.68-7.040 15.68-15.68-7.040-15.68-15.68-15.68zM16 29.216c-7.296 0-13.216-5.92-13.216-13.216s5.92-13.216 13.216-13.216 13.216 5.92 13.216 13.216-5.92 13.216-13.216 13.216z"
            ></path>
            <path
              d="M16 32c-8.832 0-16-7.168-16-16s7.168-16 16-16 16 7.168 16 16-7.168 16-16 16zM16 0.672c-8.448 0-15.328 6.88-15.328 15.328s6.88 15.328 15.328 15.328c8.448 0 15.328-6.88 15.328-15.328s-6.88-15.328-15.328-15.328zM16 29.568c-7.488 0-13.568-6.080-13.568-13.568s6.080-13.568 13.568-13.568c7.488 0 13.568 6.080 13.568 13.568s-6.080 13.568-13.568 13.568zM16 3.104c-7.104 0-12.896 5.792-12.896 12.896s5.792 12.896 12.896 12.896c7.104 0 12.896-5.792 12.896-12.896s-5.792-12.896-12.896-12.896z"
            ></path>
            <path
              d="M12.16 22.336v0c-0.896 0-1.6-0.704-1.6-1.6v-9.472c0-0.896 0.704-1.6 1.6-1.6v0c0.896 0 1.6 0.704 1.6 1.6v9.504c0 0.864-0.704 1.568-1.6 1.568z"
            ></path>
            <path
              d="M19.84 22.336v0c-0.896 0-1.6-0.704-1.6-1.6v-9.472c0-0.896 0.704-1.6 1.6-1.6v0c0.896 0 1.6 0.704 1.6 1.6v9.504c0 0.864-0.704 1.568-1.6 1.568z"
            ></path>
          </symbol>
          <symbol id="icon-play" viewBox="0 0 32 32">
            <title>icon-play</title>
            <path
              d="M21.216 15.168l-7.616-5.088c-0.672-0.416-1.504 0.032-1.504 0.832v10.176c0 0.8 0.896 1.248 1.504 0.832l7.616-5.088c0.576-0.416 0.576-1.248 0-1.664z"
            ></path>
            <path
              d="M13.056 22.4c-0.224 0-0.416-0.064-0.608-0.16-0.448-0.224-0.704-0.672-0.704-1.152v-10.176c0-0.48 0.256-0.928 0.672-1.152s0.928-0.224 1.344 0.064l7.616 5.088c0.384 0.256 0.608 0.672 0.608 1.088s-0.224 0.864-0.608 1.088l-7.616 5.088c-0.192 0.16-0.448 0.224-0.704 0.224zM13.056 10.272c-0.096 0-0.224 0.032-0.32 0.064-0.224 0.128-0.352 0.32-0.352 0.576v10.176c0 0.256 0.128 0.48 0.352 0.576 0.224 0.128 0.448 0.096 0.64-0.032l7.616-5.088c0.192-0.128 0.288-0.32 0.288-0.544s-0.096-0.416-0.288-0.544l-7.584-5.088c-0.096-0.064-0.224-0.096-0.352-0.096z"
            ></path>
            <path
              d="M16 0.32c-8.64 0-15.68 7.040-15.68 15.68s7.040 15.68 15.68 15.68 15.68-7.040 15.68-15.68-7.040-15.68-15.68-15.68zM16 29.216c-7.296 0-13.216-5.92-13.216-13.216s5.92-13.216 13.216-13.216 13.216 5.92 13.216 13.216-5.92 13.216-13.216 13.216z"
            ></path>
            <path
              d="M16 32c-8.832 0-16-7.168-16-16s7.168-16 16-16 16 7.168 16 16-7.168 16-16 16zM16 0.672c-8.448 0-15.328 6.88-15.328 15.328s6.88 15.328 15.328 15.328c8.448 0 15.328-6.88 15.328-15.328s-6.88-15.328-15.328-15.328zM16 29.568c-7.488 0-13.568-6.080-13.568-13.568s6.080-13.568 13.568-13.568c7.488 0 13.568 6.080 13.568 13.568s-6.080 13.568-13.568 13.568zM16 3.104c-7.104 0-12.896 5.792-12.896 12.896s5.792 12.896 12.896 12.896c7.104 0 12.896-5.792 12.896-12.896s-5.792-12.896-12.896-12.896z"
            ></path>
          </symbol>
          <symbol id="icon-link" viewBox="0 0 32 32">
            <title>link</title>
            <path
              d="M23.584 17.92c0 0.864 0 1.728 0 2.56 0 1.312 0 2.656 0 3.968 0 0.352 0.032 0.736-0.032 1.12 0.032-0.16 0.032-0.288 0.064-0.448-0.032 0.224-0.096 0.448-0.16 0.64 0.064-0.128 0.128-0.256 0.16-0.416-0.096 0.192-0.192 0.384-0.32 0.576 0.096-0.128 0.16-0.224 0.256-0.352-0.128 0.16-0.288 0.32-0.48 0.48 0.128-0.096 0.224-0.16 0.352-0.256-0.192 0.128-0.352 0.256-0.576 0.32 0.128-0.064 0.256-0.128 0.416-0.16-0.224 0.096-0.416 0.16-0.64 0.16 0.16-0.032 0.288-0.032 0.448-0.064-0.256 0.032-0.512 0.032-0.768 0.032-0.448 0-0.896 0-1.312 0-1.472 0-2.976 0-4.448 0-1.824 0-3.616 0-5.44 0-1.568 0-3.104 0-4.672 0-0.736 0-1.44 0-2.176 0-0.128 0-0.224 0-0.352-0.032 0.16 0.032 0.288 0.032 0.448 0.064-0.224-0.032-0.448-0.096-0.64-0.16 0.128 0.064 0.256 0.128 0.416 0.16-0.192-0.096-0.384-0.192-0.576-0.32 0.128 0.096 0.224 0.16 0.352 0.256-0.16-0.128-0.32-0.288-0.48-0.48 0.096 0.128 0.16 0.224 0.256 0.352-0.128-0.192-0.256-0.352-0.32-0.576 0.064 0.128 0.128 0.256 0.16 0.416-0.096-0.224-0.16-0.416-0.16-0.64 0.032 0.16 0.032 0.288 0.064 0.448-0.032-0.256-0.032-0.512-0.032-0.768 0-0.448 0-0.896 0-1.312 0-1.472 0-2.976 0-4.448 0-1.824 0-3.616 0-5.44 0-1.568 0-3.104 0-4.672 0-0.736 0-1.44 0-2.176 0-0.128 0-0.224 0.032-0.352-0.032 0.16-0.032 0.288-0.064 0.448 0.032-0.224 0.096-0.448 0.16-0.64-0.064 0.128-0.128 0.256-0.16 0.416 0.096-0.192 0.192-0.384 0.32-0.576-0.096 0.128-0.16 0.224-0.256 0.352 0.128-0.16 0.288-0.32 0.48-0.48-0.128 0.096-0.224 0.16-0.352 0.256 0.192-0.128 0.352-0.256 0.576-0.32-0.128 0.064-0.256 0.128-0.416 0.16 0.224-0.096 0.416-0.16 0.64-0.16-0.16 0.032-0.288 0.032-0.448 0.064 0.48-0.064 0.96-0.032 1.44-0.032 0.992 0 1.952 0 2.944 0 1.216 0 2.432 0 3.616 0 1.056 0 2.112 0 3.168 0 0.512 0 1.024 0 1.536 0 0 0 0 0 0.032 0 0.448 0 0.896-0.192 1.184-0.48s0.512-0.768 0.48-1.184c-0.032-0.448-0.16-0.896-0.48-1.184s-0.736-0.48-1.184-0.48c-0.64 0-1.28 0-1.92 0-1.408 0-2.816 0-4.224 0-1.44 0-2.848 0-4.256 0-0.672 0-1.344 0-2.016 0-0.736 0-1.472 0.192-2.112 0.576s-1.216 0.96-1.568 1.6c-0.384 0.64-0.544 1.376-0.544 2.144 0 0.672 0 1.376 0 2.048 0 1.28 0 2.56 0 3.84 0 1.504 0 3.040 0 4.544 0 1.408 0 2.848 0 4.256 0 0.992 0 1.952 0 2.944 0 0.224 0 0.448 0 0.64 0 0.864 0.224 1.76 0.768 2.464 0.16 0.192 0.288 0.384 0.48 0.576s0.384 0.352 0.608 0.512c0.32 0.224 0.64 0.384 1.024 0.512 0.448 0.16 0.928 0.224 1.408 0.224 0.16 0 0.32 0 0.48 0 0.896 0 1.792 0 2.72 0 1.376 0 2.784 0 4.16 0 1.536 0 3.040 0 4.576 0 1.312 0 2.656 0 3.968 0 0.768 0 1.536 0 2.336 0 0.416 0 0.832-0.032 1.248-0.128 1.504-0.32 2.784-1.6 3.104-3.104 0.128-0.544 0.128-1.056 0.128-1.568 0-0.608 0-1.184 0-1.792 0-1.408 0-2.816 0-4.224 0-0.256 0-0.512 0-0.768 0-0.448-0.192-0.896-0.48-1.184s-0.768-0.512-1.184-0.48c-0.448 0.032-0.896 0.16-1.184 0.48-0.384 0.384-0.576 0.768-0.576 1.248v0z"
            ></path>
            <path
              d="M32 11.232c0-0.8 0-1.568 0-2.368 0-1.248 0-2.528 0-3.776 0-0.288 0-0.576 0-0.864 0-0.896-0.768-1.696-1.696-1.696-0.8 0-1.568 0-2.368 0-1.248 0-2.528 0-3.776 0-0.288 0-0.576 0-0.864 0-0.448 0-0.896 0.192-1.184 0.48s-0.512 0.768-0.48 1.184c0.032 0.448 0.16 0.896 0.48 1.184s0.736 0.48 1.184 0.48c0.8 0 1.568 0 2.368 0 1.248 0 2.528 0 3.776 0 0.288 0 0.576 0 0.864 0-0.576-0.576-1.12-1.12-1.696-1.696 0 0.8 0 1.568 0 2.368 0 1.248 0 2.528 0 3.776 0 0.288 0 0.576 0 0.864 0 0.448 0.192 0.896 0.48 1.184s0.768 0.512 1.184 0.48c0.448-0.032 0.896-0.16 1.184-0.48 0.352-0.256 0.544-0.64 0.544-1.12v0z"
            ></path>
            <path
              d="M15.040 21.888c0.16-0.16 0.288-0.288 0.448-0.448 0.384-0.384 0.8-0.8 1.184-1.184 0.608-0.608 1.184-1.184 1.792-1.792 0.704-0.704 1.44-1.44 2.176-2.176 0.8-0.8 1.568-1.568 2.368-2.368s1.6-1.6 2.4-2.4c0.736-0.736 1.504-1.504 2.24-2.24 0.64-0.64 1.248-1.248 1.888-1.888 0.448-0.448 0.896-0.896 1.344-1.344 0.224-0.224 0.448-0.416 0.64-0.64 0 0 0.032-0.032 0.032-0.032 0.32-0.32 0.48-0.768 0.48-1.184s-0.192-0.896-0.48-1.184c-0.32-0.288-0.736-0.512-1.184-0.48-0.512 0.032-0.928 0.16-1.248 0.48-0.16 0.16-0.288 0.288-0.448 0.448-0.384 0.384-0.8 0.8-1.184 1.184-0.608 0.608-1.184 1.184-1.792 1.792-0.704 0.704-1.44 1.44-2.176 2.176-0.8 0.8-1.568 1.568-2.368 2.368s-1.6 1.6-2.4 2.4c-0.736 0.736-1.504 1.504-2.24 2.24-0.64 0.64-1.248 1.248-1.888 1.888-0.448 0.448-0.896 0.896-1.344 1.344-0.224 0.224-0.448 0.416-0.64 0.64 0 0-0.032 0.032-0.032 0.032-0.32 0.32-0.48 0.768-0.48 1.184s0.192 0.896 0.48 1.184c0.32 0.288 0.736 0.512 1.184 0.48 0.48 0 0.928-0.16 1.248-0.48v0z"
            ></path>
          </symbol>
          <symbol id="icon-next" viewBox="0 0 32 32">
            <title>next</title>
            <path
              d="M2.304 18.304h14.688l-4.608 4.576c-0.864 0.864-0.864 2.336 0 3.232 0.864 0.864 2.336 0.864 3.232 0l8.448-8.48c0.864-0.864 0.864-2.336 0-3.232l-8.448-8.448c-0.448-0.448-1.056-0.672-1.632-0.672s-1.184 0.224-1.632 0.672c-0.864 0.864-0.864 2.336 0 3.232l4.64 4.576h-14.688c-1.248 0-2.304 0.992-2.304 2.272s1.024 2.272 2.304 2.272z"
            ></path>
            <path
              d="M29.696 26.752c1.248 0 2.304-1.024 2.304-2.304v-16.928c0-1.248-1.024-2.304-2.304-2.304s-2.304 1.024-2.304 2.304v16.928c0.064 1.28 1.056 2.304 2.304 2.304z"
            ></path>
          </symbol>
          <symbol id="icon-prev" viewBox="0 0 32 32">
            <title>prev</title>
            <path
              d="M29.696 13.696h-14.688l4.576-4.576c0.864-0.864 0.864-2.336 0-3.232-0.864-0.864-2.336-0.864-3.232 0l-8.448 8.48c-0.864 0.864-0.864 2.336 0 3.232l8.448 8.448c0.448 0.448 1.056 0.672 1.632 0.672s1.184-0.224 1.632-0.672c0.864-0.864 0.864-2.336 0-3.232l-4.608-4.576h14.688c1.248 0 2.304-1.024 2.304-2.304s-1.024-2.24-2.304-2.24z"
            ></path>
            <path
              d="M2.304 5.248c-1.248 0-2.304 1.024-2.304 2.304v16.928c0 1.248 1.024 2.304 2.304 2.304s2.304-1.024 2.304-2.304v-16.928c-0.064-1.28-1.056-2.304-2.304-2.304z"
            ></path>
          </symbol>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  watch,
  toRefs,
  nextTick,
} from "vue";
import { useAudio } from "./audio";

export type Track = {
  name: string;
  artist: string;
  cover: string;
  source: string;
  url: string;
};

export default defineComponent({
  name: "mini-player",
  props: {
    tracks: {
      type: Array as PropType<Track[]>,
      required: true,
    },
  },
  setup(props) {
    const progress = ref(null as HTMLDivElement | null);

    const state = reactive({
      currentTrackIndex: 0,
      transitionName: "",
    });

    const currentTrack = computed(() => {
      return props.tracks[state.currentTrackIndex];
    });

    const { duration, currentTime, paused, ended, audio } = useAudio(
      currentTrack.value.source
    );

    //watch
    watch(
      () => state.currentTrackIndex,
      () => {
        audio.value.src = currentTrack.value.source;
      }
    );

    watch(ended, () => {
      if (ended.value) {
        nextTrack();
      }
    });

    // display
    const durationText = computed(() => {
      if (!isNaN(duration.value)) {
        const durmin = Math.floor(duration.value / 60);
        const dursec = Math.floor(duration.value - durmin * 60);
        return prefixInteger(durmin) + ":" + prefixInteger(dursec);
      } else {
        return "loading";
      }
    });

    const currentTimeText = computed(() => {
      const curmin = Math.floor(currentTime.value / 60);
      const cursec = Math.floor(currentTime.value - curmin * 60);
      return prefixInteger(curmin) + ":" + prefixInteger(cursec);
    });

    const barWidth = computed(() => {
      return (100 / duration.value) * currentTime.value + "%";
    });

    const prefixInteger = (number: number) => {
      return number.toString().padStart(2, "0");
    };

    // actions
    const prevTrack = () => {
      state.transitionName = "scale-in";
      if (state.currentTrackIndex > 0) {
        state.currentTrackIndex--;
      } else {
        state.currentTrackIndex = props.tracks.length - 1;
      }
      nextTick(() => {
        audio.value.play();
      });
    };

    const nextTrack = () => {
      state.transitionName = "scale-out";
      if (state.currentTrackIndex < props.tracks.length - 1) {
        state.currentTrackIndex++;
      } else {
        state.currentTrackIndex = 0;
      }
      nextTick(() => {
        audio.value.play();
      });
    };

    const playAction = () => {
      if (paused.value) {
        audio.value.play();
      } else {
        audio.value.pause();
      }
    };

    const clickProgress = (e: MouseEvent) => {
      audio.value.pause();
      const position = e.pageX - (progress.value?.offsetLeft || 0);
      const width = progress.value?.offsetWidth || 0;
      let percentage = (100 * position) / width;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      audio.value.currentTime = (duration.value * percentage) / 100;
      audio.value.play();
    };

    return {
      progress,
      durationText,
      currentTimeText,
      barWidth,
      currentTrack,
      prevTrack,
      nextTrack,
      playAction,
      clickProgress,
      paused,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped src="./mini-player.css"></style>
