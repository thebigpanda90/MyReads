import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelf from './Bookshelf';
import BookSearch from './BookSearch';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
    state = {
        books: [],
        currentlyReading: [],
        wantToRead: [],
        read: [],
        bookSearchResults: []
    };

    //This function handles updating the search query.
    //When empty or no results found(API will return an error for this case) 
    //we want to set our current book list showing to empty
    updateQuery = (query) => {
        if (query === '') {
            this.setState(() => ({
                bookSearchResults: []
            }));
        } else {
            BooksAPI.search(query).then((result) => {
                if (result.error !== undefined) {
                    this.setState(() => ({
                        bookSearchResults: []
                    }));
                } else {
                    this.setState(() => ({
                        bookSearchResults: result
                    }));
                }
            });
        }
    };

    //Wrapper function for fetching the entire list of books and updating the state
    getAllBooksAndSetState() {
        BooksAPI.getAll().then((books) => {
            this.setState(() => ({
                books,
                wantToRead: books.filter(book => book.shelf === 'wantToRead'),
                currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
                read: books.filter(book => book.shelf === 'read')
            }));
        });
    };

    //Init function to setup state and anything else we need
    componentDidMount() {
        this.getAllBooksAndSetState();
    };

    //Add the specified book to the list. If failed for whatever reason return false to notify caller
    addToList = (listName, book):Promise<false> => {
        return BooksAPI.update(book, listName).then((newShelf) => {
            this.getAllBooksAndSetState();
            return true;
        }).catch(() => {
            return false;
        });
    };

    //Convenience function to reset the search
    resetSearch = () => {
        this.updateQuery('');
    };

    render() {
        return (
            <div className="app">            
                    <Route exact path="/search" render={() => (
                        <BookSearch bookSearchResults={this.state.bookSearchResults} updateQuery={this.updateQuery} addToList={this.addToList} resetSearch={this.resetSearch}/>
                    )} />
                    <Route exact path="/" render={() => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <Bookshelf shelfTitle="Currently Reading" books={this.state.currentlyReading} addToList={this.addToList} />
                            <Bookshelf shelfTitle="Want to Read" books={this.state.wantToRead} addToList={this.addToList} />
                            <Bookshelf shelfTitle="Read" books={this.state.read} addToList={this.addToList} />

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
