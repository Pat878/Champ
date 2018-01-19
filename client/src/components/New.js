var React = require("react");

class New extends React.Component {
  render() {
    return (
      <div>
        <center>
          <h1>New Post</h1>
        </center>
        Title: <br />
        <input value={this.props.postTitle} onChange={this.props.createTitle} />
        <br />
        Body: <br />
        <input calue={this.props.postBody} onChange={this.props.createBody} />
        <br />
        <input
          type="checkbox"
          checked={this.props.publish}
          onClick={this.props.togglePublish}
        />
        Published
        <br />
        <br />
        <button onClick={this.props.submitPost}>Create Post</button>
        <button onClick={this.props.goBack}>Back</button>
      </div>
    );
  }
}

module.exports = New;
