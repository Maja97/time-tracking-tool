import { Toast } from 'primereact/toast';
import { useRef } from 'react';

type Severity = 'success' | 'info' | 'warn' | 'error' | undefined;

export const useToast = () => {
  const toastRef = useRef<Toast>(null);

  const showToast = (severity: Severity, summary: string, detail?: string, life?: number) => {
    toastRef?.current?.show({
      severity: severity,
      summary,
      detail,
      life: life || 3000
    });
  };

  return { toastRef, showToast };
};
