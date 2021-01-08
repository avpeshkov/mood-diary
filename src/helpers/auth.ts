import firebaseApi from "services/firebase";

const { auth } = firebaseApi;

/**
 * Получение айди авторизованного пользователя
 */
const getCurrentUserUid = (): string => (auth().currentUser ? auth().currentUser!.uid : "");

/**
 * Регистрация пользователя
 */
const signUp = (email: string, password: string) => {
    return auth().createUserWithEmailAndPassword(email, password);
};

/**
 * Авторизация пользователя
 */
const signIn = (email: string, password: string) => {
    return auth().signInWithEmailAndPassword(email, password);
};

/**
 * Авторизация пользователя через  google
 */
const signInWithGoogle = () => {
    // @ts-ignore
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
};

const authHelpers = {
    getCurrentUserUid: getCurrentUserUid,
    signUp: signUp,
    signIn: signIn,
    signInWithGoogle: signInWithGoogle,
};

export default authHelpers;
