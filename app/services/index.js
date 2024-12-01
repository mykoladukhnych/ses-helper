import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";
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
                easypro: services.easypro,
                devicesetup: services.devicesetup
            }))
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateEasyProPricelist = async (newPricelist) => {
    try {
        const docRef = doc(FIREBASE_DB, "/services", 'easypro');

        await updateDoc(docRef, {
            pricelist: newPricelist
        });
        alert("arrayOne успішно оновлено!");
    } catch (error) {
        alert("Помилка при оновленні arrayOne:", error);
    }
}