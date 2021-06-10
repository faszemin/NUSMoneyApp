const expressmodule = require("express");
var axios = require('axios');

var app = expressmodule();

app.listen(8080, () => {
  console.log("Server running on port 8080");
 });

 app.get("/", (req, res) => {
  res.send(["Testing get all customer directly"]);
 });

app
.get("/customer/all" , (request,response) =>{
    console.log("Get All Customer Mock API Called");

    var data = '';

    var config = {
      method: 'get',
      url: 'https://a9dab2fe-426b-4a14-9fe8-2ef267e40ab1.mock.pstmn.io/customer/all',
      headers: { },
      data : data
    };
    

axios(config)
.then(function (apiresponse) {
  console.log(apiresponse.data);
  console.log(typeof(apiresponse));
  response.json(apiresponse.data);
})
.catch(function (error) {
  console.log(error);
});

    
   
});