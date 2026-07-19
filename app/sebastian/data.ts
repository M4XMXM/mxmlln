// Content extracted from sebastianpiras.com (Wix) on 2026-07-13.
// Images are hotlinked from static.wixstatic.com for now; download and
// self-host before this becomes a real standalone site.

export type Photo = {
  title: string;
  uri: string;
  w: number;
  h: number;
};

export type Section = {
  slug: string;
  title: string;
  originalPath: string;
  thumb: string;
  photos: Photo[];
};

export function wixImage(uri: string, width = 1600): string {
  return `https://static.wixstatic.com/media/${uri}/v1/fit/w_${width},h_${width},q_85/image.jpg`;
}

export function wixThumb(uri: string, w: number, h: number): string {
  return `https://static.wixstatic.com/media/${uri}/v1/fill/w_${w},h_${h},al_c,q_85/image.jpg`;
}

export const sections: Section[] = [
  {
    slug: "artists",
    title: "Artists Portraits",
    originalPath: "/artists-portraits-series",
    thumb: "ebe9bb_d4fa2476ad724c42bded6cbb683a1740.jpg",
    photos: [
      { title: "Andy Warhol", uri: "ebe9bb_62b348f70b6c47b89b5cd39eb8ede397~mv2_d_2200_2956_s_2.png", w: 2200, h: 2956 },
      { title: "James Nares", uri: "56694603a29653714587ef6901a9a9d2.wix_mp", w: 2571, h: 2522 },
      { title: "Richard Prince", uri: "ebe9bb_d4fa2476ad724c42bded6cbb683a1740.jpg", w: 2524, h: 2884 },
      { title: "Marina Abramovich", uri: "af5eef3268fc634fb5048d76edb52640.wix_mp", w: 3872, h: 2592 },
      { title: "Damian Loeb", uri: "ea5779a24fd0738e3d3d666f9abadabd.wix_mp", w: 3872, h: 2592 },
      { title: "Doukopil", uri: "299114c7f604f9218bb0f37cc823c5ab.wix_mp", w: 2448, h: 2302 },
      { title: "Christo", uri: "6d54afda56ecc25478faa2bc0362e26c.wix_mp", w: 2861, h: 3000 },
      { title: "George Segal", uri: "c6cb6c2d9991c60f76c7cd01324e425b.wix_mp", w: 2895, h: 3000 },
      { title: "Elizabeth Neel", uri: "c40e3c997da8be483a5eb83c7e0e13b3.wix_mp", w: 3872, h: 2592 },
      { title: "Robert Rauschenberg", uri: "45df4db849edee209ac5b9d736c8aa72.wix_mp", w: 2281, h: 3000 },
      { title: "Enzo Cucchi", uri: "33b97e8bb189ccfd7d0f1eabb8151464.wix_mp", w: 2986, h: 3000 },
      { title: "Joseph Kosuth", uri: "985f93b414c3e6494ad5fcedba18b479.wix_mp", w: 2976, h: 3000 },
      { title: "Henry Ford", uri: "310e16dd8fba9c1ffbc4697221702cd9.wix_mp", w: 2746, h: 3000 },
      { title: "Louise Bourgeois", uri: "b698e417bfb564d29abb329626dceae6.wix_mp", w: 2484, h: 3000 },
      { title: "Lawrence Weiner", uri: "43e73f601ad3badd130fa3d48a52ed62.wix_mp", w: 2996, h: 3000 },
      { title: "Jasper Jahns", uri: "da33f32184f1be14b1584bdf4f5a5ed7.wix_mp", w: 2886, h: 3000 },
      { title: "Alex Katz", uri: "0f55c148275e39e974149acf0cf1e58b.wix_mp", w: 1286, h: 1263 },
      { title: "Robert Longo", uri: "eb46744017d6275d6df00ad0ac23f865.wix_mp", w: 2996, h: 3000 },
      { title: "Roy Lichetnstein", uri: "41ff0534056b3a0dd2c2f193364168a6.wix_mp", w: 3000, h: 2994 },
      { title: "Julian Schnabel", uri: "6dcbe939e7218d6bfdbba63490a7b229.wix_mp", w: 2878, h: 3000 },
      { title: "Quentin Crisp", uri: "55b6ae3e24c07fc3e9689c68253c8202.wix_mp", w: 1880, h: 3000 },
      { title: "David Diao", uri: "ebe9bb_24356e7787354437a1680fefedb0bef0.png", w: 783, h: 800 },
      { title: "Phillip Taaffe", uri: "9e115364d2a80af01009516afeb9e9b9.wix_mp", w: 2986, h: 3000 },
      { title: "Ross Bleckner", uri: "38003b199de1b379851ec5e4621aa80e.wix_mp", w: 2427, h: 3000 },
      { title: "Damian Hirst", uri: "e650f05b774359ea612204c66d50bde3.wix_mp", w: 3000, h: 2972 },
      { title: "Merce Cunningham", uri: "93f12f01217245696b7b8db020399ecc.wix_mp", w: 527, h: 629 },
      { title: "Ellesworth Kelly", uri: "c706ab368afd905f0deb21897357930e.wix_mp", w: 361, h: 400 },
      { title: "Architect Richard Meier", uri: "ec8f00c63d92408ccbca3779ed9c0811.wix_mp", w: 4256, h: 2832 },
      { title: "Ouattara Watts", uri: "01f64b6a60c5b0e69dbc41522fae003e.wix_mp", w: 597, h: 400 },
      { title: "Milton Resnick", uri: "100a1ffd4f7930570325c95b5db49118.wix_mp", w: 400, h: 400 },
      { title: "Jim Dine", uri: "df0ebb55311e16e9c3b8adf1a03fb9a1.wix_mp", w: 399, h: 400 },
      { title: "Brice Marden", uri: "1bdfef12a57bedeeede76637b7cc6ec7.wix_mp", w: 321, h: 400 },
    ],
  },
  {
    slug: "editorial",
    title: "Mix Moda Editorial",
    originalPath: "/portraits-3",
    thumb: "286de88df02bcec991c37d6cbbfcba22.wix_mp",
    photos: [
      { title: "model 1", uri: "ebe9bb_c8fce8c364924d2984b547139426cbde~mv2.jpg", w: 3482, h: 3482 },
      { title: "model2", uri: "ebe9bb_86eb2c9f9c5e4e019c36ec6db668a941~mv2.jpeg", w: 4096, h: 4096 },
      { title: "_DSC8450.jpg", uri: "ebe9bb_72001a7ff6a84ae6af8dcb029a39ba22~mv2_d_6694_4912_s_4_2.jpg", w: 6694, h: 4912 },
      { title: "ck2", uri: "ebe9bb_40a02f48141c46a4a0f5df2990a0eb7e~mv2.jpg", w: 4912, h: 7360 },
      { title: "Nadia_DSC8491 Sebastian Piras.jpg", uri: "ebe9bb_0199cec9e69b411697c3bc2e1473b6a9~mv2_d_3210_4000_s_4_2.jpg", w: 3210, h: 4000 },
      { title: "ck1", uri: "ebe9bb_fc83a67222a94317b0ec916ff5ee8363~mv2.jpg", w: 4912, h: 7360 },
      { title: "Elliot M", uri: "ebe9bb_98dad555548c421d94939e9eaaac382a.png", w: 1200, h: 1026 },
      { title: "Nadia-8812.jpg", uri: "ebe9bb_9d6b99318ca8438bade9d632fdf40a33~mv2_d_7360_4912_s_4_2.jpg", w: 7360, h: 4912 },
      { title: "Jesse  3", uri: "ebe9bb_7f2962cba0e04d53b526d596c5f9d5c9~mv2_d_4912_7360_s_4_2.jpg", w: 4912, h: 7360 },
      { title: "Jesse", uri: "ebe9bb_ff7748dff6fe4d4a898117d1b7a4b0af~mv2_d_5743_4237_s_4_2.jpg", w: 5743, h: 4237 },
      { title: "B Michel", uri: "ebe9bb_37f2efe1d545405092214dd2de1ddddf.jpg", w: 4912, h: 7116 },
      { title: "B Michel", uri: "ebe9bb_414788755b6940a99843d8712ba09d62.jpg", w: 4912, h: 7097 },
      { title: "CK Sierra slct-9177.jpg", uri: "ebe9bb_2f39275ce4474a119a5f0a9ad6213ea0~mv2_d_4912_7360_s_4_2.jpg", w: 4912, h: 7360 },
      { title: "CK Sierra slct-9340.jpg", uri: "ebe9bb_5c72bcd0d3894ff993c3c3cb230fb394~mv2_d_4912_7360_s_4_2.jpg", w: 4912, h: 7360 },
      { title: "Nadia-8935.jpg", uri: "ebe9bb_dffdcff45eb24654afe7c06253538f12~mv2_d_7360_4912_s_4_2.jpg", w: 7360, h: 4912 },
      { title: "CK Sierra slct-9503.jpg", uri: "ebe9bb_111f8cb9631b4c6d9041244e1adb07f8~mv2_d_4912_7360_s_4_2.jpg", w: 4912, h: 7360 },
      { title: "CK Sierra slct-9465.jpg", uri: "ebe9bb_ab81b026e2f54927859b6cbe8f4d5963~mv2_d_4912_7360_s_4_2.jpg", w: 4912, h: 7360 },
      { title: "CK Sierra slct-9414.jpg", uri: "ebe9bb_9ab935e521b84f6da2d24972ef9f5976~mv2_d_4912_7360_s_4_2.jpg", w: 4912, h: 7360 },
      { title: "CK Sierra slct-9524.jpg", uri: "ebe9bb_ae84ca31a063441a8d2a786ab28e3910~mv2_d_4912_7360_s_4_2.jpg", w: 4912, h: 7360 },
      { title: "CK Sierra slct-9435.jpg", uri: "ebe9bb_3131bc66c78f4948b4c5c5c676e9950c~mv2_d_4454_6342_s_4_2.jpg", w: 4454, h: 6342 },
      { title: "E M 1.jpg", uri: "ebe9bb_42f2985b42e54ebab8d496a0ec1e925b.jpg", w: 7360, h: 4912 },
      { title: "Nancy with CK dress", uri: "ebe9bb_2ae59b948b154b189451164400ec35cd.jpg", w: 4508, h: 7360 },
      { title: "Nancy with CK dress 2", uri: "ebe9bb_3cfe7e7e024f4c4587d2b8f3274f1936.jpg", w: 4912, h: 7360 },
      { title: "Nancy with CK dress 3", uri: "ebe9bb_e38a70532ad646f29d557346b1ac8f5b.jpg", w: 4581, h: 7359 },
      { title: "Nancy with CK dress 4", uri: "ebe9bb_91735382e3bc48f0be5d723291fae419.jpg", w: 4912, h: 7360 },
      { title: "Leah with vintage CK dress", uri: "ebe9bb_f5d499a8c401431d9aac34c3cf75ddbd.jpg", w: 2842, h: 4592 },
      { title: "Elliot M", uri: "ebe9bb_f7b680108f5441c5b6e43a86feb840f0.jpg", w: 4256, h: 2832 },
      { title: "Elliot M", uri: "ebe9bb_963eec9031d345da80d4057fd34ed2a4.png", w: 534, h: 800 },
      { title: "EM", uri: "ebe9bb_ffc386aa933d47eea5e0d9698ffb1bbb.png", w: 1285, h: 857 },
      { title: "Nadia-8580.jpg", uri: "ebe9bb_b981dc6d3d06456d84dbbaff3888b46b~mv2_d_7360_4912_s_4_2.jpg", w: 7360, h: 4912 },
    ],
  },
  {
    slug: "portraits",
    title: "Editorial Portraits",
    originalPath: "/celebrities-portraits",
    thumb: "ebe9bb_1d046c2edbb645f4ade02fa5c3085eb9.jpg",
    photos: [
      { title: "Carey Mulligan", uri: "ebe9bb_4554459a8aca495aa62fe6ebc99ede86.jpg", w: 4912, h: 6556 },
      { title: "Piper Perabo", uri: "ebe9bb_1d046c2edbb645f4ade02fa5c3085eb9.jpg", w: 3872, h: 2592 },
      { title: "Eva Mendes", uri: "ebe9bb_570178c007d544188181bf53515cf89f.jpg", w: 4311, h: 5875 },
      { title: "Alexis Bledel", uri: "ebe9bb_1c8db0cac804413d91c95a1bfcbdadb1.jpg", w: 810, h: 1280 },
      { title: "Rashida Jones", uri: "ebe9bb_52966335266d48dbb7fd077c51d96124.jpg", w: 4348, h: 6552 },
      { title: "Eva Mendes", uri: "ebe9bb_05f3b9e85ff640c8865d4db082eec3f6.jpg", w: 6519, h: 4912 },
      { title: "Norman Reedus", uri: "ebe9bb_059010497e9f47b79fff4ea80e4c8555.jpg", w: 2000, h: 3008 },
      { title: "Giovanni Ribisi", uri: "ebe9bb_e042e0c42eb04e1596096835b3e5e238.jpg", w: 3641, h: 2420 },
      { title: "Michael Shannon", uri: "ebe9bb_c78db4b8e260420fa6d113ca41db3524.jpg", w: 7134, h: 4761 },
      { title: "Busta Rhymes", uri: "ebe9bb_b0861901ab454dc5a0ce9ae5841795fb~mv2_d_3872_2592_s_4_2.jpg", w: 3872, h: 2592 },
      { title: "Heather Graham", uri: "ebe9bb_f7e705b87d314daf8e811c0147ee34ff.jpg", w: 2400, h: 2000 },
      { title: "David Lynch", uri: "ebe9bb_a60a5e9d56a8464ea0896dd4208b24ff.jpg", w: 3008, h: 2000 },
      { title: "Natalie Dormer", uri: "ebe9bb_122764c19bc14f309c37a62627743418~mv2_d_4912_7360_s_4_2.jpg", w: 4912, h: 7360 },
      { title: "Willem Dafoe", uri: "94191bf5619be6329aaeab7a940cb899.wix_mp", w: 297, h: 300 },
      { title: "Paz de la Huerta", uri: "6b615a3200db178695013104cd2e2e72.wix_mp", w: 265, h: 400 },
      { title: "Michael Andrson", uri: "ebe9bb_656fa20def354e3da2483e4459ee45ba.jpg", w: 2702, h: 3865 },
      { title: "Roy Scheider", uri: "ebe9bb_95b2caf03efd47fca20fd7388d54e1d1.png", w: 707, h: 470 },
      { title: "Paloma Faith", uri: "ebe9bb_ff01a59b155f46589795870217a9d7db.jpg", w: 2803, h: 4200 },
      { title: "tommy hilfiger", uri: "aa4f890b30c9fdaf345a0c9b9a88b6d8.wix_mp", w: 399, h: 300 },
      { title: "Tate Donovan", uri: "ebe9bb_7088470dd88d469781ac19af44ad5733.png", w: 767, h: 565 },
      { title: "Giancarlo Esposito", uri: "ebe9bb_b53566bcfe364393bbd98709459cb6d0.jpg", w: 2832, h: 3462 },
      { title: "Lou Reed", uri: "4c1c5fee04fbd47a623e82ba260d2ae8.wix_mp", w: 521, h: 400 },
      { title: "Martha Stewart", uri: "0178f8c973e1a1da3dcc83daf3eb44cf.wix_mp", w: 288, h: 400 },
      { title: "Steven Baldwyn", uri: "ebe9bb_fb3483acccb84c3c80f80ecd08558db6.png", w: 765, h: 565 },
      { title: "Susan Misner", uri: "66f54e137a8d59fcf7dd74d6577ff83a.wix_mp", w: 602, h: 400 },
    ],
  },
  {
    slug: "film-stills",
    title: "Film Stills",
    originalPath: "/grid",
    thumb: "ebe9bb_f72be11a186d4632b4e0c005ad78ce2c.png",
    photos: [
      { title: "8", uri: "ebe9bb_ab8613ce775c43b7823d24dca5f6e77d.png", w: 769, h: 569 },
      { title: "1", uri: "ebe9bb_bbf7289e732e4b5ab41849a750bc45ec.png", w: 771, h: 535 },
      { title: "6", uri: "ebe9bb_babcb4530ca245a2b4c907e016066146.png", w: 705, h: 470 },
      { title: "11", uri: "ebe9bb_f72be11a186d4632b4e0c005ad78ce2c.png", w: 1280, h: 858 },
      { title: "12", uri: "ebe9bb_5873a91a10a443f684443a486ef7d607.png", w: 1373, h: 921 },
      { title: "2a", uri: "ebe9bb_7045d9e15ec245fa91fbd0c47655d6a1.png", w: 1275, h: 854 },
      { title: "2", uri: "ebe9bb_2ad20dc727fa425cb6e5b118031dd812.png", w: 769, h: 567 },
      { title: "3", uri: "ebe9bb_7088470dd88d469781ac19af44ad5733.png", w: 767, h: 565 },
      { title: "4", uri: "ebe9bb_657547af55ec474e8a4803a97dcfd408.png", w: 769, h: 568 },
      { title: "5", uri: "ebe9bb_29d8ff807b144cebbcae6312dc92a2fe.png", w: 768, h: 571 },
      { title: "7", uri: "ebe9bb_ae802ed30de44e81ab3bb71fe0f18126.png", w: 769, h: 568 },
      { title: "9", uri: "ebe9bb_a5759d570b2e4b559d7f2b054c66619c.png", w: 771, h: 564 },
      { title: "10", uri: "ebe9bb_fb3483acccb84c3c80f80ecd08558db6.png", w: 765, h: 565 },
    ],
  },
];

export const clients: Photo[] = [
  { title: "Gucci", uri: "ebe9bb_f867ebcd5f97483c91452d1c540c0789~mv2.png", w: 300, h: 193 },
  { title: "Calvin Klein", uri: "ebe9bb_73e519b5329e4942847269846336b88f~mv2_d_1704_1704_s_2.gif", w: 1704, h: 1704 },
  { title: "abc", uri: "ebe9bb_185d229d561441aab97ba1aa96c722a5~mv2.jpg", w: 1300, h: 867 },
  { title: "CBS", uri: "ebe9bb_982cb60250424cf7ac006c9b6aa2ae83~mv2.png", w: 2272, h: 1101 },
  { title: "NBC", uri: "ebe9bb_ec9eb28babb240348e89576df1d1b104~mv2.png", w: 200, h: 197 },
  { title: "Purple Magazine", uri: "ebe9bb_b304bd9b89554ee58dcab15e2c63bb89~mv2.png", w: 373, h: 99 },
  { title: "backstage", uri: "ebe9bb_7c05d384725b4de988fb98c6bf4fac6c~mv2.jpg", w: 648, h: 365 },
  { title: "the Apprentice", uri: "ebe9bb_45a7d441827144ed81729b4f8a0636c3~mv2.png", w: 768, h: 433 },
];

export const site = {
  name: "Sebastian Piras",
  aboutThumb: "ebe9bb_65aa7efe94e74d778b1b7f19d7ff92d4~mv2.jpg",
  copyright: "All images © Sebastian Piras.",
};

export const contact = {
  email: "Sebastian@Sebastianpiras.com",
  phone: "+1 646 361 9579",
  intro:
    "Sebastian Piras' limited edition prints can be purchased through this website. For editorial and commercial assignments or general inquiries please contact via email or phone.",
  redux: {
    label: "Additional editorial images also available at reduxpictures.com",
    url: "https://www.reduxpictures.com",
  },
};

export const bio = [
  `Sebastian Piras is a New York based photographer and filmmaker. His main photographic subject matter has been portraiture. "Artists Exposed", published in 1996, is a partial collection of captivating portraits of known and unknown artists and players in the international arts scene, including Andy Warhol and Roy Lichtenstein. David Ross, former Director of the Whitney Museum, wrote the introduction for the book, heralding Piras' photos as "...probing and extraordinarily beautiful portraits of artists... that ultimately produces winners at both ends of the camera."`,
  `A new artists portraits book consisting of some 120 artists portraits, "A Pocketful of Contemporary Artists Portraits", containing images taken from 1986 till 2006, was released in late 2008. Piras' photographs have been published, exhibited and collected worldwide.`,
  `Piras has directed and filmed several documentaries, including "Taylor Mead Unleashed", which also featured the late Allen Ginsberg and Quentin Crisp, and has done extensive work both in TV broadcasting and on feature films as a photographer, director and producer. He is currently photographing and co-producing a video profile on architect Richard Meier.`,
  `In the past 4 years he has directed 2 short films, "Art Depot" and "FOG", and is currently working on a film on modern dancer Margaret Beals.`,
];

export type CvEntry = { period: string; items: string[] };

export const exhibitions: CvEntry[] = [
  {
    period: "2017–present",
    items: [
      "Group show curated by Robert Curcio at Lichtenfire Gallery, Rivington Street, NY NY",
      "Group Show, #2 America, at EXMA art space in Cagliari, Italy. Among other artists in the show are Andres Serrano, Nan Goldin, Pat Steir, Gregory Crewdson and others",
      "Group Show, Wild is the Wind, at Oristano Pinacoteca. Among other artists included in the show are Richard Prince, Robert Frank and Bill Owens",
      'Currently directing a film on modern dancer Margie Beals, titled "Images"',
    ],
  },
  {
    period: "2016",
    items: [
      'Solo Show at Gallery 151 Annex, West 14th Street, NYC: "Sunset Sessions", Photographs and Pastels. March 2016',
    ],
  },
  {
    period: "2012–2015",
    items: [
      '"The Last Party" group exhibition at White Box NYC, curated by Anthony Haden-Guest, June 2015',
      '"Nolita, 30 Years" solo exhibition at 199 Mott Street, Alfa Dvlp',
      "Solo and Group Shows at Hiromart Gallery, Tokyo",
      "Publication of The The Mag and corresponding exhibit at 151 Gallery NYC (photographs from NY and the rap music scene in the mid 80s)",
      "Director/Producer: “FOG”, a short film",
      "Director/Producer: Art Depot, short film, 12 min, starring Travis Fitzimmons and Laine Rettmer",
      "Solo Show: Art-projects Galleria Alghero, Italy. Solo Show: Galleria Miralli, Viterbo, Italy",
      "Solo Show: PROJECTS, show at Fondazione Giov_Anna Piras, Asti, Italy (together with Andres Serrano, Zheng Huan, Gregory Crewdson) — Catalogue Photographer",
      "Solo Show: South Carolina Presbyterian College Arts Gallery",
      "Images, Melbourne, Australia publishes A Pocketful of Contemporary Artists Portraits. 220 pages, pocketbook. Worldwide distribution",
    ],
  },
  {
    period: "2004–2005",
    items: [
      "Collection Olnyk-Spanu",
      "Collection Francois Maier (donated to Würth Museum, Germany)",
      "Collection Würth Museum, Germany",
      'Exhibition Group Show "Artists Faces" (with 15 of Sebastian Piras’ prints) at Würth Museum, Künzelsau, Germany',
      'Photographed DVD cover for Michel Gondry "The Work of Director Michel Gondry"',
      'Director of Photography for "Sophie Matisse, Artist", directed by Christine Lombard',
      "Video composition on Christo's The Gates, NYC, with music by Chieko Mori",
      "Digital video / still photography, multimedia project: The Square, adapted from a short novel by French writer Marguerite Duras",
      "Video: Martin Scorsese and the 25th anniversary of the release of Mean Streets, NYC — D.P.",
      "Cameraman/Director: short documentary on Robert Wilson's installation of the Giorgio Armani exhibit at the Guggenheim Museum, New York City. Music by Michael Galasso",
      "Group Show: 5+5 Gallery, Brooklyn, NY. Group Show/benefit: Robert Wilson's Watermill Center, Watermill, NY. Group Show: Revelations at Greeley Square Gallery, NYC",
      'Group Show: "Summertime" at Rice Gallery, NYC',
      "Group Show: Beauty from Within at Sephora, New York City (with also Herb Ritts, Mary Ellen Mark)",
      "Group Show: Sex, Death, Religion at Gershwin's Gallery, New York City",
      "Portraits of cast of Robert Wilson's DDDIII theater production at Lincoln Center, NY",
      "Solo Show: Artcore Gallery, Toronto, Canada — Warhol's NY",
      "Solo Show: Galleria Comunale, Nuoro, Italy",
      "Photographer/Videographer: traveled to Brazil, Switzerland and India as a photographer (video and stills) for the art exhibit Art for the World. Client: WHO (United Nations). Documented in photographs and digital video the exhibition, the artists and the hosting cities",
      "Director/Producer: feature video-profile Taylor Mead Unleashed, starring Allen Ginsberg and Quentin Crisp, for Anthology Film Archives, NYC",
      "Director of short film “Portrance”, a collaboration with Martha Graham Co. dancer Donlin Foreman",
      "Ilisso publishes the book Artists Exposed, a collection of Sebastiano Piras' artists portraits, introduction by David Ross, Director of the Whitney Museum. Group Show: Aging with Grace",
      "Group Show: Small Scales at Joseph Helman Gallery, NYC",
      "Solo Show: Fotouhi Art Gallery, East Hampton, NY. Solo Show: Space Untitled Gallery, New York",
      "Solo Show: Exma Art Center, Cagliari, Italy",
      "Group Show: Collection in Context at Thread Waxing Space, the collection of Henry Buhl, New York City (also included in the catalogue are works by Andy Warhol, Helmut Newton, Richard Avedon and Cindy Sherman)",
      "Works shown at the 7th Reg. Armory, New York City, Blum Helman Gallery booth",
    ],
  },
  {
    period: "1996",
    items: [
      "Solo Show at Rene Fotouhi Gallery, East Hampton, NY",
      "Group Show: Robert Morris Gallery, New York City",
    ],
  },
  {
    period: "1995",
    items: ['Solo Show: "Stolen Moments" at Blum Helman Gallery, New York City'],
  },
  {
    period: "1994",
    items: ["Group Show: Rice Gallery, New York City"],
  },
  {
    period: "1986",
    items: [
      "Documentary on Life photographer Richard Stack",
      "Photographer for Def Jam (Run DMC, Beastie Boys)",
      "Solo Show: Soho Photo Gallery, Recent Photographs, New York City",
    ],
  },
];
