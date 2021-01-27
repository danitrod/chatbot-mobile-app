import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import settingsIcon from '../../icons/settings.png';

const SettingsButton = ({ navigate }) => {
  return (
    <TouchableOpacity onPress={navigate}>
      <Image source={settingsIcon} style={{ width: 32, height: 32 }} />
    </TouchableOpacity>
  );
};

export default SettingsButton;
