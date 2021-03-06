
const currentArtistId = window.location.pathname.split('/')[2]

const albumSubmitButton = document.querySelector('.albumSubmit')
const artistSubmitButton = document.querySelector('.artistSubmit')
const songSubmitButton = document.querySelector('.songSubmit')
const albumName = document.querySelector('#albumName')
const albumImage = document.querySelector('#albumImage')
const artistName = document.querySelector('#artistName')
const artistImage = document.querySelector('#artistImage')
const artistAge = document.querySelector('#artistAge')
const artistHome = document.querySelector('#artistHome')
const songName = document.querySelector('#songName')
const songLength = document.querySelector('#songLength')
const songLink = document.querySelector('#songLink')


const artistSection = document.querySelector('#artists')
const albumSection = document.querySelector('#albums')
const songSection = document.querySelector('#songs')

getArtists()

function clearSections(){
	artistSection.innerHTML = ''
	albumSection.innerHTML = ''
	songSection.innerHTML = ''
}


function getArtists() {
	const xhttp = new XMLHttpRequest()
	xhttp.open("GET", "/api/artists", true)
	xhttp.send()
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){

			const allArtists = JSON.parse(this.responseText) //this.response text is the response from the server
			showArtists(allArtists)

		}
	}
}


function showArtists(allArtists) {
	clearSections()
	allArtists.forEach(artist => {
		const artistHeader = document.createElement('h1')
		artistHeader.innerText = artist.name
		const artistSubheaderAge = document.createElement('p')
		artistSubheaderAge.innerText = `Age: ${artist.age}`
		const artistSubheaderHome = document.createElement('p')
		artistSubheaderHome.innerText = `Hometown: ${artist.home}`
		artistHeader.addEventListener('click', function() {getAlbums(artist.id)})
		artistSection.appendChild(artistHeader)
		artistSection.appendChild(artistSubheaderAge)
		artistSection.appendChild(artistSubheaderHome)
		
		const tagSectionArtist = document.createElement('section')
		tagSectionArtist.classList.add("artistTag")
		const tagButtonArtist = document.createElement('button')
		tagButtonArtist.classList.add("artistButton")
		tagButtonArtist.innerText = "Submit"
		const tagInputArtist = document.createElement('input')
		tagInputArtist.type = "text"
		tagInputArtist.name="artistTag"
		const tagInputArtistHidden = document.createElement('input')
		tagInputArtistHidden.type = "hidden"
		tagInputArtistHidden.value = artist.id
		tagInputArtist.name="artistTagHidden";
		
		const tags = getTags(`/api/artists/${artist.id}/tags`)
		console.log('this is what we feed to getTagHtml()')
		console.log(tags)
		const tagHtml = getTagHtml(tags)
		tagSectionArtist.appendChild(tagHtml)
		
		tagSectionArtist.appendChild(tagInputArtist)
		tagSectionArtist.appendChild(tagInputArtistHidden)
		tagSectionArtist.appendChild(tagButtonArtist)
		
		artistSection.appendChild(tagSectionArtist)
	})
}



function getAlbums(artistId) {
	const xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){

			const allAlbums = JSON.parse(this.responseText)
			showAlbums(allAlbums, artistId)
		}
	}
	xhttp.open("GET", `/api/${artistId}/albums`, true)
	xhttp.send()
}


function showAlbums(allAlbums, artistId){
	clearSections()
	//first make a button to go back to artists view
	artistSection.innerHTML = `<button id='backToArtists'>back to artists</button>`
	document.querySelector('#backToArtists').addEventListener('click', ()=>{
		getArtists()
	})
	//then...
	allAlbums.forEach(album => {
		const albumHeader = document.createElement('h3')
		albumHeader.innerText = album.name
		albumHeader.innerHTML += `<img src='/images/${album.image}'></img>`
		albumHeader.addEventListener('click', function(){
			getSongs(album.id, artistId)
		})
		albumSection.appendChild(albumHeader)
	})
}


function getSongs(albumId, artistId){
	const xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
			const allSongs = JSON.parse(this.responseText)
			showSongs(allSongs, artistId)
		}
	}
	xhttp.open("GET", `/api/${artistId}/albums/${albumId}/songs`, true)
	xhttp.send()
}


function showSongs(allSongs, artistId){
	clearSections()
	albumSection.innerHTML = `<button id='backToAlbums'>back to albums</button>`
	document.querySelector('#backToAlbums').addEventListener('click', ()=>{
		clearSections()
		getAlbums(artistId)
	})
	allSongs.forEach(song => {
		const songHeader = document.createElement('h4')
		songHeader.innerText = `${song.name} - ${song.length}`
//add an event listener here so that songs can display their length, etc...
		songSection.appendChild(songHeader)
	})
}



////////////////////  ADDING NEW DATA //////////////////////////////////////

artistSubmitButton.addEventListener('click', ()=>{
	addANewArtist()
})

albumSubmitButton.addEventListener('click', () => {
	addANewAlbum()
})

songSubmitButton.addEventListener('click', ()=>{
	addNewSong()
})


function addANewArtist(){
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", `/api/artist/add`, true); //this is what this.responseText is
	const artist = JSON.stringify({
		name: artistName.value,
		image: artistImage.value,
		age: artistAge.value,
		home: artistHome.value,
	})
	xhttp.send(artist)
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			artistName.value=''
			artistImage.value=''
			artistAge.value=''
			artistHome.value = ''
		}
	}
}


function addANewAlbum(){
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			albumName.value = ''
			albumImage.value = ''
		}
	}
	xhttp.open("POST", `/api/artists/1/albums/add`, true); //this is what "this.responseText" is
	const content = JSON.stringify({
		name: albumName.value,
		image: albumImage.value,
	})
	xhttp.send(content)
}


function addNewSong() {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			songName.value=''
			songLink.value=''
			songLength.value=''
		}
	}
	xhttp.open("POST", `/api/artists/1/albums/2/songs/add`, true); //1 is Captain Carrion and the Buzzards, 2 is their Album
	const song = JSON.stringify({
		name: songName.value,
		length: songLength.value,
		link: songLink.value,
	})
	xhttp.send(song)
}

////////////////////ADDING AND REMOVING TAGS //////////////////////////////////////
//const addTagButton = document.querySelector(the button we need to select);
//const p = document.querySelector(the selection we want to change);
//const original = p.innerHTML; (Setting this to empty at begining)
//const input = document.querySelector('.taggyTag'); (input field name)
//reviewId = window.location.pathname.split('/')[2];

//addTag(input, reviewId, addTagButton, p, original);

//fetch(`/api/reviews/${window.location.pathname.split('/')[2]}`, {
// 				method: 'get'
// 			})
// 			.then(res => res.json())
// 			.then(data => {
// 				data.forEach(tag =>{
// 					addTagHtml(tag, p, reviewId)
// 					})
// 				addDeleteButtonsEvent(p, reviewId);
// 				})

function getTags(path){
	fetch(path)
	.then(res => 
		res.json()
	)
	.then(tags => {
			return tags
			
	})
	.catch(console.log("Ooooooh fuck, your fetch didn't then. It's hasn't then-ed."))	
}


function getTagHtml(tags) {
	console.log(tags + 'this is inside the getTagHtml function')
	let ul = document.createElement('ul')
	tags.forEach(tag => {
		ul.innerHTML += `<li>${tag.tagName}</li>`
	})
	return ul
}
 				
function addTag(input, reviewId, addTagButton, p, original) {
	
	addTagButton.addEventListener('click', function() {
		
		const xhttp = new XMLHttpRequest()
		
		// Sets behavior for when the AJAX request is complete
		xhttp.onreadystatechange = function() {
			
			// Checks the ready state and http status code
			if (this.readyState == 4 && this.status == 200) {
				
				//Resets the original p element
				p.innerHTML = original;

				JSON.parse(this.responseText).forEach(tag => {
					addTagHtml(tag, p, reviewId)
				})
				addDeleteButtonsEvent(p, reviewId)
			}
		}
		xhttp.open('POST', `/api/reviews/${window.location.pathname.split('/')[2]}/tags/add`, true)
		const body = JSON.stringify({
					tagName: input.value
				})
		xhttp.send(body)
	})
}

//function addTagHtml(tag, p) {
//
//	p.innerHTML = p.innerHTML + `
//		<a href = "/tag/${tag.id}" class="a${tag.id}">${tag.tagName}</a> <button class="delete" data-num="${tag.id}">X</button>
//	`;
//}