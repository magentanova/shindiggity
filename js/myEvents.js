import React, {Component} from 'react'
import Actions from './actions'
import Backbone from 'backbone'

const EventsDash = React.createClass({

	_recogerFiestas: function() {
		Actions.queFiestasHay().then((response) => {
			this.setState({
				fiestas: response.data
			})
		})
	},

	componentWillMount: function() {
		this._recogerFiestas()
		Backbone.Events.on('poll',this._recogerFiestas.bind(this))
	},

	getInitialState: function() {
		return {
			fiestas: []
		}
	},

	render: function() {
		return (
			<div className="eventsDash" >
				<EventList fiestas={this.state.fiestas} />
				<AddEvent />
			</div>
			)
	}
})

const EventList = React.createClass({

	makeEvent: function(fiestaObj) {
		return <Event fiesta={fiestaObj} />
	},

	render: function() {
		return (
			<div className="eventList">
				{this.props.fiestas.map(this.makeEvent)}
			</div>
			)
	}
})

const Event = React.createClass({
	render: function() {
		return (
			<div className="event card" >
				<p>{this.props.fiesta.title}</p>
				<p>{this.props.fiesta.location}</p>
				<p>{new Date(this.props.fiesta.when).toLocaleString()}</p>
			</div>
			)
	}
})

const AddEvent = React.createClass({

	_handlePartyAdd: function(e) {
		e.preventDefault()
		let theStuff = e.currentTarget.elements,
			formData = {}
		formData.title = theStuff.title.value
		formData.location = theStuff.location.value
		formData.when = theStuff.when.value
		Actions.hagamosLaFiesta(formData)
		this.setState({
			formDisplay: 'none'
		})
		Backbone.Events.trigger('poll')
	},

	_showForm: function() {
		// Actions.hagamosLaFiesta()
		this.setState({
			formDisplay: 'block'
		})
	},

	getInitialState: function() {
		return {
			formDisplay: 'none'
		}
	},

	render: function() {
		return (
			<div className="eventAdder" >
				<form onSubmit={this._handlePartyAdd} style={{display:this.state.formDisplay}} >
					<input name="title" placeholder="enter event title" />
					<input name="location" placeholder="enter event location" />
					<input type="datetime-local" name="when"/>
					<input className="button-primary" type="submit" defaultValue="let's party"/><br/>
				</form >
				<button onClick={this._showForm}>+party!</button>
			</div>
			)
	}
})

export default EventsDash