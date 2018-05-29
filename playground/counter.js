// let count = 0
// const addOne = () => {
// 	count++;
// 	renderCounterApp();
// };

// const minusOne = () => {
// 	count--;
// 	renderCounterApp();
// };

// const reset = () => {
// 	count = 0;
// 	renderCounterApp();
// };

// const renderCounterApp = () => {
// 	const templateTwo = (
// 		<div>
// 			<h1>Count: {count}</h1>
// 			<button onClick={addOne} >+1</button>
// 			<button onClick={minusOne} >-1</button>
// 			<button onClick={reset} >reset</button>
// 		</div>
// 	);

// 	ReactDOM.render(templateTwo, document.getElementById("app"));
// }

// renderCounterApp();

class Counter extends React.Component {

	constructor(props) {
		super(props);

		this.plusOne = this.plusOne.bind(this)
		this.minusOne = this.minusOne.bind(this)
		this.reset = this.reset.bind(this)
		this.state = {
			count: 0
		}
	}

	componentDidMount() {
		try {
			const json = localStorage.getItem("count")
			const number = parseInt(json, 10)

			if(!isNaN(number)) {
				this.setState(() => ({ count: number}))
			}

		} catch(e) {
			console.log(e)
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.count !== this.state.count) {
			localStorage.setItem("count", this.state.count)
		}
	}

	plusOne() {
		this.setState((prevState) => {
			return {
				count: prevState.count + 1
			};
		});
	}

	minusOne() {
		this.setState((prevState) => {
			return {
				count: prevState.count - 1
			};
		});
	}

	reset() {
		this.setState((prevState) => {
			return {
				count: 0
			}
		})
	}

	render() {
		return (
			<div>
				<h1>Count: {this.state.count} </h1>
				<button onClick={this.plusOne} >+1</button>
				<button onClick={this.minusOne} >-1</button>
				<button onClick={this.reset} >reset</button>
			</div>
		)
	}
}

ReactDOM.render(<Counter/>, document.getElementById("app"))
