import { useCallback, useEffect, useRef, useState } from "react";
import "./Collapsible.scss";

export default function Collapsible({
  id,
  expandOnPrint,
  open,
  transition,
  children,
  onAnimationEnd,
}) {
  const [height, setHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(open);
  const [animatonState, setAnimationState] = useState("idle");
  const collapsibleContainer = useRef(null);

  const isFullyOpen = animatonState === "idle" && open && isOpen;
  const isFullyClosed = animatonState === "idle" && !open && !isOpen;
  const content = expandOnPrint || !isFullyClosed ? children : null;

  const wrapperClassName = classNames(
    "Collapsible",
    isFullyClosed && "isFullyClosed",
    expandOnPrint && "expandOnPrint"
  );

  const transitionDisabled = isTransitionDisabled(transition);

  const transitionStyles =
    typeof transition === "object" && transition.duration
      ? {
          transitionDuration: transition.duration,
          transitionTimingFunction: transition.timingFunction,
        }
      : {};

  const collapsibleStyles = {
    ...transitionStyles,
    ...{
      maxHeight: isFullyOpen ? "none" : `${height}px`,
      overflow: isFullyOpen ? "visible" : "hidden",
    },
  };

  const handleCompleteAnimation = useCallback(
    ({ target }) => {
      if (target === collapsibleContainer.current) {
        setAnimationState("idle");
        setIsOpen(open);
        onAnimationEnd && onAnimationEnd();
      }
    },
    [onAnimationEnd, open]
  );

  const startAnimation = useCallback(() => {
    if (transitionDisabled) {
      setIsOpen(open);
      setAnimationState("idle");

      if (open && collapsibleContainer.current) {
        setHeight(collapsibleContainer.current.scrollHeight);
      } else {
        setHeight(0);
      }
    } else {
      setAnimationState("measuring");
    }
  }, [open, transitionDisabled]);

  useEffect(() => {
    if (open !== isOpen) {
      startAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isOpen]);

  useEffect(() => {
    if (!open || !collapsibleContainer.current) return;
    // If collapsible defaults to open, set an initial height
    setHeight(collapsibleContainer.current.scrollHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!collapsibleContainer.current) return;

    // eslint-disable-next-line default-case
    switch (animatonState) {
      case "idle":
        break;
      case "measuring":
        setHeight(collapsibleContainer.current.scrollHeight);
        setAnimationState("animating");
        break;
      case "animating":
        setHeight(open ? collapsibleContainer.current.scrollHeight : 0);
    }
  }, [animatonState, open, isOpen]);

  return (
    <div
      id={id}
      ref={collapsibleContainer}
      style={collapsibleStyles}
      className={wrapperClassName}
      onTransitionEnd={handleCompleteAnimation}
      aria-hidden={!isOpen}
    >
      {content}
    </div>
  );
}

const zeroDurationRegex = /^0(ms|s)$/;

function isTransitionDisabled(transitionProp) {
  if (typeof transitionProp === "boolean") {
    return !transitionProp;
  }

  const { duration } = transitionProp;
  if (duration && zeroDurationRegex.test(duration.trim())) {
    return true;
  }
  return false;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
