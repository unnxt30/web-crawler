const {JSDOM} = require('jsdom');

normalizeURL = (str) => {
    const pattern = /:\/\/([^/]+\/.*)/;
    const extracted = str.match(pattern);

    const expectedString = extracted[1];

    if (expectedString[expectedString.length - 1] == "/"){
        return expectedString.slice(0, expectedString.length -1)
    }
    return expectedString;

}

module.exports = normalizeURL;


getURLsFromHTML = (htmlBody, baseURL) => {
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll('a');
    let linkArray = [];
    for (const link of links){
        let com = "http"
        let linkRef = link.href
        if(!linkRef.includes(com)){
            const newLink = baseURL.concat(linkRef);
            linkArray.push(newLink);
        }
        else{
            linkArray.push(linkRef);
        }
    }
    return linkArray;
}


crawlPage = async (currentURL) => {
    try{
        const response = await fetch(currentURL, {
            mode: 'cors'
        })
        if(response.status > 400){
            throw new error(`Error ${resoponse.status})`);
        }
        if(response.headers['content-type'])
    }
    


}













module.exports = {normalizeURL, getURLsFromHTML};