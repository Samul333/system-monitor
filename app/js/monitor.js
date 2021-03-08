const path = require('path');
const osu = require('node-os-utils');
const {ipcRenderer} = require('electron');
const cpu = osu.cpu;
const mem = osu.mem;
const os = osu.os;

let cpuOverload;
let alertFrequency;
let memOverload;

//Get the settings

ipcRenderer.on('settings:get',(e,settings)=>{
    cpuOverload =+settings.cpuOverload;
    alertFrequency = +settings.alertFrequency;
    memOverload = +settings.memOverload;
})

//Run every this amout of seconds

setInterval(()=>{


    mem.free().then(info=>{
        document.getElementById('mem-free').innerText = info.freeMemMb +'mb'
    })
    
    mem.used().then(info=>{
        const usedPercent = (info.usedMemMb/info.totalMemMb)*100; 

        if(usedPercent > memOverload && runNotify(alertFrequency)){
            const myNotification = new Notification('Danger', {
                body: 'Memory use has exceded more than 80%'
              })
        }
        
        if(usedPercent> memOverload){
        document.getElementById('mem-progress').style.backgroundColor = 'red';
            
        }


        else{
        document.getElementById('mem-progress').style.backgroundColor = '#30c88b';

        }

        document.getElementById('mem-used-percent').innerText = Math.floor(usedPercent) + '%'; 
        document.getElementById('mem-usage').innerText = info.usedMemMb +'mb';
        document.getElementById('mem-progress').style.width = usedPercent + '%';
    })

    //CPU usage

    cpu.usage().then(info=>{
      
        document.getElementById('cpu-usage').innerText = (+info).toFixed(2) +'%'
        document.getElementById('cpu-progress').style.width = info +'%';
        
        if(info> cpuOverload){
            document.getElementById('cpu-progress').style.backgroundColor='red';
        }
        else{
            document.getElementById('cpu-progress').style.backgroundColor='#30c88b';

        }

        if(info>=cpuOverload && runNotify(alertFrequency)){

     
            const myNotification = new Notification('Danger', {
                body: 'The notification is active'
              })
           }

    })

    cpu.free().then(info=>{
        document.getElementById('cpu-free').innerText = info +'%'
    })


   // SHow days hours and mins and seconds

   document.getElementById('sys-uptime').innerText  = secondsToDhms(os.uptime());


 

 

},3000)


//Check how much time has paased;

function runNotify(frequency){
    if(localStorage.getItem('lastNotify')===null){
        // Store Timestamp

        localStorage.setItem('lastNotify', +new Date())

        return true;
    }

    const notifyTime = new Date(parseInt(localStorage.getItem('lastNotify')))
    const now = new Date();
    const diffTime = Math.abs(now - notifyTime);
    const minutesPassed = Math.ceil(diffTime/(1000*60));

    if(minutesPassed>frequency){
        localStorage.setItem('lastNotify', +new Date())
        return true;
    }

    else{
        return false;
    }
}

function secondsToDhms(seconds){
        seconds = +seconds;
        const d = Math.floor(seconds/(3600*24));
        const h = Math.floor((seconds % (3600*24))/ 3600);
        const m = Math.floor((seconds % 3600)/ 60)
        const s = Math.floor(seconds %60);

        return `${d}d,${h}h,${m}m,${s}seconds`;

}


function showNotification(percent,overload){
    if(percent < overload) return;

    const myNotification = new Notification('Danger', {
        body: 'The notification is active'
      })

}

//Set Modal
document.getElementById('cpu-model').innerText = cpu.model();

//COmputer name

document.getElementById('comp-name').innerText = os.hostname();

// Os 

document.getElementById('os').innerText = `${os.type()} ${os.arch()}`

//Total memory

mem.info().then(info=>{
    document.getElementById('mem-total').innerText= info.totalMemMb;
})

