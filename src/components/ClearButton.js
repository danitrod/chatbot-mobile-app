import React from 'react';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import * as actionCreators from '../redux/actions/index';

const ClearButton = () => {
    const dispatch = useDispatch();

    return (
        <Button onPress={() => dispatch(actionCreators.refresh())} title="Clear" />
    );
};

export default ClearButton;
