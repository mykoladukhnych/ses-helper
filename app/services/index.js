import { doc, getDoc, collection, getDocs, updateDoc, arrayUnion } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import { setUser, setLoading } from "../store/slices/authSlice";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

// User
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

// Services
export const fetchData = async (path) => {
    try {
        const data = {};

        const querySnapshot = await getDocs(collection(FIREBASE_DB, path));        
        querySnapshot.forEach((doc) => {
            data[doc.id] = doc.data();
        });

        if (data) return(data);
    } catch (error) {
        console.log(error)
    }
}

export const updateEasyPro = async () => {
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

// Orders
export const addOrderToFirestore = async (userId, newOrder) => {
    try {
        const userDocRef = doc(FIREBASE_DB, "users", userId);
        await updateDoc(userDocRef, {
            orders: arrayUnion(newOrder),
        });
    } catch (error) {
        console.error("Помилка додавання замовлення: ", error);
    }
};

export const updateOrderStatusInFirestore = async (userId, orderIndex, newStatus) => {
    try {
        const userRef = doc(FIREBASE_DB, "users", userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const orders = userData.orders;
    
            if (orders && orders[orderIndex]) {
                orders[orderIndex].status = newStatus;
                await updateDoc(userRef, { orders });
                return orders;
            } else {
                alert("Замовлення за індексом не знайдено!");
            }
        } else {
            alert("Документ користувача не існує!");
        }
    } catch (error) {
        alert("Помилка оновлення статусу:", error);
    }
};

export const deleteOrderFromFirestore = async (user, indexToRemove) => {
    try {
        const userDocRef = doc(FIREBASE_DB, "users", user.id);
        const orders = user.orders.filter((_, index) => index !== indexToRemove);
        await updateDoc(userDocRef, { orders });
        return orders;
    } catch (error) {
        console.error("Помилка при видаленні замовлення:", error);
    }
};