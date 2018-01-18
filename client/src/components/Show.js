var React = require("react");

class Show extends React.Component {
  render() {
    let array = this.props.posts;
    let currentPost;
    for (var i = 0; i < array.length; i++) {
      if (array[i].id == this.props.postId) {
        currentPost = array[i];
      }
    }

    return (
      <div>
        <center>
          <h1>{currentPost.title}</h1>
        </center>
        <h3>{currentPost.body}</h3>
        <br />
        <h4>Published: {currentPost.published.toString()}</h4>
        <button onClick={this.props.goBack}>Back</button>
        <td>
          <button onClick={this.props.editPostFromShow}>Edit</button>
        </td>
        <br />
      </div>
    );
  }
}

module.exports = Show;
