import { View, StyleSheet, TextInput, Text, Button } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import styles from '@/constants/styles';
import colors from '@/constants/colors';

const Reset = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const { signIn, setActive } = useSignIn();

    // request password change code to e-mail
    const onRequestReset = async () => {
        if (!signIn) {
            alert('SignIn is not available');
            return;
        }
        try {
            await signIn.create({
                strategy: 'reset_password_email_code',
                identifier: emailAddress,
            });
            setSuccessfulCreation(true);
        } catch (err: any) {
            alert(err.errors[0].message);
        }
    };

    // password reset with code and new password
    const onReset = async () => {
        if (!signIn) {
            alert('SignIn is not available');
            return;
        }
        try {
            const result = await signIn.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            });
            console.log(result);
            alert('Password reset successfully');

            await setActive({ session: result.createdSessionId });
        } catch (err: any) {
            alert(err.errors[0].message);
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

            <Text style={[styles.subtitle, {textAlign: 'center'}]}>Reset Your Password</Text>
            <View style={{height: 20}} />

            {!successfulCreation && (
                <>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="Enter your E-mail"
                        value={emailAddress}
                        onChangeText={setEmailAddress}
                        style={styles.inputField}
                    />
                    <View style={{height: 20}} />
                    <Button onPress={onRequestReset} title="Send Password Reset Code" color={'#133E87'} />
                </>
            )}

            {successfulCreation && (
                <>
                    <View>
                        <TextInput
                            value={code}
                            placeholder="Code..."
                            style={styles.inputField}
                            onChangeText={setCode}
                        />
                        <TextInput
                            placeholder="New password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={styles.inputField}
                        />
                    </View>
                    <Button onPress={onReset} title="Set new Password" color={colors.secondary} />
                </>
            )}
        </View>
    );
};

export default Reset;