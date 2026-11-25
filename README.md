# pizzerie.top

Sito statico pubblicato con GitHub Pages sul dominio pizzerie.top.

## Aggiornare le pizzerie

1. Modifica `pizzerie.json` (voti, citazioni, sito, curiosità, link alla scheda su statistiche.top).
2. Esegui `python3 genera.py`: rigenera `pizzerie.js`, le pagine in `pizzeria/` e `sitemap.xml`.
3. Fai commit e push.

Non modificare a mano `pizzerie.js` né i file in `pizzeria/`: vengono sovrascritti.

## File

- `index.html` — classifica con ricerca e filtri
- `pizzeria/<slug>.html` — una pagina per pizzeria, con condivisione e link per recensire su statistiche.top
- `metodo.html`, `contatti.html`, `proponi.html` — pagine fisse
- `CNAME` — dominio personalizzato per GitHub Pages
