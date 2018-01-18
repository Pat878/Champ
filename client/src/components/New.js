var React = require('react');

class New extends React.Component {
  render() {
    return (
      <div>
        <center>
          <h1>New Post</h1>
        </center>
        Title: <br />
        <input onChange={this.props.createTitle} />
        <br />
        Body: <br />
        <input onChange={this.props.createBody} />
        <br />
        <input type="checkbox" onClick={this.props.togglePublish} />
        Published:
        <br />
        <br />
        <button onClick={this.props.submitPost}>Create Post</button>
      </div>
    );
  }
}


module.exports = New;
