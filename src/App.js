import React from 'react'
import './App.css'
import { BrowserRouter, Route, useParams } from 'react-router-dom'
import Chart from './Chart'
import ForbiddenRoute from './403'

export default function App() {
  return (
    <BrowserRouter basename="/">
    <Route exact path="/:klola_id/:tahun/:subdomain">
      <Chart />
    </Route>
    <Route path="/403">
      <ForbiddenRoute />
    </Route>
    <Route path="*">
    <ForbiddenRoute />
      </Route>
  </BrowserRouter>
  );
}
