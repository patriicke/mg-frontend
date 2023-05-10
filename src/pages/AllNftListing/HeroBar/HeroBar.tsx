import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react'
import cx from 'classnames';
import HeroImg from 'assets/images/marketplace/marketPlaceHeroBar.png';

const HeroBar = () => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
    >
      <div className="w-full">
        <div
          className={cx(
            'w-full h-full flex items-center bg-gradient-to-l from-[#7EC9FF] to-[#081924] rounded-[20px] py-[14px] px-[20px]',
            'md:flex-row md:justify-between',
          )}
        >
          <div className="w-1/3 h-full flex flex-col justify-between items-start max-w-[600px]">
            <p className="text-[#DBDBDB] text-[12px] sm:text-[24px] font-[400]">
              Rewards
            </p>
            <div className="text-[16px] sm:text-[32px] leading-[22px] sm:leading-[41px] font-[700] text-left">
              <p>
                Play <span className="text-[#DEFC5C]">Game</span>
              </p>{' '}
              <p>& Win Free Tokens!</p>
            </div>
            <div
              className={cx(
                'flex flex-col justify-center items-center gap-[22px] my-[22px]',
                'md:flex-row',
              )}
            >
              <div className="flex justify-start">
                <button
                  className="px-[8px] sm:px-[17px] py-[9px] text-[12px] rounded-lg sm:uppercase text-black font-GeogrotesqueWide hover:cursor-pointer md:px-[34px] md:py-[10px] md:text-[15px] font-[500] disabled:cursor-not-allowed  shadow-[0_2px_0px_0px_#7D9806] w-[100px] sm:w-[170px] bg-[#B0D412] sm:text-white"
                  onClick={() => {}}
                >
                  Get Tokens
                </button>
              </div>
              {/* <p className="text-[#888888]">OR</p>
              {loggedIn && (
                <div className="">
                  <SignupWith fetchProfile={fetchProfile} />
                </div>
              )} */}
            </div>
          </div>
          <div className="w-2/3 flex justify-end">
            <img
              className="w-full sm:h-[250px] sm:w-auto"
              src={HeroImg}
              alt="logged"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default HeroBar;