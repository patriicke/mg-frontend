import useDialog from 'hooks/useDialog';
import React, { useState } from 'react';
import closeIcon from 'assets/images/auth/close.png';
import cx from 'classnames';
import RouletteTop from 'assets/images/roulette/rouletteTop.png';
import RouletteMiddle from 'assets/images/roulette/rouletteMiddle.png';
import RouletteBottom from 'assets/images/roulette/rouletteBottom.png';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const RoulettePopup = () => {
  const { hideDialog } = useDialog();
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const closeClickHandler = () => {
    hideDialog();
    toggleVisibility();
    window.history.go(-1)
  };

  return (
    <div
      className={cx(
        'fixed inset-y-0 right-0 transition-transform transform duration-300 ease-in-out translate-x-0 h-[100%] sm:h-[90%] p-7 sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] w-full sm:w-[750px] z-[100] overflow-x-hidden overflow-y-auto bg-[#15171B] rounded-lg text-white',
        { 'translate-x-full': !isVisible },
      )}
    >
      <div className="flex items-center">
        <div
          className="sm:hidden w-max p-[4px] md:p-[9px] rounded border border-[#484848] hover:border-white cursor-pointer"
          onClick={closeClickHandler}
        >
          <IoClose color={'#FFF'} size={20} onClick={closeClickHandler} />
        </div>
      </div>
      <div className="w-full mt-10 flex flex-col items-center gap-10 text-[#A6A5A5]">
        {/* <img src={RouletteTop} alt="" /> */}
        <img src={RouletteMiddle} alt="" />
        <button
          className="px-[17px] py-[20px] text-[16px] rounded-lg sm:uppercase text-white font-GeogrotesqueWide hover:cursor-pointer md:px-[34px] md:text-[24px] font-[700] disabled:cursor-not-allowed  shadow-[0_5px_0px_0px_#9068C8] w-[200px] sm:w-[300px] bg-[#8B53D8] sm:text-white"
          onClick={() => {}}
        >
          VERIFY
        </button>
        <button
          className="px-[17px] py-[20px] text-[16px] rounded-lg sm:uppercase text-white font-GeogrotesqueWide hover:cursor-pointer md:px-[34px] md:text-[24px] font-[700] disabled:cursor-not-allowed  shadow-[0_5px_0px_0px_#EC7E0B] w-[200px] sm:w-[300px] bg-[#FF9F25] sm:text-white"
          onClick={() => (window.location.href = '/activities/unlock')}
        >
          UNLOCK
        </button>
        <img src={RouletteBottom} alt="" />
      </div>
      <div
        className={cx(
          'absolute top-[10px] right-[10px] w-[40px] hover:cursor-pointer hidden sm:block',
          'md:top-[25px] md:right-[25px] md:w-[45px]',
        )}
        onClick={closeClickHandler}
      >
        <img src={closeIcon} alt="close" />
      </div>
    </div>
  );
};

export default RoulettePopup;
