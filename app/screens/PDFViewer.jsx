import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const PDFViewer = ({ route }) => {
    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: `https://docs.google.com/viewer?url=${encodeURIComponent(route.params.url)}&embedded=true` }}
                style={styles.webview}
                javaScriptEnabled={true} 
                domStorageEnabled={true} 
                originWhitelist={['*']}
                renderLoading={() => (
                    <View style={styles.spinnerContainer}>
                      <ActivityIndicator size="large" color="#007AFF" />
                    </View>
                )}
                startInLoadingState={true}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.error('WebView error: ', nativeEvent);
                }}
                onHttpError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.error('HTTP error: ', nativeEvent.statusCode);
                }}
            />
        </View>
    )
}

export default PDFViewer

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    spinnerContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Легка прозорість для фону
    },
})