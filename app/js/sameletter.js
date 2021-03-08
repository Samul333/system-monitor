

function sameletters(str1,str2){

    const obj1={};
    const obj2={};

    if(str1.length != str2.length){
        return false;
    }


    for(let n of str1){
        n= n.toLowerCase();
        
        obj1[n] = ++obj1[n] || 1
    }

    for (let n of str2){

        n=n.toLowerCase();

        obj2[n] = ++obj2[n] || 1

    }

    for(let n of str1){

        if(obj1[n] !== obj2[n]){
            return false
        }

    }

    return true;
}

const bool = sameletters('aabcdd','cbadad');

const name = 'Samul'

function switchName(name){

    name='Happy'

    console.log(name);

}

switchName(name);

console.log(name)