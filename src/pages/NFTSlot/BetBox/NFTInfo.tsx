interface NFTInfoProps {
  nftName: string;
  nftPrice: number;
}

const NFTInfo: React.FC<NFTInfoProps> = ({
  nftName,
  nftPrice
}) => {
  return (
    <div className='flex justify-between items-center py-[15px]'>
      <div className='text-yellow-text-color text-[14px] md:text-[17px] xl:text-[18px] font-GeogrotesqueWide'>
        {nftName}
      </div>
      <div className='text-green-text-color text-[14px] md:text-[17px] xl:text-[18px] font-GeogrotesqueWide px-[12px] py-[3px] md:px-[20px] md:py-[7px] xl:px-[37px] xl:py-[12px] border rounded xl:rounded-md border-[#484848]'>
        ${nftPrice}
      </div>
    </div>
  )
}

export default NFTInfo;