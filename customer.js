//Refers to database.js
const database = require("./databaseconnection");
const expressmodule = require("express");

router = expressmodule.Router();

router
.get("/customer/all" , (request,response) =>{
    console.log("Get All Customer API Called");
    console.log("SQL: select * from customer ")
    database.connection.query(`select * from customer`,
    (sqlerror, sqlresult) => {
        console.log("Get All Cust - Result");
        if(sqlerror){
            console.log(`Error Occured ${sqlerror}`);
            response.status(500).send(`Error Occured ${sqlerror}`);
        }
        else{
            console.log(`SQL sucessfully ran`);
            //database.connection.commit();
            response.status(200).send(sqlresult); 

        }
    });
});

//priya's code
// a POST API to store the record received in the request
router.put("/customer/update", (request, response) => {
    console.log("Get update Customer API Called");
    console.log( `update customer set first_name =${request.body.firstname}, 
    last_name = ${request.body.lastname},
    email=${request.body.email}, contact_number=${request.body.contact}
    where cust_id= ${request.body.id}`);

      database.connection.query(
        `update customer set first_name ='${request.body.firstname}', 
        last_name = '${request.body.lastname}',
        email='${request.body.email}', contact_number='${request.body.contact}' 
        where cust_id=${request.body.id}`, 
       
        (errors, results) => {
          console.log("Get update Cust - Result");
          if (errors) {
            console.log(`Error Occured in update ${errors}`);
            response.status(500).send("Some error occurred");
          } else {
            console.log(`SQL update sucessfully ran`);
            response.status(200).send("Record saved successfully!");
          }
        }
      );
    });
  //priya's code

  //TJ Code - Start
  router.post("/customer/add", (request, response) => {
    console.log("Add Customer API Called");
    console.log(`insert into customer (first_name, last_name, email, contact_number) values 
    ('${request.body.firstname}','${request.body.lastname}','${request.body.email}','${request.body.contact}')`);


    database.connection.query(
      `insert into customer (first_name, last_name, email, contact_number) values 
      ('${request.body.firstname}','${request.body.lastname}','${request.body.email}','${request.body.contact}')`,
      (errors, results) => {
        // console.log(errors)
        if (errors) {
          response.status(500).send("Some error occurred");
          // console.log(response.status(500).send("Some error occurred"))
        } else {
          console.log("Result:");
          console.log(results);
          response.status(200).send(results);
        }
      }
    );
  });
  //TJ Code - End

  router.delete("/customer/delete", (request, response) => {
      
      console.log(`delete t from transactions t left join account a on t.account_id = a.account_id where a.cust_id = ${request.query.id};`);
      database.connection.query(
        `delete t from transactions t left join account a on t.account_id = a.account_id where a.cust_id = ${request.query.id};` ,
        (errors, results) => {
          if (errors) {
            console.log("Error:");
            console.log(errors);
            //response.status(500).send("Some error occurred");
          } else {
          console.log("Sucess Result");
          console.log(results);
            //response.status(200).send("Record deleted successfully!");
          }
        });

        console.log(`delete a from account a left join customer c on a.cust_id = c.cust_id where a.cust_id = ${request.query.id};`);
        database.connection.query(
            `delete a from account a left join customer c on a.cust_id = c.cust_id where a.cust_id = ${request.query.id};` ,
            (errors, results) => {
              if (errors) {
                console.log("Error:");
                console.log(errors);
                //response.status(500).send("Some error occurred");
              } else {
              console.log("Sucess Result");
              console.log(results);
                //response.status(200).send("Record deleted successfully!");
              }
            });

            console.log(`delete c from customer c where c.cust_id = ${request.query.id};`);
            database.connection.query(
                `delete c from customer c where c.cust_id = ${request.query.id};` ,
                (errors, results) => {
                  if (errors) {
                    console.log("Error:");
                    console.log(errors);
                    //response.status(500).send("Some error occurred");
                  } else {
                  console.log("Sucess Result");
                  console.log(results);
                    //response.status(200).send("Record deleted successfully!");
                  }
                });
  });

module.exports = {router};