"use client";
import React, { createContext, useCallback, useContext, useState } from "react";
import { ConfirmDialogBackdrop } from "./confirm-dialog/ConfirmDialogBackdrop";
import { ConfirmDialogHeader } from "./confirm-dialog/ConfirmDialogHeader";
import { ConfirmDialogMessage } from "./confirm-dialog/ConfirmDialogMessage";
import { ConfirmDialogActions } from "./confirm-dialog/ConfirmDialogActions";
import { useConfirmDialogEffects } from "./confirm-dialog/useConfirmDialogEffects";
import { ConfirmDialogStyles } from "./confirm-dialog/ConfirmDialogStyles";

export type ConfirmOptions = {
  title?: string;
  message?: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
};

interface InternalState extends ConfirmOptions {
  resolve?: (value: boolean) => void;
  open: boolean;
}

const ConfirmDialogContext = createContext<
  (options: ConfirmOptions) => Promise<boolean>
>(() => Promise.resolve(false));

export const useConfirm = () => useContext(ConfirmDialogContext);

export const ConfirmDialogProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<InternalState>({ open: false });

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setState({
        open: true,
        title: options.title || "Подтверждение",
        // Preserve intentionally empty string/null by only defaulting when undefined
        message: options.message === undefined ? "Вы уверены?" : options.message,
        confirmText: options.confirmText || "Да",
        cancelText: options.cancelText || "Отмена",
        variant: options.variant || "default",
        resolve,
      });
    });
  }, []);

  const close = useCallback(
    (value: boolean) => {
      setState((s) => {
        s.resolve?.(value);
        return { open: false } as InternalState;
      });
    },
    []
  );

  useConfirmDialogEffects(state.open, close);

  return (
    <ConfirmDialogContext.Provider value={confirm}>
      {children}
      {state.open && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
          <ConfirmDialogBackdrop onClose={() => close(false)} />
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className="relative w-full max-w-sm mx-auto bg-white shadow-xl rounded-xl border border-gray-200 p-5 animate-scaleIn max-h-[90vh] overflow-y-auto"
          >
            <ConfirmDialogHeader
              title={state.title || ""}
              onClose={() => close(false)}
            />
            {state.message && <ConfirmDialogMessage message={state.message} />}
            <ConfirmDialogActions
              cancelText={state.cancelText || "Отмена"}
              confirmText={state.confirmText || "Да"}
              variant={state.variant || "default"}
              onCancel={() => close(false)}
              onConfirm={() => close(true)}
            />
          </div>
        </div>
      )}
      <ConfirmDialogStyles />
    </ConfirmDialogContext.Provider>
  );
};
