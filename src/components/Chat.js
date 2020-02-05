import React, { memo } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';

const Chat = () => {

    const state = useSelector((state) => {
        return {
            history: state.chatReducer.history
        };
    });

    return (
        <ScrollView style={styles.chat} contentContainerStyle={{ justifyContent: 'flex-end' }}>
            {state.history.map(message => {
                console.log('mapeando:', message);
                const style = message.from === 'self' ? [styles.chatBubbleRight, styles.chatTextRight] : [styles.chatBubbleLeft, styles.chatTextLeft];
                return (
                    <View style={style[0]}>
                        <Text key={new Date()} style={style[1]}>{message.msg}</Text>
                    </View>
                );
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
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 8,
        alignSelf: 'flex-end'
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
