import cx from 'classnames';

import Button from './Button';
import { useEffect, useState } from 'react';
import { getBonusDetails } from 'services/recommend.service';
import { errorParser } from 'utils/error.utils';

const InviteStatus: React.FC = () => {
  const [bonusDetails, setBonusDetails] = useState({
    invitedUsersCount: 0,
    firstDepositsCount: 0,
    referralPoints: 0,
  });

  const getReferralBonusDetails = async () => {
    const [response, error] = await getBonusDetails();
    if (response) {
      setBonusDetails(response.data.data);
    }
    if (error) {
      errorParser(error);
    }
  };

  useEffect(() => {
    getReferralBonusDetails();
  }, [])

  return (
    <div
      className={cx(
        'flex flex-wrap bg-[#15171B] justify-between items-center px-[18px] py-[20px] rounded-[5px] mb-[25px] gap-[20px] lg:gap-10',
        'lg:rounded-[15px] lg:px-[30px] lg:py-[28px]',
      )}
    >
      <ShowItem title="Invite Users" value={String(bonusDetails.invitedUsersCount)} />
      <ShowItem
        title="First time Depositing"
        value={String(bonusDetails.firstDepositsCount)}
      />
      <ShowItem title="Invite Bonus" value={String(bonusDetails.referralPoints)} />
      <button onClick={() => {}} className={cx(
        "w-full py-[10px] md:px-[5px] md:py-[18px] rounded-[8px] uppercase font-GeogrotesqueWide hover:cursor-pointer font-[600] disabled:cursor-not-allowed text-[12px] max-w-[140px] max-h-[35px] md:max-w-[220px] md:max-h-[60px]",
        "lg:px-[14px] lg:py-[18px] lg:text-[14px]","bg-[#B0D512] shadow-[0_2px_0px_0px_#7D9806] text-[#000]")}>WITHDRAW</button>
    </div>
  );
};

interface ShowItemProps {
  value: string;
  title: string;
}
const ShowItem: React.FC<ShowItemProps> = ({ value, title }) => {
  return (
    <div className="min-w-[100px] md:min-w-[150px] flex flex-col-reverse lg:flex-col items-start lg:items-center">
      <div
        className={cx(
          'text-[14px] font-[400] text-orange-color mb-2',
          'lg:text-[18px]',
        )}
      >
        {title}
      </div>
      <div
        className={cx(
          'text-[15px] font-[500]',
          'lg:text-[24px] lg:flex lg:justify-center lg:items-center lg:rounded-full lg:border-[#484848] lg:w-[80px] lg:h-[80px] lg:border-[2px] lg:mb-[5px] lg:self-center',
        )}
      >
        {value}
      </div>
    </div>
  );
};

export default InviteStatus;
