import cx from "classnames";

import Link from "./Link";
import Share from "./Share";

const Invite: React.FC = () => {
  return (
    <div
      className={cx(
        "bg-gradient-to-b from-primary-bg-color to-[#2e3612] w-full rounded-[12px] px-[14px] py-[22px] flex flex-col gap-[14px] mb-[25px]",
        "md:px-[32px] md:py-[32px] md:gap-[32px]"
      )}
    >
      <div className={cx("text-[19px] font-[500]", "lg:text-[22px]")}>Invite friends</div>
      <div className={cx("flex flex-col", "lg:flex-row lg:justify-between lg:items-center")}>
        <Link />
        <Share />
      </div>
    </div>
  );
};

export default Invite;
