import React from 'react'
import {getAll, update, search} from './BooksAPI'
import './App.css'
import { Router, Route, Switch } from "react-router-dom";
import Shelves from './components/shelves';
import SearchBooks from './components/searchBooks';
let history = require("history").createBrowserHistory();

class BooksApp extends React.Component {
    state = {
        showSearchPage: false,
        fullBooksList : [],
        searchedList: []
    }

    componentDidMount(){
        getAll().then(booksResult=> {
            this.setState({fullBooksList : booksResult});
        })
    }

    removeSearchResult(){
        this.setState(()=>({
            searchedList: []
        }));
    }

    updateBook = (bookToUpdate, shelfName)=>{
        update(bookToUpdate,shelfName)
        .then(data=>{
            if(this.state.fullBooksList.some(book=> book.id===bookToUpdate.id)){
                this.setState((prevState)=> ({
                    fullBooksList : prevState.fullBooksList.map(book=> {
                        if(book.id === bookToUpdate.id){
                            book.shelf = shelfName;
                        }
                        return book;
                    })
                }));
            }
            else {
                bookToUpdate.shelf = shelfName;
                this.setState((prevState)=> ({
                    fullBooksList : [...prevState.fullBooksList,bookToUpdate]
                }));
            }            
        });
    }


    serachBooksFromAPI(searchTerm) {
        if(searchTerm){            
            search(searchTerm)
            .then(data=> {
                this.setState(()=>({
                    searchedList : data.error? []: data.map(book=> {                        
                        var matchedBooksFromCurrentList = this.state.fullBooksList.filter(b=> b.id===book.id);
                        if(matchedBooksFromCurrentList && matchedBooksFromCurrentList.length>0){
                            book.shelf = matchedBooksFromCurrentList[0].shelf;
                        }
                        else {
                            book.shelf = "none";
                        }
                        return book;
                    })
                }))
            })
        }
        else {
           this.removeSearchResult();
        }
    }

    render() {
        return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" render={()=> (
                        <Shelves fullBooksList={this.state.fullBooksList} updateBook={this.updateBook}/>
                    )} />
                    <Route exact path="/search" render={()=> (
                        <SearchBooks searchedList={this.state.searchedList} serachBooksFromAPI={this.serachBooksFromAPI.bind(this)} updateBook={this.updateBook} onBackPress={()=> {
                            this.removeSearchResult();
                            history.push("/");
                        }} />
                    )} />
                </Switch>
            </Router>
        </div>)
    }
}

export default BooksApp
