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
      dataInicio: '16:30 31/05/2026',
      dataFim: '',
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
      dataInicio: '18:00 01/05/2026',
      dataFim: '23:00 01/05/2026',
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

function converterDataGoogle(dataBR) {
  if (!dataBR) return '';
  const [horaMinuto, data] = dataBR.split(' ');
  const [hora, minuto] = horaMinuto.split(':');
  const [dia, mes, ano] = data.split('/');
  return `${ano}${mes}${dia}T${hora}${minuto}00`;
}

export function criarUrlCalendario(tema) {
  if (!tema.calendario.dataInicio) return '#';
  const nomeCodificado = encodeURIComponent(tema.calendario.eventoNome || tema.nomeCelebrante);
  const enderecoCodificado = encodeURIComponent(tema.calendario.endereco);
  const dataInicio = converterDataGoogle(tema.calendario.dataInicio);
  const dataFim = tema.calendario.dataFim ? converterDataGoogle(tema.calendario.dataFim) : dataInicio;
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${nomeCodificado}&dates=${dataInicio}/${dataFim}&location=${enderecoCodificado}`;
}