import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router, Route, Link, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

var history = createBrowserHistory();
var New = require("./components/New");
var Show = require("./components/Show");
var Index = require("./components/Index");
var Edit = require("./components/Edit");

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      postId: "",
      postTitle: "",
      postBody: "",
      publish: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.showPost = this.showPost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.createTitle = this.createTitle.bind(this);
    this.createBody = this.createBody.bind(this);
    this.togglePublish = this.togglePublish.bind(this);
    this.editPostFromShow = this.editPostFromShow.bind(this);
  }

  componentDidMount() {
    fetch("posts")
      .then(response => response.json())
      .then(posts => this.setState({ posts: posts, loading: false }));
  }

  handleDelete(i, e) {
    var array = this.state.posts;
    var index = array[i].id;
    console.log(index);
    if (window.confirm("Are you sure?")) {
      return fetch("posts/" + index, {
        method: "delete"
      }).then(this.removePost(i, e));
    }
  }

  removePost(i, e) {
    var array = this.state.posts;

    this.setState({
      posts: this.state.posts.filter(function(post) {
        return post !== array[i];
      })
    });
  }

  showPost(i) {
    var array = this.state.posts;
    var postId = array[i].id;
    console.log(postId);
    this.setState({ postId: postId });
    let submissionPath = "/posts/" + postId;
    history.push(submissionPath);
  }

  editPostFromShow() {
    let submissionPath = "/edit/" + this.state.postId;
    history.push(submissionPath);
  }

  editPost(i) {
    let array = this.state.posts;
    let postId = array[i].id;
    let currentPost;
    for (var i = 0; i < array.length; i++) {
      if (array[i].id == postId) {
        currentPost = array[i];
      }
    }

    console.log(currentPost);
    this.setState({
      postId: postId,
      postTitle: currentPost.title,
      postBody: currentPost.body,
      publish: currentPost.published
    });
    let submissionPath = "/edit/" + postId;
    history.push(submissionPath);
  }

  writeNewPost() {
    let submissionPath = "/create";
    history.push(submissionPath);
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
    console.log(true);
  }

  goBack() {
    let submissionPath = "/";
    history.push(submissionPath);
  }

  render() {
    const IndexRoute = props => {
      return (
        <div>
          <Index
            handleDelete={this.handleDelete.bind(this)}
            removePost={this.removePost}
            posts={this.state.posts}
            showPost={this.showPost.bind(this)}
            loading={this.state.loading}
            editPost={this.editPost.bind(this)}
            writeNewPost={this.writeNewPost}
          />
        </div>
      );
    };

    const ShowRoute = props => {
      return (
        <div>
          <Show
            handleDelete={this.handleDelete.bind(this)}
            removePost={this.removePost}
            posts={this.state.posts}
            showPost={this.showPost}
            postId={this.state.postId}
            goBack={this.goBack}
            editPost={this.editPost.bind(this)}
            editPostFromShow={this.editPostFromShow}
          />
        </div>
      );
    };

    const EditRoute = props => {
      return (
        <div>
          <Edit
            posts={this.state.posts}
            postId={this.state.postId}
            goBack={this.goBack}
            submitPost={this.submitPost}
            createTitle={this.createTitle}
            createBody={this.createBody}
            togglePublish={this.togglePublish}
            postTitle={this.state.postTitle}
            postBody={this.state.postBody}
            publish={this.state.publish}
          />
        </div>
      );
    };

    const NewRoute = props => {
      return (
        <div>
          <New
            submitPost={this.submitPost}
            createTitle={this.createTitle}
            createBody={this.createBody}
            postTitle={this.state.postTitle}
            postBody={this.state.postBody}
            togglePublish={this.togglePublish}
          />
        </div>
      );
    };

    return (
      <div>
        <Router history={history}>
          <div>
            <Switch>
              <Route exact path={"/"} render={IndexRoute} />
              <Route path="/posts/:id" render={ShowRoute} />
              <Route path="/edit/:id" render={EditRoute} />
              <Route path="/create" render={NewRoute} />
              <Route
                render={function() {
                  return <p>Not Found</p>;
                }}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
