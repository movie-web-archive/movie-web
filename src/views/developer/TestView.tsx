// simple empty view, perfect for putting in tests
import { WideContainer } from "@/components/layout/WideContainer";
import { useIsMobile } from "@/hooks/useIsMobile";
import { VideoPlayer } from "@/video/components/VideoPlayer";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useWatchParty } from "@/video/state/logic/watchparty";
import { useRef, useState } from "react";

interface ChatProps {
  peerCount?: number;
}

export function Chat(props: ChatProps) {
  // const descriptor = useVideoPlayerDescriptor();
  // const { isHost, isInParty, peers } = useWatchParty(descriptor);
  const { isMobile } = useIsMobile();
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  // if (!isInParty || isMobile) return null;
  return (
    <div className="float-right mt-24 flex h-[70vh] max-w-fit flex-col justify-between rounded bg-violet-700 px-4 py-2 opacity-50 hover:opacity-100 sm:w-1/3">
      <div className="flex-col space-y-2">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="text-sm font-bold text-white">Chat</div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium">{props.peerCount}</div>
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {messages.map((_, i) => (
            <div className="flex w-auto flex-row items-center rounded bg-white p-1">
              <div className="ml-2 flex flex-col text-sm">{messages[i]}</div>
            </div>
          ))}
        </div>
      </div>
      <input
        className="rounded p-1 text-sm"
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter" && message !== "") {
            setMessages((old) => [...old, message]);
            setMessage("");
          }
        }}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        maxLength={100}
        value={message}
        placeholder="Type something"
      />
    </div>
  );
}

export default function TestView() {
  return (
    <div>
      <Chat />
    </div>
  );
}
