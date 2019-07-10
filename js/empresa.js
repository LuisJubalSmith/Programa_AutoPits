class Empresa {
    constructor(nombre) {
        this.nombre = nombre;
        this.autos = [];

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




};