import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

interface IProps {
  forModal?: boolean;
}

export const Toaster: React.FC<IProps> = ({ forModal }) => {
  return (
    <>
      {forModal && (
        <div className="z-[9999999]">
          <ToastContainer theme="dark" />
        </div>
      )}
      {!forModal && (
        <div className="z-[9999999]">
          <ToastContainer theme="dark" />
        </div>
      )}
    </>
  );
};

export const toastSuccess = (msg: string, close = true) => {
  if (!toast.isActive(msg)) {
    toast.success(msg, {
      toastId: msg,
      ...(close ? {} : { autoClose: false }),
    });
  }
};

export const toastError = (msg: string, close = true) => {
  if (!toast.isActive(msg)) {
    toast.error(msg, {
      toastId: msg,
      ...(close ? {} : { autoClose: false }),
    });
  }
};

export const toastWarning = (msg: string, close = true) => {
  if (!toast.isActive(msg)) {
    toast.warning(msg, {
      toastId: msg,
      ...(close ? {} : { autoClose: false }),
    });
  }
};
