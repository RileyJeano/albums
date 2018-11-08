const entry = document.querySelector('#app')

//Imports
const { AppWrapper } = require('./appWrapper.js')
const { AddArtist } = require('./addArtist.js')
const { AddAlbum } = require('./addAlbum')
const {AddSong} = require('./addSong')

//App Components
const addArtist = new AddArtist()
const addAlbum = new AddAlbum()
const addSong = new AddSong()

//Build App
AppWrapper.innerHTML += addArtist.render()
AppWrapper.innerHTML += addAlbum.render()
AppWrapper.innerHTML += addSong.render()

entry.appendChild(AppWrapper)