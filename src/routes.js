// React app navigation container, stack navigator & react
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

// App pages
import Main from './pages/Main';
import Settings from './pages/Settings';

// Header buttons
import SettingsButton from './components/SettingsButton';
import ClearButton from './components/ClearButton';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: ({ navigation }) => ({
                title: 'My Assistant',
                headerLeft: () => (<SettingsButton navigate={() => navigation.navigate('Settings')} />),
                headerLeftContainerStyle: { paddingHorizontal: 8 },
                headerRight: () => (<ClearButton />),
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
