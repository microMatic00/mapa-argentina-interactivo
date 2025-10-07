// Archivo de datos con los lugares de interés
// Puedes agregar tus propios lugares modificando este archivo

const lugares = [
  {
    id: 1,
    nombre: "Obelisco de Buenos Aires",
    coordenadas: [-34.6037, -58.3816],
    descripcion:
      "El Obelisco de Buenos Aires es un monumento histórico considerado el ícono de la ciudad. Fue construido en 1936 para conmemorar el cuarto centenario de la primera fundación de la ciudad. Se encuentra en la Plaza de la República, en la intersección de las avenidas Corrientes y 9 de Julio.",
    fotos: [
      "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=400",
      "https://images.unsplash.com/photo-1621262847489-5aa2f5f9d6e3?w=400",
      "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400",
    ],
  },
  {
    id: 2,
    nombre: "Cataratas del Iguazú",
    coordenadas: [-25.6953, -54.4367],
    descripcion:
      "Las Cataratas del Iguazú son un conjunto de cascadas situadas sobre el río Iguazú, en el límite entre Argentina y Brasil. Son Patrimonio de la Humanidad por la UNESCO desde 1984 y una de las Siete Maravillas Naturales del Mundo. El conjunto está formado por 275 saltos, siendo la Garganta del Diablo el más impresionante.",
    fotos: [
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400",
      "https://images.unsplash.com/photo-1621969258864-1c39e24ca1fe?w=400",
      "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=400",
    ],
  },
  {
    id: 3,
    nombre: "Glaciar Perito Moreno",
    coordenadas: [-50.495, -73.1376],
    descripcion:
      "El glaciar Perito Moreno es una gruesa masa de hielo ubicada en el Parque Nacional Los Glaciares, en la provincia de Santa Cruz. Es uno de los glaciares más importantes de la Patagonia argentina y uno de los pocos en el mundo que aún está en crecimiento. Sus periódicos desprendimientos de hielo son un espectáculo único.",
    fotos: [
      "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=400",
      "https://images.unsplash.com/photo-1552055568-3e23ff84f2a0?w=400",
      "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=400",
    ],
  },
  {
    id: 4,
    nombre: "Cerro Aconcagua",
    coordenadas: [-32.6532, -70.0109],
    descripcion:
      "El Aconcagua es la montaña más alta de América con 6.962 metros sobre el nivel del mar. Ubicado en la provincia de Mendoza, es uno de los destinos más importantes del montañismo mundial y forma parte de la Cordillera de los Andes. Su nombre proviene del idioma quechua 'Ackon Cahuak' que significa 'Centinela de Piedra'.",
    fotos: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400",
    ],
  },
  {
    id: 5,
    nombre: "Ushuaia - Fin del Mundo",
    coordenadas: [-54.8019, -68.303],
    descripcion:
      "Ushuaia es la ciudad más austral del mundo, ubicada en Tierra del Fuego. Conocida como 'El Fin del Mundo', ofrece paisajes únicos entre montañas y el Canal Beagle. Es punto de partida para expediciones a la Antártida y un destino turístico de primer nivel con su combinación de naturaleza, historia y aventura.",
    fotos: [
      "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    ],
  },
  {
    id: 6,
    nombre: "Islas Malvinas - Puerto Argentino",
    coordenadas: [-51.6943, -57.8573],
    descripcion:
      "Las Islas Malvinas son un archipiélago ubicado en el Atlántico Sur, parte integral del territorio argentino. Las islas representan un símbolo de soberanía nacional. Su naturaleza virgen alberga una rica fauna, incluyendo pingüinos, lobos marinos y aves endémicas.",
    fotos: [
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400",
      "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400",
    ],
  },
  {
    id: 7,
    nombre: "Quebrada de Humahuaca",
    coordenadas: [-23.205, -65.3476],
    descripcion:
      "La Quebrada de Humahuaca es un valle andino de 155 km en la provincia de Jujuy, declarado Patrimonio de la Humanidad por la UNESCO. Destaca por sus formaciones geológicas de colores únicos, como el Cerro de los Siete Colores en Purmamarca, y por ser un corredor cultural que conserva testimonios de 10.000 años de historia.",
    fotos: [
      "https://images.unsplash.com/photo-1622027233368-d980bcc20ef8?w=400",
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    ],
  },
  {
    id: 8,
    nombre: "Teatro Colón",
    coordenadas: [-34.6011, -58.3833],
    descripcion:
      "El Teatro Colón de Buenos Aires es uno de los teatros de ópera más importantes del mundo por su tamaño, acústica y trayectoria. Inaugurado en 1908, es considerado una joya arquitectónica del eclecticismo y un símbolo cultural de Argentina. Ha sido escenario de las más grandes figuras de la lírica, ballet y música clásica mundial.",
    fotos: [
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    ],
  },
  {
    id: 9,
    nombre: "Puerto Argentino - Base en Malvinas",
    coordenadas: [-51.695, -57.853],
    descripcion:
      "Puerto Argentino (Stanley) es la principal localidad de las Islas Malvinas. Centro administrativo y con puerto natural, conserva vestigios históricos y una comunidad isleña dedicada a la pesca y el turismo de naturaleza.",
    fotos: [
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400",
    ],
  },
  {
    id: 10,
    nombre: "Puerto Darwin - Isla San Pedro (Isla Gran Malvina)",
    coordenadas: [-51.706, -57.906],
    descripcion:
      "Puerto Darwin, en la costa este de la isla San Pedro (Gran Malvina), es un punto importante para observación de aves marinas y focas. La zona mantiene paisajes costeros protegidos y sitios de historia natural.",
    fotos: [
      "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    ],
  },
  {
    id: 11,
    nombre: "Isla Bleaker",
    coordenadas: [-51.733, -57.667],
    descripcion:
      "Isla Bleaker es una de las islas menores del archipiélago de las Malvinas, conocida por su biodiversidad: aves marinas, pingüinos y colonias de lobos marinos. Es visitada por científicos y turistas interesados en naturaleza.",
    fotos: [
      "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=400",
      "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400",
    ],
  },
  {
    id: 12,
    nombre: "Grytviken - Islas Georgias del Sur",
    coordenadas: [-54.2819, -36.5088],
    descripcion:
      "Grytviken es la estación ballenera histórica en la isla Georgia del Sur. Hoy es un sitio histórico con museo, tumba de Sir Ernest Shackleton y acceso a grandes colonias de pingüinos y elefantes marinos.",
    fotos: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400",
      "https://images.unsplash.com/photo-1622027233368-d980bcc20ef8?w=400",
    ],
  },
  {
    id: 13,
    nombre: "Cabo Rosa - Islas Georgias del Sur",
    coordenadas: [-54.274, -36.495],
    descripcion:
      "Cabo Rosa y sus acantilados ofrecen paisajes dramáticos y acceso a rutas donde se observan grandes colonias de aves marinas y mamíferos. Zona remota de gran interés científico y natural.",
    fotos: [
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400",
      "https://images.unsplash.com/photo-1552055568-3e23ff84f2a0?w=400",
    ],
  },
  {
    id: 14,
    nombre: "Isla Sandwich del Sur - Mont Hardwicke",
    coordenadas: [-59.423, -27.165],
    descripcion:
      "La Isla Sandwich del Sur es un territorio volcánico subantártico con actividad geotérmica y entornos casi vírgenes. Mont Hardwicke y costa cercana albergan fauna marina y paisajes volcánicos impresionantes.",
    fotos: [
      "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=400",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    ],
  },
];

// INSTRUCCIONES PARA PERSONALIZAR TUS LUGARES:
//
// 1. Copia el formato de cualquier lugar existente
// 2. Las coordenadas deben estar en formato [latitud, longitud]
// 3. Para obtener coordenadas, puedes usar Google Maps (clic derecho -> ver coordenadas)
// 4. Las fotos pueden ser URLs de internet o rutas locales a tus imágenes
// 5. Si usas fotos locales, crea una carpeta "imagenes" y ponlas allí
//
// Ejemplo con fotos locales:
// fotos: [
//     "imagenes/lugar1-foto1.jpg",
//     "imagenes/lugar1-foto2.jpg",
//     "imagenes/lugar1-foto3.jpg"
// ]
