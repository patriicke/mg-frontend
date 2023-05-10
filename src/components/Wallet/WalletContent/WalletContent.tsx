import React, { useContext, useEffect, useState } from 'react';
import { PaymentMethodProps } from '../SelectCurrency';
import WalletDropdown from './WalletDropdown';
import WalletInput from './WalletInput';
import { createTransaction, estimateCrypto } from 'services/wallet.service';
import { errorParser } from 'utils/error.utils';
import { BiLoaderCircle, BiTransfer } from 'react-icons/bi';
// import walletMobild from "assets/images/header/wallet.png";
import DepositAddress from './DepositAddress';
import { UserContextProps, UserContext } from 'App';
import BonusMoney from 'assets/svg/nftslot/BonusMoney';
import BonusWrapper from 'assets/svg/nftslot/BonusWrapper';
import HighestBonusWrapper from 'assets/svg/nftslot/HighestBonusWrapper';
import BonusSelectWrapper from 'assets/svg/nftslot/BonusSelectWrapper';
import DefaultRadio from 'assets/svg/nftslot/DefaultRadio';
import CheckedRadio from 'assets/svg/nftslot/CheckedRadio';
import HighestBonusWrapperSelected from 'assets/svg/nftslot/HighestBonusWrapperSelected';
import useDialog from 'hooks/useDialog';
import Bonus from 'pages/Activities/Bonuns/Bonus';

interface IProps {
  paymentMethods: PaymentMethodProps[];
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  cryptoValue: string;
  setCryptoValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
}

const WalletContent: React.FC<IProps> = ({
  paymentMethods,
  paymentMethod,
  isLoading,
  cryptoValue,
  setCryptoValue,
  setPaymentMethod,
}) => {
  const { user, fetchProfile, loggedInstate } =
    React.useContext<UserContextProps>(UserContext);
  const { showDialog } = useDialog();
  const [dollarValue, setDollarValue] = useState(
    user.totalWalletBalance as string,
  );
  const [valueToCalculate, setValueToCalculate] = useState('');
  const [calculatedValue, setCalculatedValue] = useState('');
  const [address, setAddress] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);
  const [error, setError] = React.useState({
    amount: '',
  });
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState(0);

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

  const generateDepositAddress = async () => {
    setIsAddressLoading(true);
    const payload = {
      priceAmount: valueToCalculate,
      priceCurrency: 'usd',
      payCurrency: paymentMethod,
    };
    const [response, error] = await createTransaction(payload);
    if (response) {
      setAddress(response.data.data.depositAddress);
      setQrGenerated(true);
    }
    if (error) {
      errorParser(error);
    }
    setIsAddressLoading(false);
  };

  const toggleSelectedBonus = (index: number) => {
    if (selectedBonus === index) {
      setSelectedBonus(0);
    } else {
      setSelectedBonus(index);
    }
  };

  useEffect(() => {
    const convertData = setTimeout(() => {
      if (valueToCalculate === '') {
        setCalculatedValue('');
      } else {
        calculateTotalCryptoValue();
      }
    }, 1200);
    return () => clearTimeout(convertData);
  }, [valueToCalculate, paymentMethod]);

  return (
    <>
      <div className="w-full h-max m-10 mb-2 flex flex-col justify-between items-center border border-[#484848] p-[12px] md:p-4 rounded-lg gap-3">
        <div className="w-full">
          <p>Wallet Balance</p>
          <div className="bg-[#0F1012] w-full rounded-lg flex flex-col sm:flex-row justify-between items-stretch mt-2">
            <WalletDropdown
              label={paymentMethod}
              value={cryptoValue}
              options={paymentMethods}
              setLabel={setPaymentMethod}
              className="relative w-full lg:w-1/2 px-2 py-2"
            />
            <WalletInput
              value={dollarValue}
              disabled
              className="w-full lg:w-1/2 px-2 py-2"
            />
          </div>
        </div>
        <div className="w-full mt-5">
          <p>Deposit</p>
          <div className="w-full flex flex-col sm:flex-row justify-between items-center rounded-lg mt-2">
            <WalletInput
              value={valueToCalculate}
              setValue={setValueToCalculate}
              disabled={isLoading || false}
              className="w-full sm:w-1/2 py-2"
              setError={setError}
              error={error}
            />
            <BiTransfer size={20} className="mx-2 hidden sm:inline-block" />
            <WalletInput
              value={calculatedValue}
              disabled={isLoading || false}
              className="w-full sm:w-1/2 py-2"
              imageSrc={paymentMethod}
              // setError={setError}
              // error={error}
            />
          </div>
          {error.amount && (
            <p className="text-red-400 text-sm mt-1">{error.amount}</p>
          )}
        </div>
        <div className="bg-[#0F1012] rounded rounded-[8px] px-[10px] py-[15px] sm:px-[15px] sm:py-[20px] md:px-[20px] lg:px-[30px] lg:py-[25px] w-full">
          <div className="flex justify-between items-center">
            <div className="flex gap-[5px] sm:gap-[8px] items-center">
              <p className="italic text-white text-[14px] md:-[18px] lg:text-[23px] w-[35px] h-[21px] sm:-[40px] sm:h-[27px]  lg:w-[58px] lg:h-[39px]  bg-gradient-to-r from-[#A7CD02] to-[#FEAD4D] rounded rounded-[3px] flex items-center justify-center">
                1st
              </p>
              <p className="text-[#A9A9A9] text-[14px] md:text-[18px] lg:text-[22px] leading-[27px]">
                Deposit 1.800+ USDT to get :
              </p>
            </div>
            <a
              href="/activities"
              onClick={() =>
                showDialog(
                  <UserContext.Provider
                    value={{
                      loggedInstate: loggedInstate,
                      user: user,
                      fetchProfile: fetchProfile,
                    }}
                  >
                    <Bonus isFromDialog />
                  </UserContext.Provider>,
                )
              }
              className="text-[12px] sm:text-[16px]  lg:text-[20px] leading-[25px] bg-gradient-to-b text-transparent bg-clip-text from-[#6D6D6D] to-[#A7A5A530]"
            >
              More
            </a>
          </div>

          <div className="mt-[14px] md:mt-[22px] flex justify-between bonus-select">
            <div
              className="bonus relative w-max cursor-pointer"
              onClick={() => toggleSelectedBonus(1)}
            >
              <div className="wrapper">
                {selectedBonus === 1 ? (
                  <BonusSelectWrapper />
                ) : (
                  <BonusWrapper />
                )}
              </div>
              <div className="absolute top-0 bottom-0 left-0 right-0 pt-0 pl-[5px] pb-[5px] sm:pt-[8px] sm:pl-[10px] sm:pb-[10px] bonus-content">
                <input
                  type="radio"
                  className="bonus-radio hidden"
                  name="bonus"
                  checked={selectedBonus === 1}
                />
                <button>
                  {selectedBonus === 1 ? <CheckedRadio /> : <DefaultRadio />}
                </button>
                <div className="bonus-money-svg">
                  <BonusMoney />
                </div>
                <div className="absolute z-1 top-[7px] right-[18px] sm:top-[17px]  md:top-[13px] lg:right-[35px] lg:top-[10px] bonus-text">
                  <div className="bg-gradient-to-r text-transparent bg-clip-text from-[#A7CD02] to-[#FEAD4D] text-[14px] md:text-[20px] lg:text-[24px] leading-[17px] lg:leading-[30px]">
                    +120%
                  </div>
                  <div className="bg-gradient-to-r text-transparent bg-clip-text from-[#A7CD02] to-[#FEAD4D] text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
                    Bonus
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bonus relative w-max cursor-pointer"
              onClick={() => toggleSelectedBonus(2)}
            >
              <div className="wrapper">
                {selectedBonus === 2 ? (
                  <BonusSelectWrapper />
                ) : (
                  <BonusWrapper />
                )}
              </div>
              <div className="absolute top-0 bottom-0 left-0 right-0 t-0 pl-[5px] pb-[5px] sm:pt-[8px] sm:pl-[10px] sm:pb-[10px] bonus-content">
                <input
                  type="radio"
                  className="bonus-radio hidden"
                  name="bonus"
                  checked={selectedBonus === 2}
                />
                <button>
                  {selectedBonus === 2 ? <CheckedRadio /> : <DefaultRadio />}
                </button>
                <div className="bonus-money-svg">
                  <BonusMoney />
                </div>
                <div className="absolute z-1  top-[7px] sm:top-[17px] right-[18px] md:top-[13px] lg:right-[35px] lg:top-[10px] bonus-text">
                  <div className="bg-gradient-to-r text-transparent bg-clip-text from-[#A7CD02] to-[#FEAD4D] text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] leading-[17px] lg:leading-[30px]">
                    +150%
                  </div>
                  <div className="bg-gradient-to-r text-transparent bg-clip-text from-[#A7CD02] to-[#FEAD4D] text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
                    Bonus
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bonus relative w-max cursor-pointer"
              onClick={() => toggleSelectedBonus(3)}
            >
              <div className="wrapper bonus-max-wrapper">
                {selectedBonus === 3 ? (
                  <HighestBonusWrapperSelected />
                ) : (
                  <HighestBonusWrapper />
                )}
                {/* <HighestBonusWrapper /> */}
                {/* <BonusSelectWrapper /> */}
              </div>
              <div className="absolute top-0 bottom-0 left-0 right-0 pt-0 pl-[18px] pb-[5px] sm:pt-[8px] sm:pl-[22px] sm:pb-[10px] bonus-content bonus-max">
                <input
                  type="radio"
                  className="bonus-radio hidden"
                  name="bonus"
                  checked={selectedBonus === 3}
                />
                <button>
                  {selectedBonus === 3 ? <CheckedRadio /> : <DefaultRadio />}
                </button>
                <div className="bonus-money-svg">
                  <BonusMoney />
                </div>
                <div className="absolute z-1  top-[7px] sm:top-[17px] md:top-[13px] right-[8px] sm:right-[10px] lg:top-[10px] bonus-max-text">
                  <div className="bg-gradient-to-r text-transparent bg-clip-text from-[#A7CD02] to-[#FEAD4D] text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] leading-[17px] lg:leading-[30px]">
                    +270%
                  </div>
                  <div className="bg-gradient-to-r text-transparent bg-clip-text from-[#A7CD02] to-[#FEAD4D] text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
                    Bonus
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-[#B0D512] font-normal text-base mt-5 w-full text-left">
          Note: Click on "Submit" to get the deposit wallet address.
        </p>
        {
          <button
            disabled={parseFloat(valueToCalculate) < 0 || isAddressLoading}
            className="w-1/2 px-4 sm:px-0 py-3 sm:h-12 sm:m-5 bg-[#B0D512] rounded-lg text-black font-medium text-lg uppercase"
            onClick={generateDepositAddress}
          >
            {isAddressLoading ? (
              <p className="flex justify-center items-center">
                <BiLoaderCircle className="animate-spin mr-5" /> ...GENERATING
              </p>
            ) : (
              'SUBMIT'
            )}
          </button>
        }
        {isAddressLoading && (
          <div className="w-full flex flex-col justify-center items-center border border-[#484848] px-4 py-2 rounded-lg gap-3">
            <div className="animate-pulse h-[15px] w-1/2 bg-[#484848] rounded-lg"></div>
            <div className="flex w-full justify-center">
              <div className="animate-pulse h-[200px] w-2/3 bg-[#484848] rounded-lg"></div>
            </div>
            <div className="animate-pulse h-[40px] w-1/3 bg-[#484848] mt-2 rounded-lg"></div>
          </div>
        )}
        {address !== '' && !isAddressLoading && (
          <DepositAddress address={address} />
        )}
      </div>
      <p className="text-[#B0D512] font-normal text-base w-full text-left">
        Notice : Only deposit over the {paymentMethod} supported network. Do not
        use BNB or BSC networks
      </p>
      <p className="text-[#B0D512] font-normal text-base mt-5 w-full text-left">
        Notice : The value of {paymentMethod} may vary between now and the time
        we receive your payment.
      </p>
    </>
  );
};

export default WalletContent;
