import React, {Component} from 'react'
import Actions from './actions'
import Backbone from 'backbone'
import Header from './header'

const EventsDash = React.createClass({

	_recogerFiestas: function() {
		Actions.queFiestasHay().then((response) => {
			console.log(response.data)
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
			fiestas: [{
				title: 'stupid',
				location: 'party',
				when: 'no one likes'
			}]
		}
	},

	render: function() {
		return (
			<div className="eventsDash" >
				<Header />
				<EventList fiestas={this.state.fiestas} />
				<AddEvent />
			</div>
			)
	}
})

const EventList = React.createClass({

	makeEvent: function(fiestaObj,i) {
		return <Event key={i} fiesta={fiestaObj} />
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
		var fiesta = this.props.fiesta
		return (
			<div className="event card" >
				<p>{fiesta.title}</p>
				<p>{fiesta.location}</p>
				<p>{new Date(fiesta.when).toLocaleString()}</p>
				<button className="remove" onClick={function(){Actions.noMas(fiesta)} }>
					cancel
				</button>
				<button onClick={function(){location.hash = `eventDetail/${fiesta.objectId}` }}>manage</button>
			</div>
			)
	}
})

const AddEvent = React.createClass({

	_handlePartyAdd: function(e) {
		console.log('submitting')
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
				<div style={{display:this.state.formDisplay}} className="formContainer">
					<form onSubmit={this._handlePartyAdd} >
						<input name="title" placeholder="enter event title" />
						<input name="location" placeholder="enter event location" />
						<input type="datetime-local" name="when" />
						<input className="button-primary" type="submit" defaultValue="let's party"/><br/>
					</form >
					<button onClick={()=>{this.setState({formDisplay:'none'})}}>X</button>
				</div>
				<button onClick={this._showForm}>+party!</button>
			</div>
			)
	}
})

export default EventsDash