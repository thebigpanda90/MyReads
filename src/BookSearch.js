import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

function BookSearch (props) {    
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/" onClick={props.resetSearch}>Close</Link>
                <div className="search-books-input-wrapper">                        
                    <input type="text" placeholder="Search by title or author" onChange={(event) => props.updateQuery(event.target.value)} />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        props.bookSearchResults.map((book) => {
                            return (
                                <li key={book.id}>
                                    <Book book={book} addToList={props.addToList} />
                                </li>);
                        })
                    }  
                </ol>
            </div>
        </div>);    
}

export default BookSearch