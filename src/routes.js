import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './pages/Main';
import Settings from './pages/Settings';
import React from 'react';
import SettingsButton from './components/SettingsButton';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: ({ navigation }) => ({
                title: 'My Assistant',
                headerRight: () => (<SettingsButton navigate={() => navigation.navigate('Settings')} />),
                headerRightContainerStyle: { paddingHorizontal: 8 }
            })
        },
        Settings: {
            screen: Settings,
            navigationOptions: {
                title: 'Settings',
            }
        }
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#000',
            headerStyle: {
                backgroundColor: '#ededed',
            }
        }
    })
);

export default Routes;
