class IndesicionApp extends React.Component {

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this)
		this.handlePick = this.handlePick.bind(this)
		this.handleAddOption = this.handleAddOption.bind(this)
		this.handleDeleteOption = this.handleDeleteOption.bind(this)
		this.state = {
			options : []
		}
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

	handleDelete() {
		this.setState(() => ({ options: [] }));
	}

	handlePick() {
		const option = Math.floor(Math.random() * this.state.options.length)
		alert(this.state.options[option])
	}

	handleDeleteOption(optionToRemove) {
		this.setState((prevState) => ({
			options: prevState.options.filter((option) => optionToRemove !== option )
		}))
	}

	handleAddOption(option) {
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
				<Action 
					hasOptions={this.state.options.length > 0} 
					handlePick={this.handlePick}
				/>
				<Options 
					options={this.state.options} 
					handleDeleteOptions={this.handleDelete}
					handleDeleteOption={this.handleDeleteOption}
				/>
				<AddOption 
					handleAddOption={this.handleAddOption}
				/>
			</div>
		)
	}
}

const Header = (props) => {
	return (
		<div>	
			<h1>{props.title}</h1>
			{props.subtitle && <h2> {props.subtitle} </h2>}
		</div>
	)
}

Header.defaultProps = {
	title: 'Indesicion'
}


const Action = (props) => {
	return (
		<div>
			<button onClick={props.handlePick} disabled={!props.hasOptions} >
				What should I do?
			</button>
		</div>
	)
}

const Options = (props) => {
	return (
		<div>
			<button onClick={props.handleDeleteOptions} disabled={!props.options.length} >Remove All</button>
			{props.options.length === 0 && <p>Please add an option to get started</p> }
			{
				props.options.map((option) => 
					(
						<Option 
							key={option} 
							optionText={option} 
							handleDeleteOption={props.handleDeleteOption}
						/> 
					)
				)
			}
		</div>
	)
}

class AddOption extends React.Component {

	constructor(props) {
		super(props)
		this.handleAddOption = this.handleAddOption.bind(this)
		this.state = {
			error: undefined
		}
	}

	handleAddOption(e) {
		e.preventDefault();

		const option = e.target.elements.option.value.trim();
		const error = this.props.handleAddOption(option);
		e.target.elements.option.value = ''

		this.setState(() => ({ error: error }))

	}

	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.handleAddOption} >
					<input type="text" name="option" />
					<button>Submit</button>
				</form>
			</div>
		)
	}
}

const Option = (props) => {
	return (
		<div>
			{props.optionText}
			<button 
				onClick={(e) => {
					props.handleDeleteOption(props.optionText)
				}}
			> 
			Remove </button>
		</div>
	)
}

ReactDOM.render(<IndesicionApp />, document.getElementById("app"))