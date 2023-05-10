import { useState } from "react";

import InviteBonus from "./InviteBonus";
import ComissionRewards from './ComissionRewards';
import Button from './Button';
import { COMMISSION_REWARDS, COMMISSION_REWARDS_LABEL, INVITE_BONUS, INVITE_BONUS_LABEL } from "./Rewrds.constants";

const Rewards: React.FC = () => {
  const [selected, setSelected] = useState(INVITE_BONUS);

  return (
    <div className="">
      <div className="w-full flex gap-[20px] mb-[25px]">
        <Button
          onClick={() => {
            setSelected(INVITE_BONUS);
          }}
          variant={selected !== INVITE_BONUS}
        >
          {INVITE_BONUS_LABEL}
        </Button>
        <Button
          onClick={() => {
            setSelected(COMMISSION_REWARDS);
          }}
          variant={selected !== COMMISSION_REWARDS}
        >
          {COMMISSION_REWARDS_LABEL}
        </Button>
      </div>
      {selected === INVITE_BONUS && <InviteBonus />}
      {selected === COMMISSION_REWARDS && <ComissionRewards />}
    </div>
  );
};

export default Rewards;
