import { toast, ToastOptions, UpdateOptions, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Toaster {
  static toastSettings: ToastOptions = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    toastClassName: 'custom-toast',
  };

  static success(message: string): string | number | undefined {
    return toast.success(message, this.toastSettings);
  }

  static error(message: string): string | number | undefined {
    return toast.error(message, this.toastSettings);
  }

  static startLoad(message = 'Loading...'): string | number | undefined {
    return toast.loading(message, this.toastSettings);
  }

  static stopLoad(loader: string | number, message: string, res: number): void {
    const settings: UpdateOptions = { ...this.toastSettings };
    settings.render = message;
    settings.type = res === 1 ? 'success' : 'error';
    settings.isLoading = false;
    toast.update(loader, settings);
  }
}

export { Toaster, ToastContainer };
