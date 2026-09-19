<script>
  /*
    Copyright (C) 2026 Lucas Brito Ling / ImpactoLocal
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, version 3 of the License.
  */

  import { page } from '$app/stores';

  // Svelte 5: Capturando os dados reativos vindos do load do servidor
  let { data, form } = $props();
  
  let organizacaoId = $derived($page.url.searchParams.get('ong') || '');
</script>

<main class="panel-container">
  <header>
    <h1>Painel de Controle - Fila de Espera Justa</h1>
    <p class="subtitle">Candidatos ordenados automaticamente por índice de vulnerabilidade socioeconômica.</p>
  </header>

  {#if data.error}
    <div class="alert error">{data.error}</div>
  {/if}

  {#if form?.error}
    <div class="alert error">{form.error}</div>
  {/if}

  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th>Posição</th>
          <th>Nome</th>
          <th>Contato</th>
          <th>Pontos Sociais</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {#each data.inscritos as inscrito, index}
          <tr class="status-{inscrito.status_fila}">
            <td><strong>{index + 1}º</strong></td>
            <td>{inscrito.nome}</td>
            <td>
              <a href="https://wa.me{inscrito.telefone.replace(/\D/g, '')}" target="_blank" class="link-whatsapp">
                {inscrito.telefone} 💬
              </a>
            </td>
            <td>
              <span class="badge-pontos score-{inscrito.pontuacao_triagem}">
                {inscrito.pontuacao_triagem} pts
              </span>
            </td>
            <td>
              <span class="status-tag {inscrito.status_fila}">{inscrito.status_fila}</span>
            </td>
            <td>
              {#if inscrito.status_fila === 'aguardando'}
                <form method="POST" action="?/chamar">
                  <input type="hidden" name="id" value={inscrito.id} />
                  <button type="submit" class="btn-chamar">Chamar</button>
                </form>
              {:else}
                <span class="text-muted">Sem ações</span>
              {/if}
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="6" class="text-center">Nenhum candidato inscrito na fila para esta organização até o momento.</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  :global(body) {
    background-color: #f8fafc;
    font-family: system-ui, -apple-system, sans-serif;
    color: #334155;
    margin: 0;
    padding: 30px 20px;
  }
  .panel-container {
    max-width: 1000px;
    margin: 0 auto;
  }
  header {
    margin-bottom: 30px;
  }
  h1 {
    color: #0f172a;
    margin: 0 0 6px 0;
    font-size: 1.8rem;
  }
  .subtitle {
    color: #64748b;
    margin: 0;
  }
  .table-responsive {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    overflow-x: auto;
    border: 1px solid #e2e8f0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.95rem;
  }
  th, td {
    padding: 14px 20px;
    border-bottom: 1px solid #e2e8f0;
  }
  th {
    background-color: #f1f5f9;
    color: #475569;
    font-weight: 600;
  }
  tr:hover {
    background-color: #f8fafc;
  }
  .link-whatsapp {
    color: #16a34a;
    text-decoration: none;
    font-weight: 500;
  }
  .link-whatsapp:hover {
    text-decoration: underline;
  }
  .badge-pontos {
    padding: 4px 8px;
    border-radius: 12px;
    font-weight: bold;
    font-size: 0.85rem;
  }
  .score-25 { background: #fee2e2; color: #991b1b; }
  .score-15 { background: #ffedd5; color: #9a3412; }
  .score-10 { background: #fef9c3; color: #854d0e; }
  .score-5 { background: #f0fdf4; color: #166534; }
  .score-0 { background: #f1f5f9; color: #475569; }

  .status-tag {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 4px;
  }
  .status-tag.aguardando { background: #e2e8f0; color: #475569; }
  .status-tag.chamado { background: #dbeafe; color: #1e40af; }

  .btn-chamar {
    background: #2563eb;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
  }
  .btn-chamar:hover { background: #1d4ed8; }
  .alert {
    padding: 12px 16px;
    border-radius: 6px;
    margin-bottom: 20px;
    font-weight: 500;
  }
  .alert.error { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
  .text-center { text-align: center; color: #64748b; }
  .text-muted { color: #94a3b8; font-size: 0.85rem; }
  tr.status-chamado { background-color: #f0fdf4; }
</style>
