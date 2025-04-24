const Teste = require('../models/Teste');
const ResultadoArea = require('../models/ResultadoArea');
const Resposta = require('../models/Resposta');
const Questao = require('../models/Questao');
const ParametrosTRI = require('../models/ParametrosTRI');
const { Op } = require('sequelize');
const sequelize = require('../utils/database');

// Obter todos os testes do usuário
exports.getTestes = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate, tipoTeste } = req.query;

    // Construir filtros
    const where = { usuario_id: userId };
    
    if (startDate && endDate) {
      where.data_teste = {
        [Op.between]: [startDate, endDate]
      };
    } else if (startDate) {
      where.data_teste = {
        [Op.gte]: startDate
      };
    } else if (endDate) {
      where.data_teste = {
        [Op.lte]: endDate
      };
    }

    if (tipoTeste) {
      where.tipo_teste = tipoTeste;
    }

    // Buscar testes com resultados por área
    const testes = await Teste.findAll({
      where,
      include: [
        { model: ResultadoArea, as: 'resultados' }
      ],
      order: [['data_teste', 'DESC']]
    });

    return res.status(200).json(testes);
  } catch (error) {
    console.error('Erro ao obter testes:', error);
    return res.status(500).json({ message: 'Erro ao obter testes' });
  }
};

// Obter um teste específico com detalhes
exports.getTesteById = async (req, res) => {
  try {
    const userId = req.user.id;
    const testeId = req.params.id;

    // Buscar teste com resultados por área e respostas
    const teste = await Teste.findOne({
      where: { id: testeId, usuario_id: userId },
      include: [
        { model: ResultadoArea, as: 'resultados' },
        { 
          model: Resposta, 
          as: 'respostas',
          include: [
            { 
              model: Questao, 
              as: 'questao',
              include: [
                { model: ParametrosTRI, as: 'parametros_tri' }
              ]
            }
          ]
        }
      ]
    });

    if (!teste) {
      return res.status(404).json({ message: 'Teste não encontrado' });
    }

    return res.status(200).json(teste);
  } catch (error) {
    console.error('Erro ao obter teste:', error);
    return res.status(500).json({ message: 'Erro ao obter teste' });
  }
};

// Criar novo teste
exports.createTeste = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const userId = req.user.id;
    const { data_teste, tipo_teste, tempo_gasto_min, nota_redacao, resultados_areas } = req.body;

    // Criar teste
    const novoTeste = await Teste.create({
      usuario_id: userId,
      data_teste,
      tipo_teste,
      tempo_gasto_min,
      nota_redacao
    }, { transaction });

    // Criar resultados por área
    if (resultados_areas && resultados_areas.length > 0) {
      const resultadosPromises = resultados_areas.map(resultado => 
        ResultadoArea.create({
          teste_id: novoTeste.id,
          area: resultado.area,
          total_questoes: resultado.total_questoes,
          acertos: resultado.acertos
        }, { transaction })
      );

      await Promise.all(resultadosPromises);
    }

    await transaction.commit();

    // Buscar o teste completo com resultados
    const testeCriado = await Teste.findByPk(novoTeste.id, {
      include: [
        { model: ResultadoArea, as: 'resultados' }
      ]
    });

    return res.status(201).json({
      message: 'Teste registrado com sucesso',
      teste: testeCriado
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Erro ao criar teste:', error);
    return res.status(500).json({ message: 'Erro ao criar teste' });
  }
};

// Atualizar teste existente
exports.updateTeste = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const userId = req.user.id;
    const testeId = req.params.id;
    const { data_teste, tipo_teste, tempo_gasto_min, nota_redacao, resultados_areas } = req.body;

    // Verificar se o teste existe e pertence ao usuário
    const teste = await Teste.findOne({
      where: { id: testeId, usuario_id: userId }
    });

    if (!teste) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Teste não encontrado' });
    }

    // Atualizar teste
    await teste.update({
      data_teste,
      tipo_teste,
      tempo_gasto_min,
      nota_redacao
    }, { transaction });

    // Atualizar resultados por área
    if (resultados_areas && resultados_areas.length > 0) {
      // Remover resultados existentes
      await ResultadoArea.destroy({
        where: { teste_id: testeId },
        transaction
      });

      // Criar novos resultados
      const resultadosPromises = resultados_areas.map(resultado => 
        ResultadoArea.create({
          teste_id: testeId,
          area: resultado.area,
          total_questoes: resultado.total_questoes,
          acertos: resultado.acertos
        }, { transaction })
      );

      await Promise.all(resultadosPromises);
    }

    await transaction.commit();

    // Buscar o teste atualizado com resultados
    const testeAtualizado = await Teste.findByPk(testeId, {
      include: [
        { model: ResultadoArea, as: 'resultados' }
      ]
    });

    return res.status(200).json({
      message: 'Teste atualizado com sucesso',
      teste: testeAtualizado
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Erro ao atualizar teste:', error);
    return res.status(500).json({ message: 'Erro ao atualizar teste' });
  }
};

// Excluir teste
exports.deleteTeste = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const userId = req.user.id;
    const testeId = req.params.id;

    // Verificar se o teste existe e pertence ao usuário
    const teste = await Teste.findOne({
      where: { id: testeId, usuario_id: userId }
    });

    if (!teste) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Teste não encontrado' });
    }

    // Remover resultados por área
    await ResultadoArea.destroy({
      where: { teste_id: testeId },
      transaction
    });

    // Remover respostas
    await Resposta.destroy({
      where: { teste_id: testeId },
      transaction
    });

    // Remover teste
    await teste.destroy({ transaction });

    await transaction.commit();

    return res.status(200).json({
      message: 'Teste excluído com sucesso'
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Erro ao excluir teste:', error);
    return res.status(500).json({ message: 'Erro ao excluir teste' });
  }
};

// Obter estatísticas de desempenho
exports.getEstatisticas = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    // Construir filtros
    const where = { usuario_id: userId };
    
    if (startDate && endDate) {
      where.data_teste = {
        [Op.between]: [startDate, endDate]
      };
    } else if (startDate) {
      where.data_teste = {
        [Op.gte]: startDate
      };
    } else if (endDate) {
      where.data_teste = {
        [Op.lte]: endDate
      };
    }

    // Buscar testes com resultados por área
    const testes = await Teste.findAll({
      where,
      include: [
        { model: ResultadoArea, as: 'resultados' }
      ],
      order: [['data_teste', 'ASC']]
    });

    // Calcular estatísticas
    const estatisticas = {
      mediaGeral: 0,
      mediasPorArea: {
        Linguagens: 0,
        Humanas: 0,
        Natureza: 0,
        Matemática: 0
      },
      mediaRedacao: 0,
      evolucaoTempo: []
    };

    // Contadores para médias
    const contadores = {
      totalAcertos: 0,
      totalQuestoes: 0,
      areaContadores: {
        Linguagens: { acertos: 0, total: 0 },
        Humanas: { acertos: 0, total: 0 },
        Natureza: { acertos: 0, total: 0 },
        Matemática: { acertos: 0, total: 0 }
      },
      redacoes: []
    };

    // Processar testes
    testes.forEach(teste => {
      // Dados para evolução temporal
      const dataFormatada = new Date(teste.data_teste).toISOString().split('T')[0];
      const dadosTeste = {
        data: dataFormatada,
        acertosPorArea: {}
      };

      // Processar resultados por área
      teste.resultados.forEach(resultado => {
        const area = resultado.area;
        const percentualAcerto = (resultado.acertos / resultado.total_questoes) * 100;
        
        // Acumular para médias
        contadores.areaContadores[area].acertos += resultado.acertos;
        contadores.areaContadores[area].total += resultado.total_questoes;
        contadores.totalAcertos += resultado.acertos;
        contadores.totalQuestoes += resultado.total_questoes;
        
        // Dados para evolução temporal
        dadosTeste.acertosPorArea[area] = percentualAcerto;
      });

      // Adicionar à evolução temporal
      estatisticas.evolucaoTempo.push(dadosTeste);

      // Processar redação
      if (teste.nota_redacao) {
        contadores.redacoes.push(teste.nota_redacao);
      }
    });

    // Calcular médias finais
    if (contadores.totalQuestoes > 0) {
      estatisticas.mediaGeral = (contadores.totalAcertos / contadores.totalQuestoes) * 100;
    }

    Object.keys(contadores.areaContadores).forEach(area => {
      const { acertos, total } = contadores.areaContadores[area];
      if (total > 0) {
        estatisticas.mediasPorArea[area] = (acertos / total) * 100;
      }
    });

    if (contadores.redacoes.length > 0) {
      const somaRedacoes = contadores.redacoes.reduce((acc, nota) => acc + nota, 0);
      estatisticas.mediaRedacao = somaRedacoes / contadores.redacoes.length;
    }

    return res.status(200).json(estatisticas);
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    return res.status(500).json({ message: 'Erro ao obter estatísticas' });
  }
};

// Obter análise de erros
exports.getAnaliseErros = async (req, res) => {
  try {
    const userId = req.user.id;
    const { area, dificuldade } = req.query;

    // Buscar testes do usuário
    const testes = await Teste.findAll({
      where: { usuario_id: userId },
      include: [
        { 
          model: Resposta, 
          as: 'respostas',
          where: { acertou: false },
          include: [
            { 
              model: Questao, 
              as: 'questao',
              include: [
                { model: ParametrosTRI, as: 'parametros_tri' }
              ]
            }
          ]
        }
      ]
    });

    // Processar análise de erros
    const errosPorArea = {
      Linguagens: { facil: 0, medio: 0, dificil: 0 },
      Humanas: { facil: 0, medio: 0, dificil: 0 },
      Natureza: { facil: 0, medio: 0, dificil: 0 },
      Matemática: { facil: 0, medio: 0, dificil: 0 }
    };

    const questoesErradas = [];

    // Processar respostas erradas
    testes.forEach(teste => {
      teste.respostas.forEach(resposta => {
        const questao = resposta.questao;
        const parametrosTRI = questao.parametros_tri;
        
        if (questao && parametrosTRI) {
          const areaQuestao = questao.area;
          const dificuldadeQuestao = parametrosTRI.dificuldade.toLowerCase();
          
          // Filtrar por área e dificuldade se especificados
          if ((!area || areaQuestao === area) && 
              (!dificuldade || dificuldadeQuestao === dificuldade.toLowerCase())) {
            
            // Incrementar contador
            if (dificuldadeQuestao === 'fácil') {
              errosPorArea[areaQuestao].facil++;
            } else if (dificuldadeQuestao === 'médio') {
              errosPorArea[areaQuestao].medio++;
            } else if (dificuldadeQuestao === 'difícil') {
              errosPorArea[areaQuestao].dificil++;
            }
            
            // Adicionar à lista de questões erradas
            questoesErradas.push({
              id: questao.id,
              area: areaQuestao,
              dificuldade: parametrosTRI.dificuldade,
              parametros: {
                a: parametrosTRI.parametro_a,
                b: parametrosTRI.parametro_b,
                c: parametrosTRI.parametro_c
              }
            });
          }
        }
      });
    });

    return res.status(200).json({
      errosPorArea,
      questoesErradas
    });
  } catch (error) {
    console.error('Erro ao obter análise de erros:', error);
    return res.status(500).json({ message: 'Erro ao obter análise de erros' });
  }
};
