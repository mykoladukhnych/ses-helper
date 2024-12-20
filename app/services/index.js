import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { setUser, setLoading } from "../store/slices/authSlice";
import { setServices } from "../store/slices/servicesSlice";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

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
                // ...services,             
                warranty: services.warranty,
                easypro: services.easypro,
                devicesetup: services.devicesetup,
                hanguptv: services.hanguptv
            }))
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateEasyProPricelist = async (dispatch) => {
    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/json', 
        });

        if (!result.canceled) {
            const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri);

            try {
                const docRef = doc(FIREBASE_DB, "/services", 'easypro');        
                await updateDoc(docRef, {
                    pricelist: JSON.parse(fileContent)
                });
                fetchServices(dispatch)
                alert("arrayOne успішно оновлено!");
            } catch (error) {
                alert("Помилка при оновленні arrayOne:", error);
            }
        } else {
            alert('Вибір файлу скасовано');
        }
    } catch (error) {
        alert('Помилка вибору файлу:', error);
    }    
}