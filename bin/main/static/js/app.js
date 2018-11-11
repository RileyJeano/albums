
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
		
		//const tags = getTags(`/api/artists/${artist.id}/tags`)

		//const tagHtml = getTagHtml(tags)
		//tagSectionArtist.appendChild(tagHtml)
		
		//tagSectionArtist.appendChild(tagInputArtist)
		//tagSectionArtist.appendChild(tagInputArtistHidden)
	///	tagSectionArtist.appendChild(tagButtonArtist)
		
	//	artistSection.appendChild(tagSectionArtist)
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
		const thisAlbumSection = document.createElement('div')
		thisAlbumSection.classList.add(`section-${album.id}`)
		albumSection.appendChild(thisAlbumSection)
		//add a link to the album for each album
		const albumHeader = document.createElement('h3')
		albumHeader.innerText = album.name
		albumHeader.innerHTML += `<img src="/images/${album.image}"></img>`
		albumHeader.addEventListener('click', function(){
			getAlbums(artistId)
		})
		thisAlbumSection.appendChild(albumHeader)
		const section = document.createElement('section')
		section.classList.add(`comments-${album.id}`)
		albumSection.appendChild(section)
		showComments(`/api/${artistId}/albums/${album.id}/comments`, `.comments-${album.id}`)
		const commentSection = document.createElement('section')
		
		const commentFields = `
			<label> Comment Username: <input id="commentUsername" type="text" name="commentUsername"/> </label>
			<label> Comment Content: <input id="commentContent" type="text" name="commentContent"/> </label>
			<button class="comment-submit-${album.id}">Submit</button>
		`
		commentSection.innerHTML += commentFields
		albumSection.appendChild(commentSection)
		const submitButton = document.querySelector(`.comment-submit-${album.id}`)
		submitButton.addEventListener('click', () => {
			makeComments(`/api/${artistId}/albums/${album.id}/comments/add`,`/api/${artistId}/albums/${albumId}/comments`, `.comments-${album.id}`, submitButton)
		})	

		//show tags SONGS ONLY
		const tagSection = document.createElement('section')
		tagSection.classList.add(`tags-${album.id}`)
		albumSection.appendChild(tagSection)
		showTags(`/api/${artistId}/albums/${album.id}/tags`, `.tags-${album.id}`)
		const tagSection2 = document.createElement('section')
		const tagFields = `
			<label> Add Tag: <input id="tagName" type="text" name="tagName"/> </label>
			<button class="tag-submit-${album.id}">Submit</button>
		`
		tagSection2.innerHTML += tagFields
		albumSection.appendChild(tagSection2)
		const tagButton = document.querySelector(`.tag-submit-${album.id}`)
		tagButton.addEventListener('click', () =>{
			makeTags(`api/${artistId}/albums/${albumId}/tags/add` ,
					`/api/${artistId}/albums/${albumId}/tags`, `.tags-${album.id}`, tagButton)
		})
		
		//show rating
		const ratingHTML = `<p>Rating: ${album.rating}</p>`
		albumHeader.innerHTML += ratingHTML
		//add ratings
		const ratingFields = `
			<button class=".rating-submit-${album.id}">&#8679;</button>`
		
		const ratingButton = document.createElement('button')
		ratingButton.classList.add(`.rating-submit-${album.id}`)
		ratingButton.innerText = '&#8679;'
		thisAlbumSection.appendChild(ratingButton)
		ratingButton.addEventListener('click', () => {
			const newRating = (album.rating + 1)
			fetch(`/api/${artistId}/albums/${album.id}/rating/add`, {
				method: `POST`,
				body: newRating
			})
			.then()
			.then(data =>{
				getAlbums(artistId)
			})
			getAlbums(artistId)
		})
	
		
		albumSection.appendChild(albumHeader)
	}) //end of Albums.forEach
}



function getSongs(albumId, artistId){
	const xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
			const allSongs = JSON.parse(this.responseText)
			showSongs(allSongs, artistId, albumId)
		}
	}
	xhttp.open("GET", `/api/${artistId}/albums/${albumId}/songs`, true)
	xhttp.send()
}


function showSongs(allSongs, artistId, albumId){
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
	
		//show comments SONGS ONLY
		const section = document.createElement('section')
		section.classList.add(`comments-${song.id}`)
		songSection.appendChild(section)
		showComments(`/api/${artistId}/albums/${albumId}/songs/${song.id}/comments`, `.comments-${song.id}`)
		const commentSection = document.createElement('section')
		
		const commentFields = `
			<label> Comment Username: <input id="commentUsername" type="text" name="commentUsername"/> </label>
			<label> Comment Content: <input id="commentContent" type="text" name="commentContent"/> </label>
			<button class="comment-submit-${song.id}">Submit</button>
		`
		commentSection.innerHTML += commentFields
		songSection.appendChild(commentSection)
		const submitButton = document.querySelector(`.comment-submit-${song.id}`)
		submitButton.addEventListener('click', () => {
			makeComments(`/api/${artistId}/albums/${albumId}/songs/${song.id}/comments/add`,
					`/api/${artistId}/albums/${albumId}/songs/${song.id}/comments`, `.comments-${song.id}`, submitButton)
		})	

		//show tags SONGS ONLY
		const tagSection = document.createElement('section')
		tagSection.classList.add(`tags-${song.id}`)
		songSection.appendChild(tagSection)
		showTags(`/api/${artistId}/albums/${albumId}/songs/${song.id}/tags`, `.tags-${song.id}`)
		const tagSection2 = document.createElement('section')
		const tagFields = `
			<label> Add Tag: <input id="tagName" type="text" name="tagName"/> </label>
			<button class="tag-submit-${song.id}">Submit</button>
		`
		tagSection2.innerHTML += tagFields
		songSection.appendChild(tagSection2)
		const tagButton = document.querySelector(`.tag-submit-${song.id}`)
		tagButton.addEventListener('click', () =>{
			makeTags(`api/${artistId}/albums/${albumId}/songs/${song.id}/tags/add` ,
					`/api/${artistId}/albums/${albumId}/songs/${song.id}/tags`, `.tags-${song.id}`, tagButton)
		})
		
		//show rating
		const ratingHTML = `<p>Rating: ${song.rating}</p>`
		songHeader.innerHTML += ratingHTML
		//add ratings
		const ratingFields = `
			<button class="rating-submit-${song.id}">&#8679;</button>`
		songHeader.innerHTML += ratingFields
		const increaseRatingButton = document.querySelector(`.rating-submit-${song.id}`)
		increaseRatingButton.addEventListener('click', () => {
			const newRating = (song.rating + 1)
			fetch(`/api/${artistId}/albums/${albumId}/songs/${song.id}/rating/add`, {
				method: `POST`,
				body: newRating
			})
			.then()
			.then(data =>{
				getSongs(albumId, artistId)
			})
			getSongs(albumId, artistId)
		})
	}) //end of songs.forEach

	//Display add a song section
	const addSongHtml = `
		<section class="addSong">
			<h1>Add Song:</h1>
			<label> Song Name: <input id="songName" type="text" name="songName"/> </label>
			<label> Song Length: <input id="songLength" type="text" name="songLength"/> </label>
			<label> Song Link: <input id="songLink" type="text" name="songLink"/> </label>
			<button class="songSubmit">Submit</button>
		</section>`
	const songAdditionSection = document.createElement('section')
	songSection.appendChild(songAdditionSection)
	songAdditionSection.innerHTML += addSongHtml
	const songSubmitButton = songSection.querySelector('.songSubmit')
	const songNameField = songSection.querySelector('#songName')
	const songLengthField = songSection.querySelector('#songLength')
	const songLinkField = songSection.querySelector('#songLink')
	songSubmitButton.addEventListener('click', ()=>{
		const path = `/api/${artistId}/albums/${albumId}/songs/add`
		addNewSong(songNameField, songLengthField, songLinkField, path, allSongs, artistId, albumId)
	})


	
}




////////////////////  ADDING NEW DATA //////////////////////////////////////

//artistSubmitButton.addEventListener('click', ()=>{
//	addANewArtist()
//})
//
//albumSubmitButton.addEventListener('click', () => {
//	addANewAlbum()
//})


function addANewArtist(){
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", `/api/add`, true); //this is what this.responseText is
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
	xhttp.open("POST", `/api/1/albums/add`, true); //this is what "this.responseText" is
	const content = JSON.stringify({
		name: albumName.value,
		image: albumImage.value,
	})
	xhttp.send(content)
}


function addNewSong(songNameField, songLengthField, songLinkField, path, allSongs, artistId, albumId) {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			songNameField.value=''
			songLinkField.value=''
			songLengthField.value=''
			getSongs(albumId, artistId)
		}
	}
	xhttp.open("POST", path, true); //1 is Captain Carrion and the Buzzards, 2 is their Album
	const song = JSON.stringify({
		name: songNameField.value,
		length: songLengthField.value,
		link: songLinkField.value,
	})
	xhttp.send(song)
}

////////////////////ADDING AND REMOVING Comments //////////////////////////////////////
//show comments
function showComments(path, className){ 
const section = document.querySelector(className)
section.innerHTML = ""
fetch(path, {
		method: 'get'
	})
	.then(res => res.json())
	.then(data => {
		data.forEach(comment =>{
			section.innerHTML += `
			<p>Comment UserName: </p>
			<p>${comment.username}</p>
			<p>Comment: </p>
			<p>${comment.content}</p>
			`
		})
	})
	
}

//make comments
function makeComments(path, path2, section, submitButton){
	const parentSection = submitButton.parentNode
	const commentUsername = parentSection.querySelector('#commentUsername')
	const commentContent = parentSection.querySelector('#commentContent')
	
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			commentUsername.value = ''
			commentContent.value = ''
			showComments(path2, section)
		}
	}
	xhttp.open("POST", path, true); //this is what "this.responseText" is
	const content = JSON.stringify({
		name: commentUsername.value,
		content: commentContent.value,
	})
		
	xhttp.send(content)
	//showcommentshere
	
}



////////////////////ADDING AND REMOVING Tags //////////////////////////////////////
function showTags(path, className){ 
const section = document.querySelector(className)
section.innerHTML = ""
fetch(path, {
		method: 'get'
	})
	.then(res => res.json())
	.then(data => {
		data.forEach(tag =>{
			const section = document.querySelector(className)
			section.innerHTML += `
			<p>Tag: </p>
			<p class="tag">${tag.tagName}</p>
			`

			section.querySelector('.tag').addEventListener('click', function(){
				showTagView(tag)
			})
		})
	})
	
}

//make tags
function makeTags(path, path2, section, button){
	const parentElement = button.parentNode
	const tagName = parentElement.querySelector('#tagName')
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			tagName.value = ''
			showTags(path2, section)
		}
	}
	xhttp.open("POST", path, true); //this is what "this.responseText" is
	const content = JSON.stringify({
		tagName: tagName.value,
	})
		
	xhttp.send(content)
	//showcommentshere
	
}

//////////Show The Elemenets that belong to a tag //////////////////////////////////
function showTagView(tag){
	clearSections()
	const list = document.createElement('ul')
	console.log(tag.songs)
	tag.artists.forEach(artist =>{
		const li = `
		<li>${artist.name}</li>`
		list.innerHTML += li
	})
	tag.albums.forEach(album =>{
		const li = `
		<li>${album.name}</li>`
		list.innerHTML += li
	})
	tag.songs.forEach(song =>{
		const li = `
		<li>${song.name}</li>`
		list.innerHTML += li
	})
	artistSection.appendChild(list)
	console.log(list.innerHTML)
}

