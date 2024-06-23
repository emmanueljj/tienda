document.addEventListener("DOMContentLoaded", () => {
    let agregar = document.getElementById("agregar"),
    tbody = document.getElementById('tbody'),
    contador = 0,
    compraActual = [],
    indiceEdicion = null,
    SelectFondo= document.getElementById('fondo'),
    fondos=['',
            'https://i.pinimg.com/originals/4c/f1/4a/4cf14a1f02c667a46e142a4af1e8ebb7.png',
            'https://i.pinimg.com/originals/17/59/28/175928ffd441eb705bcbabc36d822180.jpg',
            'https://i.pinimg.com/originals/7c/d6/dc/7cd6dc7b34af544375336c288aec69da.jpg',
            'https://i.pinimg.com/originals/39/cc/b8/39ccb89d5fa58e1aa7cbeaa60be1f149.png']

            SelectFondo.addEventListener('change', () => {
                document.body.style.backgroundImage = `url("${fondos[SelectFondo.value]}")`;
                document.body.style.backgroundRepeat = "no-repeat"; // Corregido: usa "style.backgroundRepeat"
                document.body.style.backgroundPosition = "center/center"; // Corregido: usa "style.backgroundPosition"
                document.body.style.backgroundSize = "cover"; // Corregido: usa "style.backgroundSize"
            });
            

    agregar.addEventListener("click", () => {
        let precio = parseFloat(document.getElementById("precio").value) || 0;
        let cantidad = parseInt(document.getElementById("cantidad").value) || 0;
        let producto = document.getElementById("producto").value;
        let impuesto = parseFloat(document.getElementById("impuesto").value) || 0;

        let pagarI = ((precio * cantidad) * (impuesto * 0.01)).toFixed(2);
        let pagarT = (parseFloat(pagarI) + (cantidad * precio)).toFixed(2);

        let img = "";
        switch (producto) {
            case "Frutsi":
                img = "https://farmaciacalderon.com/cdn/shop/products/75001988_1200x1200.png?v=1605547188";
                break;
            case "Pepsi":
                img = "https://www.pepsico.com/images/default-source/products-brands/pepsi_12oz.png?sfvrsn=46c9ae09_3";
                break;
            case "Aceite":
                img = "https://res.cloudinary.com/oita/image/upload/w_656,h_656,c_limit,q_auto,f_auto/v1688057526/Merco/Parte%205/75005443_ACEITE_123_500ML_1_ltwfh1.png";
                break;
            case "Shampoo":
                img = "https://images.ctfassets.net/jdgtuh2uadx0/24uTSpDd3aGPUunFYJsqSB/b91ea0ecea8bd2bfa633fee61a1e7c6c/SUAVE-Y-MANEJABLE-SHAMPOO.png";
                break;
            case "Papel":
                img = "https://d1zc67o3u1epb0.cloudfront.net/media/catalog/product/f/i/fic_ph_premier-higienol_et1_mr_400h_x4_fab_mx_para_mx_1_2_.png?width=265&height=390&store=default&image-type=image";
                break;
            case "Cereal":
                img = "https://www.nestle-cereals.com/uk/sites/g/files/qirczx836/files/styles/1_1_768px_width/public/2023-03/Nesquik%202023%20Original%20Clean%20Pack%20Shot_0.png.webp?itok=iwN_5QpX";
                break;
            case "Sky":
                img = "https://superlavioleta.com/cdn/shop/files/Bebida_Skyy_Blue_Citrus_275ml1200.png?v=1713539677";
                break;
            case "docena de guevo":
                img="https://static.vecteezy.com/system/resources/previews/035/913/436/non_2x/ai-generated-egg-dozen-or-egg-heap-isolated-on-transparent-background-png.png";
                break;
            case "tortillas":
                img="https://guerrerotortillas.com/wp-content/uploads/2021/06/king-size-white-corn-front.png"
                break;
            case "coca":
                img="https://grupodjes.com/wp-content/uploads/2022/11/coca_600_ml-removebg-preview.png"
                break;
            case "leche":
                img="https://lecheleon.com/img/plb1.png"
                break;
            case "pollo":
                img="https://i1.wp.com/bachoco.com.mx/wp-content/uploads/2019/08/charola-piernas-600x600-1.png?fit=600%2C600&ssl=1"
                break;
        }

        if (indiceEdicion !== null) {
            compraActual[indiceEdicion].producto = producto;
            compraActual[indiceEdicion].precio = precio;
            compraActual[indiceEdicion].cantidad = cantidad;
            compraActual[indiceEdicion].impuesto = impuesto;
            compraActual[indiceEdicion].pagarI = pagarI;
            compraActual[indiceEdicion].pagarT = pagarT;
            compraActual[indiceEdicion].img = img;

            indiceEdicion = null;
        } else {
            let obj = {
                id: contador,
                producto: producto,
                precio: precio,
                cantidad: cantidad,
                impuesto: impuesto,
                pagarI: pagarI,
                pagarT: pagarT,
                img: img
            };

            compraActual.push(obj);
            contador++;
        }

        document.getElementById("precio").value = "";
        document.getElementById("cantidad").value = "";
        document.getElementById("producto").value = "";
        document.getElementById("impuesto").value = "";

        actualizarTabla();
    });

    function actualizarTabla() {
        tbody.innerHTML = '';

        let totalSumaCantidad = 0;
        let totalSumaPrecio = 0;
        let totalSumaPagarI = 0;
        let totalSumaPagarT = 0;

        compraActual.forEach((producto, index) => {
            let nuevaFila = document.createElement('tr');
            nuevaFila.innerHTML = `
                <td class="td2">${producto.producto}</td>
                <td class="td2">${producto.cantidad}</td>
                <td class="td2">${producto.precio}</td>
                <td class="td2">${producto.pagarI}</td>
                <td class="td2"><img src="${producto.img}" alt="${producto.producto}" height="130px" width="130px"></td>
                <td class="td2"><button type="button" class="eliminar-btn btn btn-danger" data-indice="${index}"><i class="fa-solid fa-xmark"></i></button></td>
                <td class="td2"><button type="button" class="editar-btn btn btn-primary " data-indice="${index}"><i class="fa-solid fa-pencil"></i></button></td>
            `;
            tbody.appendChild(nuevaFila);

            totalSumaCantidad += parseInt(producto.cantidad) || 0;
            totalSumaPrecio += parseFloat(producto.precio) || 0;
            totalSumaPagarI += parseFloat(producto.pagarI) || 0;
            totalSumaPagarT += parseFloat(producto.pagarT) || 0;
        });

        let filaSumatorias = document.createElement('tr');
        filaSumatorias.innerHTML = `
            <td class="td2" id="totalG">Total General:</td>
            <td class="td2" id="totalG">${totalSumaCantidad}</td>
            <td class="td2" id="totalG">${totalSumaPrecio.toFixed(2)}</td>
            <td class="td2" id="totalG">${totalSumaPagarI.toFixed(2)}</td>
            <td class="td2" id="totalG"></td>
            <td class="td2" id="totalG"></td>
            <td class="td2" id="totalG"></td>
        `;
        tbody.appendChild(filaSumatorias);

        let filaTotalPagar = document.createElement('tr');
        filaTotalPagar.innerHTML = `
            <td class="td2" id="total" colspan="4"><strong>Total a Pagar:</strong></td>
            <td class="td2">${totalSumaPagarT.toFixed(2)}</td>
            <td class="td2"></td>
            <td class="td2"></td>
        `;
        tbody.appendChild(filaTotalPagar);

        asignarEventos();
    }

    function asignarEventos() {
        let botonesEliminar = document.querySelectorAll('.eliminar-btn');
        botonesEliminar.forEach(btn => {
            btn.addEventListener('click', () => {
                let indice = parseInt(btn.getAttribute('data-indice'));
                eliminarProducto(indice);
            });
        });

        let botonesEditar = document.querySelectorAll('.editar-btn');
        botonesEditar.forEach(btn => {
            btn.addEventListener('click', () => {
                let indice = parseInt(btn.getAttribute('data-indice'));
                editarProducto(indice);
            });
        });
    }

    function eliminarProducto(indice) {
        compraActual.splice(indice, 1);
        actualizarTabla();
    }

    function editarProducto(indice) {
        document.getElementById("precio").value = compraActual[indice].precio;
        document.getElementById("cantidad").value = compraActual[indice].cantidad;
        document.getElementById("producto").value = compraActual[indice].producto;
        document.getElementById("impuesto").value = compraActual[indice].impuesto;

        indiceEdicion = indice;
    }

    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        let startY = 20;

        doc.setFontSize(12);
        doc.text('Lista de Productos', 10, startY);

        startY += 10;
        doc.setFontSize(10);
        doc.text('Nombre', 10, startY);
        doc.text('Cantidad', 50, startY);
        doc.text('Precio', 70, startY);
        doc.text('Pagar I', 90, startY);
        doc.text('Pagar T', 110, startY);

        startY += 10;

compraActual.forEach(producto => {
    doc.text(String(producto.producto), 10, startY);
    doc.text(producto.cantidad.toString(), 50, startY);

    // Verificar si producto.precio y producto.pagarI son números antes de formatear
    if (typeof producto.precio === 'number') {
        doc.text(producto.precio.toFixed(2), 70, startY);
    } else {
        doc.text('0', 70, startY); // Otra acción según el caso
    }

    if (typeof producto.pagarI === 'number') {
        doc.text(producto.pagarI.toFixed(2), 90, startY);
    } else {
        doc.text('0', 90, startY); // Otra acción según el caso
    }

    // Verificar también producto.pagarT si es necesario
    if (typeof producto.pagarT === 'number') {
        doc.text(producto.pagarT.toFixed(2), 110, startY);
    } else {
        doc.text('0', 110, startY); // Otra acción según el caso
    }

    startY += 10;
});


        doc.save('productos.pdf');
    }

    document.getElementById("impresora").addEventListener("click",generatePDF)

});