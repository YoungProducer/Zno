import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const Previous = (props) => {

    return (
        <div
            style={{
                position: "absolute",
                cursor: 'pointer',
                top: 30,
                left: 100
            }}

            onClick={
                // () => { props.onGoToPreviousPage(), props.onUpdateLocation() }
                () => { props.onGoToPreviousPage(), props.history.push(props.currentLocation), console.log(props.currentLocation)}
            }
        >
            prev
        </div>
    )
}

Previous.propTypes = {
    onGoToPreviousPage: PropTypes.func.isRequired,
    onUpdateLocation: PropTypes.func.isRequired,
    // currentLocation: PropTypes.string.isRequired
}

export default withRouter(Previous)