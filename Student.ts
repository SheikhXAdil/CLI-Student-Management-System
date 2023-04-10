class Student {
    constructor(firstName: string, lastName: string, age: number, phoneNumber: string, studentId: number) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.phoneNumber = phoneNumber
        this.studentId = studentId
    }

    public firstName: string;
    public lastName: string;
    public age: number;
    public phoneNumber: string;
    public balance = 0;
    public toBePaidFee = 0;
    public courseJoined = "";
    public Status = "Haven't joined any courses yet"

    public studentId: number;
    private _password: string = "";


    setPassword(password: string) {
        this._password = password
    }
    showPassword() {
        return this._password
    }

}


export default Student