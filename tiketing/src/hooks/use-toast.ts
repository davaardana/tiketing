import React from 'react';

type ToastOptions = {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

type Toast = ToastOptions & { id: number };

type ToastContextValue = {
  toasts: Toast[];
  toast: (options: ToastOptions) => void;
  dismiss: (id: number) => void;
};

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

let toastId = 0;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const dismiss = React.useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = React.useCallback(
    (options: ToastOptions) => {
      setToasts((current) => {
        const id = ++toastId;
        const nextToast: Toast = { id, ...options };
        setTimeout(() => dismiss(id), 4000);
        return [...current, nextToast];
      });
    },
    [dismiss]
  );

  const value = React.useMemo(() => ({ toasts, toast, dismiss }), [toasts, toast, dismiss]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
