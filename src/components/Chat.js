import React, { memo, useState, useRef } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Audio } from 'expo-av';
import playIcon from '../icons/play.png';
import pauseIcon from '../icons/pause.png';
import parseTime from '../util/parseTime';

const Chat = () => {

    // Chat history state from store
    const state = useSelector(state => {
        return {
            history: state.chatReducer.history
        };
    });

    // Audio playing state
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [playbackObject, setPlaybackObject] = useState(null);
    const [playbackObjectId, setPlaybackObjectId] = useState(null);

    // ScrollView chat container ref
    const chatContainerRef = useRef();

    // Playing a selected audio
    const playAudio = async (uri, key) => {
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false, playsInSilentModeIOS: true });
        const newAudio = await Audio.Sound.createAsync({ uri });
        newAudio.sound.setOnPlaybackStatusUpdate(status => {
            if (status.didJustFinish) {
                setIsPlayingAudio(false);
                setPlaybackObjectId(null);
            };
        });
        await newAudio.sound.setProgressUpdateIntervalAsync(50);
        newAudio.sound.playAsync()
            .then(() => {
                setIsPlayingAudio(true);
                setPlaybackObjectId(key);
            })
            .catch(e => console.error(e));
        setPlaybackObject(newAudio);
    }

    // Play/pause button press
    const voiceMsgBtnHandler = async (uri, key) => {
        if (isPlayingAudio === false) {
            if (playbackObjectId !== key) {
                playAudio(uri, key);
            } else {
                playbackObject.sound.playAsync()
                    .then(() => {
                        setIsPlayingAudio(true);
                    })
                    .catch(e => console.error(e));
            }
        } else {
            if (playbackObjectId === key) {
                await playbackObject.sound.pauseAsync();
                setIsPlayingAudio(false);
            } else {
                await playbackObject.sound.stopAsync();
                await playbackObject.sound.unloadAsync();
                await playAudio(uri, key);
            };
        };
    };

    return (
        <ScrollView ref={chatContainerRef} onContentSizeChange={() => chatContainerRef.current.scrollToEnd()} style={styles.chat} contentContainerStyle={{ justifyContent: 'flex-end' }}>
            {state.history.map((message, index) => {
                const style = [styles.chatBubble];
                if (message.from === 'self') {
                    style.push(styles.bubbleRight);
                } else {
                    style.push(styles.bubbleLeft);
                };
                if (index > 0 && state.history[index - 1].from === message.from) {
                    style.push(styles.notFirstMessage);
                };
                if (index < state.history.length - 1 && state.history[index + 1].from === message.from) {
                    style.push(styles.notLastMessage);
                };
                let output;
                if (message.type === 'txt') {
                    output = (
                        <View key={message.time} style={style}>
                            <Text style={styles.chatText}>{message.msg}</Text>
                        </View>
                    );
                } else {
                    const icon = (playbackObjectId === message.time && isPlayingAudio === true) ? pauseIcon : playIcon;
                    output = (
                        <View key={message.time} style={style}>
                            <TouchableOpacity
                                style={{ width: 32, height: 32 }}
                                onPress={() => voiceMsgBtnHandler(message.msg.uri, message.time)}>
                                <Image source={icon} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 22 }}>{parseTime(Math.round(message.msg.duration / 1000))}</Text>
                        </View>
                    );
                };
                return output;
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    chat: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        bottom: 52
    },
    chatBubble: {
        minWidth: '40%',
        maxWidth: '75%',
        shadowRadius: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.5,
        marginHorizontal: 8,
        marginVertical: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bubbleLeft: {
        backgroundColor: '#fff'
    },
    bubbleRight: {
        backgroundColor: '#dcf8c6',
        alignSelf: 'flex-end',
    },
    notFirstMessage: {
        marginTop: 1
    },
    notLastMessage: {
        marginBottom: 1
    },
    chatText: {
        fontSize: 16,
    },
    voiceMessage: {

    }
});

export default memo(Chat);
