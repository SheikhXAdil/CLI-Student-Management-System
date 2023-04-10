import chalk from "chalk";
import inquirer from "inquirer";
import Student from "./Student.js";
import { validateNumber, validation } from "./validation.js";
import { loggedinTasks } from "./LoggedInTasks.js";



const students: Student[] = []
let initialId: number = 23000;
let user: Student[];

let loginId: number = 0;
let loginUserpassword: string = "Null1";

let userId: number = 1;
let userpassword: string = "Null2";


const taskWhileLoggedOut = async () => {
    const answer = await inquirer.prompt({
        name: 'task',
        type: 'list',
        message: 'What would u like to do?',
        choices: ["Add a student", "Login as a student", "Show all students"]
    });

    if (answer.task === "Add a student") {
        await addStudent()
    } else if (answer.task === "Login as a student") {
        await login()
        console.log(chalk.green("Logged in successfully"))
    } else if(answer.task === "Show all students") {
        await showwAllStudents()
    }
}


const addStudent = async () => {
    const answer = await inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'Enter first name',
            default() {
                return "Null"
            },
            validate: validation
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Enter last name',
            default() {
                return "Null"
            },
            validate: validation
        },
        {
            name: 'age',
            type: 'input',
            message: 'Enter age',
            default() {
                return "Null"
            },
            validate: validateNumber
        },
        {
            name: 'phoneNumber',
            type: 'input',
            message: 'Enter phone number',
            default() {
                return "Null"
            },
            validate: validation
        },
        {
            name: 'password',
            type: 'input',
            message: 'Enter password',
            default() {
                return "Null"
            },
            validate: validation
        },
    ]);

    const student = new Student(answer.firstName, answer.lastName, Number(answer.age), answer.phoneNumber, (initialId + students.length + 1))
    student.setPassword(answer.password)


    students.push(student)
    console.clear()
    console.log("The student has been added with following details:")
    console.log(`
        naem: ${student.firstName} ${student.lastName}
        age: ${student.age}
        phoneNumber: ${student.phoneNumber} 
        id: ${student.studentId}`)

    await appExit()
}


const login = async () => {
    
    if (students.length === 0) {
        console.log("No students exist. Add students first")
        console.log("----------------------------------------")
        await taskWhileLoggedOut()
    }
    
    console.clear()
    console.log(chalk.cyanBright("Enter username and password to login: \n"))
    
    let idFiltered: Student[] = students;
    
    while (userId !== loginId) {
        const userIdLogin = await inquirer.prompt({
            name: 'id',
            type: 'input',
            message: 'Enter student ID:',
            default() {
                return "Null"
            }
        });
        loginId = Number(userIdLogin.id)

        idFiltered = students.filter((student) => loginId === student.studentId)
        if (idFiltered.length === 0) {
            console.log(chalk.red("Id does not exist. Check credentials"))
        } else {
            userId = idFiltered[0].studentId
            userpassword = idFiltered[0].showPassword()
        }
    }

    while (userpassword !== loginUserpassword) {
        const userpasswordLogin = await inquirer.prompt({
            name: 'password',
            type: 'input',
            message: 'Enter password:',
            default() {
                return "Null"
            }
        });
        loginUserpassword = userpasswordLogin.password
        if (userpassword !== loginUserpassword) {
            console.log(chalk.red("Wrong credentials"))
        }
    }
    
    loginId = 0;
    loginUserpassword = "Null1";
    
    userId = 1;
    userpassword = "Null2";

    await loggedinTasks(idFiltered[0])
    
}


const showwAllStudents = async () => {
    
    console.clear()
    if (students.length === 0) {
        console.log("No students exrolled. Add students")
        await taskWhileLoggedOut()
        
    } else if(students.length !== 0) {
        const mapedStudents = students.map((student) => {
            return {
                "naem": `${student.firstName} ${student.lastName}`,
                "age": `${student.age}`,
                "phoneNumber": `${student.phoneNumber}`, 
                "id": `${student.studentId}`, 
                "course joined": `${student.courseJoined}`
            }
        })
        console.log(mapedStudents)
        await appExit()
    }

}


const appExit = async () => {
    
    console.log("\n---------------------------------------")
    
    let exit: string = "";

    while (exit !== "yes" && exit !== "no") {
        const exitPrompt = await inquirer.prompt({
            name: 'answer',
            type: 'input',
            message: 'Do you want to exit the app?',
            default() {
                return "no"
            }
        });
        exit = exitPrompt.answer
    }
    if (exit === "no") {
        await taskWhileLoggedOut()

    } else if (exit === "yes") {
        console.log(`\n ${chalk.green("Thank you for using the app. Have a nice day")}`)
        process.exit(1)
    }
}


export { taskWhileLoggedOut, appExit, user }