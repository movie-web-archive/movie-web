import { createVideoStateProvider } from "./videoStateProvider";
import { VideoPlayerStateProvider } from "./providerTypes";

export function createWatchPartyStateProvider(
  descriptor: string,
  playerEl: HTMLVideoElement
): VideoPlayerStateProvider {
  const provider = createVideoStateProvider(descriptor, playerEl);

  return {
    getId() {
      return "watchparty";
    },
    play() {
      provider.play();
    },
    pause() {
      provider.pause();
    },
    exitFullscreen() {
      provider.exitFullscreen();
    },
    enterFullscreen() {
      provider.enterFullscreen();
    },
    startAirplay() {
      provider.startAirplay();
    },
    setTime(t) {
      provider.setTime(t);
    },
    setSeeking(active) {
      provider.setSeeking(active);
    },
    setVolume(v) {
      provider.setVolume(v);
    },
    setSource(source) {
      provider.setSource(source);
    },
    setCaption(id, url) {
      provider.setCaption(id, url);
    },
    clearCaption() {
      provider.clearCaption();
    },
    providerStart() {
      const { destroy } = provider.providerStart();
      return {
        destroy: () => {
          destroy();
        },
      };
    },
  };
}
