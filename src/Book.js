import React from 'react'
import BookShelfChanger from './BookShelfChanger';

class Book extends React.Component {
    state = {

    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <BookShelfChanger />
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors[0]}</div>
            </div>
            );
    }
}

export default Book