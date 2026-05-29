# CASIO fx-991EX PLUS — Scientific Calculator

A browser-based scientific calculator modelled after the CASIO fx-991EX PLUS. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies. Supports trigonometry, logarithms, powers, roots, factorials, memory functions, and angle mode switching.

## Overview

This project replicates the look and core functionality of the CASIO fx-991EX PLUS scientific calculator as a fully interactive web application. Expressions are built up in an input string, processed through a chain of regex replacements, and evaluated to produce a result. The LCD-style display shows the current expression along with live indicators for angle mode, memory state, and errors.

## Demo

Open `index.html` directly in any modern browser — no server or build step required.

## Tech Stack

| Technology   | Usage                              |
|--------------|------------------------------------|
| HTML5        | Calculator markup and structure    |
| CSS3         | Styling, layout, LCD display theme |
| JavaScript   | Calculation logic and DOM updates  |

## Project Structure

```
casio-calculator/
├── index.html      # Calculator layout and button definitions
├── style.css       # All visual styles and display theming
├── script.js       # Calculation engine and display logic
└── README.md
```

## Features

**Arithmetic**
- Addition, subtraction, multiplication, division
- Decimal input and parentheses support
- Backspace and clear entry controls

**Scientific Functions**
- Trigonometry: sin, cos, tan and their inverses (sin⁻¹, cos⁻¹, tan⁻¹)
- Logarithms: log (base 10), ln (natural log)
- Exponentials: eˣ, 10ˣ
- Roots: square root (√), cube root (∛)
- Powers: x², x³, xʸ
- Factorial: x!
- Absolute value: |x|
- Negation: ±

**Constants**
- Pi (π)
- Euler's number (e)

**Memory**
- MS — store current value to memory
- MR — recall memory value into expression
- M+ — add current value to memory
- MC — clear memory

**Display Indicators**
- DEG / RAD — current angle mode
- M — active when memory holds a non-zero value
- E — shown on evaluation error

**Angle Mode**
- Toggle between degrees and radians via the MODE button
- All trig functions and their inverses respect the current angle mode

## Getting Started

1. Clone or download the repository:

   ```bash
   git clone https://github.com/Maybach-Zee/casio-calculator.git
   cd casio-calculator
   ```

2. Open `index.html` in your browser:

   ```bash
   # macOS
   open index.html

   # Windows
   start index.html

   # Linux
   xdg-open index.html
   ```

## How It Works

**Expression building** — button presses append to a `currentInput` string. Scientific functions wrap the current input in a named call, e.g. `sin(currentInput)`.

**Evaluation** — on pressing `=`, the expression string is processed through a series of regex replacements in `calculate()`. Each named function (e.g. `sin(...)`, `log(...)`) is matched, evaluated using the corresponding `Math` method, and replaced with its numeric result before the final `eval()` call resolves the remaining arithmetic.

**Angle conversion** — `toRadians()` and `toDegrees()` check the current `angleMode` flag before converting, ensuring trig functions produce correct results in both DEG and RAD modes.

**Memory** — memory is stored as a module-level variable. The M indicator becomes visible whenever memory holds a non-zero value.

## Known Limitations

- The expression evaluator uses `eval()`, which processes the expression as JavaScript. Complex nested expressions or unconventional input ordering may produce unexpected results.
- The `power` function (`xʸ`) requires manual expression construction rather than infix entry.
- There is no expression history or multi-line display.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built by MaybachZee.
