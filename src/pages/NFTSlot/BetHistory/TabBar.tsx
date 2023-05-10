import { Tabs } from './BetHistory.constants';
import cx from 'classnames';

interface TabBarProps {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const TabBar: React.FC<TabBarProps> = ({ currentTab, setCurrentTab }) => {
  const tabClickHandler = (value: string) => {
    setCurrentTab(value);
  };
  return (
    <div className="w-full sm:w-1/2 px-[12px]">
      <div className="w-full flex flex-row justify-between bg-gradient-to-r from-[#484848] to-[#343434] p-2 rounded-full gap-3">
        {Tabs.map((tab, index) => {
          return (
            <button
              key={tab.value}
              onClick={() => tabClickHandler(tab.value)}
              className={cx(
                'py-[12px] px-[15px] md:py-[17px] md:px-[42px] text-[11px] md:text-[15px] font-bold rounded-full',
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

export default TabBar;
