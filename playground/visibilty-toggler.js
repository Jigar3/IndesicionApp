// let visibilty = false

// const visibiltyToggle = () => {
//     visibilty = !visibilty;
//     render()
// }

// const render = () => {
//     const template = (
//         <div>
//             <h1>Visibilty Toggle</h1>
//             <button onClick={visibiltyToggle}>
//                 {visibilty ? 'Hide Details' : 'Show Details'}    
//             </button>
//             {visibilty && (
//                 <div>
//                     <p>Here are some details</p>
//                 </div>
//             )}
//         </div>
//     )
    
//     ReactDOM.render(template, document.getElementById("app"))
// }

// render()

class VisibiltyToggle extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this)
        this.state = {
            visibilty: false
        }
    }

    toggle() {
        this.setState((prevState) => {
            return {
                visibilty : !(prevState.visibilty)
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Visibilty Toggle</h1>
                <button onClick={this.toggle} >
                    {this.state.visibilty ? "Hide Details" : "Show Details"}
                </button>
                {this.state.visibilty && <p>Here are some details</p>}
            </div>
        )
    }
}

ReactDOM.render(<VisibiltyToggle/>, document.getElementById("app"))