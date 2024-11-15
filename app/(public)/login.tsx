import { View, Text, StyleSheet, Pressable, Button, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { useSignIn } from '@clerk/clerk-expo'
import styles from '@/constants/styles'
import colors from '@/constants/colors'
import Fonts from '@/constants/fonts'

const login = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFontsAsync = async () => {
            try {
                await Fonts(); 
                setFontsLoaded(true);
            } catch (error) {
                console.error('Error loading fonts', error);
            }
        };

        loadFontsAsync();
    }, []);

    const onSignInPress = async () => {
    if (!isLoaded) {
        return;
    }
    setLoading(true);
    try {
        const completeSignIn = await signIn.create({
            identifier: emailAddress,
            password,
        });

        // indicates that user has already signed in
        await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
        alert(err.errors[0].message);
    } finally {
        setLoading(false);
    }
    };

    return (
            <View style={styles.container}>
                <Spinner visible={loading} />
                <Text style={styles.title}>Welcome back!</Text>
                <View style={{height:20}} />

                <Text style={styles.body}>Sign in to your account</Text>
                <View style={{height: 55}} />

                <TextInput autoCapitalize="none" placeholder="example@example.com" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />
                <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />
                <View style={{height:20}} />

                {/* <Button onPress={onSignInPress} title="Login" color={colors.primary}></Button> */}

                 <Pressable
                        onPress={onSignInPress}
                        style={({ pressed }) => [
                            {
                                backgroundColor: colors.primary,
                                borderRadius: 10, 
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                alignItems: 'center',
                            },
                            pressed && { opacity: 0.7 } 
                        ]}
                    >
                        <Text style={[styles.medium, { color: 'white', fontSize: 16 }]}>Login</Text>
                </Pressable>

                <View style={{height:20}} />

                <Link href="/reset" asChild>
                    <Pressable style={styles.button}>
                    <Text style={[styles.caption, {color: colors.secondary}]}>Forgot password?</Text>
                    </Pressable>
                </Link>
                <View style={{height:20}} />

                <Text style={styles.caption}>Don't have an account?</Text>
                <Link href="/register" asChild>
                    <Pressable style={styles.button}>
                    <Text style={[styles.caption, {color:colors.secondary}]}>Create Account</Text>
                    </Pressable>
                </Link>
            </View>
    )
}


export default login;