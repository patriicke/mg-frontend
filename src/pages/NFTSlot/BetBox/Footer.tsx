import { ActionType, useSpin } from "context/SpinContext";
import Volume from "assets/svg/nftslot/Volume.";
import { useEffect, useState } from "react";
import Help from "assets/svg/nftslot/Help";
import Fairness from "assets/svg/nftslot/Fairness";
import Speed from "assets/svg/nftslot/Speed";
import cx from "classnames";
import useDialog from "hooks/useDialog";
import FairnessModal from "./FairnessModal";
import { NFTActionType, useNFT } from "context/NftContext";
import { useLocalStorage } from "hooks/useLocalstorage";

interface IFooter {}

const Footer = ({}: IFooter) => {
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
  const [clientSeed, setClientSeed] = useState("");
  const {
    state: { toggleSound, toggleBoost },
    dispatch,
  } = useSpin();
  const {
    state: { serverSeedHash },
    nftDispatch,
  } = useNFT();

  const [buttonState, setButtonState] = useState({
    fairness: false,
    speed: false,
    volume: true,
    help: false,
  });

  const { showDialog } = useDialog();

  useEffect(() => {
    if (clientSeed) {
      nftDispatch({ type: NFTActionType.SET_CLIENT_SEED, payload: clientSeed });
    }
  }, [clientSeed]);

  useEffect(() => {
    setFairness({
      ...fairness,
      clientSeed: "",
    });
    setClientSeed("");
  }, []);

  return (
    <div className="w-full bg-[#15171b] flex justify-end">
      <div className="h-[34px] md:h-[52px] xl:h-[72px] flex items-center gap-[9px] md:gap-[15px] xl:gap-[24px] pr-[9px] md:pr-[15px] xl:pr-[24px]">
        <Fairness
          onClick={() => {
            showDialog(
              <FairnessModal
                setSeed={setClientSeed}
              />
            );
          }}
          className={cx(
            "cursor-pointer hover:fill-[#B0D512]",
            { "fill-[#B0D512]": buttonState.fairness },
            { "fill-[#A6A6A6]": !buttonState.fairness }
          )}
        />
        <Speed
          className={cx(
            "cursor-pointer hover:fill-[#B0D512]",
            { "fill-[#B0D512]": buttonState.speed },
            { "fill-[#A6A6A6]": !buttonState.speed }
          )}
          onClick={() => {
            setButtonState({ ...buttonState, speed: !buttonState.speed });
            dispatch({
              type: ActionType.ToggleBoost,
              toggleBoost: !toggleBoost,
            });
          }}
        />
        <Help
          className={cx(
            "cursor-pointer hover:fill-[#B0D512]",
            { "fill-[#B0D512]": buttonState.help },
            { "fill-[#A6A6A6]": !buttonState.help }
          )}
          onClick={() => {
            setButtonState({ ...buttonState, help: !buttonState.help });
          }}
        />
        <Volume
          className={cx(
            "cursor-pointer hover:fill-[#B0D512]",
            { "fill-[#B0D512]": buttonState.volume },
            { "fill-[#A6A6A6]": !buttonState.volume }
          )}
          onClick={() => {
            setButtonState({ ...buttonState, volume: !buttonState.volume });
            dispatch({
              type: ActionType.ToggleSound,
              toggleSound: !toggleSound,
            });
          }}
        />
      </div>
    </div>
  );
};

interface IconWrapperProps {
  imgSrc: string;
  onClick: () => void;
}

export const IconButtonWrapper: React.FC<IconWrapperProps> = ({
  imgSrc,
  onClick,
}) => {
  return (
    <div
      className="w-[24px] h-[24px] flex-auto cursor-pointer"
      onClick={onClick}
    >
      <img src={imgSrc} alt="iconbutton" />
    </div>
  );
};

export default Footer;
