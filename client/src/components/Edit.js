var React = require("react");

class Edit extends React.Component {
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
          <h1>Edit Post</h1>
        </center>
        Title: <br />
        <input value={this.props.postTitle} onChange={this.props.createTitle} />
        <br />
        Body: <br />
        <input value={this.props.postBody} onChange={this.props.createBody} />
        <br />
        <input
          type="checkbox"
          checked={this.props.publish}
          onChange={this.props.togglePublish}
        />
        Publish
        <br />
        <br />
        <button>Edit Post</button>
      </div>
    );
  }
}

module.exports = Edit;
