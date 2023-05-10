import moment from "moment";
import Pagination from "pages/NFTSlot/BetHistory/Pagination";
import React, { useEffect, useState } from "react";
import { getTransactionHistory } from "services/wallet.service";
import { errorParser } from "utils/error.utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarImg from 'assets/images/wallet/calendar.png'
import SvgLoader from "components/DynamicSvg";

const initialRecordsData = {
  currentPage: 0,
  next: 0,
  previous: 0,
  pageSize: 0,
  results: [],
  totalItems: 0,
};

const RecordContent = () => {
  const [fromDate, setFromDate] = useState<Date>(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [toDate, setToDate] = useState<Date>(new Date());
  const [recordsData, setRecordsData] = useState(initialRecordsData);

  const getRecords = async (page: number) => {
    const payload = {
      fromDate: fromDate?.toDateString(),
      toDate: toDate?.toDateString(),
      page: page,
    };
    const [response, error] = await getTransactionHistory(payload);
    if (response) {
      setRecordsData(response.data.data);
    }
    if (error) {
      errorParser(error);
    }
  };

  const onPageChange = (pageNumber: number) => {
    getRecords(pageNumber);
  };

  useEffect(() => {
    getRecords(1);
  }, [fromDate, toDate]);

  return (
    <div className="w-full">
      <div className="sm:w-1/2 flex justify-between mt-10 sm:m-10 mb-0 gap-4">
        <div className="w-[50%] h-10 border rounded-lg border-[#484848]">
          <DatePicker
            selected={fromDate}
            onChange={(date: Date) => setFromDate(date)}
            customInput={
              <div className="w-full flex justify-between items-center">
                <img src={CalendarImg} alt="Calendar" className="w-4 h-4" />
                <input
                  type="text"
                  disabled
                  className="bg-transparent w-full px-3"
                  value={moment(fromDate).format('DD/MM/YYYY')}
                />
              </div>
            }
            dateFormat="dd/MM/yyyy"
            className="w-full p-2 bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-none focus:border-transparent"
          />
        </div>
        <div className="w-[50%] h-10 border rounded-lg border-[#484848]">
          <DatePicker
            selected={toDate}
            onChange={(date: Date) => setToDate(date)}
            customInput={
              <div className="w-full flex justify-between items-center">
                <img src={CalendarImg} alt="Calendar" className="w-4 h-4" />
                <input
                  type="text"
                  disabled
                  className="bg-transparent w-full px-3"
                  value={moment(toDate).format('DD/MM/YYYY')}
                />
              </div>
            }
            dateFormat="dd/MM/yyyy"
            filterDate={(date: Date) => date > fromDate}
            className="w-full p-2 bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-none focus:border-transparent"
          />
        </div>
      </div>
      <div className="max-w-full overflow-x-auto h-max sm:mx-10 mt-5 mb-2 flex flex-col justify-between items-start sm:items-center border border-[#484848] rounded-2xl gap-5">
        <table className="w-full ">
          <thead>
            <tr className="border-b border-[#484848] text-[#484848] text-left">
              <th className="p-5">Time</th>
              <th className="p-5">Amount</th>
              <th className="p-5">State</th>
              <th className="p-5">Type</th>
            </tr>
          </thead>
          <tbody>
            {recordsData.results.map((record: any) => (
              <>
                {record.balances.length > 0 &&
                  record.balances.map((balance: any) => (
                    <tr
                      className="border-b border-[#484848] text-left"
                      key={balance.id}
                    >
                      <td className="p-5">
                        <div className="flex flex-col items-start">
                          <p>{moment(record?.createdAt).format('HH:mm:ss')}</p>
                          <p>
                            {moment(record?.createdAt).format('YYYY/MM/DD')}
                          </p>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex flex-col items-start">
                          <p className="flex items-center w-full gap-1">
                          {record?.currency ? <div className="min-w-[20px] h-[20px]"><SvgLoader name={record?.currency} /></div>: record?.currency}
                            {parseFloat(record?.payAmount || 0).toFixed(2)}
                          </p>
                          <p className="break-all">$ {balance?.amount}</p>
                        </div>
                      </td>
                      <td className="p-5 capitalize text-[#DEFC5C]">
                        {record?.status}
                      </td>
                      <td className="p-5 capitalize text-[#308FFF]">
                        Deposit Bonus
                      </td>
                    </tr>
                  ))}
                <tr
                  className="border-b border-[#484848] text-left"
                  key={record.id}
                >
                  <td className="p-5">
                    <div className="flex flex-col items-start">
                      <p>{moment(record?.createdAt).format('HH:mm:ss')}</p>
                      <p>{moment(record?.createdAt).format('YYYY/MM/DD')}</p>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col items-start">
                      <p className="flex items-center w-full gap-1">
                      {record?.currency ? <div className="min-w-[20px] h-20px"><SvgLoader name={record?.currency} /></div>: record?.currency}
                        {parseFloat(record?.payAmount || 0).toFixed(2)}
                      </p>
                      <p className="break-all">$ {record?.fiatAmount}</p>
                    </div>
                  </td>
                  <td className="p-5 capitalize text-[#DEFC5C]">
                    {record?.status}
                  </td>
                  <td className="p-5 capitalize text-[#308FFF]">
                    {record?.type}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <div className="py-5 w-full sm:w-auto">
          <Pagination
            currentPage={recordsData?.currentPage}
            pageSize={recordsData?.pageSize}
            totalItems={recordsData?.totalItems}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RecordContent;
