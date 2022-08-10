
    let form = document.querySelector('.cont-form');
    form.first_name.focus();
    form.addEventListener('submit', (e) => {
        
        let errors = [];

        let first_name = document.querySelector('#first_name');
		let last_name = document.querySelector('#last_name');
		let email = document.querySelector('#email');
		let password = document.querySelector('#password');
		let role_id = document.querySelector('#role_id');
		let image = document.querySelector('#image');

		
        if (first_name.value == '') {
            errors.push('El campo Nombre no puede estar vacío');
            first_name.classList.add('is-invalid');
        } else {
            first_name.classList.add('is-valid');
            first_name.classList.remove('is-invalid');
        };
        if (first_name.value <= 0 || name.value < 2) {
            errors.push('El campo Nombre debe tener al menos 2 caracteres');
            first_name.classList.add('is-invalid');
        } else {
            first_name.classList.add('is-valid');
            first_name.classList.remove('is-invalid');
            form.price.focus();
        };
        if (last_name.value == '') {
            errors.push('El campo Apellido no puede estar vacío');
            last_name.classList.add('is-invalid');
        } else {
            last_name.classList.add('is-valid');
            last_name.classList.remove('is-invalid');
        };
        if (last_name.value <= 0 || name.value < 2) {
            errors.push('El campo Apellido debe tener al menos 2 caracteres');
            last_name.classList.add('is-invalid');
        } else {
            last_name.classList.add('is-valid');
            last_name.classList.remove('is-invalid');
            form.price.focus();
        };

        if (email.value == '') {
            errors.push('El campo Email no puede estar vacío');
            email.classList.add('is-invalid');
        } else {
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
        };
         
        if (password.value == '') {
            errors.push('El campo Password no puede estar vacío');
            password.classList.add('is-invalid');
        } else {
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
        };
         if (password.value <= 0 || name.value < 8) {
            errors.push('El campo Password debe tener al menos 8 caracteres');
            password.classList.add('is-invalid');
        } else {
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
            form.price.focus();
        };
        if (image.value <= 0 || image.value > 10) { //cambiarlo
            errors.push('El campo imagen debe tener los formatos (JPG, JPEG, PNG, GIF).');
            image.classList.add('is-invalid');
        } else {
            image.classList.add('is-valid');
            image.classList.remove('is-invalid');
            form.description.focus();
        };
        
        //Aquí controlo que es lo que debo hacer si hay o no errores en el formulario

        if (errors.length > 0) {
            e.preventDefault();
            let ulErrors = document.querySelector('.errors');
            ulErrors.classList.add('alert-warning');
            ulErrors.innerHTML = '';
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += `<li >  ${errors[i]} </li>`;
            };
        }else{
            alert('La validación fué exitosa')
            form.submit();
        }

    });

