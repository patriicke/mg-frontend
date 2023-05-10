import cx from "classnames";
import { NFTActionType, useNFT } from "context/NftContext";
import { BET_AMOUNT, WIN_PROBABILITY } from "enum/nft.enum";
import React from "react";

import * as core from "./core";
import { Options, CustomInputElement, MINUS } from "./core";
import NumberFormat from "./number-format";
import defaultOptions from "./options";
import { toastError } from "components/ui/Toast";
import { round } from "lodash";

interface StatusItemProps {
  title: string;
  value: string;
  nftPrice: number;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setCorrespondingValue: React.Dispatch<React.SetStateAction<string>>;
}

const StatusItem: React.FC<StatusItemProps> = ({
  title,
  value,
  nftPrice,
  setCorrespondingValue,
  setValue,
}) => {
  const {
    state: { toggleButton },
    nftDispatch,
  } = useNFT();

  const minButtonHandler = () => {
    if (toggleButton) return;
    if (title === "Price") {
      const newPrice =
        (parseFloat((0.01).toString()) / 100) * parseFloat(nftPrice.toString());
      priceChangeHandler(newPrice.toString());
    }
    if (title === "Win Chance") winRateChangeHandler("0.01");
  };

  const maxButtonHandler = () => {
    if (toggleButton) return;
    if (title === "Price") {
      const newPrice =
        (parseFloat((98).toString()) / 100) * parseFloat(nftPrice.toString());
      priceChangeHandler(newPrice.toString());
    }
    if (title === "Win Chance") winRateChangeHandler("98");
  };

  const negClickHandler = () => {
    if (toggleButton) return;
    let subFive = parseFloat(value) - 5;

    let newValue = subFive.toFixed(2);

    if (
      subFive <
      (title === "Win Chance"
        ? 0.001
        : (parseFloat((0.001).toString()) / 100) *
          parseFloat(nftPrice.toString()))
    ) {
      return;
    }

    if (title === "Price") {
      priceChangeHandler(newValue);
    }
    if (title === "Win Chance") winRateChangeHandler(newValue);
  };

  const posClickHandler = () => {
    if (toggleButton) return;
    let addFive = parseFloat(value) + 5;

    let newValue = addFive.toFixed(2);
    if (
      addFive >
      (title === "Win Chance"
        ? 98
        : (parseFloat((98).toString()) / 100) * parseFloat(nftPrice.toString()))
    )
      return;
    if (title === "Price") priceChangeHandler(newValue);
    if (title === "Win Chance") winRateChangeHandler(newValue);
  };

  const roundOff = (roundingNumber: any, place: number): number => {
    return (
      Math.floor(roundingNumber * Math.pow(10, place)) / Math.pow(10, place)
    );
  };

  const winRateChangeHandler = (value: string) => {
    // if (isNaN(parseFloat(value))) {
    //   setValue("0");
    //   setCorrespondingValue("0");
    // }
    setValue(value);
    nftDispatch({
      type: NFTActionType.SET_WIN_RATE,
      payload: value,
    });
    // if (parseFloat(value) < 0.01) {
    //   toastError("Win Probability must be more than 0.01%");
    // }
    // if (parseFloat(value) > 98) {
    //   toastError("Win Probability must be less than equal to 98%");
    // }
    if (roundOff(value, 2) <= 98 && roundOff(value, 2) >= 0.01) {
      const newPrice = roundOff((parseFloat(value) / 100) * nftPrice, 2);

      setCorrespondingValue(String(newPrice));
      nftDispatch({
        type: NFTActionType.SET,
        payload: {
          winRate: value.endsWith(".") ? value.toString() : parseFloat(value),
          price: newPrice,
          changeType: WIN_PROBABILITY,
        },
      });
    }
  };

  const priceChangeHandler = (value: string) => {
    setValue(value);
    nftDispatch({
      type: NFTActionType.SET_BET_PRICE,
      payload: value,
    });
    if (!value) {
      nftDispatch({
        type: NFTActionType.SET_WIN_RATE,
        payload: 0,
      });
      return;
    }
    if (roundOff(value, 2) >= 0 && roundOff(value, 2) <= nftPrice) {
      const newWinRate = roundOff((parseFloat(value) / nftPrice) * 100, 2);
      // (parseFloat(value.toString()) / parseFloat(nftPrice.toString())) * 100;
      if (Number(newWinRate) > 98) {
        toastError("Win Probability must be less than equal to 98%");
        // return false;
      } else {
        setCorrespondingValue(String(newWinRate));
        nftDispatch({
          type: NFTActionType.SET,
          payload: {
            winRate: newWinRate,
            price: value.endsWith(".") ? value.toString() : roundOff(value, 2),
            changeType: BET_AMOUNT,
          },
        });
      }
    }
    // if (parseFloat(value) < 0) {
    //   toastError("Bet Amount must be more than $0");
    // }
    // if (parseFloat(value) > parseFloat(nftPrice.toString())) {
    //   toastError(`Bet Amount must not exceed $${nftPrice}`);
    // }
  };

  // useEffect(() => {
  //   const parsedValue = setTimeout(() => {
  //     if (value.toString().endsWith('.')) {
  //       setValue(value + '0');
  //     }
  //   }, 1000);

  //   return () => clearTimeout(parsedValue);
  // }, [value]);

  return (
    <div
      className={cx(
        "flex flex-row items-center justify-between w-full md:w-auto",
        "xl:gap-[22px]"
      )}
    >
      <Title>{title}</Title>
      <div className="bg-[#0F1012] p-[5px] border border-[#484848] backdrop-blur-[25px] rounded-[10px] flex flex-row gap-1 items-center">
        <LeftButton
          handleMinClick={minButtonHandler}
          handleNegClick={negClickHandler}
        />
        <Input
          disabled={toggleButton}
          value={value}
          onChange={
            title === "Price" ? priceChangeHandler : winRateChangeHandler
          }
          addOn={title === "Price" ? "$" : "%"}
        />
        <RightButton
          handleMaxClick={maxButtonHandler}
          handlePosClick={posClickHandler}
        />
      </div>
    </div>
  );
};

interface TitleProps {
  children: string | JSX.Element;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <div
      className={cx(
        "font-medium text-[16px] leading-[20px] text-center opacity-80 text-white",
        "md:text-[20px] md:leading-[24px] md:pl-[40px]",
        "lg:text-[18px] lg:leading-[21px] lg:pl-0",
        "xl:pl-0"
      )}
    >
      {children}
    </div>
  );
};

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  addOn: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ value, onChange, addOn, disabled }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  // const [value, setValue] = useState<InputType>();

  const updateValue = (
    el: CustomInputElement,
    { emit = true, force = false, clean = false } = {}
  ) => {
    const options = Object.assign(core.cloneDeep(defaultOptions));
    const { oldValue } = el;
    const { reverseFill, max, min } = options;
    const currentValue = el.value;

    if (force || oldValue !== currentValue) {
      const number = new NumberFormat(options).clean(clean && !reverseFill);
      let masked = number.format(currentValue);
      let unmasked = number.clean(!reverseFill).unformat(currentValue);

      // check value with in range max and min value
      if (clean) {
        if (Number(max) === max && Number(unmasked) > max) {
          masked = number.format(max);
          unmasked = number.unformat(max);
        } else if (Number(min) === min && Number(unmasked) < min) {
          masked = number.format(min);
          unmasked = number.unformat(min);
        }
      }

      el.oldValue = masked;
      el.masked = masked;
      el.unmaskedValue = unmasked;

      // if (el.value !== masked) {
      el.value = masked;

      onChange(el.value);
      // }
    }
  };

  const keydownHandler = (event: KeyboardEvent, el: CustomInputElement) => {
    const options = Object.assign(core.cloneDeep(defaultOptions));
    const { decimal, min, separator } = options as Options;
    const { key } = event;
    const newValue = el.value;
    const canNegativeInput =
      min === undefined || Number(min) < 0 || Number(min) !== min;

    if (key === decimal) {
      if (newValue.includes(decimal)) {
        event.preventDefault();
      } else if (!newValue) {
        el.value = "0" + decimal;
        // setValue("0" + decimal);
        // trigger input event
        el.dispatchEvent(new Event("input"));
      }
    } else if (key === MINUS && !canNegativeInput) {
      event.preventDefault();
    } else if (key === "Backspace") {
      // check current cursor position is after separator when backspace key down
    }
  };

  const handleKeyDown = (event: any) => {
    const { key } = event;
    const allowedKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      ".",
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];
    if (!allowedKeys.includes(key)) {
      event.preventDefault();
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <div>
      <div className="relative h-full flex items-center opacity-90 bg-[#15171B] rounded-[5px] text-center mx-1 px-1">
        {addOn === "$" && (
          <span
            className={cx(
              " text-[11px] md:text-[15px] w-[13px]",
              disabled ? "text-[#484848]" : "text-[#DEFC5C]"
            )}
          >
            {addOn}
          </span>
        )}
        <input
          // ref={inputRef}
          type="text"
          disabled={disabled}
          onChange={changeHandler}
          onKeyDown={handleKeyDown}
          value={value}
          className={cx(
            "w-[70px] h-[44px] px-[15px] my-auto mx-2 flex justify-center items-center text-[11px] md:text-[15px] opacity-90 bg-[#15171B] rounded-[5px] text-center px-[4px]",
            "sm:w-[130px]",
            "md:w-[210px] md:h-[44px]",
            "lg:w-[125px]",
            "xl:w-[125px]",
            disabled ? "text-[#484848]" : "text-[#DEFC5C]"
          )}
        />
        {addOn === "%" && (
          <span
            className={cx(
              " text-[11px] md:text-[15px] w-[13px]",
              disabled ? "text-[#484848]" : "text-[#DEFC5C]"
            )}
          >
            {addOn}
          </span>
        )}
      </div>
      <p className="uppercase text-[#848484] text-[12px] text-center">Stake</p>
    </div>
  );
};

const LeftButton: React.FC<any> = ({ handleMinClick, handleNegClick }) => {
  return (
    // <div
    //   className={cx(
    //     'flex flex-col items-center justify-center py-[5px] w-[48px] bg-gradient-to-b from-[#A7A5A5] to-[#6D6D6D] text-white text-center rounded-l-full cursor-pointer',
    //     'sm:py-[7px] sm:w-[62px]',
    //     'md:py-[10px] md:w-[72px]',
    //     'lg:py-[9px] lg:w-[62px]',
    //     'xl:py-[9px] xl:w-[62px]',
    //   )}
    //   onClick={onClick}
    // >
    //   <h3
    //     className={cx(
    //       'text-[12px]',
    //       'sm:text-[14px]',
    //       'md:text-[16px]',
    //       'lg:text-[14px]',
    //     )}
    //   >
    //     Min
    //   </h3>

    //   <p
    //     className={cx(
    //       'text-[10px]',
    //       'sm:text-[10px]',
    //       'md:text-[14px]',
    //       'lg:text-[10px]',
    //     )}
    //   >
    //     {'(-5)'}
    //   </p>
    // </div>
    <div className="flex flex-col items-center justify-center gap-1">
      <button
        className={cx(
          "flex flex-col items-center justify-center py-[5px] w-[48px] bg-[#484848] text-white text-center rounded-[5px] cursor-pointer",
          "sm:py-[5px] sm:w-[62px]",
          "md:py-[5px] md:w-[72px]",
          "lg:py-[5px] lg:w-[62px]",
          "xl:py-[3px] xl:w-[62px]"
        )}
        onClick={handleNegClick}
      >
        <h3 className={cx("text-[14px]")}>{"-"}</h3>
      </button>
      <button
        className={cx(
          "flex flex-col items-center justify-center py-[5px] w-[48px] bg-[#484848] text-white text-center rounded-[5px] cursor-pointer",
          "sm:py-[5px] sm:w-[62px]",
          "md:py-[5px] md:w-[72px]",
          "lg:py-[5px] lg:w-[62px]",
          "xl:py-[5px] xl:w-[62px]"
        )}
        onClick={handleMinClick}
      >
        <h3 className={cx("text-[12px] uppercase")}>Min</h3>
      </button>
    </div>
  );
};

const RightButton: React.FC<any> = ({ handleMaxClick, handlePosClick }) => {
  return (
    // <div
    //   className={cx(
    //     'flex flex-col items-center justify-center py-[5px] w-[48px] bg-gradient-to-b from-[#A7A5A5] to-[#6D6D6D] text-white text-center rounded-r-full cursor-pointer',
    //     'sm:py-[7px] sm:w-[62px]',
    //     'md:py-[10px] md:w-[72px]',
    //     'lg:py-[9px] lg:w-[62px]',
    //     'xl:py-[9px] xl:w-[62px]',
    //   )}
    //   onClick={onClick}
    // >
    //   <h3
    //     className={cx(
    //       'text-[12px]',
    //       'sm:text-[14px]',
    //       'md:text-[16px]',
    //       'lg:text-[14px]',
    //     )}
    //   >
    //     Max
    //   </h3>
    //   <p
    //     className={cx(
    //       'text-[10px]',
    //       'sm:text-[10px]',
    //       'md:text-[14px]',
    //       'lg:text-[10px]',
    //     )}
    //   >
    //     {'(+5)'}
    //   </p>
    // </div>
    <div className="flex flex-col items-center justify-center gap-1">
      <button
        className={cx(
          "flex flex-col items-center justify-center py-[5px] w-[48px]  bg-[#484848] text-white text-center rounded-[5px] cursor-pointer",
          "sm:py-[5px] sm:w-[62px]",
          "md:py-[5px] md:w-[72px]",
          "lg:py-[5px] lg:w-[62px]",
          "xl:py-[5px] xl:w-[62px]"
        )}
        onClick={handlePosClick}
      >
        <h3 className={cx("text-[12px]")}>{"+"}</h3>
      </button>
      <button
        className={cx(
          "flex flex-col items-center justify-center py-[5px] w-[48px]  bg-[#484848] text-white text-center rounded-[5px] cursor-pointer",
          "sm:py-[5px] sm:w-[62px]",
          "md:py-[5px] md:w-[72px]",
          "lg:py-[5px] lg:w-[62px]",
          "xl:py-[5px] xl:w-[62px]"
        )}
        onClick={handleMaxClick}
      >
        <h3 className={cx("text-[12px] uppercase")}>Max</h3>
      </button>
    </div>
  );
};

export default StatusItem;
