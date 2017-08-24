import React from 'react'
import { Route, Switch } from 'react-router-dom'
import BookShelf from './BookShelf'
import './App.css'
import Search from "./Search"

class BooksApp extends React.Component {

    render() {
        return (
            <div className="app">

                <Switch>
                    <Route exact path="/" component={BookShelf}/>
                    <Route path="/search" component={Search}/>
                </Switch>

            </div>
        )
    }
}

export default BooksApp
