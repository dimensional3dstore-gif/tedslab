insert into public.extinct_species (
	slug, common_name, scientific_name, taxonomic_group, extinction_period, region, sort_order
)
values
	('dodo', 'Dodo', 'Raphus cucullatus', 'Bird', 'Late 17th century', 'Mauritius, Indian Ocean', 1),
	('passenger-pigeon', 'Passenger Pigeon', 'Ectopistes migratorius', 'Bird', 'Early 20th century', 'Eastern and central North America', 2),
	('thylacine', 'Thylacine', 'Thylacinus cynocephalus', 'Marsupial', '20th century', 'Tasmania; formerly mainland Australia and New Guinea', 3),
	('great-auk', 'Great Auk', 'Pinguinus impennis', 'Bird', '19th century', 'North Atlantic coasts and islands', 4),
	('steller-sea-cow', 'Steller''s Sea Cow', 'Hydrodamalis gigas', 'Marine mammal', '18th century', 'Commander Islands, North Pacific', 5),
	('quagga', 'Quagga', 'Equus quagga quagga', 'Mammal', '19th century', 'South African grasslands and Karoo', 6),
	('aurochs', 'Aurochs', 'Bos primigenius', 'Mammal', '17th century', 'Europe, western Asia, and North Africa', 7),
	('carolina-parakeet', 'Carolina Parakeet', 'Conuropsis carolinensis', 'Bird', '20th century', 'Eastern United States and the Mississippi basin', 8),
	('moa', 'Moa', 'Dinornithiformes', 'Birds (multiple species)', '15th century (approximate)', 'Aotearoa New Zealand', 9),
	('golden-toad', 'Golden Toad', 'Incilius periglenes', 'Amphibian', 'Late 20th century', 'Monteverde cloud forest, Costa Rica', 10),
	('pinta-tortoise', 'Pinta Island Tortoise', 'Chelonoidis abingdonii', 'Reptile', '21st century', 'Pinta Island, Galapagos', 11),
	('pyrenean-ibex', 'Pyrenean Ibex', 'Capra pyrenaica pyrenaica', 'Mammal (subspecies)', '2000', 'The Pyrenees, between Spain and France', 12),
	('caribbean-monk-seal', 'Caribbean Monk Seal', 'Neomonachus tropicalis', 'Marine mammal', '20th century', 'Caribbean Sea and Gulf of Mexico', 13),
	('bramble-cay-melomys', 'Bramble Cay Melomys', 'Melomys rubicola', 'Mammal (rodent)', '21st century', 'Bramble Cay, Torres Strait, Australia', 14),
	('chinese-paddlefish', 'Chinese Paddlefish', 'Psephurus gladius', 'Fish', '21st century', 'Yangtze River basin, China', 15),
	('woolly-mammoth', 'Woolly Mammoth', 'Mammuthus primigenius', 'Mammal', 'Holocene; last island populations about 4,000 years ago', 'Northern Eurasia and North America; later Wrangel Island', 16),
	('cave-lion', 'Cave Lion', 'Panthera spelaea', 'Mammal', 'Late Pleistocene', 'Europe and northern Asia', 17),
	('irish-elk', 'Irish Elk (Giant Deer)', 'Megaloceros giganteus', 'Mammal', 'Late Pleistocene to early Holocene', 'Europe and parts of northern Asia', 18),
	('huia', 'Huia', 'Heteralocha acutirostris', 'Bird', 'Early 20th century', 'North Island, Aotearoa New Zealand', 19),
	('dusky-seaside-sparrow', 'Dusky Seaside Sparrow', 'Ammospiza maritima nigrescens', 'Bird (subspecies)', 'Late 20th century', 'Salt marshes of the St. Johns River, Florida', 20),
	('labrador-duck', 'Labrador Duck', 'Camptorhynchus labradorius', 'Bird', '19th century', 'North American Atlantic coast', 21),
	('tecopa-pupfish', 'Tecopa Pupfish', 'Cyprinodon nevadensis calidae', 'Fish (subspecies)', 'Late 20th century', 'Tecopa Hot Springs, California, United States', 22),
	('warrah', 'Warrah (Falkland Islands Wolf)', 'Dusicyon australis', 'Mammal', '19th century', 'Falkland Islands', 23),
	('elephant-bird', 'Elephant Bird', 'Aepyornithidae', 'Birds (family)', 'Holocene; exact final dates uncertain', 'Madagascar', 24),
	('syrian-wild-ass', 'Syrian Wild Ass', 'Equus hemionus hemippus', 'Mammal (subspecies)', '20th century', 'Syria, Iraq, and the Arabian Peninsula', 25)
on conflict (slug) do update set
	common_name = excluded.common_name,
	scientific_name = excluded.scientific_name,
	taxonomic_group = excluded.taxonomic_group,
	extinction_period = excluded.extinction_period,
	region = excluded.region,
	sort_order = excluded.sort_order,
	published = true,
	updated_at = now();
