import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { registerVideoPlayer, unregisterVideoPlayer } from "./init";

const VideoPlayerContext = createContext<string>("");

export function VideoPlayerContextProvider(props: { children: ReactNode }) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const vidId = registerVideoPlayer();
    setId(vidId);

    return () => {
      // delay unregistering to allow for state providers to destroy first
      setTimeout(() => {
        unregisterVideoPlayer(vidId);
      }, 1000);
    };
  }, [setId]);

  if (!id) return null;

  return (
    <VideoPlayerContext.Provider value={id}>
      {props.children}
    </VideoPlayerContext.Provider>
  );
}

export function useVideoPlayerDescriptor(): string {
  const id = useContext(VideoPlayerContext);
  return id;
}
