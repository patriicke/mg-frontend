import { CardCount, CardLayout, RowCount } from './BetBox.constant.dev';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';

export const findLandPosition = (
  pickedNumbers: number[],
  betResult__: boolean | undefined,
) => {
  let length = pickedNumbers.length;
  let newNumbers = new Array<number>();

  if (betResult__) {
    newNumbers = [...pickedNumbers];
    // setPosition(newPosition);
  } else {
    let newFlags = new Array<boolean>(CardCount).fill(false);

    for (let i = 0; i < length; i += 1) {
      newFlags[pickedNumbers[i]] = true;
    }

    for (let i = 0; i < CardCount; i += 1) {
      if (!newFlags[i]) {
        newNumbers.push(i);
      }
    }
  }

  let newPosition = Math.floor(Math.random() * newNumbers.length);
  return newNumbers[newPosition];
};

export const drawCards = (winRate: number) => {
  const rate = Math.ceil(winRate);

  let newCards = new Array<boolean>(100).fill(false);

  const pickedNumbers = new Array<number>();
  for (let i = 0; i < rate; i += 1) {
    let random;
    do {
      random = Math.floor(Math.random() * CardCount);
    } while (newCards[random] === true);

    newCards[random] = true;
    pickedNumbers.push(random);
  }

  // setPickedNumber(pickedNumbers);

  let newSpins = new Array<boolean>();
  for (let i = 0; i < RowCount; i += 1) {
    for (let j = 0; j < CardCount; j += 1) {
      newSpins.push(newCards[j]);
    }
  }

  // setCards(newSpins);

  return [pickedNumbers, newSpins];
};

type DimensionProps = {
  cardElemWidth: number;
  cardWidth: number;
  cardHeight: number;
  cardMargin: number;
};

export const useCardDimension = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [dimension, setDimension] = useState<DimensionProps>({
    cardElemWidth: CardLayout.mobile.width + CardLayout.mobile.margin * 2,
    cardWidth: CardLayout.mobile.width,
    cardHeight: CardLayout.mobile.height,
    cardMargin: CardLayout.mobile.margin,
  });

  useEffect(() => {
    if (isMobile) {
      setDimension({
        cardElemWidth: CardLayout.mobile.width + CardLayout.mobile.margin * 2,
        cardWidth: CardLayout.mobile.width,
        cardHeight: CardLayout.mobile.height,
        cardMargin: CardLayout.mobile.margin,
      });
    } else {
      setDimension({
        cardElemWidth: CardLayout.desktop.width + CardLayout.desktop.margin * 2,
        cardWidth: CardLayout.desktop.width,
        cardHeight: CardLayout.desktop.height,
        cardMargin: CardLayout.desktop.margin,
      });
    }
  }, [isMobile]);

  return { ...dimension };
};
