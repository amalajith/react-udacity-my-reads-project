import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Book extends Component {
    render(){
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={{ width: 128, height: 193, backgroundImage: `url(${this.props.image}` }}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                {this.props.authors.map(author => (
                    <div className="book-authors">{author}</div>
                ))}
            </div>
        )
    }
}

Book.propTypes = {
    image : PropTypes.string.isRequired,
    shelf : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    authors : PropTypes.array.isRequired
}