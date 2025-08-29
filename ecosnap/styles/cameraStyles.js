import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    content: {
        flex: 1,
    },
    camera: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        paddingHorizontal: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingBottom:10
    },
    headerButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 12,
    },
    centerGuide: {
        position: 'absolute',
        top: '44%',
        left: '50%',
        transform: [{ translateX: -120 }, { translateY: -120 }],
        alignItems: 'center',
        justifyContent: 'center',
    },
    guideBorder: {
        width: 240,
        height: 240,
        borderWidth: 2,
        borderColor: 'rgba(11, 222, 29, 0.5)',
        borderRadius: 12,
        borderStyle: 'dashed',
    },
    guideText: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: '300',
        marginTop: 16,
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 28,
    },
    bottom: {
        paddingBottom: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    captureContainer: {
        alignItems: 'center',
    },
    captureButtonOuter: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20

    },
    captureButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    permissionText: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 24,
        fontWeight: '300',
    },
    permissionButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#ffffff20',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#ffffff30',
    },
    permissionButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '400',
    },
});