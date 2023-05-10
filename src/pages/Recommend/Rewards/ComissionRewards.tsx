import TabBar from "components/Tab/TabBar";
import { ComissionCategories } from "./Rewrds.constants";
import { PieChart } from "react-minimal-pie-chart";
import Button from "./Button";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import cx from "classnames";
import diagramImg from "assets/images/recommend/diagram.png";
import diagramImgLg from "assets/images/recommend/diagram.lg.png";
import dialogBgImg from "assets/images/recommend/dialog-bg.png";
import { useState } from "react";
import moment from "moment";

const ComissionRewards: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('LATEST')
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());

  const onTabChange = (tab: string) => {
    setCurrentTab(tab)
  }
  return (
    <div className="">
      <TabBar
        tabs={ComissionCategories}
        currentTab={currentTab}
        onClick={onTabChange}
      />
      <div
        className={cx(
          'grid grid-cols-2 gap-[20px] my-[17px]',
          'lg:grid-cols-4',
        )}
      >
        <Card title="CTR" value="10" />
        <Card title="CTR" value="10" />
        <Card title="CTR" value="10" />
        <Card title="CTR" value="10" />
      </div>
      {currentTab === 'CUSTOM' && (
        <div className="pt-5">
          <h2 className="text-[20px] font-[700] sm:text-[28px]">Select Period</h2>
          <div className="flex justify-center sm:justify-start gap-3 py-10 pt-5">
            <div className="w-1/3 sm:w-[25%] h-14 border rounded-lg border-[#484848]">
              <DatePicker
                selected={fromDate}
                onChange={(date: Date) => setFromDate(date)}
                customInput={
                  <div className="w-full flex justify-between items-center">
                    <img
                      src="assets/images/wallet/calendar.png"
                      alt="Calendar"
                      className="w-4 h-4"
                    />
                    <input
                      type="text"
                      disabled
                      className="bg-transparent w-full px-3"
                      value={moment(fromDate).format('DD/MM/YYYY')}
                    />
                  </div>
                }
                dateFormat="dd/MM/yyyy"
                className="w-full p-3 bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-none focus:border-transparent"
              />
            </div>
            <div className="w-1/3 sm:w-[25%] h-14 border rounded-lg border-[#484848]">
              <DatePicker
                selected={toDate}
                onChange={(date: Date) => setToDate(date)}
                customInput={
                  <div className="w-full flex justify-between items-center">
                    <img
                      src="assets/images/wallet/calendar.png"
                      alt="Calendar"
                      className="w-4 h-4"
                    />
                    <input
                      type="text"
                      disabled
                      className="bg-transparent w-full px-3"
                      value={moment(toDate).format('DD/MM/YYYY')}
                    />
                  </div>
                }
                dateFormat="dd/MM/yyyy"
                filterDate={(date: Date) => date > fromDate}
                className="w-full p-3 bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-none focus:border-transparent"
              />
            </div>
            <div className="w-1/3 sm:w-[25%]">
              <Button onClick={() => {}}>Refresh Period</Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mb-[28px] lg:mb-[40px]">
        <Button onClick={() => {}}>WITHDRAW</Button>
      </div>
      <div className="">
        <div
          className={cx(
            'text-[20px] font-[700]',
            'lg:text-[28px] lg:mb-[32px]',
          )}
        >
          HOW TO GET COMMISSION ON YOUR BETS
        </div>
        <div
          className={cx(
            'relative px-[12px] py-[15px] bg-[#0F1012] bg-gradient-to-r from-[#000000] to-[#66B585] rounded-[15px] text-[14px] font-[400]',
            'lg:text-[18px]',
          )}
        >
          <div className="w-full lg:max-w-[60%] relative z-0 lg:z-[1]">
            <p className="mb-[7px] lg:mb-[12px]">
              This will be your long-term income and you will receive a
              different percentage of commission each time a player you invite
              places a bet.
            </p>
            <div>
              <h2 className="font-[500]">GET YOUR 25% COMMISSION REWARDS</h2>
              <p>
                You will receive commission rewards every time your friends
                place wager based on the games.
              </p>
              <ul className="list-disc pl-[20px]">
                <li>
                  In any public environment (for example, universities, schools,
                  libraries, and office spaces), only one commission can be paid
                  to each user, IP address,electronic device, home, phone
                  number, billingmethod, email address, and computer and IP
                  address shared with others.
                </li>
                <li>
                  Our decision to draw a bet will be based entirely on our
                  discretion after a deposit is made and a bet issuccessfully
                  placed.Commissions can be withdrawn into our internal
                  MODERN.GAME wallet from the dashboard at anytime. (View your
                  commission extraction in the dashboard and view the balance in
                  the wallet).
                </li>
                <li>The system calculates the commission every 24 hours.</li>
              </ul>
            </div>
          </div>
          <div className="w-full flex justify-center mt-[12px] lg:mt-[24px]">
            <img className="w-full lg:hidden" src={diagramImg} alt="diagram" />
            <img className="hidden lg:block" src={diagramImgLg} alt="diagram" />
          </div>
          <div className="hidden lg:block lg:absolute lg:top-0 lg:right-0">
            <img src={dialogBgImg} alt="money" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  value: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div
      className={cx(
        'rounded-[15px] bg-[#484848] hover:bg-gradient-to-l from-[#E8C13D] to-[#B0D412]',
      )}
    >
      <div
        className={cx(
          'flex flex-col items-center bg-[#15171b] p-[12px] rounded-[15px] m-[1px]',
          'lg:py-[22px] lg:gap-[12px]',
        )}
      >
        <div className={cx('w-[75px] h-[75px]', 'lg:w-[98px] lg:h-[98px]')}>
          <PieChart
            data={[
              { title: 'One', value: 10, color: '#484848' },
              { title: 'Three', value: 90, color: '#B0D512' },
            ]}
            lineWidth={20}
          />
        </div>
        <div className="mt-[10px] lg:mt-0">{value}</div>
        <div
          className="bg-gradient-to-r text-transparent bg-clip-text from-[#A7CD02] to-[#FEAD4D]"
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default ComissionRewards;
