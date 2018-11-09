//Gotta start somewhere:
const entry = document.querySelector('#app')
//Imports
const { AppWrapper } = require('./appWrapper.js')
const { AddArtist } = require('./addArtist.js')
const { AddAlbum } = require('./addAlbum')
const {AddSong} = require('./addSong')
const { ShowArtists } = require('./showArtists')
const { AddStuffDisplay } = require('./AddStuffDisplay')

//HTML pins
const artistSection = document.querySelector('#artists')
const albumSection = document.querySelector('#albums')
const songSection = document.querySelector('#songs')
const addingStuffSection = document.querySelector('#adding-stuff-section')

//App Components
const addArtist = new AddArtist()
const addAlbum = new AddAlbum()
const addSong = new AddSong()
const showArtists = new ShowArtists(artistSection)
const addStuffDisplay = new AddStuffDisplay(addingStuffSection)

//Build App
showArtists.getArtists()
AppWrapper.innerHTML += addStuffDisplay.render()
const toggleInputDisplayButton = document.querySelector('#toggle-input-display-button')
addStuffDisplay.activateButton(toggleInputDisplayButton)
addingStuffSection.innerHTML += addArtist.render()
addingStuffSection.innerHTML += addAlbum.render()
addingStuffSection.innerHTML += addSong.render()


entry.appendChild(AppWrapper)