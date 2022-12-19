interface ICaracteristicasProps {
    nome: string;
    descricao: string;
    valor: string;
}

export const Caracteristicas = ({ nome, descricao, valor }: ICaracteristicasProps) => {
    return (
        <ul className="list-disc text-secondary pl-8">
            <li>Nome: {nome}</li>
            <li>Descrição: {descricao}</li>
            <li>Valor: {valor}</li>
        </ul>
    )
}
