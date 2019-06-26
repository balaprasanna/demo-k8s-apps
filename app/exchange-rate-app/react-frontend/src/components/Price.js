import React, {Component} from 'react';

class Price extends Component {
    render() {
      return (
        <div>
          <h2> 1 {this.props.fromSymbol} = {this.props.price} {this.props.toSymbol}</h2>
        </div>
      );
    }
  }

export default Price;