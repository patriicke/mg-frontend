import { useRef, useContext, useEffect, useState } from "react";
import { UserContextProps, UserContext } from "App";
import cx from "classnames";
import { toastError, toastWarning } from "components/ui/Toast";
import { NFTActionType, useNFT } from "context/NftContext";
// @ts-ignore
import clickSound from "../../../assets/sound/clicksound.mp3";
// @ts-ignore
import winSound from "../../../assets/sound/win.mp3";

import { useSpin, ActionType } from "context/SpinContext";
import { SpinPayload } from "interface/nft/nft.interface";
import { spin } from "services/nft.service";
import { errorParser } from "utils/error.utils";
import { generateClientSeed } from "utils/nft.utils";
import { useLocalStorage } from "hooks/useLocalstorage";
import Loop from "assets/images/nftslot/button/loop.png";
import { BET_AMOUNT } from "enum/nft.enum";

interface BetButtonProps {}

const BetButton: React.FC<BetButtonProps> = () => {
  const [fairness, setFairness] = useLocalStorage<{
    clientSeed: string;
    serverSeed: string;
    currentServerSeed?: string;
    loading?: boolean;
  }>("fairness", {
    clientSeed: "",
    serverSeed: "",
    currentServerSeed: "[]",
    loading: false,
  });
  const [betHistory, setBetHistory] = useLocalStorage<any>("betHistory", []);
  const { user } = useContext<UserContextProps>(UserContext);
  const audioRef = useRef<any>(null);
  const winAudioRef = useRef<any>(null);
  const [btnMsg, setBtnMsg] = useState("BET");
  const [serverSeed, setServerSeed] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [nftDetail, setNftDetail] = useState<{
    image: string;
    id: string;
  }>({
    image: "",
    id: "",
  });
  const {
    state: { isSpinning, inInterval, toggleSound, toggleLoop },
    dispatch,
  } = useSpin();

  const {
    state: { toggleButton, nft, nftPrice, changeType, price, clientSeed },
    nftDispatch,
  } = useNFT();

  const {
    state: { winRate },
  } = useNFT();

  const trimString = (str: string) => {
    if (!str) return "";
    return str.replace(/\s/g, "");
  };

  const stopClickHandler = () => {
    toggleLoop && dispatch({ type: ActionType.ToggleLoop, toggleLoop: false });
  };

  const spinCards = async () => {
    const payload: SpinPayload = {
      clientSeed: trimString(clientSeed) || generateClientSeed(),
      // chain: nft?.chain as string,
      tokenId: nft?.tokenId as string,
      nftAddress: nft?.contractAddress as string,
      changeType: changeType as string,
      winProbability: parseFloat(winRate as string),
      betAmount: parseFloat(price as string),
    };
    nftDispatch({ type: NFTActionType.TOGGLE_BUTTON, payload: true });
    const [response, error] = await spin(payload);
    if (response) {
      setFairness({
        ...fairness,
        serverSeed: "",
        currentServerSeed: response?.data?.data?.serverSeedHash,
      });
      setServerSeed(response?.data?.data?.serverSeed);
      setNftDetail({
        image: response?.data?.data?.image,
        id: response?.data?.data?.uuid,
      });

      const result = response.data.data.result;
      console.log(result, 'win or lose')
      setHasWon(result);
      dispatch({ type: ActionType.Spin, betResult: result });
    }
    if (error) {
      nftDispatch({ type: NFTActionType.TOGGLE_BUTTON, payload: false });
      dispatch({ type: ActionType.ToggleLoop, toggleLoop: false });
      errorParser(error);
    }
  };

  const betClickHandler = () => {
    let winRateValue: any = `${winRate}`;
    if (winRateValue && winRateValue.split(".").length > 1) {
      // remove all .and add only one .
      winRateValue = winRateValue.replace(/\.+/g, ".");      
      nftDispatch({ type: NFTActionType.SET_WIN_RATE, payload: winRateValue });
    }
    
    if (`${winRateValue}`.endsWith(".")) {
      winRateValue = `${winRateValue}0`;
      nftDispatch({ type: NFTActionType.SET_WIN_RATE, payload: winRateValue });
    }
    let betPrice = price;
    if (`${price}`.endsWith(".")) {
      betPrice = `${price}0`;
      nftDispatch({ type: NFTActionType.SET_BET_PRICE, payload: betPrice });
    }
    if (changeType === BET_AMOUNT && nftPrice) {
      let minAmount = (0.01 / 100) * nftPrice;
      if (Number(betPrice) < Math.floor(minAmount * 100) / 100) {
        return toastError(
          `Bet Price must be more than ${Math.floor(minAmount * 100) / 100}`
        );
      }
      if (Number(betPrice) > (98 / 100) * nftPrice) {
        return toastError(
          `Bet Price must be less than ${((98 / 100) * nftPrice).toFixed(2)}`
        );
      }
    } else {
      if (Number(winRateValue) < 0.01) {
        return toastError("Win Probability must be more than 0.01%");
      }
      if (Number(winRateValue) > 98) {
        return toastError("Win Probability must be less than 98%");
      }
    }
    if (user?.totalWalletBalance <= 0) {
      toastError("You have insufficient balance to continue", true);
    }
    if (
      !isSpinning &&
      user?.totalWalletBalance > 0 &&
      Number(winRateValue) > 0
    ) {
      spinCards();
    }
  };

  const handleLoopToggle = () => {
    if (!isSpinning && user?.totalWalletBalance > 0 && Number(winRate) > 0) {
      dispatch({ type: ActionType.ToggleLoop, toggleLoop: !toggleLoop });
    }
  };

  useEffect(() => {
    if (inInterval) {
      nftDispatch({ type: NFTActionType.TOGGLE_BUTTON, payload: true });
      setBtnMsg(hasWon ? "You Won" : "Try Next Time");
      setTimeout(() => {
        setFairness({
          ...fairness,
          serverSeed,
        });
        nftDispatch({ type: NFTActionType.TOGGLE_BUTTON, payload: false });
        setBtnMsg("BET");
        dispatch({
          type: ActionType.Interval,
          betResult: hasWon,
          inInterval: false,
        });
        setBetHistory([
          {
            id: nftDetail.id,
            won: hasWon,
            image: nftDetail.image,
          },
          ...betHistory,
        ]);
        if (toggleSound) {
          winAudioRef.current.pause();
        }
      }, 3000);
    }
    if (inInterval && hasWon && toggleSound) {
      winAudioRef.current.play();
    }
    if (!inInterval && toggleLoop) {
      betClickHandler();
    }
  }, [inInterval]);

  useEffect(() => {
    nftDispatch({ type: NFTActionType.TOGGLE_BUTTON, payload: false });
  }, []);

  return (
    <button
      className={cx(
        "w-full pb-1 rounded-[10px] bg-opacity-70 cursor-pointer",
        "md:mt-0",
        isSpinning || toggleLoop ? "bg-[#D51212]" : "bg-[#B0D412] "
      )}
      onClick={betClickHandler}
      disabled={isSpinning || toggleButton}
    >
      <audio ref={audioRef}>
        <source src={clickSound} type="audio/mpeg" />
      </audio>

      <audio ref={winAudioRef}>
        <source src={winSound} type="audio/mpeg" />
      </audio>

      <audio ref={audioRef}>
        <source src={clickSound} type="audio/mpeg" />
      </audio>
      <div
        className={cx(
          "relative shadow py-6 w-full flex justify-center font-bold text-[18px] leading-[22px] rounded-[10px] uppercase",
          "lg:py-[20px]",
          isSpinning || toggleLoop
            ? "bg-[#D41212] text-[#FFF]"
            : "bg-[#B0D512] text-[#000]"
        )}
        onClick={stopClickHandler}
      >
        {toggleLoop ? "STOP" : isSpinning ? "SPINNING..." : btnMsg}
        { 
          toggleLoop || isSpinning ?
          '' :
          <div
            className={cx(
              "absolute top-[50%] z-10 transform translate-y-[-50%] right-[20px] flex justify-center items-center rounded-full h-[50%] aspect-square",
              { "bg-[#B0D412]": !toggleLoop && !isSpinning },
              { "bg-[#7D9806]": toggleLoop && !isSpinning && inInterval },
              { "bg-[#D41212]": isSpinning && toggleLoop },
              { "bg-[#D41212]": inInterval && toggleLoop }
            )}
            onClick={handleLoopToggle}
          >
            {/* <Repeat fill="white" /> */}
            <img src={Loop} alt="" />
          </div>
        }
      </div>
    </button>
  );
};

export default BetButton;
