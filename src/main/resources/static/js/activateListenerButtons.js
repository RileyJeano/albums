function activateListeningPowers(button, thingToDo){
	button.addEventListener('click', thingToDo)
}


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

function addANewSong() {
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

module.exports = {
	activateListeningPowers,
	addANewArtist,
	addANewAlbum,
	addANewSong
}