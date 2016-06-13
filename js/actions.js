import Backendless from 'backendless'
import Backbone from 'backbone'
import _ from 'underscore'

Backendless.initApp('9FCF08BE-F5E9-D0A0-FF88-151B00F20400','F515194C-E971-3BE0-FF60-D72354CE2100', 'v1' )
Backendless.enablePromises()
window.Backendless = Backendless

const Fiesta = function(title,location,when,host) {
	if (typeof title === "object") {
		this.title = title.title
		this.location = title.location
		this.when = title.when
		this.host = title.host
	}
	else {
		this.title = title
		this.location = location
		this.when = when
		this.host = host		
	}
}

const ACTIONS = {

	adios: function() {
		Backendless.UserService.logout()
		location.hash = "login"
	},

	hagamosLaFiesta: function(fiestaObj) {
		Backendless.UserService.getCurrentUser().then(function(usr){
			console.log(usr)
			// add host data to party
			fiestaObj.host = usr
			var newFiesta = new Fiesta(fiestaObj)

			
			// // add party to hosts events
			console.log(1)
			// usr.events.push(newFiesta)
			
			// // update the party and the user
			// Backendless.UserService.update(usr)
			Backendless.Persistence.of(Fiesta).save(newFiesta).then(function(){
				Backbone.Events.trigger('poll')
			},
			function(err){
				console.log(err)
			})
		},
		function(err){
			console.log(err)
		})
	},

	bienvenidos: function(userData) {
		console.log(userData)
		var usr = new Backendless.User() 
		usr = _.extend(usr,userData)
		Backendless.UserService.register(usr).then(function(resp){
			console.log(resp)
			Backendless.UserService.login(userData.email,userData.password).then(function(){
				location.hash = "eventDash"
			})
		})
	},

	noMas: function(fiestaObj) {
		console.log('cancelando')
		Backendless.Persistence.of(Fiesta).remove(fiestaObj).then(function(){
			Backbone.Events.trigger('poll')
		})
	},

	quePedo: function(email,password) {
		Backendless.UserService.login( email, password, true ).then(function(resp){
			console.log(resp)
			location.hash = "eventDash"
		});
	},

	queFiestasHay: function() {
		return Backendless.Persistence.of(Fiesta).find()
	},

	queTalLaFiesta: function(id) {
		return Backendless.Persistence.of(Fiesta).findById(id)
	}
}

export default Actions