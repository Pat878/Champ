var React = require("react");

class Edit extends React.Component {
  render() {
    return (
      <div>
        <center>
          <h1>Edit Post</h1>
          <hr />
        </center>
        <div className="col-md-4 col-md-offset-5">
          Title: <br />
          <input
            value={this.props.postTitle}
            onChange={this.props.createTitle}
          />
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
          <div class="btn-group" role="group">
            <button
              className="btn btn-success"
              onClick={this.props.submitUpdatedPost}
            >
              Submit Edit
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

module.exports = Edit;
