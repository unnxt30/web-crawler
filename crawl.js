const { JSDOM } =  require('jsdom');
async function crawlPage(baseURL, currentURL, pages) {
    let urlBase = new URL(baseURL);
    let urlCurrent = new URL(currentURL);

    if(!(urlBase.host == urlCurrent.host)){
        return pages;
    }

    let normalizedCurrentURL = (normalizeURL(currentURL)); 
    if(normalizedCurrentURL in pages){
        pages[normalizedCurrentURL] += 1;
        return pages;   
    }
    else{
        if(normalizedCurrentURL == baseURL){
            pages[normalizedCurrentURL] = 0;
        }
        else{
            pages[normalizedCurrentURL] = 1;
        }
    }
    console.log(`crawling ${currentURL}`)
    let htmlBody = '';
    try{
        const response = await fetch(currentURL);
        if (response.status > 399){
        console.log(`Got HTTP error, status code: ${response.status}`)
            return pages
        }
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')){
            console.log(`Got non-html response: ${contentType}`)
            return pages
        } 
        htmlBody = await response.text();
    }
    catch(err){
        console.log(err)
    }

    const linkArray = getURLsFromHTML(htmlBody, baseURL);
    for(let next of linkArray){
        pages = await crawlPage(baseURL, next, pages);
    }
    return pages;
}

normalizeURL = (str) => {
    const url = new URL(str);
    if(url.pathname){
        let result = `${url.host}${url.pathname}`
        if(result[result.length - 1] == '/'){
           result = result.slice(0,-1);
        }
        return result 
    }
    return `${url.host}`;
   
};

getURLsFromHTML = (htmlBody, baseURL) => {
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  let linkArray = [];
  for (const link of links) {
    let com = "http";
    let linkRef = link.href;
    if (!linkRef.includes(com)) {
      const newLink = baseURL.concat(linkRef);
      linkArray.push(newLink);
    } else {
      linkArray.push(linkRef);
    }
  }
  return linkArray;
};

module.exports = {crawlPage, normalizeURL, getURLsFromHTML} ;
