import React from 'react';
import Svg, {
    Path,
    Circle,
    Rect,
    G,
    Defs,
    LinearGradient,
    Stop
} from 'react-native-svg';

// Existing icons from your original file
export const CameraIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            fill={color}
        />
    </Svg>
);

export const GalleryIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
            fill={color}
        />
    </Svg>
);

export const ScanIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <G>
            <Path d="M2 6V4c0-1.1.9-2 2-2h2v2H4v2H2z" fill={color} />
            <Path d="M2 18v2c0 1.1.9 2 2 2h2v-2H4v-2H2z" fill={color} />
            <Path d="M22 18v2c0 1.1-.9 2-2 2h-2v-2h2v-2h2z" fill={color} />
            <Path d="M22 6V4c0-1.1-.9-2-2-2h-2v2h2v2h2z" fill={color} />
            <Path d="M7 12h10v-1H7v1z" fill={color} />
        </G>
    </Svg>
);

export const CloseIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            fill={color}
        />
    </Svg>
);

export const CaptureIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" fill={color} />
        <Circle cx="12" cy="12" r="6" fill="none" stroke="#ffffff" strokeWidth="2" />
    </Svg>
);

export const FlipIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <G>
            <Rect x="4" y="8" width="16" height="10" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
            <Circle cx="12" cy="13" r="2.5" fill="none" stroke={color} strokeWidth="1.5" />
            <Rect x="6" y="6" width="2" height="2" rx="0.5" fill={color} />
            <Path
                d="M16 4.5C17.38 4.5 18.5 5.62 18.5 7V8"
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <Path
                d="M17 6L18.5 4.5L20 6"
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M8 19.5C6.62 19.5 5.5 18.38 5.5 17V16"
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <Path
                d="M7 18L5.5 19.5L4 18"
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
    </Svg>
);

export const FlashIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M7 2v11h3v9l7-12h-4l4-8z"
            fill={color}
        />
    </Svg>
);

export const CheckIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
            fill={color}
        />
    </Svg>
);

export const RetakeIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
            fill={color}
        />
    </Svg>
);

export const ShareIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"
            fill={color}
        />
    </Svg>
);

export const ChevronDownIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
            fill={color}
        />
    </Svg>
);

export const ChevronUpIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
            fill={color}
        />
    </Svg>
);

export const LeafIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.23 18.05 9 13 17 12V8z"
            fill={color}
        />
        <Path
            d="M17 3c-3.87 0-7 3.13-7 7 0 1.84.71 3.53 1.87 4.79C12.57 13.59 14.63 13 17 13c3.87 0 7-3.13 7-7s-3.13-7-7-7z"
            fill={color}
        />
    </Svg>
);

export const AlertTriangleIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
            fill={color}
        />
    </Svg>
);

export const InfoIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
            fill={color}
        />
    </Svg>
);

export const TreeIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M10 21v-4H7v-2h3v-2H5v-2h5V9H4V7h6V3h4v4h6v2h-6v2h5v2h-5v2h3v2h-3v4z"
            fill={color}
        />
    </Svg>
);

export const RecycleIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M5.77 7.15L7.2 4.78l1.03-1.71c.39-.65 1.33-.65 1.72 0l1.48 2.46h-1.23L8.5 3.67L5.77 7.15z"
            fill={color}
        />
        <Path
            d="M12 5.83l1.88 3.13c.39.65 1.33.65 1.72 0l1.88-3.13h1.23l-1.48 2.46c-.39.65-1.33.65-1.72 0L12.73 5.15L12 5.83z"
            fill={color}
        />
        <Path
            d="M19.43 16.85L18 19.22l-1.03 1.71c-.39.65-1.33.65-1.72 0l-1.48-2.46h1.23l1.7 1.86 2.73-3.48z"
            fill={color}
        />
        <Path
            d="M7 15.31l1.75 2.91c.48.8.48 1.78 0 2.58L7 23.31l-1.75-2.51c-.48-.8-.48-1.78 0-2.58L7 15.31z"
            fill={color}
        />
    </Svg>
);

// NEW ENHANCED VISUAL ICONS FOR THE ENHANCED UI

// Animated Gauge/Speedometer Icon
export const GaugeIcon = ({ size = 24, color = "#000000", fillColor = "#00E676" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Defs>
            <LinearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <Stop offset="100%" stopColor={fillColor} stopOpacity="1" />
            </LinearGradient>
        </Defs>
        <Path
            d="M12 4C7.58 4 4 7.58 4 12c0 2.21.9 4.21 2.35 5.65L8 16c-.83-.83-1.33-1.97-1.33-3.23 0-2.53 2.05-4.58 4.58-4.58s4.58 2.05 4.58 4.58c0 1.26-.5 2.4-1.33 3.23l1.65 1.65C17.1 16.21 18 14.21 18 12c0-4.42-3.58-8-8-8z"
            fill="url(#gaugeGradient)"
        />
        <Path
            d="M12 9c-.55 0-1 .45-1 1v6l4.25-2.35c.31-.17.42-.56.25-.87-.17-.31-.56-.42-.87-.25L13 13.58V10c0-.55-.45-1-1-1z"
            fill={fillColor}
        />
        <Circle cx="12" cy="12" r="2" fill={fillColor} />
    </Svg>
);

// Environmental Impact Meter
export const ImpactMeterIcon = ({ size = 24, color = "#000000", severity = "low" }) => {
    const severityColor = severity === 'low' ? '#00E676' :
        severity === 'moderate' ? '#FFC107' :
            severity === 'high' ? '#FF9800' : '#FF5722';

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />
            <Circle cx="12" cy="12" r="7" fill="none" stroke={severityColor} strokeWidth="2" />
            <Circle cx="12" cy="12" r="4" fill={severityColor} opacity="0.3" />
            <Circle cx="12" cy="12" r="2" fill={severityColor} />
            <Path
                d="M12 2v4M12 18v4M2 12h4M18 12h4"
                stroke={color}
                strokeWidth="1"
                strokeOpacity="0.5"
            />
        </Svg>
    );
};

// Carbon Footprint Icon with Visual Impact
export const CarbonIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 3c-1.1 0-2 .9-2 2 0 .74.4 1.38 1 1.73V9h-1c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h1v2.27c-.6.35-1 .99-1 1.73 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.73V13h1c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1h-1V6.73c.6-.35 1-.99 1-1.73 0-1.1-.9-2-2-2z"
            fill={color}
            opacity="0.7"
        />
        <Circle cx="8" cy="6" r="1.5" fill={color} opacity="0.4" />
        <Circle cx="16" cy="6" r="1" fill={color} opacity="0.3" />
        <Circle cx="6" cy="18" r="1" fill={color} opacity="0.3" />
        <Circle cx="18" cy="18" r="1.5" fill={color} opacity="0.4" />
        <Path
            d="M7 10c0-1 1-2 2-2M17 14c0 1-1 2-2 2"
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.5"
        />
    </Svg>
);

// Sustainability Score Circular Icon
export const SustainabilityIcon = ({ size = 24, color = "#000000", progress = 0.7 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeOpacity="0.2"
        />
        <Circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke="#00E676"
            strokeWidth="2"
            strokeDasharray={`${progress * 56.5} 56.5`}
            strokeDashoffset="14.125"
            transform="rotate(-90 12 12)"
        />
        <LeafIcon size={12} color="#00E676" />
    </Svg>
);

// Production Impact Icon
export const ProductionIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect x="2" y="12" width="20" height="8" rx="2" fill={color} opacity="0.7" />
        <Rect x="6" y="8" width="3" height="4" fill={color} />
        <Rect x="15" y="6" width="3" height="6" fill={color} />
        <Rect x="10" y="4" width="4" height="8" fill={color} />
        <Circle cx="7.5" cy="6" r="1" fill={color} opacity="0.5" />
        <Circle cx="12" cy="2" r="1" fill={color} opacity="0.5" />
        <Circle cx="16.5" cy="4" r="1" fill={color} opacity="0.5" />
        <Path
            d="M4 16h2M18 16h2M8 16h8"
            stroke="#ffffff"
            strokeWidth="1"
            strokeOpacity="0.6"
        />
    </Svg>
);

// Water Usage Icon with Levels
export const WaterIcon = ({ size = 24, color = "#000000", level = "moderate" }) => {
    const fillHeight = level === 'low' ? 6 : level === 'moderate' ? 10 : 14;
    const fillColor = level === 'low' ? '#00E676' : level === 'moderate' ? '#FFC107' : '#FF5722';

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M12 2l-8 8v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10l-8-8z"
                fill="none"
                stroke={color}
                strokeWidth="1.5"
            />
            <Rect
                x="5"
                y={20 - fillHeight}
                width="14"
                height={fillHeight}
                fill={fillColor}
                opacity="0.6"
            />
            <Path
                d="M8 14c0-2 2-3 4-3s4 1 4 3"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                strokeOpacity="0.7"
            />
        </Svg>
    );
};

// Energy Intensity Icon
export const EnergyIcon = ({ size = 24, color = "#000000", intensity = "moderate" }) => {
    const bars = intensity === 'low' ? 1 : intensity === 'moderate' ? 2 : 3;
    const energyColor = intensity === 'low' ? '#00E676' : intensity === 'moderate' ? '#FFC107' : '#FF5722';

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M13 2L3 14h5l-1 8 10-12h-5l1-8z"
                fill={energyColor}
                opacity="0.8"
            />
            <Rect x="18" y="16" width="2" height="2" fill={bars >= 1 ? energyColor : color} opacity={bars >= 1 ? 1 : 0.3} />
            <Rect x="18" y="13" width="2" height="2" fill={bars >= 2 ? energyColor : color} opacity={bars >= 2 ? 1 : 0.3} />
            <Rect x="18" y="10" width="2" height="2" fill={bars >= 3 ? energyColor : color} opacity={bars >= 3 ? 1 : 0.3} />
        </Svg>
    );
};

// Biodegradable Icon
export const BiodegradableIcon = ({ size = 24, color = "#000000", isBiodegradable = true }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke={isBiodegradable ? '#00E676' : '#FF5722'}
            strokeWidth="2"
            strokeDasharray="4 2"
        />
        <Path
            d="M8 12l2 2 4-4"
            stroke={isBiodegradable ? '#00E676' : '#FF5722'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={isBiodegradable ? 1 : 0.3}
        />
        <LeafIcon size={16} color={isBiodegradable ? '#00E676' : '#FF5722'} />
    </Svg>
);

// Organic Status Icon
export const OrganicIcon = ({ size = 24, color = "#000000", isOrganic = true }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke={isOrganic ? '#4CAF50' : '#FF9800'}
            strokeWidth="2"
        />
        <Path
            d="M8 8c2-2 6-2 8 0s2 6 0 8-6 2-8 0-2-6 0-8z"
            fill={isOrganic ? '#4CAF50' : '#FF9800'}
            opacity="0.2"
        />
        <Path
            d="M10 10c1-1 3-1 4 0s1 3 0 4-3 1-4 0-1-3 0-4z"
            fill={isOrganic ? '#4CAF50' : '#FF9800'}
            opacity="0.4"
        />
        <Circle cx="12" cy="12" r="2" fill={isOrganic ? '#4CAF50' : '#FF9800'} />
    </Svg>
);

// Alternative Product Icon
export const AlternativeIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 2L2 7l10 5 10-5-10-5z"
            fill={color}
            opacity="0.7"
        />
        <Path
            d="M2 17l10 5 10-5M2 12l10 5 10-5"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Circle cx="6" cy="9" r="1" fill="#00E676" />
        <Circle cx="12" cy="7" r="1" fill="#00E676" />
        <Circle cx="18" cy="9" r="1" fill="#00E676" />
    </Svg>
);

// Recommendation Icon
export const RecommendationIcon = ({ size = 24, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#FFC107"
            stroke="#FFC107"
            strokeWidth="1"
        />
        <Path
            d="M12 6v8l-3 2"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </Svg>
);