import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Accordion, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/contactpage.scss';

const faqData = {
    "Repertuar": [
        {
            question: "Kiedy na stronie pojawi się repertuar?",
            answer: "Repertuar aktualizowany jest co tydzień. Pojawia się na naszej stronie we wtorek wieczorem lub w środę rano i obowiązuje na kolejny tydzień repertuarowy trwający od piątku do czwartku. W przypadku wcześniejszej przedsprzedaży na wybrane tytuły, w repertuarze mogą pojawić się seanse na daty wybiegające poza tydzień repertuarowy."
        },
        {
            question: "Jak długo film będzie dostępny w repertuarze?",
            answer: "Nie mamy z góry określonego czasu w jakim dana produkcja będzie znajdować się w repertuarze, jest to zależne m.in od popularności filmu oraz od ilości sal dostępnych w naszych kinach. Jeżeli w repertuarze dostępny jest wyłącznie jeden seans, to może oznaczać, że niebawem film zejdzie z naszych ekranów."
        },
        {
            question: "Gdzie mogę sprawdzić, jakie jest ograniczenie wiekowe dla wybranego filmu?",
            answer: "Ograniczenie wiekowe, o ile zostało określone przez dystrybutora, znajduje się na stronie z opisem filmu."
        },
        {
            question: "Czy mogę zabrać ze sobą dziecko na seans, jeżeli jest młodsze, niż wskazuje na to ograniczenie wiekowe?",
            answer: "Rodzice i opiekunowie prawni ponoszą pełną odpowiedzialność za treści, z którymi podczas seansu spotka się młody widz."
        },
        {
            question: "Czy godzina podana w repertuarze jest godziną rozpoczęcia seansu?",
            answer: "Godziny rozpoczęcia seansów określone w repertuarze wskazują czas rozpoczęcia projekcji, której częścią jest blok reklam i zwiastunów filmowych, po zakończeniu którego rozpoczyna się emisja filmu."
        },
        {
            question: "Gdzie mogę sprawdzić, czy film jest z napisami czy z dubbingiem?",
            answer: "Informacje o dostępnych wersjach filmu znajdują się na stronie filmu oraz w repertuarze."
        },
        {
            question: "Dlaczego w moim kinie nie są wyświetlane wszystkie filmy?",
            answer: "Nieustannie staramy się dostosować repertuar do wymagań i oczekiwań naszych klientów, jednak jego finalny układ zależny jest od różnych czynników."
        },
        {
            question: "Dlaczego film, którego premiera wypada w piątek, jest wyświetlany już w środę?",
            answer: "Niektóre seanse, zgodnie z decyzją dystrybutora, mogą pojawić się w repertuarze przed dniem premiery, w ramach seansu przedpremierowego."
        },
        {
            question: "Czy seanse przedpremierowe różnią się od seansów wyświetlanych od dnia premiery?",
            answer: "Seanse wyświetlane w ramach przedpremiery nie różnią się od projekcji wyświetlanych od dnia premiery."
        },
        {
            question: "Gdzie znajdę informacje na temat seansów przedpremierowych?",
            answer: "Informacje o dostępnych oraz planowanych przedpremierach lub premierach filmu znajdują się na dole strony oraz mogą pojawić się na naszych kanałach social media."
        }
    ],
    "Bilety i Zwroty": {
        subcategories: {
            "Zakup biletów": [
                {
                    question: "W jaki sposób mogę dokonać zakupu biletu?",
                    answer: `Możesz dokonać zakupu biletu logując się na swoje konto online za pośrednictwem naszej strony internetowej lub aplikacji. 
                    Jeżeli nie posiadasz konta, zarejestruj się wcześniej na stronie. 
                    Możesz również dokonać zakupu bez rejestracji, jako Gość. 
                    Alternatywnie, możesz udać się do kina i zakupić bilet w kasie – pod warunkiem dostępności repertuaru oraz miejsc na wybrany seans.`
                },
                {
                    question: "Dokonałem zakupu biletów, gdzie mogę je znaleźć?",
                    answer: `Jeżeli transakcja została zakończona pomyślnie, bilety wraz z potwierdzeniem trafią na adres e-mail podany podczas zakupu. 
                    Możesz również zalogować się na swoje konto na naszej stronie internetowej lub w aplikacji mobilnej – w zakładce „Moje Bilety” znajdziesz zakupione bilety, 
                    które możesz okazać w kinie podczas kontroli.`
                },
                {
                    question: "Czy podczas kontroli biletów w kinie mogę okazać bilety na telefonie?",
                    answer: `Tak. Nie ma potrzeby drukowania biletów, możesz okazać je na smartfonie lub innym nośniku elektronicznym.`
                },
                {
                    question: "Nie mam ze sobą biletów internetowych. Czy istnieje możliwość uzyskania w kasie kopii biletów zakupionych online?",
                    answer: `Tak. Możesz poprosić Obsługę kina w barze kinowym o wydrukowanie zakupionych biletów, w tym celu przygotuj dane podane podczas rejestracji, w celu odnalezienia transakcji.`
                },
                {
                    question: "Czy mogę zarezerwować bilety?",
                    answer: `Zarówno w kinie jak i w witrynach możliwy jest wyłącznie zakup biletów, nie ma możliwości rezerwacji. Jeżeli planowane jest wyjście grupowe z placówki, możliwe jest dokonanie 
                    rezerwacji grupowej po kontakcie z Biurem Rezerwacji Grupowych. Dane kontaktowe dostępne są na naszej stronie internetowej w zakładce SZKOŁY.`
                },
                {
                    question: "Jak otrzymać fakturę za zakup biletów?",
                    answer: `Jeżeli dokonałeś zakupu biletów internetowych skontaktuj się z Biurem Obsługi Klienta na adres bok@cinema-city.pl w celu uzyskania faktury, podając dane do faktury oraz numer 
                    zamówienia. W celu otrzymania faktury za bilety zakupione w kinie zgłoś się do obsługi kina wraz z paragonem lub biletem w przypadku zakupu w biletomacie.`
                },
                {
                    question: "Gdzie znajdę cennik biletów?",
                    answer: `Cennik biletów można zweryfikować w kinie lub na naszej stronie internetowej. Należy wybrać ULUBIONE KINO, następnie na dole strony wejść w zakładkę O KINIE.`
                },
                {
                    question: "Czy okulary 3D są zwrotne?",
                    answer: `Nie, okulary 3D nie podlegają zwrotowi. Okulary 3D oraz 3D IMAX możesz zachować celem wykorzystania na kolejne seanse 3D w naszych kinach.`
                },
                {
                    question: "Czy okulary 3D są dostępne w mniejszej wersji dla dzieci?",
                    answer: `Tak. Okulary 3D dostępne są w dwóch wariantach: w wersji standardowej dla dorosłych lub w wersji mniejszej dla dzieci. `
                },

            ],
            "Zwrot biletów": [
                {
                    question: "Czy mogę zwrócić bilet?",
                    answer: "Bilety można zwrócić maksymalnie 2 godziny przed seansem."
                },
                {
                    question: "W jaki sposób mogę zwrócić bilet zakupiony online?",
                    answer: "Zaloguj się na swoje konto na stronie internetowej lub w aplikacji i dokonaj anulacji wybranych biletów. Pamiętaj, że zgodnie z regulaminem anulacja biletów możliwa jest do 2 godzin przed rozpoczęciem seansu. Po upływie tego czasu bilet nie podlega zwrotowi."
                },
                {
                    question: "Czy mogę zwrócić bilety zakupione z użyciem vouchera lub karty podarunkowej?",
                    answer: "Zgodnie z regulaminem, bilet zakupiony przy użyciu vouchera lub karty podarunkowej nie podlega zwrotowi."
                },
                {
                    question: "Czy mogę zwrócić bilety zakupione z użyciem vouchera lub karty podarunkowej?",
                    answer: "Zgodnie z regulaminem, bilet zakupiony przy użyciu vouchera lub karty podarunkowej nie podlega zwrotowi."
                },
                {
                    question: "Czy mogę anulować bilet na Maraton filmowy?",
                    answer: "Zgodnie z Regulaminem, nie podlegają zwrotowi bilety zakupione na pokazy specjalne, tj. maratony filmowe, Ladies Night, koncerty itp., które są oznaczone odpowiednio w repertuarze."
                },
                {
                    question: "Czy mogę anulować bilety na Ladies Night?",
                    answer: "Zgodnie z Regulaminem bilety zakupione na pokazy specjalne, tj. maratony filmowe, Ladies Night, koncerty itp., które są oznaczone odpowiednio w repertuarze nie podlegają zwrotowi."
                },
                {
                    question: "Czy mogę anulować bilety na wydarzenia specjalne?",
                    answer: "Zgodnie z Regulaminem bilety zakupione na pokazy specjalne, tj. maratony filmowe, Ladies Night, koncerty itp., które są oznaczone odpowiednio w repertuarze nie podlegają zwrotowi."
                }
            ],
            "Bilety zniżkowe": [
                {
                    question: "Komu przysługuje bilet ulgowy?",
                    answer: `Bilety ulgowe przysługują:
                    – dzieciom do 12. roku życia,  
                    – uczniom do ukończenia 19. roku życia (na podstawie ważnej legitymacji szkolnej),  
                    – studentom do ukończenia 26. roku życia (na podstawie ważnej legitymacji studenckiej),  
                    – seniorom od 60. roku życia,  
                    – weteranom wojennym (na podstawie stosownej legitymacji).

                    Podczas wizyty w kinie należy mieć przy sobie dokument potwierdzający prawo do zniżki i okazać go obsłudze – z wyjątkiem dzieci do 12. roku życia.`
                },
                {
                    question: "Komu przysługują bilety rodzinne?",
                    answer: `Bilety rodzinne przysługują rodzinom składającym się z maksymalnie dwóch osób dorosłych oraz co najmniej jednego dziecka poniżej 12 roku życia. Oferta ta pozwala dorosłym na zakup biletów w 
                    cenie biletów ulgowych, co czyni wizytę w kinie bardziej przystępną cenowo dla rodzin.`
                },
                {
                    question: "Do jakiego wieku dzieci mogą obejrzeć seans bez opłaty?",
                    answer: `Dzieci do ukończenia 3 roku życia upoważnione są do wstępu na seans nieodpłatnie pod nadzorem dorosłego opiekuna, pod warunkiem, iż nie będą one zajmować oddzielnego miejsca. Opiekun dziecka 
                    zobowiązany jest do posiadania dokumentu wskazującego na wiek dziecka i przedstawienia go obsłudze kina na ewentualną prośbę.`
                }
            ],
            "Seanse specjalne": [
                {
                    question: "Jak zakupić bilety na wydarzenie specjalne?",
                    answer: "Przejdź na stronę wydarzenia, które chcesz zobaczyć, i kup bilet tak, jak na zwykły film. Bilety na wydarzenia specjalne są zazwyczaj dostępne z dużym wyprzedzeniem, więc pamiętaj, aby zakupić miejsce wcześniej!"
                },
                {
                    question: "Czy członkowie Unlimited otrzymują zniżkę na wydarzenia specjalne?",
                    answer: `Niektóre wydarzenia specjalne mogą być wyłączone z opcji Unlimited. Klienci Unlimited mogą jednak otrzymać zniżkę lub darmowy bilet na wybrane pokazy w ramach abonamentu. Szczegóły można znaleźć w cenniku wydarzeń 
                    dostępnym na stronie podczas zakupu biletów lub w kasie kina.`
                },
                {
                    question: "Czy przed seansami specjalnymi wyświetlany jest blok reklamowy?",
                    answer: `Podczas wydarzeń mogą być wyświetlane reklamy i zwiastuny, jednak ich czas trwania może być skrócony lub mogą one zostać pominięte. Dlatego zalecamy przybycie na seans zgodnie z godziną wskazaną na bilecie, aby nie przegapić jego rozpoczęcia.`
                },
                {
                    question: "Czy są jakieś przerwy podczas seansów specjalnych?",
                    answer: `Z reguły nie ma przerwy w trakcie wydarzenia, jednak o szczegóły możesz zapytać w kinie.`
                },
                {
                    question: "Czy na wydarzenia obowiązuje specjalna polityka cenowa?",
                    answer: `Cena biletów na wydarzenia może różnić się od standardowej. Na niektóre wydarzenia może być dostępny tylko jeden rodzaj biletu. Szczegóły należy sprawdzić w cenniku wydarzenia dostępnym na stronie podczas zakupu biletów.`
                }
            ]
        }
    },
    "Konto online i Aplikacja mobilna": [
        {
            question: "Jakie dane są potrzebne podczas rejestracji konta online?",
            answer: "Konto online może założyć osoba, która ukończyła 16 lat. W celu rejestracji konta online należy podać imię, nazwisko, adres e-mail oraz opcjonalnie numer telefonu."
        },
        {
            question: "Jak mogę zmienić adres e-mail przypisany do konta?",
            answer: `Zmiany adresu e-mail możesz dokonać logując się na swoje konto online za pośrednictwem strony internetowej lub aplikacji. W zakładce Mój Profil dokonaj zmiany adresu e-mail. Pamiętaj, że zmiana może zostać dokonana wyłącznie na adres e-mail, 
            który nie jest zarejestrowany w naszej bazie, tzn.że wcześniej nie dokonano rejestracji konta My Cinema City z użyciem tego adresu e- mail.`
        },
        {
            question: "W jaki sposób mogę zmienić dane osobowe na moim koncie?",
            answer: `Nie masz możliwości edycji danych na koncie online, poza adresem e-mail i numerem telefonu. Pozostałe dane nie podlegają edycji.`
        },
        {
            question: "Jak mogę wycofać zgody marketingowe?",
            answer: `Zaloguj się na swoje konto online za pośrednictwem strony internetowej lub aplikacji i w zakładce Konto odznacz wybrane zgody. Pamiętaj, że jeżeli nie wyrazisz zgody marketingowej, nie będziesz mógł otrzymywać informacji o akcjach marketingowych orgaznizowanych przez Cinema City.`
        },
        {
            question: "Moja aplikacja mobilna nie działa poprawnie, co powinienem zrobić?",
            answer: `Prześlij nam zgłoszenie przez aplikację, używając przycisku ‘Prześlij opinię’, który znajduje się w zależności od systemu: na iOS w zakładce Konto, a na Androidzie w zakładce Informacje i Ustawienia.`
        },
        {
            question: "Mam problem z logowaniem do konta",
            answer: `Jeśli wprowadzone przez Ciebie hasło nie jest prawidłowe lub nie pamiętasz hasła do swojego konta, możesz je odzyskać za pomocą przycisku "Zapomniałeś hasła?". Jeżeli zmiana hasła nie pomogła, w celu weryfikacji problemu skontaktuj się z naszym Biurem Obsługi Klienta pod adresem bok@cinema-city.pl.`
        },
        {
            question: "Chcę zweryfikować swoje konto, ale na podany adres e-mail nie przychodzi żaden link aktywacyjny",
            answer: `W celu weryfikacji problemu skontaktuj się z naszym Biurem Obsługi Klienta pod adresem bok@cinema-city.pl.`
        },
        {
            question: "Jak mogę usunąć moje konto online?",
            answer: `Usunięcie konta My Cinema City możliwe jest za pośrednictwem naszej aplikacji mobilnej, w zakładce Konto, na samym dole strony należy wybrać przycisk Zamknij moje konto oraz potwierdzić chęć usunięcia. Zgłoszenie dotyczące usunięcia konta można przesłać również na adres iod@cinema-city.pl.`
        }
    ],
    "Formaty specjalne": {
        subcategories: {
            "IMAX": [
                {
                    question: "Co to jest IMAX?",
                    answer: `IMAX to zaawansowany system kinowy, który oferuje wyjątkowe doświadczenia wizualne i dźwiękowe. Ta pionierska technologia charakteryzuje się krystalicznym obrazem o najwyższej rozdzielczości, wyraźniejszym kontrastem i głębszym nasyceniem koloru.
                    Niekonwencjonalna wielkość ekranu „otwiera oczy” na doznania niespotykane w innych salach kinowych, dzięki czemu odbiór największych hollywoodzkich hitów filmowych staje się kompleksowo doskonalszy.Rewolucyjne zastosowanie dwóch obiektywów w cyfrowych projektorach kinowych IMAX sprawia, że obraz 3D jest
                    jaśniejszy, ostrzejszy i bardziej komfortowy dla oka.Okulary są większe, wygodniejsze oraz bardziej wytrzymałe.Jedyne w swoim rodzaju wrażenia podczas seansu zapewniają również: amfiteatralny układ sali, najwyższej klasy fotele i majestatyczna jakość dźwięku.Wyłącznym operatorem „niezapomnianych doświadczeń IMAX” w Polsce jest firma Cinema City.`
                },
                {
                    question: "W których kinach znajdują się sale IMAX?",
                    answer: `W Polsce kina BNP Paribas IMAX® znajdziesz w:
                    - Cinema City Sadyba (Warszawa)
                    - Cinema City Poznań Plaza (Poznań)
                    - Cinema City Punkt 44 (Katowice)
                    - Cinema City Manufaktura (Łódź) (IMAX with Laser)
                    - Cinema City Wroclavia (Wrocław)
                    - Cinema City Zakopianka (Kraków) (IMAX with Laser)`
                },
                {
                    question: "Co to jest IMAX with Laser?",
                    answer: `IMAX with Laser wyróżnia się laserowym systemem projekcji 4K z nowym silnikiem optycznym i zestawem autorskich technologii IMAX, dzięki którym widzowie doświadczają krystalicznie czystego obrazu, zwiększonej rozdzielczości, wysokiego kontrastu, a także najbardziej wyrazistych i żywych kolorów, jakie kiedykolwiek można było zobaczyć 
                    na ekranie. Filmy w technologii laserowej IMAX® obejrzysz w Cinema City Zakopianka oraz w Cinema City Manufaktura.

                    Dzięki IMAX with Laser widzowie mogą zaznać: 

                    Krystalicznie czystej projekcji laserowej IMAX: zwiększona rozdzielczość, ostrzejszy i jaśniejszy obraz, wysoki kontrast, a także szeroka gama kolorystyczna dostępna dla twórców filmowych, które zapewniają najbardziej realistyczne efekty wizualne.
                    Precyzyjnego dźwięku IMAX nowej generacji: opatentowana technologia dźwięku zapewnia uderzającą czystość i głębię wraz z perfekcyjnie dostrojonym brzmieniem i równomiernie rozłożonym dźwiękiem w całej sali kinowej.
                    Pełnowymiarowej immersji IMAX: specjalnie zaprojektowana sala kinowa z wyraźnymi punktami widokowymi z każdego fotela oraz unikatowy ekran gwarantujący maksymalną jasność obrazu. `
                },
                {
                    question: "Czy za seanse IMAX pobierana jest dodatkowa opłata?",
                    answer: `Na seanse IMAX cena biletu będzie nieco wyższa niż na seans standardowy. Wszystkie ceny można znaleźć na stronie internetowej lokalnego kina.

                    W przypadku karty Unlimited obowiązuje dopłata 7zł do biletu.`
                },
                {
                    question: "Czy posiadając standardowe okulary 3D mogę wykorzystać je na seans IMAX 3D?",
                    answer: `Okulary IMAX 3D i standardowe 3D różnią się od siebie. Użycie niewłaściwych okularów w stosunku do wyświetlanego obrazu i technologii uniemożliwią prawidłowy odbiór filmu.`
                },
                {
                    question: "Czy mogę dokupić same okulary 3D IMAX?",
                    answer: `Tak, w kinowym barze można dokupić same okulary 3D oraz w kinach z salami IMAX również okulary 3D IMAX.`
                }
            ],
            "4DX": [
                {
                    question: "Co to jest 4DX?",
                    answer: `Sala 4DX® to miejsce, w którym filmowa fikcja dosłownie staje się rzeczywistością. Rewolucyjna technologia 4DX® jest pierwszą na świecie, która umożliwia projekcję największych, hollywoodzkich produkcji filmowych w formacie 4D. Dzięki ruchomym fotelom i zaawansowanym rozwiązaniom środowiskowym oferuje absolutne, pełne efektów specjalnych 
                    kinowe przeżycie, w którym widz staje się częścią filmu.

                    Oto kilka kluczowych cech 4DX:

                    Ruchome fotele: fotele w kinach 4DX poruszają się, wibrują i przechylają, aby zsynchronizować się z akcją na ekranie
                    Efekty świetlne: przeszywające ciemność błyski piorunów, eksplozje, lasery jeźdźców apokalipsy emitowane przez stroboskop
                    Efekty zapachowe: maszyny zapachowe uwalniają różne aromaty, które odpowiadają środowisku przedstawionemu w filmie, od świeżo palonej kawy do wrażenia opadającego pyłu eksplozji
                    Efekty wiatru: za pomocą systemu nawiewu powietrze muskające twarz, plecy i nogi pozwala odczuć delikatny wiatr, świst pocisków, aż po potęgę huraganu
                    Efekty wodne: za pomocą wodnych dysz można doświadczyć efektu opadającej mgły, lekkiej mżawki, a nawet intensywnej ulewy

                    OSTRZEŻENIE: W trosce o Państwa komfort i bezpieczeństwo, prosimy o zastosowanie się do poniższych instrukcji:

                    Nie zaleca się korzystania z foteli 4DX dzieciom do lat 4 lub o wzroście poniżej 100 cm, kobietom w ciąży, osobom niepełnosprawnym, widzom starszym, ze schorzeniami serca, kręgosłupa lub szyi, chorobą lokomocyjną, chorym na epilepsję lub wrażliwym na efekty występujące podczas seansu (gwałtowny ruch, jaskrawe światło, stroboskopy itp.).
                    Dzieci do lat 7 mogą korzystać z kina tylko pod opieką osób dorosłych.
                    Prosimy nie stawać na podnóżkach krzeseł oraz pozostać na swoich miejscach do końca projekcji filmu.`
                },
                {
                    question: "W których kinach znajdę salę 4DX?",
                    answer: `W Polsce sale 4DX® znajdziesz w kinach:
                    - Cinema City Arkadia (Warszawa)
                    - Cinema City Bonarka (Kraków)
                    - Cinema City Bydgoszcz
                    - Cinema City Manufaktura (Łódź)
                    - Cinema City Felicity (Lublin)
                    - Cinema City Wroclavia (Wrocław)`
                },
                {
                    question: "Czy fotele na sali 4DX posiadają jakieś ograniczenia?",
                    answer: `W trosce o Państwa komfort i bezpieczeństwo, prosimy o zastosowanie się do poniższych instrukcji.
                    Przed zakupem biletu proszę zapoznać się z następującym Ostrzeżeniem i Wytycznymi Bezpieczeństwa 4DX:
                    4DX to system generowania ruchu, powietrza, wody i zapachów wbudowany w specjalne siedzenia. Ruchome siedzenia 4DX wykorzystują silne ruchy, znaczne wibracje, silne oświetlenie stroboskopowe oraz specjalne efekty fizyczne, które mogą spowodować ryzyko obrażeń ciała w trakcie projekcji 4DX w przypadku nieprzestrzegania Ostrzeżenia i Wytycznych Bezpieczeństwa.
                    Dokonując zakupu biletu i wchodząc do sali 4DX potwierdzają Państwo, że w pełni rozumieją, zastosują się i będą przestrzegać Ostrzeżenia i Wytycznych Bezpieczeństwa. Wchodzą Państwo na własne ryzyko, a Cinema City oraz 4DX nie ponoszą żadnej odpowiedzialności za jakiejkolwiek obrażenia ciała lub szkody poniesione w wyniku oglądania prezentacji w kinie wyposażonym
                    w ruchome siedzenia 4DX, z wyjątkiem przypadków wynikających z zaniedbania. Na wszystkie filmy wyświetlane w Sali 4DX obowiązuje osobna polityka cenowa zgodna z cennikiem dostępnym w kasach biletowych oraz na stronie internetowej www.cinema-city.pl. Uprzejmie informujemy, że na filmy wyświetlane na sali 4DX nie obowiązują zniżki programów partnerskich.

                    Ostrzeżenie bezpieczeństwa:
                    - Siedzenia 4DX mogą być niebezpieczne dla kobiet w ciąży, osób z wysokim ciśnieniem krwi, schorzeniami serca, dla osób starszych, niepełnosprawnych, osób ze schorzeniami kręgosłupa, głowy lub szyi, osób cierpiących na epilepsję lub osób z innymi schorzeniami lub osób słabych lub nerwowych. Te osoby nie powinny również korzystać z siedzeń 4DX bez uzyskania zgody lekarza.
                    - Siedzenia 4DX mogą powodować utratę równowagi, bóle głowy lub mdłości oraz w szczególnych przypadkach symptomy podobne do epilepsji.
                    - Siedzenia 4DX nie są odpowiednie dla niemowląt lub małych dzieci i nie mogą być używane przez dzieci poniżej 4 roku życia. Siedzenie na kolanach jest zabronione. Dzieci w wieku od 4 do 7 lat mogą korzystać z siedzeń 4DX pod opieką dorosłych. Zabrania się korzystania z podkładek na siedzeniach 4DX.

                    Wytyczne bezpieczeństwa:
                    - Zawsze należy pozostawać we własnym fotelu w trakcie projekcji, o ile nie wychodzą Państwo z sali projekcyjnej. W przypadku jakiegokolwiek dyskomfortu lub potrzeby uzyskania pomocy proszę natychmiast zwrócić się do pracownika obsługi.
                    - Zabrania się zastawiania przejść lub przestrzeni pomiędzy siedzeniami przedmiotami osobistymi lub innymi przedmiotami. W żadnym przypadku nie można wkładać rąk ani nóg pomiędzy siedzenia.
                    - Zabrania się przynoszenia cennych przedmiotów do kina. W przeciwnym przypadku należy odpowiednio zabezpieczyć i chronić swoje rzeczy. Zabrania się stawania na podnóżkach i należy uważać, aby nie potknąć się lub przewrócić o podnóżek siadając na siedzeniu 4DX lub wstając z niego. Zabrania się przynoszenia kawy, herbaty oraz innych gorących napojów do sali projekcyjnej,
                      ponieważ mogą się rozlać. Zimne napoje należy trzymać w kubku z pokrywką i pić je wyłącznie podczas scen nie przedstawiających intensywnych ruchów.
                    - Każda osoba, która zostanie uznana za znajdującą się pod wpływem środków odurzających może zostać nie wpuszczona do sali projekcyjnej 4DX lub może zostać poproszona o bezzwłoczne opuszczenie sali projekcyjnej 4DX bez prawa do jakiegokolwiek zwrotu ceny biletu.
                    - Zabrania się noszenia lub proszę chronić delikatne ubranie, ponieważ 4DX wykorzystuje wentylatory, maszyny generujące bańki mydlane, stroboskopy oraz generatory dymu do tworzenia efektu wiatru, zapachu, baniek lub efektów wodnych.

                    Projekcje 4DX nie są odpowiednie dla:
                    - Osób cierpiących na wysokie ciśnienie krwi, schorzenia serca, schorzenia kręgosłupa, głowy lub szyi, epilepsję, lub         jakiegokolwiek innego rodzaju poważne schorzenia
                    - Osób starszych, niepełnosprawnych lub niewidomych
                    - Kobiet w ciąży
                    - Osób podatnych na chorobę lokomocyjną lub osób wrażliwych fizyczne lub umysłowo
                    - Osób pod wpływem środków odurzających
                    - Dzieci poniżej 4 roku życia (dzieci w wieku od 4 do 7 lat powinny być pod opieką osób dorosłych)
                    - Osób mających mniej niż 100 cm wzrostu
                    - Osób ważących ponad 120 kg`
                }
            ],
            "ScreenX": [
                {
                    question: "Co to jest ScreenX?",
                    answer: `ScreenX to innowacyjna technologia kinowa, która oferuje panoramiczny widok obrazu o kącie 270 stopni. Filmy są wyświetlane nie tylko na tradycyjnym ekranie przed widzami, ale także na bocznych ścianach sali kinowej, co tworzy bardziej immersyjne doświadczenie.
                    Dzięki rozszerzeniu projekcji na boczne ekrany, widzowie mogą poczuć się bardziej zanurzeni w świecie filmu.`
                },
                {
                    question: "W którym kinie znajdę salę ScreenX?",
                    answer: `W Polsce sale ScreenX znajdziesz w kinach:
                    - Cinema City Mokotów (Warszawa)
                    - Cinema City Korona (Wrocław)`
                },
                {
                    question: "Czy przez cały film w sali ScreenX obraz wyświetlany jest na wszystkich ekranach?",
                    answer: `Nie, na bocznych ekranach w technologii ScreenX film nie wyświetla się cały czas. Zazwyczaj obraz na bocznych ścianach wyświetla się w kluczowych momentach filmu, aby zwiększyć immersyjność i wrażenia wizualne. Główna akcja filmu nadal odbywa się na centralnym ekranie, a boczne ekrany rozszerzają sceny, dodając kontekst i otoczenie.`
                },
                {
                    question: "Czy za seanse ScreenX pobierana jest dodatkowa opłata?",
                    answer: `Na seanse ScreenX cena biletu będzie nieco wyższa niż na seans standardowy. Wszystkie ceny można znaleźć na stronie internetowej lokalnego kina.
                    W przypadku karty Unlimited obowiązuje dopłata 9zł do biletu.`
                }
            ],
            "VIP": [
                {
                    question: "Co to jest strefa VIP?",
                    answer: `Strefa VIP to niepowtarzalne miejsce, w którym łączą się nowoczesne technologie multimedialne z luksusowym lobby, otwartym barem i niepowtarzalnym klimatem kina. Strefa VIP oferuje szereg udogodnień, aby uczynić seans bardziej komfortowym i luksusowym. Oto kilka kluczowych cech VIP w Cinema City:
                    - Komfortowe fotele: W strefie VIP znajdują się w pełni zautomatyzowane, skórzane fotele, które można regulować, aby zapewnić maksymalny komfort.
                    - Mniejsze sale: Sale VIP mają mniejszą liczbę miejsc, co zapewnia bardziej kameralną widownię.
                    - Nielimitowane przekąski: W strefie VIP znajduje się otwarty bar z szerokim wyborem napojów i przekąsek. W cenie biletu VIP zawarte są nielimitowane przekąski kinowe, takie jak popcorn, nachosy oraz napoje zimne i ciepłe.
                    - Lobby idealne na spotkania biznesowe oraz odpoczynek z przyjaciółmi i rodziną.`
                },
                {
                    question: "W którym kinie znajdę strefę VIP?",
                    answer: `W Polsce strefę VIP znajdziesz w kinach:
                    - Cinema City Bonarka (Kraków)
                    -Cinema City Wroclavia (Wrocław)`
                },
                {
                    question: "Czy za seanse w strefie VIP pobierana jest dodatkowa opłata?",
                    answer: `Na seanse VIP cena biletu będzie wyższa niż na seans standardowy. Wszystkie ceny można znaleźć na stronie internetowej lokalnego kina.
                    W przypadku karty Unlimited obowiązuje dopłata 52,50zł do biletu.`
                },
                {
                    question: "Czy w strefie VIP mam możliwość korzystania z przekąsek kinowych bez limitu?",
                    answer: `W strefie VIP masz możliwość korzystania z przekąsek kinowych bez limitu, ale w określonym czasie. Możesz korzystać z oferty barowej strefy VIP na 15 minut przed rozpoczęciem seansu, na który masz zakupiony bilet, do 45 minut przed jego zakończeniem.`
                },
                {
                    question: "Jakie przekąski są dostępne w ramach oferty VIP?",
                    answer: `W ramach oferty dostępne są przekąski kinowe: popcorn, nachosy, napoje ciepłe (kawa, herbata) i zimne (różne rodzaje napojów gazowanych i niegazowanych).`
                }
            ],
        }

    },
    "Szkoły": {
        subcategories: {
            "Rezerwacja grupowa": [
                {
                    question: "Dla kogo jest bilet grupowy?",
                    answer: `Bilet grupowy w Cinema City przysługuje dzieciom i młodzieży uczącej się w przedszkolach i szkołach, grupom zorganizowanym z ośrodków kultury, świetlic środowiskowych, fundacji, domów dziecka, biur podróży itp. oraz grupom seniorów (w tym przypadku nie przysługują bezpłatne bilety dla opiekunów).`
                },
                {
                    question: "Komu nie proponujemy biletów grupowych?",
                    answer: `- Firmom (w przypadku tego typu wyjść zapraszamy do kontaktu mailowego pod adresem wynajem@cinema-city.pl lub voucher@cinema-city.pl)
                    - Osobom organizującym urodziny dla dzieci w kinie (w przypadku tego typu wyjść zapraszamy do kontaktu mailowego pod adresem urodziny@cinema-city.pl)
                    - Dużym rodzinom, grupom znajomych, studentom
                    - Uczestnikom wieczorów towarzyskich (kawalerskich/panieńskich) (w przypadku tego typu wyjść zapraszamy do kontaktu mailowego pod adresem wynajem@cinema-city.pl)`
                },
                {
                    question: "Czy opiekunowi przysługuje bezpłatny bilet?",
                    answer: `Tak, liczbę darmowych biletów dostosowujemy do wymagań formalnych grupy:
                    - Dzieci do lat 7 – 1 darmowy bilet na 5 uczestników
                    - Szkoły podstawowe – 1 darmowy bilet na 10 uczestników
                    - Szkoły ponadpodstawowe – 1 darmowy bilet na 15 uczestników
                    Jeśli grupa wymaga dodatkowej opieki prosimy o zgłoszenie tej informacji pracownikowi Biura Rezerwacji Grupowych, w takich przypadkach dostosowujemy liczbę biletów dla opiekuna do potrzeb grupy.`
                },
                {
                    question: "Jak zrobić rezerwację grupową?",
                    answer: `Rezerwacji można dokonać kontaktując się z pracownikiem Biura Rezerwacji Grupowych telefonicznie lub mailowo. Biuro Rezerwacji Grupowych czynne jest od poniedziałku do piątku w godz. od 9:00 do 15:00, w środy od 12:00 do 16:00. Dane kontaktowe znajdują się tutaj.`
                },
                {
                    question: "Czy rezerwację grupową trzeba zrobić z wyprzedzeniem?",
                    answer: `Tak, jest to najwygodniejsze rozwiązanie.
                    Rezerwacje grupowe przyjmujemy z wyprzedzeniem, również na odległe terminy. Jeśli jesteś zdecydowany skontaktuj się z nami, a nasz pracownik zaproponuje Ci odpowiedni film i przyjmie wstępną rezerwację na wskazany termin.
                    Jeśli jednak wybrałeś film z aktualnego repertuaru i jesteś zainteresowany rezerwacją grupową na krótką chwilę przed seansem to oczywiście nasz pracownik również przyjmie takie zamówienie.`
                },
                {
                    question: "Czy można dostosować godzinę seansu do potrzeb grupy?",
                    answer: `Tak, w tygodniu w godzinach porannych w miarę możliwości dostosowujemy godzinę seansu. Nasz pracownik przekaże wszystkie szczegóły podczas rezerwacji.`
                },
                {
                    question: "Czy można zamówić film, którego nie ma w repertuarze?",
                    answer: `Tak, w propozycjach dla grup szkolnych obecne są również filmy z potencjałem edukacyjnym dostępne tylko na zamówienie. Aktualną listę filmów na zamówienie można sprawdzić tutaj.
                    Jeśli nie ma tu filmu, który Cię interesuje skontaktuj się z naszym pracownikiem a on sprawdzi, czy jest możliwość zamówienia filmu.`
                },
                {
                    question: "Czy dostępna jest oferta przekąsek dla grup szkolnych?",
                    answer: `Tak, realizując szkolne wyjście grupowe uczniowie mogą skorzystać z oferty przekąsek przygotowanych specjalnie dla grup szkolnych. Są one możliwe do zakupu od poniedziałku do piątku do godziny 17:00. Szczegóły dostępne tutaj.`
                },
                {
                    question: "Czy za bilety grupowe można zapłacić przelewem?",
                    answer: `Tak, w celu realizacji płatności przelewowej prosimy o przekazanie tej informacji podczas dokonywania rezerwacji. Niezbędne będzie podanie danych płatnika takich, jak nazwa placówki, adres i nr NIP.`
                },
                {
                    question: "Czy seans grupowy można poszerzyć o edukację w kinie?",
                    answer: `Tak, posiadamy bogatą ofertę edukacyjną. Znajdują się w niej m.in. wideoprelekcje, projekty edukacyjne W Młodym Kinie oraz Filmowy Świat Dziecka, seanse IMAX® edukacyjnie czy Interaktywne Kino 4DX®.`
                },
                {
                    question: "Czym jest projekt edukacyjny W Młodym Kinie?",
                    answer: `Oferta Młodego Kina to ciekawe propozycje edukacji, które można łączyć z dowolnie wybranymi seansami filmowym. W ramach naszej oferty można skorzystać z nowoczesnych wideoprelekcji do wybranych tytułów lub spotkać się z edukatorem w sali kinowej. Zajęcia łączą praktyczną wiedzę 
                    z magią kina, oferując uczniom niezapomniane wrażenia i poszerzając ich wiedzę. Więcej informacji na ten temat znajduje się tutaj.`
                }

            ],
            "Klub nauczyciela": [
                {
                    question: "Kto może dołączyć do Klubu Nauczyciela?",
                    answer: `Do Klubu Nauczyciela Cinema City dołączyć może każdy kochający kino nauczyciel oraz opiekun pracujący w przedszkolu, szkolnictwie podstawowym, w szkołach średnich, w szkołach specjalnych oraz szkołach i uczelniach wyższych, a także pozostali specjaliści szkolnictwa i wychowawcy, którzy czynnie wykonują obowiązki w odpowiednich placówkach oświatowych.`
                },
                {
                    question: "Jak poprawnie wpisać numer telefonu placówki w formularzu rejestracyjnym?",
                    answer: `Numer telefonu placówki wpisz zgodnie ze wzorem: 00-0000000, takim samym zarówno dla numerów stacjonarnych, jak i komórkowych.`
                },
                {
                    question: "Zarejestrowałem/Zarejestrowałam się w Klubie Nauczyciela. Kiedy otrzymam kartę?",
                    answer: `Po rejestracji na Twój adres e-mail automatycznie powinna przyjść wiadomość z linkiem aktywacyjnym. Kliknięcie w niego potwierdza Twoje zgłoszenie. Po takim potwierdzeniu przygotowujemy dla Ciebie elektroniczną kartę zniżkową.  Wiadomość może znajdować się w innych folderach niż skrzynka odbiorcza, np. spam/oferty/społeczności. 
                    Elektroniczną kartę zniżkową wyślemy na adres mailowy podany w formularzu zgłoszeniowym w przeciągu 14 dni od poprawnego potwierdzenia rejestracji do Klubu Nauczyciela Cinema City.`
                },
                {
                    question: "Jak wygląda karta Klubu Nauczyciela?",
                    answer: `Obecnie, karty Klubu Nauczyciela obsługujemy w dwóch formach:
                    - Karta elektroniczna – w postaci numeru oraz kodu kreskowego wysyłanego na adres mailowy członka Klubu Nauczyciela;
                    - Karta fizyczna – imienna w postaci plastikowej. 
                    - Od 2020 roku karty zniżkowe są przygotowywane tylko w formie elektronicznej.`
                }
            ],
            
        }

    }
};

export default function ContactPage() {
    const [activeCategory, setActiveCategory] = useState('Repertuar');
    const [activeSubcategory, setActiveSubcategory] = useState(null);

    useEffect(() => {
        if (!Array.isArray(faqData[activeCategory])) {
            const firstSub = Object.keys(faqData[activeCategory].subcategories)[0];
            setActiveSubcategory(firstSub);
        }
    }, [activeCategory]);

    return (
        <div className="contact-page d-flex flex-column">
            <div className="flex-grow-1">
                <div className="section-with-line">
                    <div className="contact-header d-flex justify-content-between align-items-center px-5 py-3">
                        <img src="/image/logo2.png" alt="Logo" style={{ height: '50px' }} />
                        <div>
                            <Button variant="outline-light" className="me-2 btn-knowledge">Baza wiedzy</Button>
                            <Button
                                as={Link}
                                to="/kontakt/formularz"
                                className="contact-orange-button"
                            >
                                Skontaktuj się z nami
                            </Button>
                        </div>
                    </div>
                </div>

                <Container fluid className="contact-body">
                    <h2 className="text-white text-center mt-5">Cześć, jak możemy Ci pomóc?</h2>
                    <Row className="justify-content-center">
                        <Col md={8} className="my-4">
                            <Form.Control
                                type="text"
                                placeholder="Tutaj wprowadź wyszukiwany termin..."
                                className="search-input"
                            />
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col md={3} className="faq-sidebar">
                            {Object.keys(faqData).map(category => (
                                <div key={category}>
                                    <Button
                                        className={`w-100 mb-2 sidebar-btn ${category === activeCategory ? 'btn-warning' : 'btn-secondary'}`}
                                        onClick={() => {
                                            setActiveCategory(category);
                                            setActiveSubcategory(null);
                                        }}
                                    >
                                        {category}
                                    </Button>

                                    {category === activeCategory && !Array.isArray(faqData[category]) && (
                                        <div className="submenu bg-dark rounded p-2 mb-2">
                                            {Object.keys(faqData[category].subcategories).map((sub, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`text-white px-3 py-1 ${sub === activeSubcategory ? 'fw-bold' : ''}`}
                                                    role="button"
                                                    onClick={() => setActiveSubcategory(sub)}
                                                >
                                                    {sub}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </Col>

                        <Col md={9} className="faq-content">
                            {Array.isArray(faqData[activeCategory]) ? (
                                <Accordion defaultActiveKey="0" className="rounded-accordion">
                                    {faqData[activeCategory].map((item, index) => (
                                        <Accordion.Item eventKey={index.toString()} key={index}>
                                            <Accordion.Header>{item.question}</Accordion.Header>
                                            <Accordion.Body>
                                                {item.answer.split('\n').map((line, index) => (
                                                    <span key={index}>
                                                        {line}
                                                        <br />
                                                    </span>
                                                ))}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            ) : (
                                activeSubcategory && (
                                        <Accordion defaultActiveKey="0" className="rounded-accordion">
                                        {faqData[activeCategory].subcategories[activeSubcategory].map((item, index) => (
                                            <Accordion.Item eventKey={index.toString()} key={index}>
                                                <Accordion.Header>{item.question}</Accordion.Header>
                                                <Accordion.Body>
                                                    {item.answer.split('\n').map((line, idx) => (
                                                        <span key={idx}>
                                                            {line}
                                                            <br />
                                                        </span>
                                                    ))}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion>
                                )
                            )}
                        </Col>
                    </Row>

                    <Row className="mt-5 text-center">
                        <Col>
                            <h4 className="text-white">Nie możesz znaleźć tego, czego potrzebujesz?</h4>
                            <Link to="/kontakt/formularz" className="contact-orange-button mt-4">
                                Skontaktuj się z nami
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Footer />
        </div>
    );
}