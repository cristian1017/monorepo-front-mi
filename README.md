# Monorepo para Gestión de Popups en React

## Descripción del Proyecto
Este monorepo contiene dos proyectos: una aplicación principal (`mainApp`) y una librería de componentes (`popupProvider`). La aplicación principal utiliza la librería para gestionar popups dinámicos en la interfaz de usuario. La librería proporciona un componente `PopupsProvider` que permite lanzar, mover y cerrar popups de manera eficiente.

## Requisitos
- Node.js v20
- npm (Node Package Manager)

## librerias
### Proyecto 1: Aplicación Principal (`app`)
- React
- Vite
- TypeScript
- PrimeReact

### Proyecto 2: Librería de Componentes (`components-library`)
- React
- TypeScript
- Zustand
- Hooks
- Jest
- Testing-library

## Instalación
Para instalar el proyecto y sus dependencias, sigue estos pasos:

1. Clona el repositorio:
```
git clone https://github.com/cristian1017/monorepo-front-mi.git frontend
```
2. Ingresa a la carpeta 
```
cd frontend
```
3. Instala las dependencias del proyecto:
```
npm install
```
## Uso

### Main App
Para iniciar la aplicación, hay dos maneras, la primera desde la raiz del proyecto monorepo, ejecuta:
```
npm run dev --workspace=mainApp
```

y la otra manera accediendo a la carpeta `/packages/mainApp`
```
npm run dev
```

Esto iniciará el servidor de desarrollo y abrirá automáticamente la aplicación en `http://localhost:{puerto}`.



## Build
Compilar la Aplicacion `Main App` desde la raiz del monorepo

```
npm run build --workspace=mainapp
```
ó ingresando directo al proyecto
```
npm run build
```

Este comando tambien compilara el build del popupProvider, ya que se ajusto un comando prebuild
 
## Test
para iniciar el test en el proyecto popup-provider tienes dos maneras de correrlas, de manera que ingreses al proyecto `/packages/popupProvider`
```
npm test
```
ó estando en la carpeta raiz

```
npm test --workspace=@monorepo/popup-provider
```

## Estructura del Proyecto
La aplicación utiliza React y PrimeReact para el diseño de la interfaz de usuario. Se ha adoptado un enfoque de programación funcional utilizando Hooks para manejar el estado y los efectos.

## Despliegue
El proyecto principal (`main`) está alojado en Vercel y se puede acceder a través del siguiente enlace: [https://monorepo-front-mi-main-app.vercel.app/](https://monorepo-front-mi-main-app.vercel.app/). 

Cada vez que se realizan cambios en cualquier rama y se suben al repositorio, el CI (Integración Continua) se encarga de ejecutar automáticamente las pruebas unitarias. Cuando se hace merge a la rama `main`, Vercel despliega automáticamente la última versión de la aplicación, utilizando la carpeta `packages/mainApp` como directorio base para el despliegue.