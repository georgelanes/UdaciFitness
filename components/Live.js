import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons, Foundation } from '@expo/vector-icons'
import {connect} from 'react-redux'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'
import {submitEntry, removeEntry} from '../utils/api';
import {white, purple} from '../utils/colors'
import { Location, Permissions } from 'expo'
import { calculateDirection } from '../utils/helpers'



//styles
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between'
    },
    center:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        marginLeft:30,
        marginRight:30
    },
    button:{
        padding:10,
        backgroundColor:purple,
        alignSelf:'center',
        borderRadius:5,
        margin:20
    },
    buttonText:{
        color:white,
        fontSize:20
    },
    directionContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    header: {
      fontSize: 35,
      textAlign: 'center',
    },
    direction: {
      color: purple,
      fontSize: 120,
      textAlign: 'center',
    },
    metricContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: purple,
    },
    metric: {
      flex: 1,
      paddingTop: 15,
      paddingBottom: 15,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 10,
      marginRight: 10,
    },
    subHeader: {
      fontSize: 25,
      textAlign: 'center',
      marginTop: 5,
    }
})

export default class Live extends Component {
    state = {
        coords:{
            "accuracy": 0,
            "altitude": 0,
            "altitudeAccuracy": 0,
            "heading": 0,
            "latitude": 0,
            "longitude": 0,
            "speed": 0,        
        },
        status:'granted',
        direction:''
    }
    
    
    componentDidMount() {
        Permissions.getAsync(Permissions.LOCATION)
            .then(({status})=>{
                if(status === 'granted') {
                    return this.setLocation()
                }

                this.setState(()=>({status}))

            })
            .catch((error)=>{
                console.warn('Erro getting Location permissions: ', error)

                this.setState(()=> ({status:'undetermined'}))
            })
    }
    

    askPermission= () => {
        Permissions.askAsync(Permissions.LOCATION)
        .then(({status})=>{
            if(status === 'granted') {
                return this.setLocation()
            }

            this.setState(()=>({status}))

        })
        .catch((error)=>{
            console.warn('Erro asking Location permissions: ', error)
        })
    }

    setLocation = ()=> {
        Location.watchPositionAsync({
            enableHighAccuracy:true,
            timeInterval:1,
            distanceInterval:1
        }, ({coords})=>{

            //console.log("coords: ", coords)

            const newDirection = calculateDirection(coords.heading)
            const { direction } = this.state

            this.setState(()=>({
                coords,
                status:'granted',
                direction:newDirection
            }))
        })
    }


    render () {

        const  {coords, status, direction} = this.state

        console.log(this.state)

        if(status === null) {
            return <ActivityIndicator style={{marginTop:30}} />
        }
        if(status === 'denied'){
            return (
                <View style={styles.center}>
                    <Foundation  name='alert' size={50}/>
                    <Text>You denied your location. Enable this services on the settings on you device.</Text>
                </View>
            )
        }

        if(status === 'undetermined'){
            return (
                <View style={styles.center}>
                    <Foundation  name='alert' size={50}/>
                    <Text>
                        You need to enable location services for this app
                    </Text>
                    <TouchableOpacity onPress={this.askPermission} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Enable
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.directionContainer}>
                    <Text style={styles.header}>You're heading</Text>
                    <Text style={styles.direction}>{direction}</Text>
                </View>
                <View style={styles.metricContainer}>
                    <View  style={styles.metric}>
                        <Text style={[styles.header,{color:white}]}>Altitude</Text>
                        <Text style={[styles.subHeader,{color:white}]}>{Math.round(coords.altitude * 3.2808)} Feer</Text>
                    </View>

                    <View  style={styles.metric}>
                        <Text style={[styles.header,{color:white}]}>Speed</Text>
                        <Text style={[styles.subHeader,{color:white}]}>{(coords.speed * 2.2369).toFixed(1)} MPH</Text>
                    </View>
                </View>

            </View>
        )


    }
}