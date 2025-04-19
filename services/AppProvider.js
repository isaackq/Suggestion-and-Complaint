const Migration = require("../database/migration");

module.exports = class AppProvider {
  //بدنا نحولو سينغلتون
  /* static*/ #app = null;
  #migration = null;

  static #instance = null;

  static get instance() {
    //ممكن نعمل هان عمليات كتير مثلا انو نستدعي المايقريشنز
    return (this.#instance ??= new AppProvider());
  }
  syncDatabase() {
    this.migration = new Migration();
    this.migration.sync();
  }

  set app(app) {
    this.#app = app;
  }

  get router() {
    return this.#app._router.stack;
  }
};
