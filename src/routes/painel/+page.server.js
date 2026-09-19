/*
  Copyright (C) 2026 Lucas Brito Ling / ImpactoLocal
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, version 3 of the License.
*/

import { supabase } from '$lib/supabaseClient.js';
import { fail } from '@sveltejs/kit';

export const load = async ({ url }) => {
    const organizacao_id = url.searchParams.get('ong');

    if (!organizacao_id) return { inscritos: [], error: 'ID da organização ausente na URL (?ong=id).' };

    // Puxa a fila ordenada por pontuação (maior primeiro) e por ordem de chegada como desempate
    const { data: inscritos, error } = await supabase
        .from('inscritos')
        .select('*')
        .eq('organizacao_id', organizacao_id)
        .order('pontuacao_triagem', { ascending: false })
        .order('criado_em', { ascending: true });

    if (error) return { inscritos: [], error: 'Erro ao carregar a fila de espera.' };

    return { inscritos };
};

export const actions = {
    chamar: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id')?.toString();

        if (!id) return fail(400, { error: 'ID do inscrito inválido.' });

        // Atualiza o status do candidato no banco
        const { error } = await supabase
            .from('inscritos')
            .update({ status_fila: 'chamado' })
            .eq('id', id);

        if (error) return fail(500, { error: 'Não foi possível atualizar o status.' });

        return { success: true };
    }
};
