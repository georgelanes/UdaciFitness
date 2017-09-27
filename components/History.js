import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import UdactiFitnesssCalendar from 'udacifitness-calendar'
import {connect} from 'react-redux'

import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'

import { Ionicons } from '@expo/vector-icons'
import  { addEntry, receiveEntries } from '../actions'
import { fetchCalendarResults } from '../utils/api'
import {white, purple} from '../utils/colors'
import DateHeader from './DateHeader'
import MetricCard from './MetricCard'
import {AppLoading} from 'expo'

//styles section
const styles = StyleSheet.create({
    item:{
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 8 : 2,
        padding:20,
        marginLeft:10,
        marginRight:10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius:3,
        shadowOpacity:0.8,
        shadowColor:'rgba(0,0,0,0.24)',
        shadowOffset:{
            height:3,
            width:0
        }
    },
    noDataText:{
        fontSize:20,
        paddingTop:20,
        paddingBottom:20
    }
})

class History extends Component {

    state = {
        ready: false
    }

    componentDidMount() {
        const { dispatch } = this.props

        fetchCalendarResults()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(({entries}) => {
                if (!entries[timeToString]){
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderValue()
                    }))
                }
            })
            .then(()=> this.setState(()=>({
                ready:true
            })))
    }
    
    renderItem = ({today, ...metrics}, formattedDate, key) => (
        <View style={styles.item}>
            {today
            ?   <View>
                    <DateHeader date={formattedDate} />
                    <Text styes={styles.noDataText}>
                        {today}
                    </Text>
                </View>
            : 
                <TouchableOpacity onPress={()=> this.props.navigation.navigate(
                    'EntryDetail', {entryId: key}
                )}>
                    <MetricCard metrics={metrics} date={formattedDate} />
                </TouchableOpacity>
            }
        </View>
    )

    

    renderEmptyDate (formattedDate) {
        return (
            <View style={styles.item}>
                <DateHeader date={formattedDate} />
                <Text style={styles.noDataText}>
                    You didn`t log any data on this day.
                </Text>
            </View>
        )
    }

    render() {
        
        const {entries} = this.props
        const {ready} = this.state

        if(ready === false ){
            <AppLoading />
        }

        return (
            <UdactiFitnesssCalendar 
                items={entries} 
                renderItem={this.renderItem} 
                renderEmptyDate={this.renderEmptyDate} 
            />
        )
    }
}

function mapStateToProps(entries)
{
    return {entries}
}
export default connect(mapStateToProps)(History)
