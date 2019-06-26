import React, {Component} from 'react';
import './dashboard.css';
import Price from './Price';
import Graph from './Graph';

class Dashboard extends Component {

  // URL_SYMBOL = 'http://localhost:5000/symbols'
  // URL_PRICE = 'http://localhost:5000/price'
  // URL_HISTORY = 'http://localhost:5000/history'

  URL_SYMBOL = '/symbols'
  URL_PRICE = '/price'
  URL_HISTORY = '/history'

  constructor(props) {
    super(props);

    this.state = {
      fromSymbol: 'USD',
      toSymbol: 'SGD',
      symbols: [],
      result: '',
      history: []
    };

    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.gethistory = this.gethistory.bind(this);
    this.getlatestprice = this.getlatestprice.bind(this);

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
    this.gethistory()
  }
  handleChangeTo(event) {
    this.setState({toSymbol: event.target.value});
    this.getlatestprice()
    this.gethistory()
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

  gethistory(){
    fetch(`${this.URL_HISTORY}?fsym=${this.state.fromSymbol}&tsym=${this.state.toSymbol}&limit=1000`)
      .then(resp => resp.json())
      .then((data) => {
        let records = data["Data"]
        
        this.setState( { history: records })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleSubmit(event) {
    this.getlatestprice()
    this.gethistory()
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
        
        <div className="graph">
          <Graph data={this.state.history} > </Graph>
        </div>
      </div>
    );
  }
}

export default Dashboard;