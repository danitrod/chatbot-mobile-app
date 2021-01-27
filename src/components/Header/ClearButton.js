import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import clearButton from '../../icons/refresh.png';
import * as actionCreators from '../../redux/actions/index';

const ClearButton = () => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity onPress={() => dispatch(actionCreators.refresh())}>
      <Image source={clearButton} style={{ width: 32, height: 32 }} />
    </TouchableOpacity>
  );
};

export default ClearButton;
