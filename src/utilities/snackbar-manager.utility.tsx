import { useSnackbar } from "@src/context/snackbar";

export const SnackbarManager = {
  onSuccess: (message: string) => {
    const { showMessage } = useSnackbar();
    showMessage(message, 'success');
  },
  onError: (message: string) => {
    const { showMessage } = useSnackbar();
    showMessage(message, 'danger');
  },
};