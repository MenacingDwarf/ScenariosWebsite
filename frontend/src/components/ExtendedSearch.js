import React, {Component} from 'react';
import FromToForm from "./FromToForm";

class ExtendedSearch extends Component {
    render() {
        let colClass = "col-12 col-lg-4 col-xl-4";
        return (
            <div className="row mb-2">
                <div className="col-12">
                    <button type="button" className="btn btn-info mb-2" data-toggle="collapse"
                            data-target="#filter-panel">
                        <i className="fas fa-cog"/> Раширенные настройки
                    </button>
                    <form id="filter-panel" className="collapse">
                        <div className="form-row">
                            <FromToForm title={"Цена, ₽"} id={"price"} className={colClass}/>
                            <FromToForm title={"Количество актёров"} id={"actors"} className={colClass}/>
                            <FromToForm title={"Длительность (минуты)"} id={"duration"} className={colClass}/>
                        </div>
                        <button className="btn btn-info">Применить</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ExtendedSearch;