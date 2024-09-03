import { FC } from "react";
import { Button } from "primereact/button";
import { usePopups } from "@monorepo/popup-provider";
import "../styles/header.css";

export const Header: FC = () => {
  const { closeAll } = usePopups();
  return (
    <div className="header-container">
      <h2>Prueba Técnica - React</h2>
      <Button label="Close All" severity="danger" onClick={closeAll} />
    </div>
  );
};
