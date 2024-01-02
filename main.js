const {crawlPage} = require('./crawl.js');


async function main(){
    const arguments = process.argv;
    // console.log(process.argv)
    if (arguments.length == 3){
        console.log(`The Crawler is starting at ${arguments[2]}...`)
    }
    else{
        console.log("not the reqd amount of arguments :/");
    }
    const pages = {};
    console.log(crawlPage(arguments[2], arguments[2], pages));
}

main()
