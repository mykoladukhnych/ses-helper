import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ServicesScreen from '../../screens/ServicesScreen';
import NonWarrantyRepairScreen from '../../screens/NonWarrantyRepairScreen';
import SettingsScreen from '../../screens/SettingsScreen';

const MainLayoutStack = createNativeStackNavigator();
const MainLayoutTabs = createBottomTabNavigator();

const MainTabs = () => {
    return(
        <MainLayoutTabs.Navigator screenOptions={{headerShown: false}}>
            <MainLayoutTabs.Screen name='Services' component={ServicesScreen} />
            <MainLayoutTabs.Screen name='NonWarrantyRepair' component={NonWarrantyRepairScreen} />
        </MainLayoutTabs.Navigator>
    )
}

const MainLayout = () => {
    return(
        <MainLayoutStack.Navigator>
            <MainLayoutStack.Screen name='Main' component={MainTabs} />
            <MainLayoutStack.Screen name='Settings' component={SettingsScreen}/>
        </MainLayoutStack.Navigator>
    )
}

export default MainLayout;