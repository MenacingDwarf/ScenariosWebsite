import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        let current = <span className="sr-only">(current)</span>;
        let path = window.location.pathname.toString();
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-info p-4">
                <Link className="navbar-brand" to="/">
                    Лестница в небо
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className={"nav-link active"} to={"/"}>Главная</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={"nav-link"} to={"/scenarios"}>Сценарии</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/photos"}>Фотогалерея</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/rewards"}>Достижения</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/contacts"}>Контакты</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search"
                               aria-label="Search"/>
                        <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        );
    }
}

export default Header;