const validation = (input:string) => {
    if (input === "Null") {
        return "Plese enter details (use backspace)"
    } else {
        return true
    }
}

const validateNumber = (input:string) => {
    if (Number.isNaN(Number(input)) || Number(input) === 0) {
        return "Please enter correct number (use backspace)"
    } else {
        return true
    }
}

export {validation, validateNumber}