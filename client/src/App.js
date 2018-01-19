import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

var history = createBrowserHistory();
var New = require("./components/New");
var Show = require("./components/Show");
var Index = require("./components/Index");
var Edit = require("./components/Edit");
var Loading = require("./components/Loading");
var factorial = require("./utils/factorial");

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
      loading: true
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
  }

  componentDidMount() {
    fetch("posts")
      .then(response => response.json())
      .then(posts => this.setState({ posts: posts, loading: false }));
  }

  handleDelete(i, e) {
    let array = this.state.posts;
    let index = array[i].id;
    console.log(index);
    if (window.confirm("Are you sure?")) {
      return fetch("posts/" + index, {
        method: "delete"
      }).then(this.removePost(i, e));
    }
  }

  removePost(i, e) {
    let array = this.state.posts;
    //made changes below - test delete
    this.setState({
      posts: this.state.posts.filter(post => post !== array[i])
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
      publish: false
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
      publish: false
    });
  }

  goBack() {
    this.setState({
      postTitle: "",
      postBody: "",
      publish: false
    });
    let submissionPath = "/";
    history.push(submissionPath);
  }

  render() {
    const IndexRoute = props => {
      return (
        <div>
          {this.state.loading ? (
            <Loading />
          ) : (
            <Index
              handleDelete={this.handleDelete.bind(this)}
              removePost={this.removePost}
              posts={this.state.posts}
              showPost={this.showPost.bind(this)}
              loading={this.state.loading}
              editPost={this.editPost.bind(this)}
              writeNewPost={this.writeNewPost}
              loading={this.state.loading}
            />
          )}
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
            number={this.state.number}
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
            submitUpdatedPost={this.submitUpdatedPost}
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
            goBack={this.goBack}
            publish={this.state.publish}
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
