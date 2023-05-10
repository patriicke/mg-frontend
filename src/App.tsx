import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { BrowserView, MobileView } from "react-device-detect";

import AppLayout from "./Layout/AppLayout";

import NFTSlot from "pages/NFTSlot/NFTSlot";
import Recommend from "pages/Recommend/Recommend";
import { UserProfile } from "services/user.service";
import Marketplace from "pages/Marketplace/Marketplace";
import { NFTProvider } from "context/NftContext";
import { CRYPTOProvider } from "context/CryptoContext";
import Home from "pages/Home/Home";
import Activities from "pages/Activities/Activities";
import Unlock from "pages/Activities/Unlock/Unlock";
import AllNftListing from "pages/AllNftListing/AllNftListing";
import Roulette from "pages/Roulette/Roulette";
import CustomerService from "pages/CustomerService/CustomerService";
import Favourite from "pages/Favourite/Favourite";
import { ALL_BETS_VALUE } from "pages/NFTSlot/BetHistory/BetHistory.constants";
import SearchModal from "pages/AllNftListing/SearchModal/SearchModal";
import NotFoundPage from "pages/404";
import CryptoMarketplace from "pages/CryptoMarketplace/CryptoMarketplace";
import CryptoSlot from "pages/CryptoSlot/CryptoSlot";
import { SpinProvider } from "context/SpinContext";

export interface UserContextProps {
  loggedInstate: [
    loggedIn: boolean,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  ];
  user: any;
  fetchProfile: () => void;
}
export const UserContext = React.createContext<UserContextProps>({
  loggedInstate: [false, () => {}],
  user: {},
  fetchProfile: () => {},
});

export interface HistoryContextProps {
  tabState: [tab: string, setTab: React.Dispatch<React.SetStateAction<string>>];
  pageState: [
    pageNumber: number,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
  ];
}

export const HistoryContext = React.createContext<HistoryContextProps>({
  tabState: [ALL_BETS_VALUE, () => {}],
  pageState: [1, () => {}],
});

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userInfo, setuserInfo] = useState();
  const [tab, setTab] = useState(ALL_BETS_VALUE);
  const [pageNumber, setPageNumber] = useState(1);
  const [errorCount, setErrorCount] = useState(0);
  const [profileCallInterval, setProfileCallInterval] = useState<any>(null);

  const fetchProfile = async () => {
    const [response, error] = await UserProfile();
    if (response) {
      setuserInfo(response.data.data);
      setLoggedIn(true);
    }
    if (error) {
      setErrorCount(errorCount + 1);
    }
    return [response, error];
  };

  useEffect(() => {
    fetchProfile();
    let timeout = setInterval(() => {
      fetchProfile();
    }, 30000);
    setProfileCallInterval(timeout);
    return () => {
      clearInterval(profileCallInterval);
    };
  }, []);

  useEffect(() => {
    if (errorCount > 3) {
      clearInterval(profileCallInterval);
      setErrorCount(0);
    }
  }, [errorCount]);

  return (
    <UserContext.Provider
      value={{
        loggedInstate: [loggedIn, setLoggedIn],
        user: userInfo,
        fetchProfile: fetchProfile,
      }}
    >
      <HistoryContext.Provider
        value={{
          tabState: [tab, setTab],
          pageState: [pageNumber, setPageNumber],
        }}
      >
        <SpinProvider>
          <CRYPTOProvider>
            <NFTProvider>
              <Router>
                <AppLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/referral/:referralId" element={<Home />} />
                    <Route path="/roulette" element={<Roulette />} />
                    <Route path="/nftslot" element={<Marketplace />} />
                    <Route path="/nftslot/:address" element={<Marketplace />} />
                    <Route path="/nftslot/all" element={<AllNftListing />} />
                    <Route path="/nftslot/spin" element={<NFTSlot />} />
                    <Route path="/cryptoslot" element={<CryptoMarketplace />} />
                    <Route path="/cryptoslot/spin" element={<CryptoSlot />} />
                    <Route path="/recommend" element={<Recommend />} />
                    <Route path="/activities" element={<Activities />} />
                    <Route path="/activities/unlock" element={<Unlock />} />
                    <Route path="/service" element={<CustomerService />} />
                    <Route path="/favourite" element={<Favourite />} />
                    <Route path="/search" element={<SearchModal />} />
                    <Route path="/*" element={<NotFoundPage />} />
                  </Routes>
                </AppLayout>
              </Router>
              <BrowserView>
                <Toaster
                  position="top-right"
                  containerStyle={{
                    width: "420px",
                  }}
                />
              </BrowserView>
              <MobileView>
                <Toaster
                  position="top-center"
                  containerStyle={{
                    margin: "0 auto",
                    width: "90%",
                    maxWidth: "420px",
                  }}
                />
              </MobileView>
              <div id="modal-root" className="absolute top-0 left-0"></div>
            </NFTProvider>
          </CRYPTOProvider>
        </SpinProvider>
        {/* <SpinProvider>
          <NFTProvider>
            <Router>
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/referral/:referralId" element={<Home />} />
                  <Route path="/roulette" element={<Roulette />} />
                  <Route path="/nftslot" element={<Marketplace />} />
                  <Route path="/nftslot/:address" element={<Marketplace />} />
                  <Route path="/nftslot/all" element={<AllNftListing />} />
                  <Route path="/nftslot/spin" element={<NFTSlot />} />
                  <Route path="/cryptoslot" element={<CryptoMarketplace />} />
                  <Route path="/cryptoslot/spin" element={<CryptoSlot />} />
                  <Route path="/recommend" element={<Recommend />} />
                  <Route path="/activities" element={<Activities />} />
                  <Route path="/activities/unlock" element={<Unlock />} />
                  <Route path="/service" element={<CustomerService />} />
                  <Route path="/favourite" element={<Favourite />} />
                  <Route path="/search" element={<SearchModal />} />
                  <Route path="/*" element={<NotFoundPage />} />
                </Routes>
              </AppLayout>
            </Router>
            <BrowserView>
              <Toaster
                position="top-right"
                containerStyle={{
                  width: '420px',
                }}
              />
            </BrowserView>
            <MobileView>
              <Toaster
                position="top-center"
                containerStyle={{
                  margin: '0 auto',
                  width: '90%',
                  maxWidth: '420px',
                }}
              />
            </MobileView>
            <div id="modal-root" className="absolute top-0 left-0"></div>
          </NFTProvider>
        </SpinProvider> */}
      </HistoryContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
