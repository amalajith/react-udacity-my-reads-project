import React, { Component } from 'react'
import * as _ from 'lodash'
import { Link } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './components/BookShelf'

export default class Search extends Component {

    state = {
        currentBooksInShelf: [],
        searchTerm : '',
        searchResults: [],
        searchInprogress: false
    }

    componentDidMount() {
        this.getAllBooks();
    }

    getAllBooks = () => {
        BooksAPI.getAll()
            .then((books) => {
                this.setState({ currentBooksInShelf: books })
            })
    }

    updateQuery = (searchTerm) => {

        this.setState({ searchTerm })
        if(searchTerm === ''){
            return
        }
        this.setState({
            searchResults: [],
            searchInprogress:true
        },() => {
            BooksAPI.search(searchTerm,10)
                .then(books => {

                    if(books){
                        //Handle if no results come
                        if(books.error){
                            this.setState({
                                searchResults: [],
                                searchInprogress: false
                            })
                            return
                        }
                        if(books.length > 0){
                            const searchResults = books.map(book => {
                                const existingBook = _.find(this.state.currentBooksInShelf, (currentBook) => { return currentBook.id === book.id })
                                if(existingBook){
                                    return {
                                        ...book,
                                        shelf: existingBook.shelf
                                    }
                                }else{
                                    return {
                                        ...book,
                                        shelf: 'none'
                                    }
                                }
                            })

                            this.setState({
                                searchInprogress: false,
                                searchResults
                            })
                        }

                    }
                })
        })

    }

    handleShelfChange = (e, selectedBook) => {
        const newShelf = e.target.value

        const searchResults = this.state.searchResults.map(book => {
            if(selectedBook.id === book.id){
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

        this.setState({ searchResults })

        BooksAPI.update(selectedBook, newShelf).then(res => {})
    }

    render() {
        const currentlyReading = this.state.searchResults.filter((book) => book.shelf === 'currentlyReading')
        const wantToRead = this.state.searchResults.filter((book) => book.shelf === 'wantToRead')
        const read = this.state.searchResults.filter((book) => book.shelf === 'read')
        const none = this.state.searchResults.filter((book) => book.shelf === 'none')

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.searchTerm} onChange={(event)=> this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.searchInprogress && (
                        <div>
                            <Loader active inline='centered' />
                        </div>
                    )}

                    {this.state.searchResults.length > 0 && (
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
                            {/*None*/}
                            <BookShelf shelfName={'New books'}
                                       books={none}
                                       handleShelfChange={this.handleShelfChange}/>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}