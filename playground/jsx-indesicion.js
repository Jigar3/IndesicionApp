console.log('App.js is running')

let app = {
	title : "Indesicion App",
	subtitle : "Get your ideas down",
	options : []
}

const onFormSubmit = (e) => {
	e.preventDefault();

	const option = e.target.elements.option.value;

	if(option) {
		app.options.push(option);
		e.target.elements.option.value = '';
		renderApp();
	}
}

const wipeArray = () => {
	app.options = []
	renderApp()
}

const onMakeDesicion = () => {
	const randomNum = Math.floor(Math.random() * app.options.length);
	const option = app.options[randomNum]
	alert(option)
}

const renderApp = () => {
	const template = (
		<div>
			<h1>{app.title}</h1>
			{app.subtitle && <p>{app.subtitle}</p>}
			<p>{app.options.length > 0 ? 'Here are your options' : "No options"}</p>
			<button onClick={onMakeDesicion} disabled={app.options.length === 0
			} >What should I do?</button>
			<button onClick={wipeArray} >Remove All</button>
			<ol>
				{
					app.options.map((option) => <li key={option} >{option}</li> )
				}
			</ol>
			<form onSubmit={onFormSubmit} >
				<input type="text" name="option" />
				<button>Add Option</button>
			</form>
		</div>
	)
	
	ReactDOM.render(template, document.getElementById("app"))
}

renderApp()