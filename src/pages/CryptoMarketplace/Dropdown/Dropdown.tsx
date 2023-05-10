import React, { useEffect, useState } from "react";
import cx from "classnames";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";

interface IProps {
  label: string;
  options: any[];
  multiSelect: boolean;
  onContractSelect?: any;
  setValue?: any;
  updatedSelected?: any;
}

const Dropdown = ({
  label,
  options,
  setValue,
  multiSelect,
  onContractSelect,
  updatedSelected,
}: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<any[]>([]);

  const toggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: any) => {
    if (multiSelect) {
      if (selected.includes(option)) {
        setSelected(selected.filter((item) => item !== option));
      } else {
        setSelected([...selected, option]);
        onContractSelect && onContractSelect(option.value);
      }
    } else {
      setValue && setValue(option.value);
      setSelected([option]);
      onContractSelect && onContractSelect(option.value);
      setIsOpen(false);
    }
  };

  const handleClearClick = () => {
    if (onContractSelect) {
      onContractSelect(options[0].label, options[0].value);
    }

    setSelected([options[0]]);
  };

  const dropdownClasses = cx(
    "ml-2 relative w-48",
    { "text-white": isOpen },
    { "text-gray-300": !isOpen }
  );

  // useEffect(() => {
  //   if (options.length === 0) return;
  //   setSelected([...selected, updatedSelected]);
  //   setValue(updatedSelected.value);
  // }, [options, updatedSelected]);

  useEffect(() => {
    if (updatedSelected.value) {
      setSelected([updatedSelected]);
    }
  }, [updatedSelected]);

  return (
    <div className="flex items-center justify-end">
      <div className={dropdownClasses}>
        <div
          className={cx(
            'flex justify-between items-center p-[10px] rounded-lg cursor-pointer text-[#B0D412] bg-[#15171B] border-2 border-[#343434] text-[14px] md:text-lg font-medium',
            { 'rounded-b-none border-b-0 ': isOpen },
          )}
          onClick={toggle}
        >
          {label}{' '}
          {isOpen ? (
            <BiChevronDown className="text-white" />
          ) : (
            <BiChevronRight className="text-white" />
          )}
        </div>
        {isOpen && (
          <div className="absolute z-10 top-full left-0 w-full">
            {multiSelect && (
              <div className="px-2 py-0 bg-[#15171B] shadow-lg border-2 border-[#343434]  text-[13px] font-normal">
                <button
                  className="px-2 py-1 rounded-md bg-transparent text-white"
                  onClick={handleClearClick}
                >
                  Clear All
                </button>
              </div>
            )}
            <div className="py-2 bg-[#15171B] rounded-b-lg shadow-lg border-2 border-[#343434] border-t-0 max-h-[250px] overflow-y-scroll">
              {options.map((option: any) => (
                <div
                  key={option.value}
                  className={cx(
                    'm-2 px-2 py-1 cursor-pointer text-[13px] font-normal hover:text-[#B0D412]',
                    {
                      'border-2 border-[#B0D412] relative':
                        selected.includes(option) && !multiSelect,
                    },
                  )}
                  onClick={() => handleOptionClick(option)}
                >
                  {multiSelect && (
                    <label className="inline-flex items-center w-100">
                      <input
                        type="checkbox"
                        className="accent-[#B0D412] text-white"
                        checked={selected.includes(option)}
                        onChange={() => handleOptionClick(option)}
                      />
                      <span className="ml-2">{option.label}</span>
                    </label>
                  )}
                  {!multiSelect && (
                    <>
                      <p>{option.label}</p>
                      {selected.includes(option) && (
                        <span className="absolute top-1/2 right-1 transform -translate-y-1/2 h-2 w-2 bg-[#B0D412] rounded-full" />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
