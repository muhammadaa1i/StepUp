import { useEffect } from "react";

export function useClickOutside(
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  selector: string
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest(selector)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen, selector, setIsOpen]);
}
