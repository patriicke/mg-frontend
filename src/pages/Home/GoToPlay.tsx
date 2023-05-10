import bgImg from "assets/images/home/goplay.png";

import HeroButton from "components/buttons/HeroButton";
import { useNavigate } from "react-router-dom";

import cx from "classnames";
import { useMediaQuery } from 'react-responsive'

const GoToPlay: React.FC = () => {
  const isSmall = useMediaQuery({maxWidth:1280})
  const navigate = useNavigate();

  return (
    <div className="relative p-[12px] w-full bg-gradient-to-b from-[#B0D412] to-[#E8C13D] flex flex-col items-center rounded-[20px]">
      <div
        className={cx(
          'relative w-full flex flex-col items-center justify-center',
          'lg:flex-row',
        )}
      >
        <div className="p-[14px]">
          <img src={bgImg} alt="background" />
        </div>
        <div
          className={cx(
            'w-full flex justify-center',
            'lg:absolute lg:bottom-0',
          )}
        >
          <HeroButton
            variant
            onClick={() => {
              navigate('/nftslot/all');
            }}
          >
            Go To Play
          </HeroButton>
        </div>
      </div>
    </div>
  );
};

export default GoToPlay;
