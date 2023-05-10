import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';
import SvgLoader from 'components/DynamicSvg';

interface IProps {
  label: string;
  value: string;
  options: any[];
  setLabel: React.Dispatch<React.SetStateAction<string>>;
  className: string;
}

const WalletDropdown = ({
  label,
  value,
  options,
  setLabel,
  className,
}: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: any) => {
    setLabel(option.name);
    setSelected([option]);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    setSelected(options.filter((option) => option.name === label));
  }, [options]);

  return (
    <div className={className}>
      <div
        className={cx(
          'flex justify-between items-center p-4 rounded-lg cursor-pointer text-white bg-[#15171B] border-2 border-[#343434] text-base font-medium break-all',
          { 'rounded-b-none border-b-0 ': isOpen },
        )}
        onClick={toggle}
      >
        <div className="flex gap-2 items-center">
          <div className="min-w-[20px] h-[20px] aspect-auto ">
            <SvgLoader name={label} />
          </div>
          {value}
        </div>
        {isOpen ? (
          <BiChevronDown className="text-white min-w-[20px]" />
        ) : (
          <BiChevronRight className="text-white min-w-[20px]" />
        )}
      </div>
      {/* {isOpen && (
        <div className="absolute z-10 top-full left-0 w-full">
          <div className="py-2 bg-[#15171B] rounded-b-lg shadow-lg border-2 border-[#343434] border-t-0 h-48 overflow-y-auto">
            {options.map((option: any) => (
              <div
                key={option.value}
                className={cx(
                  'm-2 px-2 py-1 cursor-pointer text-[13px] text-gray-300 font-normal hover:text-white',
                  {
                    'text-white relative': selected.includes(option),
                  },
                )}
                onClick={() => handleOptionClick(option)}
              >
                <p>{option.name || option.label}</p>
                {selected.includes(option) && (
                  <span className="absolute top-1/2 right-1 transform -translate-y-1/2 h-2 w-2 bg-white rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      )} */}
      {isOpen && (
        <div className="absolute z-10 left-0 w-full px-2">
          <div className="py-2 bg-[#15171B] rounded-b-lg shadow-lg border-2 border-[#343434] border-t-0">
            <input
              type="text"
              placeholder="Search"
              className="block w-5/6 p-2 mx-auto mb-2 bg-[#15171B] text-white text-[14px] border border-[#343434] rounded-lg focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredOptions.length > 0 ? (
              <div className="h-48 overflow-y-auto">
                {filteredOptions.map((option: any) => (
                  <div
                    key={option.value}
                    className={cx(
                      'm-3 px-2 py-1 cursor-pointer text-[13px] text-gray-300 font-normal hover:text-white',
                      {
                        'text-white relative': selected.includes(option),
                      },
                    )}
                    onClick={() => handleOptionClick(option)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-[20px] h-[20px] aspect-auto">
                        <SvgLoader name={option.name || option.label} />
                      </div>
                      <p> {option.name || option.label}</p>
                    </div>
                    {selected.includes(option) && (
                      <span className="absolute top-1/2 right-1 transform -translate-y-1/2 h-2 w-2 bg-white rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[12px] text-center text-white">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletDropdown;
