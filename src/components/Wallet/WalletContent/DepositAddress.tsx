import React from 'react';
import QRCode from 'qrcode.react';
import useDialog from 'hooks/useDialog';
import { toastSuccess } from 'components/ui/Toast';

interface IProps {
  address: string;
}

const DepositAddress: React.FC<IProps> = ({address}) => {
  const {hideDialog} = useDialog();

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = document.createElement("textarea");
    input.value = address;
    document.body.appendChild(input);
    input.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(input);
    toastSuccess("Copied to clipboard!");
  };
  
  return (
    <div className="w-full h-max flex flex-col justify-center items-center border border-[#484848] px-4 py-2 rounded-lg gap-3">
      <p className="w-full text-left">Deposit Address</p>
      <div className="flex justify-center items-center w-[70%] h-48 border p-5 border-[#484848] rounded-lg m-5">
        <div className="w-1/2 text-center mx-2">
          <h2 className="font-bold uppercase text-[#A9A9A9]">QR</h2>
          <div className="mt-5 h-24 w-full flex items-center justify-center">
            <QRCode
              value={address}
              renderAs="canvas"
              style={{ height: '90px', width: '90px' }}
            />
          </div>
        </div>
        <div className="h-[95%] w-1 border-l-2 border-gray-400"></div>
        <div className="w-1/2 text-center mx-2">
          <h2 className="font-bold text-[#A9A9A9]">Address</h2>
          <div className=" mt-5 h-24 w-full flex items-center justify-center">
            <p className="text-white w-4/5 whitespace-normal break-words">
              {address}
            </p>
          </div>
        </div>
      </div>
      <button
        className="w-1/3 h-12 m-5 bg-[#B0D512] rounded-lg text-black font-medium text-lg uppercase"
        onClick={copyToClipboard}
      >
        Copy
      </button>
    </div>
  );
};

export default DepositAddress;
