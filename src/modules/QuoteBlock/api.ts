import firebase from "firebase";
import firebaseApi from "utils/firebase";

const QUOTE_LIST_PATH = "quote-list";
/**
 *   Получаем записи цитат
 */
const getQuoteList = (): Promise<firebase.database.DataSnapshot> => {
    return firebaseApi.db.ref(QUOTE_LIST_PATH).get();
};
const QuoteApi = {
    getQuoteList,
};
export default QuoteApi;
