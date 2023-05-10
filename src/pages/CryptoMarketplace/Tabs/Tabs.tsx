import React from 'react';
import cx from 'classnames';

interface IProps {
  label: string;
  active: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const Tab = ({ label, active, onClick }: IProps) => {
  const tabClasses = cx(
    'mr-2 py-[10px] px-[17px] rounded-lg flex items-center cursor-pointer text-[9px] sm:text-[14px] font-medium',
    { 'bg-[#B0D512] backdrop-blur-[20px] text-[#0F1012]': active },
    { 'bg-gray-700 text-gray-300': !active },
  );

  return (
    <div className={tabClasses} onClick={onClick}>
      {label}
    </div>
  );
};

export default Tab;