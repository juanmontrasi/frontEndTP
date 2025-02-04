# TP-DSW
Trabajo practico para la materia Desarrollo de software en la comisión 3K02.

La aplicacion fue realizada con [Angular V18](https://v18.angular.dev/installation) como framework del Frontend y [Node.Js V20](https://nodejs.org/en/) junto con [MySql](https://www.mysql.com/) para el Backend. Ademas, utiliza el ORM [Sequelize](https://sequelize.org/) para el manejo de consultas a la base de datos.
# Propuesta TP DSW

## Grupo
### Integrantes
* 49797 - Montrasi Juan Ignacio 
* 49416 - Chamas Agustina

### Demostración 
Link al video de demostración: [Demo](https://youtu.be/jz3Dch4fbfU)

### Repositorios
* [frontend app] https://github.com/juanmontrasi/frontEndTP
* [backend app] https://github.com/juanmontrasi/backEndTP

### Instrucciones de instalación
# 1. Clonar ambos repositorios:
```
git clone https://github.com/juanmontrasi/frontEndTP.git
git clone https://github.com/juanmontrasi/backEndTP.git
```
# 2. Configurar el BackEnd:
- Ingresa al directorio
  ```
  cd backendtp
  ```
- Instala las dependencias
  ```
  npm install
  ```
- Configura la base de datos. Actualiza los datos en el archivo `.env` entre comillas simples
  ```
  BDUSERNAME=tu_usuario_de_base_de_datos
  BDPASSWORD=tu_clave_de_base_de_datos
  ```
- Creación de la base de datos
  Ejecutar el schema en MySQL Workbench: [Base de datos](https://github.com/juanmontrasi/backEndTP/blob/master/tp_desarrollo_mod.sql)
  > Estan precargados una serie de productos y un usuario administrador (nombre_usuario = admin, clave = admin)
- Inicia el BackEnd
  ```
  npm run dev
  ```
# 3. Configurar el FrontEnd:
- Ingresa al directorio
  ```
  cd frontendtp
  ```
- Instala las dependencias
  ```
  npm install
  ```
- Inicia la aplicacion
  ```
  ng serve
  ```
# 4. Imagenes de productos
Para agregar una imagen a un producto, esta deberá estar ubicada en la carpeta src\assets\products, y su nombre deberá ser ingresado en el campo "imagen" junto con su extensión.
# 5. Checkout
Cuando se complete el proceso de checkout, se enviará un correo electrónico con el recibo. Es fundamental asegurarse de que la dirección de correo ingresada al registrar un usuario sea válida y esté en funcionamiento.
## Tema
Este proyecto tiene como objetivo desarrollar una tienda en línea especializada en componentes de computadora, con funcionalidades como un carrito de compras y un sistema de búsqueda avanzada que permite aplicar múltiples filtros. Además, incluirá una sección de administración para gestionar eficientemente usuarios, productos y pedidos. Por último, se implementará un sistema de inicio de sesión (LogIn) que diferenciará entre dos tipos de usuarios: clientes y administradores, garantizando un manejo adecuado de permisos y accesos.


### Modelo
Modelo de datos

![imagen](https://github.com/user-attachments/assets/969c6836-8291-4647-bb10-925d4e65e874)



### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Producto<br>2. CRUD Usuario<br>
|CRUD dependiente|1. CRUD Pedido {depende de} CRUD Producto / {depende de} CRUD Usuario<br>
|Listado<br>+<br>detalle| 1. Listado productos para clientes <br>
|CUU/Epic|1.Crear una cuenta como cliente <br>2. Realizar una compra cliente|
