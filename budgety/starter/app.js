/*
//Creating different modules & interact them with one another.

//module 1
var budgetController=(function(){
    var x=23;
    var add=function(a){                //here x & add is private.
        return x+a;
    }
    return{                         //return object
        publicTest:function(b){  
        return add(b);
    }
    }
})();          //IIFE



//module 2
var UIController=(function(){
    
})();


//module 3
var controller=(function(budgetCtrl,UICtrl){      //passing outer two modules as a parameters for interacting with other modules.
  var z =  budgetCtrl.publicTest(5);
return {
    anotherPublic:function(){
        console.log(z);
    }
}
})(budgetController,UIController);   //arguments assigned to the paased parameters budgetCtrl & UICtrl

*/

//Budget controller
var budgetController=(function(){

    var Expense=function(id,description,value){   //constructor ==>name is starting with capital letter
        this.id=id;
        this.description=description;
        this.value=value;
    };
    
     var Income=function(id,description,value){   //constructor ==>name is starting with capital letter
        this.id=id;
        this.description=description;
        this.value=value;
    };
    
    //data structure for storing input data
    
    var data={        //object
      allItems: {
            exp:[],
            inc:[]
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    
    return{
       addItem: function(type, des, val) {
            var newItem, ID;
            
            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1
            
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;
        },
        testing:function(){
            console.log(data);
        }
    };
    
})(); //IIFE


//UI controller
var UIController=(function(){
    
        
    var DOMStrings={
        //class name from html code
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn'
    };
    return{                  //whatever gets returned will be assigned to the UIController function here which will be used by another modules to interact with this module
     getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        getDOMStrings:function(){
            return DOMStrings;
        }
    };
})();



//Global App Contoller
var controller=(function(budgetCtrl,UICtrl){  
   
    var setupEventListeners = function(){
            var DOM=UICtrl.getDOMStrings();  //to access properties from UICtrl object
    document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
    
    document.addEventListener('keypress',function(event){   //keypress event
        
       
        
       if(event.keyCode===13 || event.which===13){
          ctrlAddItem();                //as soon as user press enter button this function will be called
       }
    });
    };
    
  
    
    var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. Get the field input data
        input = UICtrl.getInput();        
        
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
        

            // 4. Clear the fields
            

            // 5. Calculate and update budget
        
            
            // 6. Calculate and update percentages
        
    
    };
    return{
        init:function(){
            console.log("wfgsdf");
            setupEventListeners();
        }
    };
       
})(budgetController,UIController); 


controller.init();