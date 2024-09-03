import { IPositionInterface } from "../interfaces/PopupInterface";

/**
 * Devuelve el elemento HTML del popup con el id especificado.
 * @param {string} id - El id del popup.
 * @returns {HTMLElement | null} El elemento HTML del popup, o null si no existe.
 */
export const getPopupElement = (id: string): HTMLElement | null => {
  return document.getElementById(`popup-${id}`);
};

/**
 * Calcula la nueva posición del popup para que no se salga del contenedor.
 * @param {HTMLElement} popupElement - Elemento DOM del popup.
 * @param {number} containerWidth - Ancho del contenedor.
 * @param {number} containerHeight - Alto del contenedor.
 * @returns {{left: number; top: number}} - La nueva posición del popup.
 */
export const calculateNewPosition = (
  popupElement: HTMLElement,
  containerWidth: number,
  containerHeight: number
): { left: number; top: number } => {
  const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = popupElement;
  let newLeft = offsetLeft;
  let newTop = offsetTop;

  newLeft = Math.min(newLeft, containerWidth - offsetWidth);
  newTop = Math.min(newTop, containerHeight - offsetHeight);

  newLeft = Math.max(newLeft, 0);
  newTop = Math.max(newTop, 0);

  return { left: newLeft, top: newTop };
};

/**
 * Aplica la nueva posición al popup.
 * @param {HTMLElement} popupElement - Elemento DOM del popup.
 * @param {{left: number; top: number}} position - La nueva posición del popup.
 */
export const applyNewPosition = (
  popupElement: HTMLElement,
  { left, top }: { left: number; top: number }
) => {
  popupElement.style.left = `${left}px`;
  popupElement.style.top = `${top}px`;
};

// Función para observar cambios de tamaño en el contenedor
export const observeContainerResize = (
  observer: ResizeObserver,
  container: HTMLElement
) => {
  observer.observe(container);
};

// Función para limpiar el observador de redimensionamiento
export const cleanupResizeObserver = (observer: ResizeObserver) => {
  observer.disconnect();
};

export const isMovedPopup = (
  e: React.MouseEvent,
  startPositionRef: React.MutableRefObject<{ x: number; y: number }>
) => {
  const deltaX = Math.abs(e.clientX - startPositionRef.current.x);
  const deltaY = Math.abs(e.clientY - startPositionRef.current.y);
  const moveThreshold = 3;
  return deltaX > moveThreshold || deltaY > moveThreshold;
};

// Component popup.tsx
export const modifyZIndex = (id: string) => {
  const elements = document.querySelectorAll('[id^="popup-"]');
  const elementsArray = Array.from(elements);
  const excludedId = `popup-${id}`;
  elementsArray.forEach((element) => {
    if (element instanceof HTMLElement) {
      if (element.id == excludedId) {
        element.style.zIndex = "10";
      } else {
        element.style.zIndex = "0";
        element.style.color = "black";
      }
    }
  });
};

export const updateElementPosition = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  positionRef: React.MutableRefObject<IPositionInterface>,
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const marginTop = 80; // Margen superior
  const marginLeftRight = 20; // Margen izquierdo
  const containerBounds = containerRef.current!.getBoundingClientRect();
  const newLeft = Math.max(
    marginLeftRight,
    Math.min(
      e.clientX - positionRef.current.width / 2,
      containerBounds.width - 150
    )
  );
  const newTop = Math.max(
    marginTop,
    Math.min(
      e.clientY - positionRef.current.height / 2,
      containerBounds.height - 150
    )
  );

  positionRef.current = {
    ...positionRef.current,
    left: newLeft,
    top: newTop,
  };
  return { newLeft: newLeft, newTop: newTop };
};
