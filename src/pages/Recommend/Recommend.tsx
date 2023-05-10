import withAuthRedirect from 'hoc/withAuthRedirect';
import Invite from './Invite/Invite';
import Rewards from './Rewards/Rewards';
import BetHistory from 'pages/NFTSlot/BetHistory/BetHistory';
import PageName from 'components/PageName/PageName';
import recommendImg from 'assets/images/footerMobile/recommend.png';

const Recommend: React.FC = () => {
  return (
    <div className="relative flex flex-col gap-[20px]">
      <PageName iconSrc={recommendImg} title="Recommend Plans" />
      <Invite />
      <Rewards />
      <BetHistory />
    </div>
  );
};

export default withAuthRedirect(Recommend);
