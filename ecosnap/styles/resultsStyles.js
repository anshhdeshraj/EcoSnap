import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },

    // Header styles
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    headerButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    headerTitle: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    // Error states
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    errorIconContainer: {
        padding: 24,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderWidth: 2,
        borderColor: 'rgba(255, 107, 53, 0.3)',
        marginBottom: 24,
    },
    errorTitle: {
        fontSize: 26,
        color: '#ffffff',
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    errorMessage: {
        fontSize: 16,
        color: '#ffffff80',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    retryButton: {
        borderRadius: 30,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
    },
    retryButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        paddingHorizontal: 40,
        gap: 8,
    },
    retryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    // Hero Section
    heroSection: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        elevation: 4,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    productHeader: {
        flexDirection: 'row',
        marginBottom: 24,
        alignItems: 'center',
    },
    productImage: {
        width: 90,
        height: 90,
        borderRadius: 20,
        
    },
    productInfo: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '700',
        marginBottom: 6,
        lineHeight: 24,
    },
    productCategory: {
        fontSize: 13,
        color: '#00E676',
        fontWeight: '600',
        letterSpacing: 1.2,
        marginBottom: 8,
    },
    productMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    confidenceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    confidence: {
        fontSize: 12,
        color: '#FFC107',
        fontWeight: '500',
    },
    brandContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    brandText: {
        fontSize: 12,
        color: '#2196F3',
        fontWeight: '500',
    },

    // Main Progress Container
    mainProgressContainer: {
        alignItems: 'center',
        marginTop: 20,
    },

    // Circular Progress Components
    circularProgressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    circularProgressContent: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    circularProgressText: {
        fontSize: 28,
        fontWeight: '900',
        marginBottom: 4,
    },
    circularProgressLabel: {
        fontSize: 12,
        color: '#ffffff80',
        fontWeight: '500',
        textAlign: 'center',
    },
    gradeText: {
        fontSize: 48,
        fontWeight: '900',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    gradeSubtext: {
        fontSize: 14,
        color: '#ffffff80',
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 0.5,
        marginTop: 4,
    },

    // Linear Gauge Components
    linearGaugeContainer: {
        marginVertical: 12,
    },
    gaugeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    gaugeLabel: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
    },
    gaugeValue: {
        fontSize: 14,
        color: '#ffffff80',
        fontWeight: '700',
    },
    gaugeTrack: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    gaugeFill: {
        borderRadius: 12,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },

    // Impact Indicators
    impactGrid: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 24,
        gap: 16,
    },
    impactIndicatorContainer: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        paddingVertical: 20,
    },
    impactIndicatorPulse: {
        position: 'absolute',
        top: 8,
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    impactIndicatorCore: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        elevation: 6,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    impactIndicatorLabel: {
        fontSize: 12,
        color: '#ffffff80',
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 4,
    },
    impactIndicatorValue: {
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
    },

    // Visual Cards
    visualCard: {
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        elevation: 4,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    visualCardGradient: {
        padding: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },
    visualCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    visualCardHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    visualCardIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    visualCardTitle: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '700',
        flex: 1,
    },
    visualCardContent: {
        flex: 1,
    },

    // Carbon Section
    carbonSection: {
        alignItems: 'center',
    },
    carbonDisplay: {
        alignItems: 'center',
        marginBottom: 20,
    },
    carbonValue: {
        fontSize: 36,
        color: '#FF6B35',
        fontWeight: '900',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    carbonUnit: {
        fontSize: 16,
        color: '#ffffff80',
        fontWeight: '600',
        marginTop: 4,
    },
    carbonDescription: {
        fontSize: 14,
        color: '#ffffff70',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20,
    },
    carbonMetrics: {
        flexDirection: 'column',
        gap: 12,
        marginBottom: 20,
    },

    // Metric Badge
    metricBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
        gap: 6,
    },
    metricBadgeIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    metricBadgeLabel: {
        fontSize: 12,
        color: '#ffffff80',
        fontWeight: '500',
    },
    metricBadgeValue: {
        fontSize: 12,
        fontWeight: '700',
    },

    // Status Indicator
    statusIndicator: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },

    // Offset Section
    offsetSection: {
        gap: 20,
    },
    offsetGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 4,
    },
    offsetItem: {
        alignItems: 'center',
        flex: 1,
    },
    offsetValue: {
        fontSize: 12,
        color: '#ffffff',
        fontWeight: '700',
        marginTop: 8,
    },
    offsetLabel: {
        fontSize: 8,
        color: '#ffffff60',
        fontWeight: '500',
        marginTop: 4,
    },
    offsetDescription: {
        fontSize: 12,
        color: '#ffffff70',
        textAlign: 'center',
        lineHeight: 15,
    },

    // Sustainability Section
    sustainabilitySection: {
        gap: 20,
    },
    sustainabilityExplanation: {
        fontSize: 12,
        color: '#ffffff70',
        lineHeight: 15,
        marginBottom: 0,
    },
    sustainabilityGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    sustainabilityItem: {
        alignItems: 'center',
        flex: 1,
        gap: 8,
    },
    sustainabilityLabel: {
        fontSize: 8,
        color: '#ffffff80',
        fontWeight: '500',
        textAlign: 'center',
    },

    // Certifications
    certificationsContainer: {
        marginTop: 16,
    },
    certificationsTitle: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 12,
    },
    certificationsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    certificationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 193, 7, 0.15)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: .5,
        borderColor: 'rgba(255, 193, 7, 0.3)',
        gap: 4,
    },
    certificationText: {
        fontSize: 11,
        color: '#FFC107',
        fontWeight: '600',
    },

    // Ecological Section
    ecologicalSection: {
        gap: 20,
    },
    severityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    severityIndicator: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    severityText: {
        flex: 1,
    },
    severityLevel: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '700',
        marginBottom: 4,
    },
    severityDescription: {
        fontSize: 14,
        color: '#ffffff70',
        lineHeight: 18,
    },

    // Impacts
    impactsContainer: {
        marginTop: 0,
    },
    impactsTitle: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 12,
    },
    impactItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
        gap: 8,
    },
    impactText: {
        fontSize: 13,
        color: '#ffffff80',
        lineHeight: 14,
        flex: 1,
    },

    // Ecosystems
    ecosystemsContainer: {
        marginTop: 16,
    },
    ecosystemsTitle: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 12,
    },
    ecosystemsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    ecosystemBadge: {
        backgroundColor: 'rgba(255, 87, 34, 0.15)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: .5,
        borderColor: 'rgba(255, 87, 34, 0.3)',
    },
    ecosystemText: {
        fontSize: 9,
        color: '#FF5722',
        fontWeight: '600',
    },

    // Production Section
    productionSection: {
        gap: 16,
    },
    materialsList: {
        marginBottom: 16,
    },
    materialsTitle: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 8,
    },
    primaryMaterial: {
        fontSize: 13,
        color: '#9C27B0',
        fontWeight: '600',
        marginBottom: 8,
    },
    materialItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        gap: 6,
    },
    materialText: {
        fontSize: 12,
        color: '#ffffff70',
    },
    processDescription: {
        fontSize: 13,
        color: '#ffffff70',
        lineHeight: 18,
        marginBottom: 16,
    },
    productionMetrics: {
        gap: 12,
        marginBottom: 16,
    },
    productionDetails: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },

    // Food Section
    foodSection: {
        gap: 16,
    },
    ingredientsContainer: {
        marginBottom: 16,
    },
    ingredientsTitle: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 8,
    },
    ingredientsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    ingredientTag: {
        backgroundColor: 'rgba(255, 152, 0, 0.15)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 152, 0, 0.3)',
    },
    ingredientText: {
        fontSize: 11,
        color: '#FF9800',
        fontWeight: '500',
    },
    foodMetrics: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 12,
    },
    preservativesContainer: {
        marginTop: 16,
    },
    preservativesTitle: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 8,
    },
    preservativesList: {
        gap: 4,
    },
    preservativeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    preservativeText: {
        fontSize: 12,
        color: '#ffffff70',
    },

    // Health Section
    healthSection: {
        gap: 16,
    },
    healthOverview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    healthIndicator: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    healthStatus: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '700',
    },
    healthConcerns: {
        marginTop: 0,
    },
    healthConcernsTitle: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 8,
    },
    healthConcernItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 6,
        gap: 6,
    },
    healthConcernText: {
        fontSize: 12,
        color: '#ffffff70',
        flex: 1,
        lineHeight: 13,
    },
    allergensContainer: {
        marginTop: 16,
    },
    allergensTitle: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 8,
    },
    allergensList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    allergenTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 87, 34, 0.15)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 87, 34, 0.3)',
        gap: 3,
    },
    allergenText: {
        fontSize: 10,
        color: '#FF5722',
        fontWeight: '600',
    },

    // Economic Section
    economicSection: {
        gap: 16,
    },
    economicGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    economicItem: {
        alignItems: 'center',
        flex: 1,
        minWidth: '40%',
        gap: 8,
    },
    economicLabel: {
        fontSize: 12,
        color: '#ffffff80',
        fontWeight: '500',
        textAlign: 'center',
    },
    economicValue: {
        fontSize: 11,
        color: '#ffffff60',
        fontWeight: '500',
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    economicStatusIndicator: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginBottom: 4,
    },

    // Metrics Section
    metricsSection: {
        gap: 20,
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    metricCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        flex: 1,
        minWidth: '45%',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        gap: 8,
    },
    metricTitle: {
        fontSize: 10,
        color: '#ffffff80',
        fontWeight: '500',
        textAlign: 'center',
    },
    metricValue: {
        fontSize: 13,
        color: '#ffffff',
        fontWeight: '600',
        textAlign: 'center',
    },
    packagingSection: {
        marginTop: 16,
    },
    packagingTitle: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 12,
    },
    endOfLifeContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
    endOfLifeTitle: {
        fontSize: 12,
        color: '#ffffff80',
        fontWeight: '700',
        marginBottom: 8,
    },
    endOfLifeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 6,
    },
    endOfLifeText: {
        fontSize: 10,
        color: '#ffffff',
        fontWeight: '600',
        textTransform: 'capitalize',
    },

    // Alternatives Section
    alternativesSection: {
        gap: 16,
    },
    alternativeCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 16,
        borderRadius: 16,
        borderWidth: .5,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    alternativeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    alternativeIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(139, 195, 74, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    alternativeName: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '600',
        flex: 1,
    },
    alternativeDescription: {
        fontSize: 13,
        color: '#ffffff70',
        lineHeight: 18,
        marginBottom: 12,
    },
    alternativeMetrics: {
        gap: 8,
    },
    alternativeMetric: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    alternativeMetricText: {
        fontSize: 12,
        color: '#ffffff80',
        flex: 1,
    },

    // Recommendations Section
    recommendationsSection: {
        gap: 10,
    },
    recommendationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    recommendationNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFC107',
        alignItems: 'center',
        justifyContent: 'center',
    },
    recommendationNumberText: {
        fontSize: 12,
        color: '#000000',
        fontWeight: '700',
    },
    recommendationText: {
        fontSize: 12,
        color: '#ffffff80',
        lineHeight: 16,
        flex: 1,
    },

    // Final Assessment
    finalAssessment: {
        gap: 14,
    },
    assessmentText: {
        fontSize: 12,
        color: '#ffffff90',
        lineHeight: 14,
        fontWeight: '400',
        textAlign: 'center',
    },
    strengthsContainer: {
        gap: 8,
    },
    strengthsTitle: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 0,
    },
    strengthItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    strengthText: {
        fontSize: 12,
        color: '#ffffff80',
        fontWeight: '400',
        flex: 1,
        lineHeight: 14,
    },
    weaknessesContainer: {
        gap: 8,
        marginTop: 0,
    },
    weaknessesTitle: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 8,
    },
    weaknessItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    weaknessText: {
        fontSize: 13,
        color: '#ffffff80',
        fontWeight: '400',
        flex: 1,
        lineHeight: 14,
    },

    // Action buttons
    actionButtons: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 32,
        gap: 16,
    },
    retakeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderWidth: .5,
        borderColor: '#ffffff30',
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        gap: 8,
    },
    retakeButtonText: {
        color: '#ffffff90',
        fontSize: 16,
        fontWeight: '500',
    },
    shareButton: {
        flex: 1,
        borderRadius: 30,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#00E676',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
    },
    shareButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        gap: 8,
    },
    shareButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
        letterSpacing: 0.5,
    },

    // Footer spacing
    footerSpacing: {
        height: 20,
    },

    // Additional styles for missing components
    sustainabilityMetrics: {
        gap: 16,
    },
    metricItem: {
        alignItems: 'center',
        flex: 1,
    },
    metricIndicator: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    metricLabel: {
        fontSize: 12,
        color: '#ffffff80',
        fontWeight: '500',
        textAlign: 'center',
    },

    // Expandable sections
    expandableSection: {
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderLeftWidth: 4,
    },
    sectionHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    sectionIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '600',
        flex: 1,
    },
    sectionContent: {
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },

    // Production Analysis
    productionAnalysis: {
        padding: 20,
        gap: 16,
    },

    // Food Analysis
    foodAnalysis: {
        padding: 20,
        gap: 16,
    },
    organicIndicator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    organicLabel: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
    },
    organicBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    organicText: {
        fontSize: 12,
        color: '#ffffff',
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    // Alternatives
    alternativesGrid: {
        padding: 20,
        gap: 16,
    },
    alternativeVisualCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },

    // Loading and shimmer effects
    shimmerContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 8,
        overflow: 'hidden',
    },
    shimmerGradient: {
        height: '100%',
        width: '100%',
    },

    // Tooltip styles
    tooltip: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        zIndex: 1000,
    },
    tooltipText: {
        fontSize: 12,
        color: '#ffffff',
        fontWeight: '500',
    },
    tooltipArrow: {
        position: 'absolute',
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
    },

    // Progress bar variants
    progressBarThin: {
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarThick: {
        height: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 6,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 'inherit',
    },

    // Notification styles
    notification: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0, 230, 118, 0.15)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(0, 230, 118, 0.3)',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 999,
    },
    notificationText: {
        fontSize: 14,
        color: '#00E676',
        fontWeight: '600',
        flex: 1,
        marginLeft: 8,
    },

    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContainer: {
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    modalTitle: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 16,
    },
    modalContent: {
        marginBottom: 24,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
    },
    modalButtonPrimary: {
        backgroundColor: 'rgba(0, 230, 118, 0.2)',
        borderColor: '#00E676',
    },
    modalButtonSecondary: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    modalButtonTextPrimary: {
        color: '#00E676',
    },
    modalButtonTextSecondary: {
        color: '#ffffff80',
    },

    // Tab styles
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 4,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    tabActive: {
        backgroundColor: 'rgba(0, 230, 118, 0.2)',
    },
    tabInactive: {
        backgroundColor: 'transparent',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
    },
    tabTextActive: {
        color: '#00E676',
    },
    tabTextInactive: {
        color: '#ffffff60',
    },

    // Chart styles
    chartContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 16,
        padding: 16,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    chartTitle: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center',
    },
    chartLegend: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 16,
        marginTop: 12,
    },
    chartLegendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    chartLegendColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    chartLegendText: {
        fontSize: 12,
        color: '#ffffff80',
        fontWeight: '500',
    },

    // Loading states
    skeletonBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 8,
    },
    skeletonText: {
        height: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 8,
        marginBottom: 8,
    },
    skeletonCircle: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 50,
    },

    // Accessibility helpers
    screenReaderOnly: {
        position: 'absolute',
        left: -10000,
        width: 1,
        height: 1,
        overflow: 'hidden',
    },

    // Responsive adjustments
    smallScreen: {
        paddingHorizontal: 12,
    },
    largeScreen: {
        paddingHorizontal: 32,
    },
});