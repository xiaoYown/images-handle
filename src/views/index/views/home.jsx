import React, { Component } from 'react';
import fs from 'fs';
import _fs from 'tools/fsTools';
import { Temporary } from 'tools/utils';

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
      fileList: [],
      renameTest: {
        origin: [],
        target: []
      },
      successList: []
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
  // 获取 input 中的文件列表
  getFiles () {
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
    let dir;
    let typeOn = this.refs.type.checked;
    let typeChunk = {};

    for (let i = 0, len = files.length; i < len; i++) {
      pathOrigin = files[i].path;
      suffix = pathOrigin.match(/\.\w+/)[0];
      if (!typeOn) {
        suffixIndex[suffix] = startIndex + i;
      } else if (typeof suffixIndex[suffix] === 'undefined') {
        suffixIndex[suffix] = startIndex;
      } else {
        suffixIndex[suffix] += 1;
      }
      nameOrigin = pathOrigin.substring(pathOrigin.lastIndexOf('\\') + 1, pathOrigin.indexOf(suffix)) + suffix;
      nameTarget = prefix + separator + suffixIndex[suffix] + suffix;
      dir = pathOrigin.substring(0, pathOrigin.lastIndexOf('\\') + 1);
      pathTarget = dir + nameTarget;
      fileList.push({
        name_origin: nameOrigin,
        name_target: nameTarget,
        path_origin: pathOrigin,
        path_target: pathTarget,
        file_dir: dir,
        file_suffix: suffix
      });
    }
    this.setState({ fileList });
  }
  filesInfoChange () {
    let suffix;
    let suffixIndex = {};
    let fileList = this.state.fileList;
    let prefix = this.refs.name.value || 'file';
    let separator = this.refs.spr.value || '-';
    let startIndex = this.state.startIndex ? parseInt(this.state.startIndex) : 1;
    let typeOn = this.refs.type.checked;

    for (let i = 0, len = fileList.length; i < len; i++) {
      suffix = fileList[i].file_suffix;
      if (!typeOn) {
        suffixIndex[suffix] = startIndex + i;
      } else if (typeof suffixIndex[suffix] === 'undefined') {
        suffixIndex[suffix] = startIndex;
      } else {
        suffixIndex[suffix] += 1;
      }

      fileList[i].name_target = prefix + separator + suffixIndex[suffix] + suffix;
      fileList[i].path_target = fileList[i].file_dir + fileList[i].name_target;
    }
    this.setState({ fileList });
  }
  // 重命名前进行状态值重置
  filesRenameBegin () {
    this.setState({
      notExists: [], // 没有存在但是在修改列表中
      allExists: [], // 已经存在但是与目标名称相同
      renameTest: {
        origin: [],
        target: []
      },
      successList: []
    }, this.filesRenameTest);
  }
  // 重命名前进行 改名列表文件是否存在进行判断 改名目标名是否已存在进行判断
  filesRenameTest () {
    let i;
    let len;
    let _this = this;
    let temporarys = [];
    for (i = 0, len = this.state.fileList.length; i < len; i++) {
      temporarys[i] = new Temporary({
        locked: {
          index: i
        },
        cb () {
          fs.stat(_this.state.fileList[i].path_origin, (exists) => {
            _this.state.renameTest.origin.push(1);
            if (exists) {
              _this.state.notExists.push(_this.state.fileList[this.locked.index].name_origin);
            }
            _this.filesRenameAllow();
          });
          fs.stat(_this.state.fileList[i].path_target, (exists) => {
            _this.state.renameTest.target.push(1);
            if (!exists) {
              _this.state.allExists.push(_this.state.fileList[this.locked.index].name_target);
            }
            _this.filesRenameAllow();
          });
        }
      });
    }
  }
  // 无法重命名的提示
  filesRenameAllow () {
    if (this.state.renameTest.origin.length !== this.state.fileList.length || this.state.renameTest.target.length !== this.state.fileList.length) return;
    if (this.state.notExists.length > 0) {
      window.alert(this.state.notExists.join(',') + ' 文件不存在');
      return;
    }
    if (this.state.allExists.length > 0) {
      window.alert(this.state.allExists.join(',') + ' 这些文件已存在, 与目标名产生冲突');
      return;
    }
    this.filesRename();
  }
  // 重命名
  filesRename () {
    let _this = this;
    for (let i = 0, len = this.state.fileList.length; i < len; i++) {
      fs.rename(this.state.fileList[i].path_origin, this.state.fileList[i].path_target, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        _this.state.successList.push(1);
        _this.renameSuccess();
      });
    }
    this.refs.file.value = '';
  }
  // rename success
  renameSuccess () {
    if (this.state.successList.length !== this.state.fileList.length) return;
    let fileList = this.state.fileList;
    for (let i = 0, len = fileList.length; i < len; i++) {
      fileList[i].path_origin = fileList[i].path_target;
      fileList[i].name_origin = fileList[i].name_target;
    }
    this.setState({ fileList });
  }
  dropFiles (event) {
    event.preventDefault();
  }
  startIndexChange () {
    let startIndex = this.refs.start.value.replace(/[^\d]+/g, '');
    this.setState({ startIndex }, this.filesInfoChange);
  }
  nameFilter (ref) {
    if (/[\\/:*?"<>|]+/.test(this.refs[ref].value)) {
      this.refs[ref].value = this.refs[ref].value.replace(/[\\/:*?"<>|]+/g, '');
    }
    this.filesInfoChange();
  }
  clear () {
    this.setState({ fileList: [] });
    this.refs.file.value = '';
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
        <ul className="home-wrap_options">
          <li className="home-wrap_option">
            <label className="home-wrap_intro">
              <h4>名称</h4>
              <input type="text" ref="name" placeholder="file" onChange={ this.nameFilter.bind(this, 'name') }/>
            </label>
            <label className="home-wrap_intro">
              <h4>分割符</h4>
              <input type="text" ref="spr" placeholder="-" onChange={ this.nameFilter.bind(this, 'spr') }/>
            </label>
          </li>
          <li className="home-wrap_option">
            <label className="home-wrap_intro">
              <h4>起始数</h4>
              <input type="text" ref="start" placeholder="1" value={ this.state.startIndex } onChange={ this.startIndexChange.bind(this) }/>
            </label>
          </li>
          <li className="home-wrap_option">
            <label className="home-wrap_intro">
              <h4>类型区分</h4>
              <label>
                <input
                  type="checkbox"
                  ref="type"
                  defaultChecked="checked"
                  onClick={ this.filesInfoChange.bind(this) }
                />
                <i className="iconfont icon-sure"></i>
              </label>
            </label>
          </li>
        </ul>
        <div className="home-wrap_footer">
          <ul className="home-wrap_footer-operation">
            <li className="iconfont icon-sure" onClick={ this.clear.bind(this) }></li>
            <li className="iconfont icon-trash" onClick={ this.filesRenameBegin.bind(this) }></li>
          </ul>
        </div>
      </section>
    );
  }
};

export default home;
