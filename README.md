## NodePop

La app NodePop nos permite gestionar artículos para comprar y vender.

## Instalación

El primer paso es clonarnos el repositorio a nuestro ambiente de desarrollo local. Podemos usar el comando git-clone o descargarnos el zip.

Luego hacemos un `npm install ` o ` npm i` para instalar las dependencias de node.

Para inicializar nuestra DB corremos el script db-init con el comando npn run db-init

`! Aviso, correr este script resultará en la restauración de la base de datos con 3 artículos iniciales eliminando cualquier información adicional `

Luego corremos nuestra app con el comando npm start

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
