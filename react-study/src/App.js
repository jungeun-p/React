import React, { Component } from 'react';
import Subject from './components/Subject';
import Subject1 from './components/Subject1';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import Control from './components/Control';
import UpdateContent from './components/UpdateContent';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    //id값을 담은 객체일 뿐, state를 굳이 추가할 필요가 없다.
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      subject: { title: 'WEB', sub: 'world wid web🥞' },
      //mode=welcome
      welcome: { title: 'Welcome', desc: 'hello, React🚕' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is HyperText...' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'Javascript is for interactive' },
      ],
    }; //state값을 초기화
  }
  //mode === read, update
  getReadContent() {
    let i = 0;
    while (i < this.state.contents.length) {
      let data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i = i + 1;
    }
  }
  //make a component
  getContent() {
    let _title,
      _desc,
      _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === 'read') {
      let _content = this.getReadContent(); //title, desc
      _article = (
        <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      );
    } else if (this.state.mode === 'create') {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            this.max_content_id = this.max_content_id + 1;
            let _contents = Array.from(this.state.contents);
            _contents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            //let _contents = this.state.contents.concat({
            //  id: this.max_content_id,
            //  title: _title,
            //  desc: _desc,
            //  });
            this.setState({
              contents: _contents,
              mode: 'read',
              selected_content_id: this.max_content_id,
            });
            console.log(_title, _desc);
          }.bind(this)}
        ></CreateContent>
      );
    } else if (this.state.mode === 'update') {
      let _content = this.getReadContent();
      _article = (
        <UpdateContent
          //값 주입
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            let _contents = Array.from(this.state.contents); //새로운 배열 탄생
            let i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i = i + 1;
            }
            // let _contents = this.state.contents.concat({
            //   id: this.max_content_id,
            //   title: _title,
            //   desc: _desc,
            // });
            this.setState({
              contents: _contents,
              mode: 'read',
            });
            console.log(_title, _desc);
          }.bind(this)}
        ></UpdateContent>
      );
    }
    return _article;
  }
  render() {
    console.log('App render');
    return (
      <div className='App'>
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
          }.bind(this)}
        ></Subject>
        <Subject1
          onChangePage={function (id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id),
            });
          }.bind(this)}
          data={this.state.contents}
        ></Subject1>
        <Control
          onChangeMode={function (_mode) {
            if (_mode === 'delete') {
              if (window.confirm('really?')) {
                let _contents = Array.from(this.state.contents);
                let i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1); //어디부터 어디까지?
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode: 'welcome',
                  contents: _contents,
                });
                alert('delete complete');
              }
            } else {
              this.setState({
                mode: _mode,
              });
            }
          }.bind(this)}
        ></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
