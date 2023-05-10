import cx from 'classnames';

interface PageButtonProps {
  value: string;
  onClick: () => void;
  variant?: boolean;
}

const PageButton: React.FC<PageButtonProps> = ({ 
  value, 
  onClick,
  variant
 }) => {
  return (
    <button
      className={cx("flex justify-center items-center min-w-[24px] md:min-w-[42px] h-[24px] md:h-[24px] relative bg-transparent outline-none text-center rounded cursor-pointer text-[12px] md:text-[15px]",
        variant? 'border-none' : 'border border-[#484848]'
      )}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default PageButton;
