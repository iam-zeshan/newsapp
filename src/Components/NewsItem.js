import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, url, author, date, source } = this.props;
        return (
            <div>
                <div className="card">
                    <div style={{display: 'flex', justifyContent:'flex-end', position: 'absolute'}}>
                        <span className='badge rounded-pill bg-warning'>{source}</span>
                    </div>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">{author} on {new Date(date).toUTCString()}</small></p>
                        <a rel="noreferrer" href={url} target="_blank" className="btn btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}
