import React, {Component} from 'react'
import * as _ from 'lodash'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from "./Book"

export default class BookShelf extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        this.getAllBooks();
    }

    getAllBooks = () => {
        BooksAPI.getAll()
            .then((books) => {
                const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
                const wantToRead = books.filter((book) => book.shelf === 'wantToRead')
                const read = books.filter((book) => book.shelf === 'read')
                this.setState({
                    currentlyReading,
                    wantToRead,
                    read
                })
            })
    }

    handleShelfChange = (e, selectedBook) => {
        const newShelf = e.target.value
        BooksAPI.update(selectedBook, newShelf).then(res => {
            this.getAllBooks()
        })
    }

    render() {

        const currentlyReading = this.state.currentlyReading
        const wantToRead = this.state.wantToRead
        const read = this.state.read

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
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
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {wantToRead.map((book) => (
                                        <li key={book.id}>
                                            <Book book={book}
                                                  onShelfChange={this.handleShelfChange}
                                            />
                                        </li>
                                    ))}

                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {read.map((book) => (
                                        <li key={book.id}>
                                            <Book book={book}
                                                  onShelfChange={this.handleShelfChange}
                                            />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">
                        Add a book
                    </Link>
                </div>
            </div>
        )
    }
}