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
//  - sito / sitoEtichetta: sito ufficiale (facoltativo).
//  - curiosita: dati particolari, presi dal sito ufficiale o dalla scheda Google.
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
    curiosita: ["Pizza al taglio da asporto, venduta a peso, con molti condimenti diversi."],
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
      { portale: "Google", voto: 4.6, recensioni: 2016 },
      { portale: "Tripadvisor", voto: 4.5, recensioni: 2107 }
    ],
    sito: "http://www.fornocampodefiori.com/",
    curiosita: ["Storico forno di Campo de' Fiori: oltre alla pizza al taglio, pane e dolci tradizionali."],
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
      { portale: "Google", voto: 4.5, recensioni: 8064 },
      { portale: "Tripadvisor", voto: 4.4, recensioni: 1685 }
    ],
    sito: "https://anticofornoroscioli.it/",
    curiosita: ["Forno della famiglia Roscioli, aperto nel 1972.", "Citato da Gambero Rosso, La Repubblica e Corriere della Sera."],
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
      { portale: "Google", voto: 4.5, recensioni: 661 },
      { portale: "Tripadvisor", voto: 4.4, recensioni: 134 }
    ],
    sito: "https://www.vicopizzaandwine.com/",
    curiosita: ["Pizza napoletana a due passi dal Pantheon; il marchio ha una seconda sede a Capri."],
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
      { portale: "Google", voto: 4.4, recensioni: 4618 },
      { portale: "Tripadvisor", voto: 4.0, recensioni: 1919 }
    ],
    sito: "https://www.instagram.com/allecarrette1984",
    sitoEtichetta: "Instagram",
    curiosita: ["Pizzeria di quartiere a Monti, frequentata dai romani: pizza romana, vino e dolci."],
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
      { portale: "Google", voto: 4.3, recensioni: 3381 },
      { portale: "Tripadvisor", voto: 4.0, recensioni: 3200 }
    ],
    sito: "https://www.dafrancesco.it/",
    curiosita: ["Aperta nel 1957 da Francesco Boni e Amalia Tognoloni, oggi alla terza generazione.", "Oltre alla pizza, cucina romana tradizionale."],
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
      { portale: "Google", voto: 4.2, recensioni: 6548 },
      { portale: "Tripadvisor", voto: 4.0, recensioni: 2934 }
    ],
    sito: "https://www.emmapizzeria.com/",
    curiosita: ["Pizzeria con cucina, gastronomia e salumeria.", "Accanto c'è l'emporio-enoteca, con grande attenzione al biologico."],
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
      { portale: "Google", voto: 4.1, recensioni: 11135 },
      { portale: "Tripadvisor", voto: 3.6, recensioni: 5752 }
    ],
    curiosita: ["Locale semplice con pareti piastrellate di bianco, specializzato in pizza romana sottile."],
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
      { portale: "Google", voto: 4.0, recensioni: 7599 },
      { portale: "Tripadvisor", voto: 3.6, recensioni: 4469 }
    ],
    sito: "https://www.lamontecarlo.it/",
    curiosita: ["Pizzeria storica dal 1986, in un vicolo vicino a Piazza Navona."],
    statisticheTop: null,
    rilevato: "2026-11-25"
  }
];
