# Atmosfera — Home &amp; Living

Sito one-page del negozio di articoli per la casa **Atmosfera**, a Napoli Fuorigrotta
(mercato di Via Metastasio, box D28).

Sito statico (HTML/CSS/JS) pronto per il deploy su **Cloudflare Pages**.

## Struttura
- `index.html` — pagina unica (Chi siamo, Prodotti, Brand, Dove siamo, Contatti)
- `styles.css` — stile (palette del logo: azzurro polvere, crema, grigio)
- `script.js` — menu mobile e animazioni allo scroll
- `logo_atmosfera.jpeg` — logo

## Deploy su Cloudflare Pages
1. Cloudflare Dashboard → **Workers &amp; Pages** → **Create** → **Pages** → **Connect to Git**
2. Seleziona il repository `atmosfera`
3. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *(lasciare vuoto)*
   - **Build output directory:** `/`
4. **Save and Deploy**

Essendo un sito statico non serve alcun passaggio di build.

## Note
- Le immagini dei prodotti verranno aggiunte in seguito.

---
ATMOSFERA DI SOLLAZZO SARA · Via Pietro Metastasio, snc · 80125 Napoli (NA) · P.IVA 10897681218
