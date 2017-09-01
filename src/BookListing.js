import React, { Component } from 'react'
import * as _ from 'lodash'
import {Link} from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import BookShelf from './components/BookShelf'
import * as BooksAPI from './BooksAPI'

export default class BookListing extends Component {

    state = {
        books: [],
        loadingComplete: false
    }

    componentDidMount() {
        this.getAllBooks();
    }

    getAllBooks = () => {
        BooksAPI.getAll()
            .then((books) => {
                this.setState({
                    books,
                    loadingComplete: true
                })
            })
    }

    handleShelfChange = (e, selectedBook) => {
        const newShelf = e.target.value
        const books = this.state.books.map(book => {
            if(book.id === selectedBook.id){
                return {
                    ...book,
                    shelf: newShelf
                }
            }else{
                return {
                    ...book
                }
            }
        })
        this.setState({ books })
        BooksAPI.update(selectedBook, newShelf).then(res => {
            // this.getAllBooks()
        })
    }

    render() {

        const currentlyReading = this.state.books.filter((book) => book.shelf === 'currentlyReading')
        const wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead')
        const read = this.state.books.filter((book) => book.shelf === 'read')

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {this.state.loadingComplete ? (
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
                    ) : (
                        <div>
                            <Loader active inline='centered' />
                        </div>
                    ) }
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