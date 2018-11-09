class AddAlbum {
	constructor() {}
	render() {
		return `
			<section class="addAlbum"> 
				<p>Add Album: </p>
				<label> Album Name: <input id="albumName" type="text" name="albumName"/> </label>
				<label> Album Image: <input id="albumImage" type="text" name="albumImage"/> </label>
				<button class="albumSubmit">Submit</button>
			</section>
		`
	}
}


module.exports = {
	AddAlbum
}