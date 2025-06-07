// Function to display the current selection
// TODO
/* 1. get the value of the operation selected by the user from the element with id "operation"
   2. assign this value to a variable named operation
   3. get the element with id "selection-display" and assign it to a variable named selectionDisplay
   4. display the operation value by setting selectionDisplay's innerHTML to the operation variable
*/
function displaySelection() {
   const operation=document.getElementById("operation").value 
   const selectionDisplay=document.getElementById("selection-display");
   selectionDisplay.innerHTML=operation;
}

// Function to calculate the result based on selected operation
function calculateResult() {
    // Get the input value
    const inputElement = document.getElementById("inputNumber");
    const inputValue = parseFloat(inputElement.value);

    // Get the operation
    const operationElement = document.getElementById("operation");
    const operation = operationElement.value;
    
    // Get the result element
    const resultElement = document.getElementById("calculation-result");
    
    // Validate that the input is a number
    if (isNaN(inputValue)) {
        resultElement.textContent = "Invalid input. Please enter a number.";
        return;
    }

   let result;
   let operationText;
 
   if(operation==="double"){
      result=inputValue*2;
      operationText="doubled";
    } else if(operation==="triple"){
      result=inputValue*3;
      operationText="tripled";
    } else if(operation==="quadruple"){
      result=inputValue*4;
      operationText="quadrupled";
    } else if(operation==="half"){
         result=inputValue/2;
         operationText="halved";
    }else {
      resultElement.textContent = "Invalid operation selected.";
        return;
    }

    resultElement.textContent=`${inputValue} ${operationText} = ${result.toFixed(2)}`;


function clearResult() {
   document.getElementById("inputNumber").value="";
   document.getElementById("calculation-result").innerHTML="";
}
}