import React, { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import closeIcon from 'assets/images/auth/close.png';
import useDialog from 'hooks/useDialog';
import { BiChevronLeft } from 'react-icons/bi';
import { PaymentMethodProps } from './SelectCurrency';
import walletMobild from 'assets/images/header/wallet.png';
import { RECORD_VALUE, WALLET_VALUE, WITHDRAW_VALUE } from './Wallet.constants';
import WalletTabs from './WalletTabs';
import WalletContent from './WalletContent/WalletContent';
import WithdrawContent from './WithdrawContent/WithdrawContent';
import RecordContent from './RecordContent/RecordContent';
import { IoClose } from 'react-icons/io5';
import Signup from 'components/Auth/Signup';
import { estimateCrypto, getMethods } from 'services/wallet.service';
import { errorParser } from 'utils/error.utils';
import { UserContextProps, UserContext } from 'App';

interface IProps {
  // paymentMethods: PaymentMethodProps[];
  // paymentMethod: string;
}

const Wallet: React.FC<IProps> = () => {
  const { showDialog, hideDialog } = useDialog();
  const { user, fetchProfile } = useContext<UserContextProps>(UserContext);
  const [currentTab, setCurrentTab] = useState(WALLET_VALUE);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodProps[]>(
    [],
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('eth');
  const [cryptoValue, setCryptoValue] = useState('');

  const getPaymentMethods = async () => {
    setIsLoading(true);
    const [response, error] = await getMethods();
    if (response) {
      setPaymentMethods(response.data.data);
      // setSelectedPaymentMethod(response.data.data[0].name)
    }
    if (error) {
      if (error.code === 401) {
        showDialog(<Signup fetchProfile={fetchProfile} />);
      }
      errorParser(error);
    }
    setIsLoading(false);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const closeClickHandler = () => {
    hideDialog();
    toggleVisibility();
  };

  const estimateBalanceValue = async () => {
    setCryptoValue('');
    const payload = {
      amount: user?.totalWalletBalance || 1,
      currencyFrom: 'usd',
      currencyTo: selectedPaymentMethod,
    };
    const [response, error] = await estimateCrypto(payload);
    if (response) {
      const parsedValue = parseFloat(
        response.data.data.estimatedAmount,
      ).toFixed(2).toString();
      setCryptoValue(parsedValue);
    }
    if (error) {
      errorParser(error);
    }
  };

  useEffect(() => {
    estimateBalanceValue();
  }, [selectedPaymentMethod]);

  useEffect(() => {
    if (paymentMethods.length === 0) {
      getPaymentMethods();
    }
  }, []);

  return (
    <div
      className={cx(
        'fixed inset-y-0 right-0 transition-transform transform duration-300 ease-in-out translate-x-0 h-[100%] sm:h-[90%] p-[14px] sm:p-7 sm:pt-[0] pt-0 sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] w-full sm:w-[650px] lg:w-[880px] z-[100] overflow-x-hidden overflow-y-auto bg-[#15171B] rounded-lg text-white',
        { 'translate-x-full': !isVisible },
      )}
    >
      <div className="flex flex-col bg-[#15171B] z-50 sticky top-0 py-5 pt-7">
        <div className="flex items-center">
          <div
            className="hidden sm:inline-block w-max p-[4px] md:p-[9px] rounded border border-[#484848] hover:border-white cursor-pointer"
            onClick={closeClickHandler}
          >
            <BiChevronLeft color={'#FFF'} size={20} />
          </div>
          <div
            className="sm:hidden w-max p-[4px] md:p-[9px] rounded border border-[#484848] hover:border-white cursor-pointer"
            onClick={closeClickHandler}
          >
            <IoClose color={'#FFF'} size={20} onClick={closeClickHandler} />
          </div>
          <div className="w-full flex justify-center sm:justify-start items-center">
            <div className="w-max p-[4px] mx-3 md:p-[9px] rounded border border-[#484848]">
              <img src={walletMobild} alt="wallet" className="h-5 w-6" />
            </div>
            <h1 className="text-2xl font-bold ml-2">Wallet</h1>
          </div>
          <div
            className={cx(
              'w-[40px] hover:cursor-pointer hidden sm:block',
              'md:top-[25px] md:right-[25px] md:w-[45px]',
            )}
            onClick={closeClickHandler}
          >
            <img src={closeIcon} alt="close" />
          </div>
        </div>
        <div className="mt-10">
          <WalletTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        {currentTab === WALLET_VALUE && (
          <WalletContent
            isLoading={isLoading}
            paymentMethod={selectedPaymentMethod}
            setPaymentMethod={setSelectedPaymentMethod}
            setCryptoValue={setCryptoValue}
            paymentMethods={paymentMethods}
            cryptoValue={cryptoValue}
          />
        )}
        {currentTab === WITHDRAW_VALUE && (
          <WithdrawContent
            isLoading={isLoading}
            paymentMethod={selectedPaymentMethod}
            setPaymentMethod={setSelectedPaymentMethod}
            setCryptoValue={setCryptoValue}
            paymentMethods={paymentMethods}
            cryptoValue={cryptoValue}
          />
        )}
        {currentTab === RECORD_VALUE && <RecordContent />}
      </div>
    </div>
  );
};

export default Wallet;
