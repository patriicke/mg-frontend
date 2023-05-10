import { toastError } from "components/ui/Toast";

export const errorParser = (error: any) => {
  if (error) {
    if (error?.response?.status === 422 && error?.response?.data?.errors) {
      error?.response?.data?.errors.map((errs: any) => {
         toastError(errs.messages);
      });
    } else {
      toastError(error?.response?.data?.errors.detail);
    }
  }
};
