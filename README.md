# JMC S.A.S. — Sitio web corporativo

Sitio web estático de **Construcciones y Transportes JMC S.A.S.**, empresa colombiana orientada a obras civiles, estructuras, infraestructura y proyectos arquitectónicos.

La página presenta la empresa, sus especialidades, proyectos documentados, récord histórico de obras, galería visual y canales de contacto para solicitar una cotización.

## Características

- Diseño responsive para escritorio, tabletas y dispositivos móviles.
- Navegación interna por secciones:
  - Nosotros
  - Servicios
  - Proyectos
  - Récord de obras
  - Galería
  - Contacto
- Menú móvil desplegable.
- Encabezado que cambia de apariencia al desplazarse por la página.
- Portafolio visual de proyectos:
  - Metrolínea
  - Conexión 20
  - Parque Juan Amarillo
  - Mega Colegio Pablo VI
  - Calima La 14
  - Puente Boyacá Suba
  - ProTumaco
- Récord de obras con:
  - Búsqueda por proyecto o empresa.
  - Filtro por tipo de obra.
  - Contador de resultados.
  - Estado para búsquedas sin coincidencias.
- Galería de 12 imágenes con visor ampliado (lightbox).
- Formulario de contacto que genera un correo mediante `mailto:`.
- Botón flotante de contacto por WhatsApp.
- Metadatos básicos para SEO y redes sociales Open Graph.
- Encabezados de seguridad configurados para Netlify.

## Tecnologías

- HTML5 semántico.
- CSS3, sin frameworks.
- JavaScript nativo, sin dependencias externas.
- Google Fonts:
  - [Manrope](https://fonts.google.com/specimen/Manrope)
  - [DM Mono](https://fonts.google.com/specimen/DM+Mono)
- Netlify para despliegue estático.

## Estructura del proyecto

```text
JMC/
├── index.html              # Página principal y contenido del sitio
├── styles.css              # Estilos, layout y responsive design
├── script.js               # Interacciones y comportamiento de la interfaz
├── netlify.toml            # Configuración de publicación y encabezados Netlify
└── assets/
    ├── logo-jmc.png        # Logotipo
    ├── hero/
    │   └── hero.jpg       # Imagen principal del encabezado
    ├── galeria/            # 12 imágenes de la galería
    └── proyectos/          # Imágenes del portafolio de proyectos
```

## Ejecución local

El proyecto no requiere instalación de dependencias ni proceso de compilación.

### Opción 1: servidor local con Python

Desde la carpeta raíz del proyecto:

```bash
python -m http.server 8000
```

Luego abre [http://localhost:8000](http://localhost:8000) en el navegador.

En Windows también puede utilizarse:

```powershell
py -m http.server 8000
```

### Opción 2: servidor estático de VS Code

1. Abre la carpeta del proyecto en Visual Studio Code.
2. Instala una extensión de servidor estático, como **Live Server**, si aún no la tienes.
3. Abre `index.html` con la opción **Open with Live Server**.

No se debe abrir directamente el archivo con `file://` cuando se quiera simular el despliegue, ya que un servidor local reproduce mejor el comportamiento de rutas y recursos.

## Contacto configurado

El sitio utiliza los siguientes datos de contacto definidos en `index.html`:

- Teléfono y WhatsApp: `+57 314 493 4264`
- Correo: `c.jmcsas@hotmail.com`
- Dirección: `Diagonal 27 Sur #34-56`

El formulario no envía datos a un backend. Al enviarlo, JavaScript construye un asunto y un cuerpo de correo y abre el cliente de correo predeterminado del visitante.

## Despliegue en Netlify

El archivo `netlify.toml` define la raíz del proyecto como directorio de publicación:

```toml
[build]
  publish = "."
```

Para desplegar:

1. Sube el repositorio a GitHub, GitLab o Bitbucket.
2. En Netlify, selecciona **Add new site** → **Import an existing project**.
3. Selecciona el repositorio.
4. Usa `.` como directorio de publicación.
5. No configures un comando de build.
6. Publica el sitio.

También se puede arrastrar la carpeta del proyecto desde el panel de Netlify para realizar un despliegue manual.

## Personalización

### Contenido

Edita `index.html` para actualizar:

- Textos institucionales.
- Servicios.
- Proyectos.
- Registros del récord de obras.
- Datos de contacto.
- Enlaces de WhatsApp y correo.

Cada registro del récord de obras utiliza `data-type` y `data-search` para que los filtros de `script.js` puedan encontrarlo correctamente.

### Apariencia

Edita `styles.css` para modificar:

- Colores globales definidos en `:root`.
- Tipografías.
- Espaciados y tamaños.
- Comportamiento responsive.
- Diseño de tarjetas, tablas, formularios y galería.

### Interacciones

`script.js` controla:

- Menú móvil.
- Estado visual del encabezado durante el scroll.
- Búsqueda y filtrado del récord de obras.
- Visor ampliado de imágenes.
- Cierre del visor con el botón, clic fuera de la imagen o tecla `Escape`.
- Construcción del correo del formulario de contacto.

## Consideraciones

- Las rutas de imágenes son relativas; conserva la estructura de `assets/` al desplegar.
- El formulario depende de que el visitante tenga configurado un cliente de correo.
- Las fuentes de Google Fonts requieren conexión a Internet; el resto del sitio utiliza archivos locales.
- El contenido del récord de obras aclara que la experiencia corresponde a la trayectoria profesional de Jonás Antonio Hidalgo Arcos y no implica que todos los proyectos hayan sido contratados o ejecutados directamente por JMC S.A.S.

## Licencia

No se especifica una licencia de software en el repositorio. El contenido institucional, las imágenes, el logotipo y los textos deben considerarse propiedad de sus respectivos titulares y no deben reutilizarse sin autorización.
