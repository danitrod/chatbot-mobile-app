import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

const Title = () => {
  const title = useSelector((state) => {
    return state.settingsReducer.name;
  });
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: '#000'
  }
});

export default Title;
