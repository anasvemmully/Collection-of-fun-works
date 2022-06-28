class Grab {
  constructor(el) {
    this.el = this.get(el);
  }

  get(element, all = false) {
    if (all)
      return document.querySelectorAll(element).map((e) => {
        return this.el;
      });
    else {
      this.el = document.querySelector(element);
      return this.el;
    }
  }

  on(event, callback, all = false) {
    if (all)
      return this.el.map((e) => {
        e.addEventListener(event, callback);
        return this;
      });
    else {
      this.el.addEventListener(event, callback);
      return this;
    }
  }
}

(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global =
        typeof globalThis !== "undefined" ? globalThis : global || self),
      (global.ShuffleText = factory()));
})(this, function () {
  "use strict";

  /**
   * ShuffleText is random text effect class for DOM Elements.
   * ShuffleTextはDOMエレメント用ランダムテキストクラスです。
   * @author IKEDA Yasunobu
   * @since 2012-02-07
   */
  var ShuffleText = /** @class */ (function () {
    /**
     * Constructor.
     * @param element DOMエレメントです。
     */
    function ShuffleText(element) {
      var _a;
      /**
       * The string for random text.
       * ランダムテキストに用いる文字列です。
       * @type {string}
       * @default 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
       */
      this.sourceRandomCharacter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      /**
       * The string for effect space.
       * 空白に用いる文字列です。
       * @type {string}
       * @default '-'
       */
      this.emptyCharacter = "-";
      /**
       * The milli seconds of effect time.
       * エフェクトの実行時間（ミリ秒）です。
       * @type {number}
       * @default 600
       */
      this.duration = 600;
      this._isRunning = false;
      this._originalStr = "";
      this._originalLength = 0;
      this._timeCurrent = 0;
      this._timeStart = 0;
      this._randomIndex = [];
      this._element = null;
      this._requestAnimationFrameId = 0;
      this._element = element;
      if (this._element.tagName.toLowerCase() === "input") {
        this.setText((_a = element.value) !== null && _a !== void 0 ? _a : "");
      } else
        this.setText(
          (_a = element.textContent) !== null && _a !== void 0 ? _a : ""
        );
    }
    /**
     * Set new strings. テキストを設定します。
     * @param text テキスト文字列です。
     */
    ShuffleText.prototype.setText = function (text) {
      this._originalStr = text;
      this._originalLength = text.length;
    };
    Object.defineProperty(ShuffleText.prototype, "isRunning", {
      /**
       * It is running flag. 再生中かどうかを示すブール値です。
       * @returns {boolean}
       */
      get: function () {
        return this._isRunning;
      },
      enumerable: false,
      configurable: true,
    });
    /** Play effect. 再生を開始します。 */
    ShuffleText.prototype.start = function () {
      var _this = this;
      this._complete = false;
      this._promise = new Promise((resolve) => (this._resolve = resolve));
      this.stop();
      this._randomIndex = [];
      var str = "";
      for (var i = 0; i < this._originalLength; i++) {
        var rate = i / this._originalLength;
        this._randomIndex[i] = Math.random() * (1 - rate) + rate;
        str += this.emptyCharacter;
      }
      this._timeStart = new Date().getTime();
      this._isRunning = true;
      this._requestAnimationFrameId = requestAnimationFrame(function () {
        _this._onInterval();
      });
      if (this._element.tagName.toLowerCase() === "input") {
        this._element.value = str;
      } else this._element.textContent = str;

      return this._promise;
    };
    /** Stop effect. 停止します。 */
    ShuffleText.prototype.stop = function () {
      this._isRunning = false;
      cancelAnimationFrame(this._requestAnimationFrameId);
      // console.log(!(Binary.el.textContent.length === 0));
      if (Binary.el.textContent.length === 0) {
        this.setText(this._element.textContent);
      } else {
        this._element.textContent = "0";
      }
    };
    /**
     * Dispose this instance.
     * メモリ解放のためインスタンスを破棄します。
     */
    ShuffleText.prototype.dispose = function () {
      cancelAnimationFrame(this._requestAnimationFrameId);
      this._isRunning = false;
      this.duration = 0;
      this._originalStr = "";
      this._originalLength = 0;
      this._timeCurrent = 0;
      this._timeStart = 0;
      this._randomIndex = [];
      this._element = null;
      this._requestAnimationFrameId = 0;
    };
    /**
     * インターバルハンドラーです。
     * @private
     */
    ShuffleText.prototype._onInterval = function () {
      var _this = this;
      this._timeCurrent = new Date().getTime() - this._timeStart;
      var percent = this._timeCurrent / this.duration;
      var str = "";
      if (this._element.tagName.toLowerCase() === "input") {
        for (var i = 0; i < this._originalLength; i++) {
          if (percent >= this._randomIndex[i]) {
            str += this._originalStr.charAt(i);
          } else if (percent < this._randomIndex[i] / 3) {
            str += this.emptyCharacter;
          } else {
            str += this.sourceRandomCharacter.charAt(
              Math.floor(Math.random() * this.sourceRandomCharacter.length)
            );
          }
        }
      } else {
        for (var i = 0; i < this._originalLength; i++) {
          if (percent >= this._randomIndex[i]) {
            str += `<span class="letter">${this._originalStr.charAt(i)}</span>`;
          } else if (percent < this._randomIndex[i] / 3) {
            str += `<span class="letter">${this.emptyCharacter}</span>`;
          } else {
            str += `<span class="letter">${this.sourceRandomCharacter.charAt(
              Math.floor(Math.random() * this.sourceRandomCharacter.length)
            )}</span>`;
          }
        }
      }
      if (percent > 1) {
        str = this._originalStr;
        this._isRunning = false;
        this._complete = true;
        if (this._complete === true) this._resolve();
      }
      // if (this._element.textContent.length === 0) {
      //   this._element.textContent = "";
      // } else
      if (this._element.tagName.toLowerCase() === "input") {
        this._element.value = str;
      } else {
        this._element.innerHTML = str;
      }
      if (this._isRunning) {
        this._requestAnimationFrameId = requestAnimationFrame(function () {
          _this._onInterval();
        });
      }
    };
    return ShuffleText;
  })();

  return ShuffleText;
});
