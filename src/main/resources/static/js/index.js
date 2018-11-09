//Gotta start somewhere:
const entry = document.querySelector('#app')
//Imports
const { AppWrapper } = require('./appWrapper.js')
const { AddArtist } = require('./addArtist.js')
const { AddAlbum } = require('./addAlbum')
const {AddSong} = require('./addSong')
<<<<<<< HEAD
const {
	activateListeningPowers,
	addANewArtist,
	addANewAlbum,
	addANewSong
	} = require('./activateListenerButtons')
=======
const { ShowArtists } = require('./showArtists')
const { AddStuffDisplay } = require('./AddStuffDisplay')

//HTML pins
const artistSection = document.querySelector('#artists')
const albumSection = document.querySelector('#albums')
const songSection = document.querySelector('#songs')
const addingStuffSection = document.querySelector('#adding-stuff-section')
>>>>>>> 1ddb5cafa5452484fbf1c4d8be45604bd1b17c38

//App Components
const addArtist = new AddArtist()
const addAlbum = new AddAlbum()
const addSong = new AddSong()
const showArtists = new ShowArtists(artistSection)
const addStuffDisplay = new AddStuffDisplay(addingStuffSection)

//Build App
showArtists.getArtists()
// AppWrapper.innerHTML += addStuffDisplay.render()
// const toggleInputDisplayButton = document.querySelector('#toggle-input-display-button')
// addStuffDisplay.activateButton(toggleInputDisplayButton)
addingStuffSection.innerHTML += addArtist.render()
addingStuffSection.innerHTML += addAlbum.render()
addingStuffSection.innerHTML += addSong.render()


//AddListeners
const artistSubmitButton = document.querySelector('.artistSubmit')
activateListeningPowers(artistSubmitButton, addANewArtist)
const albumSubmitButton = document.querySelector('.albumSubmit')
activateListeningPowers(albumSubmitButton, addANewAlbum)
const songSubmitButton = document.querySelector('.songSubmit')
activateListeningPowers = (songSubmitButton, addANewSong)
entry.appendChild(AppWrapper)