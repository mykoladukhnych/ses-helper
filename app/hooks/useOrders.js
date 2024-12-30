import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../store/slices/authSlice";
import { addOrderToFirestore, updateOrderStatusInFirestore, deleteOrderFromFirestore } from "../services";

export const useOrders = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const addNewOrder = async (newOrder) => {
        await addOrderToFirestore(user.id, newOrder);
        dispatch(setOrders([...user.orders, newOrder]));
    }

    const updateOrderStatus = async (index, newStatus) => {
        const orders = await updateOrderStatusInFirestore(user.id, index, newStatus);
        dispatch(setOrders(orders))
    }

    const deleteOrderByIndex = async (index) => {
        const orders = await deleteOrderFromFirestore(user, index);
        dispatch(setOrders(orders));
    }

    return { addNewOrder, updateOrderStatus, deleteOrderByIndex, orders: user.orders }
}