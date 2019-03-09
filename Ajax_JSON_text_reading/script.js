//Default Parameters
//If no parameters are passed then we can pass default parameters which will help in avoiding UNDEFINED

function Student(f_name,l_name,school="UCLA")
{
    this.f_name=f_name;
    this.l_name=l_name;
    this.school=school;
}

const john = new Student("john","ram","DAV");
console.log(john);

const john1 = new Student("john","ram");
console.log(john1);

//AJAX Module - Asynchronous Javascript and XML


