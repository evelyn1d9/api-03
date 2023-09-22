const express = require('express')
var bodyParser = require('body-parser')
const {response} = require("express");
const app = express();
const puerto = process.env.PORT || 3000;

let categorias = [
    { id: 1, nombre: 'Cocina' },
    { id: 2, nombre: 'Electronica' },
    { id: 3, nombre: 'Hogar' },
    { id: 4, nombre: 'Jardín' },
    { id: 5, nombre: 'Muebles' },
    { id: 6, nombre: 'Ropa' },
    { id: 7, nombre: 'Salud' },
    { id: 8, nombre: 'Tecnología' },
    { id: 9, nombre: 'Vehículos' },
    { id: 10, nombre: 'Videojuegos' }

]

app.get('/socios/v1/categorias', (req, res) => {
    //Obtener todas las categorias
    if (categorias.length === 0) {
        return res.status(404).json({
        estado:0,
        mensaje:'No hay categorias',
        categorias:categorias})
    }else {
        return res.json({ categorias: categorias,
        estado:1,
        mensaje:'Categorias obtenidas con exito'
        })
    }


    res.send('Obtener todas las categorias')
})
app.get('/socios/v1/categorias/:id', (req, res) => {
    //Solo una categoria
    const id = req.params.id
    const categoria = categorias.find(categoria => categoria.id === parseInt(id))
    if (categoria) {
        return res.status(200).json({ categoria: categoria,
        estado:1,
        mensaje:'Categoria obtenida con exito'
        })
    }else {
        return res.status(404).json({ estado:0, mensaje:'Categoria no encontrada' })
    }


})
const jsonParser = bodyParser.json(); //middleware
app.use(jsonParser); //Utilizar middleware
app.post('/socios/v1/categorias', jsonParser, (req, res) => {
//Crear una categoria

        const { nombre, descripcion } = req.body; //Destructuring de objetos
      //  console.log(req.body);
        const id = Math.round(Math.random() * 1000);
        // Comprobar que el cliente  = usuario  = programador
        if (nombre == undefined || descripcion == undefined) {
            res.status(400).json({
                estado: 0,
                mensaje: "BAD REQUEST Faltan parametros en la solicitud",
            });
        } else {
            //En javascript como agregar un nuevo elemento al arreglo
            const categoria = { id: id, nombre: nombre, descripcion: descripcion };
            const longitudInicial = categorias.length;
            categorias.push(categoria);
            if (categorias.length > longitudInicial) {
                res.status(201).json({
                    estado: 1,
                    mensaje: "Categoria creada correctamente",
                    categoria: categoria,
                });
            } else {
                res.status(500).json({
                    estado: 0,
                    mensaje: "No se agrego correctamente",
                });
            }
        }



})
app.put('/socios/v1/categorias/:id', (req, res) => {
    //Actualizar una categoria
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    const categoria = categorias.find((categorias) => categorias.id == id);
    if (categoria) {
        res.status(200).json({
            estado: 1,
            mensaje: "Categoria actualizada correctamente",
            categoria: categoria,
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "No se actualizo",
        });
    }

})
app.delete('/socios/v1/categorias/:id', (req, res) => {
    //Eliminar una categoria
    const id = req.params.id;
    const categoria = categorias.find((categorias) => categorias.id == id);
    if (categoria) {
        res.status(200).json({
            estado: 1,
            mensaje: "Categoria eliminada correctamente",
            categoria: categoria,
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "No se elimino",
        });
    }




})

app.listen(puerto, () => {
    console.log(`Escuchando en el puerto ${puerto}`);
})