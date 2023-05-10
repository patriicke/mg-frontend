import { NFT } from "interface/nft/nft.interface";
import React, { useEffect, useState } from "react";

const NFTCard = (nft: NFT) => {
  const [minBet, setMinBet] = useState(0);
  useEffect(() => {
    if (nft) {
      const amount =
        nft.askPrice && Number(nft?.askPrice) > 0
          ? Number(nft?.askPrice).toFixed(2)
          : Number(nft?.lastSalePrice).toFixed(2);
      if (Number(amount) > 0) {
        const minBetAmount = (0.01 / 100) * Number(amount);
        setMinBet(Number(minBetAmount.toFixed(2)));
      }
    }
  }, [nft]);
  return (
    <div className="w-full h-full bg-[#1E2125] px-2 sm:px-4 py-2 border rounded-lg overflow-hidden hover:border-[#B0D412]">
      <div className="text-[#B0D412] py-1 text-[9px] sm:text-sm font-bold">
        {nft.name || nft.tokenId}
      </div>
      <img
        src={nft?.image || "https://via.placeholder.com/150"}
        alt="product"
        className="w-full rounded-lg aspect-w-1 aspect-h-1 aspect-square object-cover"
      />
      <div className="flex justify-between items-center flex-wrap">
        <div className="sm:py-2 text-[#7D7D7D] text-[10px] sm:text-lg font-normal">
          MIN BET
        </div>
        <div className="sm:py-2 text-white text-[10px] sm:text-base font-medium break-all">
          $
          {minBet}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
