import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

var Routes = require("./components/Routes");
var factorial = require("./utils/factorial");
var history = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      postId: "",
      postTitle: "",
      postBody: "",
      publish: false,
      number: 0,
      loading: true,
      history: createBrowserHistory()
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.showPost = this.showPost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.createTitle = this.createTitle.bind(this);
    this.createBody = this.createBody.bind(this);
    this.togglePublish = this.togglePublish.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.goBack = this.goBack.bind(this);
    this.submitUpdatedPost = this.submitUpdatedPost.bind(this);
    this.writeNewPost = this.writeNewPost.bind(this);
  }

  componentDidMount() {
    fetch("posts")
      .then(response => response.json())
      .then(posts => this.setState({ posts: posts, loading: false }));
  }

  handleDelete(i, e) {
    let array = this.state.posts;
    let index = array[i].id;

    if (window.confirm("Are you sure?")) {
      return fetch("posts/" + index, {
        method: "delete"
      }).then(this.removePost(i, e));
    }
  }

  removePost(i, e) {
    let array = this.state.posts;
    this.setState({
      posts: this.state.posts.filter(post => post !== array[i])
    });
  }

  showPost(i) {
    var array = this.state.posts;
    var postId = array[i].id;
    this.setState({ postId: postId, history: history });
    let submissionPath = "/posts/" + postId;
    history.push(submissionPath);
  }

  editPost(i) {
    let postId;
    let array = this.state.posts;
    if (Number.isInteger(i) === false) {
      postId = this.state.postId;
    } else {
      postId = array[i].id;
    }

    let currentPost;
    for (var j = 0; j < array.length; j++) {
      if (array[j].id == postId) {
        currentPost = array[j];
      }
    }

    this.setState({
      postId: postId,
      postTitle: currentPost.title,
      postBody: currentPost.body,
      publish: currentPost.published,
      history: history
    });
    let submissionPath = "/edit/" + postId;
    history.push(submissionPath);
  }

  writeNewPost() {
    let submissionPath = "/create";
    history.push(submissionPath);
    this.setState({ history: history });
  }

  createTitle(e) {
    this.setState({ postTitle: e.target.value });
  }
  createBody(e) {
    this.setState({ postBody: e.target.value });
  }

  togglePublish() {
    this.setState(prevState => ({
      publish: !prevState.publish
    }));
  }

  submitPost() {
    fetch("posts", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        post: {
          title: this.state.postTitle,
          body: this.state.postBody,
          published: this.state.publish,
          number: factorial
        }
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.handleSubmit(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
    let submissionPath = "/";
    history.push(submissionPath);
  }

  handleSubmit(post) {
    var newState = this.state.posts.concat(post);
    this.setState({
      posts: newState,
      postTitle: "",
      postBody: "",
      publish: false,
      history: history
    });
  }

  submitUpdatedPost() {
    fetch("/posts/" + this.state.postId, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        post: {
          title: this.state.postTitle,
          body: this.state.postBody,
          published: this.state.publish,
          number: factorial
        }
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.handleUpdate(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
    let submissionPath = "/";
    history.push(submissionPath);
  }

  handleUpdate(post) {
    var newState = this.state.posts;

    for (var i = 0; i < newState.length; i++) {
      if (newState[i].id == post.id) {
        newState[i] = post;
      }
    }

    this.setState({
      posts: newState,
      postTitle: "",
      postBody: "",
      publish: false,
      history: history
    });
  }

  goBack() {
    let submissionPath = "/";
    history.push(submissionPath);
    this.setState({
      postTitle: "",
      postBody: "",
      publish: false,
      history: history
    });
  }

  render() {
    return (
      <Routes
        handleDelete={this.handleDelete.bind(this)}
        removePost={this.removePost}
        posts={this.state.posts}
        showPost={this.showPost.bind(this)}
        postId={this.state.postId}
        loading={this.state.loading}
        goBack={this.goBack}
        editPost={this.editPost.bind(this)}
        writeNewPost={this.writeNewPost}
        number={this.state.number}
        submitPost={this.submitPost}
        createTitle={this.createTitle}
        createBody={this.createBody}
        togglePublish={this.togglePublish}
        postTitle={this.state.postTitle}
        postBody={this.state.postBody}
        publish={this.state.publish}
        submitUpdatedPost={this.submitUpdatedPost}
        submitPost={this.submitPost}
        history={this.state.history}
      />
    );
  }
}

export default App;
