import { NumericValueAccessor } from "@ionic/angular";
import { Base64 } from 'js-base64';

export interface CadastrarVeiculo{
    //readonly oid: number;
    oid: number;
    observacao: string;
    entrada: string;
    solicitante: string;
    proprietario: string;
    veiculo: string;
    automovel: string;
    chassi : number;
    local: string;
    atravesDE : string;
    telefone: number;
    renavam: number;
    bairro : string;
    cpf_cnpj: number;
    cor: string;
    placa: string;
    produto: string;
    cidade: string;
    guincho: string;
    foto: string;
    foto_2: string;
    foto_3: string;
    foto_4: string;
    foto_5:string;
    foto_6:string;
    foto_7:string;
    foto_8:string;
    combustivel:string;
    pneus_status:string;
    descricao:string;
    assinatura_vistoriador: string;
    assinatura_policial: string;
    empresa: string;
    email: string;

    uf: string;
    documento: string;
    bagagito: string;
    retrovisor_eletrico: string;
    retrovisor_comum: string;
    borrachao_lateral: string;
    break_light: string;
    farois_auxiliares: string;
    rodas_comum: string;
    rodas_de_liga: string;
    radio_toca_cds: string;
    amplificador: string;
    banco_dianteiro: string;
    banco_traseiro: string;
    buzinas: string;
    tapetes: string;
    protetor_carter: string;
    extintor: string;
    triangulo: string;
    console_interno: string;
    bateria: string;
    macaco: string;
    chave_de_roda: string;
    calotas: string;
    alarme: string;

    capo: number;
    parabrisa: number;
    retrovisor_dir: number;
    farol_dir: number;
    lateral_tras: number;
    vidro_tras_esq: number;
    porta_tras_esq: number;
    vidro_diant_esq: number;

    vidro_diant_dir: number;
    bau_dir: number;
    bau_esq: number;
    roda_tras_dir: number;
    caminhao: string;
    tanque: number;

    
    porta_diant_esq: number;
    farol_esq: number;
    retrovisor_esq: number;
    seta_esq: number;
    para_choque: number;
    farolete_dir: number;
    farolete_esq: number;
    vidro_tras: number;
    traseira: number;
    tam_porta_malas: number;
    vidro_tras2: number;
    teto: number;
    capo2: number;
    roda_tras_esq: number;
    roda_diant_esq: number;
    lateral_diant_esq: number;

    //cadastrarVeiculoEntity?: CadastrarVeiculo[];

}
