import React, {Component} from 'react'
import Actions from './actions'
import Header from './header'


const LogInPage = React.createClass({
	render: function() {
		return (
			<div className="loginContainer" >
				<Header />
				<LogIn />
				<SignUp />
			</div>
			)
	}
})

const LogIn = React.createClass({

	_handleSubmit: function(e) {
		e.preventDefault()
		var theStuff = e.currentTarget.elements,
			email = theStuff.email.value,
			password = theStuff.password.value
		Actions.quePedo(email,password)
	},

	render: function() {
		return (
			<div className="login card" >
				<form onSubmit={this._handleSubmit} >
					<input placeholder="email" name="email" />
					<input placeholder="password" name="password" />
					<input type="submit" defaultValue="log in!" />
				</form>
			</div>
			)
	}
})

const SignUp = React.createClass({

	_handleSubmit: function(e) {
		e.preventDefault()
		let theStuff = e.currentTarget.elements,
			formData = {}
		formData.name = theStuff.realName.value
		formData.email = theStuff.email.value
		formData.password = theStuff.password.value
		Actions.bienvenidos(formData)
	},

	render: function() {
		return (
			<div className="signUp card" >
				<form onSubmit={this._handleSubmit} >
					<input placeholder="realName" name="realName" />
					<input placeholder="email" name="email" />
					<input placeholder="password" name="password" />
					<input type="submit" defaultValue="sign up!" />
				</form>
			</div>
			)
	}
})

export default LogInPage
