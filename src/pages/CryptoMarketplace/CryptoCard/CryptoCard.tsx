import { Crypto } from "interface/crypto/crypto.interface";
import React, { useEffect, useState } from "react";

const CryptoCard = (crypto: Crypto) => {
  const [minBet, setMinBet] = useState(0);
  useEffect(() => {
    if (crypto) {
      const amount = Number(crypto?.currentPrice).toFixed(2)
      if (Number(amount) > 0) {
        const minBetAmount = (1 / 100) * Number(amount);
        setMinBet(Number(minBetAmount.toFixed(2)));
      }
    }
  }, [crypto]);
  return (
    <div className="w-full h-full bg-[#1E2125] px-2 sm:px-4 py-2 border rounded-lg overflow-hidden hover:border-[#B0D412]">
      <div className="text-[#B0D412] py-1 text-[9px] sm:text-sm font-bold">
        {crypto.name}
      </div>
      <img
        src={crypto?.image || "https://via.placeholder.com/150"}
        alt="product"
        className="w-full rounded-lg max-w-[150px] m-auto aspect-square object-cover"
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

export default CryptoCard;
