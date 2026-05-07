import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"

export default function Admin() {
  const [confirmados, setConfirmados] = useState([])
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function carregarConfirmados() {
      try {
        const { data, error } = await supabase
          .from('confirmacoes_joao_miguel')
          .select('*')

        if (error) {
          console.error('Erro ao carregar confirmados:', error)
          setErro('Erro: ' + error.message)
          return
        }

        console.log('Dados recebidos:', data)
        setConfirmados(data || [])
      } catch (error) {
        console.error('Erro ao carregar confirmados:', error)
        setErro('Erro inesperado ao carregar lista')
      }
    }

    carregarConfirmados()
    
    const intervalo = setInterval(() => {
      carregarConfirmados()
    }, 30000)
    
    return () => clearInterval(intervalo)
  }, [])

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h1>Lista de Confirmados</h1>

        {erro && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>{erro}</p>
        )}

        {!erro && confirmados.length === 0 && (
          <p style={{color: 'white'}}>Nenhum convidado confirmado ainda.</p>
        )}

        <ul>
          {confirmados.map(c => (
            <li key={c.id}> {c.nome}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
