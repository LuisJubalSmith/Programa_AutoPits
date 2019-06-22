class Empresa {
    constructor(nombre) {
        this.nombre = nombre;
        this.autos = [];
        this.cambioAceites = [];
        this.aceites = [];
    }



    registrarAuto(auto) {

        for (let i = 0; i < this.autos.length; i++) {
            if (auto.placa === this.autos[i].placa) {
                // alert("El auto " + auto.placa + ' ' + auto.modelo + " Ya existe");
                return;
            }
        }
        this.autos.push(auto);
        console.log(this.autos);
    }
    removerAuto(auto) {

        for (let j = 0; j < this.autos.length; j++) {
            if (auto.placa === this.autos[j].placa) {
                this.autos.splice(j, 1);
                return;
            }
        }

    }
    registrarCambioAceite(cambioAceite) {

        for (let j = 0; j < this.cambioAceites.length; j++) {
            if (cambioAceite.placa === this.cambioAceites[j].placa) {
                return;
            }
        }
        this.cambioAceites.push(cambioAceite);
        console.log(this.cambioAceites);
    }

    registroAceite(aceite) {
        for (let x = 0; x < this.aceites.length; x++) {
            if (aceite.placa === this.aceites[x].placa) {
                return;
            }
        }
        this.aceites.push(aceite);

        console.log(this.aceites);
    }

    cargarDataset(placa) {

        console.log(placa);
        // console.log(event.target.dataset.placa);
        for (let i = 0; i < this.cambioAceites.length; i++) {
            if (placa === this.autos[i].placa) {
                return;
            }
        }
    }



};