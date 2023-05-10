import cx from "classnames";

import { useState, useEffect } from "react";
import { getBonusInfo } from "services/recommend.service";
import { errorParser } from "utils/error.utils";

const HowTo: React.FC = () => {
  const [bonusInfo, setBonusInfo] = useState([{
    title: '',
    value: ''
  }]);

  const getReferralBonusInfo = async () => {
    const [response, error] = await getBonusInfo();
    if (response) {
      const dataArray = Object.entries(response.data.data).map(
        ([key, value]) => ({
          title: key,
          value: value as string,
        }),
      );
      setBonusInfo(dataArray);
    }
    if (error) {
      errorParser(error);
    }
  };

  useEffect(() => {
    getReferralBonusInfo();
  }, []);

  return (
    <div>
      <div
        className={cx('text-[20px] font-[700]', 'lg:text-[28px] lg:mb-[20px]')}
      >
        HOW DOES THE INVITATIONS BONUS WORK?
      </div>
      <div className="bg-[#0F1012] bg-gradient-to-b from-transparent via-transparent to-[#B0D412] bg-bottom bg-cover py-[25px] px-[20px] rounded-[15px] border border-[#0F1012]">
        <div className="mb-[8px]">
          <div
            className={cx(
              'text-center text-[18px] font-[500] mb-[9px]',
              'lg:text-left lg:text-[24px] lg:mb-[20px]',
            )}
          >
            Invitation Bonus
          </div>
          <div className="text-[15px] lg:text-[18px]">
            Each deposit User can receive at least{' '}
            <span className="text-[#BF6D2D]">5</span> for each invite . The more
            people you invite, the greater there invite bonus for corresponding
            level.
          </div>
        </div>
        <div className="flex flex-col gap-[15px]">
          <div className="flex justify-between gap-[14px]">
            <Card value="Cumulative Deposit" color="#ffffff"></Card>
            <Card value="Bonus" color="#ffffff"></Card>
          </div>
          {bonusInfo.map((bonus, index) => {
            return (
              <div className="flex justify-between gap-[14px]">
                <Card value={bonus.title} color="#BF6D2D" />
                <Card value={bonus.value} color="#DEFC5C" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  value: string;
  color: string;
}

const Card: React.FC<CardProps> = ({ value, color }) => {
  return (
    <div
      className={cx(
        `h-[50px] flex justify-center w-full items-center bg-[#3a3a3a] rounded-[10px] text-[${color}]`,
        'h-[72px]',
      )}
    >
      {value}
    </div>
  );
};

export default HowTo;
