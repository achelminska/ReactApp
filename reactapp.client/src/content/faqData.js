// Baza wiedzy w trzech językach. Struktura kategorii jest identyczna w każdym
// języku (ta sama kolejność), różnią się tylko nazwy i treści.

const pl = {
    "Repertuar": [
        {
            question: "Kiedy na stronie pojawi się repertuar?",
            answer: "Repertuar CinemaBox jest aktualizowany co tydzień. Nowe seanse pojawiają się we wtorek wieczorem lub w środę rano i obowiązują od piątku do czwartku."
        },
        {
            question: "Jak długo film będzie dostępny w repertuarze?",
            answer: "Czas wyświetlania filmu zależy od popularności produkcji oraz dostępności sal w kinach CinemaBox. Jeśli w repertuarze jest tylko jeden seans, film może wkrótce zejść z ekranów."
        },
        {
            question: "Gdzie sprawdzę ograniczenie wiekowe filmu?",
            answer: "Ograniczenie wiekowe znajduje się na stronie filmu w repertuarze oraz przy opisie seansu."
        },
        {
            question: "Czy godzina w repertuarze to czas rozpoczęcia seansu?",
            answer: "Tak. Godzina w repertuarze oznacza rozpoczęcie projekcji, której częścią jest blok reklam i zwiastunów."
        },
        {
            question: "Gdzie sprawdzę wersję językową filmu?",
            answer: "Informacje o wersji (napisy, dubbing, 2D/3D) znajdują się przy każdym seansie w repertuarze."
        }
    ],
    "Bilety i Zwroty": {
        subcategories: {
            "Zakup biletów": [
                {
                    question: "Jak kupić bilet online?",
                    answer: "Wybierz miasto, film i godzinę seansu w repertuarze, następnie wybierz miejsca, typ biletu i dokończ zamówienie. Płatność w tej wersji demonstracyjnej jest symulowana."
                },
                {
                    question: "Czy mogę zwrócić bilet?",
                    answer: "Zwrot biletu jest możliwy do 24 godzin przed seansem. Skontaktuj się z nami: bok@cinemabox.pl"
                },
                {
                    question: "Jak uzyskać fakturę?",
                    answer: "W celu uzyskania faktury napisz na bok@cinemabox.pl, podając numer rezerwacji i dane do faktury."
                }
            ],
            "Vouchery": [
                {
                    question: "Jak zrealizować voucher?",
                    answer: "Voucher można zrealizować online przy zakupie biletu lub w kasie kina. Wpisz kod vouchera w odpowiednim polu podczas zamówienia."
                },
                {
                    question: "Jaki jest termin ważności vouchera?",
                    answer: "Vouchery CinemaBox są ważne 12 miesięcy od daty zakupu, o ile regulamin promocji nie stanowi inaczej."
                }
            ]
        }
    },
    "Konto Online": [
        {
            question: "Jak założyć konto?",
            answer: "Kliknij Rejestracja w prawym górnym rogu strony, podaj e-mail i hasło. Konto pozwala na szybsze zakupy i podgląd historii rezerwacji."
        },
        {
            question: "Nie pamiętam hasła — co robić?",
            answer: "Skontaktuj się z Biurem Obsługi Klienta: bok@cinemabox.pl. W pełnej wersji serwisu dostępna będzie opcja resetu hasła."
        },
        {
            question: "Jak usunąć konto?",
            answer: "Aby usunąć konto, wyślij prośbę na adres iod@cinemabox.pl z adresu e-mail powiązanego z kontem."
        }
    ],
    "Kontakt": [
        {
            question: "Jak skontaktować się z CinemaBox?",
            answer: "Biuro Obsługi Klienta: bok@cinemabox.pl\nFormularz kontaktowy: /kontakt/formularz\nGodziny pracy: pon–pt 9:00–18:00"
        },
        {
            question: "Wynajem sali na event?",
            answer: "Zapytania o wynajem sali kieruj na: wynajem@cinemabox.pl"
        },
        {
            question: "Reklama w kinach CinemaBox?",
            answer: "Oferta reklamowa: reklama@cinemabox.pl"
        }
    ]
};

const en = {
    "Showtimes": [
        {
            question: "When are new showtimes published?",
            answer: "The CinemaBox programme is updated weekly. New showtimes appear on Tuesday evening or Wednesday morning and run from Friday to Thursday."
        },
        {
            question: "How long will a movie stay in the programme?",
            answer: "How long a movie is shown depends on its popularity and hall availability at CinemaBox cinemas. If only one showtime is left in the programme, the movie may leave the screens soon."
        },
        {
            question: "Where can I check a movie's age rating?",
            answer: "The age rating can be found on the movie's page in the programme and next to the showtime description."
        },
        {
            question: "Is the time in the programme the start of the screening?",
            answer: "Yes. The time in the programme marks the start of the screening, which includes a block of ads and trailers."
        },
        {
            question: "Where can I check the language version of a movie?",
            answer: "Information about the version (subtitles, dubbing, 2D/3D) is shown next to each showtime in the programme."
        }
    ],
    "Tickets & Refunds": {
        subcategories: {
            "Buying tickets": [
                {
                    question: "How do I buy a ticket online?",
                    answer: "Pick a city, movie and showtime in the programme, then choose your seats and ticket type and complete the order. Payment in this demo version is simulated."
                },
                {
                    question: "Can I return a ticket?",
                    answer: "Tickets can be returned up to 24 hours before the screening. Contact us at: bok@cinemabox.pl"
                },
                {
                    question: "How do I get an invoice?",
                    answer: "To receive an invoice, write to bok@cinemabox.pl with your booking number and invoice details."
                }
            ],
            "Vouchers": [
                {
                    question: "How do I redeem a voucher?",
                    answer: "Vouchers can be redeemed online when buying a ticket or at the cinema box office. Enter the voucher code in the relevant field during checkout."
                },
                {
                    question: "How long is a voucher valid?",
                    answer: "CinemaBox vouchers are valid for 12 months from the date of purchase, unless the promotion terms state otherwise."
                }
            ]
        }
    },
    "Online Account": [
        {
            question: "How do I create an account?",
            answer: "Click Sign up in the top right corner of the page and enter your e-mail and password. An account lets you buy faster and view your booking history."
        },
        {
            question: "I forgot my password — what should I do?",
            answer: "Contact Customer Service: bok@cinemabox.pl. A password reset option will be available in the full version of the site."
        },
        {
            question: "How do I delete my account?",
            answer: "To delete your account, send a request to iod@cinemabox.pl from the e-mail address linked to the account."
        }
    ],
    "Contact": [
        {
            question: "How can I contact CinemaBox?",
            answer: "Customer Service: bok@cinemabox.pl\nContact form: /kontakt/formularz\nOpening hours: Mon–Fri 9:00–18:00"
        },
        {
            question: "Renting a hall for an event?",
            answer: "For hall rental enquiries, write to: wynajem@cinemabox.pl"
        },
        {
            question: "Advertising in CinemaBox cinemas?",
            answer: "Advertising offer: reklama@cinemabox.pl"
        }
    ]
};

const nl = {
    "Programma": [
        {
            question: "Wanneer verschijnt het nieuwe programma op de site?",
            answer: "Het CinemaBox-programma wordt wekelijks bijgewerkt. Nieuwe voorstellingen verschijnen dinsdagavond of woensdagochtend en gelden van vrijdag tot en met donderdag."
        },
        {
            question: "Hoe lang blijft een film in het programma?",
            answer: "Hoe lang een film draait, hangt af van de populariteit en de beschikbaarheid van zalen in de CinemaBox-bioscopen. Staat er nog maar één voorstelling in het programma, dan verdwijnt de film mogelijk binnenkort van het scherm."
        },
        {
            question: "Waar vind ik de leeftijdsgrens van een film?",
            answer: "De leeftijdsgrens staat op de filmpagina in het programma en bij de beschrijving van de voorstelling."
        },
        {
            question: "Is de tijd in het programma de starttijd van de voorstelling?",
            answer: "Ja. De tijd in het programma is het begin van de vertoning, inclusief een blok reclames en trailers."
        },
        {
            question: "Waar vind ik de taalversie van een film?",
            answer: "Informatie over de versie (ondertiteling, nasynchronisatie, 2D/3D) staat bij elke voorstelling in het programma."
        }
    ],
    "Tickets & Retouren": {
        subcategories: {
            "Tickets kopen": [
                {
                    question: "Hoe koop ik online een ticket?",
                    answer: "Kies een stad, film en tijdstip in het programma, kies vervolgens je stoelen en tickettype en rond de bestelling af. De betaling in deze demoversie is gesimuleerd."
                },
                {
                    question: "Kan ik een ticket retourneren?",
                    answer: "Tickets kunnen tot 24 uur vóór de voorstelling worden geretourneerd. Neem contact met ons op: bok@cinemabox.pl"
                },
                {
                    question: "Hoe krijg ik een factuur?",
                    answer: "Voor een factuur schrijf je naar bok@cinemabox.pl met je reserveringsnummer en factuurgegevens."
                }
            ],
            "Vouchers": [
                {
                    question: "Hoe verzilver ik een voucher?",
                    answer: "Vouchers kun je online verzilveren bij het kopen van een ticket of aan de bioscoopkassa. Vul de vouchercode in het juiste veld in tijdens het bestellen."
                },
                {
                    question: "Hoe lang is een voucher geldig?",
                    answer: "CinemaBox-vouchers zijn 12 maanden geldig vanaf de aankoopdatum, tenzij de actievoorwaarden anders bepalen."
                }
            ]
        }
    },
    "Online Account": [
        {
            question: "Hoe maak ik een account aan?",
            answer: "Klik rechtsboven op Registreren en vul je e-mailadres en wachtwoord in. Met een account koop je sneller en zie je je reserveringsgeschiedenis."
        },
        {
            question: "Ik ben mijn wachtwoord vergeten — wat nu?",
            answer: "Neem contact op met de klantenservice: bok@cinemabox.pl. In de volledige versie van de site komt een optie om je wachtwoord te resetten."
        },
        {
            question: "Hoe verwijder ik mijn account?",
            answer: "Stuur een verzoek naar iod@cinemabox.pl vanaf het e-mailadres dat aan je account is gekoppeld."
        }
    ],
    "Contact": [
        {
            question: "Hoe neem ik contact op met CinemaBox?",
            answer: "Klantenservice: bok@cinemabox.pl\nContactformulier: /kontakt/formularz\nOpeningstijden: ma–vr 9:00–18:00"
        },
        {
            question: "Een zaal huren voor een evenement?",
            answer: "Vragen over zaalverhuur stuur je naar: wynajem@cinemabox.pl"
        },
        {
            question: "Adverteren in de CinemaBox-bioscopen?",
            answer: "Advertentieaanbod: reklama@cinemabox.pl"
        }
    ]
};

const faqData = { pl, en, nl };

export default faqData;
