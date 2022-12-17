import { CriarProdutoDto } from "src/models/produto/dto/criar-produto.dto";

const host = 'http://localhost:3000'

export const produtoSeed: CriarProdutoDto[] = [
    {
        nome: 'Mouse Gamer M-X',
        sobre: 'O Mouse M-X vem pronto para jogar com um sensor de 8.000 DPI e cores RGB personalizáveis. A iluminação RGB pode ser personalizada com efeitos ou padrões de ondas de cores em aproximadamente 16,8 milhões de cores para se adequar ao seu estilo, configuração e humor. O sensor de nível avançado para jogos responde com precisão aos seus movimentos e você pode personalizar as configurações para se adequar à sensibilidade desejada.',
        preco: 18990,
        marca: 'MTech',
        imposto: 6,
        estoque: 113,
        imagem: `${host}/mouse_M-X.png`,
        caracteristicas: [
            {
                nome: 'codigo-serie',
                descricao: 'Código de série',
                valor: 'mouse-MX123'
            },
            {
                nome: 'modelo',
                descricao: 'Modelo do produto',
                valor: 'M-X'
            },
            {
                nome: 'peso',
                descricao: 'Peso do produto',
                valor: '87g'
            }
        ]
    },
    {
        nome: 'Caixa de Som M-S',
        sobre: 'Experimente novos níveis de intensidade com os alto-falantes da M-S. O sistema de alto-falantes 2.1 reage a ações e música no jogo. Personalize efeitos escolhendo entre cerca de 16.8 milhões de cores com quatro zonas de iluminação: iluminação frontal e projeção ambiente traseira. A potência de 120 Watts RMS (240 Watts de pico) alimenta um poderoso subwoofer e duas caixas de som satélites angulares para proporcionar sons claros e puros.',
        preco: 42080,
        marca: 'MTech',
        imposto: 8,
        estoque: 32,
        imagem: `${host}/caixadesom_M-S.png`,
        caracteristicas: [
            {
                nome: 'codigo-serie',
                descricao: 'Código de série',
                valor: 'cxsom-MS953'
            },
            {
                nome: 'modelo',
                descricao: 'Modelo do produto',
                valor: 'M-S'
            }
        ]
    },
    {
        nome: 'Teclado Mecânico M-Z',
        sobre: 'Com um design compacto e switches mecânicos GX Clicky, o M-Z foi testado por profissionais, comprovado em torneios e desenvolvido para vencer. O design sem teclado numérico oferece mais espaço para o movimento do mouse. O design compacto e durável também facilita o transporte nas viagens para os torneios ao redor do mundo.',
        preco: 37090,
        marca: 'MTech',
        imposto: 4,
        estoque: 98,
        imagem: `${host}/tecladomecanico_M-Z.png`,
        caracteristicas: [
            {
                nome: 'codigo-serie',
                descricao: 'Código de série',
                valor: 'tecmac-MZ6423'
            },
            {
                nome: 'modelo',
                descricao: 'Modelo do produto',
                valor: 'M-Z'
            },
            {
                nome: 'switches',
                descricao: 'Modelo dos switches',
                valor: 'GX Clicky'
            }
        ]
    },
    {
        nome: 'Mouse Pad',
        sobre: 'A superfície em tecido para jogo do mousepad oferece a fricção ideal para jogos de baixo DPI, melhorando o controle do mouse e a precisão do posicionamento do cursor. Partida, frenagem e mudança de direção rápidas e abruptas não são problemas para esse mouse pad. A textura compacta da superfície melhora o desempenho do sensor, especialmente quando usado com os sensores para jogos.',
        preco: 5510,
        marca: 'MTech',
        imposto: 2,
        estoque: 86,
        imagem: `${host}/mousepad.png`,
        caracteristicas: []
    },
    {
        nome: 'Headset M-Y',
        sobre: 'Headset Gamer, oferece uma construção leve mas resistente e muito conforto para que você possa jogar por mais tempo sem parar. Headset desenvolvido para jogos com drivers ASTRO Audio de 40mm, garantindo que você ouça seu jogo e colegas de equipe com clareza e precisão. O microfone unidirecional com funcionalidade flip-to-mute e o controle de volume no cabo coloca você no controle total da sua experiência de áudio em jogos.',
        preco: 31240,
        marca: 'MTech',
        imposto: 9,
        estoque: 25,
        imagem: `${host}/headset_M-Y.png`,
        caracteristicas: [
            {
                nome: 'codigo-serie',
                descricao: 'Código de série',
                valor: 'hdset-MY068'
            }
        ]
    },
    {
        nome: 'Microfone USB M-H',
        sobre: 'O M-H é um microfone condensador USB premium projetado para produção de podcasts, vídeos do YouTube, game streaming, chamadas pelo Skype e locuções. Apresenta qualidade de som de 24 bits, um design compacto e operação plug and play para transmissão instantânea com seu PC ou Mac. Com uma saída de fone de ouvido sem latência e controles para volume de fone de ouvido, mudo de microfone e padrão de captação.',
        preco: 74999,
        marca: 'MTech',
        imposto: 15,
        estoque: 9,
        imagem: `${host}/microfone_M-H.png`,
        caracteristicas: [
            {
                nome: 'codigo-serie',
                descricao: 'Código de série',
                valor: 'mic-MH999'
            }
        ]
    },
    {
        nome: 'Caixa de Som Bluetooth EBS',
        sobre: 'Caixa de som portátil que oferece um som surpreendente, em qualquer lugar. Saindo? Use o novo Outdoor Boost para obter um áudio mais nítido e mais alto, especialmente ajustado para ser ouvido ao ar livre. Com 13 horas de bateria, ela vai durar até o amanhecer. Possui classificação IP67, por isso é realmente impermeável e à prova de poeira e ainda flutua na água.',
        preco: 46999,
        marca: 'EARBass',
        imposto: 7,
        estoque: 12,
        imagem: `${host}/caixadesombluetooth_EARBASS.png`,
        caracteristicas: [
            {
                nome: 'codigo-serie',
                descricao: 'Código de série',
                valor: 'csBT-EARB2'
            },
            {
                nome: 'classificação IP',
                descricao: 'Nível de proteção IP',
                valor: 'IP67'
            },
        ]
    },
    {
        nome: 'Fone de Ouvido EBS',
        sobre: 'Ouça em alto e bom som onde quer que a vida o leve. Adquira os fones de ouvido que oferecem incrível desempenho de áudio. A qualidade do microfone integrado no cabo oferece conversas e comunicações claras. Os controles integrados permitem iniciar, pausar e controlar o volume com facilidade.',
        preco: 11970,
        marca: 'EARBass',
        imposto: 3,
        estoque: 55,
        imagem: `${host}/fonedeouvido_EARBASS.png`,
        caracteristicas: []
    },
    {
        nome: 'Microfone XOffice',
        sobre: 'Apresentando um design elegante, de baixo perfil e materiais premium, o Mic XOffice renderiza som incrivelmente claro e natural. Os módulos de microfone individuais contêm múltiplos elementos de formação de feixe que focam em caixas de som ativas, enquanto eliminam automaticamente as distrações acústicas. Possui sete módulos de microfone que funcionam juntos para espaços maiores de reunião.',
        preco: 49900,
        marca: 'XOffice',
        imposto: 14,
        estoque: 8,
        imagem: `${host}/microfone_XOFFICE.png`,
        caracteristicas: [
            {
                nome: 'codigo-serie',
                descricao: 'Código de série',
                valor: 'mic-XOFF37834'
            }
        ]
    },
    {
        nome: 'Mouse Ergonômico XOffice',
        sobre: 'Uma ótima pegada para mãos pequenas e médias, o Mouse Ergonômico XOffice é fabricado para conforto o dia todo. Deixe sua mão elevada para o máximo conforto com uma pegada emborrachada e apoio confortável para o polegar. Realinhe para uma postura mais natural em 57°. E tenha mais foco durante o dia todo com recursos de produtividade projetados para se adequar ao seu estilo de trabalho.',
        preco: 37990,
        marca: 'XOffice',
        imposto: 6,
        estoque: 77,
        imagem: `${host}/mouseergonomico_XOFFICE.png`,
        caracteristicas: [
            {
                nome: 'codigo-serie',
                descricao: 'Código de série',
                valor: 'mouse-XOFF57'
            },
            {
                nome: 'peso',
                descricao: 'Peso do produto',
                valor: '122g'
            }
        ]
    },
    {
        nome: 'Teclado XOffice',
        sobre: 'O teclado multi-dispositivo XOffice traz o conforto e a conveniência da digitação para seu desktop, smartphone, tablet e muito mais. Conecte-se com até três dispositivos habilitados para Bluetooth simultaneamente e alterne instantaneamente entre eles. Como o teclado é compacto e leve, você pode usá-lo para digitar no dispositivo de sua escolha, em qualquer lugar da casa.',
        preco: 24790,
        marca: 'XOffice',
        imposto: 5,
        estoque: 69,
        imagem: `${host}/teclado_XOFFICE.png`,
        caracteristicas: []
    },
    {
        nome: 'Webcam XOffice',
        sobre: 'A Webcam XOffice é projetada para salas de conferência pequenas e para salas cheias. Pare de se aglomerar em torno de laptops. Com um campo de visão superamplo de 120º e as lentes para panorâmica e inclinação, a webcam faz com que todas as cadeiras da mesa fiquem claramente visíveis. Com o áudio integrado otimizado para a acústica de sala de reuniões, todos podem ser ouvidos e vistos.',
        preco: 38910,
        marca: 'XOffice',
        imposto: 5,
        estoque: 10,
        imagem: `${host}/webcam_XOFFICE.png`,
        caracteristicas: []
    },
]
