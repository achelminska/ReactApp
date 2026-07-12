// Tłumaczenia opisów filmów (klucz = polski tytuł z bazy).
// W wersji produkcyjnej te treści powinny trafić do bazy jako kolumny wielojęzyczne;
// tu trzymamy je po stronie klienta, bo baza seedowana jest wyłącznie po polsku.

const descriptions = {
    "Księgowy 2": {
        en: "Christian Wolff is back. The brilliant accountant with extraordinary analytical and combat skills is drawn into an investigation of an old acquaintance's murder. To solve the puzzle, he will have to join forces with his brother and face a ruthless criminal network.",
        nl: "Christian Wolff is terug. De briljante accountant met buitengewone analytische en gevechtsvaardigheden raakt verwikkeld in een onderzoek naar de moord op een oude bekende. Om het raadsel op te lossen moet hij de krachten bundelen met zijn broer en het opnemen tegen een meedogenloos misdaadnetwerk."
    },
    "Legenda Ochi": {
        en: "On a remote island where people have feared mysterious creatures called ochi for generations, a young girl discovers a wounded baby. Defying every rule, she decides to take it home — a journey that will change her life and show that fear often comes from ignorance.",
        nl: "Op een afgelegen eiland waar mensen al generaties lang bang zijn voor mysterieuze wezens genaamd ochi, vindt een jong meisje een gewond jong. Tegen alle verboden in besluit ze het naar huis te brengen — een tocht die haar leven verandert en laat zien dat angst vaak uit onwetendheid voortkomt."
    },
    "Oszukać Przeznaczenie": {
        en: "A student haunted by nightmares discovers that her family has carried a dark mark for years. Death doesn't like it when someone slips through its fingers — and the bill for a life saved long ago is now being collected. The cult series returns in its most inventive instalment.",
        nl: "Een door nachtmerries geplaagde studente ontdekt dat haar familie al jaren een duister stempel draagt. De dood houdt er niet van als iemand hem ontglipt — en de rekening voor een ooit gered leven wordt nu vereffend. De cultreeks keert terug in zijn meest inventieve deel."
    },
    "Until Dawn": {
        en: "A group of friends searching for a missing sister ends up in a valley cut off from the world. Every night they die in gruesome ways — and every night they wake up to live the nightmare again. The only way out: survive until dawn.",
        nl: "Een groep vrienden op zoek naar een vermiste zus belandt in een van de wereld afgesloten vallei. Elke nacht sterven ze op gruwelijke wijze — en elke nacht worden ze weer wakker om de nachtmerrie opnieuw te beleven. De enige uitweg: overleven tot zonsopgang."
    },
    "Grzesznicy": {
        en: "Twin brothers return to their hometown in the South to start over. They quickly discover that the evil they fled has been waiting for their return. A gripping, bravura tale of music, community and a darkness that never sleeps.",
        nl: "Een tweeling keert terug naar hun geboortestadje in het Zuiden om opnieuw te beginnen. Al snel ontdekken ze dat het kwaad waarvoor ze vluchtten op hun terugkeer heeft gewacht. Een meeslepend, bravoureus verhaal over muziek, gemeenschap en een duisternis die nooit slaapt."
    },
    "Minecraft": {
        en: "Four outsiders are transported to the Overworld — a cube-shaped realm where imagination is the most powerful tool. To get home, they'll have to master the art of crafting and face an army of piglins. The film adaptation of the world's most popular game.",
        nl: "Vier buitenbeentjes worden overgebracht naar de Overworld — een blokkenwereld waar verbeelding het machtigste gereedschap is. Om thuis te komen moeten ze de kunst van het craften leren en het opnemen tegen een leger piglins. De verfilming van het populairste spel ter wereld."
    },
    "Mulholland Drive": {
        en: "After an accident on the titular street, a beautiful woman loses her memory. Together with an aspiring actress she tries to piece her identity back together, sinking into a dreamlike, unsettling Los Angeles. David Lynch's masterpiece back on the big screen.",
        nl: "Na een ongeluk op de gelijknamige weg verliest een mooie vrouw haar geheugen. Samen met een beginnende actrice probeert ze haar identiteit te reconstrueren en zakt daarbij weg in een dromerig, verontrustend Los Angeles. Het meesterwerk van David Lynch terug op het grote doek."
    },
    "Amator": {
        en: "Filip buys a camera to film his newborn daughter. The amateur hobby quickly turns into an obsession with documenting reality — bringing him up against censorship, the authorities and his own conscience. Krzysztof Kieślowski's classic in a restored version.",
        nl: "Filip koopt een camera om zijn pasgeboren dochter te filmen. De amateurpassie verandert al snel in een obsessie om de werkelijkheid vast te leggen — en brengt hem in botsing met censuur, de macht en zijn eigen geweten. De klassieker van Krzysztof Kieślowski in gerestaureerde versie."
    },
    "Fachowiec": {
        en: "Levon Cade, a former commando, leads a quiet life as a construction worker. When his boss's daughter vanishes without a trace, he returns to his old trade — and his skills become the kidnappers' worst nightmare. Jason Statham in high-octane action cinema.",
        nl: "Levon Cade, een voormalige commando, leidt een rustig leven als bouwvakker. Wanneer de dochter van zijn baas spoorloos verdwijnt, keert hij terug naar zijn oude vak — en zijn vaardigheden worden een nachtmerrie voor de ontvoerders. Jason Statham in actiecinema met een hoog octaangehalte."
    },
    "Thunderbolts": {
        en: "A group of antiheroes and outcasts is sent on a mission no one should return from alive. Forced to work together, they uncover a conspiracy reaching the highest levels of power — and perhaps a chance at redemption. Marvel at its most subversive.",
        nl: "Een groep antihelden en outcasts wordt op een missie gestuurd waar niemand levend van zou moeten terugkeren. Gedwongen samen te werken, ontdekken ze een complot tot in de hoogste regionen van de macht — en misschien een kans op verlossing. Marvel op zijn eigenzinnigst."
    },
    "The Last Showgirl": {
        en: "Shelly has been dancing in a Las Vegas revue for thirty years. When the show is suddenly cancelled, she must decide who she will be next — in a city that worships youth, and in a life she has danced away. A moving performance by Pamela Anderson.",
        nl: "Shelly danst al dertig jaar in een revue in Las Vegas. Wanneer de show plotseling wordt geschrapt, moet ze beslissen wie ze hierna wil zijn — in een stad die jeugd aanbidt, en in een leven dat ze al dansend voorbij liet gaan. Een ontroerende rol van Pamela Anderson."
    },
    "Snow Must Go On": {
        en: "A disco polo star is left without money, fans or a plan for life. His last chance turns out to be a tour of mountain resorts — in the middle of winter, with a feuding crew and a coach on its last legs. A comedy about how the show must go on, even when everything falls apart in the snow.",
        nl: "Een discopolo-ster blijft achter zonder geld, fans of levensplan. Zijn laatste kans blijkt een tournee langs bergresorts — midden in de winter, met een ruziënde crew en een touringcar op zijn laatste benen. Een komedie over hoe de show door moet gaan, zelfs als alles in de sneeuw in duigen valt."
    },
    "Bogowie": {
        en: "The early 1980s. Zbigniew Religa, defying the system, his colleagues and his own weaknesses, builds a cardiac surgery clinic in Zabrze and performs Poland's first successful heart transplant. Tomasz Kot in a role that went down in Polish film history.",
        nl: "Begin jaren 80. Zbigniew Religa bouwt, tegen het systeem, zijn vakgenoten en zijn eigen zwaktes in, een hartchirurgiekliniek in Zabrze en voert de eerste geslaagde harttransplantatie van Polen uit. Tomasz Kot in een rol die de Poolse filmgeschiedenis inging."
    },
    "Katyń": {
        en: "September 1939. Thousands of Polish officers fall into Soviet captivity. Andrzej Wajda tells the story of the Katyń massacre from the perspective of the victims and their families, who had to live with the lie for decades. An Oscar-nominated film.",
        nl: "September 1939. Duizenden Poolse officieren raken in Sovjet-gevangenschap. Andrzej Wajda vertelt over het bloedbad van Katyń vanuit het perspectief van de slachtoffers en hun families, die decennialang met de leugen moesten leven. Een voor een Oscar genomineerde film."
    },
    "Boże Ciało": {
        en: "Twenty-year-old Daniel, fresh out of a juvenile detention centre, passes himself off as a priest and takes over a village parish. His unconventional sermons begin to heal the wounds of a community divided by tragedy. Jan Komasa's Oscar-nominated film.",
        nl: "De twintigjarige Daniel doet zich na zijn vrijlating uit een jeugdinrichting voor als priester en neemt een dorpsparochie over. Zijn onconventionele preken beginnen de wonden te helen van een door een tragedie verdeelde gemeenschap. De Oscar-genomineerde film van Jan Komasa."
    },
    "Ida": {
        en: "Poland, the 1960s. Before taking her vows, novice Anna visits her aunt — a former Stalinist prosecutor. Their journey together uncovers a family secret from the war. The first Polish film to win the Oscar for Best Foreign Language Film.",
        nl: "Polen, jaren 60. Voordat ze haar geloften aflegt, bezoekt novice Anna haar tante — een voormalige stalinistische aanklager. Hun gezamenlijke reis onthult een familiegeheim uit de oorlog. De eerste Poolse film die de Oscar voor beste niet-Engelstalige film won."
    },
    "Kler": {
        en: "The fates of three priests bound together by a tragedy from years ago. Each copes differently with faith, power and his own sins. Wojciech Smarzowski's uncompromising film that shook all of Poland.",
        nl: "De levens van drie priesters, verbonden door een tragedie van jaren geleden. Ieder van hen gaat anders om met geloof, macht en eigen zonden. De compromisloze film van Wojciech Smarzowski die heel Polen in beroering bracht."
    },
    "Bezcenny Pakunek": {
        en: "In the depths of a wartime winter, a poor woodcutter's wife finds a bundle by the tracks, thrown from a train bound for the camps. She resolves to protect the child at any cost. A haunting animated parable about humanity in inhuman times.",
        nl: "Midden in een oorlogswinter vindt de arme vrouw van een houthakker bij het spoor een bundeltje, gegooid uit een trein op weg naar de kampen. Ze besluit het kind koste wat kost te beschermen. Een aangrijpende geanimeerde parabel over menselijkheid in onmenselijke tijden."
    },
    "Przyjmij/Odrzuć": {
        en: "She has her life planned down to the minute; he answers every call fate sends his way. An accidental phone swap turns their carefully arranged worlds upside down. A romantic comedy about how the best things happen unplanned.",
        nl: "Zij heeft haar leven tot op de minuut gepland, hij neemt elk telefoontje van het lot aan. Een toevallige telefoonverwisseling zet hun zorgvuldig geordende werelden op zijn kop. Een romantische komedie over hoe de mooiste dingen ongepland gebeuren."
    },
    "Ostatnia Rodzina": {
        en: "For nearly three decades, the story of the Beksiński family unfolds in a Warsaw apartment block: brilliant painter Zdzisław, his wife Zofia and their son Tomasz, a cult radio presenter. A portrait of a family marked by love, art and tragedy.",
        nl: "Bijna drie decennia lang speelt zich in een Warschause flat het verhaal af van de familie Beksiński: de geniale schilder Zdzisław, zijn vrouw Zofia en zoon Tomasz, een cultradiopresentator. Een portret van een gezin getekend door liefde, kunst en tragedie."
    },
    "Nowokaina": {
        en: "Nathan feels no pain — a rare condition that overnight becomes his superpower. When the girl from his bank is kidnapped during a robbery, he sets out to rescue her, broken bones or not. Brutally funny action cinema.",
        nl: "Nathan voelt geen pijn — een zeldzame aandoening die van de ene op de andere dag zijn superkracht wordt. Wanneer het meisje van zijn bank tijdens een overval wordt ontvoerd, gaat hij haar redden, gebroken botten of niet. Bruut grappige actiecinema."
    },
    "Bogini Partenope": {
        en: "Partenope, born in the sea off the coast of Naples, enchants everyone around her all her life. Paolo Sorrentino paints a sensual portrait of a woman and a city, weaving beauty, melancholy and the passing of time into a visually dazzling whole.",
        nl: "Partenope, geboren in de zee voor de kust van Napels, betovert haar leven lang iedereen om haar heen. Paolo Sorrentino schetst een zinnelijk portret van een vrouw en een stad, waarin schoonheid, melancholie en vergankelijkheid samensmelten tot een visueel verbluffend geheel."
    },
    "Skrzyżowanie": {
        en: "One intersection, four cars, four stories about to collide — literally and figuratively. A tale of chance, guilt and second chances, where every decision has its price.",
        nl: "Eén kruispunt, vier auto's, vier verhalen die op het punt staan te botsen — letterlijk en figuurlijk. Een verhaal over toeval, schuld en tweede kansen, waarin elke beslissing een prijs heeft."
    },
    "Szpiedzy": {
        en: "The Cold War, a Berlin divided by the Wall, and agents who don't even trust their own shadows. A gripping game of spy agencies where the line between loyalty and betrayal is thinner than microfilm.",
        nl: "De Koude Oorlog, een door de Muur verdeeld Berlijn en agenten die zelfs hun eigen schaduw niet vertrouwen. Een meeslepend spel van inlichtingendiensten waarin de grens tussen loyaliteit en verraad dunner is dan microfilm."
    },
    "Matrix Rewolucje": {
        en: "The final battle for Zion rages on, and Neo must reach the Machine City to end the war between humans and machines. The finale of the Wachowskis' cult trilogy returns to the big screen in a refreshed version.",
        nl: "De laatste slag om Zion woedt voort en Neo moet de Machinestad bereiken om de oorlog tussen mensen en machines te beëindigen. De finale van de culttrilogie van de Wachowski's keert in een opgefriste versie terug op het grote doek."
    },
    "Inu-Oh": {
        en: "Medieval Japan. Cursed dancer Inu-Oh and blind musician Tomona form a duo that electrifies crowds with performances six hundred years ahead of their time. A rock opera anime from studio Science SARU.",
        nl: "Middeleeuws Japan. De vervloekte danser Inu-Oh en de blinde muzikant Tomona vormen een duo dat de menigte elektriseert met optredens die hun tijd zeshonderd jaar vooruit zijn. Een rockopera-anime van studio Science SARU."
    },
    "Pani od Polskiego": {
        en: "A charismatic Polish teacher in a small town teaches her students more than the curriculum requires: courage, sensitivity and thinking for themselves. When the school faces closure, her class decides to fight for their teacher.",
        nl: "Een charismatische lerares Pools in een klein stadje leert haar leerlingen meer dan het lesprogramma voorschrijft: moed, gevoeligheid en zelfstandig denken. Wanneer de school met sluiting wordt bedreigd, besluit de klas voor hun lerares te vechten."
    },
    "Kayara Niepokonana": {
        en: "In the heart of the Inca empire, young Kayara dreams of becoming the first female chasqui messenger. Ahead of her lies a race through mountains, jungles and her own doubts. A colourful animated adventure about the courage to break rules that have long grown old.",
        nl: "In het hart van het Incarijk droomt de jonge Kayara ervan de eerste vrouwelijke chasqui-boodschapper te worden. Haar wacht een race door bergen, jungles en haar eigen twijfels. Een kleurrijk animatie-avontuur over de moed om regels te breken die allang verouderd zijn."
    },
    "Zabili Księdza": {
        en: "Inspired by the fate of Father Jerzy Popiełuszko, the story of a Solidarity chaplain whose sermons became the voice of an enslaved nation — and of the officer ordered to silence him.",
        nl: "Geïnspireerd op het lot van priester Jerzy Popiełuszko: het verhaal van een Solidariteitskapelaan wiens preken de stem van een onderdrukt volk werden — en van de agent die het bevel kreeg hem het zwijgen op te leggen."
    },
    "Hurry Up Tomorrow": {
        en: "A musician on the edge of a breakdown, insomnia that blurs the line between stage and reality, and an encounter with a mysterious stranger after which nothing will be the same. The Weeknd on a psychedelic journey into himself.",
        nl: "Een muzikant op de rand van een inzinking, slapeloosheid die de grens tussen podium en werkelijkheid vervaagt, en een ontmoeting met een mysterieuze onbekende waarna niets meer hetzelfde is. The Weeknd op een psychedelische reis naar zijn binnenste."
    },
    "Ukryty Motyw": {
        en: "A brilliant investigator lands a case where every suspect has an alibi, and every alibi has a hidden layer. The closer he gets to the truth, the clearer he sees that someone is composing this crime story just for him.",
        nl: "Een briljante rechercheur krijgt een zaak waarin elke verdachte een alibi heeft, en elk alibi een dubbele bodem. Hoe dichter hij bij de waarheid komt, hoe duidelijker hij ziet dat iemand deze misdaadpuzzel speciaal voor hem in elkaar zet."
    },
    "Teksańska Masakra Piłą Mechaniczną": {
        en: "A group of young idealists arrives in a deserted Texas town with plans to revitalise it. They don't know that the most famous killer in horror history never moved out. Leatherface is back.",
        nl: "Een groep jonge idealisten komt aan in een verlaten stadje in Texas met plannen om het nieuw leven in te blazen. Ze weten niet dat de beroemdste moordenaar uit de horrorgeschiedenis er nooit is weggegaan. Leatherface is terug."
    },
    "Diva Futura": {
        en: "Rome in the 1980s. Riccardo Schicchi builds an adult entertainment empire, turning his stars into pop culture icons. A story of a moral revolution, fame and the price paid for a life in the spotlight.",
        nl: "Rome, jaren 80. Riccardo Schicchi bouwt een imperium van volwassenenentertainment en maakt van zijn sterren popcultuuriconen. Een verhaal over een zedenrevolutie, roem en de prijs die je betaalt voor een leven in de schijnwerpers."
    },
    "Surfer": {
        en: "A man returns with his son to the beach of his childhood to buy a house overlooking the ocean. A local gang of surfers decides to show him his place. With every day of humiliation, the edge of madness draws closer. Nicolas Cage in the form of his life.",
        nl: "Een man keert met zijn zoon terug naar het strand van zijn jeugd om een huis met uitzicht op de oceaan te kopen. Een lokale surfbende besluit hem zijn plaats te wijzen. Met elke dag van vernedering komt de waanzin dichterbij. Nicolas Cage in de vorm van zijn leven."
    },
    "Lilo i Stich": {
        en: "A lonely Hawaiian girl adopts the strangest dog in the world — not knowing it's escaped alien experiment number 626. The live-action version of Disney's beloved animation about how ohana means family.",
        nl: "Een eenzaam Hawaïaans meisje adopteert de vreemdste hond ter wereld — zonder te weten dat het het ontsnapte buitenaardse experiment nummer 626 is. De live-actionversie van Disneys geliefde animatiefilm over hoe ohana familie betekent."
    },
    "Dumna Królewna": {
        en: "Spoiled princess Miran learns that a true crown isn't worn on your head but in your heart. Transformed into a peasant girl, she must find her way back to the palace — and to herself. A fairy tale for the whole family.",
        nl: "De verwende prinses Miran leert dat je een echte kroon niet op je hoofd draagt, maar in je hart. Betoverd tot boerenmeisje moet ze de weg terugvinden naar het paleis — en naar zichzelf. Een sprookje voor het hele gezin."
    },
    "Frendo": {
        en: "In the sleepy town of Kettle Springs, the local factory mascot — Frendo the clown — stops being just a face on billboards. A group of teenagers discovers that someone in his mask takes scaring people dead seriously.",
        nl: "In het slaperige stadje Kettle Springs is de mascotte van de plaatselijke fabriek — clown Frendo — niet langer alleen een figuur op reclameborden. Een groep tieners ontdekt dat iemand in zijn masker het bang maken dodelijk serieus neemt."
    },
    "Pani Bucik": {
        en: "The elegant Mrs. Bucik runs the most famous shoemaker's shop in town, and her shoes can lead their owner exactly where they need to go. A warm animated tale about dreams made to measure.",
        nl: "De elegante mevrouw Bucik runt de beroemdste schoenmakerij van het stadje, en haar schoenen kunnen hun eigenaar precies daarheen brengen waar hij moet zijn. Een warm animatieverhaal over dromen op maat."
    },
    "Looney Tunes: Porky i Daffy ratują świat": {
        en: "Porky and Daffy discover that the bubble gum from the local factory is actually a cosmic conspiracy to turn humanity into mindless zombies. The fate of the planet in the hands of a pig and a duck — what could go wrong?",
        nl: "Porky en Daffy ontdekken dat de kauwgom uit de plaatselijke fabriek in werkelijkheid een kosmisch complot is om de mensheid in willoze zombies te veranderen. Het lot van de planeet in handen van een varkentje en een eend — wat kan er misgaan?"
    },
    "Elfy Rozrabiają": {
        en: "Two mischievous elves fall out of Santa's sleigh a week before Christmas. To get back to the North Pole, they must save the Christmas spirit in a town that stopped believing in magic long ago.",
        nl: "Twee ondeugende elfjes vallen een week voor Kerstmis uit de slee van de Kerstman. Om terug te komen naar de Noordpool moeten ze de kerstsfeer redden in een stadje dat allang niet meer in magie gelooft."
    },
    "Śnieżka": {
        en: "The classic Brothers Grimm fairy tale in Disney's new musical version. Snow White flees the envious Evil Queen and discovers that true strength comes not from beauty, but from courage and a good heart.",
        nl: "Het klassieke sprookje van de gebroeders Grimm in een nieuwe, muzikale Disney-versie. Sneeuwwitje vlucht voor de jaloerse Boze Koningin en ontdekt dat echte kracht niet uit schoonheid komt, maar uit moed en een goed hart."
    },
    "Niesamowite Przygody Skarpetek": {
        en: "Where do socks disappear from the washing machine? To Sockville! Lost sock Hania journeys through a hidden world to find her pair. A humour-packed Polish animation for the youngest viewers and their parents.",
        nl: "Waar verdwijnen sokken uit de wasmachine naartoe? Naar Sokkendorp! De verdwaalde sok Hania trekt door een verborgen wereld om haar wederhelft te vinden. Een Poolse animatiefilm vol humor voor de allerkleinsten en hun ouders."
    },
    "Dog Man": {
        en: "Half dog, half cop — all hero! Dog Man hunts the arch-villain cat Petey, protects the city and tries to earn a medal, even if he sometimes eats the evidence. Based on the bestselling comic by the creator of Captain Underpants.",
        nl: "Half hond, half agent — helemaal held! Dog Man jaagt op de superschurk kat Petey, beschermt de stad en probeert een medaille te verdienen, ook al eet hij soms het bewijsmateriaal op. Naar de beststellerstrip van de maker van Kapitein Onderbroek."
    },
    "Freddy - Pudel nie z tej Ziemi": {
        en: "Freddy looks like an ordinary poodle, but he's a cosmic agent on a secret mission. When his ship crashes on Earth, he ends up in the care of a resourceful nine-year-old. Together they'll have to save two planets at once.",
        nl: "Freddy ziet eruit als een gewone poedel, maar hij is een kosmische agent op een geheime missie. Wanneer zijn schip op aarde neerstort, komt hij terecht bij een pientere negenjarige. Samen moeten ze twee planeten tegelijk redden."
    },
    "Pies na Medal": {
        en: "An unruly mutt from a shelter joins a family that's falling apart. No one expects that he'll be the one to put it back together — and win the most important medal in town along the way.",
        nl: "Een ondeugende asielhond komt terecht in een gezin dat uit elkaar valt. Niemand verwacht dat juist hij het weer bij elkaar brengt — en onderweg ook nog de belangrijkste medaille van de stad wint."
    },
    "Flow": {
        en: "A great flood engulfs the world, and a solitary cat must learn to cooperate with other animals on a drifting boat. An Oscar-winning animation without a single word of dialogue — and with an ocean of emotion.",
        nl: "Een grote vloed overspoelt de wereld en een eenzame kat moet leren samenwerken met andere dieren op een dobberende boot. Een met een Oscar bekroonde animatiefilm zonder één woord dialoog — en met een oceaan aan emoties."
    },
    "Mufasa: Król Lew": {
        en: "Before he became king of the Pride Lands, Mufasa was an orphaned cub without a drop of royal blood. Rafiki tells the story of a brother who became an enemy, and of a journey that shaped a legend.",
        nl: "Voordat hij koning van het Land van de Leeuwen werd, was Mufasa een weesje zonder één druppel koninklijk bloed. Rafiki vertelt het verhaal van een broer die een vijand werd, en van een tocht die een legende vormde."
    },
    "Basia. Radzę Sobie!": {
        en: "Basia is five years old, full of questions and even more energy. Preschool, a little brother, a lost teddy bear — every day is a new adventure. The beloved heroine of Polish children's books on the big screen.",
        nl: "Basia is vijf jaar oud, heeft een heleboel vragen en nog meer energie. De kleuterschool, een broertje, een verloren knuffelbeer — elke dag is een nieuw avontuur. De geliefde heldin uit Poolse kinderboeken op het grote doek."
    },
    "Sonic: Szybki jak Błyskawica": {
        en: "The fastest hedgehog in the galaxy faces his most powerful opponent yet — Shadow. To defeat him, Sonic, Tails and Knuckles will have to forge a very unusual alliance. Turbocharged fun for the whole family.",
        nl: "De snelste egel van het heelal staat tegenover zijn machtigste tegenstander ooit — Shadow. Om hem te verslaan moeten Sonic, Tails en Knuckles een heel ongewoon bondgenootschap sluiten. Turbopret voor het hele gezin."
    }
};

export default descriptions;
