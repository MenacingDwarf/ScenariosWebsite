import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Loader from "./Loader";
import ExtendedSearch from "./ExtendedSearch";

class Scenarios extends Component {
    state = {
        selected_category: null,
        categories: null,
        scenarios: null,
        page: 1,
        pages_num: 1
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

    getScenarios(category = null, page = null) {
        let sel_category = category === null ? this.state.selected_category : category;
        let sel_page = page === null ? this.state.page.toString() : page.toString();
        let comp = this;
        let xhr = new XMLHttpRequest();
        let cat_param = category !== null ? "?category=" + sel_category + "&page=" + sel_page : "?page=" + sel_page;
        xhr.open("GET", "/api/scenarios/" + cat_param, true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            var answer = JSON.parse(decodeURIComponent(this.responseText));
            console.log(answer);
            comp.setState({
                scenarios: answer.data,
                pages_num: answer.pages_num
            });
        };

        xhr.send();
    }

    selectCategoryHandler = (e) => {
        let category = e.target.innerHTML === "Все сценарии" ? null : e.target.innerHTML;
        this.setState({selected_category: category, scenarios: null, page: 1});
        this.getScenarios(category, null);
    };

    selectPageHandler = (e) => {
        let page = parseInt(e.target.innerHTML);
        console.log(page);
        this.setState({scenarios: null, page: page});
        this.getScenarios(null, page);
    };

    componentDidMount() {
        this.state.selected_category = this.props.selectedCategory;
        this.props.selectCategory(null);

        this.getCategories();
        this.getScenarios(this.state.selected_category);

        this.props.setActiveLink(2);
        document.title = "Сценарии"
    }

    render() {
        let scenarios_list = this.state.scenarios === null ? <div className={"row"}><Loader/></div> : (
            this.state.scenarios.length !== 0 ? (
                <div className={"row"}>
                    {/*<div className="col-12"><ExtendedSearch/></div>*/}
                    {this.state.scenarios.map(scenario => {
                        return <div className="col-12 col-lg-6 col-xl-4" key={scenario.id}>
                            <div className="card my-2" key={scenario.id}>
                                <img src={scenario.image} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <Link to={"/scenarios/" + scenario.id.toString()}
                                          className="non-a stretched-link"><h5
                                        className="card-title">{scenario.title}</h5>
                                    </Link>
                                    <p className="card-text">{scenario.description}</p>
                                </div>
                                <div className="card-footer text-center">
                                    <b>{scenario.price} руб.</b>
                                </div>
                            </div>
                        </div>

                    })}
                </div>) : <div className="col-12"><i>В данной категории пока что нет сценариев</i></div>);
        let categories_list = this.state.categories === null ? null : this.state.categories.map((category, index) => {
            return <div className={"col-6 col-lg-4 col-xl-3"} key={index}>
                <div
                    className={"category-button" + (category.title === this.state.selected_category ? " active-category-button" : "")}
                    onClick={this.selectCategoryHandler}>{category.title}</div>
            </div>
        });
        let category_title = <div>
            <h3>Выбранная
                категория: {this.state.selected_category ? this.state.selected_category : "Все сценарии"}</h3>
        </div>;
        let pages_buttons = [];
        for (let i = 1; i < this.state.pages_num + 1; i++) {
            pages_buttons[i] = i === this.state.page ? <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">{i} <span className="sr-only">(current)</span></a>
                </li> :
                <li className="page-item"><a className={"page-link"} onClick={this.selectPageHandler} href="#">{i}</a>
                </li>
        }
        let pages_bar = this.state.scenarios ? (this.state.pages_num > 1 ? <nav aria-label="...">
            <ul className="pagination">
                {pages_buttons}
            </ul>
        </nav> : null) : null;
        let content = this.state.categories === null ? <Loader/> : <div className={"col-12"}>
                <h2>Доступные категории</h2>
                <div className="row mb-2">
                    <div className={"col-6 col-lg-4 col-xl-3"}>
                        <div
                            className={"category-button" + (this.state.selected_category === null ? " active-category-button" : "")}
                            onClick={this.selectCategoryHandler}>Все сценарии
                        </div>
                    </div>
                    {categories_list}
                </div>
                <div className="row">
                    <div className="col-12">
                        {category_title}
                        {scenarios_list}
                        {pages_bar}
                    </div>
                </div>
            </div>
        ;

        return (

            <div className={"row"}>{content}</div>
        )
            ;
    }
}

export default Scenarios;