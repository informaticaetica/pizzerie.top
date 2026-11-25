#!/usr/bin/env python3
"""Genera il sito pizzerie.top a partire da pizzerie.json.

Uso:  python3 genera.py

Produce:
- pizzerie.js            i dati per la classifica in home (non modificarlo a mano)
- pizzeria/<slug>.html   una pagina per ogni pizzeria, con condivisione e
                         link alla recensione su statistiche.top
- sitemap.xml
"""
import html
import json
import os
from datetime import date
from urllib.parse import quote

BASE = "https://pizzerie.top"
QUI = os.path.dirname(os.path.abspath(__file__))
MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio",
        "agosto", "settembre", "ottobre", "novembre", "dicembre"]


def e(t):
    return html.escape(str(t), quote=True)


def virgola(n, cifre=1):
    return f"{n:.{cifre}f}".replace(".", ",")


def migliaia(n):
    return f"{n:,}".replace(",", ".")


def data_it(iso):
    a, m, g = (int(x) for x in iso.split("-"))
    return f"{g} {MESI[m - 1]} {a}"


def calcola(pizzerie):
    for p in pizzerie:
        tot = sum(f["recensioni"] for f in p["fonti"])
        p["totRecensioni"] = tot
        p["media"] = round(sum(f["voto"] * f["recensioni"] for f in p["fonti"]) / tot, 4)
    pizzerie.sort(key=lambda p: (-p["media"], -p["totRecensioni"]))
    for i, p in enumerate(pizzerie, 1):
        p["posizione"] = i
    return pizzerie


NAV = """  <header class="site">
    <div class="wrap">
      <a class="logo" href="../">pizzerie<span>.top</span></a>
      <nav>
        <a href="../">Classifica</a>
        <a href="../metodo.html">Come valutiamo</a>
        <a href="../contatti.html">Contatti</a>
        <a class="cta" href="../proponi.html">Proponi la tua pizzeria</a>
      </nav>
    </div>
  </header>"""


def pagina(p, totale):
    url = f"{BASE}/pizzeria/{p['slug']}.html"
    titolo = f"{p['nome']} – {p['citta']}: voto {virgola(p['media'])}/5 | Pizzerie.top"
    descr = (f"{p['nome']}, {p['indirizzo']}, {p['citta']}: media {virgola(p['media'])}/5 su "
             f"{migliaia(p['totRecensioni'])} recensioni. #{p['posizione']} nel centro storico di {p['citta']}.")
    testo_share = f"{p['nome']} ({p['citta']}): {virgola(p['media'])}/5 su pizzerie.top"
    u, t = quote(url, safe=""), quote(testo_share, safe="")
    share = [
        ("WhatsApp", f"https://wa.me/?text={t}%20{u}"),
        ("Facebook", f"https://www.facebook.com/sharer/sharer.php?u={u}"),
        ("X", f"https://x.com/intent/post?text={t}&url={u}"),
        ("Telegram", f"https://t.me/share/url?url={u}&text={t}"),
        ("Email", f"mailto:?subject={t}&body={u}"),
    ]
    fonti = "\n".join(
        f'          <li><span>{e(f["portale"])}</span><span>{virgola(f["voto"])} ★ · {migliaia(f["recensioni"])} recensioni</span></li>'
        for f in p["fonti"])
    curiosita = "".join(f"<li>{e(c)}</li>" for c in p.get("curiosita", []))
    sito = (f'<p><a class="sito" href="{e(p["sito"])}" target="_blank" rel="noopener nofollow">🌐 '
            f'{e(p.get("sitoEtichetta", "Sito ufficiale"))}</a></p>') if p.get("sito") else ""
    cit = p.get("citazione")
    citazione = (f'<blockquote class="citazione"><p>“{e(cit["testo"])}”</p>'
                 f'<footer>— {e(cit["fonte"])}</footer></blockquote>') if cit else ""
    maps = "https://www.google.com/maps/search/?api=1&query=" + quote(f"{p['nome']} {p['indirizzo']} {p['citta']}")
    ld = {
        "@context": "https://schema.org", "@type": "Restaurant", "name": p["nome"],
        "servesCuisine": "Pizza", "url": url,
        "address": {"@type": "PostalAddress", "streetAddress": p["indirizzo"],
                    "addressLocality": p["citta"], "addressCountry": "IT"},
    }
    if p.get("sito"):
        ld["sameAs"] = [p["sito"]]
    sbs = []
    if p.get("statisticheTop"):
        sbs = [f'<a class="button" href="{e(p["statisticheTop"])}#st-recensisci" rel="noopener">✍️ Scrivi la tua recensione</a>',
               f'<p class="meta small">La recensione si scrive sulla scheda di {e(p["nome"])} su statistiche.top: '
               f'serve un\'email confermata e la redazione la legge prima di pubblicarla. '
               f'<a href="{e(p["statisticheTop"])}" rel="noopener">Vedi la scheda completa</a>.</p>']
    return f"""<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{e(titolo)}</title>
  <meta name="description" content="{e(descr)}">
  <link rel="canonical" href="{url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{e(p['nome'])} – {virgola(p['media'])}/5 su pizzerie.top">
  <meta property="og:description" content="{e(descr)}">
  <meta property="og:url" content="{url}">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍕</text></svg>">
  <link rel="stylesheet" href="../style.css">
  <script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
</head>
<body>
{NAV}

  <main class="wrap page">
    <p class="meta"><a href="../">← Classifica</a> · #{p['posizione']} di {totale} nel centro storico di {e(p['citta'])}</p>
    <h1>{e(p['nome'])}</h1>
    <p class="meta">{e(p['indirizzo'])}, {e(p['citta'])} · {e(p['zona'])} · {e(p['stile'])} · <a href="{e(maps)}" target="_blank" rel="noopener">Mappa</a></p>

    <div class="score-row">
      <span class="score big">{virgola(p['media'])}<small>/5</small></span>
      <span class="meta">media pesata su {migliaia(p['totRecensioni'])} recensioni<br><span class="badge-calc">Media calcolata da pizzerie.top</span></span>
    </div>

    {citazione}

    {f'<h2>Da sapere</h2><ul class="curiosita">{curiosita}</ul>' if curiosita else ''}
    {sito}

    <h2>I voti sui portali</h2>
    <ul class="fonti">
{fonti}
    </ul>
    <p class="meta small">Voti rilevati il {data_it(p['rilevato'])}. <a href="../metodo.html">Come calcoliamo la media</a></p>

    <div class="cta-box">
      <h2>Ci sei stato? Racconta com'è andata</h2>
      {''.join(sbs)}
    </div>

    <h2>Condividi</h2>
    <div class="share">
      {''.join(f'<a href="{e(h)}" target="_blank" rel="noopener">{n}</a>' for n, h in share)}
      <button type="button" data-copia="{url}">Copia link</button>
    </div>
  </main>

  <footer class="site">
    <div class="wrap">© pizzerie.top · Recensioni indipendenti · <a href="../proponi.html">Proponi la tua pizzeria</a></div>
  </footer>
  <script>
    document.querySelector('[data-copia]').addEventListener('click', async ev => {{
      const b = ev.currentTarget;
      try {{ await navigator.clipboard.writeText(b.dataset.copia); b.textContent = 'Link copiato ✓'; }}
      catch (_) {{ prompt('Copia il link:', b.dataset.copia); }}
    }});
  </script>
</body>
</html>
"""


def main():
    pizzerie = calcola(json.load(open(os.path.join(QUI, "pizzerie.json"), encoding="utf-8")))
    os.makedirs(os.path.join(QUI, "pizzeria"), exist_ok=True)
    for p in pizzerie:
        with open(os.path.join(QUI, "pizzeria", p["slug"] + ".html"), "w", encoding="utf-8") as f:
            f.write(pagina(p, len(pizzerie)))
    with open(os.path.join(QUI, "pizzerie.js"), "w", encoding="utf-8") as f:
        f.write("// File generato da genera.py a partire da pizzerie.json: non modificarlo a mano.\n")
        f.write("const PIZZERIE = " + json.dumps(pizzerie, ensure_ascii=False, indent=2) + ";\n")
    oggi = date.today().isoformat()
    pagine = ["", "metodo.html", "contatti.html", "proponi.html"] + [f"pizzeria/{p['slug']}.html" for p in pizzerie]
    with open(os.path.join(QUI, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        for pg in pagine:
            f.write(f"  <url><loc>{BASE}/{pg}</loc><lastmod>{oggi}</lastmod></url>\n")
        f.write("</urlset>\n")
    print(f"Generate {len(pizzerie)} pagine pizzeria, pizzerie.js e sitemap.xml")


if __name__ == "__main__":
    main()
