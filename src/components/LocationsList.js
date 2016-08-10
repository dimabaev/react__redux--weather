import React, { Component, PropTypes } from 'react'
import Location from './Location'

class LocationsList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let locations = this.props.locations.map((location, id) =>
      <Location 
        key = {id} id = {id}
        {...location}
        {...this.props.actions}
      />
    )
    return (
      <div>
        {locations}
      </div>
    )
  }
}

LocationsList.propTypes = {
  locations: PropTypes.array.isRequired
}

export default LocationsList