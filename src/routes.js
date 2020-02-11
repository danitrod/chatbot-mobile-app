// React app navigation container, stack navigator & react
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';

// App pages
import Main from './pages/Main';
import Settings from './pages/Settings';

// Header components
import Title from './components/Header/Title';
import SettingsButton from './components/Header/SettingsButton';
import ClearButton from './components/Header/ClearButton';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: ({ navigation }) => ({
                headerTitle: () => (<Title />),
                headerTitleContainerStyle: { width: '60%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8 },
                headerLeft: () => (<SettingsButton navigate={() => navigation.navigate('Settings')} />),
                headerLeftContainerStyle: { width: '20%', paddingHorizontal: 8 },
                headerRight: () => (<ClearButton />),
                headerRightContainerStyle: { width: '20%', paddingHorizontal: 8 }
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
