import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import cx from 'classnames';
import useDialog from 'hooks/useDialog';
import closeIcon from 'assets/images/auth/close.png';
import { FiSearch } from 'react-icons/fi';
import NFTCard from 'pages/Marketplace/NFTCard/NFTCard';
import { NFTActionType, useNFT } from 'context/NftContext';
import { getSearchResult } from 'services/nft.service';
import { errorParser } from 'utils/error.utils';
import { ChainEnum } from 'pages/Marketplace/Marketplace';
import { navigateTo } from 'utils/common.utils';
// import { useNavigate } from 'react-router-dom';

interface IProps {}

const SearchModal: React.FC<IProps> = () => {
  const { hideDialog } = useDialog();
  // const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [nftLists, setNftLists] = useState<any[]>();
  const [isNftsLoading, setIsNftsLoading] = useState<boolean>(false);
  const [chain, setChain] = useState<string>(ChainEnum.ETHEREUM);
  

  const onSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const searchNft = async (keyword: string) => {
    setIsNftsLoading(true);
    const [response, error] = await getSearchResult(keyword);
    if (response) {
      setNftLists(response.data.data);
    }
    if (error) {
      errorParser(error);
    }
    setIsNftsLoading(false);
  };

  const { nftDispatch } = useNFT();

  const redirectToSlots = () => {
    window.location.href = '/nftslot/spin';
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

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const closeClickHandler = () => {
    hideDialog();
    toggleVisibility();
    if (window.location.pathname === '/search') {
      window.history.go(-2)
    }
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      if (searchTerm.length > 2) {
        searchNft(searchTerm);
      }
    }, 2000);

    return () => clearTimeout(getData);
  }, [searchTerm]);

  return (
    <div
      className={cx(
        'fixed inset-y-0 right-0 transition-transform transform duration-300 ease-in-out translate-x-0 h-[100%] sm:h-[90%] p-7 sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] w-full sm:w-[620px] md:w-[800px] lg:w-[1024px] z-[100] overflow-x-hidden overflow-y-auto bg-[#15171B] rounded-lg text-white',
        { 'translate-x-full': !isVisible },
      )}
    >
      <div className="flex items-center">
        <div className="sm:hidden w-max p-[4px] md:p-[9px] rounded border border-[#484848] hover:border-white cursor-pointer">
          <IoClose color={'#FFF'} size={20} onClick={closeClickHandler} />
        </div>
      </div>
      <div className="relative flex-1 mt-5">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full md:w-1/2 min-w-[250px] pl-10 pr-3 py-2 border border-[#484848] rounded-md leading-5 bg-[#15171B] placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-white focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
          placeholder="Search (Enter more than 3 characters to search)"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>

      <div className="w-full mt-5 flex flex-col items-center">
        <div className="w-full flex flex-wrap items-stretch">
          {!isNftsLoading &&
            nftLists?.map((nft: any) => (
              <div
                key={nft.tokenId}
                className="w-1/2 sm:1/3 md:w-1/4 lg:w-1/5 p-2 cursor-pointer"
                onClick={() => addNftToSlot(nft, 0)}
              >
                <NFTCard {...nft} />
              </div>
            ))}
          {!isNftsLoading && nftLists?.length === 0 && (
            <p>No results found for {searchTerm}</p>
          )}
        </div>
      </div>
      {isNftsLoading && (
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
      )}
      <div
        className={cx(
          'absolute top-[10px] right-[10px] w-[40px] hover:cursor-pointer hidden sm:block',
          'md:top-[25px] md:right-[25px] md:w-[45px]',
        )}
        onClick={closeClickHandler}
      >
        <img src={closeIcon} alt="close" />
      </div>
    </div>
  );
};

export default SearchModal;
