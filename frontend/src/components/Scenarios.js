import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Scenarios extends Component {
    state = {
        selected_category: "Все сценарии",
        categories: [],
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

    getScenarios(category = null) {
        let sel_category = category === null ? this.state.selected_category : category;
        let comp = this;
        let xhr = new XMLHttpRequest();
        let cat_param = category !== null ? "?category=" + sel_category : "";
        xhr.open("GET", "/api/scenarios/" + cat_param, true);
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
    selectCategoryHandler = (e) => {
        let category = e.target.innerHTML;
        this.setState({selected_category: category});
        this.getScenarios(category);
    };

    componentDidMount() {
        this.getCategories();
        this.getScenarios();
        document.title = "Сценарии"
    }

    render() {
        let scenarios_list = this.state.scenarios.length !== 0 ? this.state.scenarios.map(scenario => {
            return <div className="card scenario-card" key={scenario.id}>
                <img src={scenario.image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{scenario.title}</h5>
                    <p className="card-text">{scenario.description}</p>
                </div>
                <div className="card-footer">
                    <Link to={"/scenarios/"+scenario.id.toString()} className="card-button btn btn-info stretched-link">Подробнее</Link>
                </div>
            </div>
        }) : <div><i>В данной категории пока что нет сценариев</i></div>;
        let categories_list = this.state.categories.map((category, index) => {
            return <div className={"col-4"} key={index}>
                <div className={"category-button"} onClick={this.selectCategoryHandler}>{category.title}</div>
            </div>
        });
        let category_title = this.state.selected_category ?
            <div>
                <h3>Выбранная категория: {this.state.selected_category}</h3>
            </div> : null;
        return (
            <div>
                <h2>Доступные категории</h2>
                <div className="row mb-2">{categories_list}</div>
                {category_title}
                <div className={"scenarios-container"}>
                    {scenarios_list}
                </div>
            </div>
        );
    }
}

export default Scenarios;