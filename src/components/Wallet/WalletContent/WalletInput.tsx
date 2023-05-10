import React from "react";
import Dollar from "assets/images/wallet/dollar.png";
import SvgLoader from "components/DynamicSvg";

interface IProps {
  value: string;
  disabled: boolean;
  className: string;
  imageSrc?: any;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  setError?: React.Dispatch<React.SetStateAction<any>>;
  error?: any;
}

const WalletInput: React.FC<IProps> = ({
  value,
  disabled,
  setValue,
  className,
  imageSrc,
  setError,
  error,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if value is number and greater than 0
    const isNumber = !isNaN(Number(e.target.value));
    isNumber && setValue && setValue(e.target.value);
    const isGreater = Number(e.target.value) > 0;
    if (!isNumber)
      return setError && setError({ amount: "Value must be valid number" });
    if (!isGreater)
      return setError && setError({ amount: "Value should be greater than 0" });
    setError && setError({ amount: "" });
  };
  return (
    <div className={className}>
      <div
        className={`flex items-center h-full justify-between items-center p-4 rounded-lg cursor-pointer text-white bg-[#15171B] border-2 text-base font-medium ${
          error?.amount ? "border-red-400" : "border-[#343434]"
        } ${imageSrc ? 'gap-2' : 'gap-1'}`}
      >
        {imageSrc ? (
          <div className="min-w-[20px] h-20px">
            <SvgLoader name={imageSrc}  />
          </div>
        ) : (
          <img src={Dollar} alt="dollar" className="w-3 mr-2 aspect-auto" />
        )}
        <input
          type="text"
          value={value}
          disabled={disabled}
          onChange={onChange}
          className="w-full h-full bg-transparent outline-none"
        />
      </div>
    </div>
  );
};

export default WalletInput;
