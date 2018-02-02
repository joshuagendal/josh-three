import React, {Component,PropTypes} from 'react'


import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import * as firebase from 'firebase';
require("firebase/firestore");




class GoogleMapWraper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value:props.value,
    };
    this.handleChange=this.handleChange.bind(this);
    this.onDragEnd=this.onDragEnd.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(event.target.value);
    this.props.updateAction(this.props.theKey,event.target.value);
  }

  onDragEnd(event){
    console.log(event);
    console.log(event.latLng.lat())
    var updLocation=new firebase.app.firestore.GeoPoint(event.latLng.lat(), event.latLng.lng());
    this.props.updateAction(this.props.theKey,updLocation);
  }

  render() {
    var location={
      lat:this.state.value._lat,
      lng:this.state.value._long,

    }
    const MyMapComponent = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap defaultZoom={8} defaultCenter={location}>
         <Marker draggable position={location} onDragEnd={this.onDragEnd}></Marker>
      </GoogleMap>
    )

    return (
            <div className="form-group label-floating is-empty">
                <label className="control-label">MAPA</label>
                <MyMapComponent isMarkerShown />
            </div>
    )
  }
}
export default GoogleMapWraper;
