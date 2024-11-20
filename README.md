# TP-DSW
Trabajo practico para la materia Desarrollo de software en la comisión 3K02
# Propuesta TP DSW

## Grupo
### Integrantes
* 49797 - Montrasi Juan Ignacio 
* 49416 - Chamas Agustina

### Repositorios
* [frontend app] https://github.com/juanmontrasi/frontEndTP.git
* [backend app] https://github.com/juanmontrasi/backEndTP.git

### Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

    Node.js (versión 14 o superior)
    Angular CLI (versión 12 o superior)
    MySQL (para la base de datos)

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
- Configura la base de datos. Actualiza los datos en el archivo `.env`
  ```
  PASSWORD=*tu contraseña*
  ```
- Creación de la base de datos
  Ejecutar el schema en MySQL Workbench: [Base de datos](https://github.com/juanmontrasi/backEndTP/blob/master/tp_desarrollo%20(1).sql)
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
