import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Book extends Component {
    render() {
        const book = this.props.book;
        return (
            <div className="book">
                <div className="book-top">
                    <img className="book-cover"
                         src={book.imageLinks.thumbnail}/>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(e) => this.props.onShelfChange(e, book)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
            </div>
        )
    }
}


Book.propTypes = {
    book: PropTypes.shape(
        {
            imageLinks: PropTypes.object.isRequired,
            shelf: PropTypes.string,
            title: PropTypes.string.isRequired,
            authors: PropTypes.array,
        }
    ),
    onShelfChange: PropTypes.func.isRequired
}