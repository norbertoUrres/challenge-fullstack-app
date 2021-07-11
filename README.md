**## Available Scripts

En el root del proyecto se puede ejecutar:

### `npm run start`

Para ejecutar la app en entorno de desarrollo.

### `npm run build`

Construye la app para el entorno de producción, generando la carpeta `build`.

### Descripción e instrucciones de uso

La aplicación "Covid Checks" fue creada para registrar los test de COVID-19 efectuados a personas para verificar si fueron infectados. La aplicación consta de tres pantallas.

Principal (inicio):


**## Available Scripts

En el root del proyecto se puede ejecutar:

### `npm run start`

Para ejecutar la app en entorno de desarrollo.

### `npm run build`

Construye la app para el entorno de producción, generando la carpeta `build`.

------------


### Descripción e instrucciones de uso

La aplicación "Covid Checks" fue creada para registrar los test de COVID-19 efectuados a personas para verificar si fueron infectados. La aplicación consta de tres pantallas.

#### Principal (inicio)

- Estadísticas.
- Botón para cargar un nuevo chequeo.
- Filtro/búsqueda de chequeos: se puede filtrar por país o resultado.
- Tabla de chequeos: nombre, país y resultado.
- Visualización de detalle por chequeo.

#### Formulario para crear un nuevo chequeo

Para cargar un nuevo chequeo se deberá informar el nombre, país y DNA de la persona. Los tres datos son obligatorios y no se permitirá cargar el registro sin estar completos. Para cargar la secuencia de DNA se deben tener las siguiente consideraciones:

- El string no podrá ser menor a 16 caracteres.
- Solo se permiten caracteres A, T, C y G (pueden ser minúsculas o mayúsculas).
- En el caso de ingresar un string con el cual no se pueda generar una tabla de NxN se visualizará en pantalla el siguiente mensaje: *"El DNA está incompleto."*

**Ejemplos de DNA válidos:**

ATCG ATCG ATCG ATCG -> 16 caracteres => tabla 4x4
ATCGA TCGAT CGATC GATCG TTTTT -> 25 caracteres => tabla 5x5

#### Detalle de chequeo

Visualización de detalle de los chequeos registrados.
