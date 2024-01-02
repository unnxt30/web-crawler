const printReport = (pages) => {
    console.log('The report is starting...');
    pagesArray = [];
    for (let val in pages){
        pagesArray.push([val, pages[val]]);
    }
    pagesArray.sort(function(a,b){
        return a[1] - b[1];
    })
    console.log(pagesArray)
    for(const counts of pagesArray){
        console.log(`Found ${counts[1]} count of ${counts[0]}`);
    }
}



module.exports = {printReport}

