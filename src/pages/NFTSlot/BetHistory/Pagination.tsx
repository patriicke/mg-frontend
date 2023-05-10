import React from 'react';
import cx from 'classnames';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

type Props = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (pageNumber: number) => void;
};

const Pagination: React.FC<Props> = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const getPageButtonClasses = (pageNumber: number) =>
    cx('mx-1 px-3 py-1 border border-[#484848] rounded-md', {
      'border-white text-white': currentPage === pageNumber,
      'hover:text-white hover:border-white text-[#484848]':
        currentPage !== pageNumber,
    });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const getPageButtons = () => {
    const pageButtons = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={getPageButtonClasses(i)}
          >
            {i}
          </button>,
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageButtons.push(
          <button
            key={i}
            disabled
            className="px-3 py-1"
          >
            ...
          </button>,
        );
      }
    }

    return pageButtons;
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center space-x-3">
      <div className="w-full px-8 mb-5 sm:mb-0 flex justify-center">{getPageButtons()}</div>
      {totalPages > 0 && (
        <div className='flex gap-2'>
          <button
            onClick={onPrevious}
            disabled={isFirstPage}
            className={cx(
              'px-2 py-1 border border-[#484848] bg-[#484848] text-black rounded-md',
              {
                'cursor-not-allowed': isFirstPage,
                'hover:text-white hover:border-white': !isFirstPage,
              },
            )}
          >
            <FiArrowLeft className="text-2xl" />
          </button>
          <button
            onClick={onNext}
            disabled={isLastPage}
            className={cx(
              'px-2 py-1 border border-[#484848] bg-[#484848] rounded-md text-black',
              {
                'cursor-not-allowed': isLastPage,
                'hover:text-white hover:border-white': !isLastPage,
              },
            )}
          >
            <FiArrowRight className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
