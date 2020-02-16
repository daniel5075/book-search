import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import Form from "../components/Form";
import Results from "../components/Results";

class Search extends Component {
  state = {
    books: [],
    value: ""
    // searchBookFromGoogle: "hardy boys"
  };

  componentDidMount() {
    this.searchBookFromGoogle(value);
  }

  searchBookFromGoogle = query => {
    API.getBook(query)
      .then(res =>
        this.setState({
          books: res.data.items.map(bookInfo => this.createBook(bookInfo))
        })
      )
      .catch(err => console.log(err));
  };
  createBook = bookInfo => {
    return {
      title: bookInfo.volumeInfo.title,
      authors: bookInfo.volumeInfo.authors,
      description: bookInfo.volumeInfo.description,
      image: bookInfo.volumeInfo.imageLinks.thumbnail,
      link: bookInfo.volumeInfo.previewLink
    };
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchBookFromGoogle(this.state.search);
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <h2>Search for and Save Books of Interest</h2>
            </Jumbotron>
            <Form>
              search={this.state.searchBookFromGoogle}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
            </Form>
            <div className="container">
              <h2>Results</h2>
              <Results books={this.state.books}></Results>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
