class ShowArtists {
	constructor(artistSection){
		this.artistSection = artistSection
	}

	render() {
		return 'heeey'
	}

	getArtists() {
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

	showArtists(allArtists) {
		artistSection.innerHTML = ''
		allArtists.forEach(artist => {
			const artistHeader = document.createElement('h1')
			artistHeader.innerText = artist.name
			artistHeader.addEventListener('click', function() {getAlbums(artist.id)})
			artistSection.appendChild(artistHeader)
			console.log(artistSection)
			console.log('we went all the way')
		})
	}


}

module.exports = {
	ShowArtists
}