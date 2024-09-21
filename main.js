const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";

for (let key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if (value === "clear") {
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "";
        } else if (value === "backspace") {
            input = input.slice(0, -1);
            display_input.innerHTML = CleanInput(input);
        } else if (value === "=") {
            let result = eval(PrepareInput(input));
            display_output.innerHTML = CleanOutput(result);
        } else if (value === "sqrt") {
            input = `Math.sqrt(${input})`;
            display_input.innerHTML = CleanInput(input);
        } else if (value === "pow") {
            input += "**2"; // Assuming you want to square the input
            display_input.innerHTML = CleanInput(input);
        } else if (["sin", "cos", "tan"].includes(value)) {
            input = `Math.${value}(${input})`;
            display_input.innerHTML = CleanInput(input);
        } else {
            if (ValidateInput(value)) {
                input += value;
                display_input.innerHTML = CleanInput(input);
            }
        }
    });
}

function CleanInput(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] == "*") {
            input_array[i] = ` <span class="operator">x</span> `;
        } else if (input_array[i] == "/") {
            input_array[i] = ` <span class="operator">÷</span> `;
        } else if (input_array[i] == "+") {
            input_array[i] = ` <span class="operator">+</span> `;
        } else if (input_array[i] == "-") {
            input_array[i] = ` <span class="operator">-</span> `;
        } else if (input_array[i] == "(") {
            input_array[i] = `<span class="brackets">(</span>`;
        } else if (input_array[i] == ")") {
            input_array[i] = `<span class="brackets">)</span>`;
        } else if (input_array[i] == "%") {
            input_array[i] = `<span class="percent">%</span>`;
        }
    }

    return input_array.join("");
}

function CleanOutput(output) {
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];

    let output_array = output_string.split("");

    if (output_array.length > 3) {
        for (let i = output_array.length - 3; i > 0; i -= 3) {
            output_array.splice(i, 0, ",");
        }
    }

    if (decimal) {
        output_array.push(".");
        output_array.push(decimal);
    }

    return output_array.join("");
}

function ValidateInput(value) {
    let last_input = input.slice(-1);
    let operators = ["+", "-", "*", "/"];
    
    // Allow '-' after an operator or a bracket
    if (value === "-" && (operators.includes(last_input) || last_input === "" || last_input === "(")) {
        return true;
    }

    if (value === "." && last_input === ".") {
        return false;
    }

    if (operators.includes(value)) {
        if (operators.includes(last_input)) {
            return false;
        } else {
            return true;
        }
    }

    return true;
}
function PrepareInput(input) {
    let input_array = input.split("");

    for (let i = 0; i < input_array.length; i++) {
        if (input_array[i] === "%") {
            input_array[i] = "/100";
        }
    }

    return input_array.join("");
}

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key === "Backspace") {
        // Backspace key
        input = input.slice(0, -1);
        display_input.innerHTML = CleanInput(input);
    } else if (key === "Enter" || key === "=") {
        // Enter key or '=' key
        let result = eval(PrepareInput(input));
        display_output.innerHTML = CleanOutput(result);
    } else if (key === "Escape") {
        // Escape key for clear
        input = "";
        display_input.innerHTML = "";
        display_output.innerHTML = "";
    } else if (["+", "-", "*", "/", "(", ")", "%"].includes(key)) {
        // For operators and brackets
        if (ValidateInput(key)) {
            input += key;
            display_input.innerHTML = CleanInput(input);
        }
    } else if (key >= "0" && key <= "9") {
        // For number keys
        input += key;
        display_input.innerHTML = CleanInput(input);
    } else if (key === ".") {
        // For decimal point
        if (ValidateInput(".")) {
            input += ".";
            display_input.innerHTML = CleanInput(input);
        }
    }
});
