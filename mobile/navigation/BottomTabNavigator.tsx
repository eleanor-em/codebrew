import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import PrescriptionsScreen from '../screens/PrescriptionsScreen';
import AuthorisationScreen from '../screens/AuthorisationScreen';
import {BottomTabParamList, PrescriptionsParamList, AuthorisationParamList} from '../types';
import LastRepeatScreen from "../screens/LastRepeatScreen";
import CurrentPrescriptionsScreen from "../screens/CurrentPrescriptionsScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Prescriptions"
            tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
            <BottomTab.Screen
                name="Prescriptions"
                component={PrescriptionsNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Authorisation"
                component={AuthorisationNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
    return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const PrescriptionsStack = createStackNavigator<PrescriptionsParamList>();

function PrescriptionsNavigator() {
    return (
        <PrescriptionsStack.Navigator>
            <PrescriptionsStack.Screen
                name="PrescriptionsScreen"
                component={PrescriptionsScreen}
                options={{headerTitle: 'My Prescriptions'}}
            />
            <PrescriptionsStack.Screen
                name="CurrentPrescriptionsScreen"
                component={CurrentPrescriptionsScreen}
                options={{headerTitle: 'Current'}}
            />
            <PrescriptionsStack.Screen
                name="LastRepeatScreen"
                component={LastRepeatScreen}
                options={{headerTitle: 'Last Repeats'}}
            />
        </PrescriptionsStack.Navigator>
    );
}

const AuthorisationStack = createStackNavigator<AuthorisationParamList>();

function AuthorisationNavigator() {
    return (
        <AuthorisationStack.Navigator>
            <AuthorisationStack.Screen
                name="AuthorisationScreen"
                component={AuthorisationScreen}
                options={{headerTitle: 'Authorisation'}}
            />
        </AuthorisationStack.Navigator>
    );
}
