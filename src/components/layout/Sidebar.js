import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <Link to="/clients/add" className="btn btn-success btn-block">
      <i className="fas fa-plus"></i>New</Link>
  )
}

export default Sidebar
