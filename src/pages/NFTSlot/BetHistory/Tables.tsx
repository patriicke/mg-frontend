import cx from "classnames";
import { BetHistoryData } from "interface/nft/nft.interface";
import { useContext, useEffect, useState } from "react";
import { getAllBets, getPersonalBets } from "services/nft.service";
import moment from "moment";
import Pagination from "./Pagination";
import {
  ALL_BETS_VALUE,
  HIGH_ROLLERS_VALUE,
  MY_BETS_VALUE,
} from "./BetHistory.constants";
import useDialog from "hooks/useDialog";
import SignIn from "components/Auth/SignIn";
import {
  UserContextProps,
  UserContext,
  HistoryContext,
  HistoryContextProps,
} from "App";

interface IProps {
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const initialHistoryData = {
  currentPage: 0,
  next: 0,
  previous: 0,
  pageSize: 0,
  results: [],
  totalItems: 0,
};

const MyBet: React.FC<IProps> = ({ setCurrentTab }) => {
  const [historyData, setHistoryData] =
    useState<BetHistoryData>(initialHistoryData);
  const { showDialog } = useDialog();
  const { fetchProfile } = useContext<UserContextProps>(UserContext);
  const { tabState, pageState } =
    useContext<HistoryContextProps>(HistoryContext);
  const [tab, setTab] = tabState;
  const [pageNumber, setPageNumber] = pageState;

  const getHistory = async (pageNumber: number) => {
    let response,
      error = null;
    if (tab === ALL_BETS_VALUE) {
      [response, error] = await getAllBets(pageNumber);
    }
    if (tab === MY_BETS_VALUE) {
      [response, error] = await getPersonalBets(pageNumber);
    }
    if (response) {
      setHistoryData(response?.data.data);
    }
    if (error) {
      setHistoryData(initialHistoryData);
      showDialog(<SignIn fetchProfile={fetchProfile} />);
      setCurrentTab(ALL_BETS_VALUE);
    }
  };

  const onPageChange = (pageNumber: number) => {
    getHistory(pageNumber);
  };

  useEffect(() => {
    tab !== HIGH_ROLLERS_VALUE && getHistory(1);
  }, [tab, pageNumber]);

  return tab === HIGH_ROLLERS_VALUE ? (
    <div className="w-full flex justify-center items-center h-52">
      <p className="text-3xl">Coming Soon...</p>
    </div>
  ) : (
    <>
      <div className="w-full">
        <div className="w-full my-[14px] font-normal">
          <div className="w-full flex flex-row items-center text-[12px] leading-[15px] md:text-[18px] md:leading-[22px] text-[#F0BE43] text-left border-b border-[#484848]">
            <th
              className={cx("w-[30%] py-4 px-5 md:pl-[34px]", {
                "w-[30%]": tab !== MY_BETS_VALUE,
              })}
            >
              ID
            </th>
            <th
              className={cx("w-[25%] py-4", {
                "w-[35%]": tab !== MY_BETS_VALUE,
              })}
            >
              Time
            </th>
            <th
              className={cx("w-[25%] py-4", {
                "w-[35%]": tab !== MY_BETS_VALUE,
              })}
            >
              Bet Amount
            </th>
            {tab === MY_BETS_VALUE && <th className="py-4 w-[20%]">Result</th>}
          </div>
          <div className="grid grid-cols-1 items-center text-left text-[10px] leading-[15px] md:text-[20px] md:leading-[25px] text-white divide-y divide-[#484848]">
            {historyData?.results.map((bet, index) => (
              <div
                key={bet.id}
                className="w-full flex flex-row items-stretch py-[17px]"
              >
                <div
                  className={cx(
                    "w-[30%] flex flex-row items-center pl-5 md:pl-[34px]",
                    {
                      "w-[30%]": tab !== MY_BETS_VALUE,
                    }
                  )}
                >
                  {bet.id}
                </div>
                <div
                  className={cx("w-[25%] flex flex-row items-center", {
                    "w-[35%]": tab !== MY_BETS_VALUE,
                  })}
                >
                  {moment(bet.createdAt).format("HH:mm:ss")}
                </div>
                <div
                  className={cx("w-[25%] flex flex-row items-center", {
                    "w-[35%]": tab !== MY_BETS_VALUE,
                  })}
                >
                  ${bet.betAmount.toFixed(2)}
                </div>
                {tab === MY_BETS_VALUE && (
                  <div
                    className={cx(
                      "w-[20%] md:w-[calc(20%-20px)] md:mr-5 flex flex-row items-center text-[#B0D412] capitalize",
                      { "opacity-70": bet.status === "lost" }
                    )}
                  >
                    {bet.status}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={historyData?.currentPage}
        pageSize={historyData?.pageSize}
        totalItems={historyData?.totalItems}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default MyBet;
