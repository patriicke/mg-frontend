import React from "react";
import cx from "classnames";

type Props = {
  primary?: boolean;
  children: string | JSX.Element | JSX.Element[];
  onClick: Function;
  disabled?: boolean;
};

const SignButton: React.FC<Props> = ({
  primary,
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={
        'w-full px-[17px] py-[9px] text-xs rounded uppercase font-GeogrotesqueWide hover:cursor-pointer md:px-[34px] md:py-[14px] md:text-[15px] font-[500] disabled:cursor-not-allowed ' +
        (primary
          ? "bg-primary-button-bg-color text-black shadow-[0_2px_0px_0px_#7D9806]"
          : "bg-second-button-bg-color text-white")
      }
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SignButton;
