let autos = require("./autos");

let concesionaria = {
  autos: autos,
  buscarAuto: function (patente) {
    let auto = this.autos.filter((auto) => {
      return auto.patente == patente;
    });
    if (auto.length == 0) return null;
    return auto[0];
  },
  venderAuto: function (patente) {
    let autoIndex = this.autos.indexOf(this.buscarAuto(patente));
    if (autoIndex == -1) return null;
    this.autos[autoIndex].vendido = true;
  },
  autosParaLaVenta: function () {
    return this.autos.filter((auto) => !auto.vendido);
  },
  autosNuevos: function () {
    return this.autosParaLaVenta().filter((auto) => auto.km < 100);
  },
  listaDeVentas: function () {
    return this.autos.filter((auto) => auto.vendido).map((auto) => auto.precio);
  },
  totalDeVentas: function () {
    let ventas = this.listaDeVentas();
    if (ventas.length == 0) {
      return 0;
    }
    return ventas.reduce((acum, precio) => {
      return acum + precio;
    });
  },
  puedeComprar: function (auto, persona) {
    if (
      persona.capacidadDePagoTotal < auto.precio &&
      persona.capacidadDePagoEnCuotas < auto.precio / auto.cuotas
    ) {
      return true;
    }
    return false;
  },
};

//console.log(concesionaria.venderAuto("APL123"));
//console.log(concesionaria.venderAuto("JA123"));
//console.log(concesionaria.autosNuevos());
//console.log(concesionaria.listaDeVentas());
console.log(autos[1]);
console.log(
  concesionaria.puedeComprar(autos[1], {
    nombre: "Juan",
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000,
  })
);
