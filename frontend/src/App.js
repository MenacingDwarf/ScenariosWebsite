import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import Scenarios from "./components/Scenarios";
import ScenarioPage from "./components/ScenarioPage";
import EmptyPage from "./components/EmptyPage";

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
                        <Route exact path={'/scenarios'} component={Scenarios}/>
                        <Route path={'/scenarios/:scenario_id'} component={ScenarioPage}/>
                        <Route path={'/photos'} component={EmptyPage}/>
                        <Route path={'/contacts'} component={EmptyPage}/>
                        <Route path={'/rewards'} component={EmptyPage}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;