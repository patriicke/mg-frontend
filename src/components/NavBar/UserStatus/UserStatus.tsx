import { UserContext, UserContextProps } from 'App';
import React, { useEffect } from 'react';
import Balance from './Balance';
import Deposit from './Deposit';
import Profile from './Profile';
import useDialog from 'hooks/useDialog';
import Wallet from 'components/Wallet/Wallet';
import { ActionType, useSpin } from 'context/SpinContext';
import { useLocalStorage } from 'hooks/useLocalstorage';

interface IProps {}
const UserStatus: React.FC<IProps> = () => {
  const [winNotification, setWinNotification] = useLocalStorage("winNotification", '');

  const { user, fetchProfile, loggedInstate } =
    React.useContext<UserContextProps>(UserContext);
  const { showDialog } = useDialog();

  const {
    state: { winAmount },
    dispatch,
  } = useSpin();

  const showDeposit = () => {
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
  };

  // useEffect(() => {
  //   const handleWinAmount = () => {
  //     const newWinAmount = `$ ${(
  //       parseFloat(nftPrice?.toString() ?? '0') -
  //       parseFloat(price?.toString() ?? '0')
  //     ).toFixed(2)}`;
  //     setWinAmount(newWinAmount);
  //     setTimeout(() => {
  //       setWinAmount('');
  //     }, 2000);
  //   };

  //   if (betResult) {
  //     console.log(betResult)
  //     console.log('suru');
  //     setTimeout(() => {
  //       console.log('antya');
  //       handleWinAmount();
  //     }, 4000);
  //   }
  // }, [betResult]);

  useEffect(() => {
    if (winAmount || winNotification) {
      setTimeout(() => {
        setWinNotification('');
        dispatch({ type: ActionType.setWinAmount, winAmount: '' });
      }, 2000);
    }
  }, [winAmount, winNotification]);

  return (
    <div className="relative flex items-center">
      <div className="absolute top-[50px] left-[40px] md:left-[60px] text-[14px] md:text-[16px] text-[#B0D412]">
        {winAmount || winNotification}
      </div>
      <div className="mr-[2px] md:mr-[29px]">
        <Balance balance={user?.totalWalletBalance} />
      </div>
      <div className="mr-[14px] md:mr-[29px]">
        <Deposit onClick={showDeposit} />
      </div>
      <div>
        <Profile />
      </div>
    </div>
  );
};

export default UserStatus;
