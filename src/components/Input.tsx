import { ChangeEvent, ChangeEventHandler } from 'react';

import cx from 'classnames';

interface InputProps {
  placeholder?: string;
  value?: string;
  id?: string;
  readonly?: boolean;
  handleChange?: () => void;
}

const Input: React.FC<InputProps>  = ({placeholder, handleChange, value, readonly, id}) => {
  return (
    <input id={id} disabled={readonly} value={value} className={cx('w-full border bg-[#15171B] px-[14px] py-[15px] border-[#484848] rounded-[12px] placeholder-[#858585] max-w-[400px] text-[15px]', 'lg:px-[20px] lg:py-[22px] lg:text-[17px]')} placeholder={placeholder} onChange={handleChange} />
  )
}

export default Input;