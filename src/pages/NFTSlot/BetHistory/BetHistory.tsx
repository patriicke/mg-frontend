import TabBar from './TabBar';
import { useContext } from 'react';
import BetTable from './Tables';
import { HistoryContext, HistoryContextProps } from 'App';
import { SpinProvider } from 'context/SpinContext';

const BetHistory: React.FC = () => {
  // const [currentTab, setCurrentTab] = useState('all');
  const { tabState } = useContext<HistoryContextProps>(HistoryContext);
  const [tab, setTab] = tabState;

  return (
    <SpinProvider>
      <div className="w-full bg-[#15171B] border border-[#484848] rounded-[15px] py-[15px] flex flex-col items-start mb-6">
        <TabBar currentTab={tab} setCurrentTab={setTab} />
        <BetTable setCurrentTab={setTab} />
      </div>
    </SpinProvider>
  );
};

export default BetHistory;
