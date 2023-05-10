import { UserContextProps, UserContext } from "App";
import { Toaster } from "components/ui/Toast";
import { NFTActionType, NFTProvider, useNFT } from "context/NftContext";
import withAuthRedirect from "hoc/withAuthRedirect";
import {
  AllCollectionContract,
  AllCollectionContractOptions,
  NFTCollectionByAddress,
} from "interface/nft/nft.interface";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllCollections,
  getCollectionByAddress,
} from "services/nft.service";
import { errorParser } from "utils/error.utils";
import Dropdown from "./Dropdown/Dropdown";
import NFTCard from "./NFTCard/NFTCard";
import Tab from "./Tabs/Tabs";
import { useMediaQuery } from "react-responsive";

// const options = [
//   { label: "Popular", value: "popular" },
//   { label: "High", value: "high" },
//   { label: "Low", value: "low" },
//   { label: "New", value: "new" },
// ];

export enum ChainEnum {
  ETHEREUM = "ethereum",
  MATIC = "matic",
  KLAYTN = "klaytn",
  SOLANA = "solana",
}

const chainOptions = [
  { label: "Ethereum", value: ChainEnum.ETHEREUM },
  { label: "Matic", value: ChainEnum.MATIC },
  { label: "Klaytn", value: ChainEnum.KLAYTN },
  { label: "Solana", value: ChainEnum.SOLANA },
];

export enum PeriodEnum {
  HOURLY = "24h",
  WEEKLY = "7d",
  MONTHLY = "30d",
  TOTAL = "all",
}

const periodOptions = [
  { label: "24h", value: PeriodEnum.HOURLY },
  { label: "7d", value: PeriodEnum.WEEKLY },
  { label: "30d", value: PeriodEnum.MONTHLY },
  { label: "All", value: PeriodEnum.TOTAL },
];

const Marketplace: React.FC = () => {
  const navigate = useNavigate();
  const { address } = useParams();
  const [activeTab, setActiveTab] = useState<string>("");
  const {
    loggedInstate: [loggedIn],
  } = useContext<UserContextProps>(UserContext);
  const [nftContracts, setNftContracts] = useState<AllCollectionContract[]>([]);
  const [nftContractsOptions, setNftContractOptions] = useState<
    AllCollectionContractOptions[]
  >([]);
  const [nftCollection, setNftCollection] = useState<NFTCollectionByAddress>();
  const [isNftsLoading, setIsNftsLoading] = useState<boolean>(true);
  const [chain, setChain] = useState<string>(ChainEnum.ETHEREUM);
  const [period, setPeriod] = useState<string>(PeriodEnum.HOURLY);
  const [selectedContract, setSelectedContract] = useState<{
    label: string;
    value: string;
  }>({
    label: "",
    value: "",
  });

  const { nftDispatch } = useNFT();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleTabClick = (address: string) => {
    setActiveTab(address);
    navigate(`/nftslot/${address}`);
  };

  const getAllNFTCollection = async () => {
    setIsNftsLoading(true);
    const body = {
      period,
    };
    const [response, error] = await getAllCollections(body);
    setIsNftsLoading(false);
    if (response) {
      setNftContracts(response);
      const options = response.map((contract: any) => {
        return {
          label: contract.name,
          value: contract.address,
        };
      });
      setNftContractOptions(options);
      // setSelectedContract(
      //   options.filter((contract: any) => contract.value === address),
      // );
    }
    if (error) {
      errorParser(error);
    }
  };
  

  const getNFTCollectionByAddress = async (slug: string) => {
    setIsNftsLoading(true);
    const [response, error] = await getCollectionByAddress({ slug });
    setIsNftsLoading(false);
    if (error) {
      return errorParser(error);
    }
    if (response) {
      setNftCollection(response.data);
      const selected = {
        label: response.data.data[0].collectionName,
        value: response.data.data[0].contractAddress,
      };
      setSelectedContract(selected);
    }
  };

  const trimStr = (str: string) => {
    const words = str.split(" ");

    if (words.length === 1) {
      return str;
    } else {
      let abbreviation = "";

      for (let i = 0; i < words.length; i++) {
        abbreviation += words[i][0]; // add the first letter of each word to the abbreviation
      }

      return  abbreviation.toUpperCase(); // display the abbreviation in uppercase letters
    }
  };


  const redirectToSlots = () => {
    navigate("/nftslot/spin");
  };

  const addNftToSlot = (nft: any, winRate: number) => {
    const payload = {
      nft: {
        ...nft,
        chain,
      },
      winRate: winRate,
    };
    nftDispatch({ type: NFTActionType.RESET_WIN_RATE_AND_PRICE });
    nftDispatch({ type: NFTActionType.SET, payload: payload });
    redirectToSlots();
  };

  useEffect(() => {
    if (loggedIn === true) {
      getAllNFTCollection();
    } else {
      setNftCollection(undefined);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (address) {
      getNFTCollectionByAddress(address);
    }
    // else {
    //   getNFTCollectionByAddress(activeTab);
    // }
  }, [address]);

  return (
    <MarketplaceWrapper>
      {/* Top */}
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex justify-center">
          <Tab
            key="All"
            label="All"
            active={false}
            onClick={() => {
              navigate(`/nftslot/all`);
            }}
          />
          {nftContracts.slice(0, isMobile ? 4 : 6)?.map((contract) => (
            <Tab
              key={contract?.address}
              label={trimStr(contract?.name)}
              active={address === contract?.address}
              onClick={() => {
                setSelectedContract({
                  label: contract?.key,
                  value: contract?.address,
                });
                handleTabClick(contract?.address);
              }}
            />
          ))}
        </div>
        <div className="flex mt-5 md:mt-0 justify-end ">
          {/* <Dropdown
            label="Chain"
            options={chainOptions}
            multiSelect={false}
            setValue={setChain}
          /> */}
          {/* <Dropdown
            label="Period"
            options={periodOptions}
            multiSelect={false}
            setValue={setPeriod}
          /> */}
          <Dropdown
            label="All Provider"
            options={nftContractsOptions}
            multiSelect={false}
            onContractSelect={getNFTCollectionByAddress}
            setValue={setActiveTab}
            updatedSelected={selectedContract}
          />
        </div>
      </div>
      {/* NFT Cards */}
      {!loggedIn && (
        <h1 className="text-white text-2xl text-center mt-5">
          You must be logged in to view the available NFTs
        </h1>
      )}
      {loggedIn && nftCollection?.data?.length === 0 && (
        <h1 className="text-white text-2xl text-center mt-5">
          There are no available NFTs
        </h1>
      )}
      {isNftsLoading ? (
        <div className="my-5">
          <div className="bg-gray-700 rounded-lg overflow-hidden shadow-lg w-36">
            <div className="animate-ping h-6 w-36 bg-gray-800"></div>
          </div>
          <div className="flex flex-wrap -mx-4">
            {new Array(10).fill(0).map((_value: any, index: number) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4"
              >
                <div className="bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                  <div className="animate-ping h-56 w-full bg-gray-800"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="my-5">
          <h1 className="text-2xl font-bold">
            {selectedContract.label || "N/A"}
          </h1>
          <div className="flex flex-wrap sm:-mx-2">
            {nftCollection?.data &&
              nftCollection?.data?.map((nft) => (
                <div
                  key={nft.tokenId}
                  className="w-1/3 md:w-1/4 lg:w-1/5 p-2 md:p-4 lg:p-2 cursor-pointer"
                  onClick={() => addNftToSlot(nft, 0)}
                >
                  <NFTCard {...nft} />
                </div>
              ))}
          </div>
        </div>
      )}

      <Toaster />
    </MarketplaceWrapper>
  );
};

export default withAuthRedirect(Marketplace);

interface Wrapper {
  children: React.ReactNode;
}
const MarketplaceWrapper: React.FC<Wrapper> = ({ children }) => {
  return <NFTProvider>{children}</NFTProvider>;
};
