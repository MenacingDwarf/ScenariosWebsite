import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        let categories = this.props.categories;
        let categories_list = categories.map(category => {
            return <Link key={category.id} className="dropdown-item"
                      to={"/scenarios/" + category.title}>{category.title}</Link>
        });
        return (
            <header className="navbar navbar-expand-lg navbar-dark bg-info p-4">
                <Link className="navbar-brand" to="/">
                    Лестница в небо
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/"}>Главная <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Сценарии
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                {categories_list}
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Фотогалерея</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Достижения</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Контакты</a>
                        </li>
                    </ul>
                </div>
            </header>
        );
    }
}

export default Header;