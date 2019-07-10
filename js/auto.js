class Auto {

    constructor(placa, modelo, marca) {

        this.placa = placa;
        this.modelo = modelo;
        this.marca = marca;
        this.cambioAceites = [];

    }

    registrarCambioAceite(cambioAceite) {
        this.cambioAceites.push(cambioAceite);
        console.log(cambioAceites);
    }
};