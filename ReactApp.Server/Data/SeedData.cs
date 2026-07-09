using ReactApp.Server.Models;

namespace ReactApp.Server.Data;

/// <summary>Dane startowe przeniesione z dawnych mocków frontendu.</summary>
public static class SeedData
{
    public record MovieSeed(string Title, string Poster, bool Now, bool Upcoming, bool Family);

    public static readonly IReadOnlyList<MovieSeed> Movies =
    [
        new("Księgowy 2", "/image/ksiegowy2.png", true, false, false),
        new("Legenda Ochi", "/image/legendaochi.png", true, false, true),
        new("Oszukać Przeznaczenie", "/image/oszukacprzeznaczenie2.png", true, false, false),
        new("Until Dawn", "/image/untildown.png", true, false, false),
        new("Grzesznicy", "/image/grzesznicy.png", true, false, false),
        new("Minecraft", "/image/minecraft.png", true, false, true),
        new("Mulholland Drive", "/image/mullholanddrive.png", true, false, false),
        new("Amator", "/image/amator.png", true, false, false),
        new("Fachowiec", "/image/fachowiec.png", true, false, false),
        new("Thunderbolts", "/image/thunderbolts.png", true, false, false),
        new("The Last Showgirl", "/image/thelastshowgirl.png", true, false, false),
        new("Snow Must Go On", "/image/snowmustgoon.png", true, false, false),
        new("Bogowie", "/image/bogowie.png", true, false, false),
        new("Katyń", "/image/katyn.png", true, false, false),
        new("Boże Ciało", "/image/bozecialo.png", true, false, false),
        new("Ida", "/image/ida.png", true, false, false),
        new("Kler", "/image/kler.png", true, false, false),
        new("Bezcenny Pakunek", "/image/bezcennypakunek.png", true, false, false),
        new("Przyjmij/Odrzuć", "/image/przyjmijodrzuc.png", true, false, false),
        new("Ostatnia Rodzina", "/image/ostatniarodzina.png", true, false, false),
        new("Nowokaina", "/image/nowokaina.png", true, false, false),
        new("Bogini Partenope", "/image/boginipartenope.png", true, false, false),
        new("Skrzyżowanie", "/image/skrzyzowanie.png", true, false, false),
        new("Szpiedzy", "/image/szpiedzy.png", false, true, false),
        new("Matrix Rewolucje", "/image/matrix.png", false, true, false),
        new("Inu-Oh", "/image/inuoh.png", false, true, false),
        new("Pani od Polskiego", "/image/paniodpolskiego.png", false, true, false),
        new("Kayara Niepokonana", "/image/kayaraniepokonana.png", false, true, true),
        new("Zabili Księdza", "/image/zabiliksiedza.png", false, true, false),
        new("Hurry Up Tomorrow", "/image/hurryuptomorrow.png", false, true, false),
        new("Ukryty Motyw", "/image/ukrytymotyw.png", false, true, false),
        new("Teksańska Masakra Piłą Mechaniczną", "/image/teksanskamasakra.png", false, true, false),
        new("Diva Futura", "/image/divafutura.png", false, true, false),
        new("Surfer", "/image/surfer.png", false, true, false),
        new("Lilo i Stich", "/image/liloistich.png", false, true, true),
        new("Dumna Królewna", "/image/dumnakrolewna.png", false, true, true),
        new("Frendo", "/image/frendo.png", false, true, false),
        new("Pani Bucik", "/image/panibucik.png", false, true, true),
        new("Looney Tunes: Porky i Daffy ratują świat", "/image/looneytunes.png", false, false, true),
        new("Elfy Rozrabiają", "/image/elfyrozrabiaja.png", false, false, true),
        new("Śnieżka", "/image/sniezka.png", false, false, true),
        new("Niesamowite Przygody Skarpetek", "/image/niesamowiteprzygodyskarpetek.png", false, false, true),
        new("Dog Man", "/image/dogman.png", false, false, true),
        new("Freddy - Pudel nie z tej Ziemi", "/image/freddy.png", false, false, true),
        new("Pies na Medal", "/image/piesnamedal.png", false, false, true),
        new("Flow", "/image/flow.png", false, false, true),
        new("Mufasa: Król Lew", "/image/mufasa.png", false, false, true),
        new("Basia. Radzę Sobie!", "/image/basia.png", false, false, true),
        new("Sonic: Szybki jak Błyskawica", "/image/sonic.png", false, false, true),
    ];

    public static readonly IReadOnlyList<string> Cities =
    [
        "Biała Podlaska", "Warszawa", "Kraków", "Poznań", "Wrocław", "Gdańsk",
        "Łódź", "Katowice", "Lublin", "Częstochowa", "Toruń", "Bydgoszcz",
        "Zielona Góra", "Wałbrzych", "Gliwice", "Sosnowiec", "Ruda Śląska",
        "Rybnik", "Bytom", "Bielsko-Biała", "Starogard Gdański", "Cieszyn", "Elbląg"
    ];

    /// <summary>Układ sali przeniesiony z dawnego SeatSelectionPage (null = przejście).</summary>
    public const string DefaultHallLayoutJson =
        """
        [
          [16,15,14,13,12,11,10,9,null,null,null,8,7,6,5,4,3,2,1],
          [16,15,14,13,12,11,10,9,null,null,null,8,7,6,5,4,3,2,1],
          [16,15,14,13,12,11,10,9,null,null,null,8,7,6,5,4,3,2,1],
          [16,15,14,13,12,11,10,9,null,null,null,8,7,6,5,4,3,2,1],
          [16,15,14,13,12,11,10,9,null,null,null,8,7,6,5,4,3,2,1],
          [16,15,14,13,12,11,10,9,null,null,null,8,7,6,5,4,3,2,1],
          [16,15,14,13,12,11,10,9,null,null,null,8,7,6,5,4,3,2,1],
          [16,15,14,13,12,11,10,9,null,null,null,8,7,6,5,4,3,2,1],
          [16,15,14,13,12,11,10,9,null,null,null,8,7,6,5,4,3,2,1],
          [16,15,14,13,12,11,10,9,null,null,null,8,7,6,5,4,3,2,1],
          [16,15,14,13,12,11,10,9,null,null,null,8,7,6,5,4,3,2,1],
          [18,17,16,15,14,13,12,11,10,null,null,null,9,8,7,6,5,4,3,2,1],
          [22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]
        ]
        """;

    public static readonly IReadOnlyList<(string Name, decimal Price)> TicketTypes =
    [
        ("Normalny", 29.90m),
        ("Ulgowy", 26.90m)
    ];

    public const decimal ServiceFeePerSeat = 2.00m;
}
