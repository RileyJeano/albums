const appHtml = document.querySelector('#app')

//Imports
const {AppWrapper} = require('./appWrapper')
const {AddArtist} = require('./addArtist')

//App Components
const addArtist = new addArtist()

//Build App
AppWrapper.innerHTML += AddArtist.render()

appHtml.appendChild(AppWrapper)