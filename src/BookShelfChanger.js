import React from 'react'
import * as BooksAPI from './BooksAPI'

class BookShelfChanger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.book
        };
    }

    //Call the addToList function passed in to be sure we actually performed the action
    //Only fetch the current state of the book if we succeeded in modifying it
    changeBookList = (e) => {
        this.props.addToList(e.target.value, this.state.book).then((updated) => {
            if (updated) {
                BooksAPI.get(this.state.book.id).then((book) => {
                    this.setState({ book });
                });
            }
        });
    }

    render() {
        return (
            <select onChange={this.changeBookList.bind(this)} value={(this.state.book.shelf !== undefined ? this.state.book.shelf : "none")}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>);
    }
}

export default BookShelfChanger