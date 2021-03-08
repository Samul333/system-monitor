

function same(arr1,arr2){

    const obj1={}
    const obj2={}

    if(arr1.length !== arr2.length){
        return false;
    }

    for(let n of arr1){

        obj1[n] = ++obj1[n] || 1;

    }


    for(let n of arr2){
        obj2[n] = ++obj2[n] || 1;
    }


    for(let n in obj1){

        if(!(n**2) in obj2){
            return false;
        }

        if(obj1[n] !== obj2[n**2]){
            return false;
        }


    }

    console.log(obj1,obj2)

    return true;

}

const bool = same([1,1,2,3],[1,1,4,9]);

console.log(bool);