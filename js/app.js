// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
// import * as u from 'universal-utils'
// const {fp,vdom,lazy,hamt,csp,fetch,router} = u,
//     {debounce,m,html,rAF,mount,update,qs,container} = vdom

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }

// Check for ServiceWorker support before trying to install it
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./serviceworker.js').then(() => {
//         // Registration was successful
//         console.info('registration success')
//     }).catch(() => {
//         console.log('registration failed', e)
//             // Registration failed
//     })
//
//     const unregister = () => navigator.serviceWorker.getRegistrations().then(registrations => {
//         for (let registration of registrations) {registration.unregister()}
//     })
//     window.unregister = unregister
// } else {
//     // No ServiceWorker Support
// }

import DOM from 'react-dom'
import React, {Component} from 'react'
import Backbone from 'backbone'
import EventsDash from './myEvents'
import EventDetailContainer from './eventDetail'
import LogInPage from './login'

function app() {

	const ElControl = Backbone.Router.extend({
		routes: {
			login: 'showLogin',
			eventDash: 'showEventDash',
			"eventDetail/:id": 'showEventDetail',
			logout: "doLogOut",
			"*anything": 'showLogin'
		},

		initialize: function() {

		},

		showLogin: function() {
			DOM.render(<LogInPage />, document.querySelector('.container'))
		},

		showEventDash: function() {
			DOM.render(<EventsDash />, document.querySelector('.container'))
		},

		showEventDetail: function(id) {
			DOM.render(<EventDetailContainer eventId={id} />, 
				document.querySelector('.container'))
		}
	})

	const ec = new ElControl()
	Backbone.history.start()
}

app()