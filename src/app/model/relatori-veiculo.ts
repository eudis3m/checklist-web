import {CadastrarVeiculo} from './cadastrar-veiculo'
export interface RelatorioVeiculo{
    readonly oid: number;
    saida: string;
    nome: string;
    email: string;
    rg: number;
    ssp : string;
    cnh: number;
    categoria : string;
    placa: string;
    placaMercosul: string;
    cadastrarveiculoEntity: CadastrarVeiculo[];
    assinatura: Blob;
    relatorioVeiculoEntity?: RelatorioVeiculo[];

}
