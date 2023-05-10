import React, { useContext, useEffect } from "react";
import FirstDeposit from "assets/images/activities/firstDeposit.png";
import SecondDeposit from "assets/images/activities/secondDeposit.png";
import ThirdDeposit from "assets/images/activities/thirdDeposit.png";
import FourthDeposit from "assets/images/activities/fourthDeposit.png";
import CryptoLock from "assets/images/activities/cryptoLock.png";
import Aura from "assets/images/activities/aura.png";
import { BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useDialog from "hooks/useDialog";
import Bonus from "./Bonuns/Bonus";
import { useMediaQuery } from "react-responsive";
import DoubleChevron from "assets/images/nftslot/doubleChevron.svg";
import { UserContext, UserContextProps } from "App";
import Wallet from "components/Wallet/Wallet";
import Signup from "components/Auth/Signup";

const Activities = () => {
  const { user, fetchProfile, loggedInstate } =
    React.useContext<UserContextProps>(UserContext);
  const [loggedIn, setLoggedIn] = loggedInstate;
  const { showDialog } = useDialog();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const [totalDeposit, setTotalDeposit] = React.useState(0);

  const bonusImages = [
    FirstDeposit,
    SecondDeposit,
    ThirdDeposit,
    FourthDeposit,
  ];
  const BonusButton = () => {
    return (
      <button
        className={`px-[17px] py-[15px] text-[16px] rounded-[15px] sm:uppercase text-black font-GeogrotesqueWide hover:cursor-pointer md:px-[34px] md:text-[24px] font-[700] disabled:cursor-not-allowed  shadow-[0_5px_0px_0px_#EC7E0B] w-[150px] sm:w-[${
          isMobile ? "300px" : "240px"
        }] bg-[#FF9F25]`}
        onClick={() => {
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
              </UserContext.Provider>
            );
          } else {
            showDialog(<Signup fetchProfile={fetchProfile} />);
          }
        }}
      >
        {loggedIn ? "DEPOSIT" : "SIGNUP"}
      </button>
    );
  };

  useEffect(() => {
    if (user?.totalDepositCount) {
      setTotalDeposit(user.totalDepositCount);
    }
  }, [user]);

  return (
    <div className="w-full bg-[#15171B] border border-[#484848] rounded-[15px] p-[10px] sm:p-[30px] flex flex-col items-start mb-6">
      <div className="w-full rounded-[15px] bg-gradient-to-l from-[#E8C13D] to-[#A7CD02] px-[15px] py-[22px] sm:px-[40px]">
        <div className="flex justify-between items-center w-full gap-1">
          <h2 className="text-[14px] font-[500] sm:text-[32px] text-black mb-[10px]">
            GREAT BONUS FOR{" "}
            <span className="text-[#BF6D2D]">EVERY DEPOSIT</span>
          </h2>
          <p
            className="flex items-center cursor-pointer hidden sm:flex"
            onClick={() => showDialog(<Bonus />)}
          >
            Details <BiChevronRight />
          </p>
        </div>
        <div className="w-full sm:w-1/3 mx-[-15px] px-[15px] sm:px-0 sm:mx-0 py-[8px] bg-gradient-to-l from-[#E8C13D] to-[#AED404]">
          <h2 className="text-[22px] sm:text-[32px] font-[500] text-white">
            UPTO <span className="text-[#BF6D2D]">360%</span>
          </h2>
        </div>
        <p className="text-[16px] sm:text-[24px] font-[400] mt-[10px] sm:mt-0">
          Available for all players
        </p>
        <h2 className="text-[22px] sm:text-[34px] font-[500]">
          Before 3/16/2023
        </h2>

        {isMobile ? (
          <>
            <div className="mobile-bonus-content">
              {bonusImages.map((image, index) => {
                return (
                  <div
                  key={index}
                    className={`mobile-bonus-item ${
                      index === totalDeposit ? "active" : ""
                    }`}
                  >
                    <img src={image} alt="Bonus" />
                    {index !== 3 && (
                      <div className="chevronRight">
                        <img src={DoubleChevron} alt="" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="w-full text-center mt-[10px]">
              <BonusButton />
            </div>
          </>
        ) : (
          <div className="w-full flex bonus-row justify-between items-start mt-[10px] sm:mt-[40px]">
            {bonusImages.map((image, index) => {
              return (
                <div
                key={index}
                  className={`bonus-item ${
                    index === totalDeposit ? "active" : ""
                  }`}
                >
                  <img src={image} alt="Bonus" />
                  <BonusButton />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="w-full flex justify-end relative rounded-[15px] bg-gradient-to-l from-[#E8C13D] to-[#A7CD02] sm:p-[20px] sm:px-[40px] mt-[20px] sm:mt-[40px] overflow-hidden">
        <div className="relative w-full sm:w-max sm:ml-[200px] sm:my-[20px] mr-[-60px] sm:mr-[-150px] h-[200px] sm:h-[330px] overflow-hidden">
          <img
            src={Aura}
            alt=""
            className="w-[500px] sm:w-[600px] aspect-auto "
          />
          <img
            src={CryptoLock}
            alt=""
            className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-[150px] sm:w-[300px] aspect-auto"
          />
        </div>
        <div className="absolute flex flex-col sm:gap-2 md:gap-5 inset-0 p-[20px] sm:px-[40px]">
          <div className="flex justify-between items-center w-full gap-1">
            <h2 className="text-[16px] font-[500] uppercase sm:capitalize sm:text-[28px] text-white mb-[10px]">
              Bonus Unlock
            </h2>
            <p
              className="flex items-center cursor-pointer text-[12px] sm:text-[20px]"
              onClick={() => navigate("/activities/unlock")}
            >
              Details <BiChevronRight />
            </p>
          </div>
          <p className="w-[60%] text-[12px] font-[400] text-white sm:text-[24px]">
            Enjoy the game while unlocking USD to your wallet
          </p>
          <div className="w-max mt-[10px] sm:mt-[20px]">
            <div className="w-max">
              <p className="text-[10px] font-[400] sm:text-[20px] text-center">
                Unlocked
              </p>
              <p className="text-[14px] font-[500] sm:text-[29px] text-center">
                0.00 USD
              </p>
            </div>
            <hr className="border-t-2 border-[#949615]" />
            <div className="w-max">
              <p className="text-[10px] font-[400] sm:text-[20px] text-[#949615] text-center">
                Locked
              </p>
              <p className="text-[14px] font-[500] sm:text-[29px] text-center">
                <span className="text-[#949615]">0.00</span> USD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
