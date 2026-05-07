import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../services/supabase"
import { temas, criarUrlCalendario } from "../configuracaoTema"

const temaSelecionadoId = "aniversario"
const temaSelecionado = temas[temaSelecionadoId]

const videoConvite = temaSelecionado.recursos.videoConvite
const personagemPrincipal = temaSelecionado.recursos.personagemPrincipal
const ilustracaoCentral = temaSelecionado.recursos.ilustracaoCentral
const imagemNumeroIdade = temaSelecionado.recursos.imagemNumeroIdade
const urlMaps = temaSelecionado.calendario.mapsUrl
const urlCalendario = criarUrlCalendario(temaSelecionado)

export default function Invite() {
  const [nome, setNome] = useState("")
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false)
  const videoRef = useRef(null)
  const [audioAtivo, setAudioAtivo] = useState(false)
  const [volume, setVolume] = useState(1)
  const [confirmando, setConfirmando] = useState(false)
  const [toast, setToast] = useState(null)
  const [jaConfirmado, setJaConfirmado] = useState(
    () => localStorage.getItem("confirmado_joao_miguel") !== null
  )

  function ativarSom() {
    setAudioAtivo(true)
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.volume = volume
      videoRef.current.play()
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [volume])

  function salvarLocalmente(nomeConfirmado) {
    try {
      const listaAtual = JSON.parse(localStorage.getItem("confirmacoes") || "[]")
      const atualizado = [...listaAtual, { id: Date.now(), nome: nomeConfirmado, createdAt: new Date().toISOString() }]
      localStorage.setItem("confirmacoes", JSON.stringify(atualizado))
    } catch (err) {
      console.error("Erro ao salvar localmente:", err)
    }
  }

  function showToast(type, text, ms = 3000) {
    setToast({ type, text })
    setTimeout(() => setToast(null), ms)
  }

  async function confirmar() {
    const nomeTrim = nome.trim()
    if (!nomeTrim) {
      showToast("error", "Digite seu nome 💖")
      return
    }
    setConfirmando(true)
    try {
      const { data: existentes, error: erroConsulta } = await supabase
        .from('confirmacoes_joao_miguel')
        .select('nome')
        .eq('nome', nomeTrim)

      if (erroConsulta) {
        console.error('Erro ao consultar confirmações:', erroConsulta)
        salvarLocalmente(nomeTrim)
        showToast('info', 'Problema ao validar confirmação — salvo localmente')
        setNome('')
        setMostrarConfirmacao(false)
        return
      }

      if (existentes && existentes.length > 0) {
        showToast('error', 'Já há confirmação para este nome')
        setNome('')
        setMostrarConfirmacao(false)
        return
      }

      const { error: erroInsercao } = await supabase.from('confirmacoes_joao_miguel').insert({
        nome: nomeTrim
      })

      if (erroInsercao) {
        console.error('Erro ao salvar confirmação:', erroInsercao)
        salvarLocalmente(nomeTrim)
        showToast('info', 'Não foi possível salvar no servidor — salvo localmente 👍')
      } else {
        setNome('')
        setMostrarConfirmacao(false)
        localStorage.setItem("confirmado_joao_miguel", nomeTrim)
        setJaConfirmado(true)
        showToast('success', 'Presença confirmada!')
        try {
          window.open(urlCalendario, '_blank')
        } catch (e) {
          console.info('Não foi possível abrir calendário:', e)
        }
      }
    } catch (error) {
      console.error('Erro ao confirmar presença:', error)
      salvarLocalmente(nomeTrim)
      showToast('info', 'Erro inesperado — salvo localmente')
    } finally {
      setConfirmando(false)
    }
  }

  return (
    <div className="pagina-convite">
      <div className="video-topo">
        <video
          ref={videoRef}
          src={videoConvite}
          autoPlay
          muted={!audioAtivo}
          loop
          playsInline
          preload="auto"
          style={{ borderRadius: 24, display: "block" }}
        />
        {!audioAtivo && (
          <button className="btn-som" onClick={ativarSom}>
            🔊 Ativar som
          </button>
        )}
        {audioAtivo && (
          <div className="controle-volume">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
            <span>{Math.round(volume * 100)}%</span>
          </div>
        )}
      </div>

      <section className="hero">
        <h1 className="nome">
          {temaSelecionado.nomeCelebrante.split("").map((l, i) => (
            <span key={i}>{l === " " ? " " : l}</span>
          ))}
        </h1>
        <div className="idade-badge">
          <img src={imagemNumeroIdade} alt="Idade" className="numero-1" />
          {temaSelecionado.textoIdade.split("").map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
        <div className="mensagem-box">
          <p className="mensagem">{temaSelecionado.mensagemConvite}</p>
          <img
            src={personagemPrincipal}
            className="personagem-principal"
            alt="Personagem"
          />
        </div>
      </section>

      <section className="data-box">
        <div className="data-item">
          <span className="numero">{temaSelecionado.dataEvento.dia}</span>
          <span className="texto">{temaSelecionado.dataEvento.mes}</span>
        </div>
        <img src={ilustracaoCentral} alt="Ilustração" className="ilustracao-central" />
        <div className="data-item">
          <span className="numero">{temaSelecionado.dataEvento.hora}:{temaSelecionado.dataEvento.minuto}</span>
          <span className="texto">horário</span>
        </div>
      </section>

      <section className="acoes">
        <a href={urlMaps} target="_blank" rel="noreferrer" className="acao">
          <span className="material-symbols-outlined">location_on</span>
          <span className="acao-texto">Local do evento</span>
        </a>
        <Link to={temaSelecionado.linksSociais.listaPresentesUrl} className="acao">
          <span className="material-symbols-outlined">featured_seasonal_and_gifts</span>
          <span className="acao-texto">Lista de presentes</span>
        </Link>
        {jaConfirmado ? (
          <div className="acao confirmado">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="acao-texto">Presença confirmada!</span>
          </div>
        ) : (
          <button type="button" className="acao" onClick={() => setMostrarConfirmacao(true)}>
            <span className="material-symbols-outlined">person_check</span>
            <span className="acao-texto">Confirmar presença</span>
          </button>
        )}
      </section>

      {mostrarConfirmacao && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal" onClick={() => setMostrarConfirmacao(false)}>
              ✖
            </button>
            <h2>Confirme sua presença ✅</h2>
            <p>Digite seu nome e sobrenome ou da sua família para aparecer na lista de convidados confirmados.</p>
            <input placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <button className="btn-confirmar" onClick={confirmar} disabled={confirmando}>
              {confirmando ? "Confirmando..." : "Confirmar presença"}
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 30,
            background: toast.type === "success" ? "#2ecc71" : toast.type === "error" ? "#D22100" : "#FA4C00",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 12,
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            zIndex: 9999,
            fontWeight: "700",
          }}
        >
          {toast.text}
        </div>
      )}
    </div>
  )
}
