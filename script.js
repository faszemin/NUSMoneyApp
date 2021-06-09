var selectedRow = null;
var selectedRowId = null;
//var cust_table_record = null;

function getCustDataFromServer()
{
    console.log("Get Cust Data From Server");
    var requestOptions = {
      method: "GET",
    };

    fetch("http://localhost:3000/customer/all", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("In fetch method");
   
      var table = document.getElementById("customerList").getElementsByTagName('tbody')[0];

      
   
      data.forEach(function (item) { 
        var newRow = table.insertRow(table.length);
        newRow.id = item.cust_id;
        console.log(`Row Element Id: ${newRow.id}`)
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = item.first_name;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = item.last_name;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = item.email;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = item.contact_number;
        cell4 = newRow.insertCell(4);
        cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                        <a onClick="onDelete(this)">Delete</a>`;
      });

    })
    .catch((error)=> console.log("UI rendering Error:"+error));
}


function onEdit(td) {
   
    selectedRow = td.parentElement.parentElement;
    console.log(`Selected Row Id: ${selectedRow.id}`);
    selectedRowId = selectedRow.id;
    document.getElementById("firstNameId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lastNameId").value = selectedRow.cells[1].innerHTML;
    document.getElementById("emailId").value = selectedRow.cells[2].innerHTML;
    document.getElementById("contactNoId").value = selectedRow.cells[3].innerHTML;
}


function onFormSubmit() { 
        console.log("On submit method");
        var formData;
        if (selectedRow == null){
            formData = readFormDataNew();
            insertNewRecord(formData);
        }
        else{
            formData = readFormDataUpdate();
            updateRecord(formData);
        }
        resetForm();

}

function readFormDataUpdate() {
    console.log("In readFormData() - Update");
    var formData = {};
    formData["firstname"] = document.getElementById("firstNameId").value;
    formData["lastname"] = document.getElementById("lastNameId").value;
    formData["email"] = document.getElementById("emailId").value;
    formData["contact"] = document.getElementById("contactNoId").value;
    formData["id"] = selectedRowId;
    return formData;
}

function readFormDataNew() {
    console.log("In readFormData() - New");
    var formData = {};
    formData["firstname"] = document.getElementById("firstNameId").value;
    formData["lastname"] = document.getElementById("lastNameId").value;
    formData["email"] = document.getElementById("emailId").value;
    formData["contact"] = document.getElementById("contactNoId").value;
    formData["id"] = "";
    return formData;
}


function readFormData() {
    console.log("In readFormData()");
    var formData = {};
    formData["firstname"] = document.getElementById("firstNameId").value;
    formData["lastname"] = document.getElementById("lastNameId").value;
    formData["email"] = document.getElementById("emailId").value;
    formData["contact"] = document.getElementById("contactNoId").value;
    formData["id"] = selectedRowId
    return formData;
}

function resetForm() {
    document.getElementById("firstNameId").value = "";
    document.getElementById("lastNameId").value = "";
    document.getElementById("emailId").value = "";
    document.getElementById("contactNoId").value = "";
    selectedRow = null;
    selectedRowId = null;
}

function updateRecord(formData) {
    console.log("In updateRecord:");
    console.log(formData);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    // Populate this data from e.g. form.
    var raw = JSON.stringify(formData);

    console.log("Raw Data");

    console.log(raw);

    var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
      };

      fetch("http://localhost:3000/customer/update", requestOptions)
      .then((response) => response.text())
      .catch((error) => console.log("error", error));

    selectedRow.cells[0].innerHTML = formData.firstname;
    selectedRow.cells[1].innerHTML = formData.lastname;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.contact;

}

function insertNewRecord(data) {
    console.log("In Insert New Record:");
    console.log(data);


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    // Populate this data from e.g. form.
    var raw = JSON.stringify(data);

    console.log("Raw Data");

    console.log(raw);

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      fetch("http://localhost:3000/customer/add", requestOptions)
      .then((response) => response.json())
      .then((responseData) => 
      {console.log("Data:");


      
    var table = document.getElementById("customerList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    
    newRow.id = responseData.insertId;
    console.log("Row Element Id:"  +newRow.id);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.firstname;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.lastname;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.contact;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;

    })
    .catch((error) => console.log("error", error));
}



  function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        selectedRow = td.parentElement.parentElement;
        console.log(`Selected Row Id: ${selectedRow.id}`);
        selectedRowId = selectedRow.id;
        var requestOptions = {
            method: "DELETE",
        };
        fetch(`http://localhost:3000/customer/delete?id=${selectedRowId}`, requestOptions)
        .then((response) => response.text())
        .catch((error) => console.log("error", error));
    }
    document.getElementById("customerList").deleteRow(selectedRow.rowIndex);
    selectedRow = null;
    selectedRowId = null;
  }