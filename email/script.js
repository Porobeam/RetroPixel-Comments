const validateForm = () => {
    const getValue = (id) => document.getElementById(id).value;
    const firstname = getValue('firstname');
    const lastname = getValue('lastname');
    const email = getValue('email');
    const message = getValue('message');

    const isEmpty = (value) => value.trim() === '';

    if (isEmpty(firstname) || isEmpty(lastname) || isEmpty(email) || isEmpty(message)) {
        alert('Por favor, completa todos los campos.');
        return false;
    }

    return true;
};
