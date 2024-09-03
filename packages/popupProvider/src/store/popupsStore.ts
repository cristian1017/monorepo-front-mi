import { create } from "zustand";
import { IPopupInterface } from "../interfaces/PopupInterface";

// Estado y acciones que maneja el store de los popups
interface PopupsState {
  popups: IPopupInterface[]; // Lista de popups
  addPopup: (popup: IPopupInterface) => void; // Agrega un nuevo popup
  closePopup: (id: string) => void; // Cierra un popup específico
  closeAll: () => void; // Cierra todos los popups
}

export const usePopupsStore = create<PopupsState>((set) => ({
  popups: [],
  // Método para agregar un popup
  addPopup: (popup: IPopupInterface) =>
    set((state) => ({
      popups: [...state.popups, popup],
    })),
  // Método para cerrar un popup específico
  closePopup: (id: string) =>
    set((state) => ({
      popups: state.popups.filter((popup) => popup.id !== id),
    })),
  // Método para cerrar todos los popups
  closeAll: () => set({ popups: [] }),
}));
