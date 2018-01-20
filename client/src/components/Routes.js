var React = require("react");
var Router = require("react-router-dom").Router;
var Route = require("react-router-dom").Route;
var Switch = require("react-router-dom").Switch;

var New = require("./New");
var Show = require("./Show");
var Index = require("./Index");
var Edit = require("./Edit");
var Loading = require("./Loading");

class Routes extends React.Component {
  render() {
    const IndexRoute = props => {
      return (
        <div>
          {this.props.loading ? (
            <Loading />
          ) : (
            <Index
              handleDelete={this.props.handleDelete.bind(this)}
              removePost={this.props.removePost}
              posts={this.props.posts}
              showPost={this.props.showPost.bind(this)}
              loading={this.props.loading}
              editPost={this.props.editPost.bind(this)}
              writeNewPost={this.props.writeNewPost}
              loading={this.props.loading}
              history={this.props.history}
            />
          )}
        </div>
      );
    };

    const ShowRoute = props => {
      return (
        <div>
          <Show
            handleDelete={this.props.handleDelete.bind(this)}
            removePost={this.props.removePost}
            posts={this.props.posts}
            showPost={this.props.showPost}
            postId={this.props.postId}
            goBack={this.props.goBack}
            editPost={this.props.editPost.bind(this)}
            number={this.props.number}
          />
        </div>
      );
    };

    const EditRoute = props => {
      return (
        <div>
          <Edit
            posts={this.props.posts}
            postId={this.props.postId}
            goBack={this.props.goBack}
            submitPost={this.props.submitPost}
            createTitle={this.props.createTitle}
            createBody={this.props.createBody}
            togglePublish={this.props.togglePublish}
            postTitle={this.props.postTitle}
            postBody={this.props.postBody}
            publish={this.props.publish}
            submitUpdatedPost={this.props.submitUpdatedPost}
          />
        </div>
      );
    };

    const NewRoute = props => {
      return (
        <div>
          <New
            submitPost={this.props.submitPost}
            createTitle={this.props.createTitle}
            createBody={this.props.createBody}
            postTitle={this.props.postTitle}
            postBody={this.props.postBody}
            togglePublish={this.props.togglePublish}
            goBack={this.props.goBack}
            publish={this.props.publish}
          />
        </div>
      );
    };

    return (
      <div>
        <Router history={this.props.history}>
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

module.exports = Routes;
