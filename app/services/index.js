import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { setUser, setLoading } from "../store/slices/authSlice";
import { setServices } from "../store/slices/servicesSlice";

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

export const fetchServices = async (dispatch) => {
    try {
        const services = {};

        const querySnapshot = await getDocs(collection(FIREBASE_DB, "/services"));        
        querySnapshot.forEach((doc) => {
            services[doc.id] = doc.data();
        });
        if (services) {
            dispatch(setServices({
                warranty: services.warranty,
                easypro: services.easypro
            }))
        }
    } catch (error) {
        console.log(error)
    }
}