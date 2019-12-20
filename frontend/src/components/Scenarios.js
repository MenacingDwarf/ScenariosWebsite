import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Scenarios extends Component {
    state = {
        title: "",
        description: "",
        scenarios: []
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

    getScenarios() {
        let comp = this;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", '/api/scenarios/', true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            var answer = JSON.parse(decodeURIComponent(this.responseText));
            console.log(answer);
            comp.setState({
                scenarios: answer.data
            });
        };

        xhr.send();
    }

    componentDidMount() {
        this.getScenarios();
        document.title = "Сценарии"
    }

    render() {
        let scenarios_list = this.state.scenarios.map(scenario => {
            return <div className="card scenario-card" key={scenario.id}>
                <img src={scenario.image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{scenario.title}</h5>
                    <p className="card-text">{scenario.description}</p>
                </div>
                <div className="card-footer">
                    <Link to={"/scenarios/"+scenario.id.toString()} className="card-button btn btn-info">Подробнее</Link>
                </div>
            </div>
        });
        return (
            <div className={"scenarios-container"}>
                {scenarios_list}
            </div>
        );
    }
}

export default Scenarios;