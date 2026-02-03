/**
 * FAMILY TREE CONFIGURATION & DATA
 */
const CONFIG = {
    cardWidth: 140,  
    cardHeight: 180, 
    horizontalSpacing: 30,
    
    // Dynamic Vertical Spacing Configuration
    // Start large (Root -> Gen 1), then decrease significantly
    verticalSpacingStart: 600, 
    verticalSpacingIncrement: -80, 
    
    partnerSpacing: 40,   
    avatarSize: 80, 
    thumbnailPath: "images/thumbnails/",
    fullPath: "images/", 
    defaultColor: "#fff",
    aliveBorderColor: "#ACE1AF", 
    deadBorderColor: "#ccc",
    selectedBorderColor: "#FFD700", 
    textColor: "#333",
    fontMain: "bold 13px Arial",
    fontSub: "11px Arial",
    fontSmall: "11px Arial",
    
    debug: false
};

// Complete dataset
const rawNodes = [
    /*
        { id: , name: "დანიელი(თემურაზი)", death: '1???' },
		{ id: 501, name: "მიხეილი", death: '1???', fid: 500 },
        { id: 502, name: "რომანი", pid: 519, fid: 501 },
		{ id: 503, name: "ზურაბი", birth: 1958, pid: 518, fid: 502, mid: 519, image: "zurabi_2.jpg" },
		{ id: 504, name: "ზაზა", fb: "zaza.koiava", birth: 1983, pid: 506, fid: 503, mid: 518, image: "zaza.jpg" },
		{ id: 505, name: "ნათია", fb: "natia.koiava.9", pid: 509, fid: 503, mid: 518, image: "natia_2.jpg" },
		{ id: 506, name: "თამარ ჯოლოხავა", image: "tamar_jolokhava.jpg" },
		{ id: 507, name: "თეკლა", mid: 506, fid: 504, image: "tekla.jpg" },
		{ id: 508, name: "დავითი", mid: 506, fid: 504, image: "daviti_2.jpg" },
		{ id: 509, name: "რატი ჯიქია", image: "rati_jikia.jpg" },
		{ id: 510, name: "ფიქრია", pid: 512, fid: 503, mid: 518, image: "pikria.jpg" },
		{ id: 511, name: "ლილე ჯიქია", fid: 509, mid: 505, image: "lile_jikia.jpg" },
		{ id: 512, name: "რეზი კაპანაძე", image: "rezi_kapanadze.jpg" },
		{ id: 513, name: "თემური", pid: 517, fid:502, mid: 519 },
		{ id: 514, name: "მიხეილი", birth: 1980, fid:513, mid: 517, image: "mikheili.jpg" },
		{ id: 515, name: "ხატია", birth: '19??', fb: "xatia.qoiava", fid:513, mid: 517, image: "khatia.jpg" },
		{ id: 516, name: "ნინო", birth: 1992, fb: "nini.koiava", pid: 521, fid:513, mid: 517, image: "nini.jpg" },
		{ id: 517, name: "რუსიკო ანთიძე" },
		{ id: 518, name: "ლია ბიწაძე", image: "lia_bitsadze.jpg" },
		{ id: 519, name: "ციცო", image: "tsitso___.jpg" },
		{ id: 520, name: "ლუკა კერესელიძე", mid: 516, image: "luka_kereselidze.jpg" },
		{ id: 521, name: "ნიკოლოზ კერესელიძე" },
		{ id: 522, name: "დემეტრე კაპანაძე", mid: 510, fid: 512, image: "demetre_kapanadze.jpg" },
		{ id: 523, name: "ალექსი კაპანაძე", mid: 510, fid: 512, image: "aleksandre_kapanadze.jpg" },
		{ id: 524, name: "ელენე კაპანაძე", mid: 510, fid: 512, image: "elene_kapanadze.jpg" },
		{ id: 525, name: "მანია", death: '1???', fid: 500 },
		{ id: 526, name: "ჟენია", death: '1???', fid: 500 },
		{ id: 527, name: "დავარი", death: '1???', fid: 500 },
		{ id: 528, name: "ლეილა ---", fid: 501 },
	*/

		{ id:   1, name: "ქოიავა", death: '????'},
		{ id:   2, name: "გიგო?", birth: '17??', death: '1???', fid: 1 },
		{ id:   3, name: "ტაია", birth: 1760, fid: 1 },
		{ id:   5, name: "ქაქუჩია", death: '????', fid: 1 },
		{ id:   4, name: "ივანე?", death: '????', fid: 1 },
		{ id:   6, name: "ჯაგუ?", death: '????', fid: 3 },
		{ id:   7, name: "კოჩა", death: '????', fid: 3 },
		{ id:   8, name: "დავითი", death: '????', fid: 6 },
		{ id:   9, name: "ოქროპირი", death: '????', fid: 7, pid: 180 },
		{ id:  10, name: "სესიკია", death: '????', fid: 7 },
		{ id:  11, name: "ბახვა", birth: 1875, death: '19??', pid: 213, fid: 9, mid: 180 },
		{ id: 213, name: "მარიამ კორძახია", birth: '18??', death: '19??' },
		{ id:  12, name: "მატრონა", death: '????', pid: 170, fid: 9, mid: 180 },
		{ id:  13, name: "ფატი", death: '????', pid: 171, fid: 9, mid: 180 },
		{ id:  14, name: "ვასილი", birth: 1888, pid: 131, fid: 11, mid: 213 },
		{ id:  15, name: "ივანე", birth: 1895, death: 1977, pid: 205, fid: 11, mid: 213, profession: "დურგალი", image: "ivane.jpg" },
		{ id:  16, name: "გიორგი", birth: 1900, death: '19??', pid: 134, fid: 11, mid: 213 },
		{ id:  17, name: "ელპიტი", birth: 1890, death: '19??', fid: 11, mid: 213 },
		{ id: 205, name: "ანეტა მაკალათია", birth: 1905, death: 1988, profession: "დიასახლისი", image: "aneta_makalatia.jpg" },
		{ id:  18, name: "ვალოდია", death: '????', mid: 131, fid: 14 },
		{ id:  19, name: "ოლია", death: '????', mid: 131, fid: 14 },
		{ id:  20, name: "შურა", death: '????', mid: 131, fid: 14 },
		{ id:  21, name: "ვაჟა", birth: 1929, death: 2003, pid: 202, fid: 15, mid: 205, profession: "მეტალურგი", image: "vazha.jpg" },
		{ id: 202, name: "ნათელა ჭანტურია", birth: 1933, profession: "ბუღალტერი", image: "natela_chanturia.jpg" },
		{ id:  22, name: "ბოჩია", birth: 1926, death: 1993, fid: 15, mid: 205, pid: 203, profession: "მეწაღე", image: "bochia.jpg" },
		{ id: 203, name: "ეთერი ფანცულაია", birth: 1932, death: 2018, image: "eteri_pantsulaia.jpg" },
		{ id:  23, name: "ძაბული", birth: 1925, death: 1986, pid: 211, fid: 15, mid: 205, image: "dzabuli.jpg" },
		{ id: 211, name: "პოლიკარპე ჭანტურია", birth: 1915, death: 1992, image: "polikarpe_chanturia.jpg" },
		{ id:  24, name: "ბესიკო", birth: 1930, death: '19??', mid: 134, fid: 16, pid: 183, image: "besiko.jpg" },
		{ id:  25, name: "ვახო", birth: 1957, fb: "vaxo.koiava", pid: 201, fid: 21, mid: 202, profession: "გეოლოგი", image: "vakhtangi.jpg" },
		{ id: 201, name: "მზია გელაშვილი", birth: 1957, fb: "mzia.gelashvili.9803", profession: "ბუღალტერი", image: "mzia_gelashvili.jpg" },
		{ id:  26, name: "მერაბი", birth: 1961, fb: "merab.koiava.7", pid: 204, fid: 21, mid: 202, profession: "ფიზიკოსი", image: "merabi.jpg" },
		{ id: 204, name: "ია მანჯგალაძე", fb: "ia.manjgaladze", birth: 1974, profession: "მასწავლებელი", image: "ia_manjgaladze.jpg" },
		{ id:  27, name: "ნათია", birth: 1987, fb: "natia.qoiava", pid: 212, fid: 25, mid: 201, profession: "პროექტ-მენეჯერი", image: "natia.jpg" },
		{ id: 212, name: "ლევანი იაგანაშვილი", birth: 1991, profession: "ფეხბურთელი", image: "levani_iaganashvili.jpg" },
		{ id:  28, name: "ირაკლი", birth: 1988, fb: "i.koiava", pid: 200, fid: 25, mid: 201, profession: "პროგრამისტი", image: "irakli.jpg" },
		{ id: 200, name: "სოფო ბექაური", birth: 1989, fb: "sopo.bekauri", profession: "გერმანისტი", image: "sopo_bekauri.jpg" },
		{ id:  29, name: "მარიამი", birth: 2010, fid: 28, mid: 200, image: "mariami.jpg" },
		{ id:  30, name: "ელენე", birth: 2015, fid: 28, mid: 200, image: "elene.jpg" },
		{ id:  31, name: "ვაჟა", birth: 2020, fid: 28, mid: 200, image: "vazha_2.jpg" },
		{ id:  32, name: "დარეჯანი", birth: 1953, fb: "darejan.koiava", fid: 22, mid: 203, pid: 206, profession: "ექიმ-ლაბორანტი", image: "darejani.jpg" },
		{ id: 206, name: "ჟუგორი გიორგობიანი", birth: 1948, death: '2014', image: "jugori_giorgobiani.jpg" },
		{ id:  33, name: "ავთო", birth: 1954, death: 2008, fid: 22, mid: 203, pid: 207, image: "avto.jpg" },
		{ id: 207, name: "ლელა ბერაია", birth: 1958, image: "lela_beraia.jpg" },
		{ id:  34, name: "ირმა", birth: 1964, fb: "irma.koiava.9", pid: 210, fid: 22, mid: 203, profession: "ექიმ-ლაბორანტი", image: "irma.jpg" },
		{ id: 210, name: "გულადი ხურცილავა", birth: 1962, fb: "profile.php?id=100089396543874", image: "guladi_khurtsilava.jpg" },
		{ id:  35, name: "ლევანი", birth: 1977, fb: "levani.qoiava.5", pid: 208, fid: 33, mid:207, image: "levani.jpg" },
		{ id: 208, name: "ელენე მელაძე", birth: 1991, fb: "meladzeelene", profession: "მასწავლებელი", image: "elene_meladze.jpg" },
		{ id:  36, name: "ლადო", birth: 1981, fb: "lado.qoiava", pid: 209, fid: 33, mid:207, image: "lado.jpg" },
		{ id: 209, name: "თაკო სახურია", birth: 1992, fb: "takosaxuria", profession: "ფარმაცევტი", image: "tako_sakhuria.jpg" },
		{ id:  37, name: "სალომე", birth: 2004, fb: "qoiavasalome", fid: 26, mid: 204, profession: "იურისტი", image: "salome.jpg" },
		{ id:  38, name: "ნინო", birth: 2005, fb: "nini.koiava.50", fid: 26, mid: 204, profession: "მხატვარი", image: "niniko.jpg" },
		{ id:  39, name: "გიორგი", birth: 2008, fb: "profile.php?id=61551694662935", fid: 26, mid: 204, image: "gio.jpg" },
		{ id:  40, name: "ავთანდილი", fid: 35, mid: 208, image: "atuka.jpg" },
		{ id:  41, name: "დემეტრე", fid: 35, mid: 208, image: "deme.jpg" },
		{ id:  44, name: "ილიკო", death: '1???', fid: 10 },
		{ id:  42, name: "კოსტა", death: '1???', fid: 10 },
		{ id:  43, name: "ელისა", death: '1???', pid: 172, fid: 10 },
		{ id:  45, name: "კოლია", fid: 42 },
		{ id:  46, name: "თამარა", fid: 42 },
		{ id:  47, name: "შუშუ", fid: 42 },
		{ id:  48, name: "ლულუ", fid: 42 },
		{ id:  49, name: "სერგო", fid: 44 },
		{ id:  50, name: "ჭიჭიკო", fid: 44 },
		{ id:  51, name: "ტატიანა/კუკუშა", fid: 44 },
		{ id:  53, name: "ლევანი", death: '1???', fid: 44, pid: 178 },
		{ id:  52, name: "შოთა", death: '19??', fid: 44 },
		{ id:  54, name: "ჯონი", death: 2018, pid: 117, fid: 52, image: "joni.jpg" },
		{ id: 117, name: "ლია გაბრიჩიძე", fb: "lia.gabrichidze.10", image: "lia_gabrichidze.jpg" },
		{ id:  55, name: "ბუხუტი", death: 2025, pid: 135, fid: 52 },
		{ id:  56, name: "რუსიკო", fid: 52 },
		{ id:  57, name: "შოთა", pid: 136, mid: 135, fid: 55 },
		{ id:  58, name: "თინათინი", fb: "tina.qoiava", mid: 135, fid: 55, image: "tina.jpg" },
		{ id:  59, name: "ოთარი", birth: 1953, death: 2019, pid: 127, fid: 53, mid: 178, image: "otari.jpg" },
		{ id:  60, name: "ნარგიზი", birth: 1954, death: 2025, fb: "profile.php?id=100084369526554", fid: 53, mid: 178, image: "nargizi.jpg" },
		{ id:  61, name: "ნანი", fid: 53, mid: 178, image: "nani.jpg" },
		{ id:  62, name: "ლევანი", birth: 1977, fb: "levan.qoiava", pid: 132, mid: 127, fid: 59, profession: "ბიზნესმენი", image: "levani_2.jpg" },
		{ id:  63, name: "ხათუნა", birth: 1981, fb: "profile.php?id=100004205866871", pid: 128, mid: 127, fid: 59, image: "khatuna.jpg" },
		{ id:  64, name: "ნიკო", birth: 2000, fb: "niko.qoiava.2025", mid: 132, fid: 62, image: "niko.jpg" },
		{ id:  65, name: "ბარბარე", birth: 2000, fb: "barbare.koiava.205088", mid: 132, fid: 62, image: "barbare.jpg" },
		{ id:  66, name: "ლიზი", birth: 2004, fb: "lizi.qoiava.7", mid: 132, fid: 62, image: "lizi.jpg" },
		{ id:  67, name: "ნატო", fid: 54, fb: "nato.qoiava.5", mid: 117, image: "nato.jpg" },
		{ id:  68, name: "ნანა", birth: 1972, fb: "nana.qoiava.73", pid: 129, fid: 54, mid: 117, image: "nana.jpg" },
		{ id: 118, name: "ნინო", birth: 1984, fb: "nino.qoiava.7", pid: 119, fid: 54, mid: 117, image: "nino.jpg" },
		{ id:  69, name: "პაპუნა", fid: 8 },
		{ id:  70, name: "ელისაბედი", fid: 8 },
		{ id:  71, name: "ნატო", fid: 8 },
		{ id:  72, name: "ზურაბი", death: '1???', fid: 8 },
		{ id:  73, name: "ალექსი", death: '1???', fid: 8 },
		{ id:  74, name: "გრიშა", death: '1???', fid: 69 },
		{ id:  75, name: "აქვსენტი", death: '1???', fid: 69 },
		{ id:  76, name: "ლუკა", death: '19??', pid: 133, fid: 72 },
		{ id:  77, name: "თადეოზი", death: '19??', pid: 140, fid: 72 },
		{ id:  78, name: "ივანე", death: '19??', pid: 154, fid: 72, profession: "ბიზნესმენი", image: "vano.jpg" },
		{ id:  79, name: "პავლე", fid: 72 },
		{ id:  80, name: "პლატონი", fid: 73 },
		{ id:  81, name: "ირაკლი", fid: 73, image: "irakli_5.jpg" },
		{ id:  82, name: "პარმენი", pid: 122, fid: 73, image: "parmeni.jpg" },
		{ id:  83, name: "ვასა", fid: 73 },
		{ id:  84, name: "ოლღა", fid: 73 },
		{ id:  85, name: "პაშა", fid: 73 },
		{ id:  86, name: "ნონა", fid: 73 },
		{ id:  87, name: "მერი", pid: 166, mid:133, fid: 76, image: "meri_2.jpg" },
		{ id:  88, name: "ნესტანი", mid:133, fid: 76 },
		{ id:  89, name: "იმედო", mid:133, fid: 76, birth: '1923', death: '2005', pid: 188, profession: "პროვიზორი", image: 'imedo.jpg' },
		{ id:  90, name: "ვალიდა", death: '19??', pid: 123, mid:133, fid: 76, image: "valida.jpg" },
		{ id:  91, name: "დავითი", death: '1???', pid: 124, mid:133, fid: 76, image: "dato.jpg" },
		{ id:  92, name: "კონსტანტინე", mid:133, fid: 76 },
		{ id:  96, name: "თამარი", death: '????', pid: 125, fid: 91, mid: 124, profession: "ექიმი", image: "tamari.jpg" },
		{ id:  97, name: "ქეთევანი", birth: 1953, fb: "profile.php?id=61550006810308", pid: 126, fid: 91, mid: 124, profession: "მუსიკოსი", image: "ketevani.jpg" },
		{ id:  98, name: "ჟორა", birth: 1919, death:1942, fid: 77, mid: 140, profession: "სამხედრო (მფრინავი)WW2" },
		{ id:  99, name: "მიშა", birth: 1917, death:1943, fid: 77, mid: 140, profession: "სამხედრო WW2" },
		{ id: 100, fid: 77, name: "ვენერა", mid: 140 },
		{ id: 101, name: "თამარი", pid: 147, fid: 78, mid: 154 },
		{ id: 102, name: "ზურაბი", pid: 156, fid: 78, mid: 155, image: "zurabi.jpg" },
		{ id: 103, name: "მირიანი", pid: 168, fid: 102, mid: 156, image: "miriani.jpg" },
		{ id: 104, name: "ირაკლი", birth: 1979, fb: "iraklikoiavaudu", pid: 153, fid: 102, mid: 156, profession: "მუსიკოსი", image: "irakli_2.jpg" },
		{ id: 105, name: "დავითი", fb: "koiava.design", fid: 102, mid: 156, profession: "დიზაინერი", image: "daviti.jpg" },
		{ id: 106, fid: 79, name: "ლილი" },
		{ id: 107, fid: 81, name: "დოდო" },
		{ id: 108, fid: 81, name: "ალექსი/ჯუჯუ" },
		{ id: 109, fid: 108, name: "მურმანი" },
		{ id: 110, fid: 108, name: "ირაკლი" },
		{ id: 111, name: "მურმანი", birth: 1932, death: 1982, mid: 122, pid: 141, fid: 82, profession: "გეოლოგი", image: "murmani.jpg" },
		{ id: 112, name: "ჯული", mid: 122, fid: 82 },
		{ id: 113, name: "მარგო", mid: 122, fid: 82, pid: 187 },
		{ id: 114, name: "მედიკო", birth: 1940, death: 2016, mid: 122, fid: 82 },
		{ id: 119, name: "გიორგი მამალაძე", image: "giorgi_mamaladze.jpg" },
		{ id: 120, name: "გიორგი", mid: 136, fid: 57 },
		{ id: 121, name: "ანა", mid: 136, fid: 57 },
		{ id: 122, name: "მარო პერტია"},
		{ id: 123, name: "რაულ ფანცულაია", death: '????'},
		{ id: 124, name: "მერი ნიკურაძე", image: "meri_nikuradze.jpg" },
		{ id: 125, name: "ზაალი შარაშენიძე", death: '????', image: "zaali_sharashenidze.jpg" },
		{ id: 126, name: "ჯუმბერი კიკაჩეიშვილი", image: "jumberi_kikacheishvili.jpg" },
		{ id: 127, name: "ნანული გაბელაია", birth: 1955, fb: "nanuli.gabelaia.5", image: "nanuli_gabelaia.jpg" },
		{ id: 128, name: "გიორგი ვალიშვილი", image: "giorgi_valishvili.jpg" },
		{ id: 129, name: "ირაკლი ქავთარაძე", image: "irakli_kavtaradze.jpg" },
		{ id: 130, name: "ნატო?", fid: 24 },
		{ id: 131, name: "---"},
		{ id: 132, name: "სოფიკო თორდია", fb: "sopiko.tordia", image: "sofiko_tordia.jpg" },
		{ id: 133, name: "ნატაშა ძაძამია", death: '19??', image: "natasha_dzadzamia.jpg" },
		{ id: 134, name: "აგრა კორძახია", death: '19??', image: "agra_kordzakhia.jpg" },
		{ id: 135, name: "მაყვალა გოჩოლეიშვილი" },
		{ id: 136, name: "თინათინ ქირია"},
		{ id: 137, name: "---", fid: 24 },
		{ id: 138, name: "დარეჯანი", birth: 1957, fb: "daji.koiava", mid: 141, fid: 111, profession: "გეოლოგი", image: "darejani_2.jpg" },
		{ id: 139, name: "ქეთევანი", birth: 1955, fb: "ketevan.koiava", mid: 141, fid: 111, profession: "გეოლოგი", image: "ketevani_2.jpg" },
		{ id: 140, name: "საშა კუცია", death: '19??', image: "sasha_kutsia.jpg" },
		{ id: 141, name: "ნათელა პატარაია", image: "natela_pataraia.jpg" },
		{ id: 142, name: "კახა გიორგობიანი", birth: 1976, fb: "kaxa.giorgobiani.5", mid: 206, fid: 32, image: "kakha_giorgobiani.jpg" },
		{ id: 143, name: "თეა გიორგობიანი", birth: 1975, fb: "tea.giorgobiani.1", mid: 206, fid: 32, image: "tea_giorgobiani.jpg" },
		{ id: 144, name: "მარიკა ხურცილავა", birth: 1990, fb: "mariam.khurtsilava.1", profession: "მოცეკვავე", mid: 34, fid: 210, image: "marika_khurtsilava.jpg" },
		{ id: 145, name: "მამუკა ხურცილავა", birth: 1991, fb: "bkhurtsilava", profession: "რეაბილიტოლოგი", mid: 34, fid: 210, image: "mamuka_khurtsilava.jpg" },
		{ id: 146, name: "ნუცა იაგანაშვილი", birth: 2021, mid: 27, fid: 212, image: "nutsa_iaganashvili.jpg" },
		{ id: 147, name: "კოლია იაშვილი" },
		{ id: 148, name: "თემური იაშვილი", birth: 1955, fb: "profile.php?id=100008431927656", mid: 101, fid: 147, image: "temuri_iashvili.jpg" },
		{ id: 149, name: "გიორგი", fid: 103, mid: 168 },
		{ id: 150, name: "ნიკოლოზი", fid: 103, mid: 168 },
		{ id: 151, name: "იოანე", fid: 104, mid: 153, image: "ioane.jpg" },
		{ id: 152, name: "ემილი", fid: 104, mid: 153, image: "emili.jpg" },
		{ id: 153, name: "მარიამ ტყემალაძე", fb: "maria.tke", image: "maria_tkemaladze.jpg" },
		{ id: 154, name: "პაშა ხუნწარია", death: '19??', profession: "ვანოს  | მეუღლე", image: "pasha_khuntsaria.jpg" },
		{ id: 155, name: "ოლია კორძახია", profession: "ვანოს || მეუღლე" },
		{ id: 156, name: "მანანა ლაშაური", image: "manana_lashauri.jpg" },
		{ id: 157, name: "დავით კიკაჩეიშვილი", birth: 1976, fb: "profile.php?id=100006393752409", mid: 97, fid: 126, image: "davit_kikacheishvili.jpg" },
		{ id: 158, name: "ნონა კიკაჩეიშვილი", birth: 1977, fb: "cikarishvili.tinka", mid: 97, fid: 126, image: "nona_kikacheishvili.jpg" },
		{ id: 159, name: "აკაკი შარაშენიძე", birth: 1983, fb: "akaki.x", mid: 96, fid: 125, image: "akaki_sharashenidze.jpg" },
		{ id: 160, name: "გოგა შარაშენიძე", birth: 1987, fb: "goga.sharashenidze.52", mid: 96, fid: 125, image: "goga_sharashenidze.jpg" },
		{ id: 161, name: "იაგო ჭანტურია", birth: 1951, mid: 23, fid: 211, profession: "ბუღალტერი" ,image: "iago_chanturia.jpg" },
		{ id: 162, name: "სოსო ჭანტურია", birth: 1948, mid: 23, fid: 211, profession: "Taxi" },
		{ id: 163, name: "გოგი ფანცულაია", death: '20??', mid: 90, fid: 123, image: "gogi_pantsulaia.jpg" },
		{ id: 164, name: "ზურაბი ფანცულაია", mid: 90, fid: 123 },
		{ id: 165, name: "მერაბი ფანცულაია", mid: 90, fid: 123 },
		{ id: 166, name: "--- პერტენავა"},
		{ id: 167, name: "ჟიგული პერტენავა", birth: 1931, death: '193?', mid: 87, fid: 166, image: "jiguli_pertenava.jpg" },
		{ id: 168, name: "ლია ჩუბინიძე"},
		{ id: 169, name: "ნინელი იაშვილი", mid: 101, fid: 147 },
		{ id: 170, name: "--- კაჭარავა", death: '1???' },
		{ id: 171, name: "ბახვა კუპრაშვილი", death: '1???' },
		{ id: 172, name: "--- თაფლაძე", death: '1???' },
		{ id: 173, name: "გრიშა თაფლაძე", mid: 43, fid: 172 },
		{ id: 174, name: "__(და) თაფლაძე", mid: 43, fid: 172 },
		{ id: 175, name: "ბორის ძაძამია", mid: 17, profession: "ექიმი", image: "boris_dzadzamia.jpg" },
		{ id: 176, name: "თამაზ ინჯგია", birth: 1962, fb: "tamaz.injgia", mid: 113, fid: 187, profession: "გეოლოგი", image: "tamaz_injgia.jpg" },
		{ id: 177, name: "თეიმურაზ წერუაშვილი", birth: 1961, fb: "profile.php?id=100056236300491", mid: 114, profession: "გეოლოგი", image: "teimuraz_tseruashvili.jpg" },
		{ id: 178, name: "თინა", birth: 1931, death: '1???' },
		{ id: 179, name: "ლიზა", birth: 2024, fid: 36, mid:209, image: "lisa.jpg" },
		{ id: 180, name: "??? რურუა", death: '1???' },
		{ id: 181, name: "ნინო ვალიშვილი", birth: 2009, mid: 63, fid: 128, image: "nino_valishvili.jpg" },
		{ id: 182, name: "მაკა თედორაძე", fb: "maka.tedoradze7", mid: 138, image: "maka_tedoradze.jpg" },
		{ id: 183, name: "ეთერი კოტია", birth: 1932, death: '????', profession: "ექთანი" },
		{ id: 184, name: "ლანა ლაბარტყავა", fb: "lana.labartkava", birth: 1990, mid: 61, image: "lana_labartyava.jpg" },
		{ id: 185, name: "დათო ლაბარტყავა", fb: "dato.labartyava.9", birth: 1988, mid: 61, image: "dato_labartyava.jpg" },
		{ id: 186, name: "რევაზ ცირეკიძე", fb: "rcirekidze", birth: 1988, mid: 139, image: "revaz_cirikidze.jpg" },
		{ id: 187, name: "ბუხუტი ინჯგია", birth: 1926, death: 2012, image: "bukhuti_injgia.jpg" },
		{ id: 188, name: "ტიტიკო შარუხია", birth: 1923, death: 2013, image: "titiko_sharukhia.jpg" },
		{ id: 189, name: "ნარგიზა შარუხია", birth: 1950, mid: 89, fid: 188, fb: "nargiza.grigolia", image: "nargiza_sharukhia.jpg" },
		{ id: 190, name: "ნინო შარუხია", birth: 1960, mid: 89, fid: 188, fb: "nino.sharukhia.5", image: "nino_sharukhia.jpg" },
		{ id: 191, name: "ნაირა შარუხია", birth: 1957, mid: 89, fid: 188, fb: "naira.sharukhia", image: "naira_sharukhia.jpg" },
		{ id: 192, name: "ემილია ___", birth: 2007, mid: 58 },
		{ id: 193, name: "პეტრე ___", birth: 2011, mid: 58 },
		
		
		{ id: 317, fid: 4, name: "დუტუ?", death: '1???' },
		{ id: 318, fid: 317, name: "ბასა", death: '1???' },
		{ id: 319, fid: 317, name: "ანდრია", death: '1???' },
		{ id: 320, fid: 318, name: "სანდრო", death: '1???' },
		{ id: 321, fid: 318, name: "სალომე", death: '1???' },
		{ id: 322, fid: 318, name: "ფარნა", death: '1949' },
		{ id: 323, fid: 319, name: "პეტრე", death: '1???' },
		{ id: 324, fid: 319, name: "პავლე", death: '1???' },
		{ id: 325, fid: 319, name: "ალექსი", death: '1???' },
		{ id: 326, fid: 322, name: "ვარლამი", death: '1???' },
		{ id: 327, fid: 322, name: "ევგენი", death: '1???' },
		{ id: 328, fid: 322, name: "მაკარი", death: '1???' },
		{ id: 329, fid: 322, name: "სევერიანი", death: '1???' },
		{ id: 330, fid: 322, name: "ტარასი", death: '1???' },
		{ id: 331, fid: 322, name: "კონსტანტინე", death: '1???' },
		{ id: 332, fid: 322, name: "შალვა", death: '1???' },
		{ id: 333, fid: 322, name: "რაჟდენი", pid: 442, death: '1???' },
		{ id: 334, fid: 322, name: "აქვსენტი", death: '1???' },
		{ id: 335, fid: 322, name: "ანტონი", pid: 441, birth: 1911, death: '1???' },
		{ id: 336, fid: 322, name: "დიანოსი", death: '1???' },
		{ id: 337, fid: 322, name: "ბაგრატი", death: '1???' },
		{ id: 338, fid: 322, name: "სპირიდონი", death: '1???' },
		{ id: 339, fid: 326, name: "ოთარი" },
		{ id: 340, fid: 339, name: "ზურაბი" },
		{ id: 341, fid: 339, name: "ჯონდო" },
		{ id: 342, fid: 339, name: "მერაბი" },
		{ id: 343, fid: 340, name: "ლელა" },
		{ id: 344, fid: 341, name: "იოვანა" },
		{ id: 345, fid: 330, name: "ლორა" },
		{ id: 346, fid: 330, name: "ტოლია" },
		{ id: 347, fid: 330, name: "ვოვა" },
		{ id: 348, fid: 345, name: "ნათელა" },
		{ id: 349, fid: 346, name: "დიმიტრი" },
		{ id: 350, fid: 332, name: "ნაირა" },
		{ id: 351, fid: 332, name: "მანანა" },
		{ id: 352, fid: 333, name: "ჯემალი", mid: 442 },
		{ id: 353, fid: 333, name: "მერი", mid: 442 },
		{ id: 354, fid: 352, name: "ჯემალი" },
		{ id: 355, fid: 334, name: "ფარნაოზი" },
		{ id: 356, fid: 334, name: "ირინა" },
		{ id: 357, fid: 335, name: "თამაზი", mid: 441, birth: 1948, death: '1992', pid: 423, image: "tamazi_2.jpg" },
		{ id: 358, fid: 338, name: "ეთერი" },
		{ id: 359, fid: 338, name: "ციალა" },
		{ id: 360, fid: 323, name: "კლიმენტი", death: '????', pid: 444 },
		{ id: 361, fid: 323, name: "ჯონდო" },
		{ id: 362, fid: 323, name: "მიშა", death: '1963', pid: 433, profession: "ბიზნესმენი", image: "mikhail.jpg" },
		{ id: 363, fid: 323, name: "ცირუ" },
		{ id: 364, fid: 323, name: "გაიანე" },
		{ id: 365, fid: 323, name: "მინა" },
		{ id: 366, name: "ტატიანა", fid: 360, mid: 444, death: '19??', image: "tatiana_1.jpg" },
		{ id: 367, name: "პეტრე", birth: 1926, death: 1998, fid: 360, mid: 444, profession: "გეოლოგი", pid: 446, image: "petre.jpg" },
		{ id: 368, name: "ბორისი", fid: 360, mid: 444, birth: 1927, death: 2003, profession: "გეოლოგი", pid: 443, image: "borisi.jpg" },
		{ id: 369, name: "ჯემალი", fid: 360, mid: 444, death: '19??', image: "jemali.jpg", pid: 445 },
		{ id: 370, fid: 361, name: "მერი" },
		{ id: 371, name: "ციალა", death: 2015, fid: 362, mid: 433, pid: 431, profession: "პედიატრი", image: "ciala.jpg" },
		{ id: 372, name: "ლერი", fid: 362, mid: 433 },
		{ id: 373, fid: 372, name: "ლიზიკო", fb: "liziko.koiava", image: "liziko.jpg" },
		{ id: 374, fid: 372, name: "ნათია", fb: "natia.koiava", image: "natia_3.jpg" },
		{ id: 375, fid: 372, name: "ანი", image: "ani.jpg" },
		{ id: 376, fid: 367, mid: 446, name: "მამუკა", fb: "mamuka.koiava.7", image: "mamuka.jpg", pid: 434 },
		{ id: 377, fid: 367, mid: 446, name: "კახაბერი", birth: 1976, fb: "kakha.koiava", profession: "გეოლოგი", image: "kakha.jpg" },
		{ id: 378, name: "მარიამი", fb: "mariam.koiavaa", fid: 376, mid: 434, image: "mariami_3.jpg" },
		{ id: 379, name: "ლუკა", fid: 376, mid: 434, image: "luka.jpg" },
		{ id: 380, fid: 377, name: "ნიკოლოზი" },
		{ id: 381, fid: 377, name: "ნინი" },
		{ id: 382, name: "ლალი", fid: 368, mid: 443, birth: 1961, profession: "ექიმი", fb: "lali.koiava.5", pid: 425, image: "lali.jpg" },
		{ id: 383, name: "ხათუნა", fid: 368, mid: 443, birth: 1963, death: 2007, pid: 428 },
		{ id: 384, fid: 369, mid: 445, name: "რუსლანი", image: "ruslani.jpg" },
		{ id: 385, name: "ლევანი", fid: 369, mid: 445, pid: 447, image: "levani_3.jpg" },
		{ id: 387, name: "ლერა ოგონიოკი", fid: 385, mid: 447, birth: 2001, image: "lera_ogonek.jpg" },
		{ id: 388, fid: 325, name: "ალექსი/ბონდო", death: '19??', pid: 419, image: "aleksandre_3.jpg" },
		{ id: 389, fid: 325, name: "სიმონი" },
		{ id: 390, fid: 325, name: "მირიანი" },
		{ id: 391, fid: 325, name: "ზინა" },
		{ id: 392, fid: 325, name: "თათუშა" },
		{ id: 393, fid: 325, name: "ვენერა" },
		{ id: 394, name: "თამაზი", fid: 388, mid: 419, death: 2024, image: "tamazi.jpg" },
		{ id: 395, name: "მერაბი", birth: 1935, fb: "merab.koiava.37", fid: 388, mid: 419, pid: 413, image: "merabi_2.jpg" },
		{ id: 396, name: "ნატო", pid: 421, fid: 388, mid: 419 },
		{ id: 397, name: "გიგი", birth: 1967, fb: "george.koiava", fid: 394, pid: 417,  image: "gigi.jpg" },
		{ id: 398, name: "სოსო", birth: 1971, death: 1994, fid: 394, image: "soso.jpg" },
		{ id: 399, name: "ალექსანდრე", birth: 1961, fb: "alexandre.koiava.5", pid: 420, fid: 395, mid: 413, profession: "ექიმი", image: "aleksandre.jpg" },
		{ id: 400, name: "ნინო", fb: "nino.koiava.7", fid: 395, mid: 413, pid: 412, image: "nino_2.jpg" },
		{ id: 401, name: "ელენე", fb: "elene.qoiava", pid: 416, fid: 397, mid: 417, image: "elene_2.jpg" },
		{ id: 402, name: "ლიზა", fb: "liza.qoiava", fid: 397, mid: 417, image: "liza.jpg" },
		{ id: 403, fid: 399, mid: 420, name: "ტატიანა", image: "tatiana.jpg" },
		{ id: 404, fid: 399, mid: 420, name: "დავითი", fb: "datuna.koiava", pid: 414, image: "datuna.jpg" },
		{ id: 405, fid: 390, name: "თენგიზი", death: '20??', image: "tengizi.jpg" },
		{ id: 406, fid: 390, name: "ალექსი" },
		{ id: 407, fid: 405, name: "მირიანი(ბაჩი)", pid: 437 },
		{ id: 408, name: "გოგა", fb: "goga.koiava", birth: 1972, death: 2019, fid: 405, pid: 435, image: "goga.jpg" },
		{ id: 409, fid: 406, name: "ვახტანგი" },
		{ id: 410, fid: 324, name: "კუკური" },
		{ id: 411, name: "ქეთევან გოცირიძე", fb: "ketigotsiridze", mid: 400, fid: 412, profession: "ექიმი", image: "ketevan_gotsiridze.jpg" },
		{ id: 412, name: "ბესო გოცირიძე", image: "beso_gotsiridze.jpg" },
		{ id: 413, name: "ნუნუ გეგეშიძე", fb: "profile.php?id=100016320312117", profession: "ექიმი", image: "nunu_gegeshidze.jpg" },
		{ id: 414, name: "სალომე თავბერიძე", fb: "salo.tavberidze", image: "salome_tavberidze.jpg" },
		{ id: 415, name: "ალექსანდრე", fid: 404, mid: 414,  image: "aleksandre_2.jpg" },
		{ id: 416, name: "ნიკოლოზ არჩვაძე", image: "nikoloz_archvadze.jpg" },
		{ id: 417, name: "ნინო კობაიძე", birth: 1969, fb: "ninokobaidze69", image: "nino_kobaidze.jpg" },
		{ id: 418, name: "ნატალი", fid: 397, mid: 417, image: "natali.jpg" },
		{ id: 419, name: "ოლღა ჩერქეზიშვილი", death: '19??', image: "olga_cherkezishvili.jpg" },
		{ id: 420, name: "ნინო ჯუღელი", image: "nino_jugeli.jpg" },
		{ id: 421, name: "თემური დევიძე" },
		{ id: 422, name: "გია დევიძე", fid: 421, mid: 396 },
		{ id: 423, name: "ჯილდა", birth: 1960, fb: "profile.php?id=100072628033802", image: "jilda_makalatia.jpg" },
		{ id: 424, name: "ზურა", birth: 1986, fb: "profile.php?id=100073972135549", fid: 357, mid: 423, image: "zura.jpg" },
		{ id: 425, name: "მამუკა მოდებაძე", birth: 1964, death: 2017, profession: "ექიმი" },
		{ id: 426, name: "სალომე მოდებაძე", birth: 1988, fb: "salome.modebadze", fid: 425, mid: 382, profession: "ჟურნალისტი", image: "salome_modebadze.jpg" },
		{ id: 427, name: "ლილე კობაიძე", birth: 2002, mid: 382 },
		{ id: 428, name: "გიორგი კუტალაძე" },
		{ id: 429, name: "მარიამ ყიფიანი", birth: 1998, fid: 428, mid: 383 },
		{ id: 430, name: "ლუსია ---", fid: 384 },
		{ id: 431, name: "იმედი კიზირია", birth: 1938, death: '1999', image: "imedi_kiziria.jpg", profession: "ქირურგი" },
		{ id: 432, name: "გიორგი კიზირია", birth: 1974, fb: "gia.kiziria", fid: 431, mid: 371, image: "giorgi_kiziria.jpg" },
		{ id: 433, name: "ლიზა კაჭარავა", death: '????', image: "liza_kacharava.jpg" },
		{ id: 434, name: "ნინო დურგლიშვილი", fb: "nino.durglishvili.90", image: "nino_durglishvili.jpg" },
		{ id: 435, name: "თამუნა ოშხერელი", fb: "tamuna.oshxereli", image: "tamuna_oshkhereli.jpg" },
		{ id: 436, name: "ანდრია", mid: 435, fid: 408, image: "andria.jpg" },
		{ id: 437, name: "მანჩო გიორგობიანი", fb: "profile.php?id=100075203160768", birth: 1970, image: "mancho_giorgobiani.jpg" },
		{ id: 438, name: "სანდრო", birth: 1992, death: 2017, mid: 437, fid: 407, image: "sandro.jpg" },
		{ id: 439, name: "მიკა", mid: 437, fid: 407 },
		{ id: 440, name: "რეზი", mid: 437, fid: 407 },
		{ id: 441, name: "ლიდა", death: '19??'},
		{ id: 442, name: "ეთერი", death: '19??'},
		{ id: 443, name: "ლაურა კახიძე", birth: 1935, profession: "ინჟინერ-ფეიქარი", image: "laura_kakhidze.jpg" },
		{ id: 444, name: "ალექსანდრა დუნდუა", death: '19??' },
		{ id: 445, name: "ლუდმილა", death: '19??' },
		{ id: 446, name: "ლიანა კახიძე", death: '19??' },
		{ id: 447, name: "კატია ოგონიოკი", birth: 1977, death: 2007, image: "katya_ogonek.jpg" },
		
		
		{ id: 1006, name: "მახა", birth: 1797, death: '1???', fid: 5 },
		{ id: 1007, name: "გოჯოგია", death: '1???', fid: 5 },
		{ id: 1008, name: "მამუკა", death: '1???', fid: 5 },
		{ id: 1009, name: "ოსიე", death: '1???', fid: 5 },
		{ id: 1010, name: "გიტა", death: '1???', fid: 5 },
		{ id: 1012, name: "კაცია", birth: 1825, death: '1???', fid: 1006 },
		{ id: 1011, name: "ნინო", death: '1???', pid: 1014, fid: 1006 },
		{ id: 1013, name: "ანდრია", death: '1???', fid: 1007 },
		{ id: 1014, name: "--- გეგენავა", death: '1???' },
		{ id: 1015, name: "სუმო", death: '1???', fid: 1008 },
		{ id: 1016, name: "ივანე", death: '1???', fid: 1009 },
		{ id: 1017, name: "ფილიპე", death: '1???', fid: 1010 },
		{ id: 1022, name: "ნიკოლოზი", birth: 1853, death: '1???', fid: 1012 },
		{ id: 1018, name: "ისიდორე", death: '1???', fid: 1012 },
		{ id: 1019, name: "სარდიონი", death: '1???', fid: 1012 },
		{ id: 1020, name: "ქრისტინე", death: '1???', pid: 1021, fid: 1012 },
		{ id: 1021, name: "--- პატარაია", death: '1???' },
		{ id: 1023, name: "ირინა", death: '1???', pid: 1024, fid: 1012 },
		{ id: 1024, name: "--- შაბურიშვილი", death: '1???' },
		{ id: 1025, name: "ლავრენტი", death: '1???', fid: 1013 },
		{ id: 1026, name: "ნესტორი", fid: 1015 },
		{ id: 1027, name: "გრიგოლი", fid: 1015 },
		{ id: 1028, name: "გრიგოლი", fid: 1016 },
		{ id: 1029, name: "ალექსი", death: '1???', fid: 1017 },
		{ id: 1030, name: "მაშიკო", fid: 1017 },
		{ id: 1031, name: "სალომე", fid: 1017 },
		{ id: 1032, name: "ნინო", fid: 1017 },
		{ id: 1033, name: "ანიკო", fid: 1017 },
		{ id: 1036, name: "რომანოზი", birth: 1880, death: 1969, fid: 1022 },
		{ id: 1034, name: "პეტრე", fid: 1022 },
		{ id: 1035, name: "მარია", pid: 1040, fid: 1022 },
		{ id: 1037, name: "საშა", pid: 1041, fid: 1022 },
		{ id: 1038, name: "ანა", pid: 1042, fid: 1022 },
		{ id: 1039, name: "ვასილი", fid: 1022 },
		{ id: 1040, name: "--- კიკაბიძე" },
		{ id: 1041, name: "--- ჭოჭუა" },
		{ id: 1042, name: "--- კუპრაძე" },
		{ id: 1043, name: "ალიოშა", profession: "დაიკარგა", fid: 1025 },
		{ id: 1044, name: "შოთა", birth: 1922, fid: 1025, pid: 1097 }, //https://srbo.archive.gov.ge/uploads/90/3953/79.pdf
		{ id: 1045, name: "ტოჩი", fid: 1025 },
		{ id: 1046, name: "ლილი", fid: 1025 },
		{ id: 1047, name: "მარგალიტა", fid: 1027 },
		{ id: 1048, name: "ბაბი", birth: 1888, death: '19??', pid: 1050, fid: 1028 },
		{ id: 1049, name: "ალექსანდრე", fid: 1028 },
		{ id: 1050, name: "--- კილასონია" },
		{ id: 1051, name: "თათუშა", death: '19??', pid: 1054, fid: 1029 },
		{ id: 1052, name: "ივლიანე", death: '19??', fid: 1029 },
		{ id: 1053, name: "იროდი", death: '19??', pid: 1095, fid: 1029 },
		{ id: 1054, name: "--- სალაყაია", death: '19??' },
		{ id: 1055, name: "ვლადიმერ/ხუტა", fid: 1030 },
		{ id: 1056, name: "ვარლამი", fid: 1036 },
		{ id: 1057, name: "ნიკოლოზი", fid: 1036 },
		{ id: 1058, name: "რაული", fid: 1044 },
		{ id: 1059, name: "მარინა", fid: 1045 },
		{ id: 1060, name: "ნონა", fid: 1045 },
		{ id: 1061, name: "დემური", fid: 1045 },
		{ id: 1062, name: "მედიკო", fid: 1052 },
		{ id: 1063, name: "მირდასი", death: 2021, pid: 1080, fid: 1053, mid: 1095, image: "mirdasi.jpg" },
		{ id: 1064, name: "მაყვალა", pid: 1066, fid: 1053, mid: 1095 },
		{ id: 1065, name: "მევლუდი", fid: 1053, mid: 1095 },
		{ id: 1066, name: "ნოდარი გოგოხია" },
		{ id: 1069, name: "ავთანდილი", birth: 1948, fb: "giimpex.ak", fid: 1056, image: "avtandil.jpg" },
		{ id: 1067, name: "ლია", fid: 1056 },
		{ id: 1068, name: "ნათელა", fid: 1056 },
		{ id: 1070, name: "ვლადიმერი/ვალერი", fid: 1057 },
		{ id: 1071, name: "ქეთინო", birth: 1960, fb: "ketino.koiava", pid: 1079, fid: 1063, mid: 1080, image: "ketino.jpg" },
		{ id: 1072, name: "ნანა", birth: 1966, fb: "nana.koiava.35", pid: 1092, fid: 1063, mid: 1080, image: "nana_2.jpg"  },
		{ id: 1073, name: "ციცო", fid: 1065 },
		{ id: 1074, name: "მალხაზი", fid: 1065 },
		{ id: 1075, name: "თინათინი", fb: "tinatin.koiava", birth: 1977, fid: 1069, pid: 1100, profession: "სტომატოლოგი", image: "tinatini.jpg" },
		{ id: 1076, name: "ნიკა", fb: "nikolas.koiava", birth: 1980, fid: 1069, profession: "ბიზნეს ადმინისტრატორი/ლექტორი", image: "nika.jpg" },
		{ id: 1077, name: "ეკატერინე", fid: 1070 },
		{ id: 1078, name: "ელმირა", fid: 1070 },
		{ id: 1079, name: "ანატოლი გრიგოლია", image: "anatoli_grigolia.jpg" },
		{ id: 1080, name: "ზაირა მიქაძე", death: 2022, image: "zaira.jpg" },
		{ id: 1081, name: "ალექსანდრე", birth: 2016, fid: 1076, image: "aleksandre_4.jpg" },
		{ id: 1082, name: "სალომე ბარათაშვილი", birth: 1990, fb: "salo.baratashvili", mid: 1072, fid: 1092, image: "salome_baratashvili.jpg" },
		{ id: 1083, name: "კოკო ბარათაშვილი", birth: 1993, fb: "profile.php?id=100068551682926", mid: 1072, fid: 1092, image: "koko_baratashvili.jpg" },
		{ id: 1084, name: "კოსტა გეგენავა", mid: 1011, fid: 1014 },
		{ id: 1085, name: "ისიდორე გეგენავა", mid: 1011, fid: 1014 },
		{ id: 1086, name: "გიორგი პატარაია", mid: 1020, fid: 1021 },
		{ id: 1087, name: "მინა პატარაია", mid: 1020, fid: 1021 },
		{ id: 1088, name: "სპირიდონი პატარაია", mid: 1020, fid: 1021 },
		{ id: 1089, name: "იონა პატარაია", mid: 1020, fid: 1021 },
		{ id: 1090, name: "თენგიზი გოგოხია", mid: 1064, fid: 1066, image: "tengizi_gogokhia.jpg" },
		{ id: 1091, name: "ნონა გოგოხია", mid: 1064, fid: 1066 },
		{ id: 1092, name: "შოთა ბარათაშვილი", image: "shota_baratashvili.jpg" },
		{ id: 1093, name: "ლევანი", fid: 1074 },
		{ id: 1094, name: "ლანა", fid: 1074 },
		{ id: 1095, name: "ლიზა ჯიბლაძე", death: '19??' },
		{ id: 1096, name: "იოანე ჩხენკელი", birth: 2017, mid: 1075, fid: 1100, image: "ioane_2.jpg" },
		{ id: 1097, name: "თინა", birth: 1930 },
		{ id: 1098, name: "ნიკოლოზ ჩხენკელი", birth: 2013, mid: 1075, fid: 1100, image: "nikoloz_chkhenkeli.jpg" },
		{ id: 1099, name: "ანა", birth: 2018, fid: 1076, image: "ana.jpg" },
		{ id: 1100, name: "გიორგი ჩხენკელი", birth: 1971 },
		
		
		{ id: 2000, name: "ოთარი", death: '1???', fid: 2 },
		{ id: 2001, name: "იოსკა", death: '1???', fid: 2000 },
		{ id: 2002, name: "იაგორი", death: '1???', fid: 2001 },
		{ id: 2003, name: "დიმიტრი", death: '1???', fid: 2001 },
		{ id: 2004, name: "კონსტანტინე", death: '1???', fid: 2002 },
		{ id: 2005, name: "მარიამი", death: '1???', fid: 2003 },
		{ id: 2006, name: "ალეკო", fid: 2004 },
		{ id: 2007, name: "მარო დუნდუა", mid: 2005 },
];

/**
 * IMAGE MANAGER
 * Handles loading and caching of profile images.
 */
class ImageManager {
    constructor() {
        this.thumbnails = new Map();
        this.fullImages = new Map();
        this.placeholderCache = new Map();
        this.facebookIcon = new Image();
        this.facebookIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR4nGP8//8/AyUYGhoKgPj/gXTA/wHRCCTG3///B0QjYwMDKQaA+H9ANAIAAOvD/fexx48hAAAAAElFTkSuQmCC'; // Simple blue placeholder
        // Try to load real FB icon if available
        const realFb = new Image();
        realFb.onload = () => { this.facebookIcon = realFb; requestRedraw(); };
        realFb.src = 'images/icons/fb.png';
        
        // Helper canvas for color extraction
        this.helperCanvas = document.createElement('canvas');
        this.helperCanvas.width = 1;
        this.helperCanvas.height = 1;
        this.helperCtx = this.helperCanvas.getContext('2d', { willReadFrequently: true }); // Optimization hint
    }
    
    _computeAverageColor(img) {
        try {
            this.helperCtx.clearRect(0, 0, 1, 1);
            this.helperCtx.drawImage(img, 0, 0, 1, 1);
            const p = this.helperCtx.getImageData(0, 0, 1, 1).data;
            // Check if transparency is high (empty image)
            if (p[3] < 5) return null; 
            return `rgb(${p[0]},${p[1]},${p[2]})`;
        } catch(e) {
            // console.warn("Color extraction failed (likely CORS/file:// restriction):", e);
            return null;
        }
    }
    
    // Helper to load image
    _load(src, map, key, nameForFallback) {
        if (map.has(key)) return map.get(key);
        
        const imgObj = { img: new Image(), loaded: false, error: false, avgColor: null };
        // Removed crossOrigin setting to allow local file loading
        imgObj.img.src = src;
        
        map.set(key, imgObj); // Set immediately to avoid duplicate requests

        imgObj.img.onload = () => {
            imgObj.loaded = true;
            const computed = this._computeAverageColor(imgObj.img);
            // Use computed if available, otherwise null (gray)
            imgObj.avgColor = computed;
            requestRedraw();
        };
        imgObj.img.onerror = () => {
            imgObj.error = true;
            imgObj.avgColor = null; // Ensure we have null (gray) on error
        };
        return imgObj;
    }

    get(node, highQuality) {
        if (!node.image) return null;

        // Always ensure thumbnail is available (as fallback or primary)
        let thumb = this._load(CONFIG.thumbnailPath + node.image, this.thumbnails, node.image, node.name);

        if (highQuality) {
            // Try loading full image
            let full = this._load(CONFIG.fullPath + node.image, this.fullImages, node.image, node.name);
            if (full.loaded) return full;
        }

        return thumb;
    }
}

/**
 * LAYOUT ENGINE
 * Calculates positions of all nodes in memory.
 */
class TreeLayout {
    constructor(nodes) {
        this.nodes = new Map(nodes.map(n => [n.id, { ...n, w: CONFIG.cardWidth, h: CONFIG.cardHeight, x: 0, y: 0, children: [] }]));
        this.root = null;
        this.layers = []; // Optimization: Spatial indexing by Y-level (generation)
        this.bucketSize = 1000; // Spatial bucket size
        this.buildHierarchy();
    }

    buildHierarchy() {
        const processed = new Set();
        
        // Link partners and children
        this.nodes.forEach(node => {
            // Link partner
            if (node.pid) {
                node.partnerNode = this.nodes.get(node.pid);
            }

            // Find children
            this.nodes.forEach(potentialChild => {
                if (potentialChild.fid === node.id || potentialChild.mid === node.id) {
                    if (!node.children.includes(potentialChild)) {
                        node.children.push(potentialChild);
                    }
                }
            });
        });

        // Identify root (ID 1)
        this.root = this.nodes.get(1);
    }

    calculate(ctx) {
        if (!this.root) return;
        // Recursive layout calculation
        this.calculateSubtree(this.root, 0, new Set());
        
        // Center the whole tree roughly
        const bounds = this.getBounds();
        const offsetX = -bounds.minX + 50;
        const offsetY = 50;
        
        this.nodes.forEach(n => {
            n.x += offsetX;
            n.y += offsetY;
        });
    }

    calculateSubtree(node, depth, visited) {
        if (visited.has(node.id)) return 0;
        visited.add(node.id);

        const nodeWidth = CONFIG.cardWidth;
        
        // Base width is just this node (plus partner if exists)
        let subtreeWidth = 0;
        const hasPartner = !!node.partnerNode;
        const selfWidth = hasPartner ? (nodeWidth * 2 + CONFIG.partnerSpacing) : nodeWidth;

        if (node.children.length === 0) {
            subtreeWidth = selfWidth;
        } else {
            // Process children
            // We need to group children who are partners to keep them together
            const childGroups = [];
            let i = 0;

            // Sort children by ID to ensure consistent order if needed, or leave as is
            // node.children.sort((a,b) => a.id - b.id); 

            const children = node.children;
            const processedChildren = new Set();

            while (i < children.length) {
                const child = children[i];
                if (processedChildren.has(child.id)) { i++; continue; }
                
                // Check if next sibling is partner
                let groupWidth = 0;
                let partner = null;
                
                // Try to find partner among siblings
                if (child.pid) {
                    partner = children.find(c => c.id === child.pid);
                }

                // Recursively layout child
                let childW = this.calculateSubtree(child, depth + 1, visited);

                // If partner exists in the children list, mark as processed (layout handled in child's partner logic usually?)
                // Actually, the original logic handles specific pairing in the children loop
                // In my structure, calculateSubtree handles the node+partner width. 
                // But we need to make sure we don't process the partner again as a primary child iteration
                
                if (partner) {
                    processedChildren.add(partner.id);
                    // If the partner was a child of this node (e.g. inter-family marriage?), we skip
                }
                
                processedChildren.add(child.id);

                childGroups.push({ node: child, width: Math.max(childW, child.w) });
                i++;
            }

            // Sum up widths
            let totalChildrenWidth = 0;
            childGroups.forEach((g, idx) => {
                    totalChildrenWidth += g.width;
                    if (idx < childGroups.length - 1) totalChildrenWidth += CONFIG.horizontalSpacing;
            });

            subtreeWidth = Math.max(selfWidth, totalChildrenWidth);
        }
        
        return subtreeWidth;
    }

    // Simplified Reingold-Tilford-ish layout for Family Trees
    // 1. Post-order: compute width of every subtree
    // 2. Pre-order: assign X positions
    layout() {
            this.resetPositions();
            this.widths(this.root);
            this.layers = []; // Reset layers
            this.assignCoordinates(this.root, 0, 0);
    }

    resetPositions() {
        this.nodes.forEach(n => { n._w = 0; n.x = 0; n.y = 0; });
    }

    widths(node) {
        if(!node) return 0;
        
        const myWidth = node.partnerNode ? (CONFIG.cardWidth * 2 + CONFIG.partnerSpacing) : CONFIG.cardWidth;
        
        if (!node.children || node.children.length === 0) {
            node._treeWidth = myWidth;
            return myWidth;
        }

        let childrenWidth = 0;
        // Group children logic similar to original
        const groups = [];
        const visitedChildren = new Set();
        
        // We must traverse children in the order they were pushed to maintain original structure logic
        for(let i=0; i<node.children.length; i++) {
            const child = node.children[i];
            if(visitedChildren.has(child.id)) continue;
            visitedChildren.add(child.id);

            // Is this child's partner also a child of the current node? (rare but possible)
            // Or simply, does the child have a partner?
            // The width of the child includes their partner
            
            // Check if the NEXT child in array is the partner (original logic dependency)
            // The original code: if (i < length-1 && child.pid === next.id)
            let nextChild = null;
            if (i < node.children.length - 1) {
                nextChild = node.children[i+1];
            }
            
            // If next child is the partner, we consume it
            if (nextChild && child.pid === nextChild.id) {
                visitedChildren.add(nextChild.id);
                // Note: The child node itself will handle drawing the partner. 
                // But for layout width, we need to know the width of the pair's subtree.
                // But 'nextChild' isn't the root of the pair, 'child' is.
                // Actually, in the original code, the layout returns width for the pair.
            }

            const w = this.widths(child);
            groups.push({ node: child, width: w });
            childrenWidth += w;
        }
        
        childrenWidth += (groups.length - 1) * CONFIG.horizontalSpacing;
        
        node._childrenTotalWidth = childrenWidth;
        node._treeWidth = Math.max(myWidth, childrenWidth);
        node._childGroups = groups;
        return node._treeWidth;
    }

    // Calculates Y position based on depth using cumulative increment
    getYForDepth(depth) {
        let y = 50; // Initial Top Margin
        let currentSpacing = CONFIG.verticalSpacingStart;
        const minSpacing = CONFIG.cardHeight + 50; // Minimum gap of 50px
        
        for (let i = 0; i < depth; i++) {
            y += currentSpacing;
            // Decrease spacing, but do not go below minimum
            if (currentSpacing > minSpacing) {
                currentSpacing += CONFIG.verticalSpacingIncrement; // Increment is negative
            }
            if (currentSpacing < minSpacing) currentSpacing = minSpacing;
        }
        return y;
    }

    addToSpatialIndex(node, depth) {
        if (!this.layers[depth]) {
            this.layers[depth] = { 
                y: node.y, 
                buckets: new Map(), // Map<bucketIndex, Node[]>
                allNodes: [] // List of all nodes in this layer for connections
            };
        }
        const layer = this.layers[depth];
        
        // Add to bucket
        const bucketIndex = Math.floor(node.x / this.bucketSize);
        if (!layer.buckets.has(bucketIndex)) {
            layer.buckets.set(bucketIndex, []);
        }
        layer.buckets.get(bucketIndex).push(node);
        
        // Add to flat list for connections
        layer.allNodes.push(node);
    }

    getNodesInRect(x, y, width, height) {
        const results = [];
        const minBucket = Math.floor(x / this.bucketSize);
        const maxBucket = Math.floor((x + width) / this.bucketSize);

        // Iterate through all layers first (Vertical culling)
        this.layers.forEach(layer => {
            if (!layer) return;
            // Strict vertical check: if layer is totally above or totally below rect, skip
            if (layer.y > y + height || layer.y + CONFIG.cardHeight < y) return;

            for (let b = minBucket; b <= maxBucket; b++) {
                const bucket = layer.buckets.get(b);
                if (bucket) {
                    for (const node of bucket) {
                         // Check exact collision
                         const hw = CONFIG.cardWidth / 2;
                         if (node.x + hw >= x && node.x - hw <= x + width) {
                             results.push(node);
                         }
                    }
                }
            }
        });
        return results;
    }

    assignCoordinates(node, x, depth) {
        if(!node) return;

        node.depth = depth; // Store depth for rendering

        // Use dynamic Y calculation
        node.y = this.getYForDepth(depth);
        
        const hasPartner = !!node.partnerNode;
        const blockWidth = hasPartner ? (CONFIG.cardWidth * 2 + CONFIG.partnerSpacing) : CONFIG.cardWidth;
        
        // Position of the primary node
        // If partner, the block is centered. Primary is left side of block.
        if (hasPartner) {
            node.x = x - (blockWidth / 2) + (CONFIG.cardWidth / 2);
            // Partner position
            node.partnerNode.x = node.x + CONFIG.cardWidth + CONFIG.partnerSpacing;
            node.partnerNode.y = node.y;
            
            // Add partner to spatial index bucket
            this.addToSpatialIndex(node.partnerNode, depth);
        } else {
            node.x = x;
        }

        // Add node to spatial index bucket AFTER X is determined
        this.addToSpatialIndex(node, depth);

        if (node._childGroups && node._childGroups.length > 0) {
            let currentX = x - (node._childrenTotalWidth / 2); 
            
            node._childGroups.forEach(group => {
                const childCenter = currentX + (group.width / 2);
                this.assignCoordinates(group.node, childCenter, depth + 1);
                currentX += group.width + CONFIG.horizontalSpacing;
            });
        }
    }

    getBounds() {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        this.nodes.forEach(n => {
            minX = Math.min(minX, n.x - CONFIG.cardWidth/2);
            maxX = Math.max(maxX, n.x + CONFIG.cardWidth/2);
            minY = Math.min(minY, n.y);
            maxY = Math.max(maxY, n.y + CONFIG.cardHeight);
        });
        return { minX, maxX, minY, maxY, width: maxX-minX, height: maxY-minY };
    }
}

/**
 * RENDERER
 */
class TreeRenderer {
    constructor(canvasId, nodes) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d', { alpha: false }); // Optimize for no transparency on bg
        this.layoutEngine = new TreeLayout(nodes);
        this.imageManager = new ImageManager();
        this.selectedNodeId = null; // Track selected node
        this.hoveredNode = null; // Track hovered node
        this.mouseX = 0;
        this.mouseY = 0;
        
        // State
        this.transform = { x: 0, y: 0, k: 0.8 }; // Initial zoom
        this.isDragging = false;
        this.lastPos = { x: 0, y: 0 };
        this.lastPinchDist = 0; // Track pinch distance
        
        this.init();
    }

    init() {
        this.layoutEngine.layout();
        this.bindEvents();
        this.resize();

        // Initial fit to screen will happen in DOMContentLoaded if no ID param is present
        // But resize() also calls requestRender.
        // We will call fitToScreen inside DOMContentLoaded check logic.
        
        requestAnimationFrame(() => this.loop());
        document.getElementById('loading').style.opacity = 0;
    }
    
    fitToScreen() {
        const bounds = this.layoutEngine.getBounds();
        // Get logical CSS pixels
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);
        const padding = 60; // Space around edges

        // Calculate ratios
        const scaleX = (width - padding * 2) / bounds.width;
        const scaleY = (height - padding * 2) / bounds.height;
        
        // Choose the smaller scale to fit both dimensions
        // Cap at 1.0 so small trees don't look weirdly huge
        // Lower bound set by logic or min zoom
        let scale = Math.min(scaleX, scaleY);
        scale = Math.min(scale, 1.0); 

        this.transform.k = scale;

        // Center view
        this.transform.x = (width - bounds.width * scale) / 2 - bounds.minX * scale;
        this.transform.y = (height - bounds.height * scale) / 2 - bounds.minY * scale;

        // Ensure we request a render
        this.requestRender();
    }

    bindEvents() {
        const c = this.canvas;
        
        // Resize
        window.addEventListener('resize', () => this.resize());

        // Mouse / Touch
        c.addEventListener('mousedown', e => this.startDrag(e.clientX, e.clientY));
        c.addEventListener('mousemove', e => this.drag(e.clientX, e.clientY));
        c.addEventListener('mouseup', () => this.endDrag());
        c.addEventListener('mouseleave', () => this.endDrag());
        
        // Double click for selection
        c.addEventListener('dblclick', e => this.handleDoubleClick(e));
        
        c.addEventListener('wheel', e => this.zoom(e));

        // Touch support
        c.addEventListener('touchstart', e => {
            if(e.touches.length === 1) {
                this.startDrag(e.touches[0].clientX, e.touches[0].clientY);
                // Check click
                this.handleTap(e.touches[0].clientX, e.touches[0].clientY);
            } else if (e.touches.length === 2) {
                this.isDragging = false; // Prevent single finger drag conflicts
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                this.lastPinchDist = Math.sqrt(dx * dx + dy * dy);
                // Set center for panning
                this.lastPos = {
                    x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
                    y: (e.touches[0].clientY + e.touches[1].clientY) / 2
                };
            }
        }, {passive: false});
        
        c.addEventListener('touchmove', e => {
            e.preventDefault(); 
            if(e.touches.length === 1 && this.isDragging) {
                this.drag(e.touches[0].clientX, e.touches[0].clientY);
            } else if (e.touches.length === 2) {
                const t1 = e.touches[0];
                const t2 = e.touches[1];
                const currentX = (t1.clientX + t2.clientX) / 2;
                const currentY = (t1.clientY + t2.clientY) / 2;
                
                // Pan
                const dx = currentX - this.lastPos.x;
                const dy = currentY - this.lastPos.y;
                this.transform.x += dx;
                this.transform.y += dy;
                
                // Zoom
                const dist = Math.sqrt(Math.pow(t1.clientX - t2.clientX, 2) + Math.pow(t1.clientY - t2.clientY, 2));
                if (this.lastPinchDist > 0) {
                    const scale = dist / this.lastPinchDist;
                    const newK = Math.min(Math.max(0.02, this.transform.k * scale), 5);
                    
                    // Zoom towards center
                    const ratio = newK / this.transform.k;
                    this.transform.x = currentX - (currentX - this.transform.x) * ratio;
                    this.transform.y = currentY - (currentY - this.transform.y) * ratio;
                    this.transform.k = newK;
                }
                
                this.lastPos = { x: currentX, y: currentY };
                this.lastPinchDist = dist;
                this.requestRender();
            }
        }, {passive: false});
        
        c.addEventListener('touchend', e => {
            this.endDrag();
            this.lastPinchDist = 0;
            if (e.touches.length === 1) {
                 this.startDrag(e.touches[0].clientX, e.touches[0].clientY);
            }
        });

        // Click detection
        c.addEventListener('click', e => this.handleClick(e));

        document.getElementById('btnRecenter').addEventListener('click', () => {
                this.fitToScreen();
        });
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(dpr, dpr);
        this.requestRender();
    }

    startDrag(x, y) {
        this.isDragging = true;
        this.lastPos = { x, y };
        this.canvas.style.cursor = 'grabbing';
    }

    drag(x, y) {
        if (this.isDragging) {
            const dx = x - this.lastPos.x;
            const dy = y - this.lastPos.y;
            this.transform.x += dx;
            this.transform.y += dy;
            this.lastPos = { x, y };
            this.requestRender();
        } else {
            this.handleHover(x, y);
        }
    }

    handleHover(sx, sy) {
        this.mouseX = sx;
        this.mouseY = sy;

        const pos = this.screenToWorld(sx, sy);
        let cursor = 'grab';
        
        // Optimized Hit Test: Use spatial index instead of iterating all nodes
        const candidates = this.layoutEngine.getNodesInRect(pos.x, pos.y, 1, 1); // 1x1 rect for point
        let hovered = null;

        for (const node of candidates) {
            const hw = CONFIG.cardWidth / 2;
            // Check bounds of card
            if (pos.x >= node.x - hw && pos.x <= node.x + hw &&
                pos.y >= node.y && pos.y <= node.y + CONFIG.cardHeight) {
                
                hovered = node;

                if (node.fb) {
                    const cardLeft = node.x - hw;
                    const iconX = cardLeft + CONFIG.cardWidth - 24;
                    const iconY = node.y + 8;
                    
                    if (pos.x >= iconX && pos.x <= iconX + 16 &&
                        pos.y >= iconY && pos.y <= iconY + 16) {
                        cursor = 'pointer';
                    }
                }
                break;
            }
        }

        if (this.hoveredNode !== hovered) {
            this.hoveredNode = hovered;
            this.requestRender();
        }

        this.canvas.style.cursor = cursor;
    }

    endDrag() {
        this.isDragging = false;
        if (this.canvas.style.cursor === 'grabbing') {
            this.canvas.style.cursor = 'grab';
        }
    }

    zoom(e) {
        e.preventDefault();
        const zoomSpeed = 0.001;
        const zoomFactor = Math.exp(-e.deltaY * zoomSpeed);
        
        // Zoom towards mouse pointer
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Increased zoom out capability to fit larger trees
        const newScale = Math.min(Math.max(0.02, this.transform.k * zoomFactor), 5);
        
        this.transform.x = mouseX - (mouseX - this.transform.x) * (newScale / this.transform.k);
        this.transform.y = mouseY - (mouseY - this.transform.y) * (newScale / this.transform.k);
        this.transform.k = newScale;
        
        this.requestRender();
    }

    screenToWorld(sx, sy) {
        return {
            x: (sx - this.transform.x) / this.transform.k,
            y: (sy - this.transform.y) / this.transform.k
        };
    }

    handleTap(sx, sy) {
            // Simple wrapper for click logic on touch
            this.handleClick({clientX: sx, clientY: sy});
    }

    handleDoubleClick(e) {
        const pos = this.screenToWorld(e.clientX, e.clientY);
        let clickedNode = null;
        
        // Optimized Hit Test
        const candidates = this.layoutEngine.getNodesInRect(pos.x, pos.y, 1, 1);

        for (const node of candidates) {
            const hw = CONFIG.cardWidth / 2;
            if (pos.x >= node.x - hw && pos.x <= node.x + hw &&
                pos.y >= node.y && pos.y <= node.y + CONFIG.cardHeight) {
                clickedNode = node;
                break;
            }
        }

        if (clickedNode) {
            this.selectNode(clickedNode);
        } else {
            this.selectedNodeId = null; // Deselect
            
            // Clear URL parameter
            const url = new URL(window.location);
            url.searchParams.delete('id');
            window.history.replaceState({}, '', url);

            this.requestRender();
        }
    }

    selectNode(node) {
        this.selectedNodeId = node.id;
        
        // Focus and zoom on the selected node
        const targetScale = 2.5; 
        const rect = this.canvas.getBoundingClientRect();
        
        // Calculate translation to center the node
        this.transform.k = targetScale;
        this.transform.x = (rect.width / 2) - (node.x * targetScale);
        this.transform.y = (rect.height / 2) - ((node.y + CONFIG.cardHeight / 2) * targetScale);
        
        // Update URL parameter without reloading
        const url = new URL(window.location);
        url.searchParams.set('id', node.id);
        window.history.replaceState({}, '', url);

        this.requestRender();
    }

    handleClick(e) {
        if (this.isDragging && (Math.abs(e.clientX - this.lastPos.x) > 5 || Math.abs(e.clientY - this.lastPos.y) > 5)) return; // It was a drag

        const pos = this.screenToWorld(e.clientX, e.clientY);
        
        // Optimized Hit Test
        const candidates = this.layoutEngine.getNodesInRect(pos.x, pos.y, 1, 1);
        
        for (const node of candidates) {
            const hw = CONFIG.cardWidth / 2;
            if (pos.x >= node.x - hw && pos.x <= node.x + hw &&
                pos.y >= node.y && pos.y <= node.y + CONFIG.cardHeight) {
                
                // Clicked a node
                if (node.fb) {
                        const cardLeft = node.x - hw;
                        const iconX = cardLeft + CONFIG.cardWidth - 24;
                        const iconY = node.y + 8;
                        
                        if (pos.x >= iconX && pos.x <= iconX + 16 &&
                            pos.y >= iconY && pos.y <= iconY + 16) {
                            this.openFacebook(node.fb);
                        }
                }
                break;
            }
        }
    }

    openFacebook(fb) {
        const ending = fb.startsWith("profile.php") ? "" : "/";
        const url = `https://www.facebook.com/${fb}${ending}`;
        window.open(url, '_blank');
    }

    requestRender() {
        if (!this.ticking) {
            requestAnimationFrame(() => this.loop());
            this.ticking = true;
        }
    }

    loop() {
        this.ticking = false;
        const ctx = this.ctx;
        const width = this.canvas.width / (window.devicePixelRatio||1);
        const height = this.canvas.height / (window.devicePixelRatio||1);
        
        const tStart = performance.now();

        // Clear
        ctx.fillStyle = "#f5f5f5";
        ctx.fillRect(0, 0, width, height);
        const tClear = performance.now();

        // Draw Timeline (Static on left)
        this.drawTimeline(ctx, height);
        const tTimeline = performance.now();

        // Setup Transform
        ctx.save();
        ctx.translate(this.transform.x, this.transform.y);
        ctx.scale(this.transform.k, this.transform.k);

        // Draw Connections First
        this.drawConnections(ctx);
        const tConnections = performance.now();

        // Draw Nodes
        this.drawNodes(ctx);
        const tNodes = performance.now();

        ctx.restore();

        // Draw Tooltip (Screen Space, after restore)
        this.drawTooltip(ctx);
        const tEnd = performance.now();

        if (CONFIG.debug) {
            this.drawDebugInfo(ctx, {
                'Clear': tClear - tStart,
                'Timeline': tTimeline - tClear,
                'Connections': tConnections - tTimeline,
                'Nodes': tNodes - tConnections,
                'Tooltip': tEnd - tNodes,
                'Total Frame': tEnd - tStart
            });
        }
    }

    drawDebugInfo(ctx, metrics) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform for UI
        
        // Background
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(10, 10, 200, 150);
        
        // Text
        ctx.fillStyle = "#0f0";
        ctx.font = "12px monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        
        let y = 20;
        ctx.fillText("Performance (ms)", 20, y);
        y += 20;
        
        for (const [label, time] of Object.entries(metrics)) {
            ctx.fillStyle = label === 'Total Frame' ? '#fff' : '#0f0';
            ctx.fillText(`${label}: ${time.toFixed(2)}`, 20, y);
            y += 15;
        }
        
        ctx.restore();
    }
    
    // In TreeRenderer class
    getFittedText(ctx, node, type, text, maxWidth) {
        // Simple in-memory cache on the node object itself
        const cacheKey = `_fit_${type}`;
        if (node[cacheKey] !== undefined) return node[cacheKey];

        let width = ctx.measureText(text).width;
        let result = text;
        if (width > maxWidth) {
            let ellipsis = '...';
            let truncated = text;
            while (ctx.measureText(truncated + ellipsis).width > maxWidth && truncated.length > 0) {
                truncated = truncated.slice(0, -1);
            }
            result = truncated + ellipsis;
        }
        node[cacheKey] = result;
        return result;
    }

    fitText(ctx, text, maxWidth) {
        // Fallback for non-node text if needed, or redirect
        // For this specific usage in drawSingleNode, we should use getFittedText
        // But for compatibility with existing calls, we keep this slow version or refactor calls.
        // Let's keep this as utility but use cached version in drawSingleNode.
        let width = ctx.measureText(text).width;
        if (width <= maxWidth) return text;
        
        let ellipsis = '...';
        let truncated = text;
        while (ctx.measureText(truncated + ellipsis).width > maxWidth && truncated.length > 0) {
            truncated = truncated.slice(0, -1);
        }
        return truncated + ellipsis;
    }

    drawTooltip(ctx) {
        if (!this.hoveredNode) return;
        const node = this.hoveredNode;
        
        const text = node.name;
        const subText = node.profession || "";
        
        ctx.save();
        // Ensure identity transform for screen space drawing
        ctx.setTransform(1, 0, 0, 1, 0, 0); 
        
        ctx.font = "bold 14px Arial";
        const textWidth = ctx.measureText(text).width;
        ctx.font = "12px Arial";
        const subTextWidth = subText ? ctx.measureText(subText).width : 0;
        
        const boxWidth = Math.max(textWidth, subTextWidth) + 20;
        const boxHeight = subText ? 46 : 28;
        
        // Position near mouse but keep within canvas
        let x = this.mouseX + 15;
        let y = this.mouseY + 15;

        // Simple boundary check
        if (x + boxWidth > ctx.canvas.width / window.devicePixelRatio) {
            x = this.mouseX - boxWidth - 5;
        }
        if (y + boxHeight > ctx.canvas.height / window.devicePixelRatio) {
            y = this.mouseY - boxHeight - 5;
        }
        
        // Background
        ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.roundRect(x, y, boxWidth, boxHeight, 6);
        ctx.fill();
        ctx.stroke();
        
        // Text
        ctx.fillStyle = "#fff";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        
        ctx.font = "bold 14px Arial";
        ctx.fillText(text, x + 10, y + 8);
        
        if (subText) {
            ctx.font = "12px Arial";
            ctx.fillStyle = "#ddd";
            ctx.fillText(subText, x + 10, y + 26);
        }
        
        ctx.restore();
    }

    drawNodes(ctx) {
        const halfW = CONFIG.cardWidth / 2;
        const scale = this.transform.k;
        
        // Determine LOD Level
        let lod = 2; // High
        if (scale < 0.1) lod = 0; // Low (Box) - Changed from 0.2
        else if (scale < 0.3) lod = 1; // Medium (No shadow/dates) - Changed from 0.6

        // High-res threshold (only load when really close)
        const useHighRes = scale > 1.2;

        // Culling: Only draw visible layers and visible buckets
        const viewL = -this.transform.x / scale;
        const viewT = -this.transform.y / scale;
        const viewW = this.canvas.width / (window.devicePixelRatio||1) / scale;
        const viewH = this.canvas.height / (window.devicePixelRatio||1) / scale;
        const viewR = viewL + viewW;
        const viewB = viewT + viewH;

        // Bucket Range
        const minBucket = Math.floor((viewL - CONFIG.cardWidth) / this.layoutEngine.bucketSize);
        const maxBucket = Math.floor((viewR + CONFIG.cardWidth) / this.layoutEngine.bucketSize);

        this.layoutEngine.layers.forEach(layer => {
            if (!layer) return;
            // Vertical Culling
            if (layer.y + CONFIG.cardHeight < viewT || layer.y > viewB) return;

            // Iterate only visible buckets
            for (let b = minBucket; b <= maxBucket; b++) {
                const bucket = layer.buckets.get(b);
                if (!bucket) continue;

                for (const node of bucket) {
                    // Fine-grained Horizontal Culling
                    if (node.x + halfW < viewL || node.x - halfW > viewR) continue;

                    this.drawSingleNode(ctx, node, lod, useHighRes);
                }
            }
        });
    }

    drawSingleNode(ctx, node, lod, useHighRes) {
        const x = node.x - CONFIG.cardWidth / 2;
        const y = node.y;
        const w = CONFIG.cardWidth;
        const h = CONFIG.cardHeight;
        const r = 8; // border radius

        // Common: Background & Border
        ctx.fillStyle = CONFIG.defaultColor;
        
        // Shadow only on High LOD
        if (lod === 2) {
            ctx.shadowColor = "rgba(0,0,0,0.1)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetY = 2;
        }
        
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        ctx.fill();
        ctx.shadowColor = "transparent";

        // Border
        if (node.id === this.selectedNodeId) {
            ctx.lineWidth = 4;
            ctx.strokeStyle = CONFIG.selectedBorderColor;
        } else {
            ctx.lineWidth = 2;
            ctx.strokeStyle = (node.death === undefined) ? CONFIG.aliveBorderColor : CONFIG.deadBorderColor;
        }
        ctx.stroke();

        // Geometry calculations for content
        const imgSize = CONFIG.avatarSize;
        const imgX = x + (w - imgSize) / 2; 
        const imgY = y + 15;
        const radius = imgSize / 2;
        const centerX = imgX + radius;
        const centerY = imgY + radius;

        // --- LOD < 2 (Abstract View) ---
        if (lod < 2) {
            // 1. Avatar Circle (Grey OR AvgColor)
            const imgData = this.imageManager.get(node, false);
            // Use average color if available, otherwise fallback to grey
            ctx.fillStyle = (imgData && imgData.avgColor) ? imgData.avgColor : "#e0e0e0";
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();

            // 2. FB Dot (Blue)
            if (node.fb) {
                 ctx.fillStyle = "#1877F2";
                 ctx.beginPath();
                 ctx.arc(x + w - 20, y + 20, 6, 0, Math.PI * 2); 
                 ctx.fill();
            }

            // 3. Text Lines
            const textCenterX = x + w / 2;
            let textY = imgY + imgSize + 20;
            
            // Name Line
            ctx.fillStyle = "#d0d0d0";
            const nameWidth = 80;
            ctx.beginPath();
            ctx.roundRect(textCenterX - nameWidth/2, textY, nameWidth, 12, 4);
            ctx.fill();
            
            // Profession Line
            if (node.profession) {
                ctx.fillStyle = "#e8e8e8";
                const profWidth = 60;
                ctx.beginPath();
                ctx.roundRect(textCenterX - profWidth/2, textY + 18, profWidth, 10, 4);
                ctx.fill();
            }
            
            return;
        }

        // --- LOD 2 (High Detail) ---
        
        // Image
        const imgData = this.imageManager.get(node, useHighRes);
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.clip();
        
        if (imgData && imgData.loaded) {
            ctx.drawImage(imgData.img, imgX, imgY, imgSize, imgSize);
        } else {
            ctx.fillStyle = "#eee";
            ctx.fillRect(imgX, imgY, imgSize, imgSize);
            ctx.fillStyle = "#aaa";
            ctx.font = "24px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(node.name.charAt(0), centerX, centerY);
        }
        ctx.restore();

        // Text
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        const textCenterX = x + w / 2;
        let textY = imgY + imgSize + 15;

        // Name
        ctx.fillStyle = CONFIG.textColor;
        ctx.font = CONFIG.fontMain;
        // Truncate Name using Cached Version
        const maxWidth = CONFIG.cardWidth - 10;
        ctx.fillText(this.getFittedText(ctx, node, 'name', node.name, maxWidth), textCenterX, textY);
        
        // Facebook Icon
        if (node.fb) {
            ctx.drawImage(this.imageManager.facebookIcon, x + w - 24, y + 8, 16, 16);
        }

        textY += 18;

        // Profession
        if (node.profession) {
            ctx.fillStyle = "#666";
            ctx.font = CONFIG.fontSub;
            // Truncate Profession using Cached Version
            ctx.fillText(this.getFittedText(ctx, node, 'prof', node.profession, maxWidth), textCenterX, textY);
            textY += 16;
        }

        // Dates (Corners)
        ctx.fillStyle = "#888";
        ctx.font = CONFIG.fontSmall;
        const padding = 10;
        const footerY = y + h - 15;

        // Birth (Bottom Left)
        if (node.birth) {
            ctx.textAlign = "left";
            ctx.fillText(node.birth, x + padding, footerY);
        }

        // Death (Bottom Right)
        if (node.death) {
            ctx.textAlign = "right";
            ctx.fillText(node.death, x + w - padding, footerY);
        }
    }

    drawConnections(ctx) {
        const scale = this.transform.k;
        const getLineWidth = (baseWidth) => Math.max(baseWidth * scale, 1) / scale;
        
        ctx.strokeStyle = "#ccc";

        // View bounds for connection culling
        const viewT = -this.transform.y / scale;
        const viewH = this.canvas.height / (window.devicePixelRatio||1) / scale;
        const viewB = viewT + viewH;
        
        // Iterate visible vertical layers for connections.
        // We removed horizontal bucket culling to ensure long connections are drawn.
        this.layoutEngine.layers.forEach((layer, depth) => {
             if (!layer) return;
             // Check if layer or the one below it is visible (since connections go down)
             const nextLayerY = this.layoutEngine.getYForDepth(depth + 1);
             if (nextLayerY < viewT || layer.y > viewB) return;

             // Iterate ALL nodes in this visible layer to ensure connections are drawn
             // even if parent is horizontally off-screen
             for (const node of layer.allNodes) {
                 // 1. Partner connections
                 if (node.partnerNode && node.id < node.partnerNode.id) {
                     ctx.save();
                     const nodeDepth = node.depth || 0;
                     const baseThick = Math.max(1.5, 5 - nodeDepth * 0.5); 
                     ctx.lineWidth = getLineWidth(baseThick);
                     ctx.setLineDash([6 / scale, 4 / scale]); 
                     
                     ctx.beginPath();
                     const yLevel = node.y + CONFIG.cardHeight * 0.8;
                     const x1 = node.x + CONFIG.cardWidth/2;
                     const x2 = node.partnerNode.x - CONFIG.cardWidth/2;
                     ctx.moveTo(x1, yLevel);
                     ctx.lineTo(x2, yLevel);
                     ctx.stroke();
                     ctx.restore();
                 }

                 // 2. Children connections
                 if (node.children && node.children.length > 0) {
                     node.children.forEach(child => {
                         const father = child.fid ? this.layoutEngine.nodes.get(child.fid) : null;
                         const mother = child.mid ? this.layoutEngine.nodes.get(child.mid) : null;
                         const hasTwoParents = father && mother;
                         
                         if (hasTwoParents && node.id !== father.id) return;
                         
                         let originX = node.x;
                         let originY = node.y + CONFIG.cardHeight; 
                         if (hasTwoParents) {
                             originX = (father.x + mother.x) / 2;
                             originY = father.y + CONFIG.cardHeight * 0.8;
                         }
                         const destX = child.x;
                         const destY = child.y;
                         const midY = (originY + destY) / 2;

                         const childDepth = child.depth || 0;
                         const thickness = Math.max(1.5, 8 - childDepth * 0.7);
                         
                         ctx.lineWidth = getLineWidth(thickness);

                         ctx.beginPath();
                         ctx.moveTo(originX, originY);
                         ctx.bezierCurveTo(originX, midY, destX, midY, destX, destY);
                         ctx.stroke();
                     });
                 }
             }
        });
    }

    drawTimeline(ctx, h) {
        // Calculate levels
        const levels = {};
        this.layoutEngine.nodes.forEach(n => {
                const lvl = Math.round(n.y);
                if (!levels[lvl]) levels[lvl] = [];
                if (n.birth && typeof n.birth === 'number') levels[lvl].push(n.birth);
        });

        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.font = "bold 12px Arial";
        
        Object.keys(levels).forEach(yPos => {
            const births = levels[yPos];
            if (births.length > 0) {
                const avg = Math.round(births.reduce((a,b)=>a+b,0)/births.length);
                // Calculate screen Y
                const screenY = (parseInt(yPos) * this.transform.k) + this.transform.y;
                
                if (screenY > 0 && screenY < h) {
                    ctx.fillText(avg, 20, screenY);
                    // Draw small tick
                    ctx.fillRect(10, screenY, 5, 1);
                }
            }
        });
        ctx.restore();
    }
}

// Global redraw trigger for image loading
let appInstance = null;
function requestRedraw() {
    if (appInstance) appInstance.requestRender();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    appInstance = new TreeRenderer('treeCanvas', rawNodes);
    setupSearch();

    // Check URL for specific node selection (e.g., ?id=28)
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    if (idParam) {
        const nodeId = parseInt(idParam);
        // Access nodes from the layout engine which uses a Map
        const node = appInstance.layoutEngine.nodes.get(nodeId);
        if (node) {
            appInstance.selectNode(node);
        }
    } else {
        // Only fit to screen if no ID is provided
        appInstance.fitToScreen();
    }
});

function setupSearch() {
    const input = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');
    let currentMatches = [];
    let selectedIndex = 0;

    function selectResult(node) {
        const internalNode = appInstance.layoutEngine.nodes.get(node.id);
        if (internalNode) {
            appInstance.selectNode(internalNode);
        }
        
        input.value = '';
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
    }

    function renderList() {
        resultsContainer.innerHTML = '';
        currentMatches.forEach((node, index) => {
            const div = document.createElement('div');
            div.className = `search-result-item${index === selectedIndex ? ' selected' : ''}`;
            
            let imgHtml = `<div class="search-avatar">${node.name[0]}</div>`;
            if (node.image) {
                imgHtml = `<img src="${CONFIG.thumbnailPath + node.image}" class="search-avatar" onerror="this.parentElement.innerHTML='<div class=\\'search-avatar\\'>${node.name[0]}</div>'">`;
            }

            // Add profession if exists
            const nameDisplay = node.profession ? `${node.name} - ${node.profession}` : node.name;

            div.innerHTML = `
                ${imgHtml}
                <div class="search-info">
                    <span class="search-name">${nameDisplay}</span>
                    <span class="search-meta">${node.birth || '?'} - ${node.death || '?'}</span>
                </div>
            `;
            
            div.addEventListener('click', () => selectResult(node));
            
            // Mouse enter sets selected index for keyboard continuity
            div.addEventListener('mouseenter', () => {
                selectedIndex = index;
                updateSelection();
            });

            resultsContainer.appendChild(div);
        });
    }

    function updateSelection() {
        const items = resultsContainer.children;
        for (let i = 0; i < items.length; i++) {
            if (i === selectedIndex) items[i].classList.add('selected');
            else items[i].classList.remove('selected');
        }
        
        // Ensure visible
        if (items[selectedIndex]) {
            const item = items[selectedIndex];
            const containerTop = resultsContainer.scrollTop;
            const containerBottom = containerTop + resultsContainer.clientHeight;
            const itemTop = item.offsetTop;
            const itemBottom = itemTop + item.offsetHeight;

            if (itemTop < containerTop) {
                resultsContainer.scrollTop = itemTop;
            } else if (itemBottom > containerBottom) {
                resultsContainer.scrollTop = itemBottom - resultsContainer.clientHeight;
            }
        }
    }

    input.addEventListener('keydown', (e) => {
        if (resultsContainer.style.display === 'none') return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % currentMatches.length;
            updateSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + currentMatches.length) % currentMatches.length;
            updateSelection();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentMatches[selectedIndex]) {
                selectResult(currentMatches[selectedIndex]);
            }
        }
    });

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        // Filter nodes
        const matches = rawNodes.filter(node => 
            node.name.toLowerCase().includes(query)
        );

        currentMatches = matches.slice(0, 10);
        selectedIndex = 0; // Reset selection to top

        if (currentMatches.length > 0) {
            resultsContainer.style.display = 'block';
            renderList();
        } else {
            resultsContainer.style.display = 'none';
        }
    });

    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            resultsContainer.style.display = 'none';
        }
    });
}