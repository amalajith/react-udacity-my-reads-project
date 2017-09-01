import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Book extends Component {
    render(){
        const book = this.props.book;
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}` }}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(e) => this.props.onShelfChange(e,book)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && book.authors.map((author,index) => (
                    <div key={index} className="book-authors">{author}</div>
                ))}
            </div>
        )
    }
}


Book.propTypes = {
    book : PropTypes.shape(
        {
            imageLinks : PropTypes.object.isRequired,
            shelf : PropTypes.string,
            title : PropTypes.string.isRequired,
            authors : PropTypes.array,
        }
    ),
    onShelfChange : PropTypes.func.isRequired
}