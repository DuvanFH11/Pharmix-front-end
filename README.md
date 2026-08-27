## PHARMIX - DISTRIBUIDORA
Solución de software web para la distribución farmacéutica masiva. Permite a los depósitos mayoristas gestionar clientes, registrar pedidos telefónicos de manera ágil a través de un panel administrativo y garantizar el cumplimiento legal mediante la integración de facturación electrónica instantánea al procesar pagos y envíos.

# TECNOLOGÍAS UTILIZADAS
Para este desarrollo se están utilizando **Vite** y **React** para el desarrollo principal, acompañado con la variante de **TypeScript**. Se integra **Bootstrap**, aunque no se está usando de forma principal en el proyecto, ya que se prefirió hacer uso de **CSS Modules** para que cada componente pueda tener su estilo propio y cumplir con el principio de portabilidad y reutilización de elementos sin ninguna dependencia de estilos generales.

# CLONAR REPOSITORIO
Para clonar este repositorio simplemente es necesario tener Git instalado y configurado en nuestra máquina, situarse en la ruta de su preferencia a través de la terminal y ejecutar el siguiente comando:
```bash
git clone https://github.com/DuvanFH11/Pharmix-front-end.git
```
Esto descargará automáticamente todo el código disponible en una nueva carpeta.  
**NOTA: Para subir código al repositorio es necesario ser colaborador del mismo.**

# ESTRUCTURA DEL PROYECTO
Se implementa una arquitectura limpia y ordenada dentro de la carpeta `src`:
* **APP:** Contiene los componentes principales y las vistas globales del aplicativo.
* **ASSETS:** Almacenamiento de recursos estáticos generales (imágenes, logotipos, iconos).
* **COMPONENTS:** Componentes genéricos altamente reutilizables en toda la aplicación.
* **CONSTANTS:** Archivos para guardar constantes fijas y configuraciones de mensajes de formularios.
* **CONTEXT:** Definiciones de datos y hooks personalizados para la gestión de estados globales.
* **PROVIDERS:** Componentes proveedores encargados de inyectar los contextos de React en la aplicación.
* **HOOKS:** Espacio para custom hooks específicos encargados de modularizar la lógica secundaria.
* **INTERFACES:** Almacenamiento de interfaces de TypeScript basadas en las entidades del sistema.
* **PLUGINS:** Configuración de instancias e interceptores para librerías externas como Axios.
* **ROUTES:** Archivo y lógica de enrutado centralizado de la aplicación.
* **SCHEMAS:** Almacenamiento de esquemas de validación estructural utilizando la librería **ZOD**.
* **SERVICES:** Funciones encargadas de interactuar directamente con los endpoints de la API en Laravel. 

# SCRIPTS DISPONIBLES
En la raíz del proyecto puedes ejecutar los siguientes comandos mediante tu gestor de paquetes (npm):
* `npm run dev`: Arranca el servidor local de desarrollo con recarga rápida (Fast Refresh).
* `npm run build`: Compila y optimiza la aplicación generando los archivos estáticos listos para producción.
* `npm run lint`: Ejecuta el linter de ESLint para comprobar errores de formato y sintaxis en el código.
* `npm run preview`: Permite previsualizar de forma local la compilación final generada para producción.

# PRONOSTICO DE DESPLIEGUE.
Para garantizar que el sistema funcione de forma ágil, segura y profesional, la aplicación no se aloja en un hosting tradicional, sino que se monta en una infraestructura moderna en la nube estructurada bajo un mismo dominio principal:
* **Servidor en la Nube (AWS + Ubuntu):** Todo el sistema se aloja de forma gratuita en una instancia de AWS (Amazon Web Services) corriendo sobre un sistema operativo Ubuntu Server. En lugar de usar servicios independientes separados (como subir React a Vercel/Netlify o Laravel a un VPS tradicional vía Coolify/Forge), centralizamos todo el entorno para obtener un control total y estabilidad de nivel empresarial.
* **Tecnología de Contenedores (Docker):** El proyecto está completamente "empaquetado" usando Docker y Docker Compose. Esto significa que tanto el Front-end (React), el Back-end (Laravel) como la base de datos corren dentro de contenedores independientes y aislados en el mismo servidor. Así, nos aseguramos de que la aplicación funcione exactamente igual en internet que en la computadora de desarrollo, evitando errores inesperados.
* **Gestión de Dominio y Cookies:** Para mantener la autenticación nativa por cookies (Laravel Sanctum), los contenedores se vinculan bajo un mismo dominio principal (ej. React en miweb.com y Laravel en api.miweb.com). Al compartir este origen común, el navegador intercambia las cookies de sesión de manera transparente y 100% segura con los respectivos ajustes en los archivos CORS y .env.
* **Conexión Segura (Nginx):** Un contenedor interno de Nginx actúa como proxy inverso. Se encarga de recibir a los usuarios bajo el dominio configurado, redirigir el tráfico hacia el contenedor del Front-end o del Back-end según corresponda, y activar los candados de seguridad (certificados SSL automáticos) para garantizar una navegación completamente cifrada.

