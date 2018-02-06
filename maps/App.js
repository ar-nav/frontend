import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  PermissionsAndroid,
  Text,
  View,
} from 'react-native'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'

type Props = {}

export default class App extends Component<Props> {
  constructor() {
    super()
    this.state = {
      latitude: 10,
      longitude: 0.4,
      error: null,
    }
  }

  requestLocationPermission = () => {
    console.log('starting')
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Activeev needs to access your location.',
      }
    )
      .then(result => {
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location Permitted')
          navigator.geolocation.getCurrentPosition(
            success => {
              console.log('ini sedang di get current',success)
              this.setState({
                latitude: success.coords.latitude,
                longitude: success.coords.longitude,
                error: null,
              });
            },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 20000}
          )
        } else {
          console.log('Location permission denied')
        }
      })
      .catch(err => {
        console.log(err)
      })
    console.log('end', this.state)
  }

  componentDidMount() {
    this.requestLocationPermission()
  }

  onRegionChange(region) {
    this.setState({ region })
  }

  render() {
    return (
      <MapView style={styles.map} initialRegion={{
       latitude:this.state.latitude,
       longitude:this.state.longitude,
       latitudeDelta: 0.0010,
       longitudeDelta: 0.0020,
      }}>

        <Marker
        coordinate={this.state}
        >
        </Marker>
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    // position: 'absolute',
    height: 340,
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

// const styles = StyleSheet.create({
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: 400,
//     width: 400,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });
