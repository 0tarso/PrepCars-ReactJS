//Components
import NavBar from '../../components/nav'
import RuleCard from '../../components/ruleCard'
import Container from '../../components/container'
import HeaderPath from '../../components/headerPath'

const Rules = () => {

  return (

    <Container>
      <NavBar />
      <HeaderPath text='Regras básicas' />

      <main className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all' >
        <RuleCard
          title='Informações Verdadeiras'
          text='Os usuários devem fornecer informações verdadeiras, precisas e completas ao se cadastrar e ao criar anúncios. Anúncios falsos ou enganosos serão removidos.'
        />

        <RuleCard
          title='Propriedade do Veículo'
          text='Os anúncios devem ser de veículos que o usuário tem direito de vender ou alugar. Não é permitido anunciar veículos sem ser o proprietário ou sem autorização.'
        />

        <RuleCard
          title='Mostre o seu carro'
          text='As imagens de veículos devem ser reais e claras. Não é permitido o uso de imagens de estoque, fotos manipuladas ou que não representem fielmente o veículo anunciado.'
        />

        <RuleCard
          title='Anúncios enganosos'
          text='Não é permitido criar anúncios com preços falsos, informações incompletas ou enganosas para atrair usuários de forma desonesta.'
        />

        <RuleCard
          title='Atualize seus anúncios'
          text='Os anúncios devem ser atualizados regularmente. Caso o veículo seja vendido, o anúncio deve ser removido imediatamente da plataforma.'
        />

        <RuleCard
          title='Responsabilidade da negociação'
          text='A plataforma não se responsabiliza pelas negociações entre compradores e vendedores. É de total responsabilidade dos usuários verificar a autenticidade das informações e a legalidade da negociação.'
        />

        <RuleCard
          title='Cumprimento das regras'
          text='O não cumprimento das regras acima nos garante o direito de análise e exclusão do perfil do usuário.'
        />



      </main>
    </Container>
  )
}

export default Rules