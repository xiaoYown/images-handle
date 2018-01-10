export class Temporary {
  constructor (param) {
    this.locked = param.locked;
    this.cb = param.cb;
    this.init();
  }
  init () {
    this.cb();
  }
}
