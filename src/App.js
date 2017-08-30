import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import BookListing from './BookListing'
import Search from "./Search"

class BooksApp extends React.Component {

    render() {
        return (
            <div className="app">

                <Switch>

                    {/*Load the BookShelf component when at root path*/}
                    <Route exact path="/" component={BookListing}/>

                    {/*Load the Search component when path matches '/search'*/}
                    <Route path="/search" component={Search}/>

                </Switch>

            </div>
        )
    }
}

export default BooksApp
