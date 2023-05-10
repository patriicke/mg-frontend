import { BiChevronLeft } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

interface PageNameProps {
  iconSrc: string;
  title: string;
}

const PageName: React.FC<PageNameProps> = ({
  iconSrc,
  title
}) => {
  const navigate = useNavigate();
  const location = useLocation()
  return (
    <div className='w-full flex items-center py-[18px] gap-[15px] md:gap-[22px]'>
      {
        location.pathname === '/recommend' ? 
        <LeftButton onClick={() => { navigate('/nftslot/all') }} />
        :
        <LeftButton onClick={() => { navigate(-1) }} />
      }
      <div className="flex gap-[8px] items-center">
        <div className='ml-0'>
          <img src={iconSrc} alt='page' className={`${location.pathname.includes('cryptoslot') ? 'w-[45px] md:w-[65px] h-auto' : 'w-[31px] h-[31px] md:w-[35px] md:h-[35px]'} object-contain`} />
        </div>
        <div className='text-[20px] md:text-[27px] xl:text-[32px] ml-[10px] font-[500]'>{title}</div>
      </div>
    </div>
  )
}

interface LeftButtonProps {
  onClick: () => void;
}

const LeftButton: React.FC<LeftButtonProps> = ({
  onClick
}) => {
  return (
    <div className='p-[4px] md:p-[9px] mr-3 rounded border border-[#484848] cursor-pointer hover:border-white' onClick={onClick}>
      <BiChevronLeft color={'#FFF'} size={20} />
    </div>
  )
}

export default PageName;