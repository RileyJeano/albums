class AddRating {
	constructor() {}
	render() {
		return `
			<section class="addRating"> 
				<p>Add Rating: </p>
				<label> Rating: <input id="rating" type="number" name="rating"/> </label>
				<button class="ratingSubmit">Submit</button>
			</section>
		`
	}
}


module.exports = {
	AddRating
}