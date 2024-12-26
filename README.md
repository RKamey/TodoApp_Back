# TodoApp Backend

Este proyecto es un backend simple para una aplicación de tareas. Está desarrollado con 
TypeScript, Express, y MySQL con Prisma como ORM.

El proyecto está dividido en tres capas: controladores, servicios y repositorios. Los controladores
se encargan de recibir las peticiones HTTP, los servicios de la lógica de negocio y los repositorios
de la interacción con la base de datos.

## Instalación
1. Clonar el repositorio
```bashcopy
git clone https://github.com/RKamey/TodoApp_Back.git
```

2. Instalar las dependencias
```bashcopy
bun install
```

3. Copia el archivo .env.template y renómbralo a .env
```bashcopy
cp .env.template .env
```

4. Configura tus variables de entorno en el archivo .env

5. Levanta la base de datos con Docker
```bashcopy
docker-compose up -d
```

6. Ejecuta las migraciones
```bashcopy
bun run migrate
```