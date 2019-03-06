//Constructors in JS
function Person (name,lastName){
        this.name=name,
        this.lastName=lastName,
        this.fullName=function(){
        //console.log('Hello my full name is ${this.name} ${this.lastName} and i like JS');
        console.log("Hello - " + this.lastName + " " +this.name);
        }
}
//below new keyword is creating an empty object
//Ot will point back to the objet that wr have created globally
const ajay = new Person("Ajay","Goel");
console.log(ajay);

// we can also access the global objects using window
console.log(window.lastName);
//to display the whole content of the constructor

console.log(ajay.constructor);

// If we don;t have the access to the constructor property:
const susy = new ajay.constructor("susy","test");
console.log(susy);
console.log(susy.fullName);

//Factory functions in JS
function createPerson (name,lastName){
    return {
        name:name,
        lastName:lastName,
        fullName:function(){
        //console.log('Hello my full name is ${this.name} ${this.lastName} and i like JS');
        console.log("Hello - " + this.lastName + " " +this.name);
        }
    };
}

const john = createPerson("john","anderson");
const Bob = createPerson("Bob","hill");
const Susy = createPerson("Susy","chaplin");

john.fullName();
Bob.fullName();
Susy.fullName();

//Prototypal Inheritance Model
// This means that every constructor function/class has a property that is shared by each
// instance of the constructor/class. So, any properies and methods of prototype can be accessed 
// by every instance. Prototype means returns object.
// It helps in avoiding creating unnecessary copy of data in constructor but in proto

function Person_pro (name,lastName){
    this.name=name,
    this.lastName=lastName;
}

Person_pro.prototype.school = "DLDAV MODEL SCHOOL";
Person_pro.prototype.fullName=function(){
    //console.log('Hello my full name is ${this.name} ${this.lastName} and i like JS');
    console.log("Hello - " + this.lastName + " " +this.name);
};

const ajay2= new Person_pro("Ajay2","Goel2");

console.log(ajay2);
ajay2.fullName();

 // check for a prototype:
 console.log(ajay2.constructor.prototype);
 console.log(Object.getPrototypeOf(ajay2));
 //object type prototype is at the top of the food chain,
 // we can prove that all prototypes share property by //
 console.log(Object.getPrototypeOf(Object.getPrototypeOf(ajay2)));
 console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(ajay2))));
 //null means no more shared value of the object prototype

// ES6 Prototypal Inheritence
function Employee(id){
    this.id=id; 
}

Employee.prototype.showId = function(){
    console.log('My id is '+ this.id);
};

const aj2 = new Employee(2);
console.log(aj2);
aj2.showId();

function Manager(id, name, department){
    Employee.call(this,id);
    this.name = name;
    this.department=department;
}

Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager; 
Manager.prototype.callMeeting = function(){
    console.log("I'm calling a meeting");
};

const sara = new Manager(34,"sara","sales");
console.log(sara);
sara.callMeeting();
sara.showId();

//defining classes in JS

//Case1:  defining two classes separately

// class Employee2{
//     constructor(id){
//         this.id=id;
//     }
//     showId(){
//         console.log("This is my id "+ this.id);
        
//     }
// }

// const aj3 = new Employee2(2);
// aj3.showId();
// console.log(aj3);


// class Manager2{
//     constructor(name,department){
//         this.name = name;
//         this.department=department;
//     }
//     callMeeting2(){
//         console.log("I am calling a 2 meeting");
        
//     }
// }

// const aj4 = new Manager2("Sara","marketing");
// console.log(aj4);

// case 2: Inheritence
//Inheritence using classes


class Employee2{
    constructor(id){
        this.id=id;
    }
    showId(){
        console.log("This is my id "+ this.id);
        
    }
}

const aj3 = new Employee2(2);
aj3.showId();
console.log(aj3);


class Manager2 extends Employee2{
    constructor(id,name,department){
        super(id);
        this.name = name;
        this.department=department;
    }
    callMeeting2(){
        console.log("I am calling a 2 meeting");
        
    }
}

const aj4 = new Manager2(34,"Sara","marketing");
console.log(aj4);
aj4.showId();