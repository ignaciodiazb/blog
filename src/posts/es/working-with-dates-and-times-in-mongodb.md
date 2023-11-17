---
date: "2023-11-16"
intro: "Una guía simple y agnóstica de lenguaje para usar fechas y horas en MongoDB."
readingTime: 5
title: "Usando fechas y horas en MongoDB"
---

### Introducción

Todas las aplicaciones tienen requerimientos y necesidades diferentes, pero es muy común que tengamos que implementar funcionalidades con fechas y horas. Puede que sólo necesitemos registrar el cumpleaños de un usuario, o algo un poco más complejo como guardar la fecha y hora en la que un usuario agendó una cita online.

Incluso aunque pueda parecer sencillo trabajar con fechas y horas, entender cómo la base de datos maneja internamente estos objetos nos ayudará a evitar resultados inesperados.

El objetivo de este artículo es servir como un **recurso complementario** a la documentación oficial de MongoDB al respecto.

### Errores comunes

Estos son algunos errores comunes que podemos cometer al trabajar con fechas y horas.

- Almacenar objetos datetime con zona horaria.
- Utilizar el tipo de dato incorrecto en la base de datos.

Para algunas aplicaciones básicas esto no es un gran problema, pero estos aspectos se vuelven más importantes cuando tenemos usuarios realizando acciones en diferentes zonas horarias o requerimos operaciones más avanzadas relacionadas con fechas.

### Fecha y hora en MongoDB

Debido a que MongoDB almacena los datos utilizando el formato BSON, vamos a utilizar los tipos de datos de la misma [especificación](https://bsonspec.org/#/specification).

Así que según esta especificación, el tipo Date será un entero de 64 bits que representa el número de milisegundos desde el Unix Epoch (1 de enero de 1970 a las 00:00:00 UTC). En otras palabras, MongoDB almacena internamente un número entero grande, positivo para fechas posteriores al Unix Epoch y negativo para fechas anteriores, en un estándar de tiempo neutro y primario (UTC).

Pero, ¿Qué es UTC? A continuación una breve descripción de [space.com](https://www.space.com/):

> UTC son las siglas de Coordinated Universal Time, un estándar utilizado para establecer todas las zonas horarias del mundo.

Por ejemplo, la hora en San Francisco es 07:00 (PST), pero como SF tiene 8 horas menos que la hora UTC (UTC -8) podemos representar la hora como `2023-11-16T15:00:00Z` en formato ISO. Por cierto, la "Z" al final significa que la fecha está en UTC.

Así, en lugar de almacenar objetos datetime con una zona horaria específica como PST, MongoDB utilizará este estándar universal internamente permitiéndonos recuperar un objeto que podemos formatear de cualquier manera que necesitemos.

En el caso de que la zona horaria sea importante y también deba ser guardada en la base de datos, la recomendación general es almacenarla en un **campo separado**. Debido a que UTC es un estándar universal, siempre podemos recrear la fecha original basándonos en el offset.

El **segundo** desafío destacado anteriormente no es tan transversal como el primero, porque depende de cómo estés interactuando con la base de datos.

Puede que sólo estés usando mongosh para probar algunas características de MongoDB, los drivers de MongoDB específicos para alguna plataforma/lenguaje o que estés desarrollando una aplicación con un ORM como Prisma, Mongoose o TypeORM. Sea cual sea el caso, elegir el tipo de datos adecuado para los campos de fecha es esencial para asegurar de que se podrá realizar operaciones relacionadas con la fecha, como agregaciones que involucren valores de este tipo.

Si utilizas un **campo de tipo string** para almacenar tus valores de fecha en lugar de uno de tipo fecha, estarás **restringido** a los métodos y operadores disponibles para los campos de tipo string, por eso es importante establecer el tipo de dato correcto en función de cómo estés construyendo tus modelos.

### Conclusión

Estoy seguro de que hay más desafíos relacionados con este tema, pero quería abordar los más comunes y proporcionar algunas ideas desde mi experiencia trabajando con fechas y horas en MongoDB.

Los puntos que considero más importantes de este artículo son:

- Los objetos datetime se almacenan en UTC.
- El tipo BSON Date es el tipo adecuado para almacenar nuestras fechas.

Esto nos permite almacenar fechas y horas independientemente de aspectos como las zonas horarias y el horario de verano. Luego, otras técnicas como formateo y localización pueden ser aplicadas en el frontend, asegurando que nuestros datos son consistentes en la base de datos.

### Referencias

[Date() and Datetime — MongoDB Manual](https://www.mongodb.com/docs/manual/reference/method/Date/)

[Working with dates and times in MongoDB — Prisma](https://www.prisma.io/dataguide/mongodb/working-with-dates)

[BSON specification](https://bsonspec.org/#/specification)

[MongoDB Date and Time by guycalledseven — GitHub](https://gist.github.com/guycalledseven/23c66211741ab6b8a2bb492a72e282f2)
