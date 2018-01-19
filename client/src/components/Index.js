var React = require("react");

class Index extends React.Component {
  render() {
    const posts = this.props.posts.map((post, i) => {
      return (
        <tr key={post.title}>
          <td> {post.title}</td>
          <td> {post.body}</td>
          <td> {post.published.toString()}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={this.props.showPost.bind(this, i)}
            >
              Show
            </button>
          </td>
          <td>
            <button
              className="btn btn-default"
              onClick={this.props.editPost.bind(this, i)}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={this.props.handleDelete.bind(this, i)}
            >
              Destroy
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <center>
          <h1>Posts</h1>
          <hr />
        </center>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Published</th>
              <th colSpan="3" />
            </tr>
          </thead>

          <tbody>{posts}</tbody>
        </table>
        <br />
        <center>
          <button className="btn btn-success" onClick={this.props.writeNewPost}>
            New Post
          </button>
        </center>
      </div>
    );
  }
}

module.exports = Index;
