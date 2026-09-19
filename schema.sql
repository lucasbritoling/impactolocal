/*
  Copyright (C) 2026 Lucas Brito Ling / ImpactoLocal
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, version 3 of the License.
*/


-- 1. Tabela de Organizações (Multi-tenant)
CREATE TABLE organizacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    tipo TEXT CHECK (tipo IN ('educacao', 'saude')),
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Inscritos (Alunos ou Pacientes)
CREATE TABLE inscritos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organizacao_id UUID REFERENCES organizacoes(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    data_nascimento DATE,
    
    -- Critérios Socioeconômicos para a Triagem
    escola_publica BOOLEAN DEFAULT FALSE,
    renda_baixa BOOLEAN DEFAULT FALSE,
    familiar_desempregado BOOLEAN DEFAULT FALSE,
    
    -- Pontuação e Status da Fila
    pontuacao_triagem INTEGER DEFAULT 0,
    status_fila TEXT DEFAULT 'aguardando' CHECK (status_fila IN ('aguardando', 'chamado', 'atendido', 'desistente')),
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Função Autônoma para Calcular a Pontuação de Triagem (O Motor Inteligente)
CREATE OR REPLACE FUNCTION calcular_pontuacao_triagem()
RETURNS TRIGGER AS $$
DECLARE
    total_pontos INTEGER := 0;
BEGIN
    -- Regras do algoritmo de prioridade social
    IF NEW.escola_publica = TRUE THEN total_pontos := total_pontos + 5; END IF;
    IF NEW.renda_baixa = TRUE THEN total_pontos := total_pontos + 10; END IF;
    IF NEW.familiar_desempregado = TRUE THEN total_pontos := total_pontos + 10; END IF;
    
    NEW.pontuacao_triagem := total_pontos;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Gatilho que roda o motor antes de salvar no banco
CREATE TRIGGER trg_calcular_triagem
BEFORE INSERT OR UPDATE OF escola_publica, renda_baixa, familiar_desempregado ON inscritos
FOR EACH ROW EXECUTE FUNCTION calcular_pontuacao_triagem();

-- 5. Ativação do Row Level Security (RLS) para privacidade das ONGs
ALTER TABLE organizacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE inscritos ENABLE ROW LEVEL SECURITY;
