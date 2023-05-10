import React from 'react';
import CryptoLock from 'assets/images/activities/cryptoLock.png';
import Aura from 'assets/images/activities/aura.png';
import { BiChevronRight } from 'react-icons/bi';

const Unlock = () => {
  return (
    <div className="w-full bg-[#15171B] border border-[#484848] rounded-[15px] p-[10px] sm:p-[30px] flex flex-col items-start mb-6">
      <div className="w-full flex justify-center sm:justify-end relative rounded-[15px] bg-gradient-to-l from-[#E8C13D] to-[#A7CD02] p-[20px] sm:px-[40px] overflow-hidden">
        <div className="relative w-full sm:w-max sm:my-[20px] sm:mr-[-150px] sm:ml-[200px] overflow-hidden">
          <img
            src={Aura}
            alt=""
            className="w-[600px] h-[350px] sm:w-[600px] aspect-auto overflow-hidden "
          />
          <img
            src={CryptoLock}
            alt=""
            className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-[220px] sm:w-[300px] aspect-auto"
          />
        </div>
        <div className="absolute inset-0 px-[20px] py-[10px] sm:px-[40px] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start w-full gap-1">
              <h2 className="text-[17px] font-[500] sm:text-[28px] text-white mb-[10px]">
                Wager To Unlock
              </h2>
              <p className="flex items-center cursor-pointer text-[12px] sm:text-[20px] mt-[5px]">
                Details <BiChevronRight />
              </p>
            </div>
            <div>
              <p className="uppercase sm:capitalize text-[17px] font-[500] text-center sm:text-left sm:text-[24px] sm:font-[400]">
                Amount Unlockable
              </p>
              <p className="text-[15px] font-[500] sm:text-[24px] sm:font-[400] text-center sm:text-left">
                0.00 USD
              </p>
            </div>
          </div>
          <div>
            <div className=" text-center sm:text-left">
              <p className="uppercase sm:capitalize text-[#484848] sm:text-white text-[17px] font-[500] sm:text-[28px]">
                Unlocked: $ <span className="text-[#BF6D2D]">0.00</span>
              </p>
              <button className="bg-[#DEFC5C] text-[14px] sm:text-[21px] font-[700] px-[20px] py-[15px] sm:px-[45px] sm:py-[15px] rounded-[15px] text-black hover:shadow-lg transition-all duration-500 ease-in-out mb-[-10px]">
                WITHDRAW
              </button>
            </div>
            <div className="flex justify-between items-start w-full gap-1 mt-[20px]">
              <h2 className="text-[16px] font-[500] sm:text-[28px] text-white mb-[10px]">
                USD RECORD
              </h2>
              <p className="flex items-center cursor-pointer text-[12px] sm:text-[20px]">
                Total claimed $0.00
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[20px] text-[#A6A5A5] text-[18px] sm:text-[24px]">
        <p>
          <span className="text-[#DEFC5C]">Deposit</span> to claim your bonus
          now
        </p>
        <br />
        <p>
          How to unlock USD? <br />
          <br /> Locked USD is obtained through certain bonuses, such as deposit
          bonus and lucky spin.
          <br />
          <br /> Unlocking USD is easy! It's essentially the same as rakeback &
          will unlock proportionally through wager.
        </p>
        <div className="bg-[#0F1012] px-[5px] py-[10px] text-white my-[10px]">
          <p>Unlock amount = wager amount * 1% * 20%</p>
        </div>
        <p>
          At least 10USD, click "Receive", and the unlocked will be directly
          transferred to your balance. That's it! Your USD can be used
          immediately now!
        </p>
      </div>
    </div>
  );
};

export default Unlock;
