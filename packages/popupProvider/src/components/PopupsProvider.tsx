import React, { useCallback, useEffect, useRef } from "react";
import {
  applyNewPosition,
  calculateNewPosition,
  cleanupResizeObserver,
  getPopupElement,
  observeContainerResize,
} from "../utils/utils";
import { usePopups } from "../hooks/usePopups";
import { IPopupsProviderProps } from "../interfaces/PopupProviderInterface";
import { Popup } from "./Popup";

export const PopupsProvider: React.FC<IPopupsProviderProps> = ({
  children,
}) => {
  const { popups, closePopup } = usePopups();
  const containerRef = useRef<HTMLDivElement>(null);

  const AdjustPopupsPosition = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { clientWidth, clientHeight } = container;

    popups.forEach((popup) => {
      const popupElement = getPopupElement(popup.id);
      if (popupElement) {
        const newPosition = calculateNewPosition(
          popupElement,
          clientWidth,
          clientHeight
        );
        applyNewPosition(popupElement, newPosition);
      }
    });
  }, [popups]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const resizeObserver = new ResizeObserver(AdjustPopupsPosition);
      observeContainerResize(resizeObserver, container);

      return () => {
        cleanupResizeObserver(resizeObserver);
      };
    }
    return () => {};
  }, [AdjustPopupsPosition]);

  return (
    <div ref={containerRef} style={{ height: "85vh" }} className="container-popups-provider">
      {children}
      {popups.map((popup) => (
        <Popup
          key={popup.id}
          id={popup.id}
          title={popup.title}
          contentComponent={popup.contentComponent}
          initialPosition={popup.defaultPosition}
          onClose={() => closePopup(popup.id)}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
};
