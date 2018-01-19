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
      <div>
        <center>
          <h1>
            {currentPost.title} {number}
          </h1>
        </center>
        <h3>{currentPost.body}</h3>
        <br />
        <h4>Published: {currentPost.published.toString()}</h4>
        <button onClick={this.props.goBack}>Back</button>
        <td>
          <button onClick={this.props.editPost}>Edit</button>
        </td>
        <br />
      </div>
    );
  }
}

module.exports = Show;
