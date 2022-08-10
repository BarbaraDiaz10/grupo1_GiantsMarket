
    let form = document.querySelector('.cont-form');
    form.name.focus();
    form.addEventListener('submit', (e) => {
        
        let errors = [];

        let name = document.querySelector('#name');
		let price = document.querySelector('#price');
		let image = document.querySelector('#image');
		let description = document.querySelector('#description');
		let description_detail = document.querySelector('#description_detail');
		let stock = document.querySelector('#stock');

		
        if (name.value == '') {
            errors.push('El campo Nombre del Producto no puede estar vacío');
            name.classList.add('is-invalid');
        } else {
            name.classList.add('is-valid');
            name.classList.remove('is-invalid');
        };
        if (name.value <= 0 || name.value < 5) {
            errors.push('El campo Nombre del Producto debe tener al menos 5 caracteres');
            name.classList.add('is-invalid');
        } else {
            name.classList.add('is-valid');
            name.classList.remove('is-invalid');
            form.price.focus();
        };
        if (price.value <= 0 || price.value < 1000) {
            errors.push('El campo precio no puede ser menor a cero ni menor a 1000');
            price.classList.add('is-invalid');
        } else {
            price.classList.add('is-valid');
            price.classList.remove('is-invalid');
            form.image.focus();
        };
        if (image.value <= 0 || image.value > 10) { //cambiarlo
            errors.push('El campo imagen debe tener los formatos (JPG, JPEG, PNG, GIF).');
            image.classList.add('is-invalid');
        } else {
            image.classList.add('is-valid');
            image.classList.remove('is-invalid');
            form.description.focus();
        };
		if (description.value <= 0 || description.value < 20) {
            errors.push('El campo Descripción debe tener al menos 20 caracteres');
            description.classList.add('is-invalid');
        } else {
            description.classList.add('is-valid');
            description.classList.remove('is-invalid');
            form.description_detail.focus();
        };
		 if (description_detail.value <= 0 || description_detail.value < 20) {
            errors.push('El campo Descripción Detalle no puede ser menor a cero ni menor a 20');
            description_detail.classList.add('is-invalid');
        } else {
            description_detail.classList.add('is-valid');
            description_detail.classList.remove('is-invalid');
            form.stock.focus();
        };
        if (stock.value == "") {
            errors.push('El campo stock no puede estar vacio');
            stock.classList.add('is-invalid');
        } else {
            stock.classList.add('is-valid');
            stock.classList.remove('is-invalid');
            form.length.focus();
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

