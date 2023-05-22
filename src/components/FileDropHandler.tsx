import { useEffect, useState } from "react";
import type { DragEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDraggingChange: (isDragging: boolean) => void; // New callback event
}

function FileDropHandler(props: Props) {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setDragging(false);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    props.onDrop(event);
  };

  useEffect(() => {
    props.onDraggingChange(dragging);
  }, [dragging, props]);

  return (
    <section
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {props.children}
    </section>
  );
}

export default FileDropHandler;
