import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useSelector } from 'react-redux';

const Accordion = ({ 
    header={
        left: null, 
        right: null,
    },
    content={
        corners: {
            topLeft: null,
            topRight: null,
            bottomLeft: null,
            bottomRight: null
        },
        data: null
    },
    style={
        container: {},
        titleContainer: {},
        content: {}
    }
}) => {
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
            ...style.container
        }}>
            <TouchableOpacity style={{...styles.titleContainer, ...style.titleContainer}} onPress={toggleAccordion}>
                { header.left || null } 
                { header.right || null }
            </TouchableOpacity>
            <Collapsible style={{
                ...styles.content,
                backgroundColor: currentTheme === 'dark' ? theme.colors.cardChild : theme.colors.border,
                ...style.content
            }} collapsed={collapsed}>
                { content.corners.topLeft ? <Text style={{...styles.contentCorners, ...styles.topLeft, }}>{content.corners.topLeft}</Text> : null }
                { content.corners.topRight ? <Text style={{...styles.contentCorners, ...styles.topRight, }}>{content.corners.topRight}</Text> : null }
                { content.corners.bottomLeft ? <Text style={{...styles.contentCorners, ...styles.bottomLeft, }}>{content.corners.bottomLeft}</Text> : null }
                { content.corners.bottomRight ? <Text style={{...styles.contentCorners, ...styles.bottomRight, }}>{content.corners.bottomRight}</Text> : null }
                { content.data ? content.data : null }
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
    contentCorners: {
		position: 'absolute',
        paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: '#3b48f7',
		fontSize: 15,
		fontWeight: '900',
		color: '#fff',
		borderBottomLeftRadius: 5
	},
    topLeft: {
        top: 0,
		left: 0,
    },
    topRight: {
        top: 0,
		right: 0,
    },
    bottomLeft: {
        bottom: 0,
		left: 0,
    },
    bottomRight: {
        bottom: 0,
		right: 0,
    },
});

export default Accordion;
