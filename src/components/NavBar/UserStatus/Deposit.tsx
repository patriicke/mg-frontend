import Image from 'components/Image/Image';

import walletImg from "assets/images/header/wallet.png";
import cx from 'classnames';

interface DepositProps {
  onClick: () => void;
}

const Deposit: React.FC<DepositProps> = ({ onClick }) => {
  return (
    <div
      className="flex flex-row items-center justify-center bg-gradient-to-r from-[#A7CD02] to-[#FEAD4D] rounded-[5px] p-[8px] cursor-pointer h-[34px] md:h-[47px]"
      onClick={onClick}
    >
      <div>
        <img src={walletImg} className={cx('w-[20px]', 'lg:w-[34px]')} alt="wallet" />
        {/* <Image defaultSrc={walletMobild} sources={[
          {
            resolution: '768',
            width: '21',
            src: walletDesktop
          }
        ]} /> */}
      </div>
      <h5 className="font-GeogrotesqueWide text-white text-[16px] hidden md:block ml-[8px] mt-[4px]">
        WALLET
      </h5>
    </div>
  );
};

export default Deposit;
