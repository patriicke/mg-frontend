import { UserContextProps, UserContext } from "App";
import { Toaster } from "components/ui/Toast";
import { CRYPTOActionType, CRYPTOProvider, useCRYPTO } from "context/CryptoContext";
import withAuthRedirect from "hoc/withAuthRedirect";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorParser } from "utils/error.utils";
import CryptoCard from "./CryptoCard/CryptoCard";
import HeroBar from "pages/AllCryptoListing/HeroBar/HeroBar";
import { getAllCryptoSlotCollections } from "services/crypto.service";
import { CryptoCollection } from "interface/crypto/crypto.interface";

const CryptoMarketplace: React.FC = () => {
  const navigate = useNavigate();
  const {
    loggedInstate: [loggedIn],
  } = useContext<UserContextProps>(UserContext);
  const [cryptoCollection, setCryptoCollection] = useState<CryptoCollection>();
  const [isCryptosLoading, setIsCryptosLoading] = useState<boolean>(true);

  const { cryptoDispatch } = useCRYPTO();

  const getAllCryptoCollection = async () => {
    setIsCryptosLoading(true);
    const [response, error] = await getAllCryptoSlotCollections();
    setIsCryptosLoading(false);
    if (response) {
      setCryptoCollection(response);
    }
    if (error) {
      errorParser(error);
    }
  };

  const redirectToSlots = () => {
    navigate("/cryptoslot/spin");
  };

  const addCryptoToSlot = (crypto: any, winRate: number) => {
    const payload = {
      crypto,
      winRate: winRate,
    };
    cryptoDispatch({ type: CRYPTOActionType.RESET_WIN_RATE_AND_PRICE });
    cryptoDispatch({ type: CRYPTOActionType.SET, payload: payload });
    redirectToSlots();
  };

  useEffect(() => {
    if (loggedIn === true) {
      getAllCryptoCollection();
    }
  }, [loggedIn]);

  return (
    <CryptoMarketplaceWrapper>
      <HeroBar />
      {/* NFT Cards */}
      {!loggedIn && (
        <h1 className="text-white text-2xl text-center mt-5">
          You must be logged in to view the available Cryptos
        </h1>
      )}
      {loggedIn && cryptoCollection?.data?.length === 0 && (
        <h1 className="text-white text-2xl text-center mt-5">
          There are no available Cryptos
        </h1>
      )}
      {isCryptosLoading ? (
        <div className="my-5">
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
          {/* <h1 className="text-2xl font-bold">
            {selectedContract.label || "N/A"}
          </h1> */}
          <div className="flex flex-wrap sm:-mx-2">
            {cryptoCollection &&
              cryptoCollection?.data?.map((crypto) => (
                <div
                  key={crypto.id}
                  className="w-1/3 md:w-1/4 lg:w-1/5 p-2 md:p-4 lg:p-2 cursor-pointer"
                  onClick={() => addCryptoToSlot(crypto, 0)}
                >
                  <CryptoCard {...crypto} />
                </div>
              ))}
          </div>
        </div>
      )}

      <Toaster />
    </CryptoMarketplaceWrapper>
  );
};

export default withAuthRedirect(CryptoMarketplace);

interface Wrapper {
  children: React.ReactNode;
}
const CryptoMarketplaceWrapper: React.FC<Wrapper> = ({ children }) => {
  return <CRYPTOProvider>{children}</CRYPTOProvider>;
};
