
const inputField = document.getElementById("input-box");
const btn = document.querySelectorAll(".digits");
const all_c = document.getElementById("ac");
const clear = document.getElementById("clear");
const equal = document.getElementById("equal");
const plusMinus = document.getElementById("plusMinus");

let isError = false;

const tokenize = (exp)=>{
    let tokens = [];
    let number = "";

    for (let char of exp) {
        if (!isNaN(char) || char===".") {
            number = number + char;
        } else {
            tokens.push(Number(number));
            tokens.push(char);
            number = "";
        }
    }
    
    tokens.push(Number(number));
    return tokens;
}

function evaluate(tokens){
    for (let i=0;i <tokens.length; i++){
        if (tokens[i]==="*" || tokens[i]==="/"){
            let a = tokens[i-1];
            let b = tokens[i+1];

            if (tokens[i]=="/" && b === 0){
                return "error";
            }

            let result = tokens[i]=== "*" ? a*b : a/b;

            tokens.splice(i-1,3,result);
            i--;

            
    }
 } 

    for(let j=0; j<tokens.length; j++){
        if (tokens[j]==="+" || tokens[j]==="-"){
            let a = tokens[j-1];
            let b = tokens[j+1];

            let result = tokens[j]=== "+" ? a+b : a-b;

            tokens.splice(j-1,3,result);
            j--;
    }
} 

for(let k=0; k<tokens.length; k++){
        if (tokens[k]==="%"){
            let a = tokens[k-1];
            let b = tokens[k+1];
            
            let result = (a*b)/100;
            tokens.splice(k-1,3,result);
            k--;
    }
} 


return tokens[0];

}


function calculate (exp){
    const tokens = tokenize(exp);
    return evaluate(tokens);
}



const allclear = ()=>{
    inputField.value = "";
}

const cleared = ()=>{
    let str1 = inputField.value;
    console.log(str1);
    str1 = str1.slice(0,-1);
    // str1 = endstr;
    console.log(str1);
    inputField.value = str1;
    
};

const check = (value)=>{
    if (inputField.value==="" && isNaN(value)) {
        return false;   
};
return true;
};


const check_double = (value)=>{

    let str = inputField.value;

    let last_str = inputField.value[str.length-1];

    if ((value==="+" || value=== "*" || value=== "/" || value=== "%" || value==="-") && (last_str==="+" || last_str=== "*" || last_str=== "/" || last_str=== "%" || last_str==="-")){
        return false;
    } 
        return true; 
};

const shrinkText = ()=>{
    let text = inputField.value;

    let area = inputField;

    area.classList.remove("shrink", "shrinker");

    if (text.length>23){
        area.classList.add("shrinker");
    } else if(text.length>8){
        area.classList.add("shrink");
        
    }

    area.scrollLeft = area.scrollWidth;
}


const checkDot = (value)=>{
    if (value !== ".") return true;

    let str = inputField.value;
    let lastNumber = str.split(/[\+\-\*\/%]/).pop();
    return !lastNumber.includes(".");

}

const flip = ()=>{
 let str = inputField.value;

 if (str === "") return;

 let match = str.match(/(-?\d*\.?\d+)$/);

 if (!match) return;

 let number = match[0];

 let index = match.index;

 let flipped = number.startsWith("-")
                ? number.slice(1)
                : "-" + number;

                inputField.value = str.slice(0,index) + flipped;

}


btn.forEach(button => {
    button.addEventListener("click",(e)=>{

       if (isError) return;

       const value = e.target.dataset.value;
       console.log(value);

       

       if(!check(value)){
        return;
       };

       if(!check_double(value)){
        return;
       };

       if (!checkDot(value)) return;

       inputField.value = inputField.value + value;

       shrinkText();

       
    //    inputField.appendChild(value);
       return;
    });
});

all_c.addEventListener("click",()=>{
    allclear();
    isError= false;
    shrinkText();
}
);

clear.addEventListener("click",()=>{
    cleared();
    shrinkText();
})

equal.addEventListener("click",(value)=>{

    const exp = inputField.value;
    const result = calculate(exp);

    if (result=== "error"){
        inputField.value = "error";
        isError = true;
    } else {
        inputField.value = result;
    }

    shrinkText();
})

plusMinus.addEventListener("click",()=>{
    if (isError) return;
    flip();
    shrinkText();
})



