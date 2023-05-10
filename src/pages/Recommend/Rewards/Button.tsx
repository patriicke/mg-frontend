import cx from "classnames";

type ButtonProps = {
  children: string | JSX.Element | JSX.Element[];
  onClick: Function;
  disabled?: boolean;
  variant?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant,
  className
}) => {
  return (
    <button
      className={cx(
        "w-full px-[5px] py-[18px] rounded-[8px] uppercase font-GeogrotesqueWide hover:cursor-pointer font-[600] disabled:cursor-not-allowed text-[12px] max-w-[220px] max-h-[60px]",
        "lg:px-[14px] lg:py-[18px] lg:text-[14px]",
        variant
          ? "bg-[#15171B] text-[#FFF]"
          : "bg-[#B0D512] shadow-[0_2px_0px_0px_#7D9806] text-[#000]",
        className
      )}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;