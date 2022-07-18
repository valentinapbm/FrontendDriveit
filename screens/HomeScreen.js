import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import { useSelector} from 'react-redux';
import AppLoader from '../components/AppLoader';

const HomeScreen = () => {
    const { isLoggedIn, fullname, role, image } = useSelector(
        (state) => state.userReducer
      );
    return (
        <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home {fullname}</Text>
        </SafeAreaView>
    );
};

export default HomeScreen;