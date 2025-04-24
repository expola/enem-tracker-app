-- Arquivo de migração inicial para o banco de dados enem_tracker
-- Criação das tabelas conforme os modelos definidos

-- Tabela de usuários
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  hash_senha VARCHAR(255) NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de testes
CREATE TABLE testes (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  data_teste DATE NOT NULL,
  tipo_teste VARCHAR(20) NOT NULL CHECK (tipo_teste IN ('Tempo', 'Coerência', 'Simulado 1', 'Simulado 2')),
  tempo_gasto_min INTEGER,
  nota_redacao INTEGER CHECK (nota_redacao >= 0 AND nota_redacao <= 1000)
);

-- Tabela de resultados por área
CREATE TABLE resultados_areas (
  id SERIAL PRIMARY KEY,
  teste_id INTEGER NOT NULL REFERENCES testes(id) ON DELETE CASCADE,
  area VARCHAR(20) NOT NULL CHECK (area IN ('Linguagens', 'Humanas', 'Natureza', 'Matemática')),
  total_questoes INTEGER NOT NULL CHECK (total_questoes >= 0),
  acertos INTEGER NOT NULL CHECK (acertos >= 0),
  CHECK (acertos <= total_questoes)
);

-- Tabela de questões
CREATE TABLE questoes (
  id SERIAL PRIMARY KEY,
  area VARCHAR(20) NOT NULL CHECK (area IN ('Linguagens', 'Humanas', 'Natureza', 'Matemática')),
  parametro_a FLOAT,
  parametro_b FLOAT,
  parametro_c FLOAT
);

-- Tabela de parâmetros TRI
CREATE TABLE parametros_tri (
  id SERIAL PRIMARY KEY,
  questao_id INTEGER NOT NULL REFERENCES questoes(id) ON DELETE CASCADE,
  parametro_a FLOAT,
  parametro_b FLOAT,
  parametro_c FLOAT,
  dificuldade VARCHAR(10) CHECK (dificuldade IN ('Fácil', 'Médio', 'Difícil'))
);

-- Tabela de respostas
CREATE TABLE respostas (
  id SERIAL PRIMARY KEY,
  teste_id INTEGER NOT NULL REFERENCES testes(id) ON DELETE CASCADE,
  questao_id INTEGER NOT NULL REFERENCES questoes(id) ON DELETE CASCADE,
  acertou BOOLEAN NOT NULL
);

-- Índices para melhorar a performance
CREATE INDEX idx_testes_usuario_id ON testes(usuario_id);
CREATE INDEX idx_resultados_teste_id ON resultados_areas(teste_id);
CREATE INDEX idx_respostas_teste_id ON respostas(teste_id);
CREATE INDEX idx_respostas_questao_id ON respostas(questao_id);
CREATE INDEX idx_parametros_questao_id ON parametros_tri(questao_id);

-- Função para calcular a dificuldade com base no parâmetro b
CREATE OR REPLACE FUNCTION calcular_dificuldade(parametro_b FLOAT)
RETURNS VARCHAR(10) AS $$
BEGIN
  IF parametro_b < -1 THEN
    RETURN 'Fácil';
  ELSIF parametro_b <= 1 THEN
    RETURN 'Médio';
  ELSE
    RETURN 'Difícil';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar automaticamente a dificuldade ao inserir ou atualizar parâmetros TRI
CREATE OR REPLACE FUNCTION atualizar_dificuldade()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.parametro_b IS NOT NULL THEN
    NEW.dificuldade := calcular_dificuldade(NEW.parametro_b);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_atualizar_dificuldade
BEFORE INSERT OR UPDATE ON parametros_tri
FOR EACH ROW
EXECUTE FUNCTION atualizar_dificuldade();
