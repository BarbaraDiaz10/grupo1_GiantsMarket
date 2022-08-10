
    let form = document.querySelector('.cont-form');
    form.first_name.focus();
    form.addEventListener('submit', (e) => {
        
        let errors = [];

		let email = document.querySelector('#email');
		let password = document.querySelector('#password');
		
       
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

