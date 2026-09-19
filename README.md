# 🚀 ImpactoLocal

Plataforma aberta e *serverless* de triagem socioeconômica e gestão de filas de espera para cursinhos populares, mutirões de saúde e projetos sociais periféricos no Brasil.

Construído de forma ultra-leve com **Svelte 5**, **Supabase** e **Cloudflare Pages**, o projeto adota a arquitetura *Bring Your Own Backend* (Traga seu Próprio Servidor). Isso garante **custo zero absoluto de infraestrutura** para quem desenvolve e para a organização social, operando de forma instantânea mesmo em celulares antigos e conexões 3G instáveis da periferia.

---

## 🎯 O Manifesto e o Problema da Ponta

O terceiro setor independente no Brasil enfrenta um gargalo logístico silencioso: o gerenciamento de vidas humanas através de planilhas de Excel quebradas ou cadernos de papel rasgados. Quando um cursinho comunitário abre 50 vagas para 500 inscritos, a seleção manual ou baseada em fórmulas confusas gera injustiças e perda de tempo precioso.

As opções de mercado cobram assinaturas inacessíveis para o orçamento de projetos voluntários. As opções do governo exigem burocracias institucionais e CNPJs públicos que pequenas ONGs de bairro não possuem.

O **ImpactoLocal** quebra essa barreira ao descentralizar a tecnologia de ponta. Nós não competimos com CRMs corporativos; nós resolvemos a logística da escassez de recursos de forma justa, limpa e gratuita.

---

## ⚙️ Diferenciais Técnicas (Por que esta Stack?)

* **Svelte 5 (Runes):** Renderização ultra-veloz e reativa com consumo mínimo de processamento, ideal para smartphones antigos.
* **Cloudflare na Borda (Edge Computing):** Hospedagem estática e processamento distribuído mundialmente sem taxas de tráfego de saída (Zero Bandwidth Fees). Abre em milissegundos.
* **Supabase (PostgreSQL):** Persistência isolada e segura usando as regras nativas de *Row Level Security* (RLS). Os dados de uma ONG nunca se misturam com os de outra.
* **Custo Zero Real:** Todo o ecossistema roda dentro dos níveis gratuitos (Free Tiers) das plataformas, suportando milhares de cadastros em texto sem gerar cobranças.

---

## 🏗️ Como Rodar o Projeto Localmente

Certifique-se de ter o [Bun](https://bun.sh) instalado em sua máquina.

1. **Clone o repositório:**

   ```bash
   git clone https://github.com
   cd impactolocal
   ```

2. **Instale as dependências:**

   ```bash
   bun install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto e insira as credenciais do seu projeto de testes do Supabase:

   ```bash
   PUBLIC_SUPABASE_URL=https://supabase.co
   PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
   ```

4. **Suba o banco de dados:**
   Copie o conteúdo estruturado do arquivo `schema.sql` (disponível no repositório) e execute-o diretamente no **SQL Editor** do seu painel do Supabase para erguer as tabelas e ativar o gatilho automático de triagem.

5. **Inicie o servidor de desenvolvimento:**

   ```bash
   bun run dev
   ```

   Acesse no navegador: `http://localhost:5173/inscrever?ong=ID_DA_ONG_CADASTRADA`

---

## 🛠️ Guia de Instalação para ONGs (Deploy em 1 Clique)

O ImpactoLocal foi projetado para que organizações sem conhecimentos profundos em TI possam usufruir de um sistema profissional sem depender de técnicos dedicados.

1. **Crie suas contas gratuitas:**
   * Crie uma conta no [Supabase](https://supabase.com).
   * Crie uma conta na [Cloudflare](https://cloudflare.com).
2. **Conecte os ambientes:**
   * No Supabase, crie um novo projeto, vá em *Project Settings > API* e copie a URL e a Anon Key.
   * Crie uma linha na tabela `organizacoes` para gerar o identificador (UUID) do seu projeto social.
3. **Publique na Nuvem:**
   * Faça o deploy do front-end na Cloudflare Pages apontando para o seu repositório.
   * Insira a `PUBLIC_SUPABASE_URL` e `PUBLIC_SUPABASE_ANON_KEY` nas configurações de variáveis de ambiente do painel da Cloudflare.

---

## ⚖️ Licença (AGPLv3)

Este programa é um software livre distribuído sob a licença **GNU Affero General Public License v3 (AGPLv3)**.

```text
Copyright (C) 2026 Lucas Brito Ling / ImpactoLocal

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License.
```

**O que isso significa na prática?**
Você é inteiramente livre para usar, estudar, modificar e hospedar este sistema para qualquer finalidade social ou privada. No entanto, se você modificar este código e colocá-lo para rodar em um servidor web como um serviço fechado ou pago (SaaS), **você é legalmente obrigado a abrir 100% do código-fonte modificado de volta para a comunidade**. Esta licença blinda o projeto contra a apropriação e privatização corporativa do trabalho comunitário.

---
Desenvolvido com 🧠 e focado no impacto social real por **Lucas Brito Ling**.
