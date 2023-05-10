import classNames from 'classnames';
import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  ReactPortal,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';

type DialogContextProps = {
  showDialog: (children: ReactNode) => void;
  hideDialog: () => void;
};

const DialogContext = createContext<DialogContextProps>(
  {} as DialogContextProps,
);

export const DialogContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [dialog, setDialog] = useState<ReactNode>();
  const [dialogWindow, setDialogWindow] = useState<ReactPortal>();
  const isMobile = useMediaQuery({ maxWidth: 1280 });

  useEffect(() => {
    setIsBrowser(false);
  }, []);

  useEffect(() => {
    if (dialog !== undefined) {
      setDialogWindow(
        ReactDOM.createPortal(
          dialog as ReactNode,
          document.getElementById('modal-root') as Element,
        ),
      );
    }
  }, [dialog]);

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBrowser(false);
  };

  const handlePrevent = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const showDialog = (children: ReactNode) => {
    let element = document.getElementById("root")
      element?.classList.add('bg-fixed')
      
    const modalContent = (
      <div
        className="fixed t-0 l-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-40 z-[100]"
        onClick={handleCloseClick}
      >
        <div
          className="bg-transparent backdrop-blur-sm w-full h-full rounded-sm relative"
          onClick={handlePrevent}
        >
          {children}
        </div>
      </div>
    );

    setTimeout(() => {
      setDialog(modalContent as ReactNode);
      setIsBrowser(true);
    }, 300);
  };

  const hideDialog = () => {
    let element = document.getElementById("root")
      element?.classList.remove('bg-fixed')
    setTimeout(() => {
      setDialog(<></>);
      setIsBrowser(false);
    }, 300);
  };

  const values: DialogContextProps = useMemo(
    () => ({
      showDialog,
      hideDialog,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <DialogContext.Provider value={values}>
      <>
        {isBrowser ? dialogWindow : null}
        {children}
      </>
    </DialogContext.Provider>
  );
};

export default function useDialog() {
  const context = useContext(DialogContext);

  if (context === undefined) {
    throw new Error(
      'useDialog hook must be used with a DialogContextProvider component',
    );
  }

  return context;
}
