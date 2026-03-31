## Entrega Final

## Dockerizando nuestro Proyecto

### Objetivos generales

- Implementar las últimas mejoras en nuestro proyecto y Dockerizarlo.

### Objetivos específicos

- Documentar las rutas restantes de nuestro proyecto.

- Añadir los últimos tests

- Crear una imagen de Docker.

### Se debe entregar

- Documentar con Swagger el módulo de “Users”.

- Desarrollar los tests funcionales para todos los endpoints del router “adoption.router.js”.

- Desarrollar el Dockerfile para generar una imagen del proyecto.

- Subir la imagen de Docker a Dockerhub y añadir en un ReadMe.md al proyecto que contenga el link de dicha imagen.

### Criterios:

- Desarrollo de Tests Funcionales:

- Se han desarrollado tests funcionales para todos los endpoints del router adoption.router.js.

- Todos los endpoints del router adoption.router.js están cubiertos por tests funcionales.

- Los tests verifican de manera efectiva el funcionamiento de cada endpoint, incluyendo casos de éxito y casos de error.

### Creación del Dockerfile:

- Se ha creado un Dockerfile que permite generar una imagen del proyecto de manera adecuada.

- El Dockerfile está correctamente configurado para construir la imagen del proyecto de forma reproducible.

- Se incluyen todos los pasos necesarios en el Dockerfile para instalar las dependencias, copiar los archivos del proyecto y configurar el entorno de ejecución.

### Subida de la Imagen a Dockerhub:

- Se ha subido la imagen generada del proyecto a Dockerhub.

- La imagen del proyecto se encuentra disponible en Dockerhub y es accesible a través de un enlace público.

- Se ha añadido un ReadMe.md al proyecto que contiene el enlace a la imagen de Dockerhub.

### Documentación en ReadMe.md:

- El ReadMe.md del proyecto contiene información detallada, incluyendo el enlace a la imagen de Dockerhub.

- El ReadMe.md proporciona instrucciones claras para ejecutar el proyecto con Docker y acceder a la imagen en Dockerhub.

- Se incluyen detalles sobre cómo construir la imagen, ejecutar el contenedor y utilizar el proyecto de manera efectiva.

---

5.4 Actividad práctica
Actividad práctica
Documentación de API
Consigna:

Realizar la configuración necesaria para documentar el proyecto principal a partir de Swagger.

Aspectos a Incluir:

Documentar los módulos de:
Sessions.

Pets.

Adoptions.

---

6.4 Actividad Práctica
Actividad Práctica
Módulos de Testing para el proyecto “Adoptme”
Consigna

Realizar módulos de testing para tu proyecto principal, utilizando los módulos de mocha + chai + supertest.

Aspectos a incluir

Se deben desarrollar los tests para todos los endpoints de:
Router de users.

Router de pets.

NO desarrollar únicamente tests de status, la idea es trabajar lo mejor desarrollado posible las validaciones de testing

Sugerencias

Ya que el testing lo desarrollarás tú, no hay una guía de test por leer. ¡Aplica tu mayor creatividad en tus pruebas!

---

8.4 Actividad práctica
Práctica de integración sobre tu proyecto principal
Consigna

Con base en el proyecto principal que venimos desarrollando, toca solidificar algunos procesos.

Aspectos a incluir

Modificar el modelo de User para que cuente con una nueva propiedad “documents” el cual será un array que contenga los objetos con las siguientes propiedades
name: String (Nombre del documento).

reference: String (link al documento).

No es necesario crear un nuevo modelo de Mongoose para éste.

Además, agregar una propiedad al usuario llamada “last_connection”, la cual deberá modificarse cada vez que el usuario realice un proceso de login y logout

Aspectos a incluir

Crear un endpoint en el router de usuarios api/users/:uid/documents con el método POST que permita subir uno o múltiples archivos y actualizar el atributo “documents” del usuario en cuestión. Utilizar el middleware de Multer para poder recibir los documentos que se carguen en el proyecto.

El middleware de multer deberá estar modificado para que pueda guardar en diferentes carpetas los diferentes archivos que se suban.
Si se sube una imagen de una mascota, deberá guardarlo en una carpeta pets, mientras que ahora al cargar un documento, multer los guardará en una carpeta documents.

Desarrollar los tests funcionales para los endpoints de api/sessions/register y api/sessions/login utilizando los módulos de mocha, chai y supertest.

Sugerencias

Para el uso de Multer, se puede tomar de referencia el endpoint api/pets/withimage que ya utiliza Multer para subir las imágenes de las mascotas.

---
