import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

// Assuming the Deema SDK is installed and imported correctly
import DeemaSDK from 'react-native-deema-sdk-beta'; // Replace with the correct import for your SDK
console.log('DeemaSDK:', DeemaSDK);
const App = () => {
  const [merchantId, setMerchantId] = useState('1726');
  const [amount, setAmount] = useState('100');
  const [currency, setCurrency] = useState('KWD');
  const [sdkKey, setSdkKey] = useState('sk_test_d5gntxxdoRNGkAweKjWZMr8iocXd3oNO1Wz5VJuW_65');
  const [isDeemaSdkOpen, setIsDeemaSdkOpen] = useState(false);

  // Validate input fields before proceeding to open SDK
  const validateInputs = () => {
    if (!merchantId || !amount || !currency || !sdkKey) {
      Alert.alert('Error', 'All fields must be filled.');
      return false;
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      Alert.alert('Error', 'Amount should be a positive number.');
      return false;
    }
    return true;
  };

  const handlePaymentStatus = (status, message) => {
    if (status === 'success') {
      console.log('Payment Successful');
      Alert.alert('Payment Successful', 'Your payment has been processed successfully.');
    } else if (status === 'failure') {
      console.log(message);
      Alert.alert('Payment Failed', message);
    }
    setIsDeemaSdkOpen(false); // Close the SDK after payment status
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        {isDeemaSdkOpen ? (
          <DeemaSDK
            environment="sandbox" // Replace with correct environment if needed
            merchantOrderId={merchantId}
            sdkKey={sdkKey}
            amount={amount}
            currency={currency}
            onPaymentStatus={handlePaymentStatus}
          />
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.header}>I am on merchant app, to open the Deema SDK tap button</Text>
            <TextInput
              style={styles.input}
              value={merchantId}
              onChangeText={setMerchantId}
              placeholder="Merchant ID"
            />
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="Amount"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={sdkKey}
              onChangeText={setSdkKey}
              placeholder="SDK Key"
            />
            <TextInput
              style={styles.input}
              value={currency}
              onChangeText={setCurrency}
              placeholder="Currency"
            />
            <Button
              title="Open Deema SDK"
              onPress={() => {
                if (validateInputs()) {
                  setIsDeemaSdkOpen(true);
                }
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  header: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '100%',
    borderRadius: 5,
  },
});

export default App;
