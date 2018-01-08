'use strict'

const path = require('path')
const BrowserWindow = require('electron').remote.BrowserWindow

class ChattingWindow {
  constructor () {
    this.chattingWindow = new BrowserWindow({
      width: 600,
      height: 400,
      title: 'chatting . . .',
      // resizable: false,
      center: true,
      show: true,
      // frame: false,
      // autoHideMenuBar: true,
      // alwaysOnTop: true,
      // titleBarStyle: 'hidden'
    })

    this.chattingWindow.loadURL(path.join(__dirname, '../views/chatting.html'))
  }

  show (title) {
    this.chattingWindow.setTitle(title || 'chat')
    this.chattingWindow.show()
  }

  hide () {
    this.chattingWindow.hide()
  }
}

module.exports = ChattingWindow
