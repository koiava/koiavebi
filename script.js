document.addEventListener('DOMContentLoaded', () => {
    const nodes = [
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
		{ id:   4, name: "ივანე?", death: '????', fid: 1 },
		{ id:   5, name: "ქაქუჩია", death: '????', fid: 1 },
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
		{ id:  52, name: "შოთა", fid: 44 },
		{ id:  53, name: "ლევანი", death: '1???', fid: 44, pid: 178 },
		{ id:  49, name: "სერგო", fid: 44 },
		{ id:  50, name: "ჭიჭიკო", fid: 44 },
		{ id:  51, name: "ტატიანა/კუკუშა", fid: 44 },
		{ id:  54, name: "ჯონი", pid: 117, fid: 52, image: "joni.jpg" },
		{ id: 117, name: "ლია გაბრიჩიძე", image: "lia_gabrichidze.jpg" },
		{ id:  55, name: "ბუხუტი", pid: 135, fid: 52 },
		{ id:  56, name: "რუსიკო", fid: 52 },
		{ id:  57, name: "შოთა", pid: 136, mid: 135, fid: 55 },
		{ id:  58, name: "თინათინი", fb: "tina.qoiava", mid: 135, fid: 55, image: "tina.jpg" },
		{ id:  59, name: "ოთარი", birth: 1953, death: 2019, pid: 127, fid: 53, mid: 178, image: "otari.jpg" },
		{ id:  60, name: "ნარგიზი", birth: 1954, fb: "profile.php?id=100084369526554", fid: 53, mid: 178, image: "nargizi.jpg" },
		{ id:  61, name: "ნანი", fid: 53, mid: 178, image: "nani.jpg" },
		{ id:  62, name: "ლევანი", birth: 1977, fb: "levan.qoiava", pid: 132, mid: 127, fid: 59, profession: "ბიზნესმენი", image: "levani_2.jpg" },
		{ id:  63, name: "ხათუნა", birth: 1981, fb: "profile.php?id=100004205866871", pid: 128, mid: 127, fid: 59, image: "khatuna.jpg" },
		{ id:  64, name: "ნიკო", birth: 2000, mid: 132, fid: 62, image: "niko.jpg" },
		{ id:  65, name: "ბარბარე", birth: 2000, mid: 132, fid: 62, image: "barbare.jpg" },
		{ id:  66, name: "ლიზი", birth: 2004, mid: 132, fid: 62, image: "lizi.jpg" },
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
		{ id:  89, name: "იმედო", mid:133, fid: 76, birth: '19??', death: '19??', pid: 188, profession: "აფთიაქარი", image: 'imedo.jpg' },
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
		{ id: 188, name: "ტიტიკო შარუხია", birth: '19??', death: '????', image: "titiko_sharukhia.jpg" },
		{ id: 189, name: "ნარგიზა შარუხია", birth: '1950', mid: 89, fid: 188, fb: "nargiza.grigolia", image: "nargiza_sharukhia.jpg" },
		{ id: 190, name: "ნინო შარუხია", birth: '1960', mid: 89, fid: 188, fb: "nino.sharukhia.5", image: "nino_sharukhia.jpg" },
		{ id: 191, name: "ნაირა შარუხია", birth: '1957', mid: 89, fid: 188, fb: "naira.sharukhia", image: "naira_sharukhia.jpg" },
		
		
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
		{ id: 375, fid: 372, name: "ანი" },
		{ id: 376, fid: 367, mid: 446, name: "მამუკა", fb: "mamuka.koiava.7", image: "mamuka.jpg", pid: 434 },
		{ id: 377, fid: 367, mid: 446, name: "კახაბერი", birth: 1976, fb: "kakha.koiava", profession: "გეოლოგი", image: "kakha.jpg" },
		{ id: 378, name: "მარიამი", fb: "mariam.koiavaa", fid: 376, mid: 434, image: "mariami_3.jpg" },
		{ id: 379, name: "ლუკა", fid: 376, mid: 434, image: "luka.jpg" },
		{ id: 380, fid: 377, name: "ნიკოლოზი" },
		{ id: 381, fid: 377, name: "ნინი" },
		{ id: 382, name: "ლალი", fid: 368, mid: 443, birth: 1961, profession: "ექიმი", fb: "lali.koiava.5", pid: 425, image: "lali.jpg" },
		{ id: 383, name: "ხათუნა", fid: 368, mid: 443, birth: 1963, death: 2007, pid: 428 },
		{ id: 384, fid: 369, mid: 445, name: "რუსლანი" },
		{ id: 385, fid: 369, mid: 445, name: "ლევანი" },
		{ id: 386, fid: 385, name: "---" },
		{ id: 387, fid: 385, name: "---" },
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
		
		
		{ id: 1006, name: "მახა", birth: 1797, death: '1???', fid: 5 },
		{ id: 1007, name: "გოჯოგია", death: '1???', fid: 5 },
		{ id: 1008, name: "მამუკა", death: '1???', fid: 5 },
		{ id: 1009, name: "ოსიე", death: '1???', fid: 5 },
		{ id: 1010, name: "გიტა", death: '1???', fid: 5 },
		{ id: 1011, name: "ნინო", death: '1???', pid: 1014, fid: 1006 },
		{ id: 1012, name: "კაცია", birth: 1825, death: '1???', fid: 1006 },
		{ id: 1013, name: "ანდრია", death: '1???', fid: 1007 },
		{ id: 1014, name: "--- გეგენავა", death: '1???' },
		{ id: 1015, name: "სუმო", death: '1???', fid: 1008 },
		{ id: 1016, name: "ივანე", death: '1???', fid: 1009 },
		{ id: 1017, name: "ფილიპე", death: '1???', fid: 1010 },
		{ id: 1018, name: "ისიდორე", death: '1???', fid: 1012 },
		{ id: 1019, name: "სარდიონი", death: '1???', fid: 1012 },
		{ id: 1020, name: "ქრისტინე", death: '1???', pid: 1021, fid: 1012 },
		{ id: 1021, name: "--- პატარაია", death: '1???' },
		{ id: 1022, name: "ნიკოლოზი", birth: 1853, death: '1???', fid: 1012 },
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
		{ id: 1034, name: "პეტრე", fid: 1022 },
		{ id: 1035, name: "მარია", pid: 1040, fid: 1022 },
		{ id: 1036, name: "რომანოზი", birth: 1880, death: 1969, fid: 1022 },
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
		{ id: 1067, name: "ლია", fid: 1056 },
		{ id: 1068, name: "ნათელა", fid: 1056 },
		{ id: 1069, name: "ავთანდილი", birth: 1948, fb: "giimpex.ak", fid: 1056, image: "avtandil.jpg" },
		{ id: 1070, name: "ვლადიმერი/ვალერი", fid: 1057 },
		{ id: 1071, name: "ქეთინო", birth: 1960, fb: "ketino.koiava", pid: 1079, fid: 1063, mid: 1080, image: "ketino.jpg" },
		{ id: 1072, name: "ნანა", birth: 1966, fb: "nana.koiava.35", pid: 1092, fid: 1063, mid: 1080, image: "nana_2.jpg"  },
		{ id: 1073, name: "ციცო", fid: 1065 },
		{ id: 1074, name: "მალხაზი", fid: 1065 },
		{ id: 1075, name: "თინათინი", fb: "tinatin.koiava", birth: 1977, fid: 1069, profession: "სტომატოლოგი", image: "tinatini.jpg" },
		{ id: 1076, name: "ნიკა", fb: "nikolas.koiava", birth: 1980, fid: 1069, profession: "ბიზნეს ადმინისტრატორი/ლექტორი", image: "nika.jpg" },
		{ id: 1077, name: "ეკატერინე", fid: 1070 },
		{ id: 1078, name: "ელმირა", fid: 1070 },
		{ id: 1079, name: "ანატოლი გრიგოლია", image: "anatoli_grigolia.jpg" },
		{ id: 1080, name: "ზაირა მიქაძე", death: 2022, image: "zaira.jpg" },
		{ id: 1081, name: "ალექსანდრე", fid: 1076, image: "aleksandre_4.jpg" },
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
		{ id: 1096, name: "იოანე", mid: 1075, image: "ioane_2.jpg" },
		{ id: 1097, name: "თინა", birth: 1930 },
		
		
		{ id: 2000, name: "ოთარი", death: '1???', fid: 2 },
		{ id: 2001, name: "იოსკა", death: '1???', fid: 2000 },
		{ id: 2002, name: "იაგორი", death: '1???', fid: 2001 },
		{ id: 2003, name: "დიმიტრი", death: '1???', fid: 2001 },
		{ id: 2004, name: "კონსტანტინე", death: '1???', fid: 2002 },
		{ id: 2005, name: "მარიამი", death: '1???', fid: 2003 },
		{ id: 2006, name: "ალეკო", fid: 2004 },
		{ id: 2007, name: "მარო დუნდუა", mid: 2005 },
		
    ];

    createNodes(nodes);
	
	const rootNode = document.querySelector('.tree > .node'); // Get only the first root node
    layoutTree(rootNode); // Call layoutTree on the root node only
	
    setupZoomPan(nodes, 0.05, 1000, 300);
    drawConnections(nodes, 1);
    createTimeLabels(nodes);
});

function layoutTree(nodeElement, depth = 0) {
    const nodeWidth = nodeElement.offsetWidth;
    const partnerSpacing = 20; // Closer spacing for partners
    const horizontalSpacing = 50;
    const baseVerticalSpacing = 100; // Minimum vertical spacing
    const verticalSpacingIncrement = 100; // Additional spacing for each depth level
	
    const childrenContainer = nodeElement.querySelector('.children');
    if (!childrenContainer || childrenContainer.children.length === 0) {
		//console.log(`Leaf width: ${nodeWidth}`);
		return nodeWidth;
	}
	
	const bothParents = !(nodeElement.dataset.pid === undefined);

    let subtreeWidth = 0;
    const childPairs = [];

    let i = 0;
    while (i < childrenContainer.children.length) {
        const child = childrenContainer.children[i];
        let childWidth = layoutTree(child, depth + 1);

        if (i < childrenContainer.children.length - 1 &&
            child.dataset.pid === childrenContainer.children[i + 1].dataset.id) {

            const partner = childrenContainer.children[i + 1];
            //const partnerWidth = layoutTree(partner);
			
            childPairs.push({
                node1: child,
                node2: partner,
                totalWidth: Math.max(childWidth, nodeWidth * 2 + partnerSpacing)
            });

            i += 2; // Skip the partner node as it is already handled
        } else {
            childPairs.push({ node1: child, totalWidth: childWidth });
            i++;
        }

        subtreeWidth += childPairs[childPairs.length - 1].totalWidth + horizontalSpacing;
    }

    subtreeWidth = Math.max(subtreeWidth - horizontalSpacing, nodeWidth); // Ensure minimum width

	const verticalSpacing = baseVerticalSpacing + (Math.max(0, 10-depth) * verticalSpacingIncrement);
    let currentLeft = (bothParents? (nodeWidth + partnerSpacing) / 2 : 0) + nodeWidth / 2 - subtreeWidth / 2;
    childPairs.forEach(pair => {
		let childWidth = pair.node2? nodeWidth * 2 + partnerSpacing : nodeWidth;
        pair.node1.style.position = 'absolute';
        pair.node1.style.left = `${currentLeft + pair.totalWidth/2 - childWidth/2}px`;
        pair.node1.style.top = `${verticalSpacing}px`;

        if (pair.node2) { // Adjust for partner
            pair.node2.style.position = 'absolute';
            pair.node2.style.left = `${currentLeft + pair.totalWidth/2 - childWidth/2 + pair.node1.offsetWidth + partnerSpacing}px`;
            pair.node2.style.top = `${verticalSpacing}px`;
        }

        currentLeft += pair.totalWidth + horizontalSpacing;
    });

    return subtreeWidth;
}

function nodeInnerHTML(node) {
	let imagePath = "images/";
	let thumbnailPath = "images/thumbnails/";
	return `
			${node.fb ? `<img class="fb-icon" src="images/icons/fb.png" alt="FB profile" data-fb="${node.fb}">` : ''}
            <img src="${thumbnailPath}${node.image}" alt="${node.name}">
            <div class="info">
                <h3>${node.name}</h3>
                <p>${node.profession || ''}</p>
            </div>
            <div class="node-footer">
                <span class="birth">${node.birth || ''}</span>
                <span class="death">${node.death || ''}</span>
            </div>
        `;
}

function createNodes(nodes) {
    const tree = document.querySelector('.tree');
    tree.innerHTML = ''; // Clear previous content

    const processed = new Set(); // Keep track of processed node IDs

    function addNode(node, parentElement) {
        if (processed.has(node.id)) return; // Skip if already added
        processed.add(node.id); // Mark this node as processed
		
        const nodeElement = document.createElement('div');
        nodeElement.classList.add('node');
        nodeElement.setAttribute('data-id', node.id);
		if(node.fid !== undefined)
			nodeElement.setAttribute('data-fid', node.fid);
		if(node.mid !== undefined)
			nodeElement.setAttribute('data-mid', node.mid);

        nodeElement.innerHTML = nodeInnerHTML(node);
		if (node.death === undefined) {
            nodeElement.style.borderColor = '#ACE1AF'; // Apply green outline
        }

        parentElement.appendChild(nodeElement);

        // Create a container for children
        const childrenContainer = document.createElement('div');
        childrenContainer.classList.add('children'); // This will hold children horizontally
        nodeElement.appendChild(childrenContainer);
		
		// Find children based on fid or mid
        nodes.forEach(childNode => {
            if (childNode.fid === node.id || childNode.mid === node.id) {
                addNode(childNode, childrenContainer); // Add children to the container
            }
        });
		
		// Add partner if it exists
        if (node.pid) {
			const partnerNode = nodes.find(n => n.id === node.pid); // Find partner
            if (partnerNode) {
                nodeElement.setAttribute('data-pid', partnerNode.id); // Set partner ID on current node
                const partnerElement = document.createElement('div');
                partnerElement.classList.add('node');
                partnerElement.setAttribute('data-id', partnerNode.id);
                partnerElement.setAttribute('data-pid', node.id); // Set mutual partner ID

                partnerElement.innerHTML = nodeInnerHTML(partnerNode);
				if (partnerNode.death === undefined) {
					partnerElement.style.borderColor = '#ACE1AF'; // Apply green outline
				}
                
                parentElement.appendChild(partnerElement); // Append partner node
            }
        }
    }

    addNode(nodes[0], tree); // Start with the root node
}

function drawConnections(nodes) {
	const container = document.querySelector('.tree-container');
    const svg = document.querySelector('.connections');
    svg.innerHTML = '';

	// Iterate through all nodes to find their parents
    nodes.forEach(childNode => {
        const childElement = document.querySelector(`.node[data-id='${childNode.id}']`);
        if (!childElement) return; // Skip if the child node is not found

		let fatherElement, motherElement;

		// Check for both parents
		if (childNode.fid) {
			const fatherNode = nodes.find(n => n.id === childNode.fid); // Find father //nodes[childNode.fid];
			if (fatherNode) {
				fatherElement = document.querySelector(`.node[data-id='${fatherNode.id}']`);
			}
		}

		if (childNode.mid) {
			const motherNode = nodes.find(n => n.id === childNode.mid); // Find Mother nodes[childNode.mid];
			if (motherNode) {
				motherElement = document.querySelector(`.node[data-id='${motherNode.id}']`);
			}
		}

        // Find parent based on fid or mid
		if (fatherElement && motherElement) {
			drawConnectionToParents(fatherElement, motherElement, childElement, container);
		} else {
			if (fatherElement) {
				drawConnectionToParent(fatherElement, childElement, container);
			}
			
			if (motherElement) {
				drawConnectionToParent(motherElement, childElement, container);
			}
		}
    });
	
    nodes.forEach(node => {
        const parent = document.querySelector(`.node[data-id='${node.id}']`);
        if (!parent) return; // Skip if the parent is not found

        if (node.pid) {
			const partnerNode = nodes.find(n => n.id === node.pid); //nodes[node.pid]; // Get partner node
            if (partnerNode) {
				const partnerElement = document.querySelector(`.node[data-id='${partnerNode.id}']`);
                drawConnectionToPartner(parent, partnerElement, container);
            }
        }
    });
}

function drawConnectionToPartner(fromNode, toNode, container) {
    const fromRect = fromNode?.getBoundingClientRect();
    const toRect = toNode?.getBoundingClientRect();
	
    if (!fromRect || !toRect) return; // Ensure both nodes exist before drawing
	
	const box = container.getBoundingClientRect();

	const startX = fromRect.right - box.left; 
	const startY = fromRect.top + fromRect.height * 0.8 - box.top;
	const endX = toRect.left- box.left;
	const endY = toRect.top + toRect.height * 0.8 - box.top;
	
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute('d', `M${startX} ${startY} L${endX} ${endY}`);
	path.setAttribute('stroke-dasharray', '5,5');
	path.setAttribute('stroke-width', '2'); // Set the desired thickness
    path.setAttribute('stroke', '#ccc');
    path.setAttribute('fill', 'transparent');
    document.querySelector('.connections').appendChild(path);
}

function drawConnectionToParent(fromNode, toNode, container) {
    const fromRect = fromNode?.getBoundingClientRect();
    const toRect = toNode?.getBoundingClientRect();
	
    if (!fromRect || !toRect) return; // Ensure both nodes exist before drawing
	
	const box = container.getBoundingClientRect();

	const startX = fromRect.left + fromRect.width / 2 - box.left; 
	const startY = fromRect.bottom - box.top;
	const endX = toRect.left + toRect.width / 2 - box.left;
	const endY = toRect.top - box.top;
	
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	//path.setAttribute('d', `M${startX} ${startY} L${endX} ${endY}`);
	path.setAttribute('d', `M${startX} ${startY} C${startX} ${(startY + endY) / 2}, ${endX} ${(startY + endY) / 2}, ${endX} ${endY}`);
	path.setAttribute('stroke-dasharray', '0');
	path.setAttribute('stroke-width', '2'); // Set the desired thickness
    path.setAttribute('stroke', '#ccc');
    path.setAttribute('fill', 'transparent');
	path.setAttribute('stroke-width', Math.max(1, Math.abs(startY - endY) / 100));
    document.querySelector('.connections').appendChild(path);
}

function drawConnectionToParents(parent1, parent2, toNode, container) {
    const parent1Rect = parent1?.getBoundingClientRect();
	const parent2Rect = parent2?.getBoundingClientRect();
    const toRect = toNode?.getBoundingClientRect();
	
    if ((!parent1Rect && !parent2Rect) || !toRect) return; // Ensure both nodes exist before drawing
	
	const box = container.getBoundingClientRect();

	const startX = (
		parent1Rect.left + parent1Rect.width / 2 - box.left +
		parent2Rect.left + parent2Rect.width / 2 - box.left ) / 2; 
	const startY = (
		parent1Rect.top + parent1Rect.height * 0.8 - box.top +
		parent2Rect.top + parent2Rect.height * 0.8 - box.top ) / 2;
	const middleX = startX;
	const middleY = parent1Rect.bottom - box.top;
	
	const endX = toRect.left + toRect.width / 2 - box.left;
	const endY = toRect.top - box.top;
	
	//console.log(`Start (${startX}, ${startY}), End (${endX}, ${endY})`);
	
	const curveWidth = Math.max(1, Math.abs(startY - endY) / 100);
	const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	line.setAttribute('d', `M${startX} ${startY} L${middleX} ${middleY}`);
	line.setAttribute('stroke-dasharray', '0');
	line.setAttribute('stroke-width', '2'); // Set the desired thickness
    line.setAttribute('stroke', '#ccc');
    line.setAttribute('fill', 'transparent');
	line.setAttribute('stroke-width', curveWidth);
    document.querySelector('.connections').appendChild(line);
	
	
	const curve = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	curve.setAttribute('d', `M${middleX} ${middleY} C${middleX} ${(middleY + endY) / 2}, ${endX} ${(middleY + endY) / 2}, ${endX} ${endY}`);
	curve.setAttribute('stroke-dasharray', '0');
	curve.setAttribute('stroke-width', '2'); // Set the desired thickness
    curve.setAttribute('stroke', '#ccc');
    curve.setAttribute('fill', 'transparent');
	curve.setAttribute('stroke-width', curveWidth);
    document.querySelector('.connections').appendChild(curve);
}

function createTimeLabels(nodes) {
    const timeline = document.querySelector('.timeline');
    timeline.innerHTML = ''; // Clear previous labels

    const levelPositions = {};

    nodes.forEach(node => {
        const nodeElement = document.querySelector(`.node[data-id='${node.id}']`);
        if (!nodeElement) return;

        const nodeRect = nodeElement.getBoundingClientRect();
        const levelKey = Math.round(nodeRect.top);

        if (!levelPositions[levelKey]) {
            levelPositions[levelKey] = [];
        }
        if (node.birth !== undefined && typeof node.birth === 'number') {
            levelPositions[levelKey].push(node.birth); // Only add defined birth years
        }
    });

    Object.entries(levelPositions).forEach(([levelKey, births]) => {
        const topPosition = parseFloat(levelKey);

        if (births.length > 0) {
            const averageYear = Math.round(births.reduce((sum, year) => sum + year, 0) / births.length);

            const label = document.createElement('div');
            label.style.position = 'absolute';
            label.style.top = `${topPosition - 12}px`;
            label.style.left = '10%';
            label.style.fontSize = '12px';
            label.style.color = '#666';
            label.innerText = averageYear;
            
            timeline.appendChild(label);
        }
    });
}

function setupZoomPan(nodes, s, tx, ty) {
    const container = document.querySelector('.tree-container');
    const tree = document.querySelector('.tree');
    const svg = document.querySelector('.connections');
	
    let scale = s;
	let translateX = tx;
	let translateY = ty;

    let isPanning = false;
    let startX, startY;
	let zoomStartDist;
	let startScale;
	
	updateTransform();
	/*
	document.querySelectorAll('.node').forEach(node => {
		node.addEventListener('dblclick', function(event) {
			event.stopPropagation();
			const rect = node.getBoundingClientRect();
			const treeRect = container.getBoundingClientRect();

			// Calculate the center of the node relative to the container
			const nodeCenterX = rect.left + rect.width / 2;
			const nodeCenterY = rect.top + rect.height / 2;
			
			// Log the calculated center positions
			console.log(`x: ${translateX}, y: ${translateY}`);
			
			console.log(`treeW: ${treeRect.width}`);
        
			// Desired zoom scale
			const newScale = 1.0;//(rect.top - rect.bottom) / window.innerHeight; // Zoom in factor
			
			const treeCenterX = translateX + treeRect.width / 2;
			const treeCenterY = translateY + treeRect.height / 2;
        
			// Calculate new translate values, considering the current scale
			translateX = (treeCenterX - nodeCenterX);// * (newScale/scale);
			translateY = (treeCenterY - nodeCenterY);// * (newScale/scale);

			scale = newScale;

			// Apply transformation to the entire tree
			updateTransform();
			drawConnections(nodes); // Synchronize connections
			createTimeLabels(nodes);
		});
	});*/
	
	// Adjust dimensions for interactions
    container.style.overflow = 'hidden';
	tree.style.transformOrigin = 'top left';
    svg.style.transformOrigin = 'top left';
	
	function startMoving(e) {
		isPanning = true;
        container.style.cursor = 'grabbing';
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
	}
	
	function handleMoving(e) {
		if (!isPanning) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
	}
	
	function endMoving() {
		isPanning = false;
        container.style.cursor = 'grab';
	}
	
	function handleZoom(x, y, newScale) {
		const rect = container.getBoundingClientRect();
        const offsetX = x - rect.left;
        const offsetY = y - rect.top;
	
        const scaleRatio = newScale / scale;

        translateX = offsetX - scaleRatio * (offsetX - translateX);
        translateY = offsetY - scaleRatio * (offsetY - translateY);

        scale = newScale;
	}
	
	document.querySelectorAll('.fb-icon').forEach(fbIcon => {
		fbIcon.addEventListener('click', (e) => {
			e.stopPropagation();
			openFacebookProfile(e.target.dataset.fb);
		});

		fbIcon.addEventListener('touchstart', (e) => {
			e.preventDefault();
			openFacebookProfile(e.target.dataset.fb);
		}, { passive: false });
	});
	
	function openFacebookProfile(fbuser) {
		const ending = fbuser.startsWith("profile.php")? "" : "/";
		const url = `https://www.facebook.com/${fbuser}${ending}`; // Construct the URL
		window.open(url, '_blank'); // Open in a new tab
	}
	
	container.addEventListener('touchstart', function (e) {
		e.preventDefault();
		if (e.touches.length === 1) {
			startMoving(e.touches[0]);
			console.log("moving start");
		} else if (e.touches.length === 2) { // Double-tap for zooming
			const touch0 = e.touches[0];
			const touch1 = e.touches[1];
			const vecX = touch0.clientX - touch1.clientX;
			const vecY = touch0.clientY - touch1.clientY;
			zoomStartDist = Math.sqrt(vecX * vecX + vecY * vecY);
			startScale = scale;
		}
    });

    container.addEventListener('mousedown', function (e) {
		startMoving(e);
    });

    container.addEventListener('mousemove', function (e) {
		var flags = e.buttons !== undefined ? e.buttons : e.which;
		const leftButtonDown = (flags & 1) === 1;
		if(!leftButtonDown){
			endMoving();
		}
        handleMoving(e);
        updateTransform();
		drawConnections(nodes); // Synchronize connections
		createTimeLabels(nodes);
    });
	
    container.addEventListener('mouseup', function (e) {
        endMoving();
    });
	
	container.addEventListener('touchend', function (e) {
		e.preventDefault();
		if (e.touches.length === 0) {
			endMoving();
			console.log("moving end");
		}
    });

    container.addEventListener('wheel', function (e) {
        e.preventDefault();
		
		const zoomSpeed = 0.05;
        const delta = 1.0 - e.deltaY * 0.001;//e.deltaY > 0 ? 1.0 - zoomSpeed : 1.0 + zoomSpeed;
        const newScale = Math.min(Math.max(0.01, scale * delta), 4);
		handleZoom(e.clientX, e.clientY, newScale);

        updateTransform();
		drawConnections(nodes);
		createTimeLabels(nodes);
		//console.log("Mouse wheel");
    });
	
	container.addEventListener('touchmove', function (e) {
		e.preventDefault();
        if (e.touches.length === 1 && isPanning) {
			handleMoving(e.touches[0]);
			console.log("moving");
		} else if(e.touches.length === 2) {
			isPanning = false;
			const touch0 = e.touches[0];
			const touch1 = e.touches[1];
			
			const vecX = touch0.clientX - touch1.clientX;
			const vecY = touch0.clientY - touch1.clientY;
			zoomNewtDist = Math.sqrt(vecX * vecX + vecY * vecY);
			const zoomFactor = zoomNewtDist / zoomStartDist;
			const zoomX = (touch0.clientX + touch1.clientX) / 2;
			const zoomY = (touch0.clientY + touch1.clientY) / 2;
			const newScale = zoomFactor * startScale;
			
			console.log(`zoom: ${newScale}`);
			handleZoom(zoomX, zoomY, newScale);
		}
		
        updateTransform();
		drawConnections(nodes); // Synchronize connections
		createTimeLabels(nodes);
	});

    function updateTransform() {
        const transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        tree.style.transform = transform;
        //svg.style.transform = transform;
    }
}

