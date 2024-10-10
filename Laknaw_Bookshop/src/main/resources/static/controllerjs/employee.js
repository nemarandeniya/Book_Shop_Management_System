window.addEventListener("load", () => {
  // tooltip enable
  $('[data-bs-toggle="tooltip"]').tooltip();

  userPrivilege = getajaxServiceRequest("/privilege/bylogedusermodule/Employee")

  //call table refresh function
  refreshEmployeeTable();

  //call form refresh function
  refreshEmployeeForm();
});

const refreshEmployeeTable = () => {
  employees = [];

  //call jquary ajax function
  //ajax("URL",option)
  $.ajax("/employee/alldata", {
    contentType: "json",
    type: "GET",
    async: false,
    success: function (data) {
      console.log("Success " + data);
      employees = data;
    },

    error: function (resData) {
      console.log("Error " + resData);
      employees = [];
    },
  });

  const displayPropertyList = [
    { dataType: "text", propertyName: "fullname" },
    { dataType: "text", propertyName: "nic" },
    { dataType: "photoarray", propertyName: "emp_photo" },
    { dataType: "text", propertyName: "email" },
    { dataType: "text", propertyName: "mobile" },
    { dataType: "function", propertyName: getDesignation },
    { dataType: "function", propertyName: getEmployeeStatus },
  ];

  fillDataIntoTable(
    employeeTable,
    employees,
    displayPropertyList,
    employeeFormRefill,
    deleteEmployee,
    printEmployee,
    userPrivilege
  );

  //disable delete button
  employees.forEach((element, index) => {
    if (element.employeestatus_id.name == "Delete") {
      if (userPrivilege.delete) {
        employeeTable.children[1].children[index].children[8].children[0].children[1].children[1].visibility = "hidden";
      }
    }
  });

  $("#employeeTable").dataTable();

  // divModifyButton.className = "d-none";
};

const refreshEmployeeForm = () => {
  employee = new Object();

  employeeStatus = getajaxServiceRequest("/employeeStatus/alldata");
  fillDataIntoSelect(selectStatus, "Select your status", employeeStatus, "name")

  designation = getajaxServiceRequest("/designation/alldata");
  fillDataIntoSelect(selectDestination, "Select your designation", designation, "name")

  //disable update button and enable add button
  btnUpdate.style.visibility = "hidden";
  // btnUpdate.style.cursor = "not-allowed";
  //$("#btnUpdate").css("cursor","not-allowed");

  btnAdd.style.visibility = "";
  // btnAdd.style.cursor = "pointer";
}


const employeeFormRefill = (ob) => {
  $("#collapseWidthExample").collapse("show");
  employee = JSON.parse(JSON.stringify(ob));
  oldEmployee = JSON.parse(JSON.stringify(ob));//for compare updates

  textFullName.value = ob.fullname;
  textCallingName.value = ob.callingname;
  textNic.value = ob.nic;
  textEmail.value = ob.email;
  textmobile.value = ob.mobile;
  selectDate.value = ob.dob;
  textAddress.value = ob.address;
  selectGender.value = ob.gender;

  if (ob.landno != null) {
    textland.value = ob.landno;
  } else {
    textland.value = "";
  }

  if (ob.note != null) {
    textNote.value = ob.note;
  } else {
    textNote.value = "";
  }

  designation = getajaxServiceRequest("/designation/alldata");
  fillDataIntoSelect(selectDestination, "Select designation", designation, "name", ob.designation_id.name)

  employeeStatus = getajaxServiceRequest("/employeeStatus/alldata");
  fillDataIntoSelect(selectStatus, "Select your status", employeeStatus, "name", ob.employeestatus_id.name)

  selectCivilStatus.value = ob.civilstatus;


  let userPrivilege = getajaxServiceRequest("/privilege/bylogedusermodule/Employee")

  if (userPrivilege.update) {
    btnUpdate.style.visibility = "";
  } else {
    btnUpdate.style.visibility = "hidden";
  }
  //disable update button and enable add button
  btnAdd.style.visibility = "hidden";
  btnUpdate.style.visibility = "";





};

const getDesignation = (ob) => {
  return ob.designation_id.name;
};

const getEmployeeStatus = (ob) => {
  if (ob.employeestatus_id.name == "Working") {
    // return '<p class="status-working">' + ob.employeestatus_id.name + "</p>";
    return '<p class="status-working">' + ob.employeestatus_id.name + '</p>';
  }

  if (ob.employeestatus_id.name == "Resign") {
    return '<p  class="status-resign">' + ob.employeestatus_id.name + '</p>';
  }

  if (ob.employeestatus_id.name == "Delete") {
    return '<p  class="status-delete">' + ob.employeestatus_id.name + '</p>';
  } else {
    return '<p  class="status-other">' + ob.employeestatus_id.name + '</p>';
  }
};

const deleteEmployee = (ob) => {
  let userConfirm = confirm("Are you sure to delete following employee \n" + ob.fullname);
  if (userConfirm) {
    let deleteServiceResponce;

    $.ajax("/employee", {
      type: "DELETE",
      contentType: "application/json",
      data: JSON.stringify(ob),
      async: false,
      success: function (data) {
        deleteServiceResponce = data;
      },
      error: function (errorData) {
        deleteServiceResponce = errorData;
      }

    });
    if (deleteServiceResponce == "OK") {
      alert("Delete successfully..!");
      refreshEmployeeTable();
      formEmployee.reset();
      refreshEmployeeForm();
    } else {
      alert("Delete Not Competed : " + deleteServiceResponce);
    }
  }
};
const printEmployee = (ob) => {
  const employeePrint = ob;

  tdFullName.innerText = employeePrint.fullname;
  tdNic.innerText = employeePrint.nic;
  tdMobile.innerText = employeePrint.mobile;
  tdEmail.innerText = employeePrint.email;
  tdDesignation.innerText = employeePrint.designation_id.name;
  tdStatus.innerText = employeePrint.employeestatus_id.name;
  $('#printModalEmployee').modal('show');
};

const printEmployeeDataBtn = () => {
  const newTab = window.open();
  newTab.document.write(
    '<link rel="stylesheet" href="resources/bootstrap-5.2.3/css/bootstrap.min.css">'
    + printEmployeeData.outerHTML
  );

  setInterval(function () {
    newTab.print()
  }, 1000)
}
const printEmployeeTableBtn = () => {

  const newTab = window.open();
  newTab.document.write(
    '<head><title>Print Employee</title>'
    + '<script src="resources/script/jquery-3.7.1.js"></script>' +
    '<link rel="stylesheet" href="resources/bootstrap-5.2.3/css/bootstrap.min.css">'
    + employeeTable.outerHTML +
    '<script> $(".modify-button").css("display","none")</script>'
  );

  setInterval(function () {
    newTab.print()
  }, 1000)
}

const employeeSubmitButton = () => {
  console.log(employee);
  const userSubmitResponse = confirm('Are you sure to submit...?');

  if (userSubmitResponse) {
    let postServiceResponce;

    //URL: "/employee" - This is the URL to which the AJAX request is being sent.
    // Type: "POST" - This specifies the HTTP method used for the request.
    // ContentType: "application/json" - This specifies the content type of the data being sent in the request body. In this case, it's JSON data.
    // Data: JSON.stringify(employee) - This converts the employee object into a JSON string, which is then sent as the request body.
    // Async: false - This option makes the AJAX request synchronous, meaning that JavaScript execution will pause until the request completes.
    // Success: This is a callback function that will be executed if the request is successful. It takes data as a parameter, which represents the response from the server. In this case, it logs "success" followed by the response data to the console and assigns the response data to the variable postServiceResponce.
    // Error: This is a callback function that will be executed if the request encounters an error. It takes resData as a parameter, which represents the error response from the server. In this case, it logs "Fail" followed by the error response data to the console and assigns the error response data to the variable postServiceResponce.
    $.ajax("/employee", {
      type: "POST", contentType: "application/json", data: JSON.stringify(employee), async: false,
      success: function (data) {
        console.log("success" + data);
        postServiceResponce = data;
      },
      error: function (resData) {
        console.log("Fail" + resData);
        postServiceResponce = resData
      }
    });
    if (postServiceResponce == "OK") {
      alert("Save Successfully..!");
      $("#collapseWidthExample").collapse("hide");
      refreshEmployeeForm();
      formEmployee.reset();
      refreshEmployeeTable();
    } else {
      alert("Fail to submit employee form \n" + postServiceResponce);
    }
  } else {
    alert("Form has following error...");
  }
}

const checkEmployeeFormUpdates = () => {
  let updates = "";
  if (employee.fullname != oldEmployee.fullname) {
    updates = updates + "Employee Fullname is changed..! \n";
  }
  if (employee.callingname != oldEmployee.callingname) {
    updates = updates + "Employee Callingname is changed..! \n";
  }
  if (employee.nic != oldEmployee.nic) {
    updates = updates + "Employee Nic is changed..! \n";
  }
  if (employee.gender != oldEmployee.gender) {
    updates = updates + "Employee Gender is changed..! \n";
  }
  if (employee.email != oldEmployee.email) {
    updates = updates + "Employee Email is changed..! \n";
  }
  if (employee.mobile != oldEmployee.mobile) {
    updates = updates + "Employee Mobile is changed..! \n";
  }
  if (employee.landno != oldEmployee.landno) {
    updates = updates + "Employee Land number is changed..! \n";
  }
  if (employee.note != oldEmployee.note) {
    updates = updates + "Employee Note is changed..! \n";
  }
  if (employee.civilstatus != oldEmployee.civilstatus) {
    updates = updates + "Employee Civil Status is changed..! \n";
  }
  if (employee.employeestatus_id.id != oldEmployee.employeestatus_id.id) {
    updates = updates + "Employee Employee Status is changed..! \n";
  }
  if (employee.designation_id.id != oldEmployee.designation_id.id) {
    updates = updates + "Employee Designation is changed..! \n";
  }
  return updates;
}

const updateEmployee = () => {
  console.log("update");

  let errors = getErrors();
  if (errors == "") {
    let updates = checkEmployeeFormUpdates();
    if (updates == "") {
      alert("Nothing Updated..!");
    } else {
      //user confirmation
      let userConfirm = confirm("Are You sure to update following changes? \n " + updates);
      if (userConfirm) {
        //call put service request
        let putServiceResponce;

        $.ajax("/employee", {
          type: "PUT",
          async: false,
          contentType: "application/json",
          data: JSON.stringify(employee),
          success: function (successResponceOb) {
            putServiceResponce = successResponceOb;
          },
          error: function (failResponceOb) {
            putServiceResponce = failResponceOb;
          },
        });

        //check put service Responce
        if (putServiceResponce == "OK") {
          alert("Update Sucessfully..!");
          $("#collapseWidthExample").collapse("hide");
          refreshEmployeeTable();
          formEmployee.reset();
          refreshEmployeeForm();
        } else {
          alert("Update not complete : \n" + putServiceResponce);
        }
      }
    }
  } else {
    alert("Form has following errors..! \n" + errors);
  }


}

const getErrors = () => {
  let errors = ""
  if (employee.fullname == null) {
    textFullName.classList.add("is-invalid");
  }
  if (employee.callingname == null) {
    textCallingName.classList.add("is-invalid");
  }
  if (employee.mobile == null) {
    textmobile.classList.add("is-invalid");
  }
  if (employee.nic == null) {
    textNic.classList.add("is-invalid");
  }
  if (employee.gender == null) {
    selectGender.classList.add("is-invalid");
  }
  if (employee.email == null) {
    textEmail.classList.add("is-invalid");
  }
  if (employee.address == null) {
    textAddress.classList.add("is-invalid");
  }
  if (employee.dob == null) {
    selectDate.classList.add("is-invalid");
  }
  if (employee.civilstatus == null) {
    selectCivilStatus.classList.add("is-invalid");
  }
  if (employee.designation_id == null) {
    selectDestination.classList.add("is-invalid");
  }
  if (employee.employeestatus_id == null) {
    selectStatus.classList.add("is-invalid");
  }
  return errors;
}
