import NFTCard from "pages/Marketplace/NFTCard/NFTCard";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import cx from "classnames";
import { useNFT, NFTActionType } from "context/NftContext";
import { chain } from "lodash";
import { useNavigate } from "react-router-dom";
import { ChainEnum } from "pages/Marketplace/Marketplace";
import { useLocalStorage } from "hooks/useLocalstorage";

interface IProps {
  title: string;
  nfts: any[];
}

const NftCarousel: React.FC<IProps> = ({ nfts, title }) => {
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
  

  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideValue, setSlideValue] = useState(33.333);
  const [chain, setChain] = useState<string>(ChainEnum.ETHEREUM);

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 769 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  const { nftDispatch } = useNFT();
  const redirectToSlots = () => {
    navigate("/nftslot/spin");
  };

  const addNftToSlot = (nft: any, winRate: number) => {
    setFairness({
      clientSeed: "",
      serverSeed: "",
      currentServerSeed: "[]",
      loading: false,
    });
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

  const prevSlide = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  const slideStyle = {
    transform: `translateX(-${currentSlide * slideValue}%)`,
    transition: "transform 0.5s ease-in-out",
  };

  const redirectToNftListing = () => {
    navigate(`/nftslot/${nfts[0].contractAddress}`);
  };

  useEffect(() => {
    isMobile && setSlideValue(33.3333);
    isTablet && setSlideValue(25);
    isDesktop && setSlideValue(20);
  }, [isDesktop, isMobile, isTablet]);

  return (
    <div className="mt-5">
      <div className="flex justify-between w-full">
        <p className="text-white text-[18px] font-[700] sm:text-[24px] flex-1">
          {title}
        </p>
        <div className="flex items-center justify-center space-x-3">
          <p
            className="text-[9px] font-[500] text-white sm:text-[14px] hover:text-[#B0D412] cursor-pointer"
            onClick={redirectToNftListing}
          >
            ALL {nfts?.length}
          </p>
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={cx(
              "px-2 py-1 border border-[#484848] bg-[#484848] text-black rounded-md",
              {
                "cursor-not-allowed": currentSlide === 0,
                "hover:text-white hover:border-white": !(currentSlide === 0),
              }
            )}
          >
            <FiArrowLeft className="text-2xl" />
          </button>
          <button
            onClick={nextSlide}
            disabled={
              currentSlide === nfts.length - (isMobile ? 3 : isTablet ? 4 : 5)
            }
            className={cx(
              "px-2 py-1 border border-[#484848] bg-[#484848] rounded-md text-black",
              {
                "cursor-not-allowed":
                  currentSlide ===
                  nfts.length - (isMobile ? 3 : isTablet ? 4 : 5),
                "hover:text-white hover:border-white": !(
                  currentSlide ===
                  nfts.length - (isMobile ? 3 : isTablet ? 4 : 5)
                ),
              }
            )}
          >
            <FiArrowRight className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="w-full overflow-hidden mt-5">
        <div
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full"
          style={{
            gridTemplateColumns: `repeat(${nfts.length}, ${
              isMobile ? "33.34%" : isTablet ? "25%" : "20%"
            })`,
            gridAutoFlow: "column",
            ...slideStyle,
          }}
        >
          {nfts.map((nft: any, index: number) => (
            <div
              key={index}
              className="mx-1 md:mx-2 cursor-pointer"
              onClick={() => addNftToSlot(nft, 0)}
            >
              <NFTCard {...nft} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NftCarousel;
