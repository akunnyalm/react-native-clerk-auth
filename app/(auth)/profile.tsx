import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useUser  } from '@clerk/clerk-expo';
import styles from '@/constants/styles';
import colors from '@/constants/colors';
import { LogoutButton } from './_layout';

const Profile = () => {
  const { user } = useUser ();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // set initial values for firstName and lastName when there is user data 
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [user]);

  const onSaveUser  = async () => {
    if (!user) {
      console.log('User  is not available');
      return;
    }

    try {
      const result = await user.update({
        firstName,
        lastName,
      });
      console.log(' ~ file: profile.tsx:16 ~ onSaveUser  ~ result:', result);
    } catch (e) {
      console.log(' ~ file: profile.tsx:18 ~ onSaveUser  ~ e', JSON.stringify(e));
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={[styles.subtitle, { textAlign: 'center' }]}>
            Good morning {user.firstName} {user.lastName}!
          </Text>
          <View style={{height: 20}} />
          
          <Text style={styles.medium}>Update your profile here!</Text>
          <View style={{height: 10}} />

          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.inputField}
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.inputField}
          />
          <Button onPress={onSaveUser } title="Update account" color={colors.secondary} />

        </>
      ) : (
        <Text style={{ textAlign: 'center' }}>Loading user information...</Text>
      )}

      
    </View>
  );
};

export default Profile;