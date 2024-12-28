import { useDispatch, useSelector } from "react-redux"
import { fetchData, updateEasyPro } from "../services";
import { setServicesData } from "../store/slices/servicesSlice";
import { setInformationData } from "../store/slices/informationSlice";


export const useFirebaseData = () => {
    const dispatch = useDispatch();

    const fetchServices = async () => {
        const services = await fetchData("/services");
        dispatch(setServicesData({
            warranty: services.warranty,
            easypro: services.easypro,
            devicesetup: services.devicesetup,
            hanguptv: services.hanguptv
        }));
    }

    const fetchInformation = async () => {
        const information = await fetchData("/information");

        dispatch(setInformationData({
            ...information
        }));
    }

    const updateEasyProPricelist = async () => {
        await updateEasyPro();
        await fetchServices();
    }

    return { fetchServices, fetchInformation, updateEasyProPricelist }
    

}