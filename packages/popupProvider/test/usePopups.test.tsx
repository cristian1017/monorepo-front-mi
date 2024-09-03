import React, { useEffect } from "react";
import { render } from "@testing-library/react";
import { usePopups } from "../src/hooks/usePopups";
import { usePopupsStore } from "../src/store/popupsStore";

/**
 * Componente de prueba que renderiza los popups y ejecuta una 
 * función dada en `onRender` una vez que se ha renderizado.
 * 
 * @param {Object} props
 * @prop {() => void} onRender - Función que se ejecuta una vez que el componente se ha renderizado.
 * @returns {React.ReactElement}
 */
const TestComponent = ({ onRender }: { onRender: () => void }) => {
  const { popups } = usePopups();

  useEffect(() => {
    onRender();
  }, [onRender]);

  // Renderiza los popups en la interfaz, mostrando solo el título de cada popup.
  return (
    <div>
      {popups.map((popup) => (
        <div key={popup.id}>{popup.title}</div>
      ))}
    </div>
  );
};

describe("usePopups Hook", () => {
  /**
   * Prueba que verifica que un popup se agrega correctamente al estado y se renderiza en la interfaz.
   */
  it("should add a popup correctly", () => {
    const { container } = render(
      <TestComponent
        onRender={() => {
          const { addPopup } = usePopupsStore.getState();
          addPopup({
            id: "test-popup",
            title: "Test Popup",
            contentComponent: <div>Test Content</div>,
            defaultPosition: { left: 100, top: 100, width: 200, height: 150 },
          });
        }}
      />
    );
    // Verifica que el título del popup agregado está presente en el DOM.
    expect(container.textContent).toContain("Test Popup");
  });

  /**
   * Prueba que verifica que un popup específico se cierra correctamente y se elimina del DOM.
   */
  it("should close a specific popup correctly", () => {
    const { container } = render(
      <TestComponent
        onRender={() => {
          const { addPopup, closePopup } = usePopupsStore.getState();
          addPopup({
            id: "test-popup",
            title: "Test Popup",
            contentComponent: <div>Test Content</div>,
            defaultPosition: { left: 100, top: 100, width: 200, height: 150 },
          });
          closePopup("test-popup");
        }}
      />
    );
    // Verifica que el título del popup ya no está presente en el DOM.
    expect(container.textContent).not.toContain("Test Popup");
  });
});
