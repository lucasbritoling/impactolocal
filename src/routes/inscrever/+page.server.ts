/*
  Copyright (C) 2026 Lucas Brito Ling / ImpactoLocal
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, version 3 of the License.
*/

import { supabase } from '$lib/supabaseClient.js';
import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        
        const nome = data.get('nome')?.toString().trim();
        const telefone = data.get('telefone')?.toString().trim();
        const data_nascimento = data.get('data_nascimento')?.toString();
        const organizacao_id = data.get('organizacao_id')?.toString(); // ID da ONG vindo da URL ou contexto
        
        // Critérios Socioeconômicos (checkboxes vêm como 'on' se marcados)
        const escola_publica = data.get('escola_publica') === 'on';
        const renda_baixa = data.get('renda_baixa') === 'on';
        const familiar_desempregado = data.get('familiar_desempregado') === 'on';

        // Validação básica para evitar lixo no banco
        if (!nome || !telefone || !organizacao_id) {
            return fail(400, { error: 'Nome, telefone e ID da organização são obrigatórios.' });
        }

        // Insere diretamente no Supabase
        const { error } = await supabase
            .from('inscritos')
            .insert([{
                organizacao_id,
                nome,
                telefone,
                data_nascimento: data_nascimento || null,
                escola_publica,
                renda_baixa,
                familiar_desempregado,
                status_fila: 'aguardando'
            }]);

        if (error) {
            console.error('Erro ao salvar no Supabase:', error.message);
            return fail(500, { error: 'Erro interno ao salvar sua inscrição. Tente novamente.' });
        }

        return { success: true };
    }
};
