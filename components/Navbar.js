import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
const Tab = createBottomTabNavigator();


function Navbar() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={Login} />
        </Tab.Navigator>
        );
    }

export default Navbar;

