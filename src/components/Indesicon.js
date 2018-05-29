import React from 'react'

import AddOption from './AddOption'
import Header from './Header'
import Action from './Action'
import Options from './Options'
import OptionModal from './OptionModal'

class IndesicionApp extends React.Component {

	state = {
		options : [],
		selectedOption: undefined
	}

	componentDidMount() {
		try {
			const json = localStorage.getItem("options")
			const options = JSON.parse(json)

			if(options) {
				this.setState(() => ({ options: options }))
			}
		} catch(e) {
			console.log(e)
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options)
			localStorage.setItem("options", json);	
		}
	}

	componentWillUnmount() {
		console.log("Will Unmount")
	}

	handleDelete = () => {
		this.setState(() => ({ options: [] }));
	}

	handleSelectedOption = () => {
		this.setState(() => ({ selectedOption: undefined }))
	}

	handlePick = () => {
		const randomNum = Math.floor(Math.random() * this.state.options.length)
		const option = this.state.options[randomNum]
		this.setState(() => (
			{
				selectedOption: option
			}
		))
	}

	handleDeleteOption = (optionToRemove) => {
		this.setState((prevState) => ({
			options: prevState.options.filter((option) => optionToRemove !== option )
		}))
	}

	handleAddOption = (option) => {
		if(!option) {
			return 'Enter Valid value to add item'
		}

		else if(this.state.options.indexOf(option) > -1) {
			return 'This option already exists'
		}
		
		this.setState((prevState) => ({ options: prevState.options.concat(option) }))
	}

	render() {
		const subtitle = "Put your life in hands of computer"
		return (
			<div>
				<Header subtitle= {subtitle} />
				<div className="container">
					<Action 
						hasOptions={this.state.options.length > 0} 
						handlePick={this.handlePick}
					/>
					<div className="widget" >
						<Options 
							options={this.state.options} 
							handleDeleteOptions={this.handleDelete}
							handleDeleteOption={this.handleDeleteOption}
						/>
						<AddOption 
							handleAddOption={this.handleAddOption}
						/>
					</div>
				</div>
				
				<OptionModal 
					selectedOption={this.state.selectedOption}
					handleSelectedOption={this.handleSelectedOption}
				/>
			</div>
		)
	}
}

export {
    IndesicionApp as default
}