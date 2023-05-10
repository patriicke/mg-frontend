import React from "react";
import { FaBars } from "react-icons/fa";

interface Props {
  toggle: () => {};
}

const ToggleButton: React.FC<Props> = ({ toggle }) => {
  return (
    <div className="md:hidden" onClick={() => {}}>
      <FaBars size={20} color="white" />
    </div>
  );
};

export default ToggleButton;
