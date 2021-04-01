//

//das ist die Seite, die aufgerufen wird, wenn man sich noch nicht angemeldet hat
//müsste man natürlich schöner machen, aber prinzipiell funktioniert es
//hier verwendete Möglichkeit: durch Variablen gesteuert wechseln:
//Vorteil: man braucht keine neue Seiten (weniger Arbeit für Backend)
//Nachteil: switch case ist natürlich nicht so schön
//andere (bessere) Möglichkeit: Link-gesteuert und mehrere Seiten (etwas mehr Arbeit für Backend)
//Vorteil: sichere und schnellere Wechsel möglich
//Nachteil: mehrere Seiten programmieren (mehr Arbeit für Frontend)

//man muss hier zum Glück nicht den Fall mit einbeziehen, dass man sich falsch angemeldet hat, die Seite verändert sich einfach nicht
import React, { Component } from "react";

class First extends Component {
  render() {
    return <h1>Bitte am Smartphone einloggen</h1>;
  }
}

export default First;
