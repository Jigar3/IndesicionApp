import React from 'react'

export default class AddOption extends React.Component {

	state = {
		error: undefined
	}

	handleAddOption = (e) => {
		e.preventDefault();
		const option = e.target.elements.option.value.trim();
		const error = this.props.handleAddOption(option);
		e.target.elements.option.value = ''

		this.setState(() => ({ error: error }))

	}

	render() {
		return (
			<div>
				{this.state.error && <p className="add-option-error" >{this.state.error}</p>}
				<form onSubmit={this.handleAddOption} className="add-option" >
					<input type="text" name="option" className="add-option__input" />
					<button className="button" >Add Option</button>
				</form>
			</div>
		)
	}
}