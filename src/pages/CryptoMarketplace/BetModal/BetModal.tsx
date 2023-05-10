import React, { useState } from 'react';
import cx from 'classnames';
import closeIcon from 'assets/images/auth/close.png';
import useDialog from 'hooks/useDialog';
import CryptoCard from '../CryptoCard/CryptoCard';
import { Crypto } from 'interface/crypto/crypto.interface';

interface IError {
  show: boolean;
  message: string;
}

interface IProps {
  crypto: Crypto; /** Change to crypto */
  addCryptoToSlot: (crypto: Crypto, winRate: number) => void;
}

const BetModal = ({ crypto, addCryptoToSlot }: IProps) => {
  const { hideDialog } = useDialog();
  const [winProbability, setWinProbability] = useState<number>(0);
  const [error, setError] = useState<IError>({
    show: false,
    message: '',
  });

  const winProbabilityChangeHandler = (event: any) => {
    if (!event.target.value.match(/\d/g)) {
      setError({
        show: true,
        message: 'Please enter a numeric value',
      });
    } else if (event.target.value > 100) {
      setError({
        show: true,
        message: 'Win probability can not exceed 100%',
      });
    } else {
      setError({ show: false, message: '' });
    }
    setWinProbability(event.target.value);
  };

  const addCryptoClickHandler = () => {
    if (winProbability === 0) {
      setError({
        show: true,
        message: 'Please enter your desired win percentage',
      });
    }
    if (!error.show && winProbability) {
      addCryptoToSlot(crypto, winProbability);
      hideDialog();
    }
  };

  return (
    <div className="p-7 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-11/12 md:w-[600px] h-max z-[100] overflow-x-hidden overflow-y-auto bg-[#15171B] rounded-lg text-white">
      <h1 className="text-2xl font-bold uppercase">Add Marketplace Item</h1>
      <div className="w-full mt-5 flex justify-between">
        <div className="w-5/12">
          <CryptoCard {...crypto} />
        </div>
        <div className="w-6/12">
          <label className="block mb-3 uppercase text-sm font-bold">
            Win Probability % <span className="text-red-600">*</span>
          </label>
          <input
            className={`text-[15px] border focus:outline-none w-full rounded-[10px] px-6 py-4 md:py-3 bg-[#15171B]`}
            type="text"
            placeholder="100"
            pattern="[0-9]*"
            onChange={winProbabilityChangeHandler}
          />
          {error.show && (
            <small className="text-red-400">{error.message}</small>
          )}
          <button
            className="bg-[#B0D412] text-white text-center block w-full py-2 rounded-lg mt-4"
            onClick={addCryptoClickHandler}
          >
            ADD
          </button>
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

export default BetModal;
