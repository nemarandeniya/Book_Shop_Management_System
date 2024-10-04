

const fillDataIntoTable = (tableId, dataList, displayPropertyList, refillFunction, deleteFunction, printFunction, privilegeOb = null) => {

  const tableBody = tableId.children[1];
  tableBody.innerHTML = '';

  dataList.forEach((element, index) => {
    const tr = document.createElement('tr');

    const tdIndex = document.createElement('td');
    tdIndex.innerText = index + 1;
    tr.appendChild(tdIndex);

    displayPropertyList.forEach((ob, ind) => {
      const td = document.createElement('td');
      if (ob.dataType == 'text') {
        td.innerText = element[ob.propertyName];
      }
      if (ob.dataType == 'function') {
        td.innerHTML = ob.propertyName(element);
      }

      tr.appendChild(td);

    });

    const tdButton = document.createElement('td'); // button column
    tdButton.className = 'text-center modify-button';

    const dropdownDIV = document.createElement('div');
    dropdownDIV.className = 'dropdown';

    const dropdownI = document.createElement('i');
    dropdownI.className = 'fa-solid fa-ellipsis-vertical mt-2';
    dropdownI.setAttribute('data-bs-toggle', 'dropdown');
    dropdownI.setAttribute('aria-expanded', 'false');

    dropdownDIV.appendChild(dropdownI);

    const dropdownUL = document.createElement('ul');
    dropdownUL.className = 'dropdown-menu';

    const dropdownLiEdit = document.createElement('li');
    dropdownLiEdit.className = 'dropdown-item';
    // dropdownLiEdit.innerText = 'edit';
    if (privilegeOb != null && privilegeOb.update) {
      dropdownUL.appendChild(dropdownLiEdit);
    }


    const dropdownLiDelete = document.createElement('li');
    dropdownLiDelete.className = 'dropdown-item';
    // dropdownLiDelete.innerText = 'Delete';
    if (privilegeOb != null && privilegeOb.delete) {
      dropdownUL.appendChild(dropdownLiDelete);
    }

    const dropdownLiPrint = document.createElement('li');
    dropdownLiPrint.className = 'dropdown-item';
    // dropdownLiPrint.innerText = 'Print';
    dropdownUL.appendChild(dropdownLiPrint);

    dropdownDIV.appendChild(dropdownUL);

    tdButton.appendChild(dropdownDIV);

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-outline-success w-100 fw-bold';
    editButton.innerHTML = '<i class="fa-solid fa-edit fa-beat "></i> Edit';

    editButton.onclick = function () {
      //console.log('edit');
      refillFunction(element, index);
    }

    dropdownLiEdit.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-outline-danger fw-bold w-100';
    deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-beat "></i> Delete';

    deleteButton.onclick = function () {
      // console.log('delete' , element);
      deleteFunction(element, index);
    }

    dropdownLiDelete.appendChild(deleteButton);

    const printButton = document.createElement('button');
    printButton.className = 'btn btn-outline-info fw-bold w-100';
    printButton.innerHTML = '<i class="fa-solid fa-print fa-beat "></i> Print';

    printButton.onclick = function () {
      // console.log('print');
      printFunction(element, index);
    }

    dropdownLiPrint.appendChild(printButton);


    tr.appendChild(tdButton); // append button column into table row

    tableBody.appendChild(tr); // append tr into table body



  });

}