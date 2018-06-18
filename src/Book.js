import React from 'react'
import BookShelfChanger from './BookShelfChanger'

function Book (props) {
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks !== undefined && props.book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <BookShelfChanger book={props.book} addToList={props.addToList}/>                        
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors !== undefined && props.book.authors[0]}</div>
        </div>
        );    
}

export default Book