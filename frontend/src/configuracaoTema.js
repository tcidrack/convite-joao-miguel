export const temas = {
  aniversario: {
    id: 'aniversario',
    tipo: 'aniversario',
    titulo: 'Convite de Aniversário',
    nomeCelebrante: 'João Miguel',
    textoIdade: '',
    mensagemConvite: 'Eu e meus amiguinhos estamos aguardando você! Sua presença vai deixar esse dia ainda mais especial!',
    dataEvento: {
      dia: '31',
      mes: 'Maio',
      ano: '2026',
      hora: '16',
      minuto: '30',
    },
    recursos: {
      videoConvite: '/assets/video.mp4',
      ilustracaoCentral: '/assets/pernalonga.png',
      ilustracaoRodape: '/assets/botao.png',
      personagemPrincipal: '/assets/babys.png',
      imagemNumeroIdade: '/assets/numero1.png',
    },
    calendario: {
      endereco: 'Rua morelia 706 Potira',
      mapsUrl: 'https://share.google/3J64KnEAaPNdqH03C',
      eventoNome: 'Aniversário do João Miguel',
      dataInicio: '20260405T170000',
      dataFim: '20260405T200000',
    },
    linksSociais: {
      listaPresentesUrl: '/presentes',
    },
    listaPresentes: [
      { id: 1, icone: '/assets/sapato.png', texto: 'Meu pezinho é tamanho 24' },
      { id: 2, icone: '/assets/roupa.png', texto: 'Visto de 2 a 3 anos' },
      { id: 3, icone: '/assets/brinquedo.png', texto: 'Gosto de brinquedos' },
    ],
  },
  wedding: {
    id: 'wedding',
    tipo: 'casamento',
    titulo: 'Convite de Casamento',
    nomeCelebrante: 'Noivo e Noiva',
    textoIdade: '',
    mensagemConvite: 'Participe da nossa união!',
    dataEvento: {
      dia: '01',
      mes: 'Maio',
      ano: '2026',
      hora: '18',
      minuto: '00',
    },
    recursos: {
      videoConvite: '/assets/wedding-video.mp4',
      ilustracaoCentral: '/assets/wedding-center.gif',
      ilustracaoRodape: '/assets/wedding-footer.png',
      personagemPrincipal: '/assets/couple.png',
      imagemNumeroIdade: '/assets/age-30.png',
    },
    calendario: {
      endereco: 'Rua Exemplo, 123 - Cidade',
      mapsUrl: 'https://maps.app.goo.gl/example',
      eventoNome: 'Casamento de Noivo e Noiva',
      dataInicio: '20260501T180000',
      dataFim: '20260501T230000',
    },
    linksSociais: {
      listaPresentesUrl: '/presentes',
    },
    listaPresentes: [
      { id: 1, icone: '/assets/sapato.png', texto: 'Sapato tamanho 38' },
      { id: 2, icone: '/assets/roupa.png', texto: 'Roupas tamanho M' },
      { id: 3, icone: '/assets/brinquedo.png', texto: 'Brinquedos diversos' },
    ],
  },
  generic: {
    id: 'generic',
    tipo: 'generico',
    titulo: 'Convite de Evento',
    nomeCelebrante: '',
    textoIdade: '',
    mensagemConvite: '',
    dataEvento: {
      dia: '',
      mes: '',
      ano: '',
      hora: '',
      minuto: '',
    },
    recursos: {
      videoConvite: '',
      ilustracaoCentral: '',
      ilustracaoRodape: '',
      personagemPrincipal: '',
      imagemNumeroIdade: '',
    },
    calendario: {
      endereco: '',
      mapsUrl: '',
      eventoNome: '',
      dataInicio: '',
      dataFim: '',
    },
    linksSociais: {
      listaPresentesUrl: '',
    },
    listaPresentes: [
      { id: 1, icone: '', texto: '' },
      { id: 2, icone: '', texto: '' },
      { id: 3, icone: '', texto: '' },
    ],
  },
};

export function criarUrlCalendario(tema) {
  if (!tema.calendario.dataInicio || !tema.calendario.dataFim) return '#';
  const nomeCodificado = encodeURIComponent(tema.calendario.eventoNome || tema.nomeCelebrante);
  const enderecoCodificado = encodeURIComponent(tema.calendario.endereco);
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${nomeCodificado}&dates=${tema.calendario.dataInicio}/${tema.calendario.dataFim}&location=${enderecoCodificado}`;
}