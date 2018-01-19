var React = require("react");

class Loading extends React.Component {
  render() {
    return (
      <div>
        <center>
          <h1>Posts</h1>
          <hr />
          <i class="fa fa-spinner fa-spin fa-3x fa-fw" />
          <h1>Loading...</h1>
        </center>
      </div>
    );
  }
}

module.exports = Loading;
