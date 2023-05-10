import { SocialIcons } from './Invite.constants';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';
import cx from 'classnames';
import FacebookMobile from 'assets/images/recommend/facebook.svg';
import FacebookWeb from 'assets/images/recommend/facebook.lg.png';
import TwitterMobile from 'assets/images/recommend/twitter.svg';
import TwitterWeb from 'assets/images/recommend/twitter.lg.png';
import TelegramMobile from 'assets/images/recommend/telegram.svg';
import TelegramWeb from 'assets/images/recommend/telegram.lg.png';
import DiscordMobile from 'assets/images/recommend/discord.svg';
import DiscordWeb from 'assets/images/recommend/discord.lg.png';

const Share: React.FC = () => {
  return (
    <div className="mt-[19px] lg:mt-0">
      <div
        className={cx(
          'text-[15px] text-[#858585] font-[400] mb-[12px]',
          'lg:text-[17px]',
        )}
      >
        Share via:
      </div>
      <Socials />
    </div>
  );
};

const Socials: React.FC = () => {
  return (
    <div className={cx('flex gap-[20px]', 'md:gap-[45px]')}>
      <FacebookShareButton url={'http://3.106.128.104:5000/'}>
        <img className="lg:hidden" src={FacebookMobile} alt="social" />
        <img
          className="hidden lg:block w-[40px]"
          src={FacebookWeb}
          alt="social"
        />
      </FacebookShareButton>
      <TwitterShareButton url={'http://3.106.128.104:5000/'}>
        <img className="lg:hidden" src={TwitterMobile} alt="social" />
        <img
          className="hidden lg:block w-[40px]"
          src={TwitterWeb}
          alt="social"
        />
      </TwitterShareButton>
      <TelegramShareButton url={'http://3.106.128.104:5000/'}>
        <img className="lg:hidden" src={TelegramMobile} alt="social" />
        <img
          className="hidden lg:block w-[40px]"
          src={TelegramWeb}
          alt="social"
        />
      </TelegramShareButton>
      <div>
        <img className="lg:hidden" src={DiscordMobile} alt="social" />
        <img
          className="hidden lg:block w-[40px]"
          src={DiscordWeb}
          alt="social"
        />
      </div>
      {/* {SocialIcons.map((icon, index) => {
        return (
          <div className="">
            <img className='lg:hidden' src={icon.mobile} alt="social" />
            <img className='hidden lg:block w-[40px]' src={icon.web} alt="social" />
          </div>
        );
      })} */}
    </div>
  );
};

export default Share;
