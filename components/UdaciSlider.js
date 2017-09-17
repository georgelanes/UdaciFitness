import React  from 'react';
import { Slider, View, Text, StyleSheet } from 'react-native';
import {white,gray, purple} from '../utils/colors'

//style section
const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        flex:1,
        alignItems:'center'
    },
    metricCounter:{
        width:85,
        justifyContent:'center',
        alignItems:'center'
    }
})


export default function UdaciSlider ({max, unit, step, value, onChange}) {
    return (
        <View style={styles.row}>
            <Slider style={{flex:1}}
                onValueChange={onChange}
                maximumValue={max}
                minimumValue={0}
                step={step} 
                value={value} />
            <View style={styles.metricCounter}>
                <Text style={{fontSize:24}}>
                    {value}
                </Text>
                <Text style={{fontSize:18, color:gray}}>
                    {unit}
                </Text>
            </View>
        </View>
    )
}