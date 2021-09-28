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
    Juego de Alfred Hitch<b>cock</b>
  </p>
</p>

<h1 align="center">Proyecto PVLI :D</h1>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Tabla de contenidos</summary>
  <ol>
    <li>
      <a href="#sobre-el-proyecto">Sobre el proyecto</a>
      <ul>
        <li><a href="#ConceptoPitch">Concepto/Pitch</a></li>
        <li><a href="#aspectos-generales">Aspectos generales</a></li>
        <li><a href="#partida-típica">Partida típica</a></li>
      </ul>
    </li>
    <li>
      <a href="#Menús_y_modos_de_juego">Menús y modos de juego</a>
      <ul>
        <li><a href="#Diseño">Diseño</a></li>
        <li><a href="#interfaz-y-control">Interfaz y Control</a></li>
      </ul>
    </li>
    <li>
      <a href="#Jugabilidad">Jugabilidad</a>
      <ul>
        <li><a href="#Mecánicas">Mecánicas</a></li>
        <li><a href="#dinámica">Dinámicas</a></li>
      </ul>
    </li>
    <li>
      <a href="#Estética">Estética</a>  
    </li>
    <i>
    <a href="#elementos-de-juego">Elementos de Juego</a>
      <ul>
        <li><a href="#assets">Assets</a></li>
        <li><a href="#historia">Historia</a></li>
        <li><a href="#niveles">Niveles</a></li>
      </ul>
    </i>
    <li><a href="#contacto">Contacto/Desarrolladores</a></li>
    <li><a href="#créditosreconocimientos">Agradecimientos y créditos</a></li>
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


### Aspectos Generales
Eclipse busca ofrecer una experiencia de corta duración que le resulte al jugador satisfactoria y divertida al resolver los  puzzles de los distintos niveles. Tendrá una tonalidad oscura que se adecua a la fría historia del juego. Aunque se mostrarán tonalidades más claras para representar la luz, un elemento importante del juego. 
La historia está ambientada en una mansión, allí Estrella y Luna en forma de fantasma tendrán que superar las distintas pruebas hasta llegar a encontrar el cadáver de Luna. Para ello los jugadores tendrán que dominar las distintas mecánicas de cada personaje. El jugador que controle a Luna tendrá que aprender la mecánica de la posesión de objetos y el que controle a Estrella tendrá que apagar las luces o ponerse en medio de ellas para dar sombra.  
<p align="center">
  <img src="https://github.com/miriam-m-s/GRUPO4-PVLI/blob/main/images/vistageneral.jpg" width="400"/>
</p>


## Partida Típica
  <p align="center">
  <img src="https://github.com/miriam-m-s/GRUPO4-PVLI/blob/main/images/descripcionpartidatipica.jpg" width="400"/>
<p>El juego comenzará en una habitación, en ella están Estrella (niña humana) en la zona iluminada y Luna (el fantasma) en la zona oscura. En la parte izquierda de la habitación hay una ventana (1), que refracta un rayo de sol que atraviesa toda la habitación horizontalmente. Este rayo no puede ser tocado por el fantasma, por lo que ahora su movimiento es limitado. En la parte iluminada se encuentra la niña, ésta atravesará la habitación hasta encontrarse con el rayo(1). A continuación se pondrá en frente de este para bloquearlo y que no pase la luz. En consecuencia el movimiento del fantasma ya no se verá limitado y por lo tanto podrá poseer la vela que se halla en la parte inferior (2). La vela se pondrá en la zona donde acababa el rayo de luz (3). Para encender esta vela Estrella deberá apartarse dejando pasar de nuevo el rayo de luz, y la vela se encenderá. Finalmente Estrella podrá acceder a la trampilla y Luna al pentagrama terminando así el nivel.</p>
<!-- Menus/Modos -->

## Menús y modos de juego
<p align="center">
<img src="https://github.com/miriam-m-s/GRUPO4-PVLI/blob/main/images/menuprincipals.jpg" width="300"/>
</p>

### Diseño                                                                                                    
<p><b>Menú Inicial del juego:</b> este tendrá una imagen relacionada con el juego , aparecerá el título del juego y tendrá una música de fondo ambientada al juego. También tendrá un botón de play, este al ser presionado reproducirá un sonido y llevará al menú de niveles. 
</p>

<p><b>Menú de niveles:</b> en este aparecerán los niveles del juego.Los que están marcados con estrellas representan los niveles ya superados.Este menú también tendrá una música de fondo. Los que aparecen con candados son los que no han sido superados. El nivel que aparece sin estrellas y candado es el nivel desbloqueado que no ha sido jugado. Al posicionar el ratón y al hacer click sobre el botón que aparece con estrellas o sin ellas  reproducirá un sonido y empezará el juego.</p>
<p align="left">
  <img src="https://github.com/miriam-m-s/GRUPO4-PVLI/blob/main/images/niveles.jpg" width="200"/>
<p><b>Modos de juego: </b>este será multijugador y no podrá cambiarse, por
lo que no aparecerá la opción para seleccionar
entre modos de juego.</p>

### Interfaz y control  
<p>Los personajes se controlarán utilizando las teclas WASD (fantasma) o las flechas de dirección (humano) según el jugador. Para realizar acciones como la posesión de objetos del fantasma será necesario posicionarse en el rango de activación del objeto y esperar a que se rellene la barra que aparecerá sobre el objeto, indicando que está siendo poseído. En cuanto a la activación de lámparas por parte del humano se logrará de forma automática cuando el jugador se posicione sobre alguna de ellas.</p>
   <p align="center">
  <img src="https://github.com/miriam-m-s/GRUPO4-PVLI/blob/main/images/MENUDEPAUSA.jpg" width="400"/>
<p> El menú de pausa se activará haciendo click izquierdo sobre un botón situado en la esquina superior izquierda que ofrecerá las opciones de: reanudar, reiniciar el nivel, y salir del juego.</p>

## Jugabilidad

<!-- Mecánicas -->
## Mecánicas
<img src="https://github.com/miriam-m-s/GRUPO4-PVLI/blob/main/images/mecanIcon.png" width="48"/>
  
  Mecánicas

<!-- Elementos de Juego -->
## Mecánicas de personajes
<a href="https://github.com/miriam-m-s/GRUPO4-PVLI">
    <img src="images/sitemap-64.png" alt="Logo" | width=48)>
  </a>
  Al ser un juego cooperativo existen dos personajes: La hermana menor (humano), y la hermana mayor (fantasma). cada uno con diferentes propiedades.
Los dos personajes se mueven en las 8 direcciones.

El fantasma tiene la mecánica de poseer objetos, habilidad que le permite modificar la posición de elementos del escenario. A continuación se explica cómo se realizaría dicha mecánica:
Los objetos poseibles tienen dos estados: 
    -No poseídos: Son estáticos, el humano no puede atravesarlos mientras que el fantasma si.
    -Poseídos: En este estado el fantasma desaparece de la pantalla y el jugador que lo controlaba pasa a controlar al objeto, moviéndolo como si fuese otro personaje en las 8       direcciones.
Cada vez que el fantasma se posiciona encima de un objeto poseible en estado no poseído, una barra vacía aparecerá encima del objeto y se empezará a rellenar. Si el fantasma se aleja de dicho objeto, la barra desaparece. Por otro lado, si la barra se llena completamente, el fantasma desaparece y el objeto pasa al estado poseído. Si el objeto poseído se queda completamente quieto durante 1 segundo, la barra reaparece y se empezará a rellenar. Si el objeto poseído se mueve lo más mínimo, la barra desaparece. Por otro lado, si la barra se llena completamente el fantasma aparece de nuevo y el objeto pasa al estado no poseído.

<p align="center">
  <a href="https://github.com/miriam-m-s/GRUPO4-PVLI">
    <img src="images/barracargando.JPG" alt="Logo" | width=300)>
  </a>
  </p>


### Mecánicas de escenario
|      OBJETOS      |  POSEIBLE |    DESCRIPCION     |   
| ----------------- | --------- | ----------------------------------------------------------------------------------------- |
|      Muebles      |     SI    | Objeto que ocupa una casilla, bloquea la luz y colisiona con el humano. |
|    Rayo de luz    |     NO    | Líneas con dirección que salen de las paredes y solo se mueven en las 4 direcciones básicas. Su rumbo puede ser alterado por espejos. |
|       Espejo      |     SI    | Modifican la dirección de los rayos de luz cuando estos entran en contacto. |
|       Velas       |     SI    | Este objeto tiene dos estados  - Encendido: Existe un círculo de luz alrededor, en este estado no puede ser poseído por el fantasma  - Apagado: No existe ninguna luz alrededor, el objeto, en este estado puede ser poseído por el fantasma  - Al principio de un nivel las velas siempre van a estar en el estado apagado. Y solo cambiaran al estado encendido cuando un rayo de luz entre en contacto con el objeto |
|Lámpara/Interruptor|     NO    | Este objeto se compone de dos partes:  - Lámpara: que a su vez se divide en dos estados:  - Encendido: Existe un círculo de luz alrededor  - Apagado: No existe un círculo de luz alrededor  - Interruptor: Cada vez que el humano (solo el humano), pase por encima de este componente se alternarán los dos estados de la lámpara.  Visualmente, el interruptor y su lámpara correspondiente tendrán el mismo color. |

### Dinámica
El objetivo final del juego es encontrar el cuerpo del fantasma que se sitúa en el último nivel. Para ello es necesario superar todos los niveles anteriores logrando que tanto el humano como el fantasma lleguen a sus diferentes bases (una puerta para el humano y un pentagrama para el fantasma).

Los niveles serán puntuados mediante un sistema de logros basado en el tiempo que el jugador tarda en resolver los rompecabezas. Así cada nivel se puntúa con una, dos, o incluso tres estrellas si el jugador ha resuelto el puzzle a una gran velocidad.

Sin embargo si se comete algún error a la hora de resolver el puzzle, el jugador deberá reiniciar el nivel hasta resolverlo. Lo mismo sucederá si el fantasma entra en contacto con la luz durante el desarrollo de la partida.

Se espera que los jugadores identifiquen los elementos que pueden utilizar a su favor a la hora de resolver los diferentes puzzles (Ej: Si identifica una lámpara que puede abrir camino al humano, que la encienda) así como que reflexionen sobre las posibles formas de resolver cada nivel.

<!-- Créditos/Reconocimientos -->
## Estética

Los nombres de los personajes Estrella y Luna se han elegido porque estos dan a entender la mecánica de cada jugador. Luna que representa la noche, la oscuridad dando a entender que ésta solo puede estar por zonas oscuras.Estrella representa luz ,claridad, dando a entender que ésta sólo puede moverse por zonas de luz.

## Elementos de Juego

### Assets
<img src="https://github.com/miriam-m-s/GRUPO4-PVLI/blob/main/images/assetsIcon.png" width="48"/>
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
       
       
### Historia
El juego está ambientado en la película “Psicosis”, del director Alfred Hitchcock. La historia comienza tras la muerte de Marion Crane (“Luna” en el juego) y gira en torno a la búsqueda que emprende junto a su hermana, Lila Crane (“Estrella” en el juego), con el objetivo de encontrar su cadáver en la casa de los Bates. En esta adaptación Estrella es una niña pequeña, de manera que le teme a la oscuridad y por ello no puede pasar por zonas que no están bien iluminadas, mientras que Luna al ser un fantasma, no puede atravesar la luz.

### Niveles
Nivel 5
<img src="https://github.com/miriam-m-s/GRUPO4-PVLI/blob/main/images/DisNiv.png" width="400"/>

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
[[Fireboy y WaterGirl]](https://fireboyand-watergirl.co/) La idea de que dos jugadores utilicen el mismo teclado para controlar al mismo tiempo a dos personajes antonimos el uno del otro (Fuego/Agua, Luz/Oscuridad)  
[[Binding of Isaac]](https://store.steampowered.com/app/113200/The_Binding_of_Isaac/)  
[[Crepusculo]](https://google.com) Yo que se lo ha dicho Paula  
