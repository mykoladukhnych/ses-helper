import { Pressable, useColorScheme, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ServicesScreen from '../../screens/ServicesScreen';
import NonWarrantyRepairScreen from '../../screens/NonWarrantyRepairScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import WarrantyScreen from '../../screens/WarrantyScreen';
import EasyproScreen from '../../screens/EasyproScreen';
import InfoScreen from '../../screens/InfoScreen';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MyDarkTheme, MyLightTheme } from '../../theme/theme';

const MainLayoutStack = createNativeStackNavigator();
const MainLayoutTabs = createBottomTabNavigator();

const MainTabs = ({ navigation }) => {
    const theme = useColorScheme();

    return(
        <MainLayoutTabs.Navigator screenOptions={{
            headerRight: () => (
                <Pressable style={{marginRight: 15}} onPress={() => navigation.navigate('Settings')} >
                    <MaterialCommunityIcons name="cog" size={24} color={theme === 'dark' ? 'white' : 'black'} />
                </Pressable>
            ),
            tabBarStyle: {
                height: 70,
            },
            tabBarActiveBackgroundColor: theme === 'dark' ? MyDarkTheme.colors.cardChild : null,   
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
                            color: focused ?
                                theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.theme
                                : color
                            }}
                        >Сервіси</Text>
                    ),
                    tabBarIcon: ({focused, color}) => (
                        <MaterialCommunityIcons 
                            name="apps" 
                            size={24} 
                            color={focused ? theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text : color} />
                    ),
                    tabBarActiveTintColor: theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text
                }}
            />
            <MainLayoutTabs.Screen 
                name='Info' 
                component={InfoScreen} 
                options={{
                    headerTitle: 'Інформація', 
                    headerTitleAlign: 'center',
                    tabBarLabel: ({color, focused}) => (
                        <Text style={{
                            fontSize: 12,
                            textAlign:'center', 
                            color: focused ?
                                theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.theme
                                : color
                            }}
                        >Інформація</Text>
                    ),
                    tabBarIcon: ({focused, color}) => (
                        <MaterialCommunityIcons 
                            name="information" 
                            size={24} 
                            color={focused ? theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text : color} />
                    ),
                    tabBarActiveTintColor: theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text
                }}
            />
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
                            color: focused ?
                                theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.theme
                                : color
                            }}
                        >Негарантійний{'\n'}ремонт</Text>
                    ),
                    tabBarIcon: ({focused, color}) => (
                        <FontAwesome 
                            name="money" 
                            size={24} 
                            color={focused ? theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text : color}/>
                    ),
                    tabBarActiveTintColor: theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text
                }} 
            />
        </MainLayoutTabs.Navigator>
    )
}

const MainLayout = () => {
    return(
        <MainLayoutStack.Navigator>
            <MainLayoutStack.Screen name='Main' component={MainTabs} options={{headerShown: false}} />
            <MainLayoutStack.Screen name='warranty' component={WarrantyScreen} options={{headerTitle: 'Гарантійний захист', headerTitleAlign: 'center'}} />
            <MainLayoutStack.Screen name='easypro' component={EasyproScreen} options={{headerTitle: 'Послуга Easy Pro', headerTitleAlign: 'center'}} />
            <MainLayoutStack.Screen name='Settings' component={SettingsScreen}/>
        </MainLayoutStack.Navigator>
    )
}

export default MainLayout;