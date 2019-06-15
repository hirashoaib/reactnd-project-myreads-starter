import React from 'react'

class Book extends React.Component {

    onSelectionChange = (event) => {
        this.props.updateBook(this.props.book, event.target.value);
    };
    render (){
        var book = this.props.book;
        var thumbnail = book.imageLinks && book.imageLinks.thumbnail?book.imageLinks.thumbnail:'';
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:  `url("${thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.onSelectionChange} value={book.shelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{ book.authors && book.authors.map(author=>author+", ")}</div>
                </div>
                </li>
        )
    }
}

export default Book