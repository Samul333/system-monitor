const path = require('path');
const osu = require('node-os-utils');

const cpu = osu.cpu;
const mem = osu.mem;
const os = osu.os;

//Run every this amout of seconds

setInterval(()=>{


    mem.free().then(info=>{
        document.getElementById('mem-free').innerText = info.freeMemMb +'mb'
    })
    
    mem.used().then(info=>{
        const usedPercent = (info.usedMemMb/info.totalMemMb)*100; 
        document.getElementById('mem-used-percent').innerText = Math.floor(usedPercent) + '%'; 
        document.getElementById('mem-usage').innerText = info.usedMemMb +'mb';
        document.getElementById('mem-progress').style.width = usedPercent + '%';
    })

    //CPU usage

    cpu.usage().then(info=>{
      
        document.getElementById('cpu-usage').innerText = info +'%'
        document.getElementById('cpu-progress').style.width = info +'%';
        
    })

    cpu.free().then(info=>{
        document.getElementById('cpu-free').innerText = info +'%'
    })


   // SHow days hours and mins and seconds

   document.getElementById('sys-uptime').innerText  = secondsToDhms(os.uptime());


 

},3000)



function secondsToDhms(seconds){
        seconds = +seconds;
        const d = Math.floor(seconds/(3600*24));
        const h = Math.floor((seconds % (3600*24))/ 3600);
        const m = Math.floor((seconds % 3600)/ 60)
        const s = Math.floor(seconds %60);

        return `${d}d,${h}h,${m}m,${s}seconds`;

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