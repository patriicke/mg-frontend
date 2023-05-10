interface MenuItemProps {
  title: string;
  iconSrc: string;
  variant?: boolean;
  link?: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  iconSrc,
  variant,
  onClick
}) => {
  return (
    <div
      className='relative flex flex-col justify-end items-center pb-[9px] md:pb-[12px] cursor-pointer transform hover:scale-105'
      onClick={onClick}
    >
      <div
        className={
          "w-[35px] h-[35px] flex justify-center items-center rounded-full " +
          (variant
            ? "w-[50px] h-[50px] absolute top-0 -translate-y-1/2 translate-x-0 border border-[#707070] rounded-full shadow-[0_0_0_7px_rgba(0,0,0,0.3)] bg-second-bg-color"
            : "")
        }
      >
        <img src={iconSrc} alt='menuicon' className='max-w-full' />
      </div>
      <div className='text-[12px] md:text-[15px] font-[200] font-GeogrotesqueWide'>
        {title}
      </div>
    </div>
  );
};

export default MenuItem;
