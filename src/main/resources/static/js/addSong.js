class AddSong {
	constructor() {}

	render() {
		return `
			<section class="addSong">
				<p>Add Song:</p>
				<label> Song Name: <input id="songName" type="text" name="songName"/> </label>
				<label> Song Length: <input id="songLength" type="text" name="songLength"/> </label>
				<label> Song Link: <input id="songLink" type="text" name="songLink"/> </label>
				<button class="songSubmit">Submit</button>
			</section>
		`
	}
}

module.exports = {
	AddSong
}