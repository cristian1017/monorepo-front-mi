import React, { useRef } from "react";
import { IPopupProps, IPositionInterface } from "../interfaces/PopupInterface";
import {
  isMovedPopup,
  modifyZIndex,
  updateElementPosition,
} from "../utils/utils";

export const Popup: React.FC<IPopupProps> = React.memo(
  ({ id, title, contentComponent, initialPosition, onClose, containerRef }) => {
    console.log(`Rendering popup with id: ${id}`);
    const positionRef = useRef<IPositionInterface>(initialPosition);
    const startPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const isDraggingRef = useRef<boolean>(false);

    const handleClick = () => {
      modifyZIndex(id);
    };

    const handleMouseDown = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      if (isMovedPopup(e, startPositionRef)) {
        modifyZIndex(id);
        isDraggingRef.current = true;
        startPositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseMove = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      e.preventDefault();
      if (isDraggingRef.current && isMovedPopup(e, startPositionRef)) {
        const { newLeft, newTop } = updateElementPosition(
          e,
          positionRef,
          containerRef
        );
        // Aplicar la nueva posición directamente en el estilo
        const popupElement = e.currentTarget as HTMLElement;
        popupElement.style.left = `${newLeft}px`;
        popupElement.style.top = `${newTop}px`;
        popupElement.style.bottom = `${newTop}px`;
        popupElement.style.right = `${newLeft}px`;
        popupElement.style.boxShadow = "#28A745 0px 5px 15px";
      }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      isDraggingRef.current = false;
      e.currentTarget.style.backgroundColor = "#fff";
      e.currentTarget.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
    };

    return (
      <div
        id={`popup-${id}`}
        style={{
          position: "absolute",
          left: positionRef.current.left,
          top: positionRef.current.top,
          width: positionRef.current.width,
          height: positionRef.current.height,
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        className="container-popup"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            cursor: "move",
            padding: "10px 20px",
          }}
          onMouseDown={(e) => {
            handleMouseDown(e);
          }}
        >
          <span style={{ fontWeight: "bold" }}>{title}</span>
          <button
            onClick={onClose}
            style={{
              cursor: "pointer",
              border: "none",
              background: "red",
              borderRadius: "50%",
              color: "white",
            }}
          >
            X
          </button>
        </div>
        <div style={{ padding: "20px" }}>{contentComponent}</div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Condición personalizada para determinar si se debe re-renderizar el componente
    return (
      prevProps.id === nextProps.id && // Verifica si el id no ha cambiado
      prevProps.title === nextProps.title && // Verifica si el título no ha cambiado
      prevProps.initialPosition.left === nextProps.initialPosition.left && // Verifica si la posición izquierda no ha cambiado
      prevProps.initialPosition.top === nextProps.initialPosition.top // Verifica si la posición superior no ha cambiado
    );
  }
);
