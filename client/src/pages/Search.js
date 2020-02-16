import React, { Component } from "react";
import Form from "../components/Form";
import Results from "../components/Results";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

class Search extends Component {
  state = {
    books: []
    // value: ""
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
      .catch(err => console.error(err));
  };

  createBook = bookInfo => {
    return {
      _id: bookInfo.id,
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

            <Form
              search={this.state.searchBookFromGoogle}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
            />
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
