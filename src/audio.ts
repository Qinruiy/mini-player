import { reactive, ref, toRefs } from "vue";

export const useAudio = (src: string) => {
  const audio = ref(new Audio(src));

  const state = reactive({
    duration: 0,
    currentTime: 0,
    paused: true,
    ended: false,
  });

  audio.value.preload = "metadata";

  audio.value.onloadedmetadata = () => {
    state.duration = audio.value.duration;
  };

  audio.value.onchange = () => {
    state.ended = false;
    state.currentTime = 0;
  };

  audio.value.ontimeupdate = () => {
    state.currentTime = audio.value.currentTime;
  };

  audio.value.onpause = () => {
    state.paused = true;
  };

  audio.value.onplay = () => {
    state.paused = false;
  };

  audio.value.onended = () => {
    state.ended = true;
  };

  const play = () => {
    audio.value.play();
  };

  const pause = () => {
    audio.value.pause();
  };

  const setSrc = (source: string) => {
    audio.value.src = source;
  };

  const setCurrentTime = (time: number) => {
    audio.value.currentTime = time;
  };

  return {
    ...toRefs(state),
    play,
    pause,
    setSrc,
    setCurrentTime,
  };
};
