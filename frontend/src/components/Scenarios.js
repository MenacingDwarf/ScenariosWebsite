import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Scenarios extends Component {
    state = {
        selected_category: null,
        categories: null,
        scenarios: null,
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
        let category = e.target.innerHTML === "Все сценарии" ? null : e.target.innerHTML;
        this.setState({selected_category: category, scenarios: null});
        this.getScenarios(category);
    };

    componentDidMount() {
        this.getCategories();
        this.getScenarios();
        document.title = "Сценарии"
    }

    render() {
        let loading = <div className="spinner-border text-info mx-auto mt-3" role="status">
            <span className="sr-only">Loading...</span>
        </div>;
        let scenarios_list = this.state.scenarios === null ?
            loading : (
                this.state.scenarios.length !== 0 ? this.state.scenarios.map(scenario => {
                    return <div className="col-4">
                        <div className="card my-2" key={scenario.id}>
                            <img src={scenario.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <Link to={"/scenarios/" + scenario.id.toString()}
                                      className="non-a stretched-link"><h5 className="card-title">{scenario.title}</h5>
                                </Link>
                                <p className="card-text">{scenario.description}</p>
                            </div>
                            <div className="card-footer">
                                {scenario.categories.map((category, index) => {
                                    return <span
                                        className={"scenario-category"}>{index !== scenario.categories.length - 1 ? '\"' + category + '\", ' : '\"' + category + '\"'}</span>
                                })}
                            </div>
                        </div>
                    </div>

                }) : <div><i>В данной категории пока что нет сценариев</i></div>);
        let categories_list = this.state.categories === null ? null : this.state.categories.map((category, index) => {
            return <div className={"col-4"} key={index}>
                <div
                    className={"category-button" + (category.title === this.state.selected_category ? " active-category-button" : "")}
                    onClick={this.selectCategoryHandler}>{category.title}</div>
            </div>
        });
        let category_title = <div>
            <h3>Выбранная
                категория: {this.state.selected_category ? this.state.selected_category : "Все сценарии"}</h3>
        </div>;

        let content = this.state.categories === null ? loading : <div className={"col-12"}>
            <h2>Доступные категории</h2>
            <div className="row mb-2">
                <div className={"col-4"}>
                    <div
                        className={"category-button" + (this.state.selected_category === null ? " active-category-button" : "")}
                        onClick={this.selectCategoryHandler}>Все сценарии
                    </div>
                </div>
                {categories_list}
            </div>
            {category_title}
            <div className={"row"}>
                {scenarios_list}
            </div>
        </div>;
        return (
            <div className={"row"}>{content}</div>
        );
    }
}

export default Scenarios;