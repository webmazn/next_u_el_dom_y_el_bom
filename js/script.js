var appEstudiantes = (function () {
    var objEstudiante = new Object();
    var indice = 0;

    var cargarCodigo = function (indice) {
        var formato = "COD-";
        var randomNumero = 900 + (indice + 1);
        var userCodigo = document.getElementById("userCodigo");
        var userNombre = document.getElementById("userNombre");
        userCodigo.value = formato + randomNumero;
        userNombre.focus();
    }
    var soloNumeros = function () {
        var self = this;
        var numero = self.value;
        self.value = (/^([0-9])*$/.test(numero)) ? numero : "";
    }
    var traerPromedioNotas = function () {
        var longitud = Object.keys(objEstudiante).length;
        var total = 0;
        var promedio = 0;
        Object.keys(objEstudiante).forEach(function (key) {
            total += parseInt(objEstudiante[key].nota);
        });
        promedio = total / longitud;
        promedio = Math.round(promedio * 100) / 100;
        var mensaje = "El promedio general de Notas entre " + longitud + " estudiante(s) es de " + promedio
        mostrarMensaje("alert-warning",mensaje);
        alert(mensaje);
    }
    var traerMaxMinNota = function () {
        var opcion = this.getAttribute("data-opcion");
        var longitud = Object.keys(objEstudiante).length;
        var notas = new Array();
        Object.keys(objEstudiante).forEach(function (key) {
            notas.push(parseInt(objEstudiante[key].nota));
        });
        var maximo = Math.max.apply(null, notas);
        var minimo = Math.min.apply(null, notas);
        var tipo = (opcion == "max") ? "maxima" : "minima";
        var valor = (opcion == "max") ? maximo : minimo;
        var clase = (opcion == "max") ? "alert-success" : "alert-danger";
        var mensaje = "La nota " + tipo + " obtenida entre " + longitud + " estudiante(es) es de " + valor;
        mostrarMensaje(clase,mensaje);
        alert(mensaje);
    }
    var mostrarMensaje = function (clase, mensajeAccion) {
        var mensaje = document.getElementById("mensaje");
        mensaje.className = "";
        mensaje.classList.remove("d-none");
        mensaje.textContent = mensajeAccion;
        mensaje.classList.add("alert");
        mensaje.classList.add(clase);
    }
    var habilitarEventos = function () {
        var btnRegistrar = document.getElementById("btnRegistrar");
        var btnPromediar = document.getElementById("btnPromediar");
        var btnNotaMayor = document.getElementById("btnNotaMayor");
        var btnNotaMenor = document.getElementById("btnNotaMenor");
        var tblResultados = document.getElementById("tblResultados");
        var userCodigo = document.getElementById("userCodigo");
        var userNombre = document.getElementById("userNombre");
        var userNota = document.getElementById("userNota");
        var helpCodigo = document.getElementById("helpCodigo");
        var helpNombre = document.getElementById("helpNombre");
        var helpNota = document.getElementById("helpNota");

        userNota.addEventListener("keyup", soloNumeros);
        btnRegistrar.addEventListener("click", function () {
            var valid = 0;
            var objAlumno = new Object();
            objAlumno['codigo'] = userCodigo.value;
            objAlumno['nombre'] = userNombre.value;
            objAlumno['nota'] = userNota.value;

            helpCodigo.classList.add("d-none");
            helpNombre.classList.add("d-none");
            helpNota.classList.add("d-none");

            if (objAlumno['codigo'] == "") {
                helpCodigo.classList.remove("d-none");
                valid++;
            }
            if (objAlumno['nombre'] == "") {
                helpNombre.classList.remove("d-none");
                valid++;
            }
            if (objAlumno['nota'] == "" || objAlumno['nota'] < 0 || objAlumno['nota'] > 20) {
                helpNota.classList.remove("d-none");
                valid++;
            }

            if (valid == 0) {
                objEstudiante[indice] = objAlumno; //JSON.stringify(objAlumno);
                indice++;
                //console.log(objEstudiante);
                if (indice <= 1) tblResultados.getElementsByTagName("tr")[1].style.display = "none"; //.deleteRow(1);
                var fila = tblResultados.insertRow(indice);
                var celda1 = fila.insertCell(0);
                var celda2 = fila.insertCell(1);
                var celda3 = fila.insertCell(2);
                var celda4 = fila.insertCell(3);

                celda1.innerHTML = indice;
                celda2.innerHTML = objAlumno['codigo'];
                celda3.innerHTML = objAlumno['nombre'];
                celda4.innerHTML = objAlumno['nota'];
                celda4.style.textAlign = "center";

                document.getElementById("myForm").reset();
                cargarCodigo(indice);
                valid = 0;
                var mensaje = "Estudiante "+objAlumno['nombre']+" - "+objAlumno['codigo']+" fue registrado correctamente.";
                mostrarMensaje("alert-primary",mensaje);
            }
        });
        btnPromediar.addEventListener("click", traerPromedioNotas);
        btnNotaMayor.addEventListener("click", traerMaxMinNota);
        btnNotaMenor.addEventListener("click", traerMaxMinNota);
    }
    return {
        iniciarRegistro: function () {
            cargarCodigo(0);
            habilitarEventos();
        }
    }
})();
appEstudiantes.iniciarRegistro();