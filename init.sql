TRUNCATE TABLE "Nominations", "WeeklyCycles", "Categories" RESTART IDENTITY CASCADE;

-- Insert 47 Categories
INSERT INTO "Categories" ("Name", "Description", "IsActive", "CreatedAt") VALUES
('Ação', 'Filmes de ação e combate', true, NOW()),
('Aventura', 'Jornadas e grandes explorações', true, NOW()),
('Comédia', 'Garantia de boas risadas', true, NOW()),
('Drama', 'Histórias intensas e emocionantes', true, NOW()),
('Fantasia', 'Mundos mágicos e extraordinários', true, NOW()),
('Romance', 'Histórias de amor e relacionamentos', true, NOW()),
('Sci-fi', 'Ficção científica e futuro', true, NOW()),
('Suspense', 'Mistérios e tensão', true, NOW()),
('Terror', 'Filmes assustadores e horror', true, NOW()),
('Musical', 'Música e performances', true, NOW()),
('Animação', 'Animações em geral', true, NOW()),
('Documentário', 'Histórias reais e fatos', true, NOW()),
('Crime', 'Investigações e submundo do crime', true, NOW()),
('Espionagem', 'Agentes secretos e missões ocultas', true, NOW()),
('Esporte', 'Superação e competições esportivas', true, NOW()),
('Guerra', 'Conflitos históricos e batalhas', true, NOW()),
('Nazismo', 'Filmes sobre a Segunda Guerra e o Nazismo', true, NOW()),
('Mafia', 'Famílias de mafiosos e o crime organizado', true, NOW()),
('Pirata', 'Aventuras em alto-mar', true, NOW()),
('Cowboy (Faroeste)', 'Velho Oeste e duelos', true, NOW()),
('Zumbi', 'Apocalipse zumbi e sobrevivência', true, NOW()),
('Viagem no tempo', 'Linhas temporais e paradoxos', true, NOW()),
('Fim do mundo', 'Eventos cataclísmicos e pós-apocalipse', true, NOW()),
('Filme de bicho', 'Histórias focadas em animais', true, NOW()),
('Video game', 'Adaptações e universos de games', true, NOW()),
('Super-herói', 'Heróis, vilões e quadrinhos', true, NOW()),
('Carro', 'Corridas, perseguições e velocidade', true, NOW()),
('Anime', 'Animações japonesas', true, NOW()),
('Animação ocidental', 'Animações produzidas no ocidente', true, NOW()),
('Adaptação (live-action / livro)', 'Baseado em livros ou obras originais', true, NOW()),
('Nacional', 'O melhor do cinema brasileiro', true, NOW()),
('Fatos reais', 'Baseado em acontecimentos reais', true, NOW()),
('Dirigidos por mulheres', 'Obras com direção feminina', true, NOW()),
('Oscar', 'Aclamados pela crítica e premiados', true, NOW()),
('Clássico', 'Grandes obras do cinema clássico', true, NOW()),
('Lançamentos', 'Filmes recentes e novos lançamentos', true, NOW()),
('Holiday movie', 'Filmes temáticos de feriados e datas comemorativas', true, NOW()),
('Trash', 'Filmes B, cults e extravagantes', true, NOW()),
('Livre', 'Livre escolha dos participantes', true, NOW()),
('Sessão da tarde', 'Clássicos nostálgicos da TV', true, NOW()),
('Vale a pena ver de novo', 'Filmes marcantes para rever', true, NOW()),
('Você escolhe', 'Escolha aberta da rodada', true, NOW()),
('Não entendi', 'Filmes complexos e enigmáticos', true, NOW()),
('Nicholas Cage', 'Filmes estrelados por Nicolas Cage', true, NOW()),
('Adam Sandler', 'Comédias e atuações de Adam Sandler', true, NOW()),
('Jackie Chan / Bruce Lee', 'Artes marciais e clássicos de ação', true, NOW()),
('Dívida de jogo', 'Escolhas de punição ou aposta', true, NOW());

-- Insert Cycle 1 with Category 36 (Lançamentos) and Status 0 (Nominating)
INSERT INTO "WeeklyCycles" ("Id", "CategoryId", "StartedAt", "Status")
VALUES (1, 36, NOW(), 0);

SELECT setval(pg_get_serial_sequence('"WeeklyCycles"', 'Id'), 1);

-- Insert 8 Nominations for Cycle 1
INSERT INTO "Nominations" ("CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES
(
  1, 
  'Michael', 
  'Marcello', 
  'A história da vida de Michael Jackson além da música, traçando sua jornada desde a descoberta de seu talento extraordinário como líder dos Jackson Five até o artista visionário.', 
  936075, 
  'https://image.tmdb.org/t/p/w500/gXh43JopeO8BlA661BvlkR6yeqs.jpg', 
  NOW()
),
(
  1, 
  'Todo Mundo em Pânico', 
  'Mudt', 
  'Vinte e seis anos depois de escaparem de um assassino mascarado suspeitosamente familiar, o Quarteto Fantástico está de volta à mira do criminoso.', 
  1273221, 
  'https://image.tmdb.org/t/p/w500/y9yJd2qIIwhZcllHeKHsz5eRvNr.jpg', 
  NOW()
),
(
  1, 
  'The Bride!', 
  'Yolo', 
  'Na década de 1930, Frankenstein viaja a Chicago em busca do Dr. Euphronius para ajudá-lo a criar uma companheira.', 
  1159831, 
  'https://image.tmdb.org/t/p/w500/vcdnSEcm0f0shJohkJnrOBcCq1m.jpg', 
  NOW()
),
(
  1, 
  'Backrooms: Um Não-Lugar', 
  'Evarg', 
  'Em 1990, o vendedor de móveis Clark descobre em sua loja um portal para os Backrooms, um labirinto infinito de escritórios surreais.', 
  1083381, 
  'https://image.tmdb.org/t/p/w500/qEl4BDBTGnhLiadZx0c9nHM8vBF.jpg', 
  NOW()
),
(
  1, 
  'O Diabo Veste Prada 2', 
  'Sarnathy', 
  'Miranda Priestly navega por sua carreira em meio ao declínio das publicações tradicionais de revistas.', 
  1314481, 
  'https://image.tmdb.org/t/p/w500/50yWyY981TyUHhoxxSEKwO70FmQ.jpg', 
  NOW()
),
(
  1, 
  'Peaky Blinders: O Homem Imortal', 
  'MariaX', 
  'Após o envolvimento do filho em um complô nazista, o gângster Tommy Shelby precisa deixar el exílio e voltar a Birmingham.', 
  875828, 
  'https://image.tmdb.org/t/p/w500/8XLNDeumvz0cXa6sntZJ6p4zfLb.jpg', 
  NOW()
),
(
  1, 
  'Star Wars: O Mandaloriano e Grogu', 
  'Pere', 
  'O maligno Império caiu e os senhores da guerra Imperiais ainda estão espalhados pela galáxia.', 
  1228710, 
  'https://image.tmdb.org/t/p/w500/dNwaS0tnwgQRaQFPY5MbGxdmYXr.jpg', 
  NOW()
),
(
  1, 
  'Boa Sorte, Divirta-se, Não Morra', 
  'Kebabe', 
  'Um homem vindo do futuro chega a uma lanchonete em Los Angeles, onde precisa recrutar uma equipe para salvar o mundo de uma IA descontrolada.', 
  1119449, 
  'https://image.tmdb.org/t/p/w500/uy9KPHgJpxXHCzn4vPzuGkApzC8.jpg', 
  NOW()
);
