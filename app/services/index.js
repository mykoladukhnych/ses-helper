import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { setUser, setLoading } from "../store/slices/authSlice";

export const fetchUserData = async (id, email, token, dispatch) => {
    try {
        const userRef = doc(FIREBASE_DB, "/users", id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            dispatch(setUser({ ...userSnap.data(), id, email, token }));
        } else {
            alert("User data not found");
            dispatch(setError("User data not found"));
        }
    } catch (error) {
        alert(error.message);
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
}