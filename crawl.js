const { JSDOM } =  require('jsdom');
async function crawlPage(baseURL, currentURL, pages) {
    if (!currentURL.includes(baseURL)) {
        return pages;
    }
    
    let normalizedCurrentURL = normalizeURL(currentURL);
    if(normalizedCurrentURL in pages){
        pages[normalizedCurrentURL] += 1;
        return pages;
    }
    
    if(normalizedCurrentURL == baseURL){
        pages[normalizedCurrentURL] = 0;
    }
    else{
        pages[normalizedCurrentURL] = 1;
    };

    const response = fetch(currentURL);
    const htmlBody = await response.text();
    console.log(htmlBody);
    const arrayURL = getURLsFromHTML(htmlBody, baseURL);
    
    for(const newCurrentURL of arrayURL){
        crawlPage(baseURL, newCurrentURL, pages);
    };

    return pages;
}

normalizeURL = (str) => {
  const pattern = /:\/\/([^/]+\/.*)/;
  const extracted = str.match(pattern);

  const expectedString = extracted[1];

  if (expectedString[expectedString.length - 1] == "/") {
    return expectedString.slice(0, expectedString.length - 1);
  }
  return expectedString;
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
