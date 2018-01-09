import React, { Component } from 'react';
import fs from 'fs';

class FileListCmpt extends Component {
  constructor (props) {
    super(props);
    this.state = {
      fileList: props.list
    };
  }
  componentWillReceiveProps (props) {
    this.setState({ fileList: props.list });
  }
  render () {
    const list = this.state.fileList.map((item, index) =>
      <li key={ index }>
        <span className="name--origin">{ item.name_origin }</span>
        <span>&nbsp;----&nbsp;</span>
        <span className="name--target">{ item.name_target }</span>
      </li>
    );
    return (
      <ul className="home-wrap_filelist">
        { list }
      </ul>
    );
  }
}

class home extends React.Component {
  constructor (props) {
    super(props);
    // 获取初始状态
    this.state = {
      startIndex: '',
      fileList: []
    };
  }
  showFiles () {
    if (!this.refs.file.value) return;
    let fileList = [];
    let path = '';
    let name = '';

    let files = this.refs.file.files;

    for (let i = 0, len = files.length; i < len; i++) {
      path = files[i].path;
      name = path.substring(path.lastIndexOf('\\') + 1, path.length);
      fileList.push({
        name
      });
    }
    this.getFiles();
  }
  getFiles () {
    let val;
    let suffix;
    let suffixIndex = {};
    let files = this.refs.file.files;
    let fileList = [];
    let prefix = this.refs.name.value || 'file';
    let separator = this.refs.spr.value || '-';
    let startIndex = this.state.startIndex ? parseInt(this.state.startIndex) : 1;
    let nameOrigin;
    let nameTarget;
    let pathOrigin;
    let pathTarget;
    let typeOn = this.refs.type.checked;

    for (let i = 0, len = files.length; i < len; i++) {
      val = files[i].path;
      suffix = val.match(/\.\w+/)[0];
      if (!typeOn) {
        suffixIndex[suffix] = startIndex + i;
      } else if (typeof suffixIndex[suffix] === 'undefined') {
        suffixIndex[suffix] = startIndex;
      } else {
        suffixIndex[suffix] += 1;
      }
      nameOrigin = val.substring(val.lastIndexOf('\\') + 1, val.indexOf(suffix)) + suffix;
      nameTarget = prefix + separator + suffixIndex[suffix] + suffix;
      pathOrigin = val.substring(0, val.lastIndexOf('\\') + 1);
      pathTarget = pathOrigin + nameTarget;
      fileList.push({
        name_origin: nameOrigin,
        name_target: nameTarget,
        path_origin: val,
        path_target: pathTarget
      });
    }
    this.setState({ fileList });
  }
  filesRename () {
    let i;
    let len;
    // let notExists = []; // 没有存在但是在修改列表中
    // let allExists = []; // 已经存在但是与目标名称相同
    // for (i = 0, len = this.state.fileList.length; i < len; i++) {
    //   console.log(this.state.fileList[i]);
    //   fs.stat(this.state.fileList[i].path_origin, (exists) => {
    //     console.log(this.state.fileList[i]);
    //     if (!exists) {
    //       notExists.push(this.state.fileList[i].name_origin);
    //     }
    //   });
    //   fs.stat(this.state.fileList[i].path_target, (exists) => {
    //     if (exists) {
    //       allExists.push(this.state.fileList[i].name_target);
    //     }
    //   });
    // }
    // if (notExists.length > 0) {
    //   window.alert(notExists.join(',') + ' 文件不存在');
    //   return;
    // }
    // if (allExists.length > 0) {
    //   window.alert(allExists.join(',') + ' 这些文件已存在, 与目标名产生冲突');
    //   return;
    // }
    for (i = 0, len = this.state.fileList.length; i < len; i++) {
      fs.rename(this.state.fileList[i].path_origin, this.state.fileList[i].path_target, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    }
    this.refs.file.value = '';
  }
  dropFiles (event) {
    event.preventDefault();
  }
  startIndexChange () {
    let startIndex = this.refs.start.value.replace(/!\d/g, '');
    this.setState({ startIndex }, this.showFiles);
  }
  render () {
    return (
      <section className="home-wrap">
        <div className="home-wrap_box-rename scroll--bar_4">
          <input
            type="file"
            multiple="multiple"
            onChange={ this.showFiles.bind(this) }
            ref="file"
            className="home-wrap_files"
          />
          <FileListCmpt list={ this.state.fileList }/>
        </div>
        <label className="home-wrap_intro">
          <h4>名称</h4>
          <input type="text" ref="name" placeholder="file" onChange={ this.showFiles.bind(this) }/>
        </label>
        <label className="home-wrap_intro">
          <h4>分割符</h4>
          <input type="text" ref="spr" placeholder="-" onChange={ this.showFiles.bind(this) }/>
        </label>
        <label className="home-wrap_intro">
          <h4>起始数</h4>
          <input type="text" ref="start" placeholder="1" value={ this.state.startIndex } onChange={ this.startIndexChange.bind(this) }/>
        </label>
        <label className="home-wrap_intro">
          <h4>类型区分</h4>
          开
          <input
            name="type"
            type="radio"
            ref="type"
            defaultChecked="checked"
            onChange={ this.showFiles.bind(this) }
          />
          关
          <input
            name="type"
            type="radio"
            onChange={ this.showFiles.bind(this) }
          />
        </label>
        <label className="home-wrap_intro">
          <button className="home-wrap_making" onClick={ this.filesRename.bind(this) }>确认修改</button>
        </label>
      </section>
    );
  }
};

export default home;
