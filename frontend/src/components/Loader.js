import React, {Component} from 'react';

class Loader extends Component {
    render() {
        return (
            <div className="spinner-border text-info mx-auto mt-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
}

export default Loader;