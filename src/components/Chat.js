import React, { memo } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Audio } from 'expo-av';
import playIcon from '../icons/play.png';
import pauseIcon from '../icons/pause.png';
import parseTime from '../util/parseTime';

const Chat = () => {

    const state = useSelector((state) => {
        return {
            history: state.chatReducer.history
        };
    });

    const playAudio = async (uri) => {
        console.log('indo tocar');
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
        const newAudio = await Audio.Sound.createAsync({ uri });
        await newAudio.sound.playAsync();
    };

    return (
        <ScrollView style={styles.chat} contentContainerStyle={{ justifyContent: 'flex-end' }}>
            {state.history.map((message, index) => {
                let style;
                if (message.from === 'self') {
                    style = {
                        bubble: [styles.chatBubbleRight],
                        text: styles.chatTextRight
                    };
                } else {
                    style = {
                        bubble: [styles.chatBubbleLeft],
                        text: styles.chatTextLeft,
                    };
                };
                if (index > 0 && state.history[index - 1].from === message.from) {
                    style.bubble.push(styles.notFirstMessage);
                };
                if (index < state.history.length - 1 && state.history[index + 1].from === message.from) {
                    style.bubble.push(styles.notLastMessage);
                };
                let output;
                if (message.type === 'txt') {
                    output = (
                        <View key={message.time} style={style.bubble}>
                            <Text style={style.text}>{message.msg}</Text>
                        </View>
                    );
                } else {
                    output = (
                        <View key={message.time} style={style.bubble}>
                            <TouchableOpacity style={{ width: 32, height: 32 }} onPress={() => playAudio(message.msg.uri)}>
                                <Image source={playIcon} />
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
        bottom: 64
    },
    chatBubbleLeft: {
        position: 'relative',
        width: '40%',
        backgroundColor: '#fff',
        marginHorizontal: 8,
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: '#000'
    },
    chatBubbleRight: {
        backgroundColor: '#dcf8c6',
        width: '40%',
        marginHorizontal: 8,
        marginVertical: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 8,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    notFirstMessage: {
        marginTop: 0
    },
    notLastMessage: {
        marginBottom: 0
    },
    chatTextLeft: {
        fontSize: 16,
    },
    chatTextRight: {
        fontSize: 16,
        textAlign: 'right',
    }
});

export default memo(Chat);
