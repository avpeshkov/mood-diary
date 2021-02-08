import { Steps, StepsTypes } from "modules/QuoteBlock/types";

export const getRandomIndex = (arrayLength: number): number => Math.floor(Math.random() * Math.floor(arrayLength));

export const getNewQuoteId = (oldId: number, quoteListLength: number, position: StepsTypes): number => {
    let newId: number = oldId;
    position === Steps.NEXT ? newId++ : newId--;
    if (newId === -1) {
        newId = quoteListLength - 1;
    } else if (newId >= quoteListLength) {
        newId = quoteListLength - newId;
    }
    return newId;
};
