import React from 'react';
import {Image} from 'react-native';
import clearButton from '../../icons/refresh.png';
import { useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/index';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ClearButton = () => {
    const dispatch = useDispatch();

    return (
        <TouchableOpacity onPress={() => dispatch(actionCreators.refresh())}>
            <Image source={clearButton} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
    );
};

export default ClearButton;
