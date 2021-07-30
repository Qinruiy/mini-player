import { reactive, ref, toRefs } from "@vue/runtime-core";

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

  return {
    ...toRefs(state),
    audio,
  };
};
