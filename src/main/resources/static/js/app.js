const currentArtistId = window.location.pathname.split('/')[2]
const albumSubmitButton = document.querySelector('.albumSubmit')
const artistSubmitButton = document.querySelector('.artistSubmit')
const albumName = document.querySelector('#albumName')
const albumImage = document.querySelector('#albumImage')
const artistName = document.querySelector('#artistName')
const artistImage = document.querySelector('#artistImage')
const artistAge = document.querySelector('#artistAge')
const artistHome = document.querySelector('#artistHome')

albumSubmitButton.addEventListener('click', () => {
	addANewAlbum()
	console.log('AHHHHHHHH!')
})

artistSubmitButton.addEventListener('click', ()=>{
	addANewArtist()
})

function addANewAlbum(){
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			albumName.value = ''
			albumImage.value = ''
		}
	}
	xhttp.open("POST", `/api/artists/1/albums/add`, true); //this is what this.responseText is
	const content = JSON.stringify({
		name: albumName.value,
		image: albumImage.value,
	})
	
	xhttp.send(content)
}

function addANewArtist(){
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			artistName.value=''
			artistImage.value=''
			artistAge.value=''
			artistHome.value = ''
		}
	}
	xhttp.open("POST", `/api/artist/add`, true); //this is what this.responseText is
	const artist = JSON.stringify({
		name: artistName.value,
		image: artistImage.value,
		age: artistAge.value,
		home: artistHome.value,
	})
	
	xhttp.send(artist)
}


