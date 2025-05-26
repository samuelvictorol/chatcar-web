<template>
    <q-page class="q-pa-md q-gutter-y-md column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 q-mb-md" separator-icon="chevron_right">
            <q-breadcrumbs-el class="text-teal" icon="store" label="Início" to="/loja" />
            <q-breadcrumbs-el icon="info" label="Ajuda" />
        </q-breadcrumbs>
        <div class="row items-center justify-between q-mb-md">
            <div class="text-h5 text-bold text-dark">Como Utilizar a IA para Gerar Leads e Sugestões de Abordagem
                Personalizadas</div>
        </div>

        <!-- Conteúdo -->
        <q-card flat bordered>
            <q-card-section class="q-pa-lg">
                <div class="text-body1 q-mb-md">
                    A funcionalidade de <strong>Relatório IA</strong> permite que você visualize uma análise inteligente
                    de cada lead captado pela sua equipe. Siga o passo a passo abaixo para gerar o relatório com
                    inteligência artificial:
                </div>

                <!-- Etapas -->
                <div class="q-gutter-y-md">
                    <q-timeline color="secondary" layout="dense">

                        <q-timeline-entry title="1. Acesse a lista de Leads" icon="groups">
                            Vá até o menu <q-icon name="groups" class="q-mx-xs" /> <strong>Leads</strong> no seu painel
                            de controle.
                        </q-timeline-entry>

                        <q-timeline-entry title="2. Localize o lead desejado" icon="search">
                            Use a tabela para encontrar o lead que você deseja analisar. Você pode utilizar filtros ou
                            rolar a tabela.
                        </q-timeline-entry>

                        <q-timeline-entry title="3. Clique no botão de IA" icon="assignment">
                            Ao lado do lead, clique no botão <q-icon name="assignment" class="q-mx-xs" /> para abrir o
                            relatório gerado por inteligência artificial.
                        </q-timeline-entry>

                        <q-timeline-entry title="4. Visualize o Relatório" icon="description">
                            Um relatório detalhado será exibido com base nos dados captados do lead, fornecendo insights
                            úteis para sua abordagem.
                        </q-timeline-entry>

                        <q-timeline-entry title="5. Feche o relatório" icon="close">
                            Após a leitura, clique em <q-icon name="close" class="q-mx-xs" /> <strong>Fechar</strong>
                            para retornar à lista de leads.
                        </q-timeline-entry>

                    </q-timeline>
                </div>
            </q-card-section>
        </q-card>

        <!-- Cadastro de Vendedor -->
        <q-card flat bordered class="q-mt-lg">
            <q-card-section class="q-pa-lg">
                <div class="text-h6 text-bold q-mb-md">Como Cadastrar um Vendedor</div>
                <div class="text-body1 q-mb-md">
                    O cadastro de vendedores permite que sua equipe de vendas seja gerenciada de forma eficaz. Siga os
                    passos abaixo para adicionar um novo vendedor:
                </div>

                <q-timeline color="accent" layout="dense">
                    <q-timeline-entry title="1. Vá até o menu Loja" icon="store">
                        Acesse o menu principal da loja onde é exibida a lista de vendedores.
                    </q-timeline-entry>

                    <q-timeline-entry title="2. Clique em 'Novo Vendedor'" icon="person_add">
                        No topo da lista, clique no botão <strong>Novo Vendedor</strong> para abrir o formulário de
                        cadastro.
                    </q-timeline-entry>

                    <q-timeline-entry title="3. Preencha os dados" icon="edit">
                        Insira nome, e-mail, telefone e demais dados necessários. Certifique-se de revisar antes de
                        salvar.
                    </q-timeline-entry>

                    <q-timeline-entry title="4. Salve o cadastro" icon="check_circle">
                        Clique em <strong>Salvar</strong> para finalizar. O vendedor será adicionado à lista
                        automaticamente.
                    </q-timeline-entry>
                </q-timeline>
            </q-card-section>
        </q-card>

        <!-- Cadastro de Veículo no Estoque -->
        <q-card flat bordered class="q-mt-lg">
            <q-card-section class="q-pa-lg">
                <div class="text-h6 text-bold q-mb-md">Como Cadastrar um Veículo no Estoque</div>
                <div class="text-body1 q-mb-md">
                    O menu <strong>Estoque</strong> permite cadastrar todos os veículos disponíveis para venda. Veja
                    como cadastrar um novo veículo:
                </div>

                <q-timeline color="blue-14" layout="dense">
                    <q-timeline-entry title="1. Acesse o menu Estoque" icon="directions_car">
                        No painel lateral, clique em <strong>Estoque</strong> para visualizar a lista de veículos
                        cadastrados.
                    </q-timeline-entry>

                    <q-timeline-entry title="2. Clique em 'Novo Veículo'" icon="add_box">
                        Utilize o botão <strong>Novo Veículo</strong> no topo da tabela para abrir o formulário de
                        inclusão.
                    </q-timeline-entry>

                    <q-timeline-entry title="3. Preencha os dados do carro" icon="description">
                        Insira marca, modelo, ano, preço, cor, quilometragem e outras informações relevantes.
                        Você também pode adicionar uma <strong>Mensagem de Fala</strong> personalizada, que será
                        emitida automaticamente quando o cliente selecionar o veículo no <strong>Chat Vitrine</strong>.
                    </q-timeline-entry>

                    <q-timeline-entry title="4. Adicione fotos (opcional)" icon="photo_camera">
                        Adicione fotos do veículo para torná-lo mais atraente. Você pode colar o link direto da imagem
                        no campo correspondente. Para mais detalhes, veja a seção "Como Adicionar Imagens dos
                        Veículos" abaixo.
                    </q-timeline-entry>

                    <q-timeline-entry title="5. Salve o veículo no estoque" icon="check_circle">
                        Após revisar todos os dados, clique em <strong>Salvar</strong>. O veículo será exibido
                        imediatamente na lista e também estará acessível no link público da sua loja:
                        <a href="https://chatcar.me/logindaloja" target="_blank" class="text-primary">
                            chatcar.me/logindaloja
                        </a>.
                    </q-timeline-entry>
                </q-timeline>
            </q-card-section>
        </q-card>
        <!-- Título -->
        <div class="text-h4 text-bold text-dark q-mb-md q-pt-md">🚀 Como Utilizar o ChatCar IA da Melhor Forma</div>

        <!-- Seção de Como Adicionar Imagens -->
        <q-card flat bordered>
            <q-card-section>
                <div class="text-h6 text-bold q-mb-md text-teal">Como Adicionar Imagens dos Veículos</div>
                <div class="text-body1 q-mb-md">
                    Para que a IA apresente seus veículos de forma mais atraente, é essencial adicionar imagens de
                    qualidade.
                    Basta <strong>colar o link direto da imagem</strong> no campo correspondente.
                </div>
                <div class="text-body2 q-mb-md">
                    🔗 Dica: Utilize plataformas gratuitas para hospedar as fotos e gerar links diretos:
                    <ul>
                        <li><strong>Imgur:</strong> <a href="https://imgur.com/" target="_blank"
                                class="text-teal">imgur.com</a> – fácil e rápido!</li>
                        <li><strong>Facebook:</strong> poste no feed ou em álbuns e copie o link direto.</li>
                        <li><strong>Seu próprio site:</strong> se tiver, use os links das suas páginas de vendas.</li>
                    </ul>
                </div>
            </q-card-section>
        </q-card>

        <!-- Dicas de Descrição -->
        <q-card flat bordered class="q-mt-lg">
            <q-card-section>
                <div class="text-h6 text-bold q-mb-md text-teal">Escrevendo a Descrição Perfeita</div>
                <div class="text-body1 q-mb-md">
                    Uma boa descrição faz toda a diferença! Quanto mais direta e completa, melhor a IA vai funcionar e
                    gerar leads de qualidade.
                </div>
                <div class="text-body2 q-mb-md">
                    ✅ <strong>Dicas para uma descrição eficiente:</strong>
                    <ul>
                        <li>Informe a marca, modelo, motor e combustível.</li>
                        <li>Inclua quilometragem, cor, número de portas e tração.</li>
                        <li>Adicione detalhes importantes como: único dono, revisões feitas, extras, etc.</li>
                    </ul>
                    Quanto mais claro e direto, maior a chance de conversão!
                </div>
            </q-card-section>
        </q-card>

        <!-- Exemplo de Descrição -->
        <q-card flat bordered class="q-mt-lg">
            <q-card-section>
                <div class="text-h6 text-bold q-mb-md text-teal">Exemplo de Boa Descrição</div>
                <div class="q-mb-md bg-grey-3 q-pa-sm rounded-borders">
                    <code>
            BMW 320i GP 2.0 Turbo - Tração Traseira - 16V GASOLINA 4P, câmbio AUTOMÁTICO, 166.000km, Sedã, Gasolina, Cor Preto, único dono.
          </code>
                </div>
                <div class="text-body2">
                    🧠 A IA vai usar essas informações para criar textos e respostas personalizadas, facilitando a
                    conversão!
                </div>
            </q-card-section>
        </q-card>
        <!-- Sugestão de Suporte -->
        <q-card flat bordered class="q-mt-lg">
            <q-card-section class="q-pa-lg">
                <div class="text-subtitle1 text-bold q-mb-sm">Precisa de ajuda?</div>
                <div class="text-body2">
                    Se você tiver dúvidas ou dificuldades com o uso da IA, entre em contato com nosso time de suporte no
                    instagram:
                    <strong>@chatcar.ia</strong> ou email <strong>chatcar.suporte@gmail.com</strong> .
                </div>
            </q-card-section>
        </q-card>

        <div class="row items-center justify-between q-mb-md">
            <div class="text-h5 text-bold text-dark">Termos de Uso</div>
        </div>

        <q-card flat bordered>
            <q-card-section class="q-pa-lg">
                <div class="text-body1 q-mb-md">
                    Ao utilizar a plataforma <strong>ChatCar</strong>, você, usuário, concorda em fornecer seu
                    <strong>nome</strong> e <strong>telefone</strong> para que os lojistas possam entrar em contato
                    diretamente com você por meio da plataforma.
                </div>

                <div class="text-body1 q-mb-md">
                    O lojista se compromete a utilizar essas informações <strong>exclusivamente</strong> para o fim de
                    realizar abordagens comerciais relacionadas à venda de veículos <strong>anunciados em seu
                        estoque</strong>.
                </div>

                <div class="text-body1 q-mb-md">
                    Qualquer outro uso dos dados do usuário, incluindo <strong>spam</strong>, <strong>revenda de
                        dados</strong> ou <strong>contatos não relacionados</strong> à venda de veículos, é estritamente
                    proibido e constitui <strong>violação dos Termos de Uso</strong> da ChatCar.
                </div>

                <div class="text-body1">
                    A ChatCar se reserva o direito de <strong>suspender</strong> ou <strong>banir lojistas</strong> que
                    fizerem uso indevido das informações recebidas por meio da plataforma.
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup>
// Página estática, sem necessidade de lógica por enquanto
</script>