import { type ReactNode, forwardRef } from "react";

interface MediaGridProps {
  children?: ReactNode;
}

export const MediaGrid = forwardRef<HTMLDivElement, MediaGridProps>(
  (props, ref) => {
    return (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3" ref={ref}>
        {props.children}
      </div>
    );
  }
);
