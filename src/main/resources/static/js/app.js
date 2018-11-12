
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
		const eachArtistSection = document.createElement('section')
		eachArtistSection.classList.add('eachArtistSection')
		artistSection.appendChild(eachArtistSection)
		const artistHeader = document.createElement('h1')
		artistHeader.innerText = artist.name
		const artistSubheaderAge = document.createElement('p')
		artistSubheaderAge.innerText = `Age: ${artist.age}`
		const artistSubheaderHome = document.createElement('p')
		artistSubheaderHome.innerText = `Hometown: ${artist.home}`
		artistHeader.addEventListener('click', function() {getAlbums(artist.id)})
		eachArtistSection.appendChild(artistHeader)
		eachArtistSection.appendChild(artistSubheaderAge)
		eachArtistSection.appendChild(artistSubheaderHome)

		// show ratings
		const ratingSection = document.createElement('section')
		eachArtistSection.appendChild(ratingSection)
		const ratingHTML = `<p>Rating: ${artist.rating}</p>`
		ratingSection.innerHTML += ratingHTML
		//add rating
		const ratingFields = `
			<button class="rating-submit-${artist.id}">&#8679;</button>`
		ratingSection.innerHTML += ratingFields
		const increaseRatingButton = document.querySelector(`.rating-submit-${artist.id}`)
		increaseRatingButton.addEventListener('click', () => {
			const newRating = (artist.rating + 1)
			fetch(`/api/${artist.id}/rating/add`, {
				method: `POST`,
				body: newRating
			})
			.then()
			.then(data =>{
				getArtists()
			})
			getArtists()
		})
		
		//show tags
		const tagSection = document.createElement('section')
		tagSection.classList.add(`tags-${artist.id}`)
		eachArtistSection.appendChild(tagSection)
		showTags(`/api/${artist.id}/tags`, `.tags-${artist.id}`)
		const tagSection2 = document.createElement('section')
		const tagFields = `
			<label> Add Tag: <input id="tagName" type="text" name="tagName"/> </label>
			<button class="tag-submit-${artist.id}">Submit</button>
		`
		tagSection2.innerHTML += tagFields
		eachArtistSection.appendChild(tagSection2)
		const tagButton = document.querySelector(`.tag-submit-${artist.id}`)
		tagButton.addEventListener('click', () =>{
			makeTags(`api/${artist.id}/tags/add` ,
					`/api/${artist.id}/tags`, `.tags-${artist.id}`, tagButton)
		})

		//show comments
		const section = document.createElement('section')
		section.classList.add(`comments-${artist.id}`) //THIS COMES IN HANDY MUCH LATER, DON'T DELETE IT!
		eachArtistSection.appendChild(section)
		showComments(`/api/${artist.id}/comments`, `.comments-${artist.id}`)
		const commentSection = document.createElement('section')
		
		const commentFields = `
			<h3>Comment:</h3>
			<label> Username: <input id="commentUsername" type="text" name="commentUsername"/> </label>
			<label> Comment: <input id="commentContent" type="text" name="commentContent"/> </label>
			<button class="comment-submit-${artist.id}">Submit</button>
		`
		commentSection.innerHTML += commentFields
		eachArtistSection.appendChild(commentSection)
		const submitButton = document.querySelector(`.comment-submit-${artist.id}`)
		submitButton.addEventListener('click', () => {
			makeComments(`/api/${artist.id}/comments/add`,
					`/api/${artist.id}/comments`, `.comments-${artist.id}`, submitButton)
		})	
	}) //end of allArtists.forEach
	//Display add an artist section
	const addArtistHtml = `
		<section class="addArtist">
			<h1>Add Artist:</h1>
			<label> Name: <input id="name" type="text" name="name"/> </label>
			<label> Image: <input id="image" type="text" name="image"/> </label>
			<label> Age: <input id="age" type="text" name="age"/> </label>
			<label> Home: <input id="home" type="text" name="home"/> </label>
			<button class="artistSubmit">Submit</button>
		</section>`
	const artistAdditionSection = document.createElement('section')
	artistSection.appendChild(artistAdditionSection)
	artistAdditionSection.innerHTML += addArtistHtml
	const artistSubmitButton = artistSection.querySelector('.artistSubmit')
	const artistNameField = artistSection.querySelector('#name')
	const artistImageField = artistSection.querySelector('#image')
	const artistAgeField = artistSection.querySelector('#age')
	const artistHomeField = artistSection.querySelector('#home')

	artistSubmitButton.addEventListener('click', ()=>{
		const path = `/api/artist/add`
		addANewArtist(path, artistNameField, artistImageField, artistAgeField, artistHomeField)
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
		const eachAlbumSection = document.createElement('section')
		eachAlbumSection.classList.add('eachAlbumSection')
		albumSection.appendChild(eachAlbumSection)
		const albumHeader = document.createElement('h3')
		albumHeader.innerText = album.name
		albumHeader.innerHTML += `<img src='/images/${album.image}'></img>`
		albumHeader.addEventListener('click', function(){
			getSongs(album.id, artistId)
		})
		eachAlbumSection.appendChild(albumHeader)

		// show ratings
		const ratingSection = document.createElement('section')
		eachAlbumSection.appendChild(ratingSection)
		const ratingHTML = `<p>Rating: ${album.rating}</p>`
		ratingSection.innerHTML += ratingHTML
		//add rating
		const ratingFields = `
			<button class="rating-submit-${album.id}">&#8679;</button>`
		//ADD THIS TO NOT THE HEADER 
		ratingSection.innerHTML += ratingFields
		const increaseRatingButton = document.querySelector(`.rating-submit-${album.id}`)
		increaseRatingButton.addEventListener('click', () => {
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
		
		//show tags
		const tagSection = document.createElement('section')
		tagSection.classList.add(`tags-${album.id}`)
		eachAlbumSection.appendChild(tagSection)
		showTags(`/api/${artistId}/albums/${album.id}/tags`, `.tags-${album.id}`)
		const tagSection2 = document.createElement('section')
		const tagFields = `
			<label> Add Tag: <input id="tagName" type="text" name="tagName"/> </label>
			<button class="tag-submit-${album.id}">Submit</button>
		`
		tagSection2.innerHTML += tagFields
		eachAlbumSection.appendChild(tagSection2)
		const tagButton = document.querySelector(`.tag-submit-${album.id}`)
		tagButton.addEventListener('click', () =>{
			makeTags(`api/${artistId}/albums/${album.id}/tags/add` ,
					`/api/${artistId}/albums/${album.id}/tags`, `.tags-${album.id}`, tagButton)
		})

		//show comments
		const section = document.createElement('section')
		section.classList.add(`comments-${album.id}`)
		eachAlbumSection.appendChild(section)
		showComments(`/api/${artistId}/albums/${album.id}/comments`, `.comments-${album.id}`)
		const commentSection = document.createElement('section')
		
		const commentFields = `
			<h3>Comment</h3>
			<label>Username: <input id="commentUsername" type="text" name="commentUsername"/> </label>
			<label>Comment: <input id="commentContent" type="text" name="commentContent"/> </label>
			<button class="comment-submit-${album.id}">Submit</button>
		`
		commentSection.innerHTML += commentFields
		eachAlbumSection.appendChild(commentSection)
		const submitButton = document.querySelector(`.comment-submit-${album.id}`)
		submitButton.addEventListener('click', () => {
			makeComments(`/api/${artistId}/albums/${album.id}/comments/add`,
					`/api/${artistId}/albums/${album.id}/comments`, `.comments-${album.id}`, submitButton)
		})	

	}) //end of albums.forEach
	//Display add an album section
	const addAlbumHtml = `
		<section class="addAlbum">
			<h1>Add Album:</h1>
			<label> Album Name: <input id="name" type="text" name="name"/> </label>
			<label> Image: <input id="image" type="text" name="image"/> </label>
			<button class="albumSubmit">Submit</button>
		</section>`
	const albumAdditionSection = document.createElement('section')
	albumSection.appendChild(albumAdditionSection)
	albumAdditionSection.innerHTML += addAlbumHtml
	const albumSubmitButton = albumSection.querySelector('.albumSubmit')
	const albumNameField = albumSection.querySelector('#name')
	const albumImageField = albumSection.querySelector('#image')
	albumSubmitButton.addEventListener('click', ()=>{
		const path = `/api/${artistId}/albums/add`
		addANewAlbum(albumNameField, albumImageField, path, allAlbums, artistId)
	})
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
		const eachSongSection = document.createElement('section')
		eachSongSection.classList.add('eachSongSection')
		songSection.appendChild(eachSongSection)
		const songHeader = document.createElement('h2')
		songHeader.innerText = `${song.name} - ${song.length}`
		//add an event listener here so that songs can display their length, etc...
		eachSongSection.appendChild(songHeader)
		
		//show rating
		const ratingSection = document.createElement('section')
		eachSongSection.appendChild(ratingSection)
		const ratingHTML = `<p>Rating: ${song.rating}</p>`
		ratingSection.innerHTML += ratingHTML
		//add ratings
		const ratingFields = `
			<button class="rating-submit-${song.id}">&#8679;</button>`
		ratingSection.innerHTML += ratingFields
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

		//show tags SONGS ONLY
		const tagSection = document.createElement('section')
		tagSection.classList.add(`tags-${song.id}`)
		eachSongSection.appendChild(tagSection)
		showTags(`/api/${artistId}/albums/${albumId}/songs/${song.id}/tags`, `.tags-${song.id}`)
		const tagSection2 = document.createElement('section')
		const tagFields = `
			<label> Add Tag: <input id="tagName" type="text" name="tagName"/> </label>
			<button class="tag-submit-${song.id}">Submit</button>
		`
		tagSection2.innerHTML += tagFields
		eachSongSection.appendChild(tagSection2)
		const tagButton = document.querySelector(`.tag-submit-${song.id}`)
		tagButton.addEventListener('click', () =>{
			makeTags(`api/${artistId}/albums/${albumId}/songs/${song.id}/tags/add` ,
					`/api/${artistId}/albums/${albumId}/songs/${song.id}/tags`, `.tags-${song.id}`, tagButton)
		})		
	
		//show comments SONGS ONLY
		const section = document.createElement('section')
		section.classList.add(`comments-${song.id}`)
		eachSongSection.appendChild(section)
		showComments(`/api/${artistId}/albums/${albumId}/songs/${song.id}/comments`, `.comments-${song.id}`)
		const commentSection = document.createElement('section')
		
		const commentFields = `
			<h3>Comment:</h3>
			<label>Username: <input id="commentUsername" type="text" name="commentUsername"/> </label>
			<label>Comment: <input id="commentContent" type="text" name="commentContent"/> </label>
			<button class="comment-submit-${song.id}">Submit</button>
		`
		commentSection.innerHTML += commentFields
		eachSongSection.appendChild(commentSection)
		const submitButton = document.querySelector(`.comment-submit-${song.id}`)
		submitButton.addEventListener('click', () => {
			makeComments(`/api/${artistId}/albums/${albumId}/songs/${song.id}/comments/add`,
					`/api/${artistId}/albums/${albumId}/songs/${song.id}/comments`, `.comments-${song.id}`, submitButton)
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


function addANewArtist(path, artistNameField, artistImageField, artistAgeField, artistHomeField){
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", path, true); //this is what this.responseText is
	const artist = JSON.stringify({
		name: artistNameField.value,
		image: artistImageField.value,
		age: artistAgeField.value,
		home: artistHomeField.value,
	})
	xhttp.send(artist)
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			artistNameField.value=''
			artistImageField.value=''
			artistAgeField.value=''
			artistHomeField.value = ''
			getArtists()
		}
	}
}


function addANewAlbum(albumNameField, albumImageField, path, allAlbums, artistId){
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			albumNameField.value = ''
			albumImageField.value = ''
			getAlbums(artistId)
		}
	}
	xhttp.open("POST", path, true); //this is what "this.responseText" is
	const content = JSON.stringify({
		name: albumNameField.value,
		image: albumImageField.value,
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

