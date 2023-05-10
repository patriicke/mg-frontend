import PageName from 'components/PageName/PageName';
import BetBox from './BetBox/BetBox';
import BetHistory from './BetHistory/BetHistory';

import NFTSlotPageImg from 'assets/images/nftslot/nftslot.page.png';
import React, { useEffect } from 'react';
import withAuthRedirect from 'hoc/withAuthRedirect';
import { useLocalStorage } from 'hooks/useLocalstorage';

const NFTSlot: React.FC = () => {
  const [betHistory, setBetHistory] = useLocalStorage<any>("betHistory", []);
  useEffect(() => {
    setBetHistory([]);
  },[]);
  return (
    <div>
      <PageName iconSrc={NFTSlotPageImg} title={'NFT Slots'} />
      <BetBox />
      <BetHistory />
    </div>
  );
};

export default withAuthRedirect(NFTSlot);
