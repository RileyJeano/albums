const currentArtistId = window.location.pathname.split('/')[2]

const albumSubmitButton = document.querySelector('.albumSubmit')
const albumName = document.querySelector('#albumName')
const albumImage = document.querySelector('#albumImage')

albumSubmitButton.addEventListener('click', () => {
	addANewAlbum()
	console.log('AHHHHHHHH!')
})

function addANewAlbum(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log((this.responseText))
		}
	}
	xhttp.open("POST", `/api/artists/1/albums/add`, true); //this is what this.responseText is
	const content = JSON.stringify({
		name: albumName.value,
		image: albumImage.value,
	})
	
xhttp.send(content)
}