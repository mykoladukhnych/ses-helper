import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useSelector } from 'react-redux';

const Accordion = ({ header={left: null, right: null}, content=null }) => {
    const [collapsed, setCollapsed] = useState(true);
    const { currentTheme, theme } = useSelector(state => state.theme);

    const toggleAccordion = () => {
        setCollapsed(!collapsed);
    }; 

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
        }}>
            <TouchableOpacity style={styles.titleContainer} onPress={toggleAccordion}>
                { header.left || null } 
                { header.right || null }
            </TouchableOpacity>
            <Collapsible style={{
                ...styles.content,
                backgroundColor: currentTheme === 'dark' ? theme.colors.cardChild : theme.colors.border,
            }} collapsed={collapsed}>
                { content }
            </Collapsible>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        overflow: 'hidden',
    },
    titleContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    content: {
        padding: 20,
        position: 'relative',

    },
    descrPrice: {
		position: 'absolute',
		top: 0,
		right: 0,
		padding: 15,
		backgroundColor: '#3b48f7',
		fontSize: 15,
		fontWeight: '900',
		color: '#fff',
		borderBottomLeftRadius: 5
	}    
});

export default Accordion;
