import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Button, Switch } from 'react-native';

const Settings = () => {

    const [switchValue, setSwitchValue] = useState(false);
    const [mode, setMode] = useState({
        type: 'WA',
        fields: {
            'Assistant Name': '',
            'Apikey': '',
            'Assistant ID': ''
        }
    });

    const switchValueChangeHandler = value => {
        setSwitchValue(value);
        if (value === false) {
            setMode({
                type: 'WA',
                fields: {
                    'Assistant Name': '',
                    'Apikey': '',
                    'Assistant ID': ''
                }
            });
        } else {
            setMode({
                type: 'OR',
                fields: {
                    'Assistant Name': '',
                    'Orchestrator URL': ''
                }
            });
        };
    };

    let modeText;
    if (mode.type === 'WA') modeText = 'Watson Assistant'
    else modeText = 'Orchestrator';

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.modeSwitcher}>
                <Text style={styles.modeText}>
                    {modeText}
                </Text>
                <Switch
                    style={styles.switch}
                    onValueChange={switchValueChangeHandler}
                    value={switchValue}
                    trackColor={{ false: '#44f', true: '#f00' }} ios_backgroundColor='#00f' />
            </View>
            {Object.keys(mode.fields).map(field => {
                return (
                    <View key={field} style={styles.formElement}>
                        <Text style={styles.labelText}>{field}</Text>
                        <TextInput style={styles.input} />
                    </View>
                );
            })}
            <Button title="Change current settings" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f8',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formElement: {
        width: '100%',
        paddingHorizontal: 32,
        marginVertical: 16,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    labelText: {
        fontSize: 16,
        marginBottom: 8,
        color: '#444'
    },
    input: {
        height: 32,
        padding: 0,
        paddingHorizontal: 8,
        width: '100%',
        backgroundColor: '#fff'
    },
    modeSwitcher: {
        position: 'absolute',
        top: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modeText: {
        fontSize: 22,
        marginBottom: 4
    }
});

export default Settings;
