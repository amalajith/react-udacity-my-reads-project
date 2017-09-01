import React, { Component } from 'react'
import * as _ from 'lodash'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './components/BookShelf'

export default class Search extends Component {

    state = {
        currentBooksInShelf: [],
        searchTerm : '',
        searchResults: [],
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
        BooksAPI.search(searchTerm,10)
            .then(results => {
                const bookResults = results.map(result => {
                    return {
                        ...result,
                        shelf: 'none'
                    }
                })
                const searchResults = _.unionBy(bookResults,this.state.currentBooksInShelf, 'id')
                this.setState({
                    searchResults
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

        BooksAPI.update(selectedBook, newShelf).then(res => {

        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.searchTerm} onChange={(event)=> this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <BookShelf books={this.state.searchResults} handleShelfChange={this.handleShelfChange}/>
                </div>
            </div>
        )
    }
}