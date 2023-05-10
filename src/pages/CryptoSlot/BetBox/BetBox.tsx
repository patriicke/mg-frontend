import { useEffect, useState } from "react";

import cx from "classnames";

import BetSpin from "./BetSpin";
import Footer from "./Footer";
import StatusItem from "./StatusItem/StatusItem";
import BetButton from "pages/CryptoSlot/BetBox/BetButton";
import CryptoInfo from "./CryptoInfo";

import { SpinProvider } from "context/SpinContext";
import { CRYPTOActionType, useCRYPTO } from "context/CryptoContext";
import { serverSeedHash } from "services/crypto.service";
import { errorParser } from "utils/error.utils";
import { Toaster } from "components/ui/Toast";
import { SeedHashPayload } from "interface/crypto/crypto.interface";
import BetHistory from "./BetHistory";
import { useLocalStorage } from "hooks/useLocalstorage";

const BetBox: React.FC = () => {
  const [fairness, setFairness] = useLocalStorage<{
    clientSeed: string;
    serverSeed: string;
    currentServerSeed?: string;
    loading?: boolean;
  }>("cryptoFairness", {
    clientSeed: "",
    serverSeed: "",
    currentServerSeed: "[]",
    loading: false,
  });
  const [winChance, setWinChance] = useState("0");
  const {
    state: { crypto, winRate, price, changeType },
    cryptoDispatch,
  } = useCRYPTO();
  const [betPrice, setBetPrice] = useState("0");
  const [cryptoName, setCryptoName] = useState("#4429");
  const [cryptoPrice, setCryptoPrice] = useState(0);
  const [cryptoImage, setCryptoImage] = useState("");

  const postSeedHash = async (payload: SeedHashPayload) => {
    // setFairness({
    //   ...fairness,
    //   loading: true,
    // });
    cryptoDispatch({
      type: CRYPTOActionType.SERVER_HASH_LOADING,
      payload: true,
    });
    const [response, error] = await serverSeedHash(payload);
    if (response) {
      cryptoDispatch({
        type: CRYPTOActionType.SET_SERVER_SEED_HASH,
        payload: response?.data?.data?.serverHash || "",
      });
      cryptoDispatch({
        type: CRYPTOActionType.SET,
        payload: { cryptoPrice: response?.data?.data?.price },
      });
      // setFairness({
      //   ...fairness,
      //   currentServerSeed: "[]",
      //   serverSeed: "",
      //   loading: false,
      // });

      setCryptoName(
        response.data.data.contractName || response.data.data.tokenId
      );
      setCryptoPrice(response.data.data.price);
      setWinChance(response.data.data.winProbability);
      setBetPrice(response.data.data.betAmount);
      setCryptoImage(response.data.data.nftImage);
    }
    if (error) {
      // setFairness({
      //   ...fairness,
      //   loading: false,
      // });
      errorParser(error);
      cryptoDispatch({ type: CRYPTOActionType.RESET_WIN_RATE_AND_PRICE });
    }
    cryptoDispatch({
      type: CRYPTOActionType.SERVER_HASH_LOADING,
      payload: false,
    });
  };

  useEffect(() => {
    const payload = {
      tokenId: crypto?.id as string,
      symbol: crypto?.symbol as string,
      nftImage: crypto?.image as string,
      changeType: changeType as string,
      winProbability: parseFloat(winRate as string),
      betAmount: parseFloat(price as string),
      price: crypto?.currentPrice || 0,
      name: crypto?.name as string,
    };
    postSeedHash(payload);
  }, [crypto]);

  useEffect(() => {
    if (winRate) {
      setWinChance(winRate);
    }
    if (price) {
      setBetPrice(price);
    }
  }, [winRate, price]);

  useEffect(() => {
    setFairness({
      clientSeed: "",
      serverSeed: "",
      currentServerSeed: "[]",
      loading: false,
    });
  }, []);

  return (
    <BetBoxWrapper>
      <CryptoInfo cryptoName={cryptoName} cryptoPrice={cryptoPrice} />
      <div className="w-full border border-[#484848] rounded-[15px] relative overflow-hidden">
        <BetHistory />
        <BetSpin cryptoImage={cryptoImage} postSeedHash={postSeedHash} />
        <Footer />
      </div>
      <div
        className={cx(
          "flex flex-col mt-[12px] gap-[12px] mb-[14px]",
          "ls:mb-[32px]",
          "xl:flex-row xl:justify-between xl:border border-[#484848] xl:bg-[#15171b] rounded-[15px]"
        )}
      >
        <div
          className={cx(
            "flex flex-col gap-[9px] relative px-[17px] py-[12px] w-full border border-[#484848] bg-[#15171b] rounded-[15px]",
            "lg:flex-row lg:justify-between gap-0",
            "xl:gap-[40px] xl:justify-start xl:border-none"
          )}
        >
          <StatusItem
            title="Win Chance"
            value={winChance}
            cryptoPrice={Number(cryptoPrice)}
            setValue={setWinChance}
            setCorrespondingValue={setBetPrice}
          />
          <StatusItem
            title="Price"
            value={betPrice}
            cryptoPrice={Number(cryptoPrice)}
            setValue={setBetPrice}
            setCorrespondingValue={setWinChance}
          />
        </div>
        <div
          className={cx(
            "w-full flex items-center",
            "xl:max-w-[290px] xl:pr-[24px]"
          )}
        >
          <BetButton />
        </div>
      </div>
      <Toaster />
    </BetBoxWrapper>
  );
};

interface Wrapper {
  children: React.ReactNode;
}
const BetBoxWrapper: React.FC<Wrapper> = ({ children }) => {
  return <SpinProvider>{children}</SpinProvider>;
};

export default BetBox;
