import React  from 'react';
import { Slider, View, Text } from 'react-native';


export default function UdaciSlider ({max, unit, step, value, onChange}) {
    return (
        <View>
            <Slider 
                onValueChange={onChange}
                maximumValue={max}
                minimumValue={0}
                step={step} 
                value={value} />
            <View>
                <Text>
                    {value}
                </Text>
                <Text>
                    {unit}
                </Text>
            </View>
        </View>
    )
}