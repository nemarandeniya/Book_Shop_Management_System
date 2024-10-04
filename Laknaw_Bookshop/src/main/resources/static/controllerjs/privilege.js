window.addEventListener("load", () => {
    refreshPrivilegeTable();
    refreshPrivilegeForm();
});

const refreshPrivilegeTable = () => {
    privilege = [];
    privilege = getajaxServiceRequest("/privilege/findall");

    const displayPropertyList = [{ dataType: "function", propertyName: getRole },
    { dataType: "function", propertyName: getModuele },
    { dataType: "function", propertyName: getSelectPrivi },
    { dataType: "function", propertyName: GetInsertPrivi },
    { dataType: "function", propertyName: GetUpdatePrivi },
    { dataType: "function", propertyName: getDeleteprivi }
    ];

    //call fillDataIntoTable function
    fillDataIntoTable(privilegeTable, privilege, displayPropertyList, privilegeFormRefill, DeletePrivilege, Printprivilege);

    //call jquery datatable function
    $("#privilegeTable").dataTable();
};

const refreshPrivilegeForm = () => {
    privilege = new Object();

    roles = getajaxServiceRequest("/role/listwithoutadmin");
    fillDataIntoSelect(selectRole, "Select Role", roles, "name")

    modules = getajaxServiceRequest("/module/alldata");
    fillDataIntoSelect(selectModule, "Select Module", modules, "name")
};

const getRole = (ob) => {
    return ob.role_id.name;
}

const getModuele = (ob) => {
    return ob.module_id.name;
}

const getSelectPrivi = (ob) => {
    if (ob.selpriv) {
        return "<i class='fa-solid fa-circle-check fa-xl' style='color: #63E6BE;'></i>";
    } else {
        return "<i class='fa-solid fa-xmark-circle fa-xl' style='color: #ec1354;'></i>";
        // return "<i class='fa-solid fa-xmark-circle fa-2x' ></i>";
    }
}

const GetInsertPrivi = (ob) => {
    if (ob.insertpriv) {
        return "<i class='fa-solid fa-circle-check fa-xl' style='color: #63E6BE;'></i>";
    } else {
        return "<i class='fa-solid fa-xmark-circle fa-xl' style='color: #ec1354;'></i>";
    }
}

const GetUpdatePrivi = (ob) => {
    if (ob.updpriv) {
        return "<i class='fa-solid fa-circle-check fa-xl' style='color: #63E6BE;'></i>";
    } else {
        return "<i class='fa-solid fa-xmark-circle fa-xl' style='color: #ec1354;'></i>";
    }
}

const getDeleteprivi = (ob) => {
    if (ob.delpriv) {
        return "<i class='fa-solid fa-circle-check fa-xl' style='color: #63E6BE;'></i>";
    } else {
        return "<i class='fa-solid fa-xmark-circle fa-xl' style='color: #ec1354;'></i>";
    }
}

const privilegeSubmitButton = () => {
    console.log("privilege");
    const privilegeSubmitResponse = confirm('Are you sure to submit..?');

    if (privilegeSubmitResponse) {
        let postServiceResponce;

        $.ajax("/privilege", {
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(privilege),
            async: false,
            success: function (data) {
                console.log("success" + data);
                postServiceResponce = data;
            },
            error: function (resData) {
                console.log("Fail" + resData);
                postServiceResponce = resData;
            }
        });
        if (postServiceResponce == "OK") {
            alert("Save Successfully..!");
            $("#collapseWidthExample").collapse("hide");
            refreshPrivilegeForm();
            privilegeForm.reset();
            refreshPrivilegeTable();
        } else {
            alert("Fail to submit employee form \n" + postServiceResponce);
        }
    } else {
        alert("Form has following error...");
    }
}

const privilegeFormRefill = () => { }

const DeletePrivilege = (rowOb) => {
    console.log("delete");

    //user confirmation
    let userConfirm = confirm("Role : " + rowOb.role_id.name +
        "\n Module : " + rowOb.module_id.name +
        "\n Are you sure to delete above privilege..?");

    if (userConfirm) {
        let deleteServiceResponce = getHTTPAjaxRequest("/privilege", "Delete", rowOb);

        if (deleteServiceResponce == "OK") {
            alert("Delete Successfully..!");
            refreshPrivilegeTable();
            privilegeForm.reset();
            refreshPrivilegeForm();
        } else {
            alert("Delete Not Competed : " + deleteServiceResponce);
        }
    }
}

const Printprivilege = () => {
    $('#printModalPrivilege').modal('show');
}

const printPrivilageDataBtn = () => {
    const newTab = window.open();
    newTab.document.write(
        '<link rel="stylesheet" href="resources/bootstrap-5.2.3/css/bootstrap.min.css">'
        + printPrivilegeData.outerHTML
    );

    setInterval(function () {
        newTab.print()
    }, 1000)
}

const printPrivilegeTableBtn = () => {
    const newTab = window.open();
    newTab.document.write(
        '<head><title>Print Employee</title>'
        + '<script src="resources/script/jquery-3.7.1.js"></script>' +
        '<link rel="stylesheet" href="resources/bootstrap-5.2.3/css/bootstrap.min.css">' +
        ' <link rel="stylesheet" href="resources/fontawesome-free-6.4.2/css/all.css" />'
        + privilegeTable.outerHTML +
        '<script> $(".modify-button").css("display","none")</script>'
    );

    setInterval(function () {
        newTab.print()
    }, 1000)
}