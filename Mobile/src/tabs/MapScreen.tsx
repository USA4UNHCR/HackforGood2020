import * as React from 'react';
import Geolocation from "@react-native-community/geolocation";
import { Text, View, StyleSheet } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import { Component } from 'react';

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})

class MapScreen extends Component {
    state = {
        mapRegion: null,
        lastLat: null,
        lastLong: null,
    }
    
    componentDidMount() {
    this.watchID = Geolocation.watchPosition((position) => {
        // Create the object to update this.state.mapRegion through the onRegionChange function
        let region = {
            latitude:       position.coords.latitude,
            longitude:      position.coords.longitude,
            latitudeDelta:  0.00922*1.5,
            longitudeDelta: 0.00421*1.5
        }
        this.onRegionChange(region, region.latitude, region.longitude);
    }, (error)=>console.log(error));
    }

    onRegionChange(region, lastLat, lastLong) {
    this.setState({
        mapRegion: region,
        // If there are no new values set the current ones
        lastLat: lastLat || this.state.lastLat,
        lastLong: lastLong || this.state.lastLong
    });
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID);
    }

    onMapPress(e) {
    console.log(e.nativeEvent.coordinate.longitude);
    let region = {
        latitude:       e.nativeEvent.coordinate.latitude,
        longitude:      e.nativeEvent.coordinate.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
    }
    this.onRegionChange(region, region.latitude, region.longitude);
    }

    renderScreen = () => {
        return (
        <View style={{flex: 1}}>
        <MapView
            style={styles.map}
            region={this.state.mapRegion}
            showsUserLocation={true}
            followUserLocation={true}
            onRegionChange={this.onRegionChange.bind(this)}>
            <MapView.Marker
            coordinate={{
                latitude: (this.state.lastLat + 0.00050) || -36.82339,
                longitude: (this.state.lastLong + 0.00050) || -73.03569,
            }}>
            <View>
                <Text style={{color: '#000'}}>
                { this.state.lastLong } / { this.state.lastLat }
                </Text>
            </View>
            </MapView.Marker>
        </MapView>
        </View>
        );
    }
    
    render() {
        return (
            this.renderScreen()
        );
    }
}
export default MapScreen;
