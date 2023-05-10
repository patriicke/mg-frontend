import { useMediaQuery } from 'react-responsive';

import loginImg from 'assets/images/home/login.png';
import singupImg from 'assets/images/home/singup.png';
import { GoogleOAuthProvider } from '@react-oauth/google';

import HeroButton from 'components/buttons/HeroButton';
import SignupWith from 'components/Auth/Signupwith';

import cx from 'classnames';
import useDialog from 'hooks/useDialog';
import SelectCurrency from 'components/Wallet/SelectCurrency';
import Signup from 'components/Auth/Signup';
import { useContext } from 'react';
import { UserContext, UserContextProps } from 'App';
import Wallet from 'components/Wallet/Wallet';

const HeroBar: React.FC = () => {
  const isSmall = useMediaQuery({ maxWidth: 1280 });
  const { showDialog } = useDialog();
  const { user, fetchProfile, loggedInstate } =
    useContext<UserContextProps>(UserContext);
  const [loggedIn, setLoggedIn] = loggedInstate;

  const onClick = () => {
    if (loggedIn) {
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
      showDialog(<Signup fetchProfile={fetchProfile} />);
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
    >
      <div className="w-full">
        <div
          className={cx(
            'w-full h-full flex flex-col-reverse items-center bg-gradient-to-l from-[#E8C13D] to-[#B0D412] rounded-[20px] py-[14px] px-[20px]',
            'md:flex-row md:justify-between',
          )}
        >
          <div className="h-full flex flex-col justify-between items-center md:items-start max-w-[520px]">
            <div className="text-[34px] leading-[41px] font-[700] text-center md:text-left">
              Simple NFTGames & CryptoGames
            </div>
            <div
              className={cx(
                'flex flex-col justify-center items-center gap-[22px] my-[22px]',
                'md:flex-row',
              )}
            >
              <div className="flex justify-start">
                <HeroButton onClick={onClick}>
                  {loggedIn ? 'Deposit' : 'Sign Up'}
                </HeroButton>
              </div>
              {!loggedIn && (
                <div className="">
                  <SignupWith fetchProfile={fetchProfile} />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <img
              className=""
              src={!loggedIn ? singupImg : loginImg}
              alt="logged"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default HeroBar;
