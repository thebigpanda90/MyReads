import React from 'react'
import Book from './Book';

class Bookshelf extends React.Component {
    state = {

    }

    render() {
        return (
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {
                                    this.props.books.map((book) => {
                                        return (
                                            <li key={book.title}>
                                                <Book book={book} />
                                            </li>);
                                    })
                                }                                
                            </ol>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default Bookshelf