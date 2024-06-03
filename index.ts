#!/usr/bin/env node

import inquirer from "inquirer"
//  Define th estudent class 

class student {
    static counter = 10000;
    id: number;
    name: string;
    course: string[];
    balance: number;

    constructor(name: string){
        this.id = student.counter++;
        this.name = name;
        this.course = [];//initilize empty array for courses
        this.balance = 100;

    }

//  Method to enroll a satudent in a course
enrollCourse (course: string){
    this.course.push(course);
}
// Method to view a student balance
viewBalance(){
    console.log(`Balance for ${this.name} : $${this.balance}`);
}

// Method to pay student fees
payFees(amount: number){
    this.balance-= amount;
    console.log(`$${amount}fees paid successfully for ${this.name}`);

}
//Method to display student status
showStatus(){
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Courses: ${this.course}`);
    console.log(`Balance: ${this.balance}`);
}
}
// Define a student manager class to ,manage students
class StudentManager {
    students:student[]

    constructor(){
        this.students = [];
    }
    // Method to add a new student
    addStudent(name:string){
        let Student = new student(name);
        this.students.push(Student);
        console.log(`Student: ${name}added successfully. Student ID: ${Student.id}`);
    }

// Method to enroll a student in a course
  enrollStudent(student_id: number, course: string){
    let student = this.students.find(std => std.id === student_id);
    if(student){
    student.enrollCourse(course);
    console.log(`${student.name} enrolled in ${course} successfully`);
}
  }

// Method to view a student balance

viewStudentBalance(student_id: number){
    let student = this.find_student(student_id);
    if(student){
    student.viewBalance();
    }
    else{
    console.log('student not found.Please enter a correct student ID');
   }
}

// Method to pay student Fees

    payStudentFees(student_id: number, amount:number){

    let student = this.find_student(student_id);
    if(student)
    {
    student.payFees(amount);
    }
    else{
    console.log('Student not found.Please enter a correct student ID.');
   } 
}
// Method to display student status

show_student_status(student_id: number){
    let student = this.find_student(student_id);
    if (student){
        student.showStatus();
    }
}

// Method to find a student by student_id

find_student(student_id: number){
    return this.students.find(std => std.id === student_id);
   }
 }

//  Main function to run the program

async function main(){
    console.log('Welcome to Student Management System')
    console.log("-".repeat(50));

    let studentManager = new StudentManager();

    // While loop to keep program running

    while(true){
        let choice = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select an Option',
            choices:[
                "Add Student",
                "Enroll Student",
                "View Dtudent Balance",
                "Pay Fees",
                "Show Status",
                "Exit"
        ]
        }
    ]);

    // Using Switch case to handle user choice

    switch(choice.choice){
        case "Add Student":
            let name_input =await inquirer.prompt([
                {
                name: "name",
                type: "input",
                message: "Enter a Student Name",
            }
        ]);
        studentManager.addStudent(name_input.name);
     break;

     case "Enroll Student":
        let course_input = await inquirer.prompt([
            {
                name: "student_id",
                type: "number",
                message: "Enter a student ID",
            },
            {
                name: "course",
                type: " input",
                message: "Enter a Course Name",
            }
        ]);

        studentManager.enrollStudent(course_input.student_id, course_input)
        break;

        case "View Student Balance":
            let balanceInput = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: "Enter a student ID",
                }
               
            ]);
    
            studentManager.viewStudentBalance(balanceInput.student_id);
            break;

            case "Pay Fees":
                let feesInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                   {
                        name: "amount",
                        type: "number",
                        massage: "Enter the amount to Pay"
                   }
                ]);
        
                studentManager.payStudentFees(feesInput.student_id, feesInput.amount);
                break;

    case "Show Status":
    let status_input = await inquirer.prompt([
        {
            name: "student_id",
            type: "number",
            massage: "Enter a student ID"
       }
    ]);
    studentManager.show_student_status(status_input.student_id);
    break;

    case"Exit":
    console.log("Exiting...");
    process.exit();
  
}

 }
    
}

// Run the main function
main();
