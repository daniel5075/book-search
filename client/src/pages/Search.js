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
  };

  componentDidMount() {
    this.searchBookFromGoogle();
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
    console.log(bookInfo.items.volumeInfo.titleo);
    return {
      title: bookInfo.items.volumeInfo.title,
      authors: bookInfo.items.volumeInfo.authors,
      description: bookInfo.items.volumeInfo.description,
      image: bookInfo.items.volumeInfo.imageLinks.thumbnail,
      link: bookInfo.items.volumeInfo.previewLink
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
              search={this.state.search}
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
