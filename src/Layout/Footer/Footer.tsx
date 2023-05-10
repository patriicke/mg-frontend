import { FooterMenus } from './Footer.constant';
import MenuItem from './MenuItem';
import { useMediaQuery } from 'react-responsive';
import { FaDiscord, FaGoogle, FaMailBulk, FaTwitter } from 'react-icons/fa';

import logo from 'assets/images/footer/logo.png';
import mLogo from 'assets/images/footer/logo.m.png';

import bitcoinImg from 'assets/images/footer/bitcoin_rounded.svg';
import ethereumImg from 'assets/images/footer/ethereum_rounded.svg';
import solanaImg from 'assets/images/footer/solana_rounded.svg';

import menuImg from 'assets/images/footerMobile/menu.png';
import promotionImg from 'assets/images/footerMobile/promotional.png';
import recommendImg from 'assets/images/footerMobile/recommend.png';
import searchImg from 'assets/images/footerMobile/search.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FooterProps {
  onClick: () => void;
}

const initialVariants = {
  activities: false,
  recommend: false,
  search: false,
};

const MobileFooter: React.FC<FooterProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const [variants, setVariants] = useState(initialVariants);

  const handleFooterItemClick = (item: any) => {
    const newVariants = { ...initialVariants, [item]: true };
    setVariants(newVariants);
    navigate(`/${item}`);
  };

  useEffect(() => {
    handleFooterItemClick(window.location.pathname.slice(1));
  }, [window.location.pathname]);
  
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full px-[19px] bg-second-bg-color z-[999]">
      <div className="w-full h-[65px] md:h-[82px] flex justify-around">
        <MenuItem title="Menu" iconSrc={menuImg} onClick={onClick} />
        <MenuItem
          title="Bonus"
          iconSrc={promotionImg}
          variant={variants.activities}
          onClick={() => handleFooterItemClick('activities')}
        />
        <MenuItem
          title="Recommend"
          iconSrc={recommendImg}
          variant={variants.recommend}
          onClick={() => handleFooterItemClick('recommend')}
        />
        <MenuItem
          title="Search"
          iconSrc={searchImg}
          variant={variants.search}
          onClick={() => handleFooterItemClick('search')}
        />
      </div>
    </div>
  );
};

export const WebFooter: React.FC = () => {
  const isSmall = useMediaQuery({ maxWidth: 1280 });
  return (
    <div className="flex-col items-center hidden md:flex pb-[86px] pt-[40px]">
      <div className="grid grid-cols-1 lg:grid-cols-3 items-stretch mb-14">
        <div className="flex flex-col items-start mb-10 lg:mb-0 lg:border-r-2 border-r-[#202020] lg:pr-20">
          <img
            src={logo}
            alt="mark"
            className="text-white w-24 hover:cursor-pointer mb-5"
          />
          <p className="text-[#6F6F6F] font-[500] text-[16px] leading-[26px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ac
            accumsan, massa metus, tortor pulvinar at sed. Scelerisque
            pellentesque lectus quis consequat lorem aliquam massa cursus sed.
            Id dignissim ultrices morbi nunc. At eget tellus diam id sed sed
            donec. Nunc eget ultrices aenean porta sit elementum.
          </p>
        </div>
        <div className="col-span-2 grid grid-cols-2 items-start justify-start">
          <ul className="list-none font-normal text-[15px] leading-[22px] text-white mr-20 lg:mx-20">
            <li className="uppercase mb-5">Join us</li>
            <li className="uppercase mb-5">Help center</li>
            <li className="uppercase mb-5">Terms of service</li>
            <li className="uppercase mb-5">Introduce the game</li>
            <li className="uppercase mb-5">App</li>
            <li className="uppercase mb-5">News</li>
            <li className="uppercase">Official Mirrors</li>
          </ul>
          <div className="flex flex-col items-start">
            <h3 className="text-[18px] leading-[22px] text-white opacity-60 mb-[14px] uppercase">
              Contact us
            </h3>
            <div className="flex justify-start items-center gap-8">
              <div className="flex flex-row items-center mb-8 text-[16px] leading-[20px]">
                <h5 className="text-white opacity-60 mr-5">Help:</h5>
                <a
                  className="text-[#B0D412] opacity-90"
                  href="https://help.modern.game"
                  target="_blank"
                  rel="noreferrer"
                >
                  help.modern.game
                </a>
              </div>
            </div>
            <h3 className="text-[18px] leading-[22px] text-white opacity-60 mb-[14px] uppercase">
              Acceptable currencies
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <img className="w-6" src={bitcoinImg} alt="bitcoin" />
              <img className="w-6" src={ethereumImg} alt="ethereum" />
              <img className="w-6" src={solanaImg} alt="solana" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full border border-[#484848] bg-[#15171B] rounded-[15px] backdrop:blur-lg px-8 py-8 xl:py-16 xl:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-28 2xl:gap-36">
          <div className="flex-1 flex flex-row items-center">
            <div>
              <img className="w-[72px] mr-10" src={mLogo} alt="mark" />
            </div>
            <p className="font-[500] text-[16px] leading-[26px] tracking-[5.5%] text-[#6F6F6F] pl-[40px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ac
              accumsan, massa metus, tortor pulvinar at sed. Scelerisque
              pellentesque lectus quis consequat
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <a
              className={
                `flex justify-center items-center bg-[#FFFFFF80] rounded-full cursor-pointer ` +
                (isSmall ? 'w-[50px] h-[50px]' : 'w-[62px] h-[62px]')
              }
              href="https://help.modern.game"
              target="_blank"
              rel="noreferrer"
            >
              <FaDiscord color="#3A3A3A" size={isSmall ? 24 : 30} />
            </a>
            <a
              className={
                `flex justify-center items-center bg-[#FFFFFF80] rounded-full cursor-pointer ` +
                (isSmall ? 'w-[50px] h-[50px]' : 'w-[62px] h-[62px]')
              }
              href="https://help.modern.game"
              target="_blank"
              rel="noreferrer"
            >
              <FaGoogle color="#3A3A3A" size={isSmall ? 24 : 30} />
            </a>
            <a
              className={
                `flex justify-center items-center bg-[#FFFFFF80] rounded-full cursor-pointer ` +
                (isSmall ? 'w-[50px] h-[50px]' : 'w-[62px] h-[62px]')
              }
              href="https://help.modern.game"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter color="#3A3A3A" size={isSmall ? 24 : 30} />
            </a>
            <a
              className={
                `flex justify-center items-center bg-[#FFFFFF80] rounded-full cursor-pointer ` +
                (isSmall ? 'w-[50px] h-[50px]' : 'w-[62px] h-[62px]')
              }
              href="https://help.modern.game"
              target="_blank"
              rel="noreferrer"
            >
              <FaMailBulk color="#3A3A3A" size={isSmall ? 24 : 30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
