import { useState } from 'react';
import { Button, Offcanvas, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/buyticket.scss';

const kinoData = {
    "Warszawa": {
        "daty": {
            "2025-05-31": {
                "filmy": [
                    "Legenda Ochi",
                    "Ostatnia Rodzina",
                    "Until Down",
                    "Mullholand Drive",
                    "Katyn",
                    "Minecraft"
                ],
                "godziny": [
                    "14:00",
                    "17:00",
                    "19:00",
                    "21:00"
                ]
            },
            "2025-06-01": {
                "filmy": [
                    "Thunderbolts",
                    "Bogini Partenope",
                    "Snow Must Go On",
                    "Katyn",
                    "Mullholand Drive",
                    "Oszukac Przeznaczenie"
                ],
                "godziny": [
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00"
                ]
            },
            "2025-06-02": {
                "filmy": [
                    "Legenda Ochi",
                    "Grzesznicy",
                    "Oszukac Przeznaczenie",
                    "Thunderbolts",
                    "Przyjmij/Odrzuc",
                    "Until Down"
                ],
                "godziny": [
                    "13:00",
                    "14:00",
                    "15:00",
                    "20:00"
                ]
            },
            "2025-06-03": {
                "filmy": [
                    "Thunderbolts",
                    "Kler",
                    "Bogowie",
                    "Katyn",
                    "Ksiegowy 2",
                    "Oszukac Przeznaczenie"
                ],
                "godziny": [
                    "13:00",
                    "15:00",
                    "18:00",
                    "21:00"
                ]
            },
            "2025-06-04": {
                "filmy": [
                    "Until Down",
                    "Ida",
                    "Minecraft",
                    "Kler",
                    "Katyn",
                    "Przyjmij/Odrzuc"
                ],
                "godziny": [
                    "11:00",
                    "13:00",
                    "16:00",
                    "20:00"
                ]
            },
            "2025-06-05": {
                "filmy": [
                    "Kler",
                    "Ksiegowy 2",
                    "Thunderbolts",
                    "Amator",
                    "Boze Cialo",
                    "Bogini Partenope"
                ],
                "godziny": [
                    "11:00",
                    "13:00",
                    "17:00",
                    "18:00"
                ]
            },
            "2025-06-06": {
                "filmy": [
                    "Nowokaina",
                    "Until Down",
                    "Bezczenny Pakunek",
                    "Skrzyzowanie",
                    "Mullholand Drive",
                    "Thunderbolts"
                ],
                "godziny": [
                    "14:00",
                    "16:00",
                    "18:00",
                    "20:00"
                ]
            },
            "2025-06-07": {
                "filmy": [
                    "Grzesznicy",
                    "Legenda Ochi",
                    "Bogini Partenope",
                    "Skrzyzowanie",
                    "Snow Must Go On",
                    "Mullholand Drive"
                ],
                "godziny": [
                    "11:00",
                    "17:00",
                    "18:00",
                    "22:00"
                ]
            },
            "2025-06-08": {
                "filmy": [
                    "Boze Cialo",
                    "Thunderbolts",
                    "Fachowiec",
                    "Ida",
                    "The Last Showgirl",
                    "Bezczenny Pakunek"
                ],
                "godziny": [
                    "11:00",
                    "13:00",
                    "16:00",
                    "17:00"
                ]
            },
            "2025-06-09": {
                "filmy": [
                    "Katyn",
                    "Bogowie",
                    "Ksiegowy 2",
                    "Przyjmij/Odrzuc",
                    "Snow Must Go On",
                    "Mullholand Drive"
                ],
                "godziny": [
                    "12:00",
                    "18:00",
                    "19:00",
                    "21:00"
                ]
            },
            "2025-06-10": {
                "filmy": [
                    "Bogini Partenope",
                    "Nowokaina",
                    "Snow Must Go On",
                    "Grzesznicy",
                    "Ostatnia Rodzina",
                    "Bezczenny Pakunek"
                ],
                "godziny": [
                    "12:00",
                    "16:00",
                    "19:00",
                    "20:00"
                ]
            },
            "2025-06-11": {
                "filmy": [
                    "Fachowiec",
                    "The Last Showgirl",
                    "Ida",
                    "Bogini Partenope",
                    "Bezczenny Pakunek",
                    "Minecraft"
                ],
                "godziny": [
                    "14:00",
                    "15:00",
                    "16:00",
                    "21:00"
                ]
            },
            "2025-06-12": {
                "filmy": [
                    "Ksiegowy 2",
                    "Ostatnia Rodzina",
                    "Katyn",
                    "Oszukac Przeznaczenie",
                    "Legenda Ochi",
                    "Amator"
                ],
                "godziny": [
                    "11:00",
                    "16:00",
                    "17:00",
                    "18:00"
                ]
            },
            "2025-06-13": {
                "filmy": [
                    "Mullholand Drive",
                    "Thunderbolts",
                    "Snow Must Go On",
                    "Przyjmij/Odrzuc",
                    "Ostatnia Rodzina",
                    "Amator"
                ],
                "godziny": [
                    "11:00",
                    "16:00",
                    "18:00",
                    "21:00"
                ]
            },
            "2025-06-14": {
                "filmy": [
                    "Nowokaina",
                    "Grzesznicy",
                    "Legenda Ochi",
                    "Amator",
                    "Minecraft",
                    "Bogini Partenope"
                ],
                "godziny": [
                    "16:00",
                    "20:00",
                    "21:00",
                    "22:00"
                ]
            },
            "2025-06-15": {
                "filmy": [
                    "Bogini Partenope",
                    "Legenda Ochi",
                    "Skrzyzowanie",
                    "Amator",
                    "Bogowie",
                    "Ksiegowy 2"
                ],
                "godziny": [
                    "13:00",
                    "14:00",
                    "16:00",
                    "19:00"
                ]
            }
        }
    },
    "Kraków": {
        "daty": {
            "2025-05-31": {
                "filmy": [
                    "Boze Cialo",
                    "Thunderbolts",
                    "Legenda Ochi",
                    "Ksiegowy 2",
                    "Nowokaina",
                    "Oszukac Przeznaczenie"
                ],
                "godziny": [
                    "13:00",
                    "15:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-01": {
                "filmy": [
                    "Ksiegowy 2",
                    "Skrzyzowanie",
                    "Amator",
                    "Ostatnia Rodzina",
                    "The Last Showgirl",
                    "Legenda Ochi"
                ],
                "godziny": [
                    "13:00",
                    "18:00",
                    "19:00",
                    "22:00"
                ]
            },
            "2025-06-02": {
                "filmy": [
                    "Nowokaina",
                    "Bogini Partenope",
                    "Fachowiec",
                    "Oszukac Przeznaczenie",
                    "Skrzyzowanie",
                    "Ksiegowy 2"
                ],
                "godziny": [
                    "13:00",
                    "18:00",
                    "19:00",
                    "20:00"
                ]
            },
            "2025-06-03": {
                "filmy": [
                    "Mullholand Drive",
                    "Nowokaina",
                    "Bogowie",
                    "Bogini Partenope",
                    "Ostatnia Rodzina",
                    "Boze Cialo"
                ],
                "godziny": [
                    "11:00",
                    "12:00",
                    "15:00",
                    "19:00"
                ]
            },
            "2025-06-04": {
                "filmy": [
                    "Minecraft",
                    "Bogowie",
                    "Bezczenny Pakunek",
                    "Ksiegowy 2",
                    "Fachowiec",
                    "Ostatnia Rodzina"
                ],
                "godziny": [
                    "16:00",
                    "17:00",
                    "18:00",
                    "19:00"
                ]
            },
            "2025-06-05": {
                "filmy": [
                    "Amator",
                    "Mullholand Drive",
                    "Until Down",
                    "Minecraft",
                    "Bogini Partenope",
                    "Bogowie"
                ],
                "godziny": [
                    "11:00",
                    "16:00",
                    "18:00",
                    "20:00"
                ]
            },
            "2025-06-06": {
                "filmy": [
                    "The Last Showgirl",
                    "Bogini Partenope",
                    "Skrzyzowanie",
                    "Fachowiec",
                    "Oszukac Przeznaczenie",
                    "Minecraft"
                ],
                "godziny": [
                    "18:00",
                    "19:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-07": {
                "filmy": [
                    "Boze Cialo",
                    "Przyjmij/Odrzuc",
                    "Minecraft",
                    "Ida",
                    "Bezczenny Pakunek",
                    "Ostatnia Rodzina"
                ],
                "godziny": [
                    "16:00",
                    "18:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-08": {
                "filmy": [
                    "Katyn",
                    "Grzesznicy",
                    "Ostatnia Rodzina",
                    "Boze Cialo",
                    "Ida",
                    "Thunderbolts"
                ],
                "godziny": [
                    "11:00",
                    "13:00",
                    "17:00",
                    "21:00"
                ]
            },
            "2025-06-09": {
                "filmy": [
                    "The Last Showgirl",
                    "Bogowie",
                    "Fachowiec",
                    "Bogini Partenope",
                    "Legenda Ochi",
                    "Katyn"
                ],
                "godziny": [
                    "11:00",
                    "15:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-10": {
                "filmy": [
                    "Bogowie",
                    "Przyjmij/Odrzuc",
                    "Legenda Ochi",
                    "Grzesznicy",
                    "Thunderbolts",
                    "Snow Must Go On"
                ],
                "godziny": [
                    "15:00",
                    "16:00",
                    "20:00",
                    "22:00"
                ]
            },
            "2025-06-11": {
                "filmy": [
                    "Bezczenny Pakunek",
                    "Fachowiec",
                    "Minecraft",
                    "Grzesznicy",
                    "Oszukac Przeznaczenie",
                    "Katyn"
                ],
                "godziny": [
                    "18:00",
                    "19:00",
                    "21:00",
                    "22:00"
                ]
            },
            "2025-06-12": {
                "filmy": [
                    "Ida",
                    "Przyjmij/Odrzuc",
                    "Boze Cialo",
                    "Bogowie",
                    "Fachowiec",
                    "Ksiegowy 2"
                ],
                "godziny": [
                    "13:00",
                    "15:00",
                    "17:00",
                    "21:00"
                ]
            },
            "2025-06-13": {
                "filmy": [
                    "Bezczenny Pakunek",
                    "Ksiegowy 2",
                    "Nowokaina",
                    "Snow Must Go On",
                    "Bogowie",
                    "Bogini Partenope"
                ],
                "godziny": [
                    "12:00",
                    "17:00",
                    "19:00",
                    "22:00"
                ]
            },
            "2025-06-14": {
                "filmy": [
                    "Ksiegowy 2",
                    "Ida",
                    "Ostatnia Rodzina",
                    "Legenda Ochi",
                    "Grzesznicy",
                    "Bezczenny Pakunek"
                ],
                "godziny": [
                    "17:00",
                    "20:00",
                    "21:00",
                    "22:00"
                ]
            },
            "2025-06-15": {
                "filmy": [
                    "Until Down",
                    "Thunderbolts",
                    "The Last Showgirl",
                    "Mullholand Drive",
                    "Grzesznicy",
                    "Ostatnia Rodzina"
                ],
                "godziny": [
                    "13:00",
                    "19:00",
                    "20:00",
                    "22:00"
                ]
            }
        }
    },
    "Poznań": {
        "daty": {
            "2025-05-31": {
                "filmy": [
                    "Kler",
                    "The Last Showgirl",
                    "Mullholand Drive",
                    "Bezczenny Pakunek",
                    "Bogini Partenope",
                    "Boze Cialo"
                ],
                "godziny": [
                    "11:00",
                    "14:00",
                    "20:00",
                    "22:00"
                ]
            },
            "2025-06-01": {
                "filmy": [
                    "Nowokaina",
                    "Mullholand Drive",
                    "Snow Must Go On",
                    "Fachowiec",
                    "Legenda Ochi",
                    "Oszukac Przeznaczenie"
                ],
                "godziny": [
                    "15:00",
                    "18:00",
                    "19:00",
                    "21:00"
                ]
            },
            "2025-06-02": {
                "filmy": [
                    "Bezczenny Pakunek",
                    "Ida",
                    "Grzesznicy",
                    "Minecraft",
                    "Thunderbolts",
                    "Bogowie"
                ],
                "godziny": [
                    "16:00",
                    "17:00",
                    "18:00",
                    "20:00"
                ]
            },
            "2025-06-03": {
                "filmy": [
                    "Skrzyzowanie",
                    "Boze Cialo",
                    "Ostatnia Rodzina",
                    "Bogini Partenope",
                    "Minecraft",
                    "Przyjmij/Odrzuc"
                ],
                "godziny": [
                    "12:00",
                    "18:00",
                    "19:00",
                    "20:00"
                ]
            },
            "2025-06-04": {
                "filmy": [
                    "Przyjmij/Odrzuc",
                    "Minecraft",
                    "Bogini Partenope",
                    "Nowokaina",
                    "Mullholand Drive",
                    "Oszukac Przeznaczenie"
                ],
                "godziny": [
                    "12:00",
                    "15:00",
                    "19:00",
                    "20:00"
                ]
            },
            "2025-06-05": {
                "filmy": [
                    "Thunderbolts",
                    "Nowokaina",
                    "Kler",
                    "Ksiegowy 2",
                    "Katyn",
                    "Bezczenny Pakunek"
                ],
                "godziny": [
                    "12:00",
                    "14:00",
                    "15:00",
                    "16:00"
                ]
            },
            "2025-06-06": {
                "filmy": [
                    "Skrzyzowanie",
                    "Bezczenny Pakunek",
                    "Minecraft",
                    "Nowokaina",
                    "Grzesznicy",
                    "Legenda Ochi"
                ],
                "godziny": [
                    "13:00",
                    "16:00",
                    "18:00",
                    "21:00"
                ]
            },
            "2025-06-07": {
                "filmy": [
                    "Bogowie",
                    "Mullholand Drive",
                    "Bogini Partenope",
                    "The Last Showgirl",
                    "Katyn",
                    "Bezczenny Pakunek"
                ],
                "godziny": [
                    "11:00",
                    "15:00",
                    "17:00",
                    "21:00"
                ]
            },
            "2025-06-08": {
                "filmy": [
                    "Ida",
                    "Ostatnia Rodzina",
                    "Nowokaina",
                    "Thunderbolts",
                    "Katyn",
                    "Grzesznicy"
                ],
                "godziny": [
                    "13:00",
                    "18:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-09": {
                "filmy": [
                    "Nowokaina",
                    "Mullholand Drive",
                    "The Last Showgirl",
                    "Grzesznicy",
                    "Bogini Partenope",
                    "Oszukac Przeznaczenie"
                ],
                "godziny": [
                    "12:00",
                    "13:00",
                    "15:00",
                    "21:00"
                ]
            },
            "2025-06-10": {
                "filmy": [
                    "Katyn",
                    "Ida",
                    "Przyjmij/Odrzuc",
                    "Nowokaina",
                    "Mullholand Drive",
                    "Legenda Ochi"
                ],
                "godziny": [
                    "12:00",
                    "18:00",
                    "19:00",
                    "20:00"
                ]
            },
            "2025-06-11": {
                "filmy": [
                    "Skrzyzowanie",
                    "Bogini Partenope",
                    "Mullholand Drive",
                    "Katyn",
                    "Nowokaina",
                    "Bezczenny Pakunek"
                ],
                "godziny": [
                    "11:00",
                    "12:00",
                    "14:00",
                    "15:00"
                ]
            },
            "2025-06-12": {
                "filmy": [
                    "Snow Must Go On",
                    "Przyjmij/Odrzuc",
                    "Bezczenny Pakunek",
                    "Bogowie",
                    "Kler",
                    "Katyn"
                ],
                "godziny": [
                    "14:00",
                    "18:00",
                    "21:00",
                    "22:00"
                ]
            },
            "2025-06-13": {
                "filmy": [
                    "Mullholand Drive",
                    "Oszukac Przeznaczenie",
                    "Amator",
                    "Ksiegowy 2",
                    "Legenda Ochi",
                    "Ostatnia Rodzina"
                ],
                "godziny": [
                    "11:00",
                    "15:00",
                    "18:00",
                    "19:00"
                ]
            },
            "2025-06-14": {
                "filmy": [
                    "Grzesznicy",
                    "Ostatnia Rodzina",
                    "Ksiegowy 2",
                    "Bogini Partenope",
                    "Katyn",
                    "Amator"
                ],
                "godziny": [
                    "12:00",
                    "15:00",
                    "17:00",
                    "18:00"
                ]
            },
            "2025-06-15": {
                "filmy": [
                    "Ksiegowy 2",
                    "Boze Cialo",
                    "Amator",
                    "Bogowie",
                    "Oszukac Przeznaczenie",
                    "Katyn"
                ],
                "godziny": [
                    "11:00",
                    "16:00",
                    "18:00",
                    "22:00"
                ]
            }
        }
    },
    "Wrocław": {
        "daty": {
            "2025-05-31": {
                "filmy": [
                    "Snow Must Go On",
                    "Bezczenny Pakunek",
                    "Grzesznicy",
                    "Katyn",
                    "Thunderbolts",
                    "Amator"
                ],
                "godziny": [
                    "12:00",
                    "13:00",
                    "14:00",
                    "18:00"
                ]
            },
            "2025-06-01": {
                "filmy": [
                    "Thunderbolts",
                    "Boze Cialo",
                    "Amator",
                    "Skrzyzowanie",
                    "Kler",
                    "Until Down"
                ],
                "godziny": [
                    "11:00",
                    "13:00",
                    "19:00",
                    "21:00"
                ]
            },
            "2025-06-02": {
                "filmy": [
                    "Katyn",
                    "Minecraft",
                    "The Last Showgirl",
                    "Mullholand Drive",
                    "Ostatnia Rodzina",
                    "Bogini Partenope"
                ],
                "godziny": [
                    "12:00",
                    "15:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-03": {
                "filmy": [
                    "Amator",
                    "Kler",
                    "Mullholand Drive",
                    "Boze Cialo",
                    "Bogini Partenope",
                    "Until Down"
                ],
                "godziny": [
                    "13:00",
                    "14:00",
                    "17:00",
                    "19:00"
                ]
            },
            "2025-06-04": {
                "filmy": [
                    "Thunderbolts",
                    "Snow Must Go On",
                    "Ksiegowy 2",
                    "The Last Showgirl",
                    "Boze Cialo",
                    "Amator"
                ],
                "godziny": [
                    "11:00",
                    "12:00",
                    "13:00",
                    "16:00"
                ]
            },
            "2025-06-05": {
                "filmy": [
                    "Katyn",
                    "Bezczenny Pakunek",
                    "Bogini Partenope",
                    "Thunderbolts",
                    "Kler",
                    "Nowokaina"
                ],
                "godziny": [
                    "15:00",
                    "18:00",
                    "19:00",
                    "21:00"
                ]
            },
            "2025-06-06": {
                "filmy": [
                    "Ida",
                    "Fachowiec",
                    "Bezczenny Pakunek",
                    "Mullholand Drive",
                    "Amator",
                    "Grzesznicy"
                ],
                "godziny": [
                    "11:00",
                    "20:00",
                    "21:00",
                    "22:00"
                ]
            },
            "2025-06-07": {
                "filmy": [
                    "Amator",
                    "Skrzyzowanie",
                    "Mullholand Drive",
                    "Grzesznicy",
                    "Ksiegowy 2",
                    "Boze Cialo"
                ],
                "godziny": [
                    "12:00",
                    "13:00",
                    "15:00",
                    "20:00"
                ]
            },
            "2025-06-08": {
                "filmy": [
                    "Minecraft",
                    "Nowokaina",
                    "Oszukac Przeznaczenie",
                    "Kler",
                    "Grzesznicy",
                    "Mullholand Drive"
                ],
                "godziny": [
                    "12:00",
                    "14:00",
                    "15:00",
                    "20:00"
                ]
            },
            "2025-06-09": {
                "filmy": [
                    "Fachowiec",
                    "The Last Showgirl",
                    "Bezczenny Pakunek",
                    "Legenda Ochi",
                    "Until Down",
                    "Bogini Partenope"
                ],
                "godziny": [
                    "12:00",
                    "16:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-10": {
                "filmy": [
                    "Ksiegowy 2",
                    "Kler",
                    "Katyn",
                    "Grzesznicy",
                    "Oszukac Przeznaczenie",
                    "The Last Showgirl"
                ],
                "godziny": [
                    "13:00",
                    "16:00",
                    "18:00",
                    "22:00"
                ]
            },
            "2025-06-11": {
                "filmy": [
                    "Nowokaina",
                    "Minecraft",
                    "Fachowiec",
                    "Ksiegowy 2",
                    "Bezczenny Pakunek",
                    "The Last Showgirl"
                ],
                "godziny": [
                    "13:00",
                    "17:00",
                    "18:00",
                    "20:00"
                ]
            },
            "2025-06-12": {
                "filmy": [
                    "Kler",
                    "Thunderbolts",
                    "Snow Must Go On",
                    "Ostatnia Rodzina",
                    "Nowokaina",
                    "Bogowie"
                ],
                "godziny": [
                    "11:00",
                    "16:00",
                    "17:00",
                    "21:00"
                ]
            },
            "2025-06-13": {
                "filmy": [
                    "Katyn",
                    "Skrzyzowanie",
                    "Przyjmij/Odrzuc",
                    "Grzesznicy",
                    "Thunderbolts",
                    "Snow Must Go On"
                ],
                "godziny": [
                    "12:00",
                    "16:00",
                    "18:00",
                    "19:00"
                ]
            },
            "2025-06-14": {
                "filmy": [
                    "Legenda Ochi",
                    "Kler",
                    "Przyjmij/Odrzuc",
                    "Nowokaina",
                    "Oszukac Przeznaczenie",
                    "Thunderbolts"
                ],
                "godziny": [
                    "11:00",
                    "17:00",
                    "19:00",
                    "22:00"
                ]
            },
            "2025-06-15": {
                "filmy": [
                    "Nowokaina",
                    "Bogowie",
                    "Snow Must Go On",
                    "Boze Cialo",
                    "Grzesznicy",
                    "Mullholand Drive"
                ],
                "godziny": [
                    "14:00",
                    "18:00",
                    "21:00",
                    "22:00"
                ]
            }
        }
    },
    "Łódź": {
        "daty": {
            "2025-05-31": {
                "filmy": [
                    "Przyjmij/Odrzuc",
                    "Bogini Partenope",
                    "Bogowie",
                    "Until Down",
                    "Boze Cialo",
                    "Skrzyzowanie"
                ],
                "godziny": [
                    "12:00",
                    "13:00",
                    "17:00",
                    "18:00"
                ]
            },
            "2025-06-01": {
                "filmy": [
                    "Bogini Partenope",
                    "Skrzyzowanie",
                    "Mullholand Drive",
                    "Nowokaina",
                    "Snow Must Go On",
                    "Until Down"
                ],
                "godziny": [
                    "11:00",
                    "12:00",
                    "15:00",
                    "22:00"
                ]
            },
            "2025-06-02": {
                "filmy": [
                    "Oszukac Przeznaczenie",
                    "Przyjmij/Odrzuc",
                    "Ksiegowy 2",
                    "Bogowie",
                    "Legenda Ochi",
                    "Grzesznicy"
                ],
                "godziny": [
                    "13:00",
                    "17:00",
                    "18:00",
                    "19:00"
                ]
            },
            "2025-06-03": {
                "filmy": [
                    "Oszukac Przeznaczenie",
                    "The Last Showgirl",
                    "Katyn",
                    "Kler",
                    "Skrzyzowanie",
                    "Amator"
                ],
                "godziny": [
                    "11:00",
                    "12:00",
                    "18:00",
                    "19:00"
                ]
            },
            "2025-06-04": {
                "filmy": [
                    "Grzesznicy",
                    "Przyjmij/Odrzuc",
                    "Boze Cialo",
                    "Kler",
                    "Ostatnia Rodzina",
                    "Mullholand Drive"
                ],
                "godziny": [
                    "11:00",
                    "12:00",
                    "16:00",
                    "21:00"
                ]
            },
            "2025-06-05": {
                "filmy": [
                    "Amator",
                    "Nowokaina",
                    "Snow Must Go On",
                    "Ostatnia Rodzina",
                    "Grzesznicy",
                    "Mullholand Drive"
                ],
                "godziny": [
                    "15:00",
                    "17:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-06": {
                "filmy": [
                    "Grzesznicy",
                    "Ida",
                    "Minecraft",
                    "Bogowie",
                    "Bezczenny Pakunek",
                    "Oszukac Przeznaczenie"
                ],
                "godziny": [
                    "13:00",
                    "14:00",
                    "15:00",
                    "18:00"
                ]
            },
            "2025-06-07": {
                "filmy": [
                    "Kler",
                    "Bogowie",
                    "Minecraft",
                    "Skrzyzowanie",
                    "Until Down",
                    "Ida"
                ],
                "godziny": [
                    "12:00",
                    "17:00",
                    "19:00",
                    "21:00"
                ]
            },
            "2025-06-08": {
                "filmy": [
                    "The Last Showgirl",
                    "Kler",
                    "Thunderbolts",
                    "Ostatnia Rodzina",
                    "Oszukac Przeznaczenie",
                    "Boze Cialo"
                ],
                "godziny": [
                    "15:00",
                    "20:00",
                    "21:00",
                    "22:00"
                ]
            },
            "2025-06-09": {
                "filmy": [
                    "Nowokaina",
                    "Przyjmij/Odrzuc",
                    "Ostatnia Rodzina",
                    "Until Down",
                    "Thunderbolts",
                    "Bogini Partenope"
                ],
                "godziny": [
                    "11:00",
                    "12:00",
                    "15:00",
                    "20:00"
                ]
            },
            "2025-06-10": {
                "filmy": [
                    "Legenda Ochi",
                    "Skrzyzowanie",
                    "The Last Showgirl",
                    "Until Down",
                    "Katyn",
                    "Ksiegowy 2"
                ],
                "godziny": [
                    "14:00",
                    "16:00",
                    "17:00",
                    "22:00"
                ]
            },
            "2025-06-11": {
                "filmy": [
                    "The Last Showgirl",
                    "Ida",
                    "Boze Cialo",
                    "Legenda Ochi",
                    "Kler",
                    "Nowokaina"
                ],
                "godziny": [
                    "12:00",
                    "17:00",
                    "18:00",
                    "21:00"
                ]
            },
            "2025-06-12": {
                "filmy": [
                    "Ksiegowy 2",
                    "Until Down",
                    "Grzesznicy",
                    "Amator",
                    "Mullholand Drive",
                    "Katyn"
                ],
                "godziny": [
                    "11:00",
                    "15:00",
                    "17:00",
                    "19:00"
                ]
            },
            "2025-06-13": {
                "filmy": [
                    "Boze Cialo",
                    "Oszukac Przeznaczenie",
                    "Legenda Ochi",
                    "Thunderbolts",
                    "The Last Showgirl",
                    "Bogini Partenope"
                ],
                "godziny": [
                    "13:00",
                    "18:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-14": {
                "filmy": [
                    "Przyjmij/Odrzuc",
                    "Ida",
                    "Ksiegowy 2",
                    "Skrzyzowanie",
                    "Ostatnia Rodzina",
                    "The Last Showgirl"
                ],
                "godziny": [
                    "14:00",
                    "16:00",
                    "18:00",
                    "19:00"
                ]
            },
            "2025-06-15": {
                "filmy": [
                    "Legenda Ochi",
                    "Amator",
                    "Mullholand Drive",
                    "Ostatnia Rodzina",
                    "Minecraft",
                    "Kler"
                ],
                "godziny": [
                    "16:00",
                    "18:00",
                    "20:00",
                    "22:00"
                ]
            }
        }
    },
    "Katowice": {
        "daty": {
            "2025-05-31": {
                "filmy": [
                    "Grzesznicy",
                    "Bogowie",
                    "Snow Must Go On",
                    "The Last Showgirl",
                    "Bezczenny Pakunek",
                    "Nowokaina"
                ],
                "godziny": [
                    "14:00",
                    "16:00",
                    "19:00",
                    "22:00"
                ]
            },
            "2025-06-01": {
                "filmy": [
                    "Skrzyzowanie",
                    "Bogini Partenope",
                    "Snow Must Go On",
                    "Mullholand Drive",
                    "Minecraft",
                    "Katyn"
                ],
                "godziny": [
                    "11:00",
                    "14:00",
                    "18:00",
                    "22:00"
                ]
            },
            "2025-06-02": {
                "filmy": [
                    "Ksiegowy 2",
                    "Bogini Partenope",
                    "Grzesznicy",
                    "Nowokaina",
                    "Amator",
                    "Mullholand Drive"
                ],
                "godziny": [
                    "15:00",
                    "16:00",
                    "17:00",
                    "22:00"
                ]
            },
            "2025-06-03": {
                "filmy": [
                    "Ida",
                    "Bogini Partenope",
                    "Katyn",
                    "Nowokaina",
                    "Amator",
                    "Skrzyzowanie"
                ],
                "godziny": [
                    "13:00",
                    "15:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-04": {
                "filmy": [
                    "Legenda Ochi",
                    "Boze Cialo",
                    "Kler",
                    "Ksiegowy 2",
                    "Bezczenny Pakunek",
                    "Ostatnia Rodzina"
                ],
                "godziny": [
                    "15:00",
                    "17:00",
                    "18:00",
                    "21:00"
                ]
            },
            "2025-06-05": {
                "filmy": [
                    "Minecraft",
                    "Przyjmij/Odrzuc",
                    "Skrzyzowanie",
                    "Ostatnia Rodzina",
                    "Mullholand Drive",
                    "Kler"
                ],
                "godziny": [
                    "11:00",
                    "17:00",
                    "21:00",
                    "22:00"
                ]
            },
            "2025-06-06": {
                "filmy": [
                    "Minecraft",
                    "Przyjmij/Odrzuc",
                    "Kler",
                    "Fachowiec",
                    "Katyn",
                    "Snow Must Go On"
                ],
                "godziny": [
                    "13:00",
                    "16:00",
                    "17:00",
                    "22:00"
                ]
            },
            "2025-06-07": {
                "filmy": [
                    "Bogini Partenope",
                    "Boze Cialo",
                    "Katyn",
                    "Grzesznicy",
                    "The Last Showgirl",
                    "Thunderbolts"
                ],
                "godziny": [
                    "12:00",
                    "14:00",
                    "16:00",
                    "20:00"
                ]
            },
            "2025-06-08": {
                "filmy": [
                    "Bogini Partenope",
                    "Bogowie",
                    "Mullholand Drive",
                    "Przyjmij/Odrzuc",
                    "Boze Cialo",
                    "Legenda Ochi"
                ],
                "godziny": [
                    "11:00",
                    "15:00",
                    "17:00",
                    "22:00"
                ]
            },
            "2025-06-09": {
                "filmy": [
                    "Legenda Ochi",
                    "Minecraft",
                    "Przyjmij/Odrzuc",
                    "Nowokaina",
                    "Mullholand Drive",
                    "Fachowiec"
                ],
                "godziny": [
                    "12:00",
                    "13:00",
                    "15:00",
                    "22:00"
                ]
            },
            "2025-06-10": {
                "filmy": [
                    "Oszukac Przeznaczenie",
                    "Skrzyzowanie",
                    "Legenda Ochi",
                    "Fachowiec",
                    "Ida",
                    "Snow Must Go On"
                ],
                "godziny": [
                    "12:00",
                    "13:00",
                    "16:00",
                    "21:00"
                ]
            },
            "2025-06-11": {
                "filmy": [
                    "Snow Must Go On",
                    "Nowokaina",
                    "Legenda Ochi",
                    "Amator",
                    "Przyjmij/Odrzuc",
                    "Skrzyzowanie"
                ],
                "godziny": [
                    "13:00",
                    "14:00",
                    "16:00",
                    "20:00"
                ]
            },
            "2025-06-12": {
                "filmy": [
                    "Mullholand Drive",
                    "Legenda Ochi",
                    "Skrzyzowanie",
                    "Nowokaina",
                    "Amator",
                    "Bezczenny Pakunek"
                ],
                "godziny": [
                    "19:00",
                    "20:00",
                    "21:00",
                    "22:00"
                ]
            },
            "2025-06-13": {
                "filmy": [
                    "Skrzyzowanie",
                    "Boze Cialo",
                    "Fachowiec",
                    "Bogini Partenope",
                    "Ida",
                    "Oszukac Przeznaczenie"
                ],
                "godziny": [
                    "11:00",
                    "20:00",
                    "21:00",
                    "22:00"
                ]
            },
            "2025-06-14": {
                "filmy": [
                    "Ida",
                    "Skrzyzowanie",
                    "Amator",
                    "Bogini Partenope",
                    "Bezczenny Pakunek",
                    "Boze Cialo"
                ],
                "godziny": [
                    "14:00",
                    "16:00",
                    "18:00",
                    "21:00"
                ]
            },
            "2025-06-15": {
                "filmy": [
                    "Skrzyzowanie",
                    "Ostatnia Rodzina",
                    "Oszukac Przeznaczenie",
                    "Bogini Partenope",
                    "Legenda Ochi",
                    "Grzesznicy"
                ],
                "godziny": [
                    "12:00",
                    "16:00",
                    "17:00",
                    "19:00"
                ]
            }
        }
    },
    "Lublin": {
        "daty": {
            "2025-05-31": {
                "filmy": [
                    "Ida",
                    "Bezczenny Pakunek",
                    "Kler",
                    "Przyjmij/Odrzuc",
                    "Minecraft",
                    "Snow Must Go On"
                ],
                "godziny": [
                    "12:00",
                    "13:00",
                    "14:00",
                    "19:00"
                ]
            },
            "2025-06-01": {
                "filmy": [
                    "Mullholand Drive",
                    "Oszukac Przeznaczenie",
                    "Przyjmij/Odrzuc",
                    "Kler",
                    "Bogowie",
                    "Ida"
                ],
                "godziny": [
                    "12:00",
                    "15:00",
                    "17:00",
                    "21:00"
                ]
            },
            "2025-06-02": {
                "filmy": [
                    "Nowokaina",
                    "Bezczenny Pakunek",
                    "Bogowie",
                    "Fachowiec",
                    "Oszukac Przeznaczenie",
                    "Thunderbolts"
                ],
                "godziny": [
                    "17:00",
                    "20:00",
                    "21:00",
                    "22:00"
                ]
            },
            "2025-06-03": {
                "filmy": [
                    "Skrzyzowanie",
                    "Fachowiec",
                    "Ida",
                    "Snow Must Go On",
                    "Przyjmij/Odrzuc",
                    "Amator"
                ],
                "godziny": [
                    "11:00",
                    "12:00",
                    "15:00",
                    "17:00"
                ]
            },
            "2025-06-04": {
                "filmy": [
                    "Legenda Ochi",
                    "Mullholand Drive",
                    "Minecraft",
                    "Kler",
                    "Ksiegowy 2",
                    "Ostatnia Rodzina"
                ],
                "godziny": [
                    "11:00",
                    "14:00",
                    "20:00",
                    "22:00"
                ]
            },
            "2025-06-05": {
                "filmy": [
                    "Bogini Partenope",
                    "Until Down",
                    "Amator",
                    "Ksiegowy 2",
                    "Kler",
                    "Przyjmij/Odrzuc"
                ],
                "godziny": [
                    "13:00",
                    "16:00",
                    "20:00",
                    "22:00"
                ]
            },
            "2025-06-06": {
                "filmy": [
                    "Skrzyzowanie",
                    "Katyn",
                    "Ida",
                    "Minecraft",
                    "Bezczenny Pakunek",
                    "Legenda Ochi"
                ],
                "godziny": [
                    "18:00",
                    "19:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-07": {
                "filmy": [
                    "Grzesznicy",
                    "Ksiegowy 2",
                    "Bogowie",
                    "Minecraft",
                    "Mullholand Drive",
                    "Oszukac Przeznaczenie"
                ],
                "godziny": [
                    "11:00",
                    "15:00",
                    "16:00",
                    "17:00"
                ]
            },
            "2025-06-08": {
                "filmy": [
                    "Skrzyzowanie",
                    "Bezczenny Pakunek",
                    "Ksiegowy 2",
                    "Bogini Partenope",
                    "Bogowie",
                    "Mullholand Drive"
                ],
                "godziny": [
                    "17:00",
                    "19:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-09": {
                "filmy": [
                    "Nowokaina",
                    "Boze Cialo",
                    "Grzesznicy",
                    "Kler",
                    "Mullholand Drive",
                    "Legenda Ochi"
                ],
                "godziny": [
                    "13:00",
                    "14:00",
                    "16:00",
                    "21:00"
                ]
            },
            "2025-06-10": {
                "filmy": [
                    "Grzesznicy",
                    "Bogowie",
                    "Legenda Ochi",
                    "Thunderbolts",
                    "Kler",
                    "Katyn"
                ],
                "godziny": [
                    "13:00",
                    "16:00",
                    "18:00",
                    "20:00"
                ]
            },
            "2025-06-11": {
                "filmy": [
                    "Skrzyzowanie",
                    "Przyjmij/Odrzuc",
                    "Ida",
                    "Katyn",
                    "Mullholand Drive",
                    "Oszukac Przeznaczenie"
                ],
                "godziny": [
                    "11:00",
                    "14:00",
                    "20:00",
                    "22:00"
                ]
            },
            "2025-06-12": {
                "filmy": [
                    "Ksiegowy 2",
                    "Grzesznicy",
                    "Ida",
                    "Snow Must Go On",
                    "Boze Cialo",
                    "Amator"
                ],
                "godziny": [
                    "13:00",
                    "15:00",
                    "21:00",
                    "22:00"
                ]
            },
            "2025-06-13": {
                "filmy": [
                    "Ostatnia Rodzina",
                    "Nowokaina",
                    "Minecraft",
                    "Oszukac Przeznaczenie",
                    "The Last Showgirl",
                    "Fachowiec"
                ],
                "godziny": [
                    "11:00",
                    "14:00",
                    "17:00",
                    "22:00"
                ]
            },
            "2025-06-14": {
                "filmy": [
                    "Amator",
                    "Ostatnia Rodzina",
                    "Thunderbolts",
                    "Boze Cialo",
                    "Ida",
                    "Bogini Partenope"
                ],
                "godziny": [
                    "11:00",
                    "12:00",
                    "15:00",
                    "18:00"
                ]
            },
            "2025-06-15": {
                "filmy": [
                    "Katyn",
                    "Minecraft",
                    "Bogini Partenope",
                    "Snow Must Go On",
                    "Bezczenny Pakunek",
                    "Mullholand Drive"
                ],
                "godziny": [
                    "14:00",
                    "18:00",
                    "19:00",
                    "20:00"
                ]
            }
        }
    },
    "Gdańsk": {
        "daty": {
            "2025-05-31": {
                "filmy": [
                    "Katyn",
                    "Kler",
                    "Amator",
                    "Grzesznicy",
                    "Bogowie",
                    "Skrzyzowanie"
                ],
                "godziny": [
                    "14:00",
                    "15:00",
                    "17:00",
                    "22:00"
                ]
            },
            "2025-06-01": {
                "filmy": [
                    "Bogowie",
                    "Snow Must Go On",
                    "Oszukac Przeznaczenie",
                    "Skrzyzowanie",
                    "The Last Showgirl",
                    "Przyjmij/Odrzuc"
                ],
                "godziny": [
                    "11:00",
                    "16:00",
                    "17:00",
                    "19:00"
                ]
            },
            "2025-06-02": {
                "filmy": [
                    "Ostatnia Rodzina",
                    "Thunderbolts",
                    "Legenda Ochi",
                    "Bogini Partenope",
                    "Skrzyzowanie",
                    "Przyjmij/Odrzuc"
                ],
                "godziny": [
                    "11:00",
                    "19:00",
                    "20:00",
                    "22:00"
                ]
            },
            "2025-06-03": {
                "filmy": [
                    "Ida",
                    "Bogowie",
                    "Oszukac Przeznaczenie",
                    "Ksiegowy 2",
                    "Fachowiec",
                    "Mullholand Drive"
                ],
                "godziny": [
                    "14:00",
                    "17:00",
                    "19:00",
                    "21:00"
                ]
            },
            "2025-06-04": {
                "filmy": [
                    "Until Down",
                    "Bogowie",
                    "Ida",
                    "Ksiegowy 2",
                    "The Last Showgirl",
                    "Fachowiec"
                ],
                "godziny": [
                    "12:00",
                    "13:00",
                    "16:00",
                    "21:00"
                ]
            },
            "2025-06-05": {
                "filmy": [
                    "Bogini Partenope",
                    "Katyn",
                    "The Last Showgirl",
                    "Bezczenny Pakunek",
                    "Ostatnia Rodzina",
                    "Until Down"
                ],
                "godziny": [
                    "11:00",
                    "18:00",
                    "20:00",
                    "22:00"
                ]
            },
            "2025-06-06": {
                "filmy": [
                    "Boze Cialo",
                    "Bogowie",
                    "Przyjmij/Odrzuc",
                    "Mullholand Drive",
                    "Minecraft",
                    "Thunderbolts"
                ],
                "godziny": [
                    "14:00",
                    "15:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-07": {
                "filmy": [
                    "Katyn",
                    "Grzesznicy",
                    "Kler",
                    "Przyjmij/Odrzuc",
                    "Minecraft",
                    "The Last Showgirl"
                ],
                "godziny": [
                    "15:00",
                    "18:00",
                    "19:00",
                    "22:00"
                ]
            },
            "2025-06-08": {
                "filmy": [
                    "Skrzyzowanie",
                    "Snow Must Go On",
                    "Until Down",
                    "Boze Cialo",
                    "Przyjmij/Odrzuc",
                    "Bogini Partenope"
                ],
                "godziny": [
                    "13:00",
                    "14:00",
                    "18:00",
                    "20:00"
                ]
            },
            "2025-06-09": {
                "filmy": [
                    "Oszukac Przeznaczenie",
                    "Ostatnia Rodzina",
                    "Bogowie",
                    "Snow Must Go On",
                    "Skrzyzowanie",
                    "Ksiegowy 2"
                ],
                "godziny": [
                    "12:00",
                    "13:00",
                    "17:00",
                    "19:00"
                ]
            },
            "2025-06-10": {
                "filmy": [
                    "Fachowiec",
                    "Minecraft",
                    "Katyn",
                    "Oszukac Przeznaczenie",
                    "Until Down",
                    "Thunderbolts"
                ],
                "godziny": [
                    "16:00",
                    "18:00",
                    "19:00",
                    "21:00"
                ]
            },
            "2025-06-11": {
                "filmy": [
                    "Bezczenny Pakunek",
                    "Nowokaina",
                    "Skrzyzowanie",
                    "Snow Must Go On",
                    "Bogowie",
                    "Until Down"
                ],
                "godziny": [
                    "13:00",
                    "16:00",
                    "17:00",
                    "20:00"
                ]
            },
            "2025-06-12": {
                "filmy": [
                    "Legenda Ochi",
                    "Mullholand Drive",
                    "Skrzyzowanie",
                    "Nowokaina",
                    "Snow Must Go On",
                    "Bogini Partenope"
                ],
                "godziny": [
                    "13:00",
                    "17:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-13": {
                "filmy": [
                    "Nowokaina",
                    "Bezczenny Pakunek",
                    "Skrzyzowanie",
                    "Oszukac Przeznaczenie",
                    "Amator",
                    "Bogowie"
                ],
                "godziny": [
                    "14:00",
                    "17:00",
                    "19:00",
                    "21:00"
                ]
            },
            "2025-06-14": {
                "filmy": [
                    "Amator",
                    "Boze Cialo",
                    "Kler",
                    "Skrzyzowanie",
                    "Until Down",
                    "Minecraft"
                ],
                "godziny": [
                    "16:00",
                    "19:00",
                    "20:00",
                    "22:00"
                ]
            },
            "2025-06-15": {
                "filmy": [
                    "Minecraft",
                    "Bogowie",
                    "Nowokaina",
                    "Legenda Ochi",
                    "Amator",
                    "Ostatnia Rodzina"
                ],
                "godziny": [
                    "11:00",
                    "12:00",
                    "15:00",
                    "18:00"
                ]
            }
        }
    },
    "Białystok": {
        "daty": {
            "2025-05-31": {
                "filmy": [
                    "The Last Showgirl",
                    "Grzesznicy",
                    "Thunderbolts",
                    "Bogini Partenope",
                    "Ksiegowy 2",
                    "Until Down"
                ],
                "godziny": [
                    "13:00",
                    "16:00",
                    "20:00",
                    "22:00"
                ]
            },
            "2025-06-01": {
                "filmy": [
                    "Bezczenny Pakunek",
                    "Legenda Ochi",
                    "Bogini Partenope",
                    "Ostatnia Rodzina",
                    "Ksiegowy 2",
                    "Skrzyzowanie"
                ],
                "godziny": [
                    "15:00",
                    "16:00",
                    "17:00",
                    "21:00"
                ]
            },
            "2025-06-02": {
                "filmy": [
                    "Bezczenny Pakunek",
                    "Until Down",
                    "Bogini Partenope",
                    "Nowokaina",
                    "Amator",
                    "Przyjmij/Odrzuc"
                ],
                "godziny": [
                    "14:00",
                    "16:00",
                    "18:00",
                    "20:00"
                ]
            },
            "2025-06-03": {
                "filmy": [
                    "Legenda Ochi",
                    "Nowokaina",
                    "Mullholand Drive",
                    "Bezczenny Pakunek",
                    "Ostatnia Rodzina",
                    "Boze Cialo"
                ],
                "godziny": [
                    "11:00",
                    "14:00",
                    "15:00",
                    "19:00"
                ]
            },
            "2025-06-04": {
                "filmy": [
                    "Kler",
                    "Mullholand Drive",
                    "Until Down",
                    "Fachowiec",
                    "Ida",
                    "Amator"
                ],
                "godziny": [
                    "11:00",
                    "16:00",
                    "20:00",
                    "21:00"
                ]
            },
            "2025-06-05": {
                "filmy": [
                    "Amator",
                    "Thunderbolts",
                    "Bogowie",
                    "Bogini Partenope",
                    "Skrzyzowanie",
                    "Oszukac Przeznaczenie"
                ],
                "godziny": [
                    "12:00",
                    "15:00",
                    "21:00",
                    "22:00"
                ]
            },
            "2025-06-06": {
                "filmy": [
                    "Ostatnia Rodzina",
                    "Amator",
                    "Ksiegowy 2",
                    "Legenda Ochi",
                    "Kler",
                    "Przyjmij/Odrzuc"
                ],
                "godziny": [
                    "11:00",
                    "17:00",
                    "19:00",
                    "20:00"
                ]
            },
            "2025-06-07": {
                "filmy": [
                    "Legenda Ochi",
                    "Ksiegowy 2",
                    "Mullholand Drive",
                    "Skrzyzowanie",
                    "Bezczenny Pakunek",
                    "Minecraft"
                ],
                "godziny": [
                    "14:00",
                    "16:00",
                    "19:00",
                    "20:00"
                ]
            },
            "2025-06-08": {
                "filmy": [
                    "Katyn",
                    "Snow Must Go On",
                    "Oszukac Przeznaczenie",
                    "Grzesznicy",
                    "Nowokaina",
                    "The Last Showgirl"
                ],
                "godziny": [
                    "13:00",
                    "17:00",
                    "18:00",
                    "20:00"
                ]
            },
            "2025-06-09": {
                "filmy": [
                    "Snow Must Go On",
                    "Until Down",
                    "Mullholand Drive",
                    "Fachowiec",
                    "The Last Showgirl",
                    "Ida"
                ],
                "godziny": [
                    "11:00",
                    "17:00",
                    "18:00",
                    "22:00"
                ]
            },
            "2025-06-10": {
                "filmy": [
                    "Oszukac Przeznaczenie",
                    "Ksiegowy 2",
                    "Grzesznicy",
                    "Bezczenny Pakunek",
                    "The Last Showgirl",
                    "Legenda Ochi"
                ],
                "godziny": [
                    "11:00",
                    "13:00",
                    "14:00",
                    "15:00"
                ]
            },
            "2025-06-11": {
                "filmy": [
                    "Katyn",
                    "Until Down",
                    "Ksiegowy 2",
                    "Thunderbolts",
                    "Ostatnia Rodzina",
                    "Oszukac Przeznaczenie"
                ],
                "godziny": [
                    "13:00",
                    "14:00",
                    "17:00",
                    "21:00"
                ]
            },
            "2025-06-12": {
                "filmy": [
                    "Bogowie",
                    "Fachowiec",
                    "Kler",
                    "Skrzyzowanie",
                    "Grzesznicy",
                    "Thunderbolts"
                ],
                "godziny": [
                    "14:00",
                    "16:00",
                    "20:00",
                    "22:00"
                ]
            },
            "2025-06-13": {
                "filmy": [
                    "Until Down",
                    "Ostatnia Rodzina",
                    "Legenda Ochi",
                    "Snow Must Go On",
                    "The Last Showgirl",
                    "Bogowie"
                ],
                "godziny": [
                    "11:00",
                    "12:00",
                    "13:00",
                    "21:00"
                ]
            },
            "2025-06-14": {
                "filmy": [
                    "Bogini Partenope",
                    "Oszukac Przeznaczenie",
                    "The Last Showgirl",
                    "Ida",
                    "Grzesznicy",
                    "Katyn"
                ],
                "godziny": [
                    "11:00",
                    "15:00",
                    "16:00",
                    "19:00"
                ]
            },
            "2025-06-15": {
                "filmy": [
                    "Bogini Partenope",
                    "Ida",
                    "Grzesznicy",
                    "Snow Must Go On",
                    "Legenda Ochi",
                    "Katyn"
                ],
                "godziny": [
                    "12:00",
                    "15:00",
                    "16:00",
                    "18:00"
                ]
            }
        }
    },
    "Rzeszów": {
        "daty": {
            "2025-05-31": {
                "filmy": [
                    "Until Down",
                    "Ida",
                    "Snow Must Go On",
                    "Nowokaina",
                    "Grzesznicy",
                    "Boze Cialo"
                ],
                "godziny": [
                    "12:00",
                    "13:00",
                    "20:00",
                    "22:00"
                ]
            },
            "2025-06-01": {
                "filmy": [
                    "Oszukac Przeznaczenie",
                    "Katyn",
                    "Bogowie",
                    "Mullholand Drive",
                    "Boze Cialo",
                    "Legenda Ochi"
                ],
                "godziny": [
                    "11:00",
                    "13:00",
                    "19:00",
                    "22:00"
                ]
            },
            "2025-06-02": {
                "filmy": [
                    "Mullholand Drive",
                    "Snow Must Go On",
                    "Oszukac Przeznaczenie",
                    "Przyjmij/Odrzuc",
                    "Grzesznicy",
                    "Bogowie"
                ],
                "godziny": [
                    "11:00",
                    "13:00",
                    "15:00",
                    "22:00"
                ]
            },
            "2025-06-03": {
                "filmy": [
                    "The Last Showgirl",
                    "Nowokaina",
                    "Mullholand Drive",
                    "Kler",
                    "Amator",
                    "Przyjmij/Odrzuc"
                ],
                "godziny": [
                    "11:00",
                    "13:00",
                    "16:00",
                    "19:00"
                ]
            },
            "2025-06-04": {
                "filmy": [
                    "Mullholand Drive",
                    "Thunderbolts",
                    "Fachowiec",
                    "Grzesznicy",
                    "Boze Cialo",
                    "Katyn"
                ],
                "godziny": [
                    "16:00",
                    "17:00",
                    "18:00",
                    "20:00"
                ]
            },
            "2025-06-05": {
                "filmy": [
                    "Ostatnia Rodzina",
                    "Until Down",
                    "Grzesznicy",
                    "Minecraft",
                    "Przyjmij/Odrzuc",
                    "Snow Must Go On"
                ],
                "godziny": [
                    "14:00",
                    "15:00",
                    "18:00",
                    "20:00"
                ]
            },
            "2025-06-06": {
                "filmy": [
                    "Kler",
                    "Ida",
                    "Oszukac Przeznaczenie",
                    "Katyn",
                    "Boze Cialo",
                    "The Last Showgirl"
                ],
                "godziny": [
                    "13:00",
                    "15:00",
                    "17:00",
                    "19:00"
                ]
            },
            "2025-06-07": {
                "filmy": [
                    "Minecraft",
                    "Snow Must Go On",
                    "Legenda Ochi",
                    "Ida",
                    "Bogini Partenope",
                    "Bezczenny Pakunek"
                ],
                "godziny": [
                    "12:00",
                    "14:00",
                    "15:00",
                    "21:00"
                ]
            },
            "2025-06-08": {
                "filmy": [
                    "Bezczenny Pakunek",
                    "Amator",
                    "Ostatnia Rodzina",
                    "Oszukac Przeznaczenie",
                    "Mullholand Drive",
                    "Fachowiec"
                ],
                "godziny": [
                    "11:00",
                    "13:00",
                    "14:00",
                    "15:00"
                ]
            },
            "2025-06-09": {
                "filmy": [
                    "Skrzyzowanie",
                    "Bogowie",
                    "Thunderbolts",
                    "Amator",
                    "Grzesznicy",
                    "Oszukac Przeznaczenie"
                ],
                "godziny": [
                    "12:00",
                    "13:00",
                    "16:00",
                    "17:00"
                ]
            },
            "2025-06-10": {
                "filmy": [
                    "Kler",
                    "Fachowiec",
                    "Thunderbolts",
                    "Mullholand Drive",
                    "Minecraft",
                    "Boze Cialo"
                ],
                "godziny": [
                    "14:00",
                    "17:00",
                    "20:00",
                    "22:00"
                ]
            },
            "2025-06-11": {
                "filmy": [
                    "Przyjmij/Odrzuc",
                    "Skrzyzowanie",
                    "Minecraft",
                    "Oszukac Przeznaczenie",
                    "Ostatnia Rodzina",
                    "Bezczenny Pakunek"
                ],
                "godziny": [
                    "12:00",
                    "14:00",
                    "19:00",
                    "22:00"
                ]
            },
            "2025-06-12": {
                "filmy": [
                    "Katyn",
                    "Kler",
                    "Bezczenny Pakunek",
                    "Snow Must Go On",
                    "Amator",
                    "Przyjmij/Odrzuc"
                ],
                "godziny": [
                    "14:00",
                    "17:00",
                    "19:00",
                    "20:00"
                ]
            },
            "2025-06-13": {
                "filmy": [
                    "Przyjmij/Odrzuc",
                    "Fachowiec",
                    "Minecraft",
                    "Mullholand Drive",
                    "Bezczenny Pakunek",
                    "Until Down"
                ],
                "godziny": [
                    "15:00",
                    "19:00",
                    "21:00",
                    "22:00"
                ]
            },
            "2025-06-14": {
                "filmy": [
                    "Ostatnia Rodzina",
                    "Kler",
                    "Legenda Ochi",
                    "Fachowiec",
                    "Boze Cialo",
                    "Katyn"
                ],
                "godziny": [
                    "11:00",
                    "12:00",
                    "16:00",
                    "21:00"
                ]
            },
            "2025-06-15": {
                "filmy": [
                    "Skrzyzowanie",
                    "Przyjmij/Odrzuc",
                    "Ostatnia Rodzina",
                    "Ida",
                    "Until Down",
                    "Nowokaina"
                ],
                "godziny": [
                    "11:00",
                    "15:00",
                    "17:00",
                    "20:00"
                ]
            }
        }
    }
}

export default function BuyTicketButton() {
    const [showForm, setShowForm] = useState(false);
    const [selectedKino, setSelectedKino] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedFilm, setSelectedFilm] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const navigate = useNavigate();

    const kina = Object.keys(kinoData);
    const daty = selectedKino ? Object.keys(kinoData[selectedKino].daty) : [];
    const filmy = selectedKino && selectedDate ? kinoData[selectedKino].daty[selectedDate]?.filmy || [] : [];
    const godziny = selectedKino && selectedDate ? kinoData[selectedKino].daty[selectedDate]?.godziny || [] : [];

    return (
        <>
            <div className="floating-zakup-btn" onClick={() => setShowForm(true)}>
                <Button variant="danger" className="button-kupbilet rounded-pill d-flex align-items-center px-4 py-3 gap-2">
                    <i className="bi bi-cart3 fs-4"></i>
                    <span className="fw-bold">KUP BILET</span>
                </Button>
            </div>

            <Offcanvas
                show={showForm}
                onHide={() => setShowForm(false)}
                placement="end"
                className="offcanvas-custom"
                scroll={true}
                backdrop={true}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="szybkiZakupMobile">Szybki zakup</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Kino</Form.Label>
                            <Form.Select value={selectedKino} onChange={(e) => {
                                setSelectedKino(e.target.value);
                                setSelectedDate('');
                                setSelectedFilm('');
                                setSelectedTime('');
                            }}>
                                <option value="">Wybierz kino</option>
                                {kina.map(k => <option key={k}>{k}</option>)}
                            </Form.Select>
                        </Form.Group>

                        {selectedKino && (
                            <Form.Group className="mb-3">
                                <Form.Label>Data</Form.Label>
                                <Form.Select value={selectedDate} onChange={(e) => {
                                    setSelectedDate(e.target.value);
                                    setSelectedFilm('');
                                    setSelectedTime('');
                                }}>
                                    <option value="">Wybierz datę</option>
                                    {daty.map(d => <option key={d}>{d}</option>)}
                                </Form.Select>
                            </Form.Group>
                        )}

                        {selectedDate && filmy.length > 0 && (
                            <Form.Group className="mb-3">
                                <Form.Label>Film</Form.Label>
                                <Form.Select value={selectedFilm} onChange={(e) => setSelectedFilm(e.target.value)}>
                                    <option value="">Wybierz film</option>
                                    {filmy.map(f => <option key={f}>{f}</option>)}
                                </Form.Select>
                            </Form.Group>
                        )}

                        {selectedFilm && godziny.length > 0 && (
                            <Form.Group className="mb-3">
                                <Form.Label>Godzina</Form.Label>
                                <Form.Select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                                    <option value="">Wybierz godzinę</option>
                                    {godziny.map(g => <option key={g}>{g}</option>)}
                                </Form.Select>
                            </Form.Group>
                        )}

                        <div className="d-flex justify-content-end">
                            <Button variant="outline-secondary" className="me-2" onClick={() => {
                                setSelectedKino('');
                                setSelectedFilm('');
                                setSelectedDate('');
                                setSelectedTime('');
                            }}>Reset</Button>
                            <Button
                                variant="primary"
                                disabled={!(selectedKino && selectedFilm && selectedDate && selectedTime)}
                                onClick={() => {
                                    navigate('/wybor-miejsca', {
                                        state: {
                                            kino: selectedKino,
                                            data: selectedDate,
                                            film: selectedFilm,
                                            godzina: selectedTime
                                        }
                                    });
                                }}
                            >
                                Szukaj
                            </Button>
                        </div>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}