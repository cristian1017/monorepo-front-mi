import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";

import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";

createRoot(document.getElementById("root")!).render(<App />);
