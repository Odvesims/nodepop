## NodePop

La app NodePop nos permite gestionar artículos para comprar y vender.

## Instalación

El primer paso es clonarnos el repositorio a nuestro ambiente de desarrollo local. Podemos usar el comando git-clone o descargarnos el zip.

Luego hacemos un `npm install ` o ` npm i` para instalar las dependencias de node.

Para inicializar nuestra DB corremos el script db-init con el comando npn run db-init

`! Aviso, correr este script resultará en la restauración de la base de datos con 3 artículos iniciales eliminando cualquier información adicional `

Instanciamos el microservicio para que genere los thumbnail: (Desde el directorio raiz del repo)

`nodemon microservices/thumbnailGenerator.js `

Luego corremos nuestra app

`npm start `

# Rutas

### INDEX

La ruta del home nuestra app es http://localhost:3000/ .

En esta ruta podemos encontrar un formulario de consulta para filtrar los resultados los productos usando los criterios de nombre, precio, tipo (si es venta o compra) y tags.

El formulario ejecuta un request GET. Funciona de la misma manera si pasamos los parámetros en la URL.

### API/PRODUCTS

La ruta de nuestra api es http://localhost:3000/api/products

Podemos hacer los siguientes requests a esta ruta

GET: Para consultar los productos basados en los filtros siguientes:

- name (string )
- price (integer u object)
- for_sale ( boolean )
- tags (array of strings)

POST: Para insertar nuevos productos.
PUT: Para actualizar un producto existente. Necesitamos el id del producto.
DELETE: Para eliminar un producto existente. Necesitamos el id del producto.

También podemos hacer un GET request a la ruta api/products/tags para ver un listado de todas las tags que estén presentes en los productos de la DB.

# Node Avanzado

### AUTENTICACION API

Se implementó autenticación del API usando JWT. La siguiente ruta sirven para abrir una sesión autenticada de un usuario que consume nuestro API:

- /api/login (email y password como parámetros. Devuelve un TOKEN que usamos para realizar peticiones al API y que nuestra sesión sea válida).

Las peticiones a nuestro API están protegidas por JWT por lo tanto, en lo adelante, ninguna petición al API de una sesión no autenticada podrá consumir recursos del mismo. Deben usarse un parámetro TOKEN o un header Authorization con el valor del token para que la sesión sea válida.

### INTERNACIONALIZACION

El APP ha sido internazionalizada! Podemos visualizar las páginas en múltiples lenguages (Actualmente inglés y español). Desde el navbar podemos alternar entre los idiomas disponibles.

### MICROSERVICIO

El microservicio thumbnailGenerator reacciona a la creación de un producto desde el API y genera un thumbnail 250x250 para cada imagen que sea subida al app.

# TODO

- Autenticar la Web App.
- Mejorar el microservicio.
- Mejoras de UI/UX.

### Despliegue en Servidores

1- La APP de node puede accederse usanda usando la IP: http://3.87.184.211

2- La APP de React puede ser accederse usando el dominio: http://ec2-3-87-184-211.compute-1.amazonaws.com

Los archivos estáticos (imágenes, stylesheets, thumbnails) se sirven desde nginx y se le agregó un header "X-Owner: odvesims"

