

function findChar(char){
    let obj ={}
    char = char.toLowerCase();

    for(let i=0; i<char.length;i++){

        if(char[i] ===' '){

        }

        else if(obj[char[i]]){
            
             obj[char[i]] = obj[char[i]] +1;
            
        }
        else{

            obj[char[i]] = 1
        }


    }

    return obj;


}


const obj = findChar('hello');
const obj2 = findChar('She has a smile and that seems to me');
console.log(obj2);