import React from "react";
import cx from "classnames";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  onClick: Function;
  disabled?: boolean;
  className?: string;
};

const NormalButton: React.FC<Props> = ({
  children,
  onClick,
  disabled = false,
  className,
}) => {
  return (
    <button
      className={cx(
        "w-full bg-[#B0D512] shadow-[0_2px_0px_0px_#7D9806] px-[55px] py-[20px] rounded uppercase font-GeogrotesqueWide hover:cursor-pointer md:px-[55px] md:py-[13px] md:text-[16px] font-[600] disabled:cursor-not-allowed text-[#000] text-[16px]",
        className
      )}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default NormalButton;
