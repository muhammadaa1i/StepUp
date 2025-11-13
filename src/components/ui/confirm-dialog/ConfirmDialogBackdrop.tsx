interface ConfirmDialogBackdropProps {
  onClose: () => void;
}

export const ConfirmDialogBackdrop = ({ onClose }: ConfirmDialogBackdropProps) => (
  <div
    className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
    onClick={onClose}
  />
);
