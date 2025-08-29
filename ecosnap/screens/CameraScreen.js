import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Animated,
    Dimensions,
    Text,
    Alert,
    SafeAreaView
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import cameraStyles from '../styles/cameraStyles';
import {
    CloseIcon,
    CaptureIcon,
    FlipIcon,
    FlashIcon
} from '../components/Icons';

const { width, height } = Dimensions.get('window');

export default function CameraScreen({ navigation }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [type, setType] = useState('back');
    const [flashMode, setFlashMode] = useState('off');
    const cameraRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (!permission) {
            return;
        }

        if (!permission.granted) {
            requestPermission();
            return;
        }

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        // Pulse animation for capture button
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );
        pulseAnimation.start();

        return () => pulseAnimation.stop();
    }, [permission]);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 1,
                    base64: false,
                });
                navigation.navigate('Preview', { imageUri: photo.uri });
            } catch (error) {
                Alert.alert('Error', 'Failed to take picture. Please try again.');
            }
        }
    };

    const toggleFlash = () => {
        setFlashMode(
            flashMode === 'off' ? 'auto' : 'off'
        );
    };

    const flipCamera = () => {
        setType(
            type === 'back' ? 'front' : 'back'
        );
    };

    if (!permission) {
        return <View style={cameraStyles.container} />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView style={cameraStyles.container}>
                <View style={cameraStyles.permissionContainer}>
                    <Text style={cameraStyles.permissionText}>
                        Camera access required
                    </Text>
                    <TouchableOpacity
                        style={cameraStyles.permissionButton}
                        onPress={requestPermission}
                    >
                        <Text style={cameraStyles.permissionButtonText}>Grant Permission</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={cameraStyles.permissionButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={cameraStyles.permissionButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={cameraStyles.container}>
            <Animated.View style={[cameraStyles.content, { opacity: fadeAnim }]}>
                <CameraView
                    ref={cameraRef}
                    style={cameraStyles.camera}
                    facing={type}
                    flash={flashMode}
                >
                    {/* Header Controls */}
                    <View style={cameraStyles.header}>
                        <TouchableOpacity
                            style={cameraStyles.headerButton}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.7}
                        >
                            <CloseIcon size={24} color="#ffffff" />
                        </TouchableOpacity>

                        <View style={cameraStyles.headerRight}>
                            {/* <TouchableOpacity
                                style={cameraStyles.headerButton}
                                onPress={toggleFlash}
                                activeOpacity={0.7}
                            >
                                <FlashIcon
                                    size={24}
                                    color={flashMode === 'off' ? "#ffffff60" : "#ffffff"}
                                />
                            </TouchableOpacity> */}

                            <TouchableOpacity
                                style={cameraStyles.headerButton}
                                onPress={flipCamera}
                                activeOpacity={0.7}
                            >
                                <FlipIcon size={24} color="#ffffff" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Center Guide */}
                    <View style={cameraStyles.centerGuide}>
                        <View style={cameraStyles.guideBorder} />
                        <Text style={cameraStyles.guideText}>
                            Position object in frame
                        </Text>
                    </View>

                    {/* Bottom Controls */}
                    <View style={cameraStyles.bottom}>
                        <View style={cameraStyles.captureContainer}>
                            <Animated.View
                                style={[
                                    cameraStyles.captureButtonOuter,
                                    { transform: [{ scale: pulseAnim }] }
                                ]}
                            >
                                <TouchableOpacity
                                    style={cameraStyles.captureButton}
                                    onPress={takePicture}
                                    activeOpacity={0.8}
                                >
                                    <CaptureIcon size={32} color="#000000" />
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                </CameraView>
            </Animated.View>
        </SafeAreaView>
    );
}