import { temas } from "../configuracaoTema"

const temaSelecionadoId = "aniversario"
const temaSelecionado = temas[temaSelecionadoId]

export default function Presentes() {
  const presentes = temaSelecionado.listaPresentes || []

  return (
    <div className="pagina-convite">
      <section className="presentes">
        <h1>Sugestões de Presentes 🎁</h1>

        {presentes.map((item) => (
          <div key={item.id} className="presente">
            {item.icone && (
              <img
                src={item.icone}
                alt=""
                className="presente-icone"
              />
            )}
            {item.texto}
          </div>
        ))}

        <a href="/convite" className="voltar">
          ⬅ Voltar para o convite
        </a>
      </section>
    </div>
  )
}
