//1. Binary Search
// let numbers = prompt("Enter the digits");
// numbers = numbers.split(' ');
// console.log(typeof numbers);
console.log("-------------------------------------------");
console.log("BINARY SORT");
console.log("-------------------------------------------");
let numbers =[1,2,3,4,5];

// let toSearch = prompt("Enter the number to search");
// console.log(toSearch);
let toSearch = 2;
console.log(numbers.length);

let binarySearch = function (num_array,num_Search,start,end) {
        if(start>end) return false;

        let mid = Math.floor((start + end) /2);
        console.log("mid = " +mid);
        console.log("num _array_mid "+ num_array[mid]);
        console.log("To search "+ num_Search);
        
        if(num_array[mid]===num_Search){
            console.log("in here");
            return true;
        }
        else if(num_array[mid]>num_Search){
            return binarySearch(num_array,num_Search,start,mid-1);
        }
        else
        {
            return binarySearch(num_array,num_Search,mid+1,end);
        }       
}

if(binarySearch(numbers, toSearch ,0,numbers.length-1)){
    console.log("found");
}
else{
    console.log("not found");
}


//2. Bubble Sort
console.log("-------------------------------------------");
console.log("BUBBLE SORT");
console.log("-------------------------------------------");
let bubble_numbers =[5,3,1,9,8,2,4,7];

let bubbleSort = function(bubble_numbers){
    for(let i =0;i< bubble_numbers.length-1;i++)
    {
        for(let j = 0;j<bubble_numbers.length-i-1;j++)
        {
            if(bubble_numbers[j]>bubble_numbers[j+1])
            {
                let temp = bubble_numbers[j];
                bubble_numbers[j]=bubble_numbers[j+1];
                bubble_numbers[j+1]=temp;
            }
        }
    }
}
bubbleSort(bubble_numbers);
console.log(bubble_numbers);


//3. Function to check if a string is a palindrome.

console.log("-------------------------------------------");
console.log("Palindrome");
console.log("-------------------------------------------");
let word = "Leve l";
console.log("word : " + word);
let palindrome = function(word){
    let re = /[^A-Za-z0-9]/g; // or var re = /[\W_]/g;
    word = word.toLowerCase().replace(re, '');

        for(let j=0;j<word.length/2;j++)
        {
            if(word[j]!=word[word.length-j-1]){
                return false;
            }                
        }   
        return true;     
}

if(palindrome(word)){
    console.log("Yes");
}
else{
    console.log("No");
}
