class AddArtist {
	constructor() {}

	render() {
		return `
				<section class="addArtist"> 
					<p>Add Artist: </p>
					<label> Artist Name: <input id="artistName" type="text" name="artistName"/> </label>
					<label> Artist Image: <input id="artistImage" type="text" name="artistImage"/> </label>
					<label> Artist Age: <input id="artistAge" type="text" name="artistAge"/> </label>
					<label> Artist Home: <input id="artistHome" type="text" name="artistHome"/> </label>
					<button class="artistSubmit">Submit</button>
				</section>
		`
	}
}

module.exports = {
	AddArtist
}