import { toast, Id, ToastOptions, UpdateOptions } from 'react-toastify';

class Toaster {
    static toastSettings: ToastOptions = {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    };

    static success(message: string): Id {
        return toast.success(message, this.toastSettings);
    }

    static error(message: string): Id {
        return toast.error(message, this.toastSettings);
    }

    static startLoad(message = 'Loading...'): Id {
        return toast.loading(message, this.toastSettings);
    }

    static stopLoad(loader: Id, message: string, res: number): void {
        const settings: UpdateOptions = { ...this.toastSettings };
        settings.render = message;
        settings.type = res === 1 ? 'success' : 'error';
        settings.isLoading = false;
        toast.update(loader, settings);
    }
}

export default Toaster;