// React & Redux
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../redux/actions/index';

// Expo Audio
import { Audio } from 'expo-av';

// React Native
import { StyleSheet, SafeAreaView, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, Image } from 'react-native';

// Icons
import microphoneIcon from '../icons/microphone.png';
import sendIcon from '../icons/send.png';
import recordingIcon from '../icons/recording.png';

// Components
import Chat from '../components/Chat';
import ErrorModal from '../components/ErrorModal';

// Util
import parseTime from '../util/parseTime';

const Main = () => {

    // Text Input
    const [bottomPos, setBottomPos] = useState(0);
    const [button, setButton] = useState({ type: 'voice', icon: recordingIcon });
    const [inputMessage, setInputMessage] = useState('');

    // Voice Input
    const [isRecording, setIsRecording] = useState(false);
    const [timeRecording, setTimeRecording] = useState('0:00');
    const [permission, setPermission] = useState(false);
    const [recording, setRecording] = useState(null);

    // Redux dispatcher
    const dispatch = useDispatch();

    // Check errors to show modal
    const { err = false, errMsg = '' } = useSelector(state => {
        return {
            err: state.chatReducer.err,
            errMsg: state.chatReducer.msg
        };
    });

    // Dynamic text input position
    useEffect(() => {
        if (Platform.OS === 'ios') {
            Keyboard.addListener('keyboardWillChangeFrame', e => setBottomPos(e.endCoordinates.height));
            Keyboard.addListener('keyboardWillHide', () => setBottomPos(0));
            return () => {
                Keyboard.removeAllListeners('keyboardWillChangeFrame');
                Keyboard.removeAllListeners('keyboardWillHide');
            };
        } else {
            Keyboard.addListener('keyboardDidShow', e => setBottomPos(e.endCoordinates.height));
            Keyboard.addListener('keyboardDidHide', () => setBottomPos(0));
            return () => {
                Keyboard.removeAllListeners('keyboardDidShow');
                Keyboard.removeAllListeners('keyboardDidHide');
            };
        };
    });

    // Button icon
    useEffect(() => {
        if (inputMessage !== '') {
            setButton({ type: 'text', icon: sendIcon });
        } else {
            setButton({ type: 'voice', icon: microphoneIcon });
        };
    }, [inputMessage]);

    useEffect(() => {
        if (isRecording === true) {
            setButton({ type: 'recording', icon: recordingIcon });
        } else {
            setButton({ type: 'voice', icon: microphoneIcon });
        };
    }, [isRecording]);

    // Manage sent messages
    const sendMessageHandler = async () => {
        if (button.type === 'voice') {
            // Voice message
            if (permission !== true) {
                const perm = await Audio.requestPermissionsAsync();
                if (perm.granted === true) {
                    await Audio.setAudioModeAsync({
                        allowsRecordingIOS: true,
                        playsInSilentModeIOS: true
                    });
                    setPermission(true);
                };
            };
            await Audio.setAudioModeAsync({ allowsRecordingIOS: true });
            const recordingInstance = new Audio.Recording();
            await recordingInstance.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            recordingInstance.setProgressUpdateInterval(1000);
            recordingInstance.setOnRecordingStatusUpdate(status => {
                if (status.canRecord) {
                    setIsRecording(status.isRecording);
                    setTimeRecording(parseTime(Math.round(status.durationMillis / 1000)));
                } else if (status.isDoneRecording) {
                    setIsRecording(false);
                    setTimeRecording(('0:00'));
                };
            });
            recordingInstance.startAsync()
                .then(status => {
                    setIsRecording(status.isRecording);
                    setTimeRecording(parseTime(Math.round(status.durationMillis / 1000)));
                })
                .catch(e => console.error(e));
            setRecording(recordingInstance);
        } else if (button.type === 'text') {
            // Text message
            Keyboard.dismiss();
            dispatch(actionCreators.addMessage({ type: 'txt', msg: inputMessage, from: 'self', time: new Date() }));
            setInputMessage('');
        };
    };

    // Conclude recording
    const sendMessageConcluded = async () => {
        if (button.type === 'recording') {
            const { durationMillis } = await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            dispatch(actionCreators.addMessage({ type: 'audio', msg: { uri, duration: durationMillis }, from: 'self', time: new Date() }));
        };
    };

    // CSS Styles
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
            height: 52,
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
            fontSize: 16,
            paddingHorizontal: 16,
            width: '75%',
            maxWidth: 256,
            backgroundColor: '#fff',
            borderRadius: 25,
            borderColor: '#ccc',
            borderWidth: 1
        },
        button: {
            width: 26,
            height: 26
        },
        time: {
            fontSize: 32
        }
    });

    // Input field does not appear when app is recording, in which case it will show the recording time instead.
    let inputView;
    if (isRecording === true) {
        inputView = (
            <Text
                style={styles.time}>
                {timeRecording}</Text>
        );
    } else {
        inputView = (
            <TextInput
                multiline={true}
                value={inputMessage}
                style={styles.input}
                onChangeText={m => setInputMessage(m)} />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ErrorModal err={err} errMsg={errMsg} />
            <Chat />
            <KeyboardAvoidingView style={styles.footer}  >
                {inputView}
                <TouchableOpacity onPress={sendMessageConcluded} onPressIn={sendMessageHandler}>
                    <Image source={button.icon} style={styles.button} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
};

export default Main;
