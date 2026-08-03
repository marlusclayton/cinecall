TRUNCATE TABLE "Nominations", "WeeklyCycles", "Categories" RESTART IDENTITY CASCADE;

-- Insert 47 Categories
INSERT INTO "Categories" ("Name", "Description", "IsActive", "CreatedAt") VALUES
('Ação', 'Filmes de ação e combate', true, NOW()),
('Aventura', 'Jornadas e grandes explorações', true, NOW()),
('Comédia', 'Garantia de boas risadas', false, NOW()),
('Drama', 'Histórias intensas e emocionantes', true, NOW()),
('Fantasia', 'Mundos mágicos e extraordinários', true, NOW()),
('Romance', 'Histórias de amor e relacionamentos', false, NOW()),
('Sci-fi', 'Ficção científica e futuro', false, NOW()),
('Suspense', 'Mistérios e tensão', false, NOW()),
('Terror', 'Filmes assustadores e horror', false, NOW()),
('Musical', 'Música e performances', false, NOW()),
('Animação', 'Animações em geral', false, NOW()),
('Documentário', 'Histórias reais e fatos', false, NOW()),
('Crime', 'Investigações e submundo do crime', true, NOW()),
('Espionagem', 'Agentes secretos e missões ocultas', true, NOW()),
('Esporte', 'Superação e competições esportivas', false, NOW()),
('Guerra', 'Conflitos históricos e batalhas', true, NOW()),
('Nazismo', 'Filmes sobre a Segunda Guerra e o Nazismo', true, NOW()),
('Mafia', 'Famílias de mafiosos e o crime organizado', true, NOW()),
('Pirata', 'Aventuras em alto-mar', true, NOW()),
('Cowboy (Faroeste)', 'Velho Oeste e duelos', true, NOW()),
('Zumbi', 'Apocalipse zumbi e sobrevivência', false, NOW()),
('Viagem no tempo', 'Linhas temporais e paradoxos', false, NOW()),
('Fim do mundo', 'Eventos cataclísmicos e pós-apocalipse', false, NOW()),
('Filme de bicho', 'Histórias focadas em animais', false, NOW()),
('Video game', 'Adaptações e universos de games', false, NOW()),
('Super-herói', 'Heróis, vilões e quadrinhos', false, NOW()),
('Carro', 'Corridas, perseguições e velocidade', false, NOW()),
('Anime', 'Animações japonesas', true, NOW()),
('Animação ocidental', 'Animações produzidas no ocidente', true, NOW()),
('Adaptação (live-action / livro)', 'Baseado em livros ou obras originais', true, NOW()),
('Nacional', 'O melhor do cinema brasileiro', false, NOW()),
('Fatos reais', 'Baseado em acontecimentos reais', false, NOW()),
('Dirigidos por mulheres', 'Obras com direção feminina', false, NOW()),
('Oscar', 'Aclamados pela crítica e premiados', true, NOW()),
('Clássico', 'Grandes obras do cinema clássico', true, NOW()),
('Lançamentos', 'Filmes recentes e novos lançamentos', false, NOW()),
('Holiday movie', 'Filmes temáticos de feriados e datas comemorativas', false, NOW()),
('Trash', 'Filmes B, cults e extravagantes', false, NOW()),
('Livre', 'Livre escolha dos participantes', false, NOW()),
('Sessão da tarde', 'Clássicos nostálgicos da TV', false, NOW()),
('Vale a pena ver de novo', 'Filmes marcantes para rever', false, NOW()),
('Você escolhe', 'Escolha aberta da rodada', false, NOW()),
('Não entendi', 'Filmes complexos e enigmáticos', false, NOW()),
('Nicholas Cage', 'Filmes estrelados por Nicolas Cage', true, NOW()),
('Adam Sandler', 'Comédias e atuações de Adam Sandler', false, NOW()),
('Jackie Chan / Bruce Lee', 'Artes marciais e clássicos de ação', true, NOW()),
('Dívida de jogo', 'Escolhas de punição ou aposta', true, NOW()),
('Monstros', 'Filmes de Vampiros, Lobisomens e etc', true, NOW());

-- Insert Cycle 1 with Category 36 (Lançamentos) and Status 0 (Nominating)
INSERT INTO "WeeklyCycles" ("Id", "CategoryId", "StartedAt", "Status")
VALUES (1, 36, NOW(), 4)
, (2, 31, NOW(), 0);

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
)
, (2, 'Morto Não Fala', 'Sarnathy', 'Stênio é plantonista noturno no necrotério de uma grande e violenta cidade. Em suas madrugadas de trabalho, ele nunca está só, pois possui um dom paranormal de comunicação com os mortos. Quando as confidências que ouve do além, contudo, revelam segredos de sua própria vida, Stênio desencadeia uma maldição que traz perigo e morte para perto de si e de sua família.', 515908, 'https://image.tmdb.org/t/p/w500/wGkro5BxdWDe14NeaJe3iH74joV.jpg', '2026-08-02 21:22:38.849416-03')
, (2, 'C.I.C. - Central de Inteligência Cearense', 'Kebabe', 'Um agente secreto da Central de Inteligência Cearense é a última esperança do Brasil para recuperar os dados roubados de um projeto ultrassecreto, que ameaça destruir as praias do país.', 1210089, 'https://image.tmdb.org/t/p/w500/pRqry4UIbm3De8kfiDj86r9DlBC.jpg', '2026-08-02 21:22:57.717406-03')
, (2, 'Deus e o Diabo na Terra do Sol', 'Bloom', 'Manuel vive com a esposa Rosa e a mãe, numa vida muito pobre no sertão brasileiro. Numa discussão com o Coronel que controla sua região o rapaz se revolta e mata o poderoso. Sua única opção é fugir deixando o pouco que tem para trás e seguindo o beato Sebastião que promete a bênção de Deus aos seus fiéis. Manuel pode, sem querer, estar novamente entrando em problemas, pois a oligarquia local encomendou a morte de Sebastião e seus seguidores a João das Mortes, com medo que uma situação como a de Canudos se repita.', 67612, 'https://image.tmdb.org/t/p/w500/vBSTJhHcVq5zffTudQ7jMG9vDwI.jpg', '2026-08-02 21:23:14.846182-03')
, (2, 'Copa de Elite', 'Marcello', 'O policial Jorge Capitão é um competente capitão do BOP e um ídolo brasileiro. Só que depois dele salvar de um sequestro o maior craque argentino, às vésperas da Copa, acaba virando o inimigo público número 1 da nação. Expulso da corporação e desacreditado pelo povo, Capitão precisa reaprender a trabalhar em equipe para evitar um atentado contra o Papa na final do torneio. É quando entra em cena a empresária de sex shop Bia Alpinistinha, um médium e sua mãe muito louca.', 243451, 'https://image.tmdb.org/t/p/w500/yKpmi4dotMAENGVRB4yutItNKxQ.jpg', '2026-08-02 21:24:26.065997-03')
, (2, 'Cidade de Deus', 'MariaX', 'Buscapé é um jovem morador da Cidade de Deus que cresce em meio à violência. Com medo de se tornar um bandido, enxerga na fotografia uma oportunidade de ter uma vida digna.', 598, 'https://image.tmdb.org/t/p/w500/gfnXixcGC060QcG6JPxN6AMdVsq.jpg', '2026-08-02 21:25:48.624733-03')
, (2, 'Que Horas Ela Volta?', 'Pere', 'A pernambucana Val (Regina Casé) se mudou para São Paulo a fim de dar melhores condições de vida para sua filha Jéssica. Com muito receio, ela deixou a menina no interior de Pernambuco para ser babá de Fabinho, morando integralmente na casa de seus patrões. Treze anos depois, quando o menino (Michel Joelsas) vai prestar vestibular, Jéssica (Camila Márdila) lhe telefona, pedindo ajuda para ir à São Paulo, no intuito de prestar a mesma prova. Os chefes de Val recebem a menina de braços abertos, só que quando ela deixa de seguir certo protocolo, circulando livremente, como não deveria, a situação se complica.', 310569, 'https://image.tmdb.org/t/p/w500/d5aIZjwdG87YradTjmtmyZtR1dy.jpg', '2026-08-02 21:27:39.075066-03')
;

UPDATE "WeeklyCycles" SET "WinnerMovieId" = 4 WHERE "Id" = 1;
