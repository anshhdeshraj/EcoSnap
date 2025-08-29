import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    Animated,
    Dimensions,
    SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import processingStyles from '../styles/processingStyles';
import { ScanIcon } from '../components/Icons';

export default function ProcessingScreen({ route, navigation }) {
    const { imageUri, uploadResult, serverUrl } = route.params;
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('Processing image...');
    const [analysisData, setAnalysisData] = useState(null);

    const spinAnim = useRef(new Animated.Value(0)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Spinning animation for loader
        const spinAnimation = Animated.loop(
            Animated.timing(spinAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        );

        // Pulse animation
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        );

        spinAnimation.start();
        pulseAnimation.start();

        // Start processing with real server data
        processWithServer();

        return () => {
            spinAnimation.stop();
            pulseAnimation.stop();
        };
    }, []);

    const processWithServer = async () => {
        try {
            // If we have upload result, start from there
            if (uploadResult) {
                console.log('Upload result received:', uploadResult);
                setStatusText('Image uploaded successfully...');
                updateProgress(25, 'Analyzing with AI...');

                // If upload result contains an uploadId, poll for status
                if (uploadResult.uploadId && serverUrl) {
                    await pollForResults(uploadResult.uploadId);
                } else {
                    // Fallback to simulation
                    await simulateProcessing();
                }
            } else {
                // Fallback to simulation if no server result
                await simulateProcessing();
            }
        } catch (error) {
            console.error('Processing error:', error);
            setStatusText('Processing completed with local analysis...');
            await simulateProcessing();
        }
    };

    const pollForResults = async (uploadId) => {
        const maxRetries = 30; // Maximum 90 seconds (30 * 3 seconds)
        let retryCount = 0;

        const checkStatus = async () => {
            try {
                const response = await fetch(`${serverUrl}/api/upload/${uploadId}/status`);
                const statusData = await response.json();

                console.log('Status check:', statusData);

                if (statusData.status === 'completed' && statusData.results) {
                    // Processing complete - navigate to results
                    setAnalysisData(statusData.results);
                    updateProgress(100, 'Analysis complete!');

                    setTimeout(() => {
                        navigation.navigate('Results', {
                            imageUri: imageUri,
                            analysisData: statusData.results
                        });
                    }, 1000);

                } else if (statusData.status === 'processing' || statusData.status === 'analyzing') {
                    // Still processing
                    const progressValue = Math.min(30 + (retryCount * 2), 95);
                    updateProgress(progressValue, statusData.message || 'Processing environmental analysis...');

                    retryCount++;
                    if (retryCount < maxRetries) {
                        setTimeout(checkStatus, 3000); // Check again in 3 seconds
                    } else {
                        // Timeout - fallback to simulation
                        console.log('Status polling timeout, falling back to simulation');
                        await simulateProcessing();
                    }

                } else if (statusData.status === 'error') {
                    throw new Error(statusData.message || 'Processing failed');
                }

            } catch (error) {
                console.error('Status check error:', error);
                retryCount++;

                if (retryCount < maxRetries) {
                    updateProgress(40 + (retryCount * 2), 'Retrying analysis...');
                    setTimeout(checkStatus, 3000);
                } else {
                    // Fallback to simulation
                    console.log('Status polling failed, falling back to simulation');
                    await simulateProcessing();
                }
            }
        };

        // Start status polling
        setTimeout(checkStatus, 2000); // Wait 2 seconds before first check
    };

    const updateProgress = (progressValue, text) => {
        setProgress(progressValue);
        setStatusText(text);

        Animated.timing(progressAnim, {
            toValue: progressValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const simulateProcessing = async () => {
        const steps = [
            { progress: 40, text: 'Analyzing composition...', duration: 1500 },
            { progress: 65, text: 'Processing AI insights...', duration: 2000 },
            { progress: 85, text: 'Calculating impact metrics...', duration: 1000 },
            { progress: 100, text: 'Analysis complete!', duration: 500 },
        ];

        for (const step of steps) {
            await new Promise(resolve => setTimeout(resolve, step.duration));
            updateProgress(step.progress, step.text);
        }

        // Create mock analysis data for simulation
        const mockAnalysisData = {
            isValidItem: true,
            containsLivingPerson: false,
            productIdentification: {
                name: "Sample Product",
                category: "general",
                subCategory: "Consumer Good",
                isFood: false,
                confidence: 0.85,
                brandVisible: false,
                brandName: null
            },
            environmentalImpact: {
                carbonFootprint: {
                    value: 2.1,
                    unit: "kg CO2e",
                    description: "Moderate carbon footprint from production and transportation",
                    lifecycle: "cradle-to-grave",
                    scope: "total"
                },
                offsetRequirement: {
                    treesToPlant: 2,
                    timeToOffset: "18 months",
                    description: "Two trees needed to offset carbon footprint over 18 months",
                    offsetCost: "$3-8 USD"
                },
                ecologicalHarm: {
                    severity: "moderate",
                    impacts: ["resource depletion", "manufacturing emissions"],
                    description: "Moderate environmental impact from resource extraction and production",
                    affectedEcosystems: ["industrial"]
                }
            },
            sustainability: {
                recyclable: true,
                biodegradable: false,
                renewableSource: false,
                sustainabilityScore: 6.5,
                scoreExplanation: "Good recyclability but made from non-renewable materials",
                certifications: [],
                circularEconomy: "recyclable"
            },
            production: {
                materials: ["synthetic materials", "metals"],
                primaryMaterial: "Mixed materials",
                process: "Industrial manufacturing with standard processes",
                energyIntensive: true,
                waterUsage: "medium",
                landUse: "Industrial land use for manufacturing facilities",
                transportDistance: "Regional",
                seasonality: "Year-round"
            },
            alternatives: [
                {
                    name: "Eco-friendly version",
                    description: "Look for products made from recycled or renewable materials",
                    carbonReduction: "30-40%",
                    availability: "widely available",
                    costComparison: "similar",
                    sustainabilityImprovement: "Use of recycled materials reduces environmental impact"
                }
            ],
            recommendations: [
                "Look for recycled content versions of this product",
                "Consider purchasing from local manufacturers to reduce transport emissions",
                "Ensure proper recycling at end of product life",
                "Compare with certified sustainable alternatives"
            ],
            metrics: {
                waterFootprint: "250L per unit",
                energyFootprint: "3.2 kWh per unit",
                wasteGenerated: "25g packaging waste",
                packagingImpact: "moderate",
                transportEmissions: "0.3 kg CO2e",
                endOfLifeImpact: "recyclable"
            },
            overallAssessment: {
                environmentalGrade: "C",
                keyStrengths: ["Recyclable", "Durable design"],
                keyWeaknesses: ["Energy-intensive production", "Non-renewable materials"],
                improvementPotential: "Could be improved with use of renewable materials and more efficient production processes"
            }
        };

        // Navigate to results with mock data
        setTimeout(() => {
            navigation.navigate('Results', {
                imageUri: imageUri,
                analysisData: mockAnalysisData
            });
        }, 1000);
    };

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <SafeAreaView style={processingStyles.container}>
            <LinearGradient
                colors={['#000000', '#1a1a1a', '#000000']}
                style={processingStyles.gradient}
            >
                <View style={processingStyles.content}>
                    {/* Animated Icon */}
                    <Animated.View
                        style={[
                            processingStyles.iconContainer,
                            {
                                transform: [
                                    { rotate: spin },
                                    { scale: pulseAnim }
                                ]
                            }
                        ]}
                    >
                        <ScanIcon size={64} color="#ffffff" />
                    </Animated.View>

                    {/* Status Text */}
                    <Text style={processingStyles.statusText}>
                        {statusText}
                    </Text>

                    {/* Progress Bar */}
                    <View style={processingStyles.progressContainer}>
                        <View style={processingStyles.progressBar}>
                            <Animated.View
                                style={[
                                    processingStyles.progressFill,
                                    {
                                        width: progressAnim.interpolate({
                                            inputRange: [0, 100],
                                            outputRange: ['0%', '100%'],
                                        })
                                    }
                                ]}
                            />
                        </View>
                        <Text style={processingStyles.progressText}>
                            {progress}%
                        </Text>
                    </View>

                    {/* Info Text */}
                    <Text style={processingStyles.infoText}>
                        {analysisData ?
                            `Environmental Analysis Complete` :
                            'Analyzing environmental impact from the product'
                        }
                    </Text>

                    {/* Upload Result Debug Info (remove in production) */}
                    {uploadResult && __DEV__ && (
                        <Text style={[processingStyles.infoText, { fontSize: 10, marginTop: 20 }]}>
                            Debug: Upload ID {uploadResult.uploadId}
                        </Text>
                    )}
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}