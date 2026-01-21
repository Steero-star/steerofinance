export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export const popularCurrencies = ["EUR", "USD", "GBP", "CHF", "CAD"];

export function getCountries(): Country[] {
  return [
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "BE", name: "Belgique", flag: "🇧🇪" },
    { code: "CH", name: "Suisse", flag: "🇨🇭" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "LU", name: "Luxembourg", flag: "🇱🇺" },
    { code: "MC", name: "Monaco", flag: "🇲🇨" },
    { code: "ES", name: "Espagne", flag: "🇪🇸" },
    { code: "PT", name: "Portugal", flag: "🇵🇹" },
    { code: "IT", name: "Italie", flag: "🇮🇹" },
    { code: "DE", name: "Allemagne", flag: "🇩🇪" },
    { code: "GB", name: "Royaume-Uni", flag: "🇬🇧" },
    { code: "US", name: "États-Unis", flag: "🇺🇸" },
    { code: "NL", name: "Pays-Bas", flag: "🇳🇱" },
    { code: "AT", name: "Autriche", flag: "🇦🇹" },
    { code: "IE", name: "Irlande", flag: "🇮🇪" },
    { code: "SE", name: "Suède", flag: "🇸🇪" },
    { code: "DK", name: "Danemark", flag: "🇩🇰" },
    { code: "NO", name: "Norvège", flag: "🇳🇴" },
    { code: "FI", name: "Finlande", flag: "🇫🇮" },
    { code: "PL", name: "Pologne", flag: "🇵🇱" },
    { code: "CZ", name: "République tchèque", flag: "🇨🇿" },
    { code: "GR", name: "Grèce", flag: "🇬🇷" },
    { code: "RO", name: "Roumanie", flag: "🇷🇴" },
    { code: "HU", name: "Hongrie", flag: "🇭🇺" },
    { code: "BG", name: "Bulgarie", flag: "🇧🇬" },
    { code: "HR", name: "Croatie", flag: "🇭🇷" },
    { code: "SK", name: "Slovaquie", flag: "🇸🇰" },
    { code: "SI", name: "Slovénie", flag: "🇸🇮" },
    { code: "EE", name: "Estonie", flag: "🇪🇪" },
    { code: "LV", name: "Lettonie", flag: "🇱🇻" },
    { code: "LT", name: "Lituanie", flag: "🇱🇹" },
    { code: "MT", name: "Malte", flag: "🇲🇹" },
    { code: "CY", name: "Chypre", flag: "🇨🇾" },
    { code: "MA", name: "Maroc", flag: "🇲🇦" },
    { code: "TN", name: "Tunisie", flag: "🇹🇳" },
    { code: "DZ", name: "Algérie", flag: "🇩🇿" },
    { code: "SN", name: "Sénégal", flag: "🇸🇳" },
    { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮" },
    { code: "CM", name: "Cameroun", flag: "🇨🇲" },
    { code: "MX", name: "Mexique", flag: "🇲🇽" },
    { code: "BR", name: "Brésil", flag: "🇧🇷" },
    { code: "AR", name: "Argentine", flag: "🇦🇷" },
    { code: "CO", name: "Colombie", flag: "🇨🇴" },
    { code: "CL", name: "Chili", flag: "🇨🇱" },
    { code: "PE", name: "Pérou", flag: "🇵🇪" },
    { code: "JP", name: "Japon", flag: "🇯🇵" },
    { code: "AU", name: "Australie", flag: "🇦🇺" },
    { code: "NZ", name: "Nouvelle-Zélande", flag: "🇳🇿" },
  ];
}

export function getCurrencies(): Currency[] {
  return [
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "USD", name: "Dollar américain", symbol: "$" },
    { code: "GBP", name: "Livre sterling", symbol: "£" },
    { code: "CHF", name: "Franc suisse", symbol: "CHF" },
    { code: "CAD", name: "Dollar canadien", symbol: "CA$" },
    { code: "AUD", name: "Dollar australien", symbol: "A$" },
    { code: "JPY", name: "Yen japonais", symbol: "¥" },
    { code: "SEK", name: "Couronne suédoise", symbol: "kr" },
    { code: "NOK", name: "Couronne norvégienne", symbol: "kr" },
    { code: "DKK", name: "Couronne danoise", symbol: "kr" },
    { code: "PLN", name: "Zloty polonais", symbol: "zł" },
    { code: "CZK", name: "Couronne tchèque", symbol: "Kč" },
    { code: "HUF", name: "Forint hongrois", symbol: "Ft" },
    { code: "RON", name: "Leu roumain", symbol: "lei" },
    { code: "BGN", name: "Lev bulgare", symbol: "лв" },
    { code: "HRK", name: "Kuna croate", symbol: "kn" },
    { code: "MAD", name: "Dirham marocain", symbol: "د.م." },
    { code: "TND", name: "Dinar tunisien", symbol: "د.ت" },
    { code: "DZD", name: "Dinar algérien", symbol: "د.ج" },
    { code: "XOF", name: "Franc CFA (BCEAO)", symbol: "CFA" },
    { code: "XAF", name: "Franc CFA (BEAC)", symbol: "FCFA" },
    { code: "MXN", name: "Peso mexicain", symbol: "MX$" },
    { code: "BRL", name: "Réal brésilien", symbol: "R$" },
    { code: "ARS", name: "Peso argentin", symbol: "AR$" },
    { code: "COP", name: "Peso colombien", symbol: "CO$" },
    { code: "CLP", name: "Peso chilien", symbol: "CL$" },
    { code: "PEN", name: "Sol péruvien", symbol: "S/" },
    { code: "NZD", name: "Dollar néo-zélandais", symbol: "NZ$" },
  ];
}
