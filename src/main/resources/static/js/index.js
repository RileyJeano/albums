const entry = document.querySelector('#app')

//Imports
const { AppWrapper } = require('./appWrapper.js')
const { AddArtist } = require('./addArtist.js')
const { AddAlbum } = require('./addAlbum')
const {AddSong} = require('./addSong')
const {
	activateListeningPowers,
	addANewArtist,
	addANewAlbum,
	addANewSong
	} = require('./activateListenerButtons')

//App Components
const addArtist = new AddArtist()
const addAlbum = new AddAlbum()
const addSong = new AddSong()

//Build App
AppWrapper.innerHTML += addArtist.render()
AppWrapper.innerHTML += addAlbum.render()
AppWrapper.innerHTML += addSong.render()

//AddListeners
const artistSubmitButton = document.querySelector('.artistSubmit')
activateListeningPowers(artistSubmitButton, addANewArtist)
const albumSubmitButton = document.querySelector('.albumSubmit')
activateListeningPowers(albumSubmitButton, addANewAlbum)
const songSubmitButton = document.querySelector('.songSubmit')
activateListeningPowers = (songSubmitButton, addANewSong)
entry.appendChild(AppWrapper)