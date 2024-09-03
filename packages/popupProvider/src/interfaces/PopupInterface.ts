export interface IPopupInterface {
  id: string;               
  title: string;             
  contentComponent: React.ReactNode;
  defaultPosition: IPositionInterface;
}

export interface IPositionInterface {
  left: number; 
  top: number;
  width: number;
  height: number;
}

export interface IPopupProps {
  id: string;
  title: string;
  contentComponent: React.ReactNode;
  initialPosition: IPositionInterface;
  onClose: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}