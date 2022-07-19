import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/HomeScreenStyles';
import AssistButton from '../components/AssistButton';
import FloatingButton from '../components/FloatingButton';

//Home screen, holds the following components - AssistButton (main activity),
//and FloatingButton (settings and disconnection)
const HomeScreen = ({ navigation }) => {
    return (
        <LinearGradient
            colors={['#2b5876', '#4e4376']}
            style={styles.backgroundStyle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <AssistButton />
            <FloatingButton navigation={navigation} />
        </LinearGradient>
    )
};

export default HomeScreen;
