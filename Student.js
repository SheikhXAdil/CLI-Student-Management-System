class Student {
    constructor(firstName, lastName, age, phoneNumber, studentId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.studentId = studentId;
    }
    firstName;
    lastName;
    age;
    phoneNumber;
    balance = 0;
    toBePaidFee = 0;
    courseJoined = "";
    Status = "Haven't joined any courses yet";
    studentId;
    _password = "";
    setPassword(password) {
        this._password = password;
    }
    showPassword() {
        return this._password;
    }
}
export default Student;
