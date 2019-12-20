import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import Category from "./components/Category";

class App extends Component {
    state = {
        categories: [],
    };

    getCategories() {
        let comp = this;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", '/api/categories', true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            var answer = JSON.parse(decodeURIComponent(this.responseText));
            comp.setState({
                categories: answer.data
            });
        };

        xhr.send();
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header categories={this.state.categories}/>
                    <div className="main-content container bg-light">
                        <Route exact path='/' component={MainPage}/>
                        <Route path={'/scenarios'} component={Category}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;