import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Animated,
    Dimensions,
    Image,
    SafeAreaView,
    Alert,
    Share,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import resultsStyles from '../styles/resultsStyles';

const { width, height } = Dimensions.get('window');

// Grade color mapping
const getGradeColor = (grade) => {
    switch (grade) {
        case 'A': return '#00E676';
        case 'B': return '#76FF03';
        case 'C': return '#FFC107';
        case 'D': return '#FF5722';
        case 'F': return '#F44336';
        default: return '#9E9E9E';
    }
};

// Severity color mapping
const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
        case 'low': return '#00E676';
        case 'moderate': return '#FFEB3B';
        case 'high': return '#FF9800';
        case 'critical': return '#F44336';
        default: return '#9E9E9E';
    }
};

// Processing level color mapping
const getProcessingColor = (level) => {
    switch (level?.toLowerCase()) {
        case 'raw': return '#00E676';
        case 'minimally processed': return '#76FF03';
        case 'processed': return '#FFC107';
        case 'ultra-processed': return '#FF5722';
        default: return '#9E9E9E';
    }
};

// Animated Circular Progress Component
const CircularProgress = ({
    size = 120,
    strokeWidth = 8,
    progress = 0,
    color = '#00E676',
    backgroundColor = '#1a1a1a',
    showPercentage = true,
    label = '',
    children
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: progress,
            duration: 1500,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    return (
        <View style={[resultsStyles.circularProgressContainer, { width: size, height: size }]}>
            <View style={resultsStyles.circularProgressContent}>
                {children || (
                    <>
                        {showPercentage && (
                            <Text style={[resultsStyles.circularProgressText, { color }]}>
                                {Math.round(progress * 100)}%
                            </Text>
                        )}
                        {label && (
                            <Text style={resultsStyles.circularProgressLabel}>
                                {label}
                            </Text>
                        )}
                    </>
                )}
            </View>
        </View>
    );
};

// Linear Gauge Component
const LinearGauge = ({
    value,
    maxValue = 10,
    color = '#00E676',
    label = '',
    unit = '',
    height = 20,
    animated = true
}) => {
    const animatedWidth = useRef(new Animated.Value(0)).current;
    const percentage = Math.min((value / maxValue), 1);

    useEffect(() => {
        if (animated) {
            Animated.timing(animatedWidth, {
                toValue: percentage,
                duration: 1000,
                useNativeDriver: false,
            }).start();
        }
    }, [value]);

    return (
        <View style={resultsStyles.linearGaugeContainer}>
            <View style={resultsStyles.gaugeHeader}>
                <Text style={resultsStyles.gaugeLabel}>{label}</Text>
                <Text style={resultsStyles.gaugeValue}>
                    {typeof value === 'number' ? value.toFixed(1) : value} {unit}
                </Text>
            </View>
            <View style={[resultsStyles.gaugeTrack, { height }]}>
                <Animated.View
                    style={[
                        resultsStyles.gaugeFill,
                        {
                            height,
                            backgroundColor: color,
                            width: animated ?
                                animatedWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%'],
                                }) :
                                `${percentage * 100}%`
                        }
                    ]}
                />
            </View>
        </View>
    );
};

// Visual Impact Indicator
const ImpactIndicator = ({ severity, value, label, iconName, iconType = 'Ionicons' }) => {
    const color = getSeverityColor(severity);
    const pulseAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const IconComponent = iconType === 'Feather' ? Feather : Ionicons;

    return (
        <View style={resultsStyles.impactIndicatorContainer}>
            <Animated.View
                style={[
                    resultsStyles.impactIndicatorPulse,
                    {
                        backgroundColor: color + '30',
                        opacity: pulseAnim,
                    }
                ]}
            />
            <View style={[resultsStyles.impactIndicatorCore, { backgroundColor: color }]}>
                <IconComponent name={iconName} size={24} color="#ffffff" />
            </View>
            <Text style={resultsStyles.impactIndicatorLabel}>{label}</Text>
            <Text style={[resultsStyles.impactIndicatorValue, { color }]}>
                {value}
            </Text>
        </View>
    );
};

// Enhanced Visual Card Component
const VisualCard = ({ title, iconName, iconType = 'Ionicons', children, accentColor = '#00E676', isExpanded = false, onToggle }) => {
    const IconComponent = iconType === 'Feather' ? Feather : Ionicons;

    return (
        <View style={resultsStyles.visualCard}>
            <LinearGradient
                colors={[accentColor + '15', 'transparent']}
                style={resultsStyles.visualCardGradient}
            >
                <TouchableOpacity
                    style={resultsStyles.visualCardHeader}
                    onPress={onToggle}
                    activeOpacity={0.7}
                >
                    <View style={resultsStyles.visualCardHeaderLeft}>
                        <View style={[resultsStyles.visualCardIcon, { backgroundColor: accentColor + '30' }]}>
                            <IconComponent name={iconName} size={24} color={accentColor} />
                        </View>
                        <Text style={resultsStyles.visualCardTitle}>{title}</Text>
                    </View>
                    {onToggle && (
                        <Ionicons
                            name={isExpanded ? "chevron-up" : "chevron-down"}
                            size={20}
                            color={accentColor}
                        />
                    )}
                </TouchableOpacity>

                {(!onToggle || isExpanded) && (
                    <View style={resultsStyles.visualCardContent}>
                        {children}
                    </View>
                )}
            </LinearGradient>
        </View>
    );
};

// Metric Badge Component
const MetricBadge = ({ label, value, color = '#00E676', iconName, iconType = 'Ionicons' }) => {
    const IconComponent = iconType === 'Feather' ? Feather : Ionicons;

    return (
        <View style={[resultsStyles.metricBadge, { borderColor: color + '40' }]}>
            <View style={[resultsStyles.metricBadgeIcon, { backgroundColor: color + '20' }]}>
                <IconComponent name={iconName} size={16} color={color} />
            </View>
            <Text style={resultsStyles.metricBadgeLabel}>{label}</Text>
            <Text style={[resultsStyles.metricBadgeValue, { color }]}>{value}</Text>
        </View>
    );
};

// Status Indicator Component
const StatusIndicator = ({ status, trueColor = '#00E676', falseColor = '#FF5722' }) => (
    <View style={[
        resultsStyles.statusIndicator,
        { backgroundColor: status ? trueColor : falseColor }
    ]}>
        <Ionicons
            name={status ? "checkmark" : "close"}
            size={12}
            color="#ffffff"
        />
    </View>
);

// Alternative Card Component
const AlternativeCard = ({ alternative, index }) => (
    <View style={resultsStyles.alternativeCard}>
        <View style={resultsStyles.alternativeHeader}>
            <View style={resultsStyles.alternativeIcon}>
                <Feather name="package" size={20} color="#8BC34A" />
            </View>
            <Text style={resultsStyles.alternativeName}>{alternative.name}</Text>
        </View>

        <Text style={resultsStyles.alternativeDescription}>{alternative.description}</Text>

        <View style={resultsStyles.alternativeMetrics}>
            <View style={resultsStyles.alternativeMetric}>
                <Ionicons name="trending-down" size={16} color="#00E676" />
                <Text style={resultsStyles.alternativeMetricText}>
                    {alternative.carbonReduction} less CO₂
                </Text>
            </View>

            <View style={resultsStyles.alternativeMetric}>
                <Ionicons name="location" size={16} color="#FFC107" />
                <Text style={resultsStyles.alternativeMetricText}>
                    {alternative.availability}
                </Text>
            </View>

            <View style={resultsStyles.alternativeMetric}>
                <Ionicons name="card" size={16} color="#2196F3" />
                <Text style={resultsStyles.alternativeMetricText}>
                    {alternative.costComparison}
                </Text>
            </View>
        </View>
    </View>
);

// Recommendation Item Component
const RecommendationItem = ({ recommendation, index }) => (
    <View style={resultsStyles.recommendationItem}>
        <View style={resultsStyles.recommendationNumber}>
            <Text style={resultsStyles.recommendationNumberText}>{index + 1}</Text>
        </View>
        <Text style={resultsStyles.recommendationText}>{recommendation}</Text>
    </View>
);

// Share functionality
const handleShare = async (analysisData, imageUri) => {
    try {
        const shareContent = {
            title: 'Environmental Analysis Results',
            message: `Environmental Analysis - ${analysisData?.productIdentification?.name || 'Product'}
            
Grade: ${analysisData?.overallAssessment?.environmentalGrade || 'N/A'}
Carbon Footprint: ${analysisData?.environmentalImpact?.carbonFootprint?.value || 'N/A'} ${analysisData?.environmentalImpact?.carbonFootprint?.unit || 'kg CO₂e'}
Sustainability Score: ${analysisData?.sustainability?.sustainabilityScore || 'N/A'}/10

Analyzed with EcoScan App`,
            ...(Platform.OS === 'ios' && imageUri ? { url: imageUri } : {})
        };

        await Share.share(shareContent);
    } catch (error) {
        Alert.alert('Share Error', 'Unable to share at this moment. Please try again.');
    }
};

// Main Results Screen Component
export default function ResultsScreen({ route, navigation }) {
    const { imageUri, analysisData } = route.params;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    const [expandedSections, setExpandedSections] = useState({
        production: false,
        foodSpecific: false,
        healthImpact: false,
        economicImpact: false,
        metrics: false
    });

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
        ]).start();
    }, []);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleRetry = () => {
        navigation.navigate('Home');
    };

    // Handle cases where analysis failed or contains living person
    if (!analysisData?.isValidItem) {
        return (
            <SafeAreaView style={resultsStyles.container}>
                <LinearGradient
                    colors={['#0a0a0a', '#1a1a1a', '#0a0a0a']}
                    style={resultsStyles.gradient}
                >
                    <View style={resultsStyles.errorContainer}>
                        <View style={resultsStyles.errorIconContainer}>
                            <Ionicons name="warning" size={64} color="#FF6B35" />
                        </View>
                        <Text style={resultsStyles.errorTitle}>
                            {analysisData?.containsLivingPerson
                                ? 'Person Detected'
                                : 'Analysis Not Available'}
                        </Text>
                        <Text style={resultsStyles.errorMessage}>
                            {analysisData?.containsLivingPerson
                                ? 'Please retake with an object or product instead.'
                                : 'Unable to analyze this image. Try with a clearer image.'}
                        </Text>
                        <TouchableOpacity
                            style={resultsStyles.retryButton}
                            onPress={handleRetry}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#FF6B35', '#F7931E']}
                                style={resultsStyles.retryButtonGradient}
                            >
                                <Ionicons name="camera" size={20} color="#ffffff" />
                                <Text style={resultsStyles.retryButtonText}>Take New Photo</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        );
    }

    const data = analysisData;
    const gradeColor = getGradeColor(data.overallAssessment?.environmentalGrade);
    const sustainabilityScore = (data.sustainability?.sustainabilityScore || 5) / 10;

    return (
        <SafeAreaView style={resultsStyles.container}>
            <LinearGradient
                colors={['#0a0a0a', '#1a1a1a', '#0a0a0a']}
                style={resultsStyles.gradient}
            >
                {/* Header */}
                <View style={resultsStyles.header}>
                    <TouchableOpacity
                        style={resultsStyles.headerButton}
                        onPress={() => navigation.navigate('Home')}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="close" size={24} color="#ffffff" />
                    </TouchableOpacity>

                    <Text style={resultsStyles.headerTitle}>Analysis</Text>

                    <TouchableOpacity
                        style={resultsStyles.headerButton}
                        onPress={() => handleShare(data, imageUri)}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="share" size={24} color="#00E676" />
                    </TouchableOpacity>
                </View>

                <Animated.View
                    style={[
                        resultsStyles.content,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={resultsStyles.scrollContent}
                    >
                        {/* Hero Section with Product Info */}
                        <View style={resultsStyles.heroSection}>
                            <View style={resultsStyles.productHeader}>
                                <Image source={{ uri: imageUri }} style={resultsStyles.productImage} />
                                <View style={resultsStyles.productInfo}>
                                    <Text style={resultsStyles.productName}>
                                        {data.productIdentification?.name || 'Unknown Product'}
                                    </Text>
                                    <Text style={resultsStyles.productCategory}>
                                        {data.productIdentification?.category?.toUpperCase()}
                                        {data.productIdentification?.subCategory &&
                                            ` • ${data.productIdentification.subCategory}`
                                        }
                                    </Text>
                                    <View style={resultsStyles.productMeta}>
                                        <View style={resultsStyles.confidenceContainer}>
                                            <Ionicons name="checkmark-circle" size={14} color="#FFC107" />
                                            <Text style={resultsStyles.confidence}>
                                                {Math.round((data.productIdentification?.confidence || 0) * 100)}% Match
                                            </Text>
                                        </View>
                                        {data.productIdentification?.brandVisible && (
                                            <View style={resultsStyles.brandContainer}>
                                                <Ionicons name="business" size={14} color="#2196F3" />
                                                <Text style={resultsStyles.brandText}>
                                                    {data.productIdentification.brandName || 'Brand Detected'}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>

                            {/* Main Circular Progress */}
                            <View style={resultsStyles.mainProgressContainer}>
                                <CircularProgress
                                    size={160}
                                    strokeWidth={12}
                                    progress={sustainabilityScore}
                                    color={gradeColor}
                                    backgroundColor="#1a1a1a"
                                    showPercentage={false}
                                >
                                    <Text style={[resultsStyles.gradeText, { color: gradeColor }]}>
                                        {data.overallAssessment?.environmentalGrade || 'N/A'}
                                    </Text>
                                    <Text style={resultsStyles.gradeSubtext}>
                                        Environmental Grade
                                    </Text>
                                </CircularProgress>
                            </View>
                        </View>

                        {/* Quick Impact Indicators */}
                        <View style={resultsStyles.impactGrid}>
                            <ImpactIndicator
                                severity={data.environmentalImpact?.ecologicalHarm?.severity}
                                value={data.environmentalImpact?.ecologicalHarm?.severity?.toUpperCase() || 'N/A'}
                                label="Impact Level"
                                iconName="warning"
                                iconType="Ionicons"
                            />

                            <ImpactIndicator
                                severity="low"
                                value={`${data.environmentalImpact?.offsetRequirement?.treesToPlant || 'N/A'}`}
                                label="Trees to Offset"
                                iconName="leaf"
                                iconType="Ionicons"
                            />

                            <ImpactIndicator
                                severity={data.sustainability?.recyclable ? 'low' : 'high'}
                                value={data.sustainability?.recyclable ? 'Yes' : 'No'}
                                label="Recyclable"
                                iconName="refresh"
                                iconType="Ionicons"
                            />
                        </View>

                        {/* Environmental Impact */}
                        <VisualCard
                            title="Carbon Footprint"
                            iconName="cloud"
                            iconType="Feather"
                            accentColor="#FF6B35"
                        >
                            <View style={resultsStyles.carbonSection}>
                                <View style={resultsStyles.carbonDisplay}>
                                    <Text style={resultsStyles.carbonValue}>
                                        {data.environmentalImpact?.carbonFootprint?.value || '0'}
                                    </Text>
                                    <Text style={resultsStyles.carbonUnit}>
                                        {data.environmentalImpact?.carbonFootprint?.unit || 'kg CO₂e'}
                                    </Text>
                                </View>

                                <Text style={resultsStyles.carbonDescription}>
                                    {data.environmentalImpact?.carbonFootprint?.description}
                                </Text>

                                <View style={resultsStyles.carbonMetrics}>
                                    <MetricBadge
                                        label="Lifecycle"
                                        value={data.environmentalImpact?.carbonFootprint?.lifecycle}
                                        color="#FF6B35"
                                        iconName="repeat"
                                        iconType="Feather"
                                    />
                                    <MetricBadge
                                        label="Scope"
                                        value={data.environmentalImpact?.carbonFootprint?.scope}
                                        color="#FF9800"
                                        iconName="target"
                                        iconType="Feather"
                                    />
                                </View>

                                <LinearGauge
                                    value={parseFloat(data.environmentalImpact?.carbonFootprint?.value) || 0}
                                    maxValue={10}
                                    color="#FF6B35"
                                    label="Carbon Intensity"
                                    height={16}
                                />
                            </View>
                        </VisualCard>

                        {/* Offset Requirements */}
                        <VisualCard
                            title="Carbon Offset"
                            iconName="leaf"
                            iconType="Ioniconcs"
                            accentColor="#4CAF50"
                        >
                            <View style={resultsStyles.offsetSection}>
                                <View style={resultsStyles.offsetGrid}>
                                    <View style={resultsStyles.offsetItem}>
                                        <Ionicons name="leaf" size={32} color="#4CAF50" />
                                        <Text style={resultsStyles.offsetValue}>
                                            {data.environmentalImpact?.offsetRequirement?.treesToPlant}
                                        </Text>
                                        <Text style={resultsStyles.offsetLabel}>Trees</Text>
                                    </View>

                                    <View style={resultsStyles.offsetItem}>
                                        <Ionicons name="time" size={32} color="#FFC107" />
                                        <Text style={resultsStyles.offsetValue}>
                                            {data.environmentalImpact?.offsetRequirement?.timeToOffset}
                                        </Text>
                                        <Text style={resultsStyles.offsetLabel}>Time</Text>
                                    </View>

                                    <View style={resultsStyles.offsetItem}>
                                        <Ionicons name="card" size={32} color="#2196F3" />
                                        <Text style={resultsStyles.offsetValue}>
                                            {data.environmentalImpact?.offsetRequirement?.offsetCost}
                                        </Text>
                                        <Text style={resultsStyles.offsetLabel}>Cost</Text>
                                    </View>
                                </View>

                                <Text style={resultsStyles.offsetDescription}>
                                    {data.environmentalImpact?.offsetRequirement?.description}
                                </Text>
                            </View>
                        </VisualCard>

                        {/* Sustainability Overview */}
                        <VisualCard
                            title="Sustainability Profile"
                            iconName="shield-checkmark-outline"
                            iconType="Ionicons"
                            accentColor="#00E676"
                        >
                            <View style={resultsStyles.sustainabilitySection}>
                                <LinearGauge
                                    value={data.sustainability?.sustainabilityScore || 5}
                                    maxValue={10}
                                    color="#00E676"
                                    label="Overall Score"
                                    unit="/10"
                                    height={20}
                                />

                                <Text style={resultsStyles.sustainabilityExplanation}>
                                    {data.sustainability?.scoreExplanation}
                                </Text>

                                <View style={resultsStyles.sustainabilityGrid}>
                                    <View style={resultsStyles.sustainabilityItem}>
                                        <StatusIndicator status={data.sustainability?.recyclable} />
                                        <Text style={resultsStyles.sustainabilityLabel}>Recyclable</Text>
                                    </View>

                                    <View style={resultsStyles.sustainabilityItem}>
                                        <StatusIndicator status={data.sustainability?.biodegradable} />
                                        <Text style={resultsStyles.sustainabilityLabel}>Biodegradable</Text>
                                    </View>

                                    <View style={resultsStyles.sustainabilityItem}>
                                        <StatusIndicator status={data.sustainability?.renewableSource} />
                                        <Text style={resultsStyles.sustainabilityLabel}>Renewable</Text>
                                    </View>
                                </View>

                                {data.sustainability?.certifications?.length > 0 && (
                                    <View style={resultsStyles.certificationsContainer}>
                                        <Text style={resultsStyles.certificationsTitle}>Certifications</Text>
                                        <View style={resultsStyles.certificationsGrid}>
                                            {data.sustainability.certifications.map((cert, index) => (
                                                <View key={index} style={resultsStyles.certificationBadge}>
                                                    <Ionicons name="ribbon" size={14} color="#FFC107" />
                                                    <Text style={resultsStyles.certificationText}>{cert}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )}
                            </View>
                        </VisualCard>

                        {/* Ecological Impact */}
                        <VisualCard
                            title="Ecological Impact"
                            iconName="globe"
                            iconType="Feather"
                            accentColor="#FF5722"
                        >
                            <View style={resultsStyles.ecologicalSection}>
                                <View style={resultsStyles.severityContainer}>
                                    <View style={[
                                        resultsStyles.severityIndicator,
                                        { backgroundColor: getSeverityColor(data.environmentalImpact?.ecologicalHarm?.severity) }
                                    ]}>
                                        <Ionicons name="warning" size={24} color="#ffffff" />
                                    </View>
                                    <View style={resultsStyles.severityText}>
                                        <Text style={resultsStyles.severityLevel}>
                                            {data.environmentalImpact?.ecologicalHarm?.severity?.toUpperCase()} IMPACT
                                        </Text>
                                        <Text style={resultsStyles.severityDescription}>
                                            {data.environmentalImpact?.ecologicalHarm?.description}
                                        </Text>
                                    </View>
                                </View>

                                {data.environmentalImpact?.ecologicalHarm?.impacts?.length > 0 && (
                                    <View style={resultsStyles.impactsContainer}>
                                        <Text style={resultsStyles.impactsTitle}>Environmental Impacts</Text>
                                        {data.environmentalImpact.ecologicalHarm.impacts.map((impact, index) => (
                                            <View key={index} style={resultsStyles.impactItem}>
                                                <Feather name="alert-circle" size={16} color="#FF5722" />
                                                <Text style={resultsStyles.impactText}>{impact}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {data.environmentalImpact?.ecologicalHarm?.affectedEcosystems?.length > 0 && (
                                    <View style={resultsStyles.ecosystemsContainer}>
                                        <Text style={resultsStyles.ecosystemsTitle}>Affected Ecosystems</Text>
                                        <View style={resultsStyles.ecosystemsGrid}>
                                            {data.environmentalImpact.ecologicalHarm.affectedEcosystems.map((ecosystem, index) => (
                                                <View key={index} style={resultsStyles.ecosystemBadge}>
                                                    <Text style={resultsStyles.ecosystemText}>{ecosystem}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )}
                            </View>
                        </VisualCard>

                        {/* Production Analysis - Expandable */}
                        <VisualCard
                            title="Production Analysis"
                            iconName="settings"
                            iconType="Feather"
                            accentColor="#9C27B0"
                            isExpanded={expandedSections.production}
                            onToggle={() => toggleSection('production')}
                        >
                            <View style={resultsStyles.productionSection}>
                                <View style={resultsStyles.materialsList}>
                                    <Text style={resultsStyles.materialsTitle}>Materials</Text>
                                    <Text style={resultsStyles.primaryMaterial}>
                                        Primary: {data.production?.primaryMaterial}
                                    </Text>
                                    {data.production?.materials?.map((material, index) => (
                                        <View key={index} style={resultsStyles.materialItem}>
                                            <Feather name="package" size={14} color="#9C27B0" />
                                            <Text style={resultsStyles.materialText}>{material}</Text>
                                        </View>
                                    ))}
                                </View>

                                <Text style={resultsStyles.processDescription}>
                                    {data.production?.process}
                                </Text>

                                <View style={resultsStyles.productionMetrics}>
                                    <LinearGauge
                                        value={data.production?.energyIntensive ? 8 : 3}
                                        maxValue={10}
                                        color={data.production?.energyIntensive ? '#FF5722' : '#00E676'}
                                        label="Energy Intensity"
                                        unit="Level"
                                    />

                                    <LinearGauge
                                        value={data.production?.waterUsage === 'high' ? 9 :
                                            data.production?.waterUsage === 'medium' ? 5 : 2}
                                        maxValue={10}
                                        color={data.production?.waterUsage === 'high' ? '#FF5722' : '#FFC107'}
                                        label="Water Usage"
                                        unit="Level"
                                    />
                                </View>

                                <View style={resultsStyles.productionDetails}>
                                    <MetricBadge
                                        label="Land Use"
                                        value={data.production?.landUse}
                                        color="#795548"
                                        iconName="map"
                                        iconType="Feather"
                                    />
                                    <MetricBadge
                                        label="Transport"
                                        value={data.production?.transportDistance}
                                        color="#607D8B"
                                        iconName="truck"
                                        iconType="Feather"
                                    />
                                    <MetricBadge
                                        label="Seasonality"
                                        value={data.production?.seasonality}
                                        color="#8BC34A"
                                        iconName="calendar"
                                        iconType="Feather"
                                    />
                                </View>
                            </View>
                        </VisualCard>

                        {/* Food-Specific Analysis - Expandable */}
                        {data.productIdentification?.isFood && (
                            <VisualCard
                                title="Food Analysis"
                                iconName="restaurant"
                                iconType="Ionicons"
                                accentColor="#FF9800"
                                isExpanded={expandedSections.foodSpecific}
                                onToggle={() => toggleSection('foodSpecific')}
                            >
                                <View style={resultsStyles.foodSection}>
                                    {data.foodSpecific?.ingredients?.length > 0 && (
                                        <View style={resultsStyles.ingredientsContainer}>
                                            <Text style={resultsStyles.ingredientsTitle}>Ingredients</Text>
                                            <View style={resultsStyles.ingredientsList}>
                                                {data.foodSpecific.ingredients.slice(0, 5).map((ingredient, index) => (
                                                    <View key={index} style={resultsStyles.ingredientTag}>
                                                        <Text style={resultsStyles.ingredientText}>{ingredient}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    )}

                                    <LinearGauge
                                        value={data.foodSpecific?.processingLevel === 'ultra-processed' ? 10 :
                                            data.foodSpecific?.processingLevel === 'processed' ? 7 :
                                                data.foodSpecific?.processingLevel === 'minimally processed' ? 3 : 1}
                                        maxValue={10}
                                        color={getProcessingColor(data.foodSpecific?.processingLevel)}
                                        label="Processing Level"
                                        unit={data.foodSpecific?.processingLevel}
                                    />

                                    <View style={resultsStyles.foodMetrics}>
                                        <MetricBadge
                                            label="Organic Status"
                                            value={data.foodSpecific?.organicStatus}
                                            color={data.foodSpecific?.organicStatus === 'organic' ? '#4CAF50' : '#FF9800'}
                                            iconName="leaf"
                                            iconType="Feather"
                                        />
                                        <MetricBadge
                                            label="Shelf Life"
                                            value={data.foodSpecific?.shelfLife}
                                            color="#607D8B"
                                            iconName="clock"
                                            iconType="Feather"
                                        />
                                        <MetricBadge
                                            label="Availability"
                                            value={data.foodSpecific?.localAvailability}
                                            color="#2196F3"
                                            iconName="map-pin"
                                            iconType="Feather"
                                        />
                                    </View>

                                    {data.foodSpecific?.preservatives?.length > 0 && (
                                        <View style={resultsStyles.preservativesContainer}>
                                            <Text style={resultsStyles.preservativesTitle}>Preservatives</Text>
                                            <View style={resultsStyles.preservativesList}>
                                                {data.foodSpecific.preservatives.map((preservative, index) => (
                                                    <View key={index} style={resultsStyles.preservativeItem}>
                                                        <Ionicons name="flask" size={14} color="#FF5722" />
                                                        <Text style={resultsStyles.preservativeText}>{preservative}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </VisualCard>
                        )}

                        {/* Health Impact - Expandable */}
                        <VisualCard
                            title="Health Impact"
                            iconName="heart"
                            iconType="Feather"
                            accentColor="#E91E63"
                            isExpanded={expandedSections.healthImpact}
                            onToggle={() => toggleSection('healthImpact')}
                        >
                            <View style={resultsStyles.healthSection}>
                                <View style={resultsStyles.healthOverview}>
                                    <View style={[
                                        resultsStyles.healthIndicator,
                                        {
                                            backgroundColor: data.healthImpact?.humanHealth === 'positive' ? '#00E676' :
                                                data.healthImpact?.humanHealth === 'negative' ? '#FF5722' : '#FFC107'
                                        }
                                    ]}>
                                        <Ionicons
                                            name={data.healthImpact?.humanHealth === 'positive' ? 'heart' :
                                                data.healthImpact?.humanHealth === 'negative' ? 'ellipse-outline' : 'ellipse-outline'}
                                            size={24}
                                            color="#ffffff"
                                        />
                                    </View>
                                    <Text style={resultsStyles.healthStatus}>
                                        {data.healthImpact?.humanHealth?.toUpperCase()} IMPACT
                                    </Text>
                                </View>

                                <LinearGauge
                                    value={data.healthImpact?.nutritionalValue === 'high' ? 8 :
                                        data.healthImpact?.nutritionalValue === 'moderate' ? 5 : 2}
                                    maxValue={10}
                                    color="#4CAF50"
                                    label="Nutritional Value"
                                    unit={data.healthImpact?.nutritionalValue || 'N/A'}
                                />

                                {data.healthImpact?.healthConcerns?.length > 0 && (
                                    <View style={resultsStyles.healthConcerns}>
                                        <Text style={resultsStyles.healthConcernsTitle}>Health Concerns</Text>
                                        {data.healthImpact.healthConcerns.map((concern, index) => (
                                            <View key={index} style={resultsStyles.healthConcernItem}>
                                                <Ionicons name="warning-outline" size={16} color="#FF5722" />
                                                <Text style={resultsStyles.healthConcernText}>{concern}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {data.healthImpact?.allergens?.length > 0 && (
                                    <View style={resultsStyles.allergensContainer}>
                                        <Text style={resultsStyles.allergensTitle}>Allergens</Text>
                                        <View style={resultsStyles.allergensList}>
                                            {data.healthImpact.allergens.map((allergen, index) => (
                                                <View key={index} style={resultsStyles.allergenTag}>
                                                    <Ionicons name="alert" size={12} color="#FF5722" />
                                                    <Text style={resultsStyles.allergenText}>{allergen}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )}
                            </View>
                        </VisualCard>

                        {/* Economic Impact - Expandable */}
                        <VisualCard
                            title="Economic Impact"
                            iconName="trending-up"
                            iconType="Feather"
                            accentColor="#3F51B5"
                            isExpanded={expandedSections.economicImpact}
                            onToggle={() => toggleSection('economicImpact')}
                        >
                            <View style={resultsStyles.economicSection}>
                                <View style={resultsStyles.economicGrid}>
                                    <View style={resultsStyles.economicItem}>
                                        <Text style={resultsStyles.economicLabel}>Fair Trade</Text>
                                        <StatusIndicator status={data.economicImpact?.fairTrade} />
                                    </View>

                                    <View style={resultsStyles.economicItem}>
                                       
                                        <Text style={resultsStyles.economicLabel}>Labor</Text>
                                        <Text style={resultsStyles.economicValue}>
                                            {data.economicImpact?.laborConditions}
                                        </Text>
                                    </View>

                                    <View style={resultsStyles.economicItem}>
            
                                        <Text style={resultsStyles.economicLabel}>Local Economy</Text>
                                        <Text style={resultsStyles.economicValue}>
                                            {data.economicImpact?.localEconomy}
                                        </Text>
                                    </View>

                                    <View style={resultsStyles.economicItem}>
                                        <Text style={resultsStyles.economicLabel}>Price Point</Text>
                                        <Text style={resultsStyles.economicValue}>
                                            {data.economicImpact?.pricePoint}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </VisualCard>

                        {/* Detailed Metrics - Expandable */}
                        <VisualCard
                            title="Detailed Metrics"
                            iconName="bar-chart-2"
                            iconType="Feather"
                            accentColor="#607D8B"
                            isExpanded={expandedSections.metrics}
                            onToggle={() => toggleSection('metrics')}
                        >
                            <View style={resultsStyles.metricsSection}>
                                <View style={resultsStyles.metricsGrid}>
                                    <View style={resultsStyles.metricCard}>
                                        <Feather name="droplet" size={24} color="#2196F3" />
                                        <Text style={resultsStyles.metricTitle}>Water Footprint</Text>
                                        <Text style={resultsStyles.metricValue}>
                                            {data.metrics?.waterFootprint}
                                        </Text>
                                    </View>

                                    <View style={resultsStyles.metricCard}>
                                        <Ionicons name="flash" size={24} color="#FFC107" />
                                        <Text style={resultsStyles.metricTitle}>Energy Footprint</Text>
                                        <Text style={resultsStyles.metricValue}>
                                            {data.metrics?.energyFootprint}
                                        </Text>
                                    </View>

                                    <View style={resultsStyles.metricCard}>
                                        <Feather name="trash-2" size={24} color="#FF5722" />
                                        <Text style={resultsStyles.metricTitle}>Waste Generated</Text>
                                        <Text style={resultsStyles.metricValue}>
                                            {data.metrics?.wasteGenerated}
                                        </Text>
                                    </View>

                                    <View style={resultsStyles.metricCard}>
                                        <Feather name="truck" size={24} color="#9E9E9E" />
                                        <Text style={resultsStyles.metricTitle}>Transport Emissions</Text>
                                        <Text style={resultsStyles.metricValue}>
                                            {data.metrics?.transportEmissions}
                                        </Text>
                                    </View>
                                </View>

                                <View style={resultsStyles.packagingSection}>
                                    <Text style={resultsStyles.packagingTitle}>Packaging Impact</Text>
                                    <LinearGauge
                                        value={data.metrics?.packagingImpact === 'high' ? 8 :
                                            data.metrics?.packagingImpact === 'moderate' ? 5 : 2}
                                        maxValue={10}
                                        color={data.metrics?.packagingImpact === 'high' ? '#FF5722' : '#4CAF50'}
                                        label="Packaging Impact Level"
                                        unit={data.metrics?.packagingImpact}
                                    />

                                    <View style={resultsStyles.endOfLifeContainer}>
                                        <Text style={resultsStyles.endOfLifeTitle}>End of Life</Text>
                                        <View style={[
                                            resultsStyles.endOfLifeBadge,
                                            {
                                                backgroundColor: data.metrics?.endOfLifeImpact === 'compostable' ? '#4CAF50' :
                                                    data.metrics?.endOfLifeImpact === 'recyclable' ? '#2196F3' : '#FF5722'
                                            }
                                        ]}>
                                            <Ionicons
                                                name={data.metrics?.endOfLifeImpact === 'compostable' ? 'leaf' :
                                                    data.metrics?.endOfLifeImpact === 'recyclable' ? 'refresh' : 'trash'}
                                                size={16}
                                                color="#ffffff"
                                            />
                                            <Text style={resultsStyles.endOfLifeText}>
                                                {data.metrics?.endOfLifeImpact}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </VisualCard>

                        {/* Alternatives */}
                        {data.alternatives && data.alternatives.length > 0 && (
                            <VisualCard
                                title="Eco-Friendly Alternatives"
                                iconName="package"
                                iconType="Feather"
                                accentColor="#8BC34A"
                            >
                                <View style={resultsStyles.alternativesSection}>
                                    {data.alternatives.slice(0, 3).map((alternative, index) => (
                                        <AlternativeCard key={index} alternative={alternative} index={index} />
                                    ))}
                                </View>
                            </VisualCard>
                        )}

                        {/* Recommendations */}
                        <VisualCard
                            title="Recommendations"
                            iconName="star"
                            iconType="Feather"
                            accentColor="#FFC107"
                        >
                            <View style={resultsStyles.recommendationsSection}>
                                {data.recommendations?.map((recommendation, index) => (
                                    <RecommendationItem key={index} recommendation={recommendation} index={index} />
                                ))}
                            </View>
                        </VisualCard>

                        {/* Overall Assessment */}
                        <VisualCard
                            title="Final Assessment"
                            iconName="award"
                            iconType="Feather"
                            accentColor={gradeColor}
                        >
                            <View style={resultsStyles.finalAssessment}>
                                <Text style={resultsStyles.assessmentText}>
                                    {data.overallAssessment?.improvementPotential}
                                </Text>

                                {data.overallAssessment?.keyStrengths?.length > 0 && (
                                    <View style={resultsStyles.strengthsContainer}>
                                        <Text style={resultsStyles.strengthsTitle}>Key Strengths</Text>
                                        {data.overallAssessment.keyStrengths.map((strength, index) => (
                                            <View key={index} style={resultsStyles.strengthItem}>
                                                <Ionicons name="checkmark-circle" size={16} color="#00E676" />
                                                <Text style={resultsStyles.strengthText}>{strength}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {data.overallAssessment?.keyWeaknesses?.length > 0 && (
                                    <View style={resultsStyles.weaknessesContainer}>
                                        <Text style={resultsStyles.weaknessesTitle}>Areas for Improvement</Text>
                                        {data.overallAssessment.keyWeaknesses.map((weakness, index) => (
                                            <View key={index} style={resultsStyles.weaknessItem}>
                                                <Ionicons name="alert-circle" size={16} color="#FF5722" />
                                                <Text style={resultsStyles.weaknessText}>{weakness}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        </VisualCard>

                        {/* Action Buttons */}
                        <View style={resultsStyles.actionButtons}>
                            <TouchableOpacity
                                style={resultsStyles.retakeButton}
                                onPress={() => navigation.navigate('Camera')}
                                activeOpacity={0.8}
                            >
                                <Ionicons name="camera" size={20} color="#ffffff80" />
                                <Text style={resultsStyles.retakeButtonText}>Scan Another</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={resultsStyles.shareButton}
                                onPress={() => handleShare(data, imageUri)}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#00E676', '#4CAF50']}
                                    style={resultsStyles.shareButtonGradient}
                                >
                                    <Ionicons name="share" size={20} color="black" />
                                    <Text style={resultsStyles.shareButtonText}>Share</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        {/* Footer Spacing */}
                        <View style={resultsStyles.footerSpacing} />
                    </ScrollView>
                </Animated.View>
            </LinearGradient>
        </SafeAreaView>
    );
}