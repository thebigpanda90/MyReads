import React from 'react'
import Book from './Book'

function Bookshelf (props) {    
    return (
        <div className="list-books-content">
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{props.shelfTitle}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {
                                props.books.map((book) => {
                                    return (
                                        <li key={book.id}>
                                            <Book book={book} addToList={props.addToList} />
                                        </li>);
                                })
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </div>);    
}

export default Bookshelf