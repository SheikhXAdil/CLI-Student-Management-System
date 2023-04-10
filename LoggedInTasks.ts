import chalk from "chalk";
import inquirer from "inquirer";
import Student from "./Student.js";
import { validateNumber } from "./validation.js";
import { appExit } from "./loggedout.js";



let courses: string[] = ["Web 3.0 & Metaverse (price:6000)", "AI (price:5500)", "Blockchain (price:5000)", "Internet of things (price:4500)"]



const enroll = async (student: Student, courses: string[]) => {

    if (student.courseJoined !== "") {
        console.log(`\nYou have already joined the ${student.courseJoined} course`)
    }
    else {
        const answer = await inquirer.prompt({
            name: 'course',
            type: 'list',
            message: 'Which course would u like to join?',
            choices: courses
        });
        // ["Web 3.0 & Metaverse (price:6000)", "AI (price:5500)", "Blockchain (price:5000)", "Internet of things (price:4500)"]

        if (answer.course === courses[0]) {
            console.log(chalk.green("Enrollment successful \n"));
            console.log("You have enrolled in Web 3.0 & Metaverse course. Your status is currently pending. Pay tuition fee")
            student.courseJoined = "Web 3.0 & Metaverse"
            student.toBePaidFee += 6000

        }
        else if (answer.course === courses[1]) {
            console.log(chalk.green("Enrollment successful \n"));
            console.log("You have enrolled in AI course. Your status is currently pending. Pay tuition fee")
            student.courseJoined = "AI"
            student.toBePaidFee += 5500

        }
        else if (answer.course === courses[2]) {
            console.log(chalk.green("Enrollment successful \n"));
            console.log("You have enrolled in Blockchain. Your status is currently pending. Pay tuition fee")
            student.courseJoined = "Blochchain"
            student.toBePaidFee += 5000

        } else if (answer.course === courses[3]) {
            console.log(chalk.green("Enrollment successful \n"));
            console.log("You have enrolled in Internet of things course. Your status is currently pending. Pay tuition fee")
            student.courseJoined = "Internet of things"
            student.toBePaidFee += 4500
        }
    }
}


const addBalance = async (student: Student) => {
    const answer = await inquirer.prompt([
        {
            name: 'method',
            type: 'list',
            message: 'Which method would u like to use?',
            choices: ["Debit", "Visa", "Paypal"]
        },
        {
            name: 'amount',
            type: 'input',
            message: 'Enter the amount: ',
            validate: validateNumber,
            default() {
                return 0
            }
        }
    ]);

    student.balance += Number(answer.amount)
    console.log(chalk.green("Transaction successful"))
    console.log(`${answer.amount} was successfully added to your balance via ${answer.method}. Your new balance is ${chalk.yellow(student.balance)}`)


}


const payFee = async (student: Student) => {

    let confirmation: string = "";

    while (confirmation !== "yes") {
        const answer = await inquirer.prompt({
            name: 'confirm',
            type: 'input',
            message: `You have ${student.toBePaidFee} amount left to be paid. Would u like to pay it from your balance?`,
            default() {
                return "yes"
            }
        });
        confirmation = answer.confirm
    }
    if (student.balance >= student.toBePaidFee) {
        student.balance -= student.toBePaidFee
        student.toBePaidFee = 0
        console.log(chalk.green("Transaction Successful"))
        console.log(`Remaining balance: ${chalk.yellow(student.balance)}`)
    }
    else {
        console.log(chalk.red("Transaction Failed. Not enough balance"))
        console.log("Please add balance in your account")
    }

}

const checkStatus = (student: Student) => {
    if (student.courseJoined === "") {
        console.log(`Please enroll in a course`)
    } else if (student.toBePaidFee > 0) {
        console.log(`Enrollment is ${chalk.magenta("pending")}. Please pay the tuition fee`)
    } else if (student.toBePaidFee === 0) {
        console.log(`Enrollment is ${chalk.magenta("successful")}. You are a student of ${student.courseJoined}`)
    }
}




const loggedinTasks = async (student: Student) => {
    console.clear()

    let running = true

    PROMPT:
    while (running) {
        const answer = await inquirer.prompt({
            name: 'task',
            type: 'list',
            message: 'What would u like to do?',
            choices: ["Show Details", "Enroll in a course", "Add balance", "Pay tuition fee", "Check course status"]
        });

        if (answer.task === "Show Details") {
            console.log(`
            naem: ${student.firstName} ${student.lastName}
            age: ${student.age}
            phoneNumber: ${student.phoneNumber} 
            id: ${student.studentId}
            course joined: ${student.courseJoined}
            balance: ${student.balance}
            Dues to be paid: ${student.toBePaidFee}`)
            console.log("----------------------------------------")
            // continue PROMPT
        }
        else if (answer.task === "Enroll in a course") {
            await enroll(student, courses)
            console.log("----------------------------------------")
            // continue PROMPT
        }
        else if (answer.task === "Add balance") {
            await addBalance(student)
            console.log("----------------------------------------")
            // continue PROMPT
        }
        else if (answer.task === "Pay tuition fee") {
            await payFee(student)
            console.log("----------------------------------------")
            // continue PROMPT
        }
        else if (answer.task === "Check course status") {
            checkStatus(student)
            console.log("----------------------------------------")
        }

        let logoutConfirmation: string = "";

    while (logoutConfirmation !== "yes" && logoutConfirmation !== "no") {
        const logoutPrompt = await inquirer.prompt({
            name: 'answer',
            type: 'input',
            message: 'Do you want to continue (enter yes) or logout (enter no)?',
            default() {
                return "yes"
            }
        });
        logoutConfirmation = logoutPrompt.answer
    }

    if (logoutConfirmation === "yes") {
        continue PROMPT
    } else if (logoutConfirmation === "no") {
        await appExit()
    }

    }

}




export { loggedinTasks }