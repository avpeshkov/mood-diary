import firebaseApi from "services/firebase";

const { auth } = firebaseApi;
export const getCurrentUserUid = (): string => (auth().currentUser ? auth().currentUser!.uid : "");

export const signUp = (email: string, password: string) => {
    return auth().createUserWithEmailAndPassword(email, password);
};

export const signIn = (email: string, password: string) => {
    return auth().signInWithEmailAndPassword(email, password);
};

export const signInWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
};
