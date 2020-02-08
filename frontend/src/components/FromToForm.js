import React, {Component} from 'react';

class FromToForm extends Component {
    render() {
        const {title, id, from, to, className} = this.props;
        return (
            <div className={className}>
                <div className={"mb-2"}><b>{title}</b></div>
                <div className="form-group row">
                    <label htmlFor={"start-" + id}
                           className="col-auto col-form-label col-form-label-sm">от</label>
                    <div className="col-4">
                        <input type="text" className="form-control" id={"start-" + id} placeholder={from}/>
                    </div>
                    <label htmlFor={"end-" + id}
                           className="col-auto col-form-label col-form-label-sm">до</label>
                    <div className="col-4">
                        <input type="text" className="form-control" id={"end-" + id} placeholder={to}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FromToForm;