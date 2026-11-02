// Evento ficticio para la demo de entrevistas. Ningún dato es real.

export const EVENTO = {
  tipo: 'Boda',
  novios: 'Daniela & Rodrigo',
  fecha: '2027-04-17T19:00:00',
  fechaTexto: 'Sábado 17 de abril de 2027',
  limiteConfirmacion: 'Domingo 14 de marzo de 2027',
  lugar: 'Hacienda Los Encinos',
  direccion: 'Carretera Nacional km 268, Santiago, N.L.',
  mapaUrl: 'https://maps.google.com/?q=Santiago,+Nuevo+Leon',
  vestimenta: 'Formal · Evitar el blanco',
  itinerario: [
    { hora: '18:00', actividad: 'Ceremonia religiosa', lugar: 'Capilla de la hacienda' },
    { hora: '19:30', actividad: 'Cóctel de bienvenida', lugar: 'Jardín principal' },
    { hora: '20:30', actividad: 'Cena y brindis', lugar: 'Salón Encinos' },
    { hora: '22:00', actividad: '¡A bailar!', lugar: 'Pista central' },
  ],
  sobres: {
    banco: 'Banco de ejemplo',
    titular: 'Daniela Treviño Garza',
    clabe: '000 000 0000 0000 0000',
  },
  mesaRegalos: 'Liverpool · Evento 51234567 (ejemplo)',
}

export const MENUS = [
  { id: 'res', nombre: 'Filete de res' },
  { id: 'pollo', nombre: 'Pollo en salsa de nuez' },
  { id: 'vegetariano', nombre: 'Vegetariano' },
  { id: 'infantil', nombre: 'Menú infantil' },
]

export const MESAS = Array.from({ length: 8 }, (_, i) => ({ numero: i + 1, capacidad: 10 }))

// respuesta: 'pendiente' | 'si' | 'no'; menus: lista con un menú por asistente.
export const PASES = [
  { token: 'k7Qm2xVb9TzL4pRw', familia: 'Familia Garza Treviño', lugares: 4, mesa: 1,
    integrantes: ['Jorge Garza', 'Patricia Treviño', 'Sofía Garza', 'Mateo Garza'],
    respuesta: 'si', menus: ['res', 'pollo', 'res', 'infantil'] },
  { token: 'a3Hn8YcE1sWq6uDf', familia: 'Familia Martínez López', lugares: 3, mesa: 2,
    integrantes: ['Luis Martínez', 'Ana López', 'Valeria Martínez'],
    respuesta: 'pendiente', menus: [] },
  { token: 'p9Zr4KtB7mXv2nGc', familia: 'Familia Hernández', lugares: 2, mesa: 2,
    integrantes: ['Ricardo Hernández', 'Mónica Salinas'],
    respuesta: 'si', menus: ['pollo', 'vegetariano'] },
  { token: 'e5Lw1QsJ8dRy3hNa', familia: 'Familia Cantú Elizondo', lugares: 5, mesa: 3,
    integrantes: ['Fernando Cantú', 'Gabriela Elizondo', 'Diego Cantú', 'Regina Cantú', 'Abuela Rosa Elizondo'],
    respuesta: 'si', menus: ['res', 'res', 'pollo', 'infantil'] },
  { token: 'v2Tc6MxP0kFb9sYe', familia: 'Familia Villarreal', lugares: 2, mesa: 3,
    integrantes: ['Alejandro Villarreal', 'Daniela Ríos'],
    respuesta: 'no', menus: [] },
  { token: 'r8Nd3GqW5jHz1aKm', familia: 'Familia Sánchez Peña', lugares: 4, mesa: 4,
    integrantes: ['Héctor Sánchez', 'Lucía Peña', 'Emilio Sánchez', 'Camila Sánchez'],
    respuesta: 'pendiente', menus: [] },
  { token: 'm1Bx7VuR4cLp8tQs', familia: 'Amigos de la prepa', lugares: 6, mesa: 5,
    integrantes: ['Andrea Leal', 'Pablo Ochoa', 'Mariana Cavazos', 'Iván Rocha', 'Natalia Pérez', 'Óscar Zambrano'],
    respuesta: 'si', menus: ['res', 'res', 'vegetariano', 'pollo', 'res', 'pollo'] },
  { token: 'h4Fy9EaS2wJn6rUb', familia: 'Familia González', lugares: 3, mesa: 4,
    integrantes: ['Roberto González', 'Silvia Medina', 'Tomás González'],
    respuesta: 'pendiente', menus: [] },
  { token: 'c6Kp1NzT8gVm3xLd', familia: 'Familia Rodríguez Flores', lugares: 4, mesa: 6,
    integrantes: ['Manuel Rodríguez', 'Teresa Flores', 'Isabel Rodríguez', 'Santiago Rodríguez'],
    respuesta: 'si', menus: ['pollo', 'pollo', 'res'] },
  { token: 'w3Jr7BdH0qYs5eMf', familia: 'Compañeros de trabajo', lugares: 5, mesa: 7,
    integrantes: ['Karla Benavides', 'Arturo Guerra', 'Paola Lozano', 'Ernesto Ibarra', 'Fernanda Salazar'],
    respuesta: 'pendiente', menus: [] },
  { token: 'g8Mv2CkX6tPa4zRn', familia: 'Familia Torres', lugares: 2, mesa: 6,
    integrantes: ['Javier Torres', 'Claudia Montemayor'],
    respuesta: 'si', menus: ['vegetariano', 'res'] },
  { token: 'n5Ws9LhE3yDb7cQj', familia: 'Familia Ramírez Garza', lugares: 4, mesa: 8,
    integrantes: ['Raúl Ramírez', 'Leticia Garza', 'Ximena Ramírez', 'Bruno Ramírez'],
    respuesta: 'no', menus: [] },
]

// El pase que se abre desde la demo para "ser" el invitado.
export const TOKEN_DEMO = 'a3Hn8YcE1sWq6uDf'
