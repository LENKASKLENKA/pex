 Pexeso

## Funkční specifikace

### Použité technologie
1. **HTML**: Pro základní strukturu stránek.
2. **CSS**: Pro vizuální design.
3. **JavaScript (pexeso.js)**: Pro logiku hry, interaktivitu a správu Local Storage.

### Soubory
- **index.html**: Hlavní HTML soubor obsahující strukturu uživatelského rozhraní.
- **style.css**: Stylování hry, včetně funkcí pro skrytí a zobrazení částí.
- **pexeso.js**: Logika hry, včetně práce s Local Storage.

---

## Použití

### Spuštění hry
1. Stáhněte si všechny soubory projektu a uložte je do jednoho adresáře.
2. Ujistěte se, že všechny cesty k souborům (např. k obrázkům) jsou správně propojeny.
3. Otevřete soubor `index.html` v prohlížeči.
4. Klikněte na tlačítko "Hrát", abyste spustili hru.

### Administrace
- Do složky **Obr** nahrajte nové obrázky pro karty. Každý obrázek by měl být dvakrát, aby mohly tvořit pár.

---

## Hra Pexeso

### Hlavní funkce
1. **Režim pro jednoho hráče**:
   - Karty se náhodně míchají při každém spuštění hry.
   - Hráč se snaží najít všechny dvojice karet.
2. **Míchání karet**:
   - Karty se při každém spuštění hry promíchají, což zajišťuje unikátní rozložení.
3. **Sledování skóre**:
   - Hra sleduje, kolik párů hráč našel.
4. **Ukládání stavu hry**:
   - Aktuální stav hry (skóre, otočené karty, aktuální stav hrací desky) se ukládá do Local Storage. Hráč tak může pokračovat ve hře tam, kde skončil.
5. **Ovládání hry**:
   - Kliknutím na kartu ji otočíte. Cílem je najít všechny dvojice.
   - Tlačítkem **Restartovat** můžete začít novou hru.
   - Tlačítkem **Zpět do menu** se můžete vrátit na úvodní obrazovku.

---

## Další možnosti rozšíření
1. **Více herních režimů**:
   - Přidání režimu pro dva hráče s přepínáním tahu.
2. **Vylepšené rozhraní**:
   - Přidání animací a zvukových efektů pro zvýšení uživatelského zážitku.
3. **Ukládání více her**:
   - Umožnit ukládání a načítání více různých herních stavů.
4. **Tabulka skóre**:
   - Ukládání a zobrazení nejlepších výsledků pomocí Local Storage.
