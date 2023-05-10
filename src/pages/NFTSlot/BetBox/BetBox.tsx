import { useEffect, useState } from "react";

import cx from "classnames";

import BetSpin from "./BetSpin";
import Footer from "./Footer";
import StatusItem from "./StatusItem/StatusItem";
import BetButton from "pages/NFTSlot/BetBox/BetButton";
import NFTInfo from "./NFTInfo";

import { SpinProvider, useSpin } from "context/SpinContext";
import { NFTActionType, useNFT } from "context/NftContext";
import { serverSeedHash } from "services/nft.service";
import { errorParser } from "utils/error.utils";
import { Toaster, toastSuccess } from "components/ui/Toast";
import { SeedHashPayload } from "interface/nft/nft.interface";
import BetHistory from "./BetHistory";
import { useLocalStorage } from "hooks/useLocalstorage";

const BetBox: React.FC = () => {
  const [fairness, setFairness] = useLocalStorage<{
    clientSeed: string;
    serverSeed: string;
    currentServerSeed?: string;
    loading?: boolean;
  }>("fairness", {
    clientSeed: "",
    serverSeed: "",
    currentServerSeed: "[]",
    loading: false,
  });
  const [winChance, setWinChance] = useState("0");
  const {
    state: { nft, winRate, price, changeType },
    nftDispatch,
  } = useNFT();
  const { state: {betResult, isSpinning}} = useSpin();
  const [betPrice, setBetPrice] = useState("0");
  const [nftName, setNftName] = useState("#4429");
  const [nftPrice, setNftPrice] = useState(0);
  const [nftImage, setNftImage] = useState("");

  const getAbbreviation = (str: string) => {
    const strArray = str.split(" ");
    let firstLetter = "";
    strArray.forEach((item) => {
      firstLetter += item.charAt(0);
    });
    return firstLetter;
  };

  const postSeedHash = async (payload: SeedHashPayload) => {
    // setFairness({
    //   ...fairness,
    //   loading: true,
    // });
    nftDispatch({ type: NFTActionType.SERVER_HASH_LOADING, payload: true });
    const [response, error] = await serverSeedHash(payload);
    if (response) {
      nftDispatch({
        type: NFTActionType.SET_SERVER_SEED_HASH,
        payload: response?.data?.data?.serverHash || "",
      });
      nftDispatch({
        type: NFTActionType.SET,
        payload: { nftPrice: response?.data?.data?.price },
      });
      // setFairness({
      //   ...fairness,
      //   currentServerSeed: "[]",
      //   serverSeed: "",
      //   loading: false,
      // });

      setNftName(
        `${getAbbreviation(response.data.data.contractName) || ""}#${
          response.data.data.tokenId
        }`
      );
      setNftPrice(response.data.data.price);
      setWinChance(response.data.data.winProbability);
      setBetPrice(response.data.data.betAmount);
      setNftImage(response.data.data.nftImage);
    }
    if (error) {
      // setFairness({
      //   ...fairness,
      //   loading: false,
      // });
      errorParser(error);
      nftDispatch({ type: NFTActionType.RESET_WIN_RATE_AND_PRICE });
    }
    nftDispatch({ type: NFTActionType.SERVER_HASH_LOADING, payload: false });
  };

  // const handleWinChance = (value: number) => {
  //     setWinChance(value);
  //     const debouncedPostSeedHash = debounce(() => {
  //       if (nft && winChance) {
  //         const payload = {
  //           chain: nft?.chain,
  //           tokenId: nft?.token_id,
  //           nftAddress: nft?.contract_address,
  //           winProbability: value,
  //         };
  //         postSeedHash(payload);
  //       }
  //     }, 1000);
  //     debouncedPostSeedHash();
  // };

  useEffect(() => {
    const payload = {
      chain: nft?.chain as string,
      tokenId: nft?.tokenId as string,
      nftAddress: nft?.contractAddress as string,
      nftImage: nft?.image as string,
      changeType: changeType as string,
      winProbability: parseFloat(winRate as string),
      betAmount: parseFloat(price as string),
    };
    postSeedHash(payload);
  }, [nft]);

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
    <>
      <NFTInfo nftName={nftName} nftPrice={nftPrice} />
      <div className="w-full border border-[#484848] rounded-[15px] relative overflow-hidden">
        <BetHistory />
        <BetSpin nftImage={nftImage} postSeedHash={postSeedHash} />
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
            nftPrice={Number(nftPrice)}
            setValue={setWinChance}
            setCorrespondingValue={setBetPrice}
          />
          <StatusItem
            title="Price"
            value={betPrice}
            nftPrice={Number(nftPrice)}
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
    </>
  );
};

export default BetBox;
