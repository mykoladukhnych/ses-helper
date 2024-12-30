import { Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Card from '../components/Card';
import { useSelector } from 'react-redux';

const DynamicScreen = ({route, navigation}) => {
    const data = route.params;
    const {theme} = useSelector(state => state.theme)

    return (
        <ScrollView style={styles.container}>
            {
                data.data.map((item, i) => {
                    return (
                        <Card 
                            data={{
                                left: <Text style={{ ...styles.cardTitle, color: theme.colors.text }}>{item.title}</Text>
                            }}
                            onPress={() => {
                                item.url ? 
                                    navigation.navigate('pdfviewer', {url: item.url})
                                : navigation.push('Dynamic', {screenName: item.title, data: item.list})
                            }}
                            key={i}
                        />
                    )
                })
            }
        </ScrollView>
    )
}

export default DynamicScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardTitle: {
        fontSize: 16, 
        fontWeight: 600, 
    }
})