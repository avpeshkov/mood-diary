import axios, { AxiosResponse } from "axios";
import { QuoteObject, QuoteObjectResponse } from "types/quote";

export const QUOTE_LIST_API = "http://localhost:3001/quote-list/";

export const getQuoteList = (callBack: (moodList: QuoteObject[]) => void) => {
    axios
        .get(QUOTE_LIST_API)
        .then(({ data }: AxiosResponse<QuoteObjectResponse[]>) => {
            callBack(data);
        })
        .catch((error) => {
            console.log(error);
        });
};
