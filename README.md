# TodoApp Backend

Este proyecto es un backend simple para una aplicación de tareas. Está desarrollado con 
TypeScript, Express, y MySQL con Prisma como ORM.

El proyecto está dividido en tres capas: controladores, servicios y repositorios. 

Los controladores se encargan de recibir las peticiones HTTP, formatear los datos, llamar a los servicios y devolver una respuesta al cliente.

Los servicios se encargan de la lógica de negocio. En este caso, se encargan de llamar a los métodos de los repositorios, ejecutar validaciones y devolver los datos necesarios.

Y los repositorios se encargan de interactuar con la base de datos. En este caso, se utilizó Prisma como ORM para interactuar con MySQL.

Además, se utilizó Docker para levantar la base de datos y se utilizó un archivo .env para configurar las variables de entorno.

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

7. Ejecuta los seeders
```bashcopy
bun run seed
```

8. Inicia el servidor
```bashcopy
bun run dev
```