import firebaseApi from "services/firebase";
import firebase from "firebase";

const QUOTE_LIST_PATH = "quote-list";

const getQuoteList = (): Promise<firebase.database.DataSnapshot> => {
    return firebaseApi.db.ref(QUOTE_LIST_PATH).get();
};

const QuoteApi = {
    getQuoteList,
};

export default QuoteApi;
