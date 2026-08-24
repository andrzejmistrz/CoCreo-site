# CoCreo — strona statyczna (GitHub Pages)

Landing page projektu CoCreo + zakładka Kontakt/O firmie (PPHU KERI).

## Struktura

```
cocreo-site/
├── index.html      # CoCreo — landing z hero, korzyściami, galerią, misją, video i formularzem
├── kontakt.html    # O firmie PPHU KERI + dane kontaktowe
├── styles.css      # Wspólne style
├── script.js       # Rotujące słowa, obsługa formularza, drobiazgi
├── images/         # Zdjęcia z zajęć (JPG, ~1.3 MB łącznie, zoptymalizowane pod web)
└── README.md
```

Brak build stepu, brak zależności — czyste HTML/CSS/JS.

**Uwaga o zdjęciach:** wszystkie zdjęcia mają znak wodny fotografa („JL") w prawym dolnym rogu — zostały świadomie zachowane jako atrybucja. Jeśli masz zgodę autora lub inną wersję bez znaku, po prostu podmień pliki w `images/` zachowując te same nazwy.

## Deploy na GitHub Pages

1. Załóż repo na GitHub (np. `cocreo-site`).
2. Wrzuć zawartość tego folderu do repo (pliki na root, nie w podkatalogu).
3. **Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `/root`.**
4. Po chwili strona żyje pod `https://<login>.github.io/cocreo-site/`.

Jeśli chcesz własną domenę (np. `cocreo.pl`):
- **Settings → Pages → Custom domain** — wpisz domenę.
- Dodaj plik `CNAME` do repo z zawartością `cocreo.pl`.
- U rejestratora ustaw rekordy DNS wg [oficjalnej dokumentacji GH Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Formularz zapisu — do skonfigurowania

Formularz nie działa "z pudełka" — GitHub Pages nie ma backendu. Wybierz **jedno** z rozwiązań:

### Formspree (rekomendowane, darmowe do 50 wysyłek/mies.)

1. Załóż konto: <https://formspree.io/register>.
2. Utwórz nowy formularz, dostaniesz endpoint typu `https://formspree.io/f/xyzabc12`.
3. W pliku `index.html` znajdź `<form ... action="https://formspree.io/f/YOUR_FORM_ID"` i wklej swój URL.
4. Gotowe — zgłoszenia trafiają na e-mail podany przy rejestracji.

### Alternatywy o identycznym API

- [Basin](https://usebasin.com) — darmowe 100/mies.
- [FormSubmit](https://formsubmit.co) — bez konta, potwierdzenie mailem.
- [Getform](https://getform.io) — darmowe 50/mies.

Wszystkie akceptują `POST` z `FormData` — wystarczy podmienić `action="..."`.

## Do dopracowania (opcjonalne)

- **Favicon** — brakuje. Dorzuć `favicon.ico` / `favicon.svg` na root i dodaj w `<head>`:
  ```html
  <link rel="icon" href="favicon.svg" type="image/svg+xml" />
  ```
- **Open Graph image** — dodaj `<meta property="og:image" content="https://.../og.jpg" />` gdy będzie grafika promocyjna.
- **Google Analytics / Plausible** — jeśli potrzebne, dodać snippet przed `</head>`.

## Zmiana kolorów / typografii

Wszystkie tokeny w jednym miejscu — góra pliku `styles.css`, sekcja `:root`.
Główny akcent to `--accent: #EA6A29`. Zmień tam i propaguje się w całej stronie.
