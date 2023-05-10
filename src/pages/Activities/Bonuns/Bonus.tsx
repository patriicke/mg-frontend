import React, { useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import cx from 'classnames';
import closeIcon from 'assets/images/auth/close.png';
import useDialog from 'hooks/useDialog';
import First1 from 'assets/images/activities/bonus/first/1.png';
import First2 from 'assets/images/activities/bonus/first/2.png';
import First3 from 'assets/images/activities/bonus/first/3.png';

import Second1 from 'assets/images/activities/bonus/second/1.png';
import Second2 from 'assets/images/activities/bonus/second/2.png';
import Second3 from 'assets/images/activities/bonus/second/3.png';

import Third1 from 'assets/images/activities/bonus/third/1.png';
import Third2 from 'assets/images/activities/bonus/third/2.png';
import Third3 from 'assets/images/activities/bonus/third/3.png';

import Fourth1 from 'assets/images/activities/bonus/fourth/1.png';
import Fourth2 from 'assets/images/activities/bonus/fourth/2.png';
import Fourth3 from 'assets/images/activities/bonus/fourth/3.png';
import { UserContext, UserContextProps } from 'App';
import Wallet from 'components/Wallet/Wallet';

interface IProps {
  isFromDialog?: boolean;
}

const Bonus: React.FC<IProps> = ({ isFromDialog }) => {
  const { user, fetchProfile, loggedInstate } =
    React.useContext<UserContextProps>(UserContext);

  const { hideDialog, showDialog } = useDialog();
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const backClickHandler = () => {
    if (isFromDialog) {
      showDialog(
        <UserContext.Provider
          value={{
            loggedInstate: loggedInstate,
            user: user,
            fetchProfile: fetchProfile,
          }}
        >
          <Wallet />
        </UserContext.Provider>,
      );
    } else {
      hideDialog();
      toggleVisibility();
    }
  };

  const closeClickHandler = () => {
    hideDialog();
    toggleVisibility();
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
          className="hidden sm:inline-block w-max p-[4px] md:p-[9px] rounded border border-[#484848] hover:border-white cursor-pointer"
          onClick={backClickHandler}
        >
          <BiChevronLeft color={'#FFF'} size={20} />
        </div>
        <div
          className="sm:hidden w-max p-[4px] md:p-[9px] rounded border border-[#484848] hover:border-white cursor-pointer"
          onClick={closeClickHandler}
        >
          <IoClose color={'#FFF'} size={20} onClick={closeClickHandler} />
        </div>
        <h1 className="w-full text-2xl text-center sm:text-left font-bold ml-2">
          Deposit Bonus Rule
        </h1>
      </div>
      <div className="w-full mt-10 flex flex-col items-center text-[#A6A5A5]">
        <p>
          The most exciting part of plating at a NFT Slot is the bonuses on
          offer! MODERN.GAME, the leading NFT Slot platform in the world offers
          you, our loyal players, not 1 but 4 rewarding deposit bonuses.
          <br />
          <br />
          The best part about having 4 bonuses is that ye can enjoy MODERN.GAME
          with some help from the friendliest and most rewarding There is no
          deposit bonus like that of MODERN.GAME with a whopping total of 1260%
          deposit match.
          <br />
          <br />
          1st Deposit Bonus
          <br />
          <br />
          Make a deposit today and get a massive 270% (up to 20,000USD)deposit
          match at MODERN.GAME ! Bet now to get USD in your wallet!
        </p>
        <br />
        <div className="flex justify-between items-end gap-4">
          <img src={First1} alt="" className="w-[31%]" />
          <img src={First2} alt="" className="w-[31%]" />
          <img src={First3} alt="" className="w-[31%]" />
        </div>
        <p>
          2nd Deposit Bonus
          <br />
          <br /> A second deposit bonus of 300% (up to 40,000usd) awaits you
          with your second deposit into the world's best NFT Slot! Don't wait
          and enjoy more NFT Slot fun now!
        </p>
        <br />
        <div className="flex justify-between items-end gap-4">
          <img src={Second1} alt="" className="w-[31%]" />
          <img src={Second2} alt="" className="w-[31%]" />
          <img src={Second3} alt="" className="w-[31%]" />
        </div>
        <p>
          3rd Deposit Bonus
          <br />
          <br />
          Yes! Another 330% (up to 60,000USD) deposit bonus just for you! All
          you have to do is make a minimum deposit to ea a bonus like no deposit
          bonus offered anywhere else! Deposit now to win!
        </p>
        <br />
        <div className="flex justify-between items-end gap-4">
          <img src={Third1} alt="" className="w-[31%]" />
          <img src={Third2} alt="" className="w-[31%]" />
          <img src={Third3} alt="" className="w-[31%]" />
        </div>
        <p>
          4th Deposit Bonus
          <br />
          <br />
          Wowzer! A special gift from Coco! A 360% (up to 100,000USD) fourth
          deposit bonus! Almost unheard of in the NFT Slot space. Don't wait
          take advantage of this NFT Slot deposit bonus and win big!
        </p>
        <div className="flex justify-between items-end gap-4">
          <img src={Fourth1} alt="" className="w-[31%]" />
          <img src={Fourth2} alt="" className="w-[31%]" />
          <img src={Fourth3} alt="" className="w-[31%]" />
        </div>
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
      <div className="w-full text-center mt-[10px]">
        <button className="bg-[#DEFC5C] text-[14px] sm:text-[21px] font-[700] px-[20px] py-[15px] sm:px-[45px] sm:py-[15px] rounded-[15px] text-black hover:shadow-lg transition-all duration-500 ease-in-out mb-[-10px]">
          DEPOSIT
        </button>
      </div>
    </div>
  );
};

export default Bonus;
