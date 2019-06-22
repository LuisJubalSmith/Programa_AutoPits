window.addEventListener('load', init, false);

function init() {

    let iptPlacaTxt = document.getElementById("iptPlacaTxt");
    let iptModeloTxt = document.getElementById("iptModeloTxt");
    let iptMarcaTxt = document.getElementById("iptMarcaTxt");
    let sltFechaCambioAceite = document.getElementById("sltFechaCambioAceite");
    let iptMarcaAceiteTxt = document.getElementById("iptMarcaAceiteTxt");
    let iptTipoAceiteTxt = document.getElementById("iptTipoAceiteTxt");
    let iptNotasTxt = document.getElementById("iptNotasTxt");
    let btnAdd = document.getElementById("btnAdd");
    let btnSalvarCambio = document.getElementById("btnSalvarCambio");
    let table = document.getElementById("table");

    let AutoPits = new Empresa('AutoPits');
    AutoPits.registrarAuto(new Auto('509894', 'Geo', 'Trackrs', 2));

    mostrarTabla();



    btnAdd.onclick = function btnAddOnClick() {


        let placa = Number(iptPlacaTxt.value);
        let modelo = iptModeloTxt.value;
        let marca = iptMarcaTxt.value;


        if (placa !== '' && modelo !== '' && marca !== '') {

            let cambioAceite = datosCambioAceite();
            let newAuto = new Auto(placa, modelo, marca, cambioAceite);

            AutoPits.registrarAuto(newAuto);

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
        mostrarTabla();


    }

    function mostrarTabla() {

        resultadoH3.innerHTML = "Tabla Cambio Aceite Autopits";
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

        for (let i = 0; i < AutoPits.autos.length; i++) {

            tr = document.createElement('tr');
            table.appendChild(tr);

            let td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = AutoPits.autos[i].placa;

            td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = AutoPits.autos[i].modelo;

            td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = AutoPits.autos[i].marca;

            td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = AutoPits.autos[i].cambioAceite;

            td = document.createElement('td');
            tr.appendChild(td);
            let modificarBtn = document.createElement('button');
            modificarBtn.innerHTML = 'Mostrar';
            modificarBtn.onclick = mostrar;
            modificarBtn.autoPlaca = AutoPits.autos[i];
            modificarBtn.dataset.placa = AutoPits.autos[i].placa;
            td.appendChild(modificarBtn);

            td = document.createElement('td');
            tr.appendChild(td);
            let agregarBtn = document.createElement('button');
            agregarBtn.innerHTML = 'Agregar';
            agregarBtn.setAttribute('data-toggle', 'modal');
            agregarBtn.setAttribute('data-target', '#cambioAceite');
            agregarBtn.onclick = agregar;
            agregarBtn.autoPlaca = AutoPits.autos[i];
            agregarBtn.dataset.placa = AutoPits.autos[i].placa;
            td.appendChild(agregarBtn);

            td = document.createElement('td');
            tr.appendChild(td);
            let eliminarBtn = document.createElement('button');
            eliminarBtn.innerHTML = 'Eliminar';
            eliminarBtn.onclick = eliminar;
            eliminarBtn.autoPlaca = AutoPits.autos[i];
            eliminarBtn.dataset.placa = AutoPits.autos[i].placa;
            td.appendChild(eliminarBtn);
        }
    }


    function eliminar(event) {

        if (AutoPits.autos.length === 0) {
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
                        AutoPits.removerAuto(event.target.autoPlaca);
                        mostrarTabla();
                    }
                }

            )
        }

    }



    function datosCambioAceite() {

        let patito = prompt("Cambio Aceite");
        return patito;
    }


    btnSalvarCambio.onclick = function btnSalvarCambioOnClick() {



        let fechaCambioAceite = new Date(sltFechaCambioAceite.value);
        let month = fechaCambioAceite.getMonth();
        console.log(month);
        let day = fechaCambioAceite.getDay();
        let year = fechaCambioAceite.getFullYear();
        let fechaTotal = month + '/' + day + '/' + year;
        let iptMarcaAceite = iptMarcaAceiteTxt.value;
        let iptTipoAceite = iptTipoAceiteTxt.value;
        let iptNotas = iptNotasTxt.value;
        let iptPlaca = agregar();


        if (fechaTotal !== '' && iptMarcaAceite !== '' && iptTipoAceite !== '' && iptNotas !== '' && iptPlaca !== '') {

            let newCambioAceite = new CambioAceite(fechaTotal, iptNotas, iptPlaca);

            AutoPits.registrarCambioAceite(newCambioAceite);
        }

    }

    function mostrar() {}

    function agregar(event) {
        // AutoPits.agregarBtn(event.target.dataset.placa);
        // return;
    }


};