import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actionCreators from '../redux/actions/index';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Button, Switch, Keyboard, TouchableWithoutFeedback } from 'react-native';

const Settings = () => {

    const dispatch = useDispatch();

    const [bottomPadding, setBottomPadding] = useState(0);

    // Dynamic text input position
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', e => setBottomPadding(Math.round(e.endCoordinates.height)));
        Keyboard.addListener('keyboardDidHide', () => setBottomPadding(0));
        return () => {
            Keyboard.removeListener('keyboardDidShow');
            Keyboard.removeListener('keyboardDidHide');
        };
    });

    const [switchValue, setSwitchValue] = useState(false);
    const [formLayout, setFormLayout] = useState({
        type: 'WA',
        name: 'Watson Assistant',
        fields: [{
            name: 'Assistant Name',
            value: ''
        }, {
            name: 'Apikey',
            value: ''
        }, {
            name: 'Assistant ID',
            value: ''
        }
        ]
    });

    const switchValueChangeHandler = value => {
        setSwitchValue(value);
        if (value === false) {
            setFormLayout({
                type: 'WA',
                name: 'Watson Assistant',
                fields: [{
                    name: 'Assistant Name',
                    value: ''
                }, {
                    name: 'Apikey',
                    value: ''
                }, {
                    name: 'Assistant ID',
                    value: ''
                }]
            });
        } else {
            setFormLayout({
                type: 'OR',
                name: 'Orchestrator',
                fields: [{
                    name: 'Assistant Name',
                    value: ''
                }, {
                    name: 'Orchestrator URL',
                    value: ''
                }]
            });
        };
    };

    const fieldValueChangeHandler = (t, index) => {
        const newFieldsValue = formLayout.fields;
        newFieldsValue[index].value = t;
        setFormLayout({
            ...formLayout,
            fields: newFieldsValue
        });
    };

    const submitNewCredentialsHandler = () => {
        let values;
        if (formLayout.type === 'WA') {
            values = {
                apikey: formLayout.fields[1].value,
                assistandId: formLayout.fields[2].value
            };
        } else {
            values = {
                url: formLayout.fields[1].value
            };
        };
        dispatch(actionCreators.changeCredentials({
            type: formLayout.type,
            name: formLayout.fields[0].value,
            values
        }));
    };

    const styles = StyleSheet.create({
        container: {
            padding: 24,
            flex: 1,
            backgroundColor: '#f2f2f8',
            paddingBottom: bottomPadding
        },
        form: {
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 20,
            paddingBottom: 40
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
            paddingHorizontal: 8,
            width: '100%',
            backgroundColor: '#fff'
        },
        modeSwitcher: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        modeText: {
            fontSize: 22,
            marginBottom: 4
        },
        submitButton: {
            marginTop: 12
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.form}>
                    <View style={styles.modeSwitcher}>
                        <Text style={styles.modeText}>
                            {formLayout.name}
                        </Text>
                        <Switch
                            style={styles.switch}
                            onValueChange={switchValueChangeHandler}
                            value={switchValue}
                            trackColor={{ false: '#44f', true: '#f00' }} thumbColor="#fff" ios_backgroundColor='#00f' />
                    </View>
                    {/* <View style={styles.fields}> */}
                    {formLayout.fields.map((field, index) => {
                        return (
                            <View key={field.name} style={styles.formElement}>
                                <Text style={styles.labelText}>{field.name}</Text>
                                <TextInput value={field.value} onChangeText={t => fieldValueChangeHandler(t, index)} style={styles.input} />
                            </View>
                        );
                    })}
                    {/* </View> */}
                    <Button style={styles.submitButton} onPress={submitNewCredentialsHandler} title="Save and change settings" />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};


export default Settings;
