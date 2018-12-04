import React from 'react';

 class Money extends React.Component {
    constructor (props) {
        super (props);
    this.state = {
        money: 500
    }
}

render () {
    return (
        <div className = 'money'>
            Balance: ${this.state.money}
        </div>
    )
}

}

export default Money;
   

