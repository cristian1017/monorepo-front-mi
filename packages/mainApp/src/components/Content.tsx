import { FC, lazy, Suspense } from "react";
import { Button } from "primereact/button";
import { PopupsProvider, usePopups } from "@monorepo/popup-provider";
import "../styles/content.css";

const LazyAdvice = lazy(() => import("./Advice"));

export const Content: FC = () => {
  const { addPopup } = usePopups();

  /**
   * Adds a popup with a random advice
   * @returns {void}
   */
  const addPopupA = async () => {
    addPopup({
      id: "popupA-" + Date.now(),
      title: "Daily Advice",
      contentComponent: (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyAdvice />
        </Suspense>
      ),
      defaultPosition: { left: 100, top: 200, width: 200, height: 190 },
    });
  };

  /**
   * Adds a popup with a random image
   * @returns {void}
   */
  const addPopupB = () => {
    const randomImage = `https://picsum.photos/200/150?random=${Date.now()}`;

    addPopup({
      id: "popupB-" + Date.now(),
      title: "Popup B",
      contentComponent: (
        <img
          src={randomImage}
          alt="Random"
          style={{ width: "100%", height: "100%", borderRadius: "12px" }}
          loading="lazy"
        />
      ),
      defaultPosition: { left: 400, top: 200, width: 230, height: 230 },
    });
  };

  return (
    <div className="content-container">
      <PopupsProvider>
        <div className="button-container-add">
          <Button label="Add A" severity="success" onClick={addPopupA} />
          <Button label="Add B" severity="success" onClick={addPopupB} />
        </div>
      </PopupsProvider>
    </div>
  );
};
