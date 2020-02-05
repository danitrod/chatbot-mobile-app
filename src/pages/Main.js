import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actionCreators from '../redux/actions/index';
import { StyleSheet, SafeAreaView, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, Image } from 'react-native';
import microphoneIcon from '../icons/microphone.png';
import sendIcon from '../icons/send.png';
import recordingIcon from '../icons/recording.png';
import parseTime from '../util/parseTime';
import Chat from '../components/Chat';

const Main = () => {

    const [bottomPos, setBottomPos] = useState(0);
    const [button, setButton] = useState({ type: 'voice', icon: recordingIcon });
    const [inputMessage, setInputMessage] = useState('');
    const [recording, setRecording] = useState(false);
    const [recordingStartTime, setRecordingStartTime] = useState(0);
    const [timeRecording, setTimeRecording] = useState('0:00');
    const [intervalId, setIntervalId] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', e => setBottomPos(e.endCoordinates.height));
        Keyboard.addListener('keyboardDidHide', () => setBottomPos(0));
        return () => {
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        };
    });

    useEffect(() => {
        if (recordingStartTime !== 0)
            setIntervalId(setInterval(() => setTimeRecording(parseTime(Math.round((Date.now() - recordingStartTime) / 1000))), 1000));
    }, [recordingStartTime]);

    useEffect(() => {
        if (inputMessage !== '') {
            setButton({ type: 'text', icon: sendIcon });
        } else {
            setButton({ type: 'voice', icon: microphoneIcon });
        };
    }, [inputMessage]);

    useEffect(() => {
        if (recording === true) {
            setButton({ type: 'recording', icon: recordingIcon });
        } else {
            setButton({ type: 'voice', icon: microphoneIcon });
        };
    }, [recording]);

    const buttonPressed = () => {
        if (button.type === 'voice') {
            setRecordingStartTime(Date.now());
            setRecording(true);
        } else if (button.type === 'text') {
            dispatch(actionCreators.add({ type: 'txt', msg: inputMessage, from: 'self' }));
            setInputMessage('');
        };
    };

    const sendVoiceMessageConcluded = () => {
        clearInterval(intervalId);
        setRecording(false);
        setTimeRecording('0:00');
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#e5ddd5'
        },
        footer: {
            position: 'absolute',
            width: '100%',
            left: 0,
            bottom: bottomPos,
            height: 64,
            backgroundColor: '#f0f0f0',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 24,
            borderColor: '#000',
            borderTopWidth: 0.5
        },
        input: {
            height: 32,
            padding: 0,
            paddingHorizontal: 8,
            width: '75%',
            maxWidth: 256,
            backgroundColor: '#fff',
            borderRadius: 25
        },
        button: {
            width: 32,
            height: 32
        },
        time: {
            fontSize: 32
        }
    });

    let inputView;
    if (recording === true) {
        inputView = (
            <Text
                style={styles.time}>
                {timeRecording}</Text>
        );
    } else {
        inputView = (
            <TextInput
                value={inputMessage}
                style={styles.input}
                onChangeText={m => setInputMessage(m)} />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Chat />
            <KeyboardAvoidingView style={styles.footer}  >
                {inputView}
                <TouchableOpacity style={styles.button} onPress={sendVoiceMessageConcluded} onPressIn={buttonPressed} onPressOut={sendVoiceMessageConcluded}>
                    <Image source={button.icon} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
};

export default Main;
