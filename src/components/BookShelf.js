import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

export default class BookShelf extends Component {
    render(){
        const books = this.props.books
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Book book={book}
                                      onShelfChange={this.props.handleShelfChange}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired
}