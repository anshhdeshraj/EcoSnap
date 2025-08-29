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
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    iconContainer: {
        marginBottom: 40,
        padding: 24,
        borderRadius: 50,
       
    },
    statusText: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '300',
        marginBottom: 32,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    progressContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 24,
    },
    progressBar: {
        width: '80%',
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 12,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 2,
    },
    progressText: {
        fontSize: 14,
        color: '#ffffff80',
        fontWeight: '300',
    },
    infoText: {
        fontSize: 16,
        color: '#ffffff60',
        textAlign: 'center',
        fontWeight: '300',
        marginTop: 24,
        lineHeight: 24,
    },
});