import homeIcon from 'assets/images/sidebar/home.png'
import nftSlotIcon from 'assets/images/sidebar/nftslot.png'
import cryptoSlotIcon from 'assets/images/sidebar/cryptoslot.png'
import favouriteIcon from 'assets/images/sidebar/favourite.png';
import serviceIcon from 'assets/images/sidebar/serviceCollapsed.png';
import inviteIcon from 'assets/images/sidebar/recommendCollapsed.png';
import rouletteIcon from 'assets/images/sidebar/rouletteCollapsed.png';
import activitiesIcon from 'assets/images/sidebar/activitiesCollapsed.png';

export const MENULIST = [
  {
    title: 'Home',
    link: '/',
    icon: homeIcon,
    isGradient: false,
  },
  {
    title: 'NFT Slots',
    link: '/nftslot/all',
    icon: nftSlotIcon,
    isGradient: true,
  },
  {
    title: 'Crypto Slots',
    link: '/cryptoslot',
    icon: cryptoSlotIcon,
    isGradient: true,
  },
  {
    title: 'Favourite',
    link: '/favourite',
    icon: favouriteIcon,
    isGradient: false,
  },
];

export const COLLAPSEDMENULIST = [
  {
    title: 'Bonus',
    link: '/activities',
    icon: activitiesIcon,
    isGradient: false,
  },
  {
    title: 'Roulette',
    link: '/roulette',
    icon: rouletteIcon,
    isGradient: false,
  },
  {
    title: 'Recommend',
    link: '/recommend',
    icon: inviteIcon,
    isGradient: false,
  },
  {
    title: 'Service',
    link: '/service',
    icon: serviceIcon,
    isGradient: false,
  },
];

export const MOBILEMENULIST = [
  {
    title: 'Preferential Activities',
    link: '/activities',
    icon: activitiesIcon,
    isGradient: false,
    boxView: true,
    color: 'red',
  },
  {
    title: 'Lottery Wheel',
    link: '/roulette',
    icon: rouletteIcon,
    isGradient: false,
    boxView: true,
    color: 'yellow',
  },
  {
    title: 'Invite Friends',
    link: '/recommend',
    isGradient: false,
    icon: inviteIcon,
    boxView: true,
    color: 'blue',
  },
  {
    title: 'NFT Slots',
    link: '/nftslot/all',
    icon: nftSlotIcon,
    isGradient: true,
    boxView: false,
  },
  {
    title: 'Crypto Slots',
    link: '/cryptoslot',
    icon: cryptoSlotIcon,
    isGradient: true,
    boxView: false,
  },
  {
    title: 'Favourite',
    link: '/favourite',
    icon: favouriteIcon,
    isGradient: false,
    boxView: false,
  },
  {
    title: 'Customer service support',
    link: '/service',
    icon: serviceIcon,
    isGradient: false,
    boxView: false,
  },
];
