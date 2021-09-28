const fs = require('fs');

const client = fs.readFileSync(`${__dirname}/../client/route-client.html`);
const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const adminPage = fs.readFileSync(`${__dirname}/../client/admin.html`);
const index = fs.readFileSync(`${__dirname}/../client/index.html`);
const suggestPage = fs.readFileSync(`${__dirname}/../client/suggest.html`);
const css = fs.readFileSync(`${__dirname}/../client/default-style.css`);

const getClient = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text-html' }); // send response headers
    response.write(client); // send content
    response.end(); // close connection
  };

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text-html' }); // send response headers
  response.write(errorPage); // send content
  response.end(); // close connection
};

const getAdmin = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text-html' }); // send response headers
  response.write(adminPage); // send content
  response.end(); // close connection
};

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text-html' }); // send response headers
  response.write(index); // send content
  response.end(); // close connection
};

const getSuggest = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text-html' }); // send response headers
  response.write(suggestPage); // send content
  response.end(); // close connection
};

const getCSS = (request,response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(css);
    response.end();    
}

const getIMG = (request,response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();    
}
module.exports.getClient = getClient;
module.exports.getAdmin = getAdmin;
module.exports.getIndex = getIndex;
module.exports.getSuggest = getSuggest;
module.exports.get404Response = get404Response;
module.exports.getCSS = getCSS;
module.exports.getIMG = getIMG;