import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actionCreators from '../redux/actions/index';
import {
    SafeAreaView, View, Text, TextInput, StyleSheet,
    Button, Switch, Keyboard, Picker, TouchableWithoutFeedback,
    ActionSheetIOS
} from 'react-native';

const Settings = () => {

    const dispatch = useDispatch();

    const [paddingBottom, setPaddingBottom] = useState(0);

    // Dynamic text input position
    useEffect(() => {
        if (Platform.OS === 'ios') {
            Keyboard.addListener('keyboardWillChangeFrame', e => setPaddingBottom(e.endCoordinates.height));
            Keyboard.addListener('keyboardWillHide', () => setPaddingBottom(0));
            return () => {
                Keyboard.removeListener('keyboardWillChangeFrame');
                Keyboard.removeListener('keyboardWillHide');
            };
        } else {
            Keyboard.addListener('keyboardDidShow', e => setPaddingBottom(e.endCoordinates.height));
            Keyboard.addListener('keyboardDidHide', () => setPaddingBottom(0));
            return () => {
                Keyboard.removeListener('keyboardDidShow');
                Keyboard.removeListener('keyboardDidHide');
            };
        };
    });

    const assistantFormLayout = {
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
        },
        {
            name: 'Location',
            options: [
                { name: 'Dallas', url: 'https://api.us-south.assistant.watson.cloud.ibm.com' },
                { name: 'Washington, DC', url: 'https://api.us-east.assistant.watson.cloud.ibm.com' },
                { name: 'Frankfurt', url: 'https://api.eu-de.assistant.watson.cloud.ibm.com' },
                { name: 'Sydney', url: 'https://api.au-syd.assistant.watson.cloud.ibm.com' },
                { name: 'Tokyo', url: 'https://api.jp-tok.assistant.watson.cloud.ibm.com' },
                { name: 'London', url: 'https://api.eu-gb.assistant.watson.cloud.ibm.com' },
                { name: 'Seoul', url: 'https://api.kr-seo.assistant.watson.cloud.ibm.com' }],
            value: 'https://api.us-south.assistant.watson.cloud.ibm.com'
        }]
    };

    const orchestratorFormLayout = {
        type: 'OR',
        name: 'Orchestrator',
        fields: [{
            name: 'Assistant Name',
            value: ''
        }, {
            name: 'Orchestrator URL',
            value: ''
        }]
    };

    const [switchValue, setSwitchValue] = useState(false);
    const [formLayout, setFormLayout] = useState(assistantFormLayout);

    const switchValueChangeHandler = value => {
        setSwitchValue(value);
        if (value === false) {
            setFormLayout(assistantFormLayout);
        } else {
            setFormLayout(orchestratorFormLayout);
        };
    };

    const fieldValueChangeHandler = (v, index) => {
        const newFieldsValue = formLayout.fields;
        newFieldsValue[index].value = v;
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
                assistantId: formLayout.fields[2].value,
                url: formLayout.fields[3].value
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
            paddingBottom
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
            fontSize: 16,
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
                        if (field.name === 'Location') {
                            if (Platform.OS !== 'ios') {
                                return (
                                    <View key={field.name} style={styles.formElement}>
                                        <Text style={styles.labelText}>{field.name}</Text>
                                        <Picker key={field.name} style={{ width: '100%', height: 50, backgroundColor: '#fff' }} selectedValue={field.value} onValueChange={v => fieldValueChangeHandler(v, index)} >
                                            {field.options.map(value => <Picker.Item key={value.name} label={value.name} value={value.url} />)}
                                        </Picker>
                                    </View>
                                );
                            } else {
                                return (
                                    <View key={field.name} style={[styles.formElement, {alignItems: 'center'}]}>
                                        <Text style={styles.labelText}>{field.name}</Text>
                                        <Button onPress={() => ActionSheetIOS.showActionSheetWithOptions({ options: field.options.map(option => option.name) }, i => {
                                            fieldValueChangeHandler(field.options[i].url, index)
                                        })} title={field.options.find(option => option.url === field.value).name} />
                                    </View>
                                );
                            };
                        } else {
                            return (
                                <View key={field.name} style={styles.formElement}>
                                    <Text style={styles.labelText}>{field.name}</Text>
                                    <TextInput value={field.value} onChangeText={v => fieldValueChangeHandler(v, index)} style={styles.input} />
                                </View>
                            );
                        };
                    })}
                    {/* </View> */}
                    <Button style={styles.submitButton} onPress={submitNewCredentialsHandler} title="Save and change settings" />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};


export default Settings;
