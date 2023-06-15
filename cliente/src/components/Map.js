import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'

const Map = () => {
  return (
        <GoogleMap
            defaultCenter={{lat: -33.68909, lng: -71.21528}}
            defaultZoom={10}
        />
  )
}
export default withScriptjs(
    withGoogleMap(
        Map
    )
)