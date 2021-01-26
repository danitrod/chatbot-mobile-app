import React, { useState } from 'react';
import {
  ActionSheetIOS,
  Button,
  Keyboard,
  Picker,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ErrorModal from '../components/ErrorModal';
import { changeCredentials } from '../redux/actions/index';

const Settings = () => {
  // Check errors to show modal
  const { err = false, errMsg = '' } = useSelector((state) => {
    return {
      err: state.chatReducer.err,
      errMsg: state.chatReducer.msg
    };
  });

  // Redux dispatcher
  const dispatch = useDispatch();

  // Form layouts
  const assistantFormLayout = {
    type: 'WA',
    name: 'Watson Assistant (v2)',
    fields: [
      {
        name: 'Assistant Name',
        value: ''
      },
      {
        name: 'Apikey',
        value: ''
      },
      {
        name: 'Assistant ID',
        value: ''
      },
      {
        name: 'Location',
        options: [
          {
            name: 'Dallas',
            url: 'https://api.us-south.assistant.watson.cloud.ibm.com'
          },
          {
            name: 'Washington, DC',
            url: 'https://api.us-east.assistant.watson.cloud.ibm.com'
          },
          {
            name: 'Frankfurt',
            url: 'https://api.eu-de.assistant.watson.cloud.ibm.com'
          },
          {
            name: 'Sydney',
            url: 'https://api.au-syd.assistant.watson.cloud.ibm.com'
          },
          {
            name: 'Tokyo',
            url: 'https://api.jp-tok.assistant.watson.cloud.ibm.com'
          },
          {
            name: 'London',
            url: 'https://api.eu-gb.assistant.watson.cloud.ibm.com'
          },
          {
            name: 'Seoul',
            url: 'https://api.kr-seo.assistant.watson.cloud.ibm.com'
          }
        ],
        value: 'https://api.us-south.assistant.watson.cloud.ibm.com'
      }
    ]
  };

  const orchestratorFormLayout = {
    type: 'OR',
    name: 'Orchestrator',
    fields: [
      {
        name: 'Assistant Name',
        value: ''
      },
      {
        name: 'Orchestrator URL',
        value: ''
      }
    ]
  };

  // Layout switch state
  const [switchValue, setSwitchValue] = useState(false);
  const [formLayout, setFormLayout] = useState(assistantFormLayout);

  // State handlers
  const switchValueChangeHandler = (value) => {
    setSwitchValue(value);
    if (value === false) {
      setFormLayout(assistantFormLayout);
    } else {
      setFormLayout(orchestratorFormLayout);
    }
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
    }
    dispatch(
      changeCredentials({
        type: formLayout.type,
        name: formLayout.fields[0].value,
        values
      })
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f9'
    },
    form: {
      height: '100%',
      width: '100%',
      paddingVertical: 24,
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    title: {
      marginBottom: 12
    },
    formItem: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '100%',
      paddingVertical: 12,
      borderColor: '#ddd',
      borderBottomWidth: 1
    },
    firstItem: {
      borderTopWidth: 1
    },
    modeText: {
      fontSize: 22,
      marginBottom: 4
    },
    input: {
      textAlign: 'left',
      width: '100%',
      paddingHorizontal: 12
    },
    labelText: {
      fontSize: 18
    },
    location: {
      alignItems: 'center',
      marginTop: 48,
      width: '100%'
    },
    submitBtn: {
      marginTop: 48
    },
    submitText: {
      color: '#187fff',
      fontSize: 18
    }
  });
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.form}>
          <ErrorModal err={err} errMsg={errMsg} />
          <View style={[styles.title, styles.formItem, styles.firstItem]}>
            <Text style={styles.modeText}>{formLayout.name}</Text>
            <Switch
              style={styles.switch}
              onValueChange={switchValueChangeHandler}
              value={switchValue}
              trackColor={{ false: '#187fff', true: '#f00' }}
              thumbColor='#fff'
              ios_backgroundColor='#00f'
            />
          </View>
          {formLayout.fields.map((field, index) => {
            if (field.name === 'Location') {
              if (Platform.OS !== 'ios') {
                return (
                  <View key={field.name} style={styles.location}>
                    <Text style={styles.labelText}>{field.name}</Text>
                    <Picker
                      key={field.name}
                      style={{
                        width: '100%',
                        color: '#187fff',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      selectedValue={field.value}
                      onValueChange={(v) => fieldValueChangeHandler(v, index)}
                    >
                      {field.options.map((value) => (
                        <Picker.Item
                          key={value.name}
                          label={value.name}
                          value={value.url}
                        />
                      ))}
                    </Picker>
                  </View>
                );
              } else {
                return (
                  <View key={field.name} style={styles.location}>
                    <Text style={styles.labelText}>{field.name}</Text>
                    <Button
                      onPress={() =>
                        ActionSheetIOS.showActionSheetWithOptions(
                          {
                            options: field.options.map((option) => option.name)
                          },
                          (i) => {
                            fieldValueChangeHandler(
                              field.options[i].url,
                              index
                            );
                          }
                        )
                      }
                      title={
                        field.options.find(
                          (option) => option.url === field.value
                        ).name
                      }
                    />
                  </View>
                );
              }
            } else {
              let firstItem = null;
              if (index === 0) {
                firstItem = styles.firstItem;
              }
              return (
                <View key={field.name} style={[styles.formItem, firstItem]}>
                  <TextInput
                    value={field.value}
                    onChangeText={(v) => fieldValueChangeHandler(v, index)}
                    placeholder={`Insert ${field.name} here...`}
                    style={styles.input}
                  />
                </View>
              );
            }
          })}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={submitNewCredentialsHandler}
            title='Save and change settings'
          >
            <Text style={styles.submitText}>Save and change settings</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Settings;
