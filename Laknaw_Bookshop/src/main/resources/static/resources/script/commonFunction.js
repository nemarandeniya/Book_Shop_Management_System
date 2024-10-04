//create  function for get service request
const getajaxServiceRequest = (url) => {
    let getServiceResponce;

    $.ajax(url, {
        contentType: "application/json",
        type: "GET",
        async: false,
        success: function (data) {
            console.log("Success " + data);
            getServiceResponce = data;
        },
        error: function (resData) {
            console.log("Error " + resData);
            getServiceResponce = [];
        }
    });
    return getServiceResponce;
}

const fillDataIntoSelect = (fieldId, message, dataList, propertyname, selectedValue) => {
    fieldId.innerHTML = "";

    if (message != '') {
        const msgOption = document.createElement("option");
        msgOption.innerText = message;
        msgOption.selected = "selected";
        msgOption.disabled = "disabled";
        fieldId.appendChild(msgOption);
    }

    dataList.forEach((element) => {
        const option = document.createElement("option");
        option.value = JSON.stringify(element);
        option.innerText = element[propertyname];
        if (selectedValue == element[propertyname]) {
            option.selected = true;
        }
        fieldId.appendChild(option);
    });
}

const getHTTPAjaxRequest = (url, method, ob) => {
    let serviceResponce;

    $.ajax(url, {
        type: method,
        contentType: "application/json",
        data: JSON.stringify(ob),
        async: false,
        success: function (data) {
            console.log(" Success " + data);
            serviceResponce = data;
        },
        error: function (resData) {
            console.log(" Fail" + resData);
            serviceResponce = resData;
        }
    });
    return serviceResponce;
}