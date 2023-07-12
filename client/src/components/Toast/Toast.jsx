import { useEffect } from "react";
import { IoCloseCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import "./Toast.scss";

export const DEFAULT_TOAST_DURATION = 5000;

export function Toast({ content, onDismiss, duration }) {
  useEffect(() => {
    let timeoutDuration = duration || DEFAULT_TOAST_DURATION;

    const timer = setTimeout(onDismiss, timeoutDuration);

    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  const dismissMarkup = (
    <button
      type="button"
      onClick={onDismiss}
      className="CloseButton"
      aria-label="Close"
    >
      <IoCloseCircleOutline />
    </button>
  );

  const leadingIconMarkup = (
    <div className="LeadingIcon">
      <IoAlertCircleOutline />
    </div>
  );

  return (
    <div className="Toast">
      {leadingIconMarkup}
      <div className="Content">
        {content}
        {dismissMarkup}
      </div>
    </div>
  );
}
