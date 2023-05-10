import { useMemo } from 'react';
import { COLLAPSEDMENULIST, MENULIST, MOBILEMENULIST } from './SideBar.constant';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import cx from 'classnames';

import Logo from './Logo';
import logoMobileImg from 'assets/images/logo/mobile.sidebar.png'

import { BiArrowToLeft, BiArrowFromLeft } from 'react-icons/bi';
import Activities from 'assets/images/sidebar/activities.png';
import RouletteImg from 'assets/images/sidebar/roulette.png';
import Invite from 'assets/images/sidebar/invite.png';
import CustomerService from 'assets/images/sidebar/customer-service.png';

interface SideBarProps {
  isCollapsed: boolean;
  toggleCollpase: () => void;
}

const SideBar: React.FC<SideBarProps> = (props) => {
  const isSmall = useMediaQuery({ maxWidth: 1024 });

  return (
    <>
      {isSmall ? (
        <SideBarMobile {...props} />
      ) : (
        <SideBarWeb {...props}></SideBarWeb>
      )}
    </>
  );
};

const SideBarWeb: React.FC<SideBarProps> = ({
  isCollapsed,
  toggleCollpase,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocation = useMemo(() => {
    const substrings = window.location.href.split('/');
    return substrings[3];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);

  return (
    <div
      className={
        `z-40 absolute h-full md:fixed md:bottom-0 md:left-0 transition-all duration-300 ` +
        (isCollapsed ? 'w-[104px]' : 'w-[240px]')
      }
    >
      <div
        className={
          'relative flex flex-col w-full h-full bg-primary-bg-color shadow-md border-[#484848] border border-l-0 md:rounded-xl pr-4 transition-all duration-300 pt-[18px]'
        }
        aria-label="SideBar"
      >
        <div className="pl-[32px] mb-[12px]">
          <Logo isCollapsed={isCollapsed} />
        </div>
        <div className="flex justify-around items-center py-[16px]">
          <div className="flex justify-between items-center w-full pl-[38px] pr-[12px] font-GeogrotesqueWide font-[800] text-[14px] text-[#686D7B] capitalize">
            {!isCollapsed ? <span>PLAY&nbsp;MODERNGAME</span> : ''}
            <div onClick={toggleCollpase} className="hover:cursor-pointer">
              {isCollapsed ? (
                <BiArrowFromLeft size={24} />
              ) : (
                <BiArrowToLeft size={24} />
              )}
            </div>
          </div>
        </div>
        <ul className="flex flex-col w-full gap-[12px]" aria-label="side-menu">
          {MENULIST.map((menu, index) => (
            <li
              key={index}
              onClick={() => {
                navigate(menu.link);
              }}
              className={`h-[60px] pl-[26px] flex items-center ${menu.link.split('/')[1] === currentLocation
                ? 'bg-gradient-to-r from-[#A7CD02] to-[#282828] text-white'
                : 'text-[#6F6F6F]'
                } rounded-r-full hover:cursor-pointer`}
            >
              <span className="w-[35px] h-[35px] flex justify-center items-center">
                <img src={menu.icon} alt="icon.png" />
              </span>
              {menu.isGradient ? (
                <h2
                  className={cx(
                    'pl-2 absolute left-[74px] text-lg font-extrabold bg-gradient-to-l from-[#E8C13D] to-[#B0D412] bg-clip-text text-transparent transition-opacity',
                    { 'opacity-0': isCollapsed },
                    { 'opacity-100 delay-200': !isCollapsed },
                  )}
                >
                  {menu.title}
                </h2>
              ) : (
                <span
                  className={
                    'pl-2 absolute left-[74px] text-[16px] whitespace-nowrap bg-transparent font-GeogrotesqueWide font-[500] text-[14px] text-center leading-[21px] transition-opacity ' +
                    (isCollapsed ? 'opacity-0' : 'opacity-100 delay-200')
                  }
                >
                  {menu.title}
                </span>
              )}
            </li>
          ))}
          {isCollapsed &&
            COLLAPSEDMENULIST.map((menu, index) => (
              <li
                key={index}
                onClick={() => {
                  navigate(menu.link);
                }}
                className={`h-[60px] pl-[26px] flex items-center ${menu.link === '/' + currentLocation
                  ? 'bg-gradient-to-r from-[#A7CD02] to-[#282828]'
                  : ''
                  } rounded-r-full hover:cursor-pointer`}
              >
                <span className="w-[35px] h-[35px] flex justify-center items-center">
                  <img src={menu.icon} alt="icon.png" />
                </span>
                {menu.isGradient ? (
                  <h2
                    className={cx(
                      'pl-2 absolute left-[74px] text-lg font-extrabold bg-gradient-to-l from-[#E8C13D] to-[#B0D412] bg-clip-text text-transparent transition-opacity',
                      { 'opacity-0': isCollapsed },
                      { 'opacity-100 delay-200': !isCollapsed },
                    )}
                  >
                    {menu.title}
                  </h2>
                ) : (
                  <span
                    className={
                      'pl-2 absolute left-[74px] whitespace-nowrap text-white font-GeogrotesqueWide font-[500] text-[14px] text-center leading-[21px] transition-opacity ' +
                      (isCollapsed ? 'opacity-0' : 'opacity-100 delay-200')
                    }
                  >
                    {menu.title}
                  </span>
                )}
              </li>
            ))}
        </ul>
        <div
          className={cx('flex flex-col gap-2 p-4 mt-5', {
            hidden: isCollapsed,
          })}
        >
          <div
            className={cx(
              'rounded-[15px] hover:bg-gradient-to-l from-[#E8C13D] to-[#B0D412] p-[1px]',
              {
                'bg-gradient-to-l from-[#E8C13D] to-[#B0D412]':
                  location.pathname.includes('/activities'),
              },
            )}
          >
            <img
              src={Activities}
              alt="activities"
              className="cursor-pointer rounded-[15px]"
              onClick={() => navigate('/activities')}
            />
          </div>
          <div className="flex justify-between gap-2">
            <div
              className={cx(
                'rounded-[15px] hover:bg-gradient-to-l from-[#E8C13D] to-[#B0D412] p-[1px]',
                {
                  'bg-gradient-to-l from-[#E8C13D] to-[#B0D412]':
                    location.pathname === '/roulette',
                },
              )}
              onClick={() => navigate('/roulette')}
            >
              <img
                src={RouletteImg}
                alt="roulette"
                className=" cursor-pointer rounded-[15px]"
              />
            </div>
            <div
              className={cx(
                'rounded-[15px] hover:bg-gradient-to-l from-[#E8C13D] to-[#B0D412] p-[1px]',
                {
                  'bg-gradient-to-l from-[#E8C13D] to-[#B0D412]':
                    location.pathname === '/recommend',
                },
              )}
            >
              <img
                src={Invite}
                alt="invite"
                className="cursor-pointer rounded-[15px]"
                onClick={() => navigate('/recommend')}
              />
            </div>
          </div>
          <div
            className={cx(
              'rounded-[15px] hover:bg-gradient-to-l from-[#E8C13D] to-[#B0D412] p-[1px] mt-[20px]',
              {
                'bg-gradient-to-l from-[#E8C13D] to-[#B0D412]':
                  location.pathname.includes('/service'),
              },
            )}
          >
            <img
              src={CustomerService}
              alt="customer service"
              className="cursor-pointer rounded-[15px]"
              onClick={() => navigate('/service')}
            />
          </div>
        </div>
        {/* <div className={cx('p-4 mt-5', { hidden: isCollapsed })}>
          <img
            src={CustomerService}
            alt="customer service"
            className="cursor-pointer rounded-xl hover:shadow-md transform hover:scale-105"
          />
        </div> */}
      </div>
    </div>
  );
};

export const SideBarMobile: React.FC<SideBarProps> = ({
  isCollapsed,
  toggleCollpase,
}) => {
  const navigate = useNavigate();

  const currentLocation = useMemo(() => {
    const substrings = window.location.href.split('/');
    return substrings[3];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);

  return (
    <div
      className={
        'fixed top-0 left-0 bottom-0 right-0 bg-[#15171B] z-[100] transition-all overflow-auto ' +
        (!isCollapsed ? '-translate-x-full' : '')
      }
      aria-label="SideBar-mobile"
    >
      <div
        className="w-full flex px-3 py-[12px] justify-between items-center"
        aria-label="top-bar"
      >
        <div className="">
          <img className="w-[94px]" src={logoMobileImg} alt="mobile-logo.png" />
        </div>
        <div
          className="relative h-auto hover:cursor-pointer p-1"
          onClick={toggleCollpase}
        >
          {isCollapsed ? (
            <BiArrowToLeft size={24} />
          ) : (
            <BiArrowFromLeft size={24} />
          )}
        </div>
      </div>
      <div className="pt-4 w-full px-[14px]" aria-label="menu-list">
        <ul className='bg-[#0F1012] border border-[#484848] backdrop-blur-[25px] rounded-[15px] p-[16px] flex flex-col gap-[15px] mb-[20px] '>
          {
            MOBILEMENULIST.map((menu, index) => {
              return (
                <>
                  {
                    menu.boxView && (
                      <li
                        key={index}
                        onClick={() => {
                          // if (isMobile) {
                          //   toggleSideBar();
                          // }
                          navigate(menu.link);
                          toggleCollpase();
                        }}
                        className={`h-16 py-[5px] font-normal px-[13px] flex gap-[13px] items-center rounded-[7px] ${menu?.color == 'red' ? 'mob-red-bg' : menu.color == 'yellow' ? 'mob-yellow-bg' : 'mob-blue-bg'} hover:cursor-pointer`}
                      >
                        <span className="w-[56px] h-[56px] flex justify-center items-center">
                          <img src={menu.icon} alt="icon.png" />
                        </span>
                        <p className='text-white text-[16px] font-normal flex gap-[10px]'>{menu.title.split(' ')[0]} <span className={`${menu?.color == 'red' ? 'text-[#E08175]' : menu.color == 'yellow' ? 'text-[#FFE398]' : 'text-[#BFB8D7]'}`}>{menu.title.split(' ')[1]}</span></p>
                      </li>
                    )
                  }
                </>
              )
            })
          }
        </ul>
        <ul className='flex flex-col gap-[15px]'>
          {
            MOBILEMENULIST.map((menu, index) => {
              return (<>
                {
                  !menu.boxView && (
                    <li
                      key={index}
                      onClick={() => {
                        // if (isMobile) {
                        //   toggleSideBar();
                        // }
                        navigate(menu.link);
                        toggleCollpase();
                      }}
                      className={`h-[55px] bg-[#0F1012] py-[16px] px-[20px] flex gap-[13px] items-center rounded-[7px] hover:cursor-pointer ${menu.link.split('/')[1] === currentLocation ? 'border border-[#E8C13D] text-white' : 'text-[#6F6F6F]'}`}

                    >
                      <span className="max-w-[22px] max-h-[22px] flex justify-center items-center">
                        <img src={menu.icon} alt="icon.png" />
                      </span>
                      {menu.isGradient ? (
                        <h2 className="text-[14px] font-[500] bg-gradient-to-l from-[#E8C13D] to-[#B0D412] bg-clip-text text-transparent transition-opacity">
                          {menu.title}
                        </h2>
                      ) : (
                        <h2 className="text-[14px] font-[500]">
                          {menu.title}
                        </h2>
                      )}
                    </li>
                  )
                }
              </>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
