// Constructor para Seguro
function Seguro(marca, anio, tipo, agencia) {
     this.marca = marca;
     this.anio = anio;
     this.tipo = tipo;
     this.agencia = agencia;
}
Seguro.prototype.cotizarSeguro = function() {
     let cantidad;
     const base = 2000;

     switch(this.marca){
          case '1':
               cantidad = base * 1.15;
               break;
          case '2':
               cantidad = base * 1.05;
               break;
          case '3':
               cantidad = base * 1.35;
               break;
     }

     switch(this.agencia){
          case '1':
               cantidad = cantidad * 0.9;
               break;
          case '2':
               cantidad = cantidad * 0.7;
     }

     // Leer el año
     const diferencia = new Date().getFullYear() - this.anio;
     // Cada año de diferencia hay que reducir 3% el valor del seguro
     cantidad -= ((diferencia * 3) * cantidad) / 100;
     /*
          Si el seguro es básico se múltiplica por 30% mas
          Si el seguro es completo 50% mas
     */
    if(this.tipo === 'basico') {
         cantidad *= 1.50;
    } else if(this.tipo === 'basico') {
         cantidad *= 1.30;
    }else if(this.tipo === 'completo'){
         cantidad *= 2.50;
    }else if(this.tipo === 'completo'){
         cantidad *= 2.30;
    }

     return cantidad;

}

// Todo lo que se muestra
function Interfaz() {}

// Mensaje que se imprime en el HTML
Interfaz.prototype.mostrarMensaje = function(mensaje, tipo) {
     const div = document.createElement('div');

     if(tipo === 'error') {
          div.classList.add('mensaje','error');
     } else {
          div.classList.add('mensaje','correcto');
     }
     div.classList.add('mt-10');
     div.innerHTML = `${mensaje}`;
     formulario.insertBefore(div, document.querySelector('#resultado')); // Nuevo Nodo y referencia... // Si la referencia no existe se añadira al final

     setTimeout( () =>  {
          document.querySelector('.mensaje').remove();
     }, 3000);
} 

// Imprime el resultado de la cotización
Interfaz.prototype.mostrarResultado = function(seguro, total) {
     const resultado = document.querySelector('#resultado');
     let marca;
     switch(seguro.marca) {
          case '1':
               marca = 'Americano';
               break;
          case '2':
               marca = 'Asiatico';
               break;
          case '3':
               marca = 'Europeo';
               break;
     }

     let agencia;
     switch(seguro.agencia){
          case '1':
               agencia = 'Si';
               break;
          case '2':
               agencia = 'No';
               break;
     }

     // Crear un div
     const div = document.createElement('div');
     div.classList.add('mt-10')
     // Insertar la informacion
     div.innerHTML = `
          <p class='header'>Tu Resumen: </p>
          <p class="font-bold">Marca: <span class="font-normal"> ${marca} </span> </p>
          <p class="font-bold">Año: <span class="font-normal"> ${seguro.anio} </span> </p>
          <p class="font-bold">Tipo: <span class="font-normal"> ${seguro.tipo} </span> </p>
          <p class="font-bold">Agencia: <span class="font-normal"> ${agencia} </span> </p>
          <p class="font-bold"> Total: <span class="font-normal"> $ ${total} </span> </p>
     `;

     const spinner = document.querySelector('#cargando');
     spinner.style.display = 'block';
     setTimeout( () =>  {
          spinner.style.display = 'none';
          resultado.appendChild(div);
     }, 3000);
     
}

Interfaz.prototype.llenarOpciones = function () {
     const max = new Date().getFullYear(),
          min = max - 20;

     const selectAnios = document.querySelector('#year');
     for(let i = max; i > min; i--) {
          let option = document.createElement('option');
          option.value = i;
          option.innerHTML = i;
          selectAnios.appendChild(option);
     }   
}

// Crear instancia de Interfaz
const interfaz = new Interfaz();

document.addEventListener('DOMContentLoaded', () => {
     interfaz.llenarOpciones()
});

// DOM Operaciones
const formulario = document.querySelector('#cotizar-seguro');

formulario.addEventListener('submit', e =>  {
     e.preventDefault();

     // leer la marca seleccionada del select
     const marca = document.querySelector('#marca').value;

     // leer el año seleccionado del <select>
     const year = document.querySelector('#year').value

     //leer si el auto es o no de agencia 
     const agencia = document.querySelector('#agencia').value;

     // lee el valor del radio button
     const tipo = document.querySelector('input[name="tipo"]:checked').value;

 

     // Revisamos que los campos no esten vacios
     if(marca === '' || year === '' || tipo === '' || agencia === '') {
          // Interfaz imprimiendo un error
          interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo', 'error');
     } else {
          // Limpiar resultados anteriores
          const resultados = document.querySelector('#resultado div');
          if(resultados != null) {
               resultados.remove();
          }

          // Instanciar seguro y mostrar interfaz
          const seguro = new Seguro(marca, year, tipo, agencia);
          // Cotizar el seguro
          const cantidad = seguro.cotizarSeguro();
          // Mostrar el resultado
          interfaz.mostrarResultado(seguro, cantidad);
          interfaz.mostrarMensaje('Cotizando...', 'exito');
     }

});
