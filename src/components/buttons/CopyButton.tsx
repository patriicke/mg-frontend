import copyImgMobile from "assets/images/button/copy.png";

import cx from "classnames";

interface CopyProps {
  copyCallback?: any;
}

const CopyButton: React.FC<CopyProps> = ({ copyCallback }) => {
  return (
    <button
      onClick={copyCallback}
      className={cx(
        "bg-primary-button-bg-color min-w-[58px] rounded-[12px] flex justify-center items-center",
        "md:w-[92px]"
      )}
    >
      <img src={copyImgMobile} alt="copy" />
    </button>
  );
};

export default CopyButton;
