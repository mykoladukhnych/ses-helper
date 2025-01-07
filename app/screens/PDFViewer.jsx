import { View, ActivityIndicator, StyleSheet, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import WebView from 'react-native-webview'
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PDFViewer = ({ route, navigation }) => {

    const { theme } = useSelector(state => state.theme);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.title, 
            headerRight: () => (
                <Pressable style={{marginRight: 15}} onPress={() => {navigation.replace("pdfviewer", {url: route.params.url, title: route.params.title})}} >
                    <MaterialCommunityIcons name="reload" size={24} color={theme.colors.text} />
                </Pressable>
            ),
        });
    },[navigation])

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