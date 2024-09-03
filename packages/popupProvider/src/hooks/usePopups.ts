import { usePopupsStore } from '../store/popupsStore';
// import { PopupInterface } from '../interfaces/PopupInterface';

// Hook personalizado para interactuar con el store de popups
export const usePopups = () => {
    // Obtiene el estado y las acciones del store
    const popups = usePopupsStore(state => state.popups);
    const addPopup = usePopupsStore(state => state.addPopup);
    const closePopup = usePopupsStore(state => state.closePopup);
    const closeAll = usePopupsStore(state => state.closeAll);

    // Retorna los popups y las  para interactuar con ellos
    return {
        popups,
        addPopup,
        closePopup,
        closeAll
    };
};