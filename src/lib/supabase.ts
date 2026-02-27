import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

// Exporting a singleton client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Tool = {
    id: string;
    pavadinimas: string;
    aprasymas: string;
    url_nuoroda: string;
    created_at?: string;
}

export const getTools = async () => {
    const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error('Error fetching tools:', error);
        return [];
    }
    return data as Tool[];
}

export const addTool = async (tool: Omit<Tool, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
        .from('tools')
        .insert([tool])
        .select();
    
    if (error) {
        console.error('Error adding tool:', error);
        throw error;
    }
    return data[0] as Tool;
}

// Mock data for development when Supabase is not configured
export const getMockPrompts = () => [
    {
        id: '1',
        author: 'Jonas',
        text: 'Sukurk React komponentą, kuris naudoja Tailwind CSS ir yra pilnai prieinamas (ARIA).',
        created_at: new Date().toISOString(),
    },
    {
        id: '2',
        author: 'Aistė',
        text: 'Paaiškink TypeScript "generics" pradedančiajam su paprastais pavyzdžiais.',
        created_at: new Date().toISOString(),
    },
    {
        id: '3',
        author: 'Mikas',
        text: 'Parašyk Python skriptą, kuris nuskaito JSON failą ir suskaičiuoja raktų pasikartojimus.',
        created_at: new Date().toISOString(),
    },
]

export const getMockTools = () => [
    {
        id: '1',
        title: 'Next.js Dokumentacija',
        description: 'Pagrindinis šaltinis mokytis Next.js karkaso.',
        url: 'https://nextjs.org/docs',
    },
    {
        id: '2',
        title: 'Lucide Icons',
        description: 'Gražios ir nuoseklios piktogramos React projektams.',
        url: 'https://lucide.dev',
    },
    {
        id: '3',
        title: 'Supabase',
        description: 'Atviro kodo Firebase alternatyva su SQL palaikymu.',
        url: 'https://supabase.com',
    },
]
