import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Animated,
    Dimensions,
    Text,
    Alert,
    SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import previewStyles from '../styles/previewStyles';
import { CloseIcon, CheckIcon, RetakeIcon } from '../components/Icons';

const { width, height } = Dimensions.get('window');

// Configure your server URL here
const SERVER_URL = 'SERVER_URL'; // Change this to your server's URL

export default function PreviewScreen({ route, navigation }) {
    const { imageUri } = route.params;
    const [isUploading, setIsUploading] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleUpload = async () => {
        setIsUploading(true);

        try {
            // Create form data for image upload
            const formData = new FormData();

            const filename = imageUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : 'image/jpeg';

            formData.append('image', {
                uri: imageUri,
                type: type,
                name: filename || 'ecosnap-image.jpg',
            });

            console.log('Uploading image to server...');

            // Upload to server
            const response = await fetch(`${SERVER_URL}/api/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Upload successful:', result);

            // Navigate to processing screen with server response
            navigation.navigate('Processing', {
                imageUri,
                uploadResult: result,
                serverUrl: SERVER_URL
            });

        } catch (error) {
            console.error('Upload error:', error);
            Alert.alert(
                'Upload Failed',
                `Failed to upload image: ${error.message}\n\nPlease check your connection and server status.`
            );
            setIsUploading(false);
        }
    };

    const handleRetake = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={previewStyles.container}>
            <Animated.View
                style={[
                    previewStyles.content,
                    { opacity: fadeAnim }
                ]}
            >
                {/* Header */}
                <View style={previewStyles.header}>
                    <TouchableOpacity
                        style={previewStyles.headerButton}
                        onPress={() => navigation.navigate('Home')}
                        activeOpacity={0.7}
                    >
                        <CloseIcon size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={previewStyles.headerTitle}>Preview</Text>
                    <View style={previewStyles.headerButton} />
                </View>

                {/* Image Preview */}
                <View style={previewStyles.imageContainer}>
                    <Image source={{ uri: imageUri }} style={previewStyles.image} />
                    <View style={previewStyles.imageOverlay}>
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.3)']}
                            style={previewStyles.imageGradient}
                        />
                    </View>
                </View>

                {/* Action Buttons */}
                <Animated.View
                    style={[
                        previewStyles.actionsContainer,
                        { transform: [{ translateY: slideAnim }] }
                    ]}
                >
                    <View style={previewStyles.actions}>
                        <TouchableOpacity
                            style={previewStyles.retakeButton}
                            onPress={handleRetake}
                            activeOpacity={0.8}
                            disabled={isUploading}
                        >
                            <RetakeIcon size={24} color="#ffffff80" />
                            <Text style={previewStyles.retakeButtonText}>Retake</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                previewStyles.uploadButton,
                                isUploading && previewStyles.uploadButtonDisabled
                            ]}
                            onPress={handleUpload}
                            activeOpacity={0.9}
                            disabled={isUploading}
                        >
                            <LinearGradient
                                colors={isUploading ? ['#666666', '#444444'] : ['#ffffff', '#f0f0f0']}
                                style={previewStyles.uploadButtonGradient}
                            >
                                <CheckIcon size={24} color={isUploading ? "#ffffff80" : "#000000"} />
                                <Text style={[
                                    previewStyles.uploadButtonText,
                                    isUploading && previewStyles.uploadButtonTextDisabled
                                ]}>
                                    {isUploading ? 'Uploading...' : 'Analyze Image'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <Text style={previewStyles.infoText}>
                        Our AI will analyze environmental impact and provide insights
                    </Text>
                </Animated.View>
            </Animated.View>
        </SafeAreaView>
    );
}