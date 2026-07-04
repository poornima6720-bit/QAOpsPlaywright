import { expect, type Locator, type Page } from '@playwright/test';
let message1: string= "Hello";
message1= "bye";
console.log(message1);

let age1: number= 20
console.log(age1);
let isActive: boolean= true;
let numberArray:number[]= [1,2,3] 

let data: any= "Anything"
data= 2;

function add1(a:number,b:number):number
{
    return a+b;
}

console.log(add1(2,3))

let user1:{name:string, age:number, location:string}=
{
    name: "Bob",
    age: 34,
    location: "Chennai"
}
user1.location= "Coimbatore"
