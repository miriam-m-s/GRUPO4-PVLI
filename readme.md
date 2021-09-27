<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/miriam-m-s/GRUPO4-PVLI">
    <img src="images/moonIcon.png" alt="Logo" | width=124)>
  </a>
  <p align="center">
    <b>Juego de Alfred Hitchcock</b>
  </p>
</p>

<h1 align="center">Proyecto PVLI</h1>
  



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Tabla de contenidos</summary>
  <ol>
    <li>
      <a href="#sobre-el-proyecto">Sobre el proyecto</a>
      <ul>
        <li><a href="#Concepto/Pitch">Concepto/Pitch</a></li>
      </ul>
    </li>
    <li>
      <a href="#Gameplay">Gameplay</a>
      <ul>
        <li><a href="#Objetivos">Objetivos</a></li>
        <li><a href="#Progresión">Progresión</a></li>
        <li><a href="#Interfaz">Interfaz/GUI</a></li>
      </ul>
    </li>
    <li><a href="#usage">Mecánicas</a></li>
    <li><a href="#roadmap">Elementos de juego</a></li>
    <ul>
        <li><a href="#prerequisites">Items/Interaccionables</a></li>
        <li><a href="#installation">Personajes</a></li>
        <li><a href="#installation">Diseño de nivel</a></li>
      </ul>
    <li><a href="#contributing">Assets</a></li>
    <ul>
        <li><a href="#prerequisites">Música y sonido</a></li>
        <li><a href="#installation">Sprites</a></li>
      </ul>
    <li><a href="#contact">Contacto/Desarrolladores</a></li>
    <li><a href="#Créditos/Reconocimientos">Agradecimientos y créditos</a></li>
  </ol>
</details>

<!-- Sobre-el-Proyecto -->

## Sobre el Proyecto
<a href="https://github.com/miriam-m-s/GRUPO4-PVLI">
    <img align="left" src="images/docuicon.png" alt="Logo" | width=30)>
  </a>
  
Proyecto para PVLI :)

### Concepto/Pitch

"Eclipse" se trata de un juego de estilo cooperativo top-down donde dos jugadores adoptarán los personajes de Estrella, una niña humana, y Luna, su hermana fantasma. La historia del juego toma su origen en una adaptación de la película "Psicosis" de Alfred Hitchcock. 

El objetivo del juego es que la niña, Estrella, encuentre el cadáver de su hermana muerta Luna, con la ayuda del fantasma que ésta ha dejado atrás. Para ello Luna la ayuda a avanzar por las diferentes salas resolviendo distintos puzzles.


<!-- Gameplay -->

## Gameplay
<a href="https://github.com/miriam-m-s/GRUPO4-PVLI">
    <img src="images/gameIcon.png" alt="Logo" | width=48)>
  </a>

Pues hay puzzles y esas cosas

### Objetivos
Muchos

### Progresión
Progresiva a ser posible

### Interfaz
Sí

<!-- Mecánicas -->
## 3.1 Mecánicas
<a href="https://github.com/miriam-m-s/GRUPO4-PVLI">
    <img src="images/mecanIcon.png" alt="Logo" | width=48)>
  </a>
  
  Mecánicas

<!-- Elementos de Juego -->
## 3.1.1. Mecánicas de personajes
<a href="https://github.com/miriam-m-s/GRUPO4-PVLI">
    <img src="images/sitemap-64.png" alt="Logo" | width=48)>
  </a>

### 3.1.2. Mecánicas de escenario
|      OBJETOS      |  POSEIBLE |    DESCRIPCION     |   
| ----------------- | --------- | ----------------------------------------------------------------------------------------- |
|      Muebles      |     SI    | Objeto que ocupa una casilla, bloquea la luz y colisiona con el humano. |
|    Rayo de luz    |     NO    | Líneas con dirección que salen de las paredes y solo se mueven en las 4 direcciones básicas. Su rumbo puede ser alterado por espejos. |
|       Espejo      |     SI    | Modifican la dirección de los rayos de luz cuando estos entran en contacto. |
|       Velas       |     SI    | Este objeto tiene dos estados  - Encendido: Existe un círculo de luz alrededor, en este estado no puede ser poseído por el fantasma  - Apagado: No existe ninguna luz alrededor, el objeto, en este estado puede ser poseído por el fantasma  - Al principio de un nivel las velas siempre van a estar en el estado apagado. Y solo cambiaran al estado encendido cuando un rayo de luz entre en contacto con el objeto |
|Lámpara/Interruptor|     NO    | Este objeto se compone de dos partes:  - Lámpara: que a su vez se divide en dos estados:  - Encendido: Existe un círculo de luz alrededor  - Apagado: No existe un círculo de luz alrededor  - Interruptor: Cada vez que el humano (solo el humano), pase por encima de este componente se alternarán los dos estados de la lámpara.  Visualmente, el interruptor y su lámpara correspondiente tendrán el mismo color. |

### 3.2 Dinámica
El objetivo final del juego es encontrar el cuerpo del fantasma que se sitúa en el último nivel. Para ello es necesario superar todos los niveles anteriores logrando que tanto el humano como el fantasma lleguen a sus diferentes bases (una puerta para el humano y un pentagrama para el fantasma).

Los niveles serán puntuados mediante un sistema de logros basado en el tiempo que el jugador tarda en resolver los rompecabezas. Así cada nivel se puntúa con una, dos, o incluso tres estrellas si el jugador ha resuelto el puzzle a una gran velocidad.

Sin embargo si se comete algún error a la hora de resolver el puzzle, el jugador deberá reiniciar el nivel hasta resolverlo. Lo mismo sucederá si el fantasma entra en contacto con la luz durante el desarrollo de la partida.

Se espera que los jugadores identifiquen los elementos que pueden utilizar a su favor a la hora de resolver los diferentes puzzles (Ej: Si identifica una lámpara que puede abrir camino al humano, que la encienda) así como que reflexionen sobre las posibles formas de resolver cada nivel.

<!-- Créditos/Reconocimientos -->
## 3.3 Estética

Los nombres de los personajes Estrella y Luna se han elegido porque estos dan a entender la mecánica de cada jugador. Luna que representa la noche, la oscuridad dando a entender que ésta solo puede estar por zonas oscuras.Estrella representa luz ,claridad, dando a entender que ésta sólo puede moverse por zonas de luz.

## 4 Contenido
GFX
<li>
  PERSONAJES(top-down, animación idle & andar, una dirección)
  <ul>
    - Persona
    </ul>
   <ul>
    - Fantasma
   </ul>
  </ul>
 </li>
 <li>
  ITEMS
  <ul>
    - Mueble 1x1 : Armario
  </ul>
  <ul>
    - Espejo (8 direcciones)
  </ul>
  <ul>
    - Vela
  </ul>
    <ul>
    - Rayo de luz (vertical y horizontal)
  </ul>
    <ul>
    - Lampara (encendido/apagado)
  </ul>
      <ul>
    - Interruptor (on/off)
  </ul>
 </li>
   <li>
  FONDO
  <ul>
    - Tiles de paredes de casa antigua con diagonales
  </ul>
    <ul>
    - Tiles de tablas de madera
        </ul>
 </li>
 
AUDIO

<li>
  SFX
  <ul>
    - Sonido navegación/interacción UI
    </ul>
   <ul>
    - Al poseer un objeto
   </ul>
     <ul>
       <li>
    Ambientales
     <ul>
       - Pasos
     </ul>
       </li>
   </ul>
 </li>
        <li>
    MUSICA
     <ul>
       - Menú principal (loop corto)
     </ul>
       <ul>
       - Gameplay
     </ul>
       </li>
       
## Assets
<a href="https://github.com/miriam-m-s/GRUPO4-PVLI">
    <img src="images/assetsIcon.png" alt="Logo" | width=48)>
  </a>

## Contacto
<a href="https://github.com/miriam-m-s/GRUPO4-PVLI">
    <img src="images/contactIcon.png" alt="Logo" | width=48)>
 </a>
  
igdelcas@ucm.es  
pamorill@ucm.es  
jacoboal@ucm.es  
mirima10@ucm.es  



<!-- Créditos/Reconocimientos -->

## Créditos/Reconocimientos

[[Wikipedia Hitchcock]](https://es.wikipedia.org/wiki/Alfred_Hitchcock) Tema del proyecto, vida y obra  
[[Psicosis (1960)]](https://en.wikipedia.org/wiki/Psychosis) Inspiración principal del juego  
[[Fireboy y Lavagirl]](https://fireboyand-watergirl.co/) Mecánicas y estilo de juego similares  
[[Binding of Isaac]](https://store.steampowered.com/app/113200/The_Binding_of_Isaac/)  
[[Crepusculo]](https://www.casadellibro.com/libro-luna-nueva/9788420471136/1121515) Yo que se lo ha dicho Paula  
