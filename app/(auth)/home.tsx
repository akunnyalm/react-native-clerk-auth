import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import colors from '@/constants/colors';
import styles from '@/constants/styles';

const home = () => {
    const { user } = useUser();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <Text style={styles.title}>Welcome,</Text>
            <View style={{height: 20}} />
            <Text style={styles.body}>{user?.emailAddresses[0].emailAddress}</Text>
        </View>
    );
};

export default home;