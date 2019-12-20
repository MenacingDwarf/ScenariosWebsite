import React, {Component} from 'react';

class Category extends Component {
    state = {
        title: "",
        description: "",
        scenarios: []
    };
    getCategory() {
        let comp = this;
        let xhr = new XMLHttpRequest();
        let pathname = window.location.pathname.toString();
        let category = pathname.substr(11, pathname.length);
        xhr.open("GET", '/api/categories/?category='+category, true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            var answer = JSON.parse(decodeURIComponent(this.responseText));
            comp.setState({
                title: answer.data.title,
                description: answer.data.description
            });
        };

        xhr.send();
    }

    componentDidMount() {
        this.getCategory();
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>{this.state.description}</p>
            </div>
        );
    }
}

export default Category;