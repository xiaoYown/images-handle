import React, { Component } from 'react';
import fs from 'fs';

class home extends React.Component {
  constructor (props) {
    super(props);
    // 获取初始状态
    this.state = {
      filesInfo: []
    };
  }
  getFiles () {
    if (!this.refs.file.value) return;
    let val;
    let suffix;
    let suffixIndex = {};
    let name;
    let files = this.refs.file.files;
    let __files = [];
    let prefix = this.refs.name.value || 'file';
    let separator = this.refs.spr.value || '_';
    let originPath;
    let typeOn = this.refs.type.checked;

    for (let i = 0, len = files.length; i < len; i++) {
      val = files[i].path;
      suffix = val.match(/\.\w+/)[0];
      if (!typeOn) {
        suffixIndex[suffix] = i + 1;
      } else if (typeof suffixIndex[suffix] === 'undefined') {
        suffixIndex[suffix] = 1;
      } else {
        suffixIndex[suffix] += 1;
      }
      name = val.substring(val.lastIndexOf('\\') + 1, val.indexOf(suffix));
      originPath = val.substring(0, val.lastIndexOf('\\') + 1);
      console.log(originPath);
      __files.push({
        name: name + suffix,
        origin_path: val,
        target_path: originPath + prefix + separator + suffixIndex[suffix] + suffix
      });
    }
    this.filesCopy(__files);
    console.log(__files);
  }
  filesCopy (files) {
    for (let i = 0, len = files.length; i < len; i++) {
      fs.rename(files[i].origin_path, files[i].target_path, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    }
    this.refs.file.value = '';
  }
  dropFiles (event) {
    event.preventDefault();
    console.log(event.dataTransfer);
  }
  render () {
    return (
      <section className="home-wrap">
        <label>
          <ul className="home-wrap_box-rename"
            onDragStart={ this.dropFiles.bind(this) }
            onDragEnter={ this.dropFiles.bind(this) }
            onDragEnd={ this.dropFiles.bind(this) }
            onDrop={ this.dropFiles.bind(this) }
          >
            <input
              type="file"
              multiple="multiple"
              ref="file"
              className="home-wrap_files"
            />
          </ul>
        </label>
        <label className="home-wrap_intro">
          <h4>名称</h4>
          <input type="text" ref="name" placeholder="file"/>
        </label>
        <label className="home-wrap_intro">
          <h4>分割符</h4>
          <input type="text" ref="spr" placeholder="_"/>
        </label>
        <label className="home-wrap_intro">
          <h4>类型区分</h4>
          开
          <input
            name="type"
            type="radio"
            ref="type"
            defaultChecked="checked"
          />
          关
          <input
            name="type"
            type="radio"
          />
        </label>
        <label className="home-wrap_intro">
          <button onClick={ this.getFiles.bind(this) }>确认修改</button>
        </label>
      </section>
    );
  }
};

export default home;
