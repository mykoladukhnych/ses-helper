import { Pressable, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ServicesScreen from '../../screens/ServicesScreen';
import NonWarrantyRepairScreen from '../../screens/NonWarrantyRepairScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import WarrantyScreen from '../../screens/WarrantyScreen';
import EasyproScreen from '../../screens/EasyproScreen';
import InfoScreen from '../../screens/InfoScreen';
import OrdersScreen from '../../screens/InfoScreen';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { updateEasyProPricelist } from '../../services';
import EPDetailsScreen from '../../screens/EPDetailsScreen';
import { useNavigation } from '@react-navigation/native';

const MainLayoutStack = createNativeStackNavigator();
const MainLayoutTabs = createBottomTabNavigator();

const MainTabs = () => {
    const { currentTheme, theme } = useSelector(state => state.theme);
    const navigation = useNavigation();

    return(
        <MainLayoutTabs.Navigator screenOptions={{
            headerRight: () => (
                <Pressable style={{marginRight: 15}} onPress={() => navigation.navigate('Settings')} >
                    <MaterialCommunityIcons name="tune" size={24} color={theme.colors.text} />
                </Pressable>
            ),
            tabBarStyle: {
                height: 70,
            },
            tabBarActiveBackgroundColor: currentTheme === 'dark' ? theme.colors.cardChild : null,   
        }}>
            <MainLayoutTabs.Screen 
                name='Services'  
                component={ServicesScreen} 
                options={{
                    headerTitle: 'Сервіси', 
                    headerTitleAlign: 'center',
                    tabBarLabel: ({color, focused}) => (
                        <Text style={{
                            fontSize: 12,
                            textAlign:'center', 
                            color: focused ? theme.colors.text : color
                        }}>Сервіси</Text>
                    ),
                    tabBarIcon: ({focused, color}) => (
                        <MaterialCommunityIcons 
                            name="apps" 
                            size={24} 
                            color={focused ? theme.colors.text : color} />
                    ),
                    tabBarActiveTintColor: theme.colors.text
                }}
            />
            {/* <MainLayoutTabs.Screen 
                name='Info' 
                component={InfoScreen} 
                options={{
                    headerTitle: 'Інформація', 
                    headerTitleAlign: 'center',
                    tabBarLabel: ({color, focused}) => (
                        <Text style={{
                            fontSize: 12,
                            textAlign:'center', 
                            color: focused ? theme.colors.text : color
                        }}>Інформація</Text>
                    ),
                    tabBarIcon: ({focused, color}) => (
                        <MaterialCommunityIcons 
                            name="information" 
                            size={24} 
                            color={focused ? theme.colors.text : color} />
                    ),
                    tabBarActiveTintColor: theme.colors.text
                }}
            /> */}
            
            {/* <MainLayoutTabs.Screen 
                name='Orders' 
                component={OrdersScreen} 
                options={{
                    headerTitle: 'Замовлення', 
                    headerTitleAlign: 'center',
                    tabBarLabel: ({color, focused}) => (
                        <Text style={{
                            fontSize: 12,
                            textAlign:'center', 
                            color: focused ? theme.colors.text : color
                        }}>Замовлення</Text>
                    ),
                    tabBarIcon: ({focused, color}) => (
                        <MaterialCommunityIcons 
                            name="order-bool-descending-variant" 
                            size={24} 
                            color={focused ? theme.colors.text : color} />
                    ),
                    tabBarActiveTintColor: theme.colors.text
                }}
            /> */}
            <MainLayoutTabs.Screen 
                name='NonWarrantyRepair' 
                component={NonWarrantyRepairScreen} 
                options={{
                    headerTitle: 'Негарантійний ремонт', 
                    headerTitleAlign: 'center',
                    tabBarLabel: ({color, focused}) => (
                        <Text style={{
                            fontSize: 12,
                            textAlign:'center', 
                            color: focused ? theme.colors.text : color
                        }}>Негарантійний{'\n'}ремонт</Text>
                    ),
                    tabBarIcon: ({focused, color}) => (
                        <FontAwesome 
                            name="money" 
                            size={24} 
                            color={focused ? theme.colors.text : color}/>
                    ),
                    tabBarActiveTintColor: theme.colors.text
                }} 
            />
        </MainLayoutTabs.Navigator>
    )
}

const MainLayout = () => {
    const {theme} = useSelector(state => state.theme);
    const {user} = useSelector(state => state.auth);
    const navigation = useNavigation();
    

    return(
        <MainLayoutStack.Navigator>
            <MainLayoutStack.Screen 
                name='Main' 
                component={MainTabs} 
                options={{headerShown: false}} 
            />
            <MainLayoutStack.Screen 
                name='warranty' 
                component={WarrantyScreen} 
                options={{headerTitle: 'Гарантійний захист', 
                headerTitleAlign: 'center'}} 
            />
            <MainLayoutStack.Screen 
                name='easypro' 
                component={EasyproScreen} 
                options={{
                    headerTitle: 'Послуга Easy Pro', 
                    headerTitleAlign: 'center',
                    headerRight: () => (
                            <>
                                {
                                    user.admin ? 
                                        <Pressable style={{marginRight: 15}} onPress={updateEasyProPricelist} >
                                            <MaterialCommunityIcons name="database-refresh" size={24} color={theme.colors.text} />
                                        </Pressable>
                                    : null
                                }
                                <Pressable style={{marginRight: 15}} >
                                    <MaterialCommunityIcons name="information" size={24} color={theme.colors.text} onPress={() => navigation.navigate('epdetails')} />
                                </Pressable>  
                                
                            </>
                    ),
                }} 
            />
            <MainLayoutStack.Screen 
                name='epdetails' 
                component={EPDetailsScreen} 
                options={{headerTitle: 'Що таке Easy Pro', 
                headerTitleAlign: 'center'}} 
            />
            <MainLayoutStack.Screen 
                name='Settings' 
                component={SettingsScreen}
            />
        </MainLayoutStack.Navigator>
    )
}

export default MainLayout;