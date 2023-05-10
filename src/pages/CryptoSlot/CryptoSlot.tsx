import PageName from "components/PageName/PageName";
import BetBox from "./BetBox/BetBox";
import BetHistory from "./BetHistory/BetHistory";

import CryptoSlotPageImg from "assets/images/cryptoslot/cryptoslotpage.png";
import React, { useEffect } from "react";
import withAuthRedirect from "hoc/withAuthRedirect";
import { useLocalStorage } from "hooks/useLocalstorage";
import { CRYPTOProvider } from "context/CryptoContext";

const CryptoSlot: React.FC = () => {
  const [betHistory, setBetHistory] = useLocalStorage<any>("cryptoBetHistory", []);
  useEffect(() => {
    setBetHistory([]);
  }, []);
  return (
    <CryptoMarketplaceWrapper>
      <PageName iconSrc={CryptoSlotPageImg} title={"Crypto Slots"} />
      <BetBox />
      <BetHistory />
    </CryptoMarketplaceWrapper>
  );
};

export default withAuthRedirect(CryptoSlot);
interface Wrapper {
  children: React.ReactNode;
}
const CryptoMarketplaceWrapper: React.FC<Wrapper> = ({ children }) => {
  return <CRYPTOProvider>{children}</CRYPTOProvider>;
};
