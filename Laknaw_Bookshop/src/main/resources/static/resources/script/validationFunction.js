//function for validate fullname 
const fullNameValidator = (fieldId) => {
  const fullNameValue = fieldId.value;
  const regPatttern = new RegExp("^([A-Z][a-z]{2,20}[\\s])+([A-Z][a-z]{2,20})$");

  if (fullNameValue != '') {
    if (regPatttern.test(fullNameValue)) {
      fieldId.classList.remove('is-invalid');
      fieldId.classList.add('is-valid');
      employee.fullname = fullNameValue;
    } else {
      fieldId.classList.remove('is-valid');
      fieldId.classList.add('is-invalid');
      employee.fullname = null;
    }
  } else {
    fieldId.classList.remove('is-valid');
    fieldId.classList.add('is-invalid');
    employee.fullname = null;
  }
}


const textValidator = (inputElement, pattern, object, property) => {
  if (inputElement.value != '') {
    const regPatttern = new RegExp(pattern);//it creates a regular expression object based on the provided pattern.
    if (regPatttern.test(inputElement.value)) {//tests whether the input value matches the regular expression pattern
      //valid
      window[object][property] = inputElement.value;//updates the specified property of the specified object with the input value
      inputElement.classList.remove('is-invalid');//removes the class 'is-invalid'
      inputElement.classList.add('is-valid');//adds the class 'is-valid' to the input element
    } else {
      window[object][property] = null;//sets the specified property of the specified object to 'null'
      inputElement.classList.remove('is-valid');//removes the class 'is-valid'
      inputElement.classList.add('is-invalid');//adds the class 'is-invalid' to the input element
    }
  } else {
    window[object][property] = null;  // null binding
    if (inputElement.required) {
      inputElement.classList.remove('is-valid');//If the inputElement is empty and required, it adds the class 'is-invalid' to the input element
      inputElement.classList.add('is-invalid');
    } else {
      inputElement.classList.remove('is-valid');//If the inputElement is empty and not required, it removes both 'is-valid' and 'is-invalid' classes from the input element
      inputElement.classList.remove('is-invalid');
    }
  }
}

const selectStaticValidator = (selectElement, object, property) => {
  if (selectElement.value != '') {
    window[object][property] = selectElement.value;
    selectElement.classList.remove('is-invalid')
    selectElement.classList.add('is-valid')
  } else {
    selectElement.classList.remove('is-valid')
    selectElement.classList.add('is-invalid')
    window[object][property] = null;
  }
}

const selectDynamicValidator = (selectElement, object, property) => {
  if (selectElement.value != '') {
    selectElement.classList.remove('is-invalid')
    selectElement.classList.add('is-valid')
    window[object][property] = JSON.parse(selectElement.value);
  } else {
    selectElement.classList.remove('is-valid')
    selectElement.classList.add('is-invalid')
    window[object][property] = null;
  }
}

const passwordRetypeValidator = (fieldId) => {
  if (textPassword.value == textrepassword.value) {
    user.password = textPassword.value;
    fieldId.classList.remove('is-invalid');
    fieldId.classList.add('is-valid');
  } else {
    user.password = null;
    fieldId.classList.remove('is-valid');
    fieldId.classList.add('is-invalid');
  }
}

const FileValidator = (fieldId, ob, propertyOne, propertyTwo, oldOb, priviousId, nameFieldId) => {
  if (fieldId.value != "") {
    let file = fieldId.files[0];//files enne array ekk widihta
    nameFieldId.value = file['name'];
    window[ob][propertyTwo] = file['name']

    let fileReader = new FileReader();

    fileReader.onload = function (e) {
      priviousId.src = e.target.result;
      window[ob][propertyOne] = btoa(e.target.result)//btoa eken result eka encrypt krnw
    }
    fileReader.readAsDataURL(file);
    return;
  }
}