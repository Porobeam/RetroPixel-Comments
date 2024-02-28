// Crear un objeto vacío para almacenar los métodos del controlador.
const controller = {};

// Importar el módulo fs para interactuar con el sistema de archivos.
const fs = require('fs');
// Importar el módulo path para trabajar con rutas de archivos.
const path = require('path');
// Construir la ruta hacia el archivo JSON donde se almacenan los comentarios.
const jsonDirectory = path.join(__dirname, '..', 'data', 'comments.json');

// Método para leer comentarios desde el archivo JSON.
controller.read = (req, res) => {
    // Leer el contenido del archivo JSON de comentarios.
    fs.readFile(jsonDirectory, (err, data) => {
        // Verificar si hay error al leer el archivo y responder con error 500 si es así.
        if (err) {
            res.status(500).send('Error reading comments file');
            return;
        }
        // Si no hay error, parsear los datos a formato JSON y enviarlos en la respuesta.
        res.json(JSON.parse(data));
    });
};

// Método para agregar un nuevo comentario al archivo JSON.
controller.create = (req, res) => {
    // Obtener el nuevo comentario del cuerpo de la petición.
    const requestBody = req.body; // La información del comentario recibida.
    
    // Construyes el nuevo comentario asegurando el orden de las propiedades como desees.
    const newComment = {
        id: null, // Este valor se reemplazará con un ID real más adelante.
        author: requestBody.author, // Asumimos que estas propiedades existen en el cuerpo de la petición.
        comment: requestBody.comment,
        color: requestBody.color,
        date: new Date().toISOString(), // Asigna la fecha actual en formato ISO 8601.
    };
    
    // Leer el archivo de comentarios existente.
    fs.readFile(jsonDirectory, (err, data) => {
        // Verificar si hay error al leer el archivo y responder con error 500 si es así.
        if (err) {
            res.status(500).send('Error reading comments file');
            return;
        }
        
        // Parsear los datos leídos del archivo a formato JSON.
        const comments = JSON.parse(data).comments;
        
        // Asignar un ID al nuevo comentario. Si hay comentarios existentes, el ID será el último ID + 1. Si no, será 1.
        newComment.id = comments.length > 0 ? comments[comments.length - 1].id + 1 : 1;
        
        // Asignar la fecha actual al nuevo comentario.
        newComment.date = new Date().toISOString();
        
        // Añadir el nuevo comentario al array de comentarios.
        comments.push(newComment);
        
        // Escribir el array de comentarios actualizado al archivo JSON, formateando el JSON para mejorar la legibilidad.
        fs.writeFile(jsonDirectory, JSON.stringify({ comments }, null, 2), (err) => {
            // Verificar si hay error al escribir el archivo y responder con error 500 si es así.
            if (err) {
                res.status(500).send('Error writing comments file');
                return;
            }
            
            // Enviar respuesta indicando que el comentario fue añadido exitosamente.
            res.redirect('/read');
        });
    });
};


// Exportar el objeto controller para que sus métodos puedan ser utilizados en otras partes de la aplicación.
module.exports = controller;
