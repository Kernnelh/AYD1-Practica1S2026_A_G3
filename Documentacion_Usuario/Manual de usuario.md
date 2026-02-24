# Manual de Usuario  
**Sistema Notecraft**  
**Grupo No. 3**

---

## Acceso intuitivo
- Segmentación de información  
- Creación de notas  
- Edición de notas  
- Eliminación de notas  

---

## Contenido
1. [Objetivos](#objetivos)  
2. [Información del sistema](#información-del-sistema-notecraft)  
3. [Requisitos del sistema](#requisitos-del-sistema)  
4. [Manejo y funcionamiento del sistema](#manejo-y-funcionamiento-del-sistema)  

---

## Objetivos

### Objetivo general
Buscar la comprensión y fácil manejo al momento de operar un sistema liviano y eficiente de manejo de anotaciones. Automatiza el sistema de guardado de datos en relación a lo que el usuario necesita, edita y elimina datos (notas), garantizando seguridad, eficacia y persistencia de la información.

### Objetivos específicos
- Brindar información general del sistema y de todos sus componentes presentes en la interfaz.  
- Establecer parámetros, requerimientos y funcionalidad necesarios para una correcta utilización del sistema Notecraft.  
- Dar a conocer los campos y usos de la arquitectura y funcionamiento de la interfaz gráfica.  
- Establecer el flujo de funcionamiento del sistema Notecraft.  

---

## Información del sistema Notecraft

El sistema **Notecraft** es un programa diseñado para establecer un control cerrado y organizado al momento de crear, editar y eliminar notas, priorizando la comodidad del usuario según los estándares actuales del mercado.

El sistema cuenta con una ventana principal que contiene propiedades relacionadas con cada campo de la interfaz y subinterfaces que cambian según la opción seleccionada. Dispone de botones (pestañas) claramente identificados y campos donde se muestra la información de la nota con la que se desea trabajar.

Cada sección de la interfaz ofrece interacciones intuitivas, manteniendo un estilo minimalista. El sistema transmite una sensación de seguridad y facilidad de uso, aunque se recomienda que el usuario tenga familiaridad básica con interfaces simples.

Este manual expone una visión clara y general de las características y funcionamiento del sistema Notecraft.

---

## Requisitos del sistema

Aunque Notecraft es un sistema liviano, se requieren los siguientes mínimos:

### Hardware
- **CPU:** Sin especificación absoluta. Se recomienda Intel Pentium III 800 MHz o equivalente.  
- **RAM:** 2 GB o más.  
- **Espacio en disco:** 30 GB o más.  

### Software
- **Sistema operativo:**  
  - Windows 7 en adelante  
  - Ubuntu 9.10 en adelante  
  - Oracle Linux 5 en adelante  

- **IDE:**  
  - Visual Studio Code (última versión recomendada)

> Nota: Notecraft no depende de la nube, por lo que es necesario un IDE o entorno que permita ejecutar el sistema localmente.

---

## Instalación del sistema Notecraft

1. Ejecutar el IDE de preferencia o abrir la terminal.
2. Ubicarse en la carpeta raíz del proyecto.
3. Ejecutar el comando siguiente para instalar todas las dependencia del sistema.
    - npm install  
   
4. Ejecutar el comando siguiente para inicializar el sistema.
    - npm start

---

## Manejo y funcionamiento del sistema

El sistema funciona mediante ventanas, botones y cuadros de información, promoviendo un uso intuitivo.

### Opciones disponibles
- Ventana de login de usuario  
- Ventana de registro de usuario  
- Ventana de interfaz principal  
- Agregar nota  
- Eliminar nota  
- Modificar nota  
- Fijar nota  
- Archivar nota  
- Compartir nota  
- Notificaciones  
- Cerrar sesión  
- Perfil  

---

## Ventana de login de usuario

Permite al usuario ingresar al sistema mediante:
- Nombre de usuario o correo electrónico  
- Contraseña  

![Texto alternativo](imgmuser/login.png)

---

## Ventana de registro de usuario

Permite crear una nueva cuenta en el sistema Notecraft solicitando:
- Nombre de usuario  
- Contraseña  

Una vez registrado, el usuario podrá acceder a la interfaz principal.

![Texto alternativo](imgmuser/registro.png)

---

## Ventana de interfaz principal

Se muestra al iniciar sesión correctamente. En ella se visualizan todos los componentes y botones del sistema, identificados según su funcionalidad.

![Texto alternativo](imgmuser/interfazprinc.png)

---

## Función agregar nota

Permite crear nuevas notas mediante un formulario que solicita:
- **Título** (obligatorio)  
- **Contenido** (texto libre)  
- **Tag** (crear uno nuevo o seleccionar uno existente)

![Texto alternativo](imgmuser/addnota.png)

---

## Función modificar nota

Accesible desde el panel lateral izquierdo mediante la opción **Modificar nota**.  
Permite editar notas existentes; si no existen, se mostrará un mensaje informativo.

![Texto alternativo](imgmuser/modificarnota.png)

---

## Función archivar nota

Permite archivar notas para reducir la relevancia de información antigua o poco utilizada.

![Texto alternativo](imgmuser/archivarnota.png)

---

## Función compartir nota

Permite compartir una nota con otros usuarios y visualizar notas compartidas por terceros, fomentando la interacción social y un enfoque comercial moderno.

![Texto alternativo](imgmuser/sharenota.png)

---

## Función notificaciones

Permite recibir alertas cuando:
- Se comparte una nota con el usuario.

Las notificaciones se acceden mediante el icono de campana ubicado en la parte superior derecha de la interfaz principal.

![Texto alternativo](imgmuser/notificacion.png)

---

## Función cerrar sesión

Cierra la sesión actual y redirige al usuario a la pantalla de login.

![Texto alternativo](imgmuser/cerrarsesion.png)

---

## Función perfil

Permite visualizar la información del usuario actualmente logueado, mejorando la verificación de datos y la seguridad.

![Texto alternativo](imgmuser/perfil.png)

---