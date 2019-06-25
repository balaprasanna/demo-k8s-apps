import React, {Component} from 'react';
import './dashboard.css';
import Price from './Price';

class Dashboard extends Component {

  URL_SYMBOL = '/symbols'
  URL_PRICE = '/price'

  constructor(props) {
    super(props);

    this.state = {
      fromSymbol: 'USD',
      toSymbol: 'SGD',
      symbols: [],
      result: ''
    };

    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(){
    console.log("Making API Call /symbols ")
    fetch(this.URL_SYMBOL)
      .then(resp => resp.json())
      .then((data) => {
        this.setState( { symbols: data })
      })
      .catch((err) => {
        console.log(err)
      })

  }

  handleChangeFrom(event) {
    this.setState({fromSymbol: event.target.value});
    this.getlatestprice()
  }
  handleChangeTo(event) {
    this.setState({toSymbol: event.target.value});
    this.getlatestprice()
  }

  getlatestprice(){
    fetch(`${this.URL_PRICE}?from=${this.state.fromSymbol}&to=${this.state.toSymbol}`)
      .then(resp => resp.json())
      .then((data) => {
        this.setState( { result: data[Object.keys(data)] }) /* data[this.state.toSymbol] */
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleSubmit(event) {
    this.getlatestprice()
    event.preventDefault();
  }

  render() {
    return (
      <div className="dashbox">
        <form onSubmit={this.handleSubmit}>
          <h3> Pick Your  </h3>
          <label>
            From Symbol : &nbsp; 
            <select value={this.state.fromSymbol} onChange={this.handleChangeFrom}>
              { 
                this.state.symbols.map((value, index) => { return <option key={index} value={value}>{value}</option>})
              }
            </select>
          </label>
          
          &nbsp;

          <label>
            To Symbol : &nbsp; 
            <select value={this.state.toSymbol} onChange={this.handleChangeTo}>
              { 
                this.state.symbols.map((value, index) => { return <option key={index} value={value}>{value}</option>})
              }
            </select>
          </label>
          
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
        
        <Price fromSymbol={this.state.fromSymbol} toSymbol={this.state.toSymbol} price={this.state.result}> </Price>
      </div>
    );
  }
}

export default Dashboard;