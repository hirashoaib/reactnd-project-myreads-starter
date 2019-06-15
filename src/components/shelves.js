import React from 'react'
import Book from './book';
import { Link } from 'react-router-dom';
import SearchIcon from '../icons/search.png'

class Shelves extends React.Component {

    state = {
        shelfs: [
            {title:"Currently Reading", value:"currentlyReading"},
            {title:"Want to Read", value:"wantToRead"},
            {title:"Read", value:"read"}
        ]
    }

    filterSpecificBooks = (shelfName)=> {
        return this.props.fullBooksList.filter(book=>book.shelf === shelfName)
    }
    
    render(){
        var shelfs = this.state.shelfs;
        const { updateBook } = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <div className="list-search-books">
                        <Link to="/search">
                            <img width="50px" src={SearchIcon} />
                        </Link>
                    </div>
                    <div className="title-heading">
                        <h1>MyReads</h1>
                    </div>
                </div>
                <div className="list-books-content">
                    <div>
                        {
                            shelfs.map(shelf=> {
                                let shelfSpecificBooks = this.filterSpecificBooks(shelf.value);
                                return (
                                    <div key={shelf.value} className="bookshelf">
                                        <h2 className="bookshelf-title">{shelf.title}</h2>
                                        <div className="bookshelf-books">
                                        <ol className="books-grid">
                                        { shelfSpecificBooks.map((book,index) => {
                                            return <Book key={index} book={book} updateBook={updateBook}  />
                                        })}
                                        </ol>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Shelves