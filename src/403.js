import React from 'react'
import './custome.css'

export default class ForbiddenRoute extends React.Component {
  render() {
    return (
      <>
        <div id="wrapper">
          <div id="container">
            {/* <h1>403 Forbidden – you don’t have permission to access.</h1> */}
            <h1>403 Forbidden Access – something when wrong.</h1>
            <p>&copy; 2022 Klola Dev.</p>
          </div>
        </div>
      </>
    )
  }
}
