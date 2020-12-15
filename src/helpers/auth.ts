import firebaseApi from "services/firebase";

const { auth } = firebaseApi;

/**
 * Получение айди авторизованного пользователя
 */
export const getCurrentUserUid = (): string => (auth().currentUser ? auth().currentUser!.uid : "");

/**
 * Регистрация пользователя
 */
export const signUp = (email: string, password: string) => {
    return auth().createUserWithEmailAndPassword(email, password);
};

/**
 * Авторизация пользователя
 */
export const signIn = (email: string, password: string) => {
    return auth().signInWithEmailAndPassword(email, password);
};

/**
 * Авторизация пользователя через  google
 */
export const signInWithGoogle = () => {
    // @ts-ignore
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
};
