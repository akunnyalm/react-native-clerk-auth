import React from 'react';
import { Stack } from "expo-router";
import colors from '@/constants/colors';

const PublicLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTintColor: '#fff',
                headerBackTitle: 'Back',
            }}>
            <Stack.Screen
                name="login"
                options={{
                    headerTitle: 'Clerk Auth App',
                }}></Stack.Screen>
            <Stack.Screen
                name="register"
                options={{
                    headerTitle: 'Create Account',
                }}></Stack.Screen>
            <Stack.Screen
                name="reset"
                options={{
                    headerTitle: 'Reset Password'
                }}></Stack.Screen>
        </Stack>
    )
}