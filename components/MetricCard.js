import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import UdactiFitnesssCalendar from 'udacifitness-calendar'
import {connect} from 'react-redux'

import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'

import { Ionicons } from '@expo/vector-icons'
import  { addEntry, receiveEntries } from '../actions'
import { fetchCalendarResults } from '../utils/api'
import {white, purple, gray} from '../utils/colors'
import DateHeader from './DateHeader'

//styles section
const styles = StyleSheet.create({
    metric:{
        flexDirection:'row',
        marginTop:12,

    }
})


export default function MetricCard({date, metrics}){
    return (
        <View>
            { date && <DateHeader date={date}/> }
            {Object.keys(metrics).map((metric) =>{
                const { getIcon, displayName, unit, backgroundColor } = getMetricMetaInfo(metric)
                return (
                    <View style={styles.metric} key={metric}>
                        {getIcon()}
                        <View>
                            <Text style={{fontSize:20}}>
                                {displayName}
                            </Text>
                            <Text style={{fontSize:16, color:gray}}>
                                {metrics[metric]}{unit}
                            </Text>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}