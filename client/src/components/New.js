var React = require("react");

class New extends React.Component {
  render() {
    return (
      <div className="">
          <center>
            <h1>New Post</h1>
            <hr/>
          </center>
          <div className="col-md-4 col-md-offset-5">
            Title: <br />
            <input
              value={this.props.postTitle}
              onChange={this.props.createTitle}
            />
            <br />
            Body: <br />
            <input
              calue={this.props.postBody}
              onChange={this.props.createBody}
            />
            <br />
            <input
              type="checkbox"
              checked={this.props.publish}
              onClick={this.props.togglePublish}
            />
            Published
            <br />
            <br />
            <div className="btn-group" role="group">
              <button
                className="btn btn-success"
                onClick={this.props.submitPost}
              >
                Create Post
              </button>

              <button className="btn btn-primary" onClick={this.props.goBack}>
                Back
              </button>
            </div>
          </div>

      </div>
    );
  }
}

module.exports = New;
