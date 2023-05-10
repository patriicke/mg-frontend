import cx from 'classnames';
import { useLocalStorage } from 'hooks/useLocalstorage';
import { v4 as uuidv4 } from 'uuid';

interface HistoryProps {
  imgSrc: string;
}

interface BetHistoryProps {
  histories?: HistoryProps[];
}

const BetHistory: React.FC<BetHistoryProps> = ({ histories }) => {
  const [betHistory, setBetHistory] = useLocalStorage<any>('cryptoBetHistory', []);

  return (
    <ul
      className={cx(
        'flex flex-row-reverse min-h-[45px] py-[14.5px] px-2 list-none overflow-x-auto overflow-y-hidden gap-[4px]',
        'lg:gap-[12px] lg:h-[90px]',
      )}
    >
      {betHistory.map((history: any) => {
        return (
          <li key={uuidv4()}>
            <div
              className={cx(
                'rounded overflow-hidden flex-auto relative w-[40px]',
                'lg:w-[66px]',
              )}
            >
              <img
                src={
                  history.won
                    ? history.image
                    : 'https://i.ibb.co/vLpvPWH/lost-img.png'
                }
                alt="history"
                className={cx(
                  'w-[40px] h-[40px] object-cover',
                  'lg:w-[66px] lg:h-[66px]',
                )}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default BetHistory;
