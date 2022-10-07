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

(() => {
  const Result = new Grab("#result");
  const History = new Grab("#history");

  const Map = {
    ShiftKey: false,
    valid: false,
    default: () => {
      this.ShiftKey = false;
      this.cahr = null;
    },
    char: null,
  };

  function setChar(char, isShift = false) {
    if (isShift) {
      Map.char = char;
    }
    Map.char = char;
  }

  this.onkeydown = ({ code, ...e }) => {
    //checking if shift is presses or not!
    if (code === "ShiftLeft" || code === "ShiftRight") {
      console.log("shift...");
      Map.ShiftKey === false ? (Map.ShiftKey = true) : null;
    }

    //checking if keys are presses or not!
    if (code === "Numpad1" || code === "Digit1") {
      console.log("1...");
      setChar("1");
    } else if (code === "Numpad2" || code === "Digit2") {
      console.log("2...");
      setChar("2");
    } else if (code === "Numpad3" || code === "Digit3") {
      console.log("3...");
      setChar("3");
    } else if (code === "Numpad4" || code === "Digit4") {
      console.log("4...");
      setChar("4");
    } else if (code === "Numpad5" || code === "Digit5") {
      console.log("5...");
      setChar("5");
    } else if (code === "Numpad6" || code === "Digit6") {
      console.log("6...");
      setChar("6");
    } else if (code === "Numpad7" || code === "Digit7") {
      console.log("7...");
      setChar("7");
    } else if (code === "Numpad8" || code === "Digit8") {
      console.log("8...");
      Map.ShiftKey === true ? setChar("8", true) : setChar("8");
    } else if (code === "Numpad9" || code === "Digit9") {
      console.log("9...");
      Map.ShiftKey === true ? setChar("9", true) : setChar("9");
    } else if (code === "Numpad0" || code === "Digit0") {
      console.log("0...");
      Map.ShiftKey === true ? setChar("0", true) : setChar("0");
    } else if (code === "Equal") {
      // console.log("=...");
      setChar("=");
    } else if (code === "Period" || code === "NumpadDecimal") {
      setChar(".");
      console.log(".....................");
    } else if (code === "NumpadDivide") {
      setChar("/");
      console.log("/...");
    } else if (code === "NumpadMultiply") {
      setChar("*");
      console.log("*...");
    } else if (code === "NumpadSubtract" || code === "Minus") {
      setChar("-");
      console.log("-...");
    } else if (code === "NumpadAdd") {
      setChar("+");
      console.log("+...");
    } else if (code === "Backspace") {
      // setChar(" ");
      console.log("BAckspace...");
    } else if (code === "NumpadEnter" || code === "Enter") {
      // setChar(" ");
      console.log("Enter...");
    } else {
      e.preventDefault();
    }

    // switch (e.code) {
    //   case "ShiftLeft":
    //   case "ShiftRight":
    //     if (Map.ShiftKey === false) Map.ShiftKey = true;
    //   case "Numpad1":
    //   case "Numpad2":
    //   case "Numpad3":
    //   case "Numpad4":
    //   case "Numpad5":
    //   case "Numpad6":
    //   case "Numpad7":
    //   case "Numpad8":
    //   case "Numpad9":
    //   case "Numpad0":
    //   case "Digit1":
    //   case "Digit2":
    //   case "Digit3":
    //   case "Digit4":
    //   case "Digit5":
    //   case "Digit6":
    //   case "Digit7":
    //   case "Digit8":
    //   case "Digit9":
    //   case "Digit0":
    //     if (Map.ShiftKey) {
    //       console.log("presing shift and not the digits...");
    //       if (e.code === "Digit9") {
    //         console.log("left paranthesis...");
    //       }
    //       if (e.code === "Digit0") {
    //         console.log("right paranthesis...");
    //       }
    //     } else {
    //       console.log("Digits...");
    //       Map.valid = true;
    //       break;
    //     }
    //   case "Equal":
    //     if (Map.ShiftKey) {
    //       console.log("pressing add key (equal)..");
    //       Map.valid = true;
    //     } else {
    //       console.log("pressing equal...");
    //       Map.valid = true;
    //       break;
    //     }
    //   case "Period":
    //   case "NumpadDecimal":
    //     if (Map.ShiftKey === false) {
    //       console.log("Fractioning...");
    //       Map.valid = true;
    //     }
    //     break;
    //   case "NumpadDivide":
    //   case "NumpadMultiply":
    //   case "NumpadSubtract":
    //   case "NumpadAdd":
    //   case "Minus":
    //     if (Map.ShiftKey === false) {
    //       console.log("operators...");
    //       Map.valid = true;
    //     }
    //     break;
    //   case "Backspace":
    //     if (Map.ShiftKey === false) {
    //       console.log("clearing...");
    //       Map.valid = true;
    //     }
    //     break;
    //   case "Enter":
    //   case "NumpadEnter":
    //     if (Map.ShiftKey === false) {
    //       console.log("resulting...");
    //       Map.valid = true;
    //     }
    //     break;
    //   default:
    //     e.preventDefault();
    // }
  };

  this.onkeypress = (e) => {
    if (Map.valid) {
      History.el.innerText = e.code;
      console.log(e.code);
    }
  };

  this.onkeyup = (e) => {
    Map.default();
  };

  //   console.log(this);
})();
