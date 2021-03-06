// Temp Array
const stops = [
  { address: 'Penny Lane', client: 'Paul McCartney' },
  { address: 'Abbey Road', client: 'George Harrison' },
  { address: 'In his own head', client: 'Ringo Starr' },
  { address: 'Tittenhurst Park', client: 'John Lennon' },
];

// pull in underscore.js for shuffle
const _ = require('underscore');

// Gets all the routes in the database
const getAllRoutes = () => {
  const responseObj = _.shuffle(stops);
  /*   if (type === true) {
    let responseXML = '<response>';
    for (i = 0; i < limit; i++) {
      responseXML += `
      <joke>
        <q>${responseObj[i].q}</q>
        <a>${responseObj[i].a}</a>
      </joke>
      `;
    }
    responseXML += '</response>';
    return responseXML;
  } */

  return JSON.stringify(responseObj);
};

const getRoutesResponse = (request, response, params, acceptedTypes, httpMethod) => {
/*   if (acceptedTypes.includes('text/xml') === true) {
    if(httpMethod === "HEAD"){
      response.writeHead(200,{ 'Content-Type': 'text/xml','Content-Length': getBinarySize(getAllRoutes(params.limit,true))});
      response.end();
    }else{
    response.writeHead(200,{ 'Content-Type': 'text/xml' });
    response.write(getAllRoutes(params.limit, true));
    response.end();
  }

  } else {
    if(httpMethod === "HEAD"){
      response.writeHead(200,{ 'Content-Type': 'application/json','Content-Length': getBinarySize(getAllRoutes(params.limit,false))})
      response.end();
    }else{
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(getAllRoutes());
    response.end();
    }
  } */

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(getAllRoutes());
  response.end();
};

const respondJsonMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const respondJson = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const postAddClient = (request, response, body) => {
  const responseJSON = {
    message: 'address and name are both required',
  };

  console.log(body);
  if (!body.address || !body.client) {
    responseJSON.id = 'missingParams';
    return respondJson(request, response, 400, responseJSON);
  }

  const responseCode = 201;

  stops.push({ address: body.address, client: body.client });

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJson(request, response, responseCode, responseJSON);
  }
};

module.exports.getRoutesResponse = getRoutesResponse;
module.exports.postAddClient = postAddClient;
