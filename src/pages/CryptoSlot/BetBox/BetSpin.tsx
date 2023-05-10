import { useState, useEffect, useRef, useContext } from "react";

import { CardCount, RowCount } from "./BetBox.constant.dev";
import { v4 as uuidv4 } from "uuid";
import { useSpin, ActionType } from "context/SpinContext";
import { gsap } from "gsap";

import lostImg from "assets/images/nftslot/card/lost.png";
import cx from "classnames";
import { CardDimensionConfig } from "./BetBox.constant.dev";
import { useMediaQuery } from "react-responsive";

import { findLandPosition, useCardDimension } from "./utils";
import { useCRYPTO } from "context/CryptoContext";
import { SeedHashPayload } from "interface/crypto/crypto.interface";
import {
  UserContextProps,
  UserContext,
  HistoryContextProps,
  HistoryContext,
} from "App";
import { MY_BETS_VALUE } from "../BetHistory/BetHistory.constants";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { useLocalStorage } from "hooks/useLocalstorage";

interface Props {
  postSeedHash: (payload: SeedHashPayload) => Promise<void>;
  cryptoImage: string;
}

const BetSpin: React.FC<Props> = ({ postSeedHash, cryptoImage }) => {
  const [winNotification, setWinNotification] = useLocalStorage("winNotification", '');
  const { cardElemWidth, cardWidth, cardHeight, cardMargin } =
    useCardDimension();
  const [cards, setCards] = useState<boolean[]>([]);
  const [pickedNumbers, setPickedNumber] = useState<number[]>([]);
  const {
    state: { isSpinning, betResult, toggleBoost },
    dispatch,
  } = useSpin();
  const spinWheel = useRef<HTMLUListElement | null>(null);
  const spinWheelWrapper = useRef<HTMLDivElement | null>(null);
  const [duration, setDuration] = useState(5);
  const isMobile = useMediaQuery({ maxWidth: 1280 });
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const {
    state: { crypto, winRate, price, changeType, cryptoPrice },
  } = useCRYPTO();

  const { tabState, pageState } =
    useContext<HistoryContextProps>(HistoryContext);
  const [tab, setTab] = tabState;
  const [pageNumber, setPageNumber] = pageState;

  const { fetchProfile } = useContext<UserContextProps>(UserContext);

  const reDrawCards = (winRate: number) => {
    const rate = winRate > 100 ? 100 : Math.ceil(winRate);

    let newCards = new Array<boolean>(100).fill(false);

    const pickedNumbers = new Array<number>();
    for (let i = 0; i < rate; i += 1) {
      let random;
      do {
        random = Math.floor(Math.random() * CardCount);
      } while (newCards[random] === true);

      newCards[random] = true;
      pickedNumbers.push(random);
    }

    setPickedNumber(pickedNumbers);

    let newSpins = new Array<boolean>();
    for (let i = 0; i < RowCount; i += 1) {
      for (let j = 0; j < CardCount; j += 1) {
        newSpins.push(newCards[j]);
      }
    }

    setCards(newSpins);

    return pickedNumbers;
  };

  const spinTo = (toNumber: number) => {
    const rows = 2;
    const position = toNumber;

    let landingPosition = (rows * CardCount + position) * cardElemWidth;

    let randomize = Math.floor(Math.random() * cardWidth) - cardWidth / 2;

    landingPosition = (landingPosition + randomize) * -1;

    let resetTo = -1 * (position * cardElemWidth) - (isMobile ? -1 : 0);

    let tl = gsap.timeline();

    tl.to(spinWheel.current, {
      x: resetTo - (isMobile ? 20593 : 20600),
      duration: toggleBoost ? 0.3 : duration,
      ease: "power3.out",
    });
    tl.set(spinWheel.current, {
      x: resetTo,
      ease: "power1.out",
    });

    setTimeout(
      () => {
        if (betResult) {
          const newWinAmount = `$ ${(
            parseFloat(cryptoPrice?.toString() ?? "0") -
            parseFloat(price?.toString() ?? "0")
          ).toFixed(2)}`;
          setWinNotification(newWinAmount)
        }
        dispatch({ type: ActionType.Stop, betResult: false });
        // setActiveCardIndex(toNumber);
        if (crypto && winRate) {
          const payload = {
            tokenId: crypto?.id as string,
            symbol: crypto?.symbol as string,
            nftImage: crypto?.image as string,
            price: crypto?.currentPrice || 0,
            name: crypto?.name as string,
            changeType: changeType as string,
            winProbability: parseFloat(winRate as string),
            betAmount: parseFloat(price as string),
          };
          postSeedHash(payload);
        }
        fetchProfile();
        setTab(MY_BETS_VALUE);
        setPageNumber(Math.random());
      },
      toggleBoost ? 1000 : duration * 1000
    );
  };

  useEffect(() => {
    dispatch({ type: ActionType.setWinAmount, winAmount: '100' });
    let startPositionX = -cardElemWidth / 2 + 10; // to match card to the center
    let tl = gsap.timeline();
    tl.set(spinWheelWrapper.current, {
      x: startPositionX,
    });
  }, []);

  useEffect(() => {
    const newCards = [];

    for (let i = 0; i < RowCount; i += 1) {
      for (let j = 0; j < CardCount; j += 1) {
        newCards.push(false);
      }
    }

    setCards(newCards);
  }, []);

  useEffect(() => {
    reDrawCards(Number(winRate));
  }, [winRate]);

  useEffect(() => {
    if (isSpinning) {
      setActiveCardIndex(923);
      let newPosition = findLandPosition(pickedNumbers, betResult);
      let toNumber = newPosition + CardCount / 2;

      spinTo(toNumber);
      setTimeout(
        () => {
          setActiveCardIndex(newPosition);
        },
        toggleBoost ? 800 : duration * 800
      );
    }
  }, [isSpinning]);

  return (
    <div className="relative w-full py-[10px]">
      <div className="" ref={spinWheelWrapper}>
        <ul className="flex justify-center items-center" ref={spinWheel}>
          {cards.map((card, index) => {
            return (
              <Card
                key={uuidv4()}
                number={index % CardCount}
                win={card}
                image={cryptoImage}
                index={index}
                activeCardIndex={activeCardIndex}
              />
            );
          })}
        </ul>
      </div>
      <div className="absolute z-[2] h-[155px] top-[-2px] left-1/2 flex flex-col justify-between items-between">
        <BiCaretDown size={20} color="#A7CD02" />
        <BiCaretUp size={20} color="#A7CD02" />
      </div>
    </div>
  );
};

interface CardProps {
  number: number;
  win: boolean;
  image: string;
  index: number;
  activeCardIndex: number | null;
}

const Card: React.FC<CardProps> = ({
  number,
  win,
  image,
  index,
  activeCardIndex,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 1280 });
  return (
    <li className={cx("flex-auto mt-2")}>
      <div
        className={cx(
          isMobile
            ? CardDimensionConfig.mobile.width
            : CardDimensionConfig.desktop.width,
          isMobile
            ? CardDimensionConfig.mobile.height
            : CardDimensionConfig.desktop.height,
          isMobile
            ? CardDimensionConfig.mobile.margin
            : CardDimensionConfig.desktop.margin,
          "bg-[#15171B] flex flex-col justify-center items-center rounded-[7px] lg:rounded-[10px] overflow-hidden my-[10px]",
          {
            "border-2 border-[#A7CD02] h-[112px] w-[112px] shadow-selected":
              number === activeCardIndex,
          }
        )}
      >
        {/* <div className="text-white">{number}</div> */}
        <div className="h-full flex justify-center items-center ">
          {win ? (
            // <div className="relative">
            //   <div className="absolute top-0 bottom-0 left-[50%] transf translate-x-[-50%] w-[1px] bg-red-400"></div>
            <img className="h-full object-cover" src={image} alt="card" />
          ) : (
            // </div>
            // <div className="relative">
            //   <div className="absolute top-0 bottom-0 left-[50%] transf translate-x-[-50%] w-[1px] bg-red-400"></div>
            <img src={lostImg} alt="card" />
            // </div>
          )}
        </div>
      </div>
      {/* <h2 className="text-white text-2xl">{index}-{activeCardIndex}</h2> */}
    </li>
  );
};

export default BetSpin;
