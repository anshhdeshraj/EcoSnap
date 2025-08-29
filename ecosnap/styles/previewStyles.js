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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    headerButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '600',
        letterSpacing: 1,
    },
    imageContainer: {
        flex: 1,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
    },
    imageGradient: {
        flex: 1,
    },
    actionsContainer: {
        backgroundColor: '#000000',
        paddingTop: 24,
        paddingBottom: 40,
        paddingHorizontal: 32,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    retakeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: '#ffffff20',
        borderRadius: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    retakeButtonText: {
        color: '#ffffff80',
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 8,
    },
    uploadButton: {
        borderRadius: 28,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        marginLeft:5
    },
    uploadButtonDisabled: {
        elevation: 0,
        shadowOpacity: 0,
    },
    uploadButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    uploadButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        marginLeft: 8,
    },
    uploadButtonTextDisabled: {
        color: '#ffffff80',
    },
    infoText: {
        fontSize: 14,
        color: '#ffffff60',
        textAlign: 'center',
        fontWeight: '300',
        lineHeight: 20,
    },
});