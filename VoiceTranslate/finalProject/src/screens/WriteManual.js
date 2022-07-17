import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { manual } from '../utilities/assistButtonUtilities';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import styles from '../styles/AuthenticationScreenStyles';

const WriteManual = () => {
    
    const [info, setInfo] = useState(false);
    const [steps, setSteps] = useState(false);

    const headerAnimationEnd = () => {
        setInfo(!info);
    }
    const infoAnimationEnd = () => {
        setSteps(!steps);
    }

    return (
        <LinearGradient
            colors={['#2b5876', '#4e4376']}
            style={styles.backgroundStyle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={[styles.header_view]}>
                <Animatable.View style={{ paddingHorizontal: 10 }} onAnimationEnd={() => { headerAnimationEnd() }} animation="slideInDown" duration={2000}>
                    <Text style={[styles.header, { fontSize: 40 }]}>{manual.write.EN.header} </Text>
                </Animatable.View>
            </View>
            {info &&
                <View style={[styles.middle_view, { marginTop: 20 }]}>
                    <Animatable.View style={{ paddingHorizontal: 10 }} onAnimationEnd={() => { infoAnimationEnd() }} animation="zoomIn" duration={1800}>
                        <Text style={[styles.text, { fontSize: 22, paddingTop: 10 }]}>{manual.write.EN.body.firstPara} </Text>
                    </Animatable.View>
                    <Animatable.View style={{ paddingHorizontal: 10 }} animation="zoomIn" duration={1400}>
                        <Text style={[styles.text, { fontSize: 22, paddingTop: 10 }]}>{manual.write.EN.body.secondPara} </Text>
                    </Animatable.View>
                </View>
            }
            {steps &&
                <View style={[styles.bottom_view, { marginTop: 20 }]}>
                    <Animatable.View style={{ paddingHorizontal: 10 }} animation="zoomInUp" duration={2400}>
                        <Text style={[styles.text, { fontSize: 22, paddingTop: 10 }]}>{manual.write.EN.body.thirdPara} </Text>
                    </Animatable.View>
                    <Animatable.View style={{ paddingHorizontal: 10 }} animation="zoomInLeft" duration={2400}>
                        <Text style={[styles.text, { fontSize: 22, paddingTop: 10 }]}>{manual.write.EN.body.fourthPara} </Text>
                    </Animatable.View>
                    <Animatable.View style={{ paddingHorizontal: 10 }} animation="zoomInDown" duration={2400}>
                        <Text style={[styles.text, { fontSize: 22, paddingTop: 10 }]}>{manual.write.EN.body.fifthPara} </Text>
                    </Animatable.View>
                    <Animatable.View style={{ paddingHorizontal: 10 }} animation="zoomInRight" duration={2400}>
                        <Text style={[styles.text, { fontSize: 22, paddingTop: 10 }]}>{manual.write.EN.body.sixthPara} </Text>
                    </Animatable.View>
                </View>
            }
        </LinearGradient>
    );
};


export default WriteManual;