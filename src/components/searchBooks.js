import React from 'react'
import Book from './book'

class SearchBooks extends React.Component {

    state = {
        query:''
    }

    updateQuery(query) {
        this.setState(()=>({
            query: query
        }));        
        this.props.serachBooksFromAPI(query);
    }
    
    render() {
        const { query } = this.state;
        const { searchedList } = this.props;
        return (
            <div className="search-books">
            
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.props.onBackPress() }>Close</button>
                    <div className="search-books-input-wrapper">

                    <input type="text" placeholder="Search by title or author" 
                            value={query} 
                            onChange={(event)=> {
                                this.updateQuery(event.target.value)
                            }}
                    />
                    </div>
                </div>
                
                <div className="search-books-results">
                    <ol className="books-grid">
                        { searchedList.map((book,index) => {
                            return <Book key={index} book={book}  updateBook={this.props.updateBook}/>
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks
