import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import DeemaSDK from 'react-native-deema-package'; // Adjust the path based on your file structure

const App = () => {
  const [environment, setEnvironment] = useState('production'); 
  const [sdkKey, setSdkKey] = useState('sk_test_d5gntxxdoRNGkAweKjWZMr8iocXd3oNO1Wz5VJuW_65');
  const [merchantOrderId, setMerchantOrderId] = useState('1726');
  const [amount, setAmount] = useState('100');
  const [currency, setCurrency] = useState('KWD');
  const [showSDK, setShowSDK] = useState(false);

  const handlePaymentStatus = (status, message) => {
    console.log(`Payment Status: ${status}`);
    console.log(`Message: ${message}`);
    if (status === 'failure') {
      Alert.alert('Payment Failed', message);
    }
  
    setShowSDK(false); // Reset after payment
  };
  

  const handleSubmit = () => {
    if (sdkKey && merchantOrderId && amount && currency) {
      setShowSDK(true);
    } else {
      console.log('something wrong')
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Payment App</Text> */}

      {!showSDK ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="SDK Key"
            value={sdkKey}
            onChangeText={setSdkKey}
          />
          <TextInput
            style={styles.input}
            placeholder="Merchant Order ID"
            value={merchantOrderId}
            onChangeText={setMerchantOrderId}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Currency (e.g., USD)"
            value={currency}
            onChangeText={setCurrency}
          />

          <Button title="Proceed to Payment" onPress={handleSubmit} />
        </>
      ) : (
        <DeemaSDK
          sdkKey={sdkKey}
          merchantOrderId={merchantOrderId}
          amount={amount}
          currencyCode={currency}
          environment={environment}
          onPaymentStatus={handlePaymentStatus}
        />
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
