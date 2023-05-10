import React, { useContext, useEffect, useState } from "react";
import cx from "classnames";
import HeroBar from "./HeroBar/HeroBar";
import { CryptoLists, Tabs } from "./CryptoListing.constants";
import Tab from "pages/Marketplace/Tabs/Tabs";
import { BiSearch } from "react-icons/bi";
import CryptoCarousel from "./CryptoCarousel/CryptoCarousel";
import useDialog from "hooks/useDialog";
import SearchModal from "./SearchModal/SearchModal";
import { AllCollectionContract } from "interface/nft/nft.interface";
import {
  getAllCollections,
  getCollectionByAddress,
} from "services/nft.service";
import { errorParser } from "utils/error.utils";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { NFTProvider } from "context/NftContext";
import { UserContext, UserContextProps } from "App";
import withAuthRedirect from "hoc/withAuthRedirect";
import { isArray } from "lodash";

const AllCryptoListing = () => {
  const {
    loggedInstate: [loggedIn],
  } = useContext<UserContextProps>(UserContext);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
//   const [nftContracts, setNftContracts] = useState<AllCollectionContract[]>([]);
//   const [nftCollection, setNftCollection] = useState<any[]>();
//   const [isNftsLoading, setIsNftsLoading] = useState<boolean>(false);
  const [cryptoContracts, setCryptoContracts] = useState<AllCollectionContract[]>([]);
  const [cryptoCollection, setCryptoCollection] = useState<any[]>();
  const [isCryptoLoading, setIsCryptoLoading] = useState<boolean>(false);
  const [isTabsLoading, setIsTabsLoading] = useState<boolean>(false);
  const { showDialog } = useDialog();

  const searchClickHandler = () => {
    showDialog(
      <NFTProvider>
        <SearchModal />
      </NFTProvider>
    );
  };

  const tabClickHandler = (tab: string) => {
    setActiveTab(tab);
    navigate(`/cryptoslot/${tab}`);
  };

  const getAllCryptoCollection = async () => {
    setIsTabsLoading(true);
    setIsCryptoLoading(true);
    const [response, error] = await getAllCollections({});
    if (response) {
      setCryptoContracts([
        {
          key: "All",
          name: "All",
          address: "All",
        },
        ...response,
      ]);
      const options = response.map((contract: any) => {
        return {
          label: contract.key,
          value: contract.address,
        };
      });
      // setNftContractOptions([{ label: "All", value: "" }, ...options]);
      getMultipleCryptoCollectionByAddress(response);
    }
    if (error) {
      errorParser(error);
    }
    setIsTabsLoading(false);
  };

  const getMultipleCryptoCollectionByAddress = async (contracts: any) => {
    setIsCryptoLoading(true);
    // slice 5 and remove the first one, call below api making promise.all
    const promises: any = [];
    for (const item of contracts.slice(1, 5)) {
      promises.push(
        getCollectionByAddress({
          slug: item.address,
        })
      );
    }

    let result = await Promise.all(promises);
    const finalResult: any = [];
    if (Object.values(result).length > 0) {
      // result returns [[data, error] ,[data, error] ], create a new array with only data
      result.forEach((res: any) => {
        if (isArray(res[0]?.data?.data)) {
          finalResult.push([...res[0]?.data?.data]);
        }
      });
      setCryptoCollection(finalResult);
    }
    setIsCryptoLoading(false);
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

  useEffect(() => {
    if (loggedIn) {
      getAllCryptoCollection();
    }
  }, [loggedIn]);

  return (
    <>
      <HeroBar />
      <div className="w-full flex justify-between items-center mt-[30px]">
        <div className="flex justify-between">
          <>
            {isTabsLoading &&
              new Array(isMobile ? 4 : 6).fill(0).map((_value: any, index: number) => (
                <div
                  className="bg-gray-700 rounded-md overflow-hidden shadow-lg w-32 h-10 mr-2"
                  key={index}
                >
                  <div className="animate-ping h-6 w-36 bg-gray-800"></div>
                </div>
              ))}
            {cryptoContracts.slice(0, isMobile ? 4 : 6)?.map((tab) => (
              <Tab
                key={tab.key}
                label={trimStr(tab?.name)}
                active={activeTab === tab.address}
                onClick={() => {
                  tabClickHandler(tab.address);
                }}
              />
            ))}
          </>
        </div>
        <button
          className="p-3 border border-[#484848] hover:border-white rounded-md"
          onClick={searchClickHandler}
        >
          <BiSearch size={20} />
        </button>
      </div>
      {isCryptoLoading && (
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
      )}
      {cryptoCollection?.map((cryptoList) => (
        <CryptoCarousel
          key={cryptoList[0].collectionName}
          title={cryptoList[0].shortName}
          cryptos={cryptoList}
        />
      ))}
    </>
  );
};

export default withAuthRedirect(AllCryptoListing);
