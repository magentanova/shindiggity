import Backendless from 'backendless'

Backendless.initApp('E2EB7018-46EC-3F8B-FF90-73CF4708A600','3931E197-4F64-F903-FF27-DF7809EE9500', 'v1' )
Backendless.enablePromises()

const Fiesta = function(title,location,when) {
	console.log(title, typeof title)
	if (typeof title === "object") {
		this.title = title.title
		this.location = title.location
		console.log(title.when, typeof title.when)
		this.when = title.when
	}
	else {
		this.title = title
		this.location = location
		this.when = when		
	}
}

const Actions = {
	hagamosLaFiesta: function(fiestaObj) {
		var newFiesta = new Fiesta(fiestaObj)
		Backendless.Persistence.of(Fiesta).save(newFiesta)
	},

	queFiestasHay: function() {
		return Backendless.Persistence.of(Fiesta).find()
	}
}

export default Actions