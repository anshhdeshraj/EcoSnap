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
        paddingHorizontal: 32,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        paddingTop: height * 0.08,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    logoText: {
        fontSize: 32,
        fontWeight: '900',
        color: '#ffffff',
        letterSpacing: 2,
        marginLeft: 12,
    },
    tagline: {
        fontSize: 16,
        color: '#ffffff80',
        fontWeight: '500',
        letterSpacing: 1,
    },
    actionArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    actionButtons: {
        width: '100%',
        alignItems: 'center',
    },
    primaryButton: {
        width: width - 64,
        height: 64,
        borderRadius: 32,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    buttonGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
        marginLeft: 12,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 32,
        width: '60%',
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ffffff20',
    },
    dividerText: {
        color: '#ffffff60',
        fontSize: 14,
        fontWeight: '300',
        marginHorizontal: 20,
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderWidth: .5,
        borderColor: '#ffffff30',
        borderRadius: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    secondaryButtonText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '400',
        marginLeft: 8,
    },
    footer: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    footerText: {
        fontSize: 8,
        color: '#ffffff60',
        textAlign: 'center',
        fontWeight: '300',
    },
});
