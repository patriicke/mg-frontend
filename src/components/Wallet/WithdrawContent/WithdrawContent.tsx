import React, { useEffect, useState } from 'react';
import WalletDropdown from '../WalletContent/WalletDropdown';
import WalletInput from '../WalletContent/WalletInput';
import { PaymentMethodProps } from '../SelectCurrency';
import { createPayout, estimateCrypto } from 'services/wallet.service';
import { errorParser } from 'utils/error.utils';
import { toastSuccess } from 'components/ui/Toast';
import { UserContextProps, UserContext } from 'App';
import SvgLoader from 'components/DynamicSvg';

interface IProps {
  paymentMethods: PaymentMethodProps[];
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  cryptoValue: string;
  setCryptoValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
}

const WithdrawContent: React.FC<IProps> = ({
  paymentMethods,
  paymentMethod,
  isLoading,
  cryptoValue,
  setCryptoValue,
  setPaymentMethod,
}) => {
  const [address, setAddress] = useState('');
  const { user } = React.useContext<UserContextProps>(UserContext);
  const [dollarValue, setDollarValue] = useState(
    user.totalWalletBalance as string,
  );
  const [valueToCalculate, setValueToCalculate] = useState('');
  const [calculatedValue, setCalculatedValue] = useState('');
  const [error, setError] = React.useState({
    address: '',
    amount: '',
  });

  const addressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isEmpty = e.target.value === '';
    setAddress(e.target.value);
    if (isEmpty)
      return setError({ ...error, address: 'Address can not be empty' });
    setError({ ...error, address: '' });
  };

  const dollarChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if value is number and greater than 0
    const isNumber = !isNaN(Number(e.target.value));
    setValueToCalculate(e.target.value);
    const isGreater = Number(e.target.value) > 0;
    if (!isNumber)
      return setError({
        ...error,
        amount: 'Withdrawal Amount must be valid number',
      });
    if (!isGreater)
      return setError({
        ...error,
        amount: 'Withdrawal Amount should be greater than 0',
      });
    setError({ ...error, amount: '' });
  };

  const calculateTotalCryptoValue = async () => {
    // const cryptoValue = Number(valueToCalculate) / Number(singleCryptoValue);
    // setCalculatedValue(String(cryptoValue.toFixed(2)));
    setCalculatedValue('');
    let value = valueToCalculate;
    if (valueToCalculate === '0') {
      value = '1';
    }
    const payload = {
      amount: value,
      currencyFrom: 'usd',
      currencyTo: paymentMethod,
    };
    const [response, error] = await estimateCrypto(payload);
    if (response) {
      const parsedValue = parseFloat(
        response.data.data.estimatedAmount,
      ).toFixed(2);
      setCalculatedValue(parsedValue);
    }
    if (error) {
      errorParser(error);
    }
  };

  // useEffect(() => {
  //   if (
  //     valueToCalculate === '' ||
  //     Number(valueToCalculate) < 0 ||
  //     isNaN(Number(valueToCalculate))
  //   ) {
  //     setCalculatedValue('');
  //   } else {
  //     calculateTotalCryptoValue();
  //   }
  // }, [valueToCalculate, paymentMethod]);

  const withdraw = async () => {
    const payload = {
      address: address,
      currency: paymentMethod,
      amount: valueToCalculate,
    };
    const [response, error] = await createPayout(payload);
    if (response) {
      toastSuccess('Success');
    }
    if (error) {
      errorParser(error);
    }
  };

  useEffect(() => {
    const convertData = setTimeout(() => {
      if (
        valueToCalculate === '' ||
        Number(valueToCalculate) < 0 ||
        isNaN(Number(valueToCalculate))
      ) {
        setCalculatedValue('');
      } else {
        calculateTotalCryptoValue();
      }
    }, 1200);
    return () => clearTimeout(convertData);
  }, [valueToCalculate, paymentMethod]);

  return (
    <div className="w-full h-max m-10 flex flex-col justify-between items-center border border-[#484848] p-4 rounded-lg gap-3">
      <div className="w-full">
        <p>Wallet Balance</p>
        <div className="bg-[#0F1012] w-full rounded-lg flex flex-col sm:flex-row justify-between items-stretch mt-2">
          <WalletDropdown
            label={paymentMethod}
            value={cryptoValue}
            options={paymentMethods}
            setLabel={setPaymentMethod}
            className="relative sm:w-1/2 px-2 py-2"
          />
          <WalletInput
            value={dollarValue}
            disabled={true}
            className="sm:w-1/2 px-2 py-2"
          />
        </div>
      </div>
      <p className="text-[#B0D512] font-normal text-base">
        Notice : Please enter the {paymentMethod} wallet address you wish to
        receive the funds or Once confirmed. the withdrawal is usually processed
        within a few minutes.
      </p>
      <div className="w-full flex flex-col md:flex-row md:flex-wrap">
        <div className="w-full p-2">
          <p className="text-[#878787] mb-1">
            Receiving {paymentMethod} Address
          </p>
          <input
            disabled={isLoading}
            className={`w-full h-14 bg-transparent p-4 rounded-lg cursor-pointer text-white bg-[#15171B] border-2 text-base font-medium ${
              error.address ? 'border-red-400' : 'border-[#484848]'
            }`}
            type="text"
            placeholder={`Receiving ${paymentMethod} Address`}
            value={address}
            onChange={addressChangeHandler}
          />
          {error.address && (
            <p className="text-red-400 text-sm mt-1">{error.address}</p>
          )}
        </div>
        <div className="w-full md:w-1/2 p-2">
          <p className="text-[#878787] mb-1">Withdrawal Amount</p>
          <input
            className={`w-full h-14 bg-transparent p-4 rounded-lg cursor-pointer text-white bg-[#15171B] border-2 text-base font-medium ${
              error.amount ? 'border-red-400' : 'border-[#484848]'
            }`}
            disabled={isLoading}
            type="text"
            placeholder="$0.00"
            value={valueToCalculate}
            onChange={dollarChangeHandler}
          />
          {error.amount && (
            <p className="text-red-400 text-sm mt-1">{error.amount}</p>
          )}
        </div>
        <div className="w-full md:w-1/2 p-2">
          <p className="text-[#878787] mb-1 hidden md:block opacity-0">
            Crypto Value
          </p>
          <div className="flex items-center gap-2 w-full h-14 bg-transparent p-4 rounded-lg cursor-pointer bg-[#15171B] border-2 border-[#484848]">
            <div className="min-w-[20px] h-[20px]">
              <SvgLoader name={paymentMethod} />
            </div>
            <div className=" text-base font-medium">
              {calculatedValue ? (
                <p className="text-white">{calculatedValue}</p>
              ) : (
                <p className="text-[#878787]">{`0.00 ${paymentMethod}`}</p>
              )}
            </div>
          </div>
          {/* <input
            disabled
            className="`w-full h-14 bg-transparent p-4 rounded-lg cursor-pointer text-white bg-[#15171B] border-2 border-[#484848] text-base font-medium"
            type="text"
            placeholder={`0.00 ${paymentMethod}`}
            value={`${calculatedValue}`}
          /> */}
        </div>
      </div>
      {true && (
        <div className="w-full text-center">
          <button
            disabled={error.address !== '' || error.amount !== ''}
            className="w-1/2 h-12 m-2 bg-[#B0D512] rounded-lg text-black font-medium text-lg uppercase"
            onClick={withdraw}
          >
            Withdraw
          </button>
          <p className="text-[#B0D512] font-normal text-base  m-auto sm:m-0 text-center">
            Network Fee : $2.72
          </p>
        </div>
      )}
      <p className="text-[#B0D512] font-normal text-base w-full text-left">
        You will receive the specified {paymentMethod} amount to your withdrawal
        address The value subtracted from your balance may vary between now and
        the time we process your withdrawal.
      </p>
    </div>
  );
};

export default WithdrawContent;
