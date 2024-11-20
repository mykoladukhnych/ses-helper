import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { MyDarkTheme, MyLightTheme } from '../theme/theme';

const Accordion = ({ data, value=0 }) => {
    const [collapsed, setCollapsed] = useState(true);
    const theme = useColorScheme();

    const toggleAccordion = () => {
        setCollapsed(!collapsed);
    };

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme === 'dark' ? MyDarkTheme.colors.card : MyLightTheme.colors.card,
            borderColor: theme === 'dark' ? MyDarkTheme.colors.border : MyLightTheme.colors.border,
        }}>
            <TouchableOpacity style={styles.titleContainer} onPress={toggleAccordion}>
                <Text style={{
                    ...styles.titleText,
                    color: theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text,
                }}>{data.title}</Text>
                <Text style={{
                    ...styles.titlePrice,
                    color: theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text,
                }}>{ (data.price * value).toFixed(2) }</Text>
            </TouchableOpacity>
            <Collapsible style={{
                ...styles.content,
                backgroundColor: theme === 'dark' ? MyDarkTheme.colors.cardChild : MyLightTheme.colors.border,
            }} collapsed={collapsed}>
                <View>
                    <Text style={styles.descrPrice}>{data.price * 100}%</Text>
                    {
                        data.descr.map((item, i) => <Text style={{...styles.contentText, color: theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text}} key={i}>{item}</Text>)
                    }
                </View>
            </Collapsible>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        overflow: 'hidden',
    },
    titleContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 16,
        fontWeight: '700'
    },
    titlePrice: {
        fontSize: 16,
        fontWeight: '700'
    },
    content: {
        padding: 20,
        position: 'relative'
    },
    descrPrice: {
		position: 'absolute',
		top: -20,
		right: -20,
		padding: 15,
		backgroundColor: '#3b48f7',
		fontSize: 15,
		fontWeight: '900',
		color: '#fff',
		borderBottomLeftRadius: 5
	},
    contentText: {
        fontSize: 14,
        fontWeight: '500',
		marginTop: 15,
    }
});

export default Accordion;
