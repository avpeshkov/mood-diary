export const getRandomIndex = (arrayLength: number): number => Math.floor(Math.random() * Math.floor(arrayLength));

export const getNewQuoteId = (oldId: number, quoteListLength: number, position: "next" | "previous"): number => {
    let newId: number = oldId;
    switch (position) {
        case "next":
            newId++;
            break;
        case "previous":
            newId--;
            break;
    }
    if (newId === -1) {
        newId = quoteListLength - 1;
    } else if (newId >= quoteListLength) {
        newId = quoteListLength - newId;
    }
    return newId;
};
