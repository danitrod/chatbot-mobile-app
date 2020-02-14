import React from 'react';
import { Modal, StyleSheet, Text, SafeAreaView, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { closeModal } from '../redux/actions/general';

const ErrorModal = ({ err = false, errMsg = '' }) => {

    const dispatch = useDispatch();

    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingVertical: 48
        },
        modalBottomView: {
            height: '50%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 32
        },
        modalMsg: {
            color: '#322',
            fontSize: 22,
            paddingHorizontal: 52,
            marginBottom: 32
        }
    });

    return (
        <Modal
            visible={err === true}
            animationType='slide'
            transparent={false}
            onRequestClose={() => dispatch(closeModal())}>
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalBottomView}>
                    <Text style={styles.modalMsg}>{errMsg.toString()}</Text>
                    <Button title="Clear" onPress={() => dispatch(closeModal())} />
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default ErrorModal;
