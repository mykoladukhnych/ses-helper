import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/Card';
import Accordion from '../components/Accordion';

const EPDetailsScreen = () => {
    const data = useSelector(state => state.services.data.easypro.description);
    const { theme, currentTheme } = useSelector(state => state.theme);
    const renderItems = [];

    const keys = Object.keys(data).reverse();

    keys.forEach(key => {
        renderItems.push(
            <View>
                <Card 
                    data={{
                        left: <Text style={{fontSize: 16, fontWeight: 700, color: theme.colors.text}}>{data[key].title}</Text>
                    }}
                />
                <View style={{padding: 15, backgroundColor: currentTheme === 'dark' ? theme.colors.cardChild : theme.colors.border,}}>
                    {
                        data[key].descr.map((el, i) => <Text style={{fontSize: 14, fontWeight: 400, color: theme.colors.text, marginVertical: 5}} key={i} >{el}</Text>)
                    }
                </View>
            </View>
        )
    })

    return (
        <View style={{paddingTop: 10}}>
            {
                renderItems
            }
        </View>
    )
}

export default EPDetailsScreen