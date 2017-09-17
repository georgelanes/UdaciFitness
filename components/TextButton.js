import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {white,gray, purple} from '../utils/colors'

//style section
const styles = StyleSheet.create({
    reset:{
        textAlign:'center',
        color:purple
    }
})

export default function TextButton ({children, onPress, style={}}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.reset, style]}> {children} </Text>
        </TouchableOpacity>
    )
}