const body = document.querySelector("body")

let currentValue = document.querySelector(".input h2")

let ans = 0
let next = 0
const modes = ["Addition", "Subtraction", "Multiplication", "Division"]
let currentMode = ""
let modeChangeHappened = false

body.addEventListener("keydown", e => {
  const { key } = e

  handleClears(key, ["Delete", "Backspace", "C"])
  const ChangeCases = ["+", "-", "*", "/"]
  handleChangeModes(key, ChangeCases)
  if (key === "`") {
    changeSign()
  } else if (key === "=" || key === "Enter") {
    handleEquals(currentMode)
  }
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]

  // if key is pressed register it
  numbers.forEach(number => {
    key === number && handleNumberAppending(key.toString())
  })

  // Experimental: press pageDown to change themes
  if (key === "PageDown") {
    const r = document.querySelector(":root")
    r.style.setProperty("--accent-hue", Math.random() * 360)
    e.preventDefault()
    document.querySelector(".calculator").classList.toggle("theme-2")
    document.querySelector(".calculator").classList.toggle("theme-1")
  }

  console.log(key)
})

body.addEventListener("click", e => {
  const { target } = e
  const { classList } = target
  let numberToAdd = target.innerText
  if (classList[0] == "btn") {
    numberToAdd = target.innerText
  }
  // eslint-disable-next-line default-case
  switch (classList[1]) {
    case "btn-num":
      handleNumberAppending(numberToAdd)
      break
    case "btn-c":
      const clearCases = ["btn-c-ce", "btn-c-backspace", "btn-c-c"]
      handleClears(classList[2], clearCases)
      break
    case "btn-operator":
      if (classList[2] == "btn-plusminus") {
        changeSign()
      } else if (
        classList[2] != "btn-plusminus" &&
        classList[2] != "btn-equals"
      ) {
        const ChangeCases = ["btn-plus", "btn-minus", "btn-times", "btn-obelus"]
        handleChangeModes(classList[2], ChangeCases)
      } else if (classList[2] == "btn-equals") {
        handleEquals(currentMode)
      }
  }
})

const appendNumber = number => {
  const current = currentValue.innerText
  if (current.replace(".", "").replace("-", "").length !== 12) {
    if (number !== ".") {
      if (current === "0") {
        return `${number}`
      } else {
        return `${current}${number}`
      }
    } else {
      if (!current.includes(".")) {
        return `${current}${number}`
      } else {
        return `${current}`
      }
    }
  } else {
    return current
  }
}

const backspace = () => {
  currentValue.innerText = currentValue.innerText.slice(
    0,
    currentValue.innerText.length - 1
  )
  next = parseFloat(currentValue.innerText)
  if (currentValue.innerText == "" || currentValue.innerText == "-") {
    clear()
  }
}

const clear = () => {
  currentValue.innerText = "0"
  next = 0
}

const clearAll = () => {
  clear()
  ans = 0
  next = 0

  currentMode = ""
}

const changeSign = () => {
  if (currentValue.innerText !== "0") {
    if (!currentValue.innerText.includes("-")) {
      currentValue.innerText = "-" + currentValue.innerText
    } else {
      currentValue.innerText = currentValue.innerText.slice(1)
    }
    next = parseFloat(currentValue.innerText)
  }
}

const saveAnsandGoNext = () => {
  ans = currentValue.innerText

  clear()
}

//
//   // next = ans;
//   currentValue.innerText = ans;
// };
const testAnswerAndText = () => {}

function handleEquals(mode) {
  switch (mode) {
    case "":
      ans = parseFloat(currentValue.innerText)
      // ans = next;
      break
    case modes[0]:
      ans = ans + next
      break
    case modes[1]:
      ans = ans - next
      break
    case modes[2]:
      ans = ans * next
      break
    case modes[3]:
      if (next != 0) {
        ans = ans / next
      } else {
      }
      break
    default:
      break
  }
  currentValue.innerText = ans
}

const handleClears = (mode, cases) => {
  switch (mode) {
    case cases[0]:
      clearAll()
      break
    case cases[1]:
      backspace()
      break
    case cases[2]:
      clear()
      break
  }
}

function handleNumberAppending(numberToAdd) {
  if (currentMode !== "") {
    next = ans
    if (modeChangeHappened) {
      ans = parseFloat(currentValue.innerText)
      clear()
      modeChangeHappened = false
    }
  }
  currentValue.innerText = appendNumber(numberToAdd)
  next = parseFloat(currentValue.innerText)
}

// const switchModes = classList => {}
function handleChangeModes(mode, cases) {
  switch (mode) {
    case cases[0]:
      next = parseFloat(currentValue.innerText)
      modeChangeHappened = true
      currentMode = modes[0]
      break
    case cases[1]:
      next = parseFloat(currentValue.innerText)
      modeChangeHappened = true
      currentMode = modes[1]
      break
    case cases[2]:
      next = parseFloat(currentValue.innerText)
      modeChangeHappened = true
      currentMode = modes[2]
      break
    case cases[3]:
      next = parseFloat(currentValue.innerText)
      modeChangeHappened = true
      currentMode = modes[3]
      break
    default:
      break
  }
}
