const argv = require('node:process'); 

function main(){
    const arguments = process.argv;
    // console.log(process.argv)
    if (arguments.length == 3){
        console.log(`The Crawler is starting at ${arguments[2]}...`)
        return;
    }
    else{
        console.log("not the reqd amount of arguments :/");
        return -1;
    }
}

main()