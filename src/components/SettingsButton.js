import React from 'react';
import settingsIcon from '../icons/settings.png';
import { TouchableOpacity, Image } from 'react-native';

const SettingsButton = ({ navigate }) => {

    return (
        <TouchableOpacity onPress={navigate}>
            <Image source={settingsIcon} style={{ width: 32, height: 32 }} />
        </TouchableOpacity >
    );
};

export default SettingsButton;
