import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import BookSearch from './BookSearch'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
    state = {
    /**
        * TODO: Instead of using this state variable to keep track of which page
        * we're on, use the URL in the browser's address bar. This will ensure that
        * users can use the browser's back and forward buttons to navigate between
        * pages, as well as provide a good URL they can bookmark and share.
        */
        showSearchPage: false,
        books: [],
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {

            this.setState(() => ({
                books,
                wantToRead : books.filter(book => book.shelf === 'wantToRead'),
                currentlyReading : books.filter(book => book.shelf === 'currentlyReading'),
                read : books.filter(book => book.shelf === 'read')
            }));
        });
    }

    render() {
        return (
            <div className="app">
            
                    <Route exact path="/search" render={() => (
                        <BookSearch />
                    )} />
                    <Route exact path="/" render={() => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <Bookshelf shelfTitle="Currently Reading" books={this.state.currentlyReading} />
                            <Bookshelf shelfTitle="Want to Read" books={this.state.wantToRead} />
                            <Bookshelf shelfTitle="Read" books={this.state.read} />

                            <div className="open-search">
                                <Link to="/search">Add a book</Link>
                            </div>
                        </div>
                    )} />
                
            
            </div>
        )
    }
}

export default BooksApp
