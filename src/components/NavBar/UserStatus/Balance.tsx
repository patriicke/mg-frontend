import moneyImg from "assets/images/header/money.png";

import cx from 'classnames';

interface BalanceProps {
  balance: string;
}

const Balance: React.FC<BalanceProps> = ({ balance }) => {
  return (
    <div className='flex flex-row h-[34px] md:h-[47px] items-center p-[6px] md:px-3 md:py-1 border border-[#3E3E3E] bg-[#15171B] rounded-[5px] hover:cursor-pointer'>
      <div className="mr-[10px]">
        <img src={moneyImg} className={cx('w-[21px]', 'lg:w-[34px]')} alt='money' />
      </div>
      <h5 className='font-GeogrotesqueWide text-text-balance-color text-[14px] md:text-[20px] font-[500]'>
        $&nbsp;{balance}
      </h5>
    </div>
  );
};

export default Balance;
