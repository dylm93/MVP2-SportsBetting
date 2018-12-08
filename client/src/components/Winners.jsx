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
            winners: 'NFL1: Carolina Panthers,NBA8: Los Angeles Lakers'
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