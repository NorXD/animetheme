# Playframe

Playframe este un prototip de portal editorial de gaming, construit mobile-first în română. Include un homepage complet cu știri, catalog de jocuri, recenzii, lansări viitoare, meniu adaptiv, căutare și filtre.

## Pornire

Deschide `index.html` într-un browser modern. Site-ul nu are pachete de instalat, build sau cerințe de server. Toate ilustrațiile sunt SVG-uri originale, stocate local.

## Conținut și funcții

- Căutarea compară titlul, genul și platforma și ignoră diferențele de diacritice.
- Filtrele de platformă și gen se combină cu căutarea.
- Mișcarea de profunzime, intrarea titlului, luciul subtil și tranzițiile la carduri dau paginii un ritm cinematic, fără biblioteci de animație.
- Meniul pentru mobil, legăturile interne și animațiile respectă navigarea de la tastatură și preferința de mișcare redusă.
- Catalogul, scorurile și textele recenziilor sunt conținut editorial demonstrativ. Calendarul lansărilor folosește linkuri către paginile oficiale și trebuie verificat periodic.
- Știrile nu sunt conectate încă la RSS sau API. Pentru conținut live se poate adăuga ulterior o sursă de date cu cache.

## Inspirație tehnică

- [can-ates/game-portal](https://github.com/can-ates/game-portal) — catalog, căutare, SEO și actualizarea datelor.
- [dante0747/gamebeeper.gg](https://github.com/dante0747/gamebeeper.gg) — un format rapid, orientat pe agregarea știrilor din feeduri.
- [glenjarvis/game-hub](https://github.com/glenjarvis/game-hub) — explorarea unui catalog cu filtre de platformă și gen.

Am folosit aceste repository-uri doar ca referințe de arhitectură și funcționalitate. Codul și ilustrațiile din Playframe sunt scrise de la zero.

## Publicare prin GitHub Pages

În setările repository-ului, alege **Pages**, apoi publică ramura `codex/gaming-portal` din rădăcina repository-ului. Fișierul principal este deja în rădăcină, iar resursele au căi relative.
