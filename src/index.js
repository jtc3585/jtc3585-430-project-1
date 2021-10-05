// pull in the HTTP server module
const http = require('http');

// pull in URL and query modules (for URL parsing)
const url = require('url');
const query = require('querystring');
const path = require('path');

const responseHandler = require('./responses');
const htmlHandler = require('./htmlResponses');
const { parse } = require('path');

const urlStruct = {
  '/admin': htmlHandler.getAdmin,
  '/': htmlHandler.getIndex,
  '/home': htmlHandler.getIndex,
  '/suggest': htmlHandler.getSuggest,
  '/route-client.html': htmlHandler.getClient,
  '/default-style.css': htmlHandler.getCSS,
  notFound: htmlHandler.get404Response,
  '/getRoutes': responseHandler.getRoutesResponse,
};

// locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {
  if(parsedUrl.pathname === '/addClient'){
    const body = [];

    //https://nodejs.org/api/http.html
    request.on('error', (err)=>{
      console.dir(error);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', ()=>{
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      responseHandler.postAddClient(request,response,bodyParams)

    });
  }
}
// this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;

  const params = query.parse(parsedUrl.query);
  const { limit } = params;

  if(request.method ==="POST"){
    handlePost(request,response, parsedUrl);
    return;
  }

  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  const httpMethod = request.method;

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params, acceptedTypes, httpMethod);
  } else {
    urlStruct.notFound(request, response);
  }
};

// create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port); // method chaining!
