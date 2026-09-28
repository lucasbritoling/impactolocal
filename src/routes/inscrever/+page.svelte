<!--
    Copyright (C) 2026 Lucas Brito Ling / ImpactoLocal
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, version 3 of the License.
  -->
<script>
	let { form } = $props();

	const hoje = new Date().toLocaleDateString('en-CA');
</script>

<main class="container">
	{#if form?.success}
		<div class="card success">
			<h2>Inscrição Realizada!</h2>
			<p>
				Seus dados foram enviados com sucesso para análise de vulnerabilidade socioeconômica.
				Aguarde o contato da organização.
			</p>
		</div>
	{:else}
		<div class="card">
			<h2>Formulário de Inscrição</h2>
			<p class="subtitle">
				Preencha as informações abaixo para entrar na fila de espera do projeto social.
			</p>

			{#if form?.error}
				<p class="error-msg">{form.error}</p>
			{/if}

			<form method="POST">
				<div class="group">
					<label for="nome">Nome Completo</label>
					<input
						type="text"
						id="nome"
						name="nome"
						required
						placeholder="Digite seu nome completo"
						autocomplete="name"
						pattern="^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$"
						oninput={(e) => {
							e.currentTarget.value = e.currentTarget.value.replace(/[0-9]/g, '');
							// Substitui múltiplos espaços por um único espaço
							e.currentTarget.value = e.currentTarget.value.replace(/\s{2,}/g, ' ');
							// Impede que comece com espaço
							if (e.currentTarget.value.startsWith(' '))
								e.currentTarget.value = e.currentTarget.value.trimStart();
						}}
						onblur={(e) => {
							// Remove espaços restantes nas pontas quando o usuário sai do campo
							e.currentTarget.value = e.currentTarget.value.trim();
						}}
					/>
				</div>

				<div class="group">
					<label for="telefone">WhatsApp / Telefone de Contato</label>
					<input
						type="tel"
						inputmode="tel"
						pattern="[0-9]+"
						oninput={(e) =>
							(e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 11))}
						id="telefone"
						name="telefone"
						required
						placeholder="1199999999"
						autocomplete="tel"
					/>
				</div>

				<div class="group">
					<label for="data_nascimento">Data de Nascimento (Opcional)</label>
					<input
						type="date"
						id="data_nascimento"
						min="1900-01-01"
						max={hoje}
						required
						autocomplete="bday"
						name="data_nascimento"
					/>
				</div>

				<fieldset class="socioeconomico">
					<legend>Situação Socioeconômica (Para fins de prioridade na fila)</legend>

					<label class="checkbox-label">
						<input type="checkbox" name="escola_publica" />
						<span>Estudei ou estudo em Escola Pública</span>
					</label>

					<label class="checkbox-label">
						<input type="checkbox" name="renda_baixa" />
						<span>Minha família possui renda menor que 1,5 salário mínimo por pessoa</span>
					</label>

					<label class="checkbox-label">
						<input type="checkbox" name="familiar_desempregado" />
						<span>Existe alguém desempregado morando na mesma casa</span>
					</label>
				</fieldset>

				<button type="submit">Enviar Inscrição</button>
			</form>
		</div>
	{/if}
</main>

<style>
	:global(body) {
		background-color: #f3f4f6;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
		color: #1f2937;
		margin: 0;
		padding: 20px;
	}
	.container {
		max-width: 500px;
		margin: 0 auto;
	}
	.card {
		background: #ffffff;
		padding: 24px;
		border-radius: 8px;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}
	.success {
		border-top: 4px solid #10b981;
		text-align: center;
	}
	h2 {
		margin-top: 0;
		color: #111827;
	}
	.subtitle {
		color: #4b5563;
		font-size: 0.95rem;
		margin-bottom: 24px;
	}
	.group {
		display: flex;
		flex-direction: column;
		margin-bottom: 16px;
	}
	label {
		font-weight: 500;
		margin-bottom: 6px;
		font-size: 0.9rem;
	}
	input[type='text'],
	input[type='tel'],
	input[type='date'] {
		padding: 10px;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		font-size: 1rem;
	}
	.socioeconomico {
		border: 1px solid #e5e7eb;
		border-radius: 6px;
		padding: 16px;
		margin-bottom: 20px;
	}
	legend {
		font-size: 0.85rem;
		font-weight: bold;
		color: #4b5563;
		padding: 0 6px;
	}
	.checkbox-label {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		margin-bottom: 12px;
		cursor: pointer;
		font-weight: normal;
	}
	.checkbox-label input {
		margin-top: 3px;
	}
	button {
		width: 100%;
		padding: 12px;
		background-color: #2563eb;
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
	}
	button:disabled {
		background-color: #9ca3af;
		cursor: not-allowed;
	}
	.error-msg {
		color: #dc2626;
		background: #fee2e2;
		padding: 10px;
		border-radius: 6px;
		font-size: 0.9rem;
		margin-bottom: 16px;
	}
</style>
