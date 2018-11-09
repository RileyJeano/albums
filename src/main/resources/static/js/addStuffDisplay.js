class AddStuffDisplay {

	constructor(section){
		this.section = section
	}

	render() {
		return `
			<button id="toggle-input-display-button">Toggle Input Display</button>
		`
	}

	activateButton(button) {
		button.addEventListener('click', function(){
			if (section.style.display == none){
				section.style.display = block
			} else {
				section.style.display = none
			}
		})
	}


}

module.exports = {
	AddStuffDisplay
}