var React = require("react");

class Show extends React.Component {
  render() {
    let array = this.props.posts;
    let currentPost;
    let number;
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === this.props.postId) {
        currentPost = array[i];
      }
    }
    if (currentPost.number == 0) {
      number = "";
    } else {
      number = currentPost.number;
    }

    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <center>
            <h1>
              {currentPost.title} {number}
            </h1>
            <hr />
          </center>
          <h3>{currentPost.body}</h3>
          <br />
          <h4>Published: {currentPost.published.toString()}</h4>
          <center>
            <div class="btn-group" role="group">
              <button className="btn btn-default" onClick={this.props.editPost}>
                Edit
              </button>
              <button className="btn btn-primary" onClick={this.props.goBack}>
                Back
              </button>
            </div>
          </center>
          <br />
        </div>
      </div>
    );
  }
}

module.exports = Show;
