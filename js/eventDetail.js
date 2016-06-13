import React, {Component} from 'react'
import Actions from './actions'
import Backbone from 'backbone'
import Header from './header'

const EventDetailContainer = React.createClass({
	
	componentWillMount: function() {
		console.log('bouttammount')
		Actions.queTalLaFiesta(this.props.eventId).then((resp) => {
			if (resp.objectId) {
				this.setState({fiesta: resp})				
			}
		})
	},

	getInitialState: function() {
		return {
			fiesta: {
					title: 'stupid',
					location: 'party',
					when: 'no one likes',
					guests: [
						{
							fullName: "ahmet sikdar",
							username: "sikhBro"
						},
						{
							fullName: "george costanza",
							username: "art vanderbilt"
						}
					],
					items: [
						{
							thing: "bananas",
							quantity: 5,
							units: ""
						},
						{
							thing: "tequila",
							quantity: 500,
							units: 'ml'
						}
					]
				}
			}
	},

	render: function() {
		return (
			<div className="detailContainer" >
				<Header />
				<PartyHeading eventData={this.state.fiesta} />
				<GuestList guests={this.state.fiesta.guests} />
				<FoodAndLiquor items={this.state.fiesta.items} />
			</div>
			)
	}
})

const PartyHeading = React.createClass({
	render: function() {
		return (
			<div className="partyHeading">
				<h1>{this.props.eventData.title}</h1>
				<h3>hosted by {this.props.eventData.hostName}</h3>
				<p>be at <strong>{this.props.eventData.location}</strong> \
				around <strong>{this.props.eventData.when}</strong> </p>
			</div>
			)
	}
})

const GuestList = React.createClass({
	_makeGuest: function(obj) {
		return <Guest guestData={obj} />
	},

	render: function() {
		return (
			<div className="guestList">
				{this.props.guests.map(this._makeGuest)}
			</div>
			)
	}
})

const Guest = React.createClass({
	render: function() {
		return (
			<div className="guest">
				<p>{this.props.guestData.fullName}</p>
				<button className="remove" onClick={()=>{Actions.yaNoViene(this.props.guestData.username)}}>
				X
				</button>
				}
			</div>
			)
	}
})

const FoodAndLiquor = React.createClass({
	_makeGuest: function(obj) {
		return <Item itemData={obj} />
	},

	render: function() {
		return (
			<div className="foodAndLiquor">
				{this.props.items.map(this._makeItem)}
			</div>
			)
	}
})

const Item = React.createClass({
	render: function() {
		return (
			<div className="item">
				<p>{this.props.itemData.thing}</p>
			</div>
			)
	}
})

export default EventDetailContainer