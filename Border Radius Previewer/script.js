class Grab {
  constructor(el, all = false) {
    if (all) return this.get(el, all);
    this.el = this.get(el);
  }

  get(element, all = false) {
    if (all) {
      let t = [...document.querySelectorAll(element)];
      this.el = t;
      return this;
    } else {
      this.el = document.querySelector(element);
      return this.el;
    }
  }

  on(event, callback, options = null) {
    if (Array.isArray(this.el) && this.el.length > 0)
      return this.el.map((e) => {
        e.addEventListener(event, callback, options);
        return this;
      });
    else {
      this.el.addEventListener(event, callback, options);
      return this;
    }
  }
}
