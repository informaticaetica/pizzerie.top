// ============================================================
//  ELENCO PIZZERIE — modifica solo questo file per aggiornare il sito.
//
//  Per ogni pizzeria:
//  - fonti: i voti pubblici rilevati sui portali (voto su 5 e numero
//    di recensioni). La media pizzerie.top è calcolata in automatico,
//    pesando ogni portale per il numero di recensioni.
//  - statisticheTop: link alla scheda su statistiche.top, se esiste
//    (in quel caso la scheda mostra il badge "Validata da statistiche.top").
//  - rilevato: data in cui sono stati letti i voti.
// ============================================================
const PIZZERIE = [
  {
    nome: "Pizza Florida",
    citta: "Roma",
    zona: "Largo Argentina",
    indirizzo: "Via Florida 25",
    stile: "Al taglio",
    fonti: [
      { portale: "Google", voto: 4.8, recensioni: 4389 },
      { portale: "Tripadvisor", voto: 4.7, recensioni: 1547 }
    ],
    statisticheTop: null,
    rilevato: "2026-11-25"
  },
  {
    nome: "Romana Pizza (Rione Ponte)",
    citta: "Roma",
    zona: "Piazza Navona",
    indirizzo: "Via del Governo Vecchio 10",
    stile: "Al taglio",
    fonti: [
      { portale: "Google", voto: 4.7, recensioni: 2912 },
      { portale: "Tripadvisor", voto: 4.7, recensioni: 651 }
    ],
    statisticheTop: null,
    rilevato: "2026-11-25"
  },
  {
    nome: "Forno Campo de' Fiori",
    citta: "Roma",
    zona: "Campo de' Fiori",
    indirizzo: "Campo de' Fiori 22",
    stile: "Al taglio",
    fonti: [
      { portale: "Google", voto: 4.6, recensioni: 2016 }
    ],
    statisticheTop: null,
    rilevato: "2026-11-25"
  },
  {
    nome: "Antico Forno Roscioli",
    citta: "Roma",
    zona: "Campo de' Fiori",
    indirizzo: "Via dei Chiavari 34",
    stile: "Al taglio",
    fonti: [
      { portale: "Google", voto: 4.5, recensioni: 8064 }
    ],
    statisticheTop: null,
    rilevato: "2026-11-25"
  },
  {
    nome: "Vico Pizza & Wine",
    citta: "Roma",
    zona: "Pantheon",
    indirizzo: "Piazza Rondanini 47",
    stile: "Napoletana",
    fonti: [
      { portale: "Google", voto: 4.5, recensioni: 661 }
    ],
    statisticheTop: null,
    rilevato: "2026-11-25"
  },
  {
    nome: "Alle Carrette",
    citta: "Roma",
    zona: "Monti",
    indirizzo: "Via della Madonna dei Monti 95",
    stile: "Romana",
    fonti: [
      { portale: "Google", voto: 4.4, recensioni: 4618 }
    ],
    statisticheTop: null,
    rilevato: "2026-11-25"
  },
  {
    nome: "Da Francesco",
    citta: "Roma",
    zona: "Piazza Navona",
    indirizzo: "Piazza del Fico 29",
    stile: "Romana",
    fonti: [
      { portale: "Google", voto: 4.3, recensioni: 3381 }
    ],
    statisticheTop: null,
    rilevato: "2026-11-25"
  },
  {
    nome: "Emma",
    citta: "Roma",
    zona: "Campo de' Fiori",
    indirizzo: "Via del Monte della Farina 28",
    stile: "Romana",
    fonti: [
      { portale: "Google", voto: 4.2, recensioni: 6548 }
    ],
    statisticheTop: null,
    rilevato: "2026-11-25"
  },
  {
    nome: "Pizzeria Da Baffetto",
    citta: "Roma",
    zona: "Piazza Navona",
    indirizzo: "Via del Governo Vecchio 114",
    stile: "Romana",
    fonti: [
      { portale: "Google", voto: 4.1, recensioni: 11135 }
    ],
    statisticheTop: null,
    rilevato: "2026-11-25"
  },
  {
    nome: "La Montecarlo",
    citta: "Roma",
    zona: "Piazza Navona",
    indirizzo: "Vicolo Savelli 13",
    stile: "Romana",
    fonti: [
      { portale: "Google", voto: 4.0, recensioni: 7599 }
    ],
    statisticheTop: null,
    rilevato: "2026-11-25"
  }
];
