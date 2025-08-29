import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated,
  Dimensions,
  Image,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import homeStyles from '../styles/homeStyles';
import { CameraIcon, GalleryIcon, ScanIcon } from '../components/Icons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCameraPress = () => {
    navigation.navigate('Camera');
  };

  const handleGalleryPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      navigation.navigate('Preview', { imageUri: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={homeStyles.container}>
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#000000']}
        style={homeStyles.gradient}
      >
        <Animated.View 
          style={[
            homeStyles.content,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          {/* Header */}
          <View style={homeStyles.header}>
            <View style={homeStyles.logoContainer}>
              <ScanIcon size={32} color="#ffffff" />
              <Text style={homeStyles.logoText}>EcoSnap</Text>
            </View>
            <Text style={homeStyles.tagline}>
              Scan. Analyze. Impact.
            </Text>
          </View>

          {/* Main Action Area */}
          <View style={homeStyles.actionArea}>
            <View style={homeStyles.actionButtons}>
              <TouchableOpacity
                style={homeStyles.primaryButton}
                onPress={handleCameraPress}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#ffffff', '#f5f5f5']}
                  style={homeStyles.buttonGradient}
                >
                  <CameraIcon size={28} color="#000000" />
                  <Text style={homeStyles.primaryButtonText}>
                    Take Photo
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={homeStyles.divider}>
                <View style={homeStyles.dividerLine} />
                <Text style={homeStyles.dividerText}>or</Text>
                <View style={homeStyles.dividerLine} />
              </View>

              <TouchableOpacity
                style={homeStyles.secondaryButton}
                onPress={handleGalleryPress}
                activeOpacity={0.8}
              >
                <GalleryIcon size={24} color="#ffffff" />
                <Text style={homeStyles.secondaryButtonText}>
                  Choose from Gallery
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={homeStyles.footer}>
            <Text style={homeStyles.footerText}>
              AI-powered environmental impact analysis
            </Text>
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}