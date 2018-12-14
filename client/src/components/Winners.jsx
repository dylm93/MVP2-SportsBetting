import React from 'react';
import axios from 'axios';

class Winners extends React.Component {
    constructor (props) {
        super(props)
    }

    componentDidMount () {
        // this.postWinners();
    }


    postWinners () {
        axios.post('/winners', {
            winners: 'NBA1: Los Angeles Lakers,NBA2: Los Angeles Clippers'
        })
    }



    render () {
        return (
            <div>

            </div>
        )
    }
}

export default Winners;