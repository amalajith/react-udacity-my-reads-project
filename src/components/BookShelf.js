import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class BookShelf extends Component {
    render(){
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">

                        {currentlyReading.map((book) => (
                            <li key={book.id}>
                                <Book book={book}
                                      onShelfChange={this.handleShelfChange}
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
    books : PropTypes.array.isRequired
}