var React = require("react");

class Edit extends React.Component {
  render() {
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
        <button onClick={this.props.submitUpdatedPost}>Edit Post</button>
        <button onClick={this.props.goBack}>Back</button>
      </div>
    );
  }
}

module.exports = Edit;
