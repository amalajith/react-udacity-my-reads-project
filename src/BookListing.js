import React, {Component} from 'react'
import * as _ from 'lodash'
import {Link} from 'react-router-dom'
import BookShelf from './components/BookShelf'
import * as BooksAPI from './BooksAPI'

export default class BookListing extends Component {
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

                        {/*Currently reading*/}
                        <BookShelf shelfName={'Currently reading'}
                                   books={currentlyReading}
                                   handleShelfChange={this.handleShelfChange}/>

                        {/*Want to read*/}
                        <BookShelf shelfName={'Want to read'}
                                   books={wantToRead}
                                   handleShelfChange={this.handleShelfChange}/>

                        {/*Read*/}
                        <BookShelf shelfName={'Read'}
                                   books={read}
                                   handleShelfChange={this.handleShelfChange}/>

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