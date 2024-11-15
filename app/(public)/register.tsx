import { Button, TextInput, Text, View, StyleSheet, Pressable } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Link, Stack } from 'expo-router';
import styles from '@/constants/styles';
import colors from '@/constants/colors';

const Register = () => {
    const { isLoaded, signUp, setActive } = useSignUp();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);


const onSignUpPress = async () => {
    if (!isLoaded) {
        return;
    }
    setLoading(true);

    try {
        // create user
        await signUp.create({
            emailAddress,
            password,
        });

        // email verification
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

        setPendingVerification(true);
    } catch (err: any) {
        alert(err.errors[0].message);
    } finally {
        setLoading(false);
    }
};

  // verify the email address
const onPressVerify = async () => {
    if (!isLoaded) {
        return;
    }
    setLoading(true);

    try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
            code,
        });

        await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
        alert(err.errors[0].message);
    } finally {
        setLoading(false);
    }
};

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
            <Spinner visible={loading} />

            <Text style={styles.title}>Create an Account</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Text> Already have an account?</Text>
                <Link href="/login" asChild>
                    <Pressable style={{margin: 8, alignItems: 'flex-start'}}>
                    <Text style={[styles.caption, {color: colors.secondary}]}>Login</Text>
                    </Pressable>
                </Link>
            </View>

            <View style={{height: 20}}/>

            {!pendingVerification && (
                <>
                <TextInput autoCapitalize="none" placeholder="example@example.com" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />
                <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />
                <View style={{height:20}} />
                <Button onPress={onSignUpPress} title="Sign up" color={'#133E87'}></Button>
                </>
            )}
            
            {pendingVerification && (
                <>
                <View>
                    <TextInput value={code} placeholder="Code..." style={styles.inputField} onChangeText={setCode} />
                </View>
                <Button onPress={onPressVerify} title="Verify Email" color={'#133E87'}></Button>
                </>
            )}
        </View> 
    );
};

export default Register;