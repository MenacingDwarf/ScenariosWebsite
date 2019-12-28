import React, {Component} from 'react';

class Photo extends Component {
    render() {
        let {photo, index} = this.props;
        return (
            <div>
                <a className={"img-a"} data-toggle="modal" data-target={"#photoModal" + index.toString()}>
                    <img className={"w-100"} src={photo.image} alt="photo"/>
                </a>
                <div className="modal fade" id={"photoModal" + index.toString()} tabIndex="-1" role="dialog"
                     aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 className="modal-title">{photo.title}</h5>
                                <img className={"w-100 mb-2"} src={photo.image} alt="photo"/>
                                {photo.scenario ? <p>Спектакль {photo.scenario}</p> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Photo;