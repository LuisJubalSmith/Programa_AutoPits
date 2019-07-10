window.addEventListener('load', init, false);

function init() {

    const iptPlacaTxt = document.getElementById("iptPlacaTxt");
    const iptModeloTxt = document.getElementById("iptModeloTxt");
    const iptMarcaTxt = document.getElementById("iptMarcaTxt");
    const sltFechaCambioAceite = document.getElementById("sltFechaCambioAceite");
    const sltMarcaAceiteTxt = document.getElementById("sltMarcaAceiteTxt");
    const iptNotasTxt = document.getElementById("iptNotasTxt");
    const btnAdd = document.getElementById("btnAdd");
    const btnSalvarCambio = document.getElementById("btnSalvarCambio");
    const table = document.getElementById("table");
    const table2 = document.getElementById('table2')

    const autoPits = new Empresa('AutoPits');
    autoPits.registrarAuto(new Auto('509894', 'Geo', 'Trackrs', 2));

    mostrarTablaCarros();


    let aceites = [];
    aceites.push(new Aceite("Castrol", "MP56"));
    aceites.push(new Aceite("Shell", "SuperShell"));
    aceites.push(new Aceite("Valvoline", "2456"));
    aceites.push(new Aceite("Ucra", "BNG455"));
    aceites.push(new Aceite("DL", "DL777"));

    let currentAuto = null;

    sltMarcaAceite();



    btnAdd.onclick = function btnAddOnClick() {

        let placa = Number(iptPlacaTxt.value);
        let modelo = iptModeloTxt.value;
        let marca = iptMarcaTxt.value;


        if (placa !== '' && modelo !== '' && marca !== '') {


            let newAuto = new Auto(placa, modelo, marca);

            autoPits.registrarAuto(newAuto);

            Swal.fire({
                position: 'top',
                type: 'success',
                title: 'Sus Datos hancido guardados',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'El campo es requerido!',
                footer: '<a href>Falta algun campo por llenar</a>'
            })
        }

        iptPlacaTxt.value = '';
        iptModeloTxt.value = '';
        iptMarcaTxt.value = '';
        mostrarTablaCarros();
    }


    function sltMarcaAceite() {

        for (let index = 0; index < aceites.length; index++) {
            let option = document.createElement('option');
            option.innerHTML = aceites[index].marca;
            option.value = index;
            sltMarcaAceiteTxt.appendChild(option);
        }
    }


    function mostrarTablaCarros() {

        resultadoH3.innerHTML = "Tabla Auto-Clientes Autopits";
        table.innerHTML = '';

        let tr = document.createElement('tr');
        table.appendChild(tr);

        let th = document.createElement('th');
        tr.appendChild(th);
        th.innerHTML = 'Placa';

        th = document.createElement('th');
        tr.appendChild(th)
        th.innerHTML = 'Modelo';

        th = document.createElement('th');
        tr.appendChild(th);
        th.innerHTML = 'Marca';

        th = document.createElement('th');
        tr.appendChild(th);
        th.innerHTML = 'Cambio';

        th = document.createElement('th');
        tr.appendChild(th);
        th.innerHTML = 'Modificar';

        th = document.createElement('th');
        tr.appendChild(th);
        th.innerHTML = 'Agregar';

        th = document.createElement('th');
        tr.appendChild(th);
        th.innerHTML = 'Eliminar';

        for (let i = 0; i < autoPits.autos.length; i++) {

            tr = document.createElement('tr');
            table.appendChild(tr);

            let td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = autoPits.autos[i].placa;

            td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = autoPits.autos[i].modelo;

            td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = autoPits.autos[i].marca;

            td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = autoPits.autos[i].cambioAceites.length;

            td = document.createElement('td');
            tr.appendChild(td);
            let modificarBtn = document.createElement('button');
            modificarBtn.innerHTML = 'Mostrar';
            modificarBtn.onclick = mostrar;
            modificarBtn.placa = autoPits.autos[i].placa;
            td.appendChild(modificarBtn);

            td = document.createElement('td');
            tr.appendChild(td);
            let agregarBtn = document.createElement('button');
            agregarBtn.innerHTML = 'Agregar';
            agregarBtn.setAttribute('data-toggle', 'modal');
            agregarBtn.setAttribute('data-target', '#cambioAceite');
            agregarBtn.onclick = agregar;
            agregarBtn.placa = autoPits.autos[i].placa;
            td.appendChild(agregarBtn);

            td = document.createElement('td');
            tr.appendChild(td);
            let eliminarBtn = document.createElement('button');
            eliminarBtn.innerHTML = 'Eliminar';
            eliminarBtn.onclick = eliminar;
            eliminarBtn.dataset.placa = autoPits.autos[i].placa;
            td.appendChild(eliminarBtn);
        }
    }

    function eliminar(event) {

        if (autoPits.autos.length === 0) {
            Toast.fire({
                type: 'warning',
                title: 'Empty list',

            });
        } else {
            Swal.fire({
                title: 'Estas seguro que quieres borrar a ' + this.nombre,
                text: "No podrás revertir esto!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, borrarlo!'

            }).then((result) => {
                    if (result.value) {
                        Swal.fire({
                            title: 'Eliminado',
                            text: 'Su archivo ha sido eliminado.',
                            type: 'éxito'

                        })
                    }
                    if (result.value === true) {
                        autoPits.removerAuto(event.target.autoPlaca);
                        mostrarTablaCarros();
                    }
                }

            )
        }

    }


    btnSalvarCambio.onclick = function btnSalvarCambioOnClick() {

        let fechaCambioAceite = new Date(sltFechaCambioAceite.value);
        let month = fechaCambioAceite.getMonth();
        console.log(month);
        let day = fechaCambioAceite.getDay();
        let year = fechaCambioAceite.getFullYear();
        let fechaTotal = month + '/' + day + '/' + year;
        let aceite = aceites[sltMarcaAceiteTxt.value];
        let iptNotas = iptNotasTxt.value;


        //TODO: Pasar el objeto correct de aceite

        if (fechaTotal !== '' && iptNotas !== '') {

            let newCambioAceite = new CambioAceite(fechaTotal, iptNotas, aceite)

            currentAuto.cambioAceites.push(newCambioAceite);
            mostrarTablaCarros();
        }

        sltFechaCambioAceite.value = '';
        sltMarcaAceiteTxt.value = '';
        iptNotas.value = '';

    }

    function mostrarTablaCambios(auto) {

        resultadoH2.innerHTML = "Tabla Cambio Aceite Autopits";
        table2.innerHTML = '';

        let tr = document.createElement('tr');
        table2.appendChild(tr);

        let th = document.createElement('th');
        tr.appendChild(th);
        th.innerHTML = 'Fecha Cambio de Aceite';

        th = document.createElement('th');
        tr.appendChild(th);
        th.innerHTML = 'Marca de Aceite';

        th = document.createElement('th');
        tr.appendChild(th)
        th.innerHTML = 'Notas';

        th = document.createElement('th');
        tr.appendChild(th);
        th.innerHTML = 'Placa';

        for (let i = 0; i < auto.cambioAceites.length; i++) {


            tr = document.createElement('tr');
            table2.appendChild(tr);

            let td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = auto.cambioAceites[i].fecha;

            td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = auto.cambioAceites[i].aceite.marca;

            td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = auto.cambioAceites[i].notas;

            td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = auto.placa;


        }
    }

    function agregar(event) {


        let placa = event.target.placa;

        autoPits.autos.forEach(auto => {
            if (auto.placa === placa) {
                currentAuto = auto;
            }
        });

    }

    function mostrar(e) {

        let placa = e.target.placa;
        console.log(placa);


        autoPits.autos.forEach(auto => {
            if (auto.placa === placa) {
                mostrarTablaCambios(auto)
            }
        });

    }


};