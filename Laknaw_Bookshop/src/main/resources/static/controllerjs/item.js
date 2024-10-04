window.addEventListener("load", () => {
    refreshItemTable();
    refreshItemForm();
});

const refreshItemTable = () => {

    items = getajaxServiceRequest("/item/alldata");

    const displayColumnList = [
        { dataType: "text", propertyName: "booktitle" },
        { dataType: "text", propertyName: "author" },
        { dataType: "function", propertyName: getGenre },
        { dataType: "text", propertyName: "purchaseprice" },
        { dataType: "text", propertyName: "saleprice" },
        { dataType: "function", propertyName: getStatus }
    ];

    fillDataIntoTable(itemTable, items, displayColumnList, refillItemForm, deleteItem, printItem)

    $("#itemTable").dataTable();
};

const getGenre = (ob) => {
    return ob.genre_id.name
}

const getStatus = (ob) => {
    if (ob.bookstatus_id.name == "Available") {
        return '<p class="status-available"> Available </p>';
    } if (ob.bookstatus_id.name == "Out of Stock") {
        return '<p class="status-outOfStock"> Out of Stock </p>';
    } if (ob.bookstatus_id.name == "Discontinued") {
        return '<p class="status-discontinued"> Discontinued </p>';
    } else {
        return '<p class="status-preOrder"> pre-Order </p>';
    }
}

const refreshItemForm = () => {
    item = new Object();

    genre = getajaxServiceRequest("/genre/alldata");
    fillDataIntoSelect(selectGenre, "Select Book Genre", genre, "name")

    bookStatus = getajaxServiceRequest("/bookstatus/alldata");
    fillDataIntoSelect(selectStatus, "Select Book Status", bookStatus, "name")

    subGenre = getajaxServiceRequest("/subgenre/alldata")
    fillDataIntoSelect(selectSubGenre, "Select Sub-genre", subGenre, "name")

    packageType = getajaxServiceRequest("/packagetype/alldata");
    fillDataIntoSelect(selectPackageType, "Select Package type", packageType, "name")

    brand = getajaxServiceRequest("/brand/alldata");
    fillDataIntoSelect(selectBrand, "Select Brand", brand, "name")
}
const refillItemForm = () => { }
const deleteItem = () => { }
const printItem = () => { }

