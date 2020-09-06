import React, { Component } from 'react';

class Subject extends Component {
  render() {
    return (
      <header>
        <h1>
          <a
            href='/'
            onClick={function (e) {
              e.preventDefault();
              this.props.onChangePage(); //onChangePage function
            }.bind(this)}
          >
            {this.props.title}
          </a>
        </h1>
        {this.props.sub}
      </header>
    );
  }
}

export default Subject;
//Subject라는 class를 그대로 가져다 사용 가능.
