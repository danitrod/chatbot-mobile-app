import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Title = () => {
    const title = useSelector(state => {
        return state.settingsReducer.name;
    });
    return (
        <Text style={styles.title}>{title}</Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        color: '#000'
    }
});

export default Title;
