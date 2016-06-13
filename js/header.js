import React, {Component} from 'react'
import Actions from './actions'

const Header = React.createClass({
	render: function() {
		return (
			<div className="header">
				<h1>Shindiggity</h1>
				<h3>Shindoubt</h3>
				<div className="nav">
					<a href="#eventDash">my events</a>
					<a href="#profile">profile</a>
					<a href="#" onClick={Actions.adios}>log out</a>
				</div>
			</div>
			)
	}
})

export default Header