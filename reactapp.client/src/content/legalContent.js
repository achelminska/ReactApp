// Treści dokumentów prawnych (projekt demonstracyjny) w trzech językach.
// Struktura: [język][dokument] = { title, updated, intro, sections: [{ heading, body }] }

export const legalContent = {
    pl: {
        terms: {
            title: 'Regulamin serwisu',
            updated: 'Ostatnia aktualizacja: 1 lipca 2026',
            intro: 'Niniejszy regulamin określa zasady korzystania z serwisu internetowego CinemaBox, w tym rezerwacji i zakupu biletów online. CinemaBox jest projektem demonstracyjnym — płatności są symulowane, a rezerwacje nie uprawniają do udziału w rzeczywistych seansach.',
            sections: [
                {
                    heading: '1. Postanowienia ogólne',
                    body: 'Serwis CinemaBox umożliwia przeglądanie repertuaru kin, rezerwację miejsc na seanse oraz zakładanie kont użytkowników. Korzystanie z serwisu jest bezpłatne i oznacza akceptację niniejszego regulaminu. Operatorem serwisu jest CinemaBox Poland (podmiot fikcyjny na potrzeby projektu).',
                },
                {
                    heading: '2. Konto użytkownika',
                    body: 'Założenie konta wymaga podania adresu e-mail oraz hasła spełniającego wymogi bezpieczeństwa (min. 8 znaków, wielka i mała litera, cyfra). Użytkownik odpowiada za zachowanie poufności swoich danych logowania. Konto można w każdej chwili usunąć, kontaktując się z Biurem Obsługi Klienta.',
                },
                {
                    heading: '3. Rezerwacja i zakup biletów',
                    body: 'Rezerwacja miejsc odbywa się poprzez wybór seansu, miejsc na sali oraz typów biletów. Do każdej rezerwacji doliczana jest opłata serwisowa widoczna przed potwierdzeniem zamówienia. Płatności w serwisie są symulowane — żadne środki nie są pobierane, a potwierdzenie rezerwacji ma charakter poglądowy.',
                },
                {
                    heading: '4. Zwroty i reklamacje',
                    body: 'Rezerwację można anulować najpóźniej 30 minut przed rozpoczęciem seansu. Reklamacje dotyczące działania serwisu można zgłaszać przez formularz kontaktowy lub na adres bok@cinemabox.pl. Odpowiadamy w dni robocze w ciągu 48 godzin.',
                },
                {
                    heading: '5. Odpowiedzialność',
                    body: 'Dokładamy starań, aby repertuar i ceny prezentowane w serwisie były aktualne, jednak zastrzegamy możliwość zmian godzin seansów oraz odwołania pokazów z przyczyn niezależnych. Serwis nie ponosi odpowiedzialności za przerwy w działaniu wynikające z prac technicznych.',
                },
                {
                    heading: '6. Postanowienia końcowe',
                    body: 'Regulamin może ulec zmianie — o istotnych zmianach informujemy w serwisie z wyprzedzeniem. W sprawach nieuregulowanych zastosowanie mają przepisy prawa polskiego.',
                },
            ],
        },
        privacy: {
            title: 'Polityka prywatności',
            updated: 'Ostatnia aktualizacja: 1 lipca 2026',
            intro: 'Prywatność użytkowników CinemaBox jest dla nas priorytetem. Poniżej wyjaśniamy, jakie dane zbieramy, w jakim celu i jakie prawa przysługują użytkownikom. Serwis jest projektem demonstracyjnym — dane nie są wykorzystywane komercyjnie.',
            sections: [
                {
                    heading: '1. Administrator danych',
                    body: 'Administratorem danych osobowych jest CinemaBox Poland (podmiot fikcyjny na potrzeby projektu demonstracyjnego). Kontakt w sprawach danych osobowych: bok@cinemabox.pl.',
                },
                {
                    heading: '2. Jakie dane zbieramy',
                    body: 'Podczas rejestracji zbieramy adres e-mail i opcjonalnie miasto. Podczas rezerwacji — imię, nazwisko, adres e-mail i opcjonalnie numer telefonu. Automatycznie zapisujemy również preferencje językowe oraz wybrane miasto w pamięci przeglądarki (localStorage).',
                },
                {
                    heading: '3. Cel przetwarzania',
                    body: 'Dane wykorzystujemy wyłącznie do obsługi kont użytkowników, realizacji rezerwacji, odpowiadania na zapytania przesłane formularzem kontaktowym oraz zapamiętywania preferencji. Nie profilujemy użytkowników i nie przekazujemy danych podmiotom trzecim.',
                },
                {
                    heading: '4. Okres przechowywania',
                    body: 'Dane konta przechowujemy do momentu jego usunięcia. Dane rezerwacji przechowujemy przez okres wymagany do celów rozliczeniowych. Wiadomości z formularza kontaktowego usuwamy po zamknięciu zgłoszenia.',
                },
                {
                    heading: '5. Prawa użytkownika',
                    body: 'Każdemu użytkownikowi przysługuje prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania oraz przenoszenia. Żądania można zgłaszać na adres bok@cinemabox.pl — realizujemy je niezwłocznie, nie później niż w ciągu 30 dni.',
                },
                {
                    heading: '6. Bezpieczeństwo',
                    body: 'Hasła przechowujemy wyłącznie w postaci zaszyfrowanej (hash). Komunikacja z serwisem odbywa się przez połączenie szyfrowane HTTPS. Dostęp do danych mają wyłącznie uprawnione osoby.',
                },
            ],
        },
        cookies: {
            title: 'Polityka cookies',
            updated: 'Ostatnia aktualizacja: 1 lipca 2026',
            intro: 'Serwis CinemaBox korzysta z niewielkiej liczby plików cookies i mechanizmów pamięci przeglądarki, wyłącznie w celu zapewnienia poprawnego działania serwisu. Nie używamy cookies reklamowych ani śledzących.',
            sections: [
                {
                    heading: '1. Czym są cookies',
                    body: 'Cookies to małe pliki tekstowe zapisywane na urządzeniu użytkownika przez przeglądarkę. Pozwalają zapamiętać ustawienia i utrzymać sesję zalogowanego użytkownika między wizytami.',
                },
                {
                    heading: '2. Z czego korzystamy',
                    body: 'Serwis wykorzystuje pamięć przeglądarki (localStorage i sessionStorage) do przechowywania: tokenu logowania (sesja użytkownika), wybranego języka interfejsu oraz preferowanego miasta. Dane te nie opuszczają urządzenia użytkownika poza koniecznością uwierzytelnienia żądań.',
                },
                {
                    heading: '3. Cookies podmiotów trzecich',
                    body: 'Nie osadzamy skryptów reklamowych, analitycznych ani wtyczek społecznościowych, które zapisywałyby własne cookies. Czcionki ładowane są z Google Fonts — dostawca może rejestrować standardowe dane techniczne żądania.',
                },
                {
                    heading: '4. Zarządzanie cookies',
                    body: 'Użytkownik może w każdej chwili usunąć zapisane dane przez ustawienia przeglądarki (czyszczenie danych witryny). Usunięcie danych spowoduje wylogowanie oraz przywrócenie domyślnego języka i miasta.',
                },
            ],
        },
    },
    en: {
        terms: {
            title: 'Terms of Service',
            updated: 'Last updated: 1 July 2026',
            intro: 'These terms define the rules for using the CinemaBox website, including online ticket reservation and purchase. CinemaBox is a demonstration project — payments are simulated and reservations do not entitle you to attend real screenings.',
            sections: [
                {
                    heading: '1. General provisions',
                    body: 'CinemaBox lets you browse cinema listings, reserve seats for screenings and create user accounts. Using the service is free of charge and constitutes acceptance of these terms. The service is operated by CinemaBox Poland (a fictional entity created for this project).',
                },
                {
                    heading: '2. User account',
                    body: 'Creating an account requires an e-mail address and a password meeting the security requirements (min. 8 characters, upper and lower case letter, digit). Users are responsible for keeping their login credentials confidential. An account can be deleted at any time by contacting Customer Service.',
                },
                {
                    heading: '3. Reservation and ticket purchase',
                    body: 'Seats are reserved by selecting a screening, seats in the hall and ticket types. A service fee, shown before the order is confirmed, is added to every reservation. Payments are simulated — no funds are charged and the booking confirmation is illustrative only.',
                },
                {
                    heading: '4. Refunds and complaints',
                    body: 'A reservation can be cancelled no later than 30 minutes before the screening starts. Complaints about the service can be submitted via the contact form or to bok@cinemabox.pl. We respond within 48 hours on business days.',
                },
                {
                    heading: '5. Liability',
                    body: 'We make every effort to keep listings and prices up to date, but screening times may change and shows may be cancelled for reasons beyond our control. The service is not liable for downtime caused by maintenance work.',
                },
                {
                    heading: '6. Final provisions',
                    body: 'These terms may change — we announce significant changes in advance on the website. Matters not covered here are governed by Polish law.',
                },
            ],
        },
        privacy: {
            title: 'Privacy Policy',
            updated: 'Last updated: 1 July 2026',
            intro: 'The privacy of CinemaBox users is our priority. Below we explain what data we collect, why, and what rights users have. The service is a demonstration project — data is not used commercially.',
            sections: [
                {
                    heading: '1. Data controller',
                    body: 'The controller of personal data is CinemaBox Poland (a fictional entity created for this demonstration project). Contact for data matters: bok@cinemabox.pl.',
                },
                {
                    heading: '2. What data we collect',
                    body: 'During registration we collect an e-mail address and, optionally, a city. During booking — first name, last name, e-mail address and optionally a phone number. We also store language preferences and the selected city in browser storage (localStorage).',
                },
                {
                    heading: '3. Purpose of processing',
                    body: 'We use data solely to manage user accounts, process reservations, respond to contact form enquiries and remember preferences. We do not profile users and do not share data with third parties.',
                },
                {
                    heading: '4. Retention period',
                    body: 'Account data is stored until the account is deleted. Booking data is kept for the period required for accounting purposes. Contact form messages are deleted once the enquiry is closed.',
                },
                {
                    heading: '5. User rights',
                    body: 'Every user has the right to access, rectify, delete, restrict the processing of and port their data. Requests can be sent to bok@cinemabox.pl — we handle them promptly, no later than within 30 days.',
                },
                {
                    heading: '6. Security',
                    body: 'Passwords are stored exclusively in encrypted (hashed) form. Communication with the service uses encrypted HTTPS connections. Only authorised persons have access to the data.',
                },
            ],
        },
        cookies: {
            title: 'Cookie Policy',
            updated: 'Last updated: 1 July 2026',
            intro: 'CinemaBox uses a small number of cookies and browser storage mechanisms, solely to ensure the service works correctly. We do not use advertising or tracking cookies.',
            sections: [
                {
                    heading: '1. What cookies are',
                    body: 'Cookies are small text files saved on the user\u2019s device by the browser. They allow settings to be remembered and keep a logged-in user\u2019s session alive between visits.',
                },
                {
                    heading: '2. What we use',
                    body: 'The service uses browser storage (localStorage and sessionStorage) to keep: the login token (user session), the selected interface language and the preferred city. This data does not leave the user\u2019s device except to authenticate requests.',
                },
                {
                    heading: '3. Third-party cookies',
                    body: 'We do not embed advertising or analytics scripts, or social plugins that would set their own cookies. Fonts are loaded from Google Fonts — the provider may log standard technical request data.',
                },
                {
                    heading: '4. Managing cookies',
                    body: 'Users can delete stored data at any time via browser settings (clearing site data). Deleting the data will log you out and restore the default language and city.',
                },
            ],
        },
    },
    nl: {
        terms: {
            title: 'Algemene voorwaarden',
            updated: 'Laatst bijgewerkt: 1 juli 2026',
            intro: 'Deze voorwaarden bepalen de regels voor het gebruik van de CinemaBox-website, inclusief het online reserveren en kopen van tickets. CinemaBox is een demonstratieproject — betalingen worden gesimuleerd en reserveringen geven geen recht op toegang tot echte voorstellingen.',
            sections: [
                {
                    heading: '1. Algemene bepalingen',
                    body: 'Met CinemaBox kun je het bioscoopprogramma bekijken, stoelen reserveren en een gebruikersaccount aanmaken. Het gebruik van de dienst is gratis en houdt aanvaarding van deze voorwaarden in. De dienst wordt beheerd door CinemaBox Poland (een fictieve entiteit voor dit project).',
                },
                {
                    heading: '2. Gebruikersaccount',
                    body: 'Voor het aanmaken van een account zijn een e-mailadres en een wachtwoord vereist dat aan de beveiligingseisen voldoet (min. 8 tekens, hoofdletter, kleine letter en cijfer). Gebruikers zijn verantwoordelijk voor de vertrouwelijkheid van hun inloggegevens. Een account kan op elk moment worden verwijderd via de klantenservice.',
                },
                {
                    heading: '3. Reserveren en tickets kopen',
                    body: 'Stoelen reserveer je door een voorstelling, stoelen in de zaal en tickettypes te kiezen. Bij elke reservering komt een servicetoeslag die vóór bevestiging van de bestelling zichtbaar is. Betalingen worden gesimuleerd — er wordt geen geld afgeschreven en de boekingsbevestiging is louter illustratief.',
                },
                {
                    heading: '4. Terugbetalingen en klachten',
                    body: 'Een reservering kan tot uiterlijk 30 minuten voor aanvang van de voorstelling worden geannuleerd. Klachten over de dienst kunnen via het contactformulier of via bok@cinemabox.pl worden ingediend. Wij reageren op werkdagen binnen 48 uur.',
                },
                {
                    heading: '5. Aansprakelijkheid',
                    body: 'Wij doen ons best om het programma en de prijzen actueel te houden, maar aanvangstijden kunnen wijzigen en voorstellingen kunnen om externe redenen worden geannuleerd. De dienst is niet aansprakelijk voor onderbrekingen door onderhoudswerkzaamheden.',
                },
                {
                    heading: '6. Slotbepalingen',
                    body: 'Deze voorwaarden kunnen wijzigen — belangrijke wijzigingen kondigen we vooraf op de website aan. Op alles wat hier niet is geregeld, is het Poolse recht van toepassing.',
                },
            ],
        },
        privacy: {
            title: 'Privacybeleid',
            updated: 'Laatst bijgewerkt: 1 juli 2026',
            intro: 'De privacy van CinemaBox-gebruikers is onze prioriteit. Hieronder leggen we uit welke gegevens we verzamelen, waarom, en welke rechten gebruikers hebben. De dienst is een demonstratieproject — gegevens worden niet commercieel gebruikt.',
            sections: [
                {
                    heading: '1. Verwerkingsverantwoordelijke',
                    body: 'De verantwoordelijke voor de persoonsgegevens is CinemaBox Poland (een fictieve entiteit voor dit demonstratieproject). Contact voor gegevenskwesties: bok@cinemabox.pl.',
                },
                {
                    heading: '2. Welke gegevens we verzamelen',
                    body: 'Bij registratie verzamelen we een e-mailadres en optioneel een stad. Bij het boeken — voornaam, achternaam, e-mailadres en optioneel een telefoonnummer. Daarnaast bewaren we taalvoorkeuren en de gekozen stad in de browseropslag (localStorage).',
                },
                {
                    heading: '3. Doel van de verwerking',
                    body: 'We gebruiken gegevens uitsluitend voor het beheren van accounts, het verwerken van reserveringen, het beantwoorden van vragen via het contactformulier en het onthouden van voorkeuren. We profileren gebruikers niet en delen geen gegevens met derden.',
                },
                {
                    heading: '4. Bewaartermijn',
                    body: 'Accountgegevens bewaren we totdat het account wordt verwijderd. Boekingsgegevens bewaren we zolang dat voor administratieve doeleinden nodig is. Berichten uit het contactformulier verwijderen we na afhandeling van de vraag.',
                },
                {
                    heading: '5. Rechten van gebruikers',
                    body: 'Iedere gebruiker heeft recht op inzage, rectificatie, verwijdering, beperking van de verwerking en overdraagbaarheid van zijn gegevens. Verzoeken kunnen naar bok@cinemabox.pl — we handelen ze snel af, uiterlijk binnen 30 dagen.',
                },
                {
                    heading: '6. Beveiliging',
                    body: 'Wachtwoorden worden uitsluitend versleuteld (gehasht) opgeslagen. De communicatie met de dienst verloopt via versleutelde HTTPS-verbindingen. Alleen bevoegde personen hebben toegang tot de gegevens.',
                },
            ],
        },
        cookies: {
            title: 'Cookiebeleid',
            updated: 'Laatst bijgewerkt: 1 juli 2026',
            intro: 'CinemaBox gebruikt een klein aantal cookies en browseropslagmechanismen, uitsluitend om de dienst goed te laten werken. We gebruiken geen advertentie- of trackingcookies.',
            sections: [
                {
                    heading: '1. Wat cookies zijn',
                    body: 'Cookies zijn kleine tekstbestanden die de browser op het apparaat van de gebruiker opslaat. Ze onthouden instellingen en houden de sessie van een ingelogde gebruiker actief tussen bezoeken.',
                },
                {
                    heading: '2. Wat we gebruiken',
                    body: 'De dienst gebruikt browseropslag (localStorage en sessionStorage) voor: het inlogtoken (gebruikerssessie), de gekozen interfacetaal en de voorkeursstad. Deze gegevens verlaten het apparaat van de gebruiker niet, behalve voor het authenticeren van verzoeken.',
                },
                {
                    heading: '3. Cookies van derden',
                    body: 'We plaatsen geen advertentie- of analysescripts en geen sociale plug-ins die eigen cookies zouden instellen. Lettertypen worden geladen via Google Fonts — de aanbieder kan standaard technische verzoekgegevens registreren.',
                },
                {
                    heading: '4. Cookies beheren',
                    body: 'Gebruikers kunnen opgeslagen gegevens op elk moment verwijderen via de browserinstellingen (sitegegevens wissen). Hierdoor word je uitgelogd en worden de standaardtaal en -stad hersteld.',
                },
            ],
        },
    },
};
