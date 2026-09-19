/*
  Copyright (C) 2026 Lucas Brito Ling / ImpactoLocal
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, version 3 of the License.
*/

import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from "$env/static/public"

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseKey = PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Variáveis do Supabase não encontradas. Certifique-se de configurar o arquivo .env');
}

export const supabase = createClient(supabaseUrl, supabaseKey);