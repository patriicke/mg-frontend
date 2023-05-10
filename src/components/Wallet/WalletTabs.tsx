import React from 'react';
import { Tabs } from './Wallet.constants';
import cx from 'classnames';

interface TabBarProps {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const WalletTabs: React.FC<TabBarProps> = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="w-full sm:px-10 px-[12px]">
      <div className="w-full flex flex-row justify-between border border-[#484848] p-4 rounded-full gap-1 sm:gap-3">
        {Tabs.map((tab, index) => {
          return (
            <button
              key={tab.value}
              onClick={() => setCurrentTab(tab.value)}
              className={cx(
                'py-[10px] px-[12px] md:py-[17px] md:px-[42px] text-[11px] md:text-[15px] font-bold rounded-full',
                tab.value === currentTab
                  ? 'text-black bg-[#B0D512] shadow'
                  : 'text-white',
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WalletTabs;
