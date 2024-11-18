import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../screens/LoginScreen';

const LoginLayoutStack = createNativeStackNavigator();

const LoginLayout = () => {
    return(
        <LoginLayoutStack.Navigator>
            <LoginLayoutStack.Screen 
                name='Login' 
                component={LoginScreen} 
                options={{
                    headerTitle: 'Вхід',
                    headerTitleAlign: 'center',
                }}/>
        </LoginLayoutStack.Navigator>
    )
};

export default LoginLayout;