import cx from 'classnames';
import closeIcon from 'assets/images/auth/close.png';
import useDialog from 'hooks/useDialog';
import { useContext, useEffect, useState } from 'react';
import { getMethods } from 'services/wallet.service';
import { errorParser } from 'utils/error.utils';
import Signup from 'components/Auth/Signup';
import { UserContext, UserContextProps } from 'App';

export interface PaymentMethodProps {
  name: string;
}

const SelectCurrency = () => {
  const { showDialog, hideDialog } = useDialog();
  const { fetchProfile } = useContext<UserContextProps>(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodProps[]>(
    [],
  );

  const getPaymentMethods = async () => {
    setIsLoading(true);
    const [response, error] = await getMethods();
    if (response) {
      setPaymentMethods(response.data.data);
    }
    if (error) {
      if (error.code === 401) {
        showDialog(<Signup fetchProfile={fetchProfile} />);
      }
      errorParser(error);
    }
    setIsLoading(false);
  };

  const selectPaymentHandler = (paymentMethod: string) => {
    // showDialog(
    //   <Wallet paymentMethod={paymentMethod} paymentMethods={paymentMethods} />,
    // );
  };

  useEffect(() => {
    if (paymentMethods.length === 0) {
      getPaymentMethods();
    }
  }, []);

  return (
    <div className="h-[90%] p-7 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-11/12 md:w-[750px] z-[100] overflow-x-hidden overflow-y-auto bg-[#15171B] rounded-lg text-white">
      <h1 className="text-2xl font-bold uppercase">Deposit Options</h1>
      <div className="w-full mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {isLoading
            ? new Array(15).fill(0).map((_value: any, index: number) => (
                <div
                  key={index}
                  className={cx(
                    'bg-gray-700 rounded-lg overflow-hidden shadow-lg aspect-square flex justify-center items-center cursor-pointer',
                  )}
                >
                  <div className="animate-ping h-full w-full bg-gray-800"></div>
                </div>
              ))
            : paymentMethods.map((paymentMethod) => (
                <div
                  className={cx(
                    'bg-gray-700 aspect-square flex justify-center items-center cursor-pointer rounded-lg overflow-hidden shadow-lg',
                    'hover:bg-gray-800',
                  )}
                  onClick={() => selectPaymentHandler(paymentMethod.name)}
                >
                  <h2 className="text-2xl font-bold uppercase">
                    {paymentMethod.name}
                  </h2>
                </div>
              ))}
        </div>
      </div>
      <div
        className={cx(
          'absolute top-[10px] right-[10px] w-[40px] hover:cursor-pointer',
          'md:top-[25px] md:right-[25px] md:w-[45px]',
        )}
        onClick={() => {
          hideDialog();
        }}
      >
        <img src={closeIcon} alt="close" />
      </div>
    </div>
  );
};

export default SelectCurrency;
