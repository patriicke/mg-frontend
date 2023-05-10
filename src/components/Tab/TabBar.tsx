import cx from "classnames";

interface TabBarProps {
  currentTab: string;
  onClick: (tab: string) => void;
  tabs: string[];
}

const TabBar: React.FC<TabBarProps> = ({
  currentTab,
  onClick,
  tabs,
}) => {
  return (
    <div className='w-full max-w-[620px]'>
      <div className="w-full flex flex-row justify-between bg-gradient-to-r from-[#484848] to-[#343434] p-2 rounded-full gap-3">
        {tabs.map((tab, index) => {
          return (
            <button
              key={index}
              onClick={() => onClick(tab)}
              className={cx(
                "py-[12px] px-[15px] md:py-[17px] md:px-[42px] text-[11px] md:text-[15px] font-bold rounded-full",
                tab === currentTab
                  ? "text-black bg-[#B0D512] shadow"
                  : "text-white"
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
