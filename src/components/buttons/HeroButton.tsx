import React from "react";

type Props = {
  variant?: boolean;
  children: string | JSX.Element | JSX.Element[];
  onClick: Function;
  disabled?: boolean;
};

const HeroButton: React.FC<Props> = ({
  variant,
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={
        'px-[17px] py-[9px] text-[12px] rounded-lg uppercase font-GeogrotesqueWide hover:cursor-pointer md:px-[34px] md:py-[10px] md:text-[15px] font-[500] disabled:cursor-not-allowed  shadow-[0_2px_0px_0px_#cfaa43] ' +
        (variant
          ? "w-full md:w-1/3 bg-brown text-white"
          : " w-[140px] bg-brown text-white")
      }
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default HeroButton;
