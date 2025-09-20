export function footerTextFor(routePath: string) {
  if (routePath === "/")
    return `Mindig hagyok helyet egy láblécnek és sosem tudom, hogy mit is kellene ide írnom. 
  Oldaltérképnek nem nagyon van sok értelme (használd a fejlécet vagy a mobil menüt, az az oldaltérkép és még mindig ott van a képernyőn), nyitvatartási időm nem igazán van, mint ahogy impresszumom
  vagy adatvédelmi nyilatkozatom sem. Úgyhogy általában csak valami ide nem illő megjegyzés-félét vagy érdekességet szoktam beszúrni.<br/><br/>
  Ja, tudom már! Látogass el a <a href="https://fabokarpad.hu" rel="noopener noreferrer" target="_blank">fabokarpad.hu</a> weboldalra hogy megnézhesd a többi általam készült munkámat!`;
  if (routePath === "/menu")
    return `Az átlagos látogató számára ez csak egy egyszerű lista amit legfeljebb elolvasni lehet. De ha az oldal tulajdonosa bejelentkezett, akkor ez egy böngészőben szerkeszthető komponenssé válik ami egérrel, billentyűzettel és érintőképernyővel
  egyaránt is szerkeszthető. Minden menüt lista elemek és kategóriák meg alkategóriák alkotják, de egy kategóriában nem szerepelhet mind a kettő egymás mellett, csak az egyik vagy a másik.
  Szerkeszteni dupla kattintással vagy Enterrel lehet kijelölt elemeket, tabulátorral pedig mozogni közöttük ha a billentyűzetet preferálod.`;
  if (routePath === "/pizza")
    return `Próbáltad már a Drag'n'Drop funkciót? Csak fogd meg az egérrel valamelyik elemet és kezd el húzni, az alkalmazás majd megmutatja hová tudod ledobni. (Bejelentkezés után természetesen.) 
  Egész kategóriákat a fejlécükön keresztül lehet mozgatni és akár más kategóriákba is ledobhatod őket ha abban még nincsenek lista elemek. Vagy csak húzd át a másik oszlopba egyetlen mozdulattal.`;
  if (routePath === "/cake")
    return `Képeket URL címek formájában tudsz használni ha azok már elérhetőek valahogy az interneten keresztül. Újakat feltölteni ezen az alkalmazáson keresztül nem tudsz, ahhoz egy digitális eszközkezelőt ajánlok vagy egy már létező 
  nyílvános adattárat mint például egy Wordpress oldal kép kollekcióját.`;
  if (routePath === "/sushi")
    return `Tudtad, hogy mobil eszközökön is teljesen responzív az alkalmazás? A Drag'n'Drop funkciót annyira nem ajánlom mobilon de az összes többit ugyanúgy el tudod intézni kis kijelzőn is érintőképernyővel.`;
  if (routePath === "/cocktail")
    return `Ha kijelölsz egy elemet, akkor a jobb oldali vezérlő gombokkal be tudsz neki állítani egy saját háttér vagy fejléc színt. A háttér csak kártya alapú sablonokon értelmezett mint amilyen ez is, a többin mindig atlátszó színt fog használni.
  De ettől még emlékezni fog a beállításokra, hiszen bármikor átállíthatod az aktuális sablont egy másikra.`;
  if (routePath === "/wine")
    return `Ha egy kategória fejléc színét változtatod meg akkor azzal együtt az összes gyerek elemének a színét is megváltoztatod, hogy ne kelljen egyesével beállítanod mindegyiket. Ezt felül tudja írni egy lejjebb szereplő elem saját színbeállítása.`;
  if (routePath === "/weekly")
    return `Ez lényegében a "Playground" oldal. Semmiben sem különbözik a többi oldaltól, csak egy üres listát jelenít meg, hogy kevésbé legyen ijesztő beleírni, árírni, átmozgatni vagy elmenteni az adatbázisba. A reset gombbal úgyis mindegyik menüt vissza lehet állítani 
  adatbázis szinten az alap beállításokra. A Discard gomb hasonló, de mentés nélkül dobja el az eddigi változásokat és így gyorsabb is.<br/><br/>
  Az elmentett menü és a hozzá tartozó információk egyébként egy egyszerű szöveges JSON adatformában szerepelnek egy SQLite adatbázisban.`;
  if (routePath === "/contact")
    return `Hallottad a Kapcsolat oldalt! Én is csak ugyanazt tudom itt elismételni, látogass el a <a href="https://fabokarpad.hu" rel="noopener noreferrer" target="_blank">fabokarpad.hu</a> oldalra, ahol megnézheted az összes általam készített webes munkámat.`;
  if (routePath === "/login")
    return `Emlékeztetés képpen: a jelszó a <a href="https://fabokarpad.hu" rel="noopener noreferrer" target="_blank">fabokarpad.hu</a> oldalon található. Ez a belépés nem igazi webes "session", 
  ha nyomsz egy frissítést akkor újra be kell jelentkezned! Menük szerkesztéséhez nem is nagyon kell ennél robusztusabb megoldás.`;

  return `Ó helló! Látom megtaláltad a 404-es oldalt. Ha nem szándékosan kerested akkor javaslom a navigációs gombok használatát a fejlécben. Ha azokkal kerültél ide akkor valamit eltörhettem és jó volna ha tudnál írni egy emailt hogy ki tudjam javítani.
  Egyébként helyezd magad kényelembe.`;
}
