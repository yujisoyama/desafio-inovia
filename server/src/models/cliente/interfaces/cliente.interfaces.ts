export interface ICriarCliente {
    nome: string;
    endereco: string;
    telefone: string;
    email: string;
    data_nascimento: string;
    login: string;
    senha: string;
}

export interface IAtualizarCliente {
    nome: string;
    endereco: string;
    telefone: string;
    email: string;
    data_nascimento: string;
}