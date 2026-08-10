TRUNCATE TABLE "Nominations", "WeeklyCycles", "Categories" RESTART IDENTITY CASCADE;

--
-- PostgreSQL database dump
--

\restrict WvNTU0YBpsEYxDK3qUcYvPD90hj8nOLj7FK2tmKMlJ5UsRr0TmvcVTMY29TXPnl

-- Dumped from database version 16.14
-- Dumped by pg_dump version 16.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (1, 'Ação', 'Filmes de ação e combate', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (2, 'Aventura', 'Jornadas e grandes explorações', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (3, 'Comédia', 'Garantia de boas risadas', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (4, 'Drama', 'Histórias intensas e emocionantes', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (5, 'Fantasia', 'Mundos mágicos e extraordinários', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (6, 'Romance', 'Histórias de amor e relacionamentos', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (7, 'Sci-fi', 'Ficção científica e futuro', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (10, 'Musical', 'Música e performances', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (11, 'Animação', 'Animações em geral', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (12, 'Documentário', 'Histórias reais e fatos', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (13, 'Crime', 'Investigações e submundo do crime', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (15, 'Esporte', 'Superação e competições esportivas', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (16, 'Guerra', 'Conflitos históricos e batalhas', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (17, 'Nazismo', 'Filmes sobre a Segunda Guerra e o Nazismo', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (18, 'Mafia', 'Famílias de mafiosos e o crime organizado', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (19, 'Pirata', 'Aventuras em alto-mar', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (21, 'Zumbi', 'Apocalipse zumbi e sobrevivência', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (22, 'Viagem no tempo', 'Linhas temporais e paradoxos', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (23, 'Fim do mundo', 'Eventos cataclísmicos e pós-apocalipse', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (25, 'Video game', 'Adaptações e universos de games', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (26, 'Super-herói', 'Heróis, vilões e quadrinhos', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (27, 'Carro', 'Corridas, perseguições e velocidade', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (30, 'Adaptação (live-action / livro)', 'Baseado em livros ou obras originais', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (31, 'Nacional', 'O melhor do cinema brasileiro', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (32, 'Fatos reais', 'Baseado em acontecimentos reais', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (33, 'Dirigidos por mulheres', 'Obras com direção feminina', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (34, 'Oscar', 'Aclamados pela crítica e premiados', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (35, 'Clássico', 'Grandes obras do cinema clássico', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (36, 'Lançamentos', 'Filmes recentes e novos lançamentos', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (39, 'Livre', 'Livre escolha dos participantes', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (40, 'Sessão da tarde', 'Clássicos nostálgicos da TV', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (41, 'Vale a pena ver de novo', 'Filmes marcantes para rever', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (43, 'Não entendi', 'Filmes complexos e enigmáticos', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (44, 'Nicholas Cage', 'Filmes estrelados por Nicolas Cage', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (45, 'Adam Sandler', 'Comédias e atuações de Adam Sandler', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (46, 'Jackie Chan / Bruce Lee', 'Artes marciais e clássicos de ação', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (47, 'Dívida de jogo', 'Escolhas de punição ou aposta', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (48, 'Monstros', 'Filmes de Vampiros, Lobisomens e etc', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (29, 'Animação ocidental', 'Animações produzidas no ocidente', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (28, 'Anime', 'Animações japonesas', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (24, 'Animais', 'Histórias focadas em animais', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (37, 'Datas Comemorativas', 'Filmes temáticos de feriados e datas comemorativas', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (38, 'Trash', 'Filmes B, cults e extravagantes', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (49, 'Alien', 'Filmes com seres de outros planetas', true, '2026-08-09 11:42:36.716161-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (20, 'Faroeste (Cowboy)', 'Velho Oeste e duelos', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (50, 'Década', 'Filmes lançados dentro de uma década', true, '2026-08-09 11:44:43.242512-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (8, 'Suspense', 'Filmes que geram tensão pela incerteza do que vai acontecer', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (9, 'Terror', 'Filmes que geram medo psicológico e ansiedade diante de uma ameaça invisível ou iminente', false, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (51, 'Horror', 'Filmes que geram choque visual e a repulsa física ao se deparar com algo grotesco, violento ou monstruoso', true, '2026-08-09 11:46:28.830515-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (52, 'Mockumentário', 'Filme que foi feito para parecer um fato real', true, '2026-08-09 11:51:05.043058-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (53, 'Policial', 'Acompanhar trabalho de policiais, detetives e investigadores', true, '2026-08-09 11:52:38.745407-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (42, 'Você escolhe', 'Escolher uma pessoa do grupo para que ela escolha o filme da semana', true, '2026-08-08 11:53:34.32338-03');
INSERT INTO public."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt") VALUES (14, 'Espionagem', 'Agentes secretos e missões ocultas', false, '2026-08-08 11:53:34.32338-03');


--
-- Data for Name: WeeklyCycles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."WeeklyCycles" ("Id", "CategoryId", "Status", "StartedAt", "WinnerMovieId") VALUES (2, 31, 'Completed', '2026-08-08 11:53:34.326715-03', NULL);
INSERT INTO public."WeeklyCycles" ("Id", "CategoryId", "Status", "StartedAt", "WinnerMovieId") VALUES (1, 36, 'Completed', '2026-08-08 11:53:34.326715-03', 4);
INSERT INTO public."WeeklyCycles" ("Id", "CategoryId", "Status", "StartedAt", "WinnerMovieId") VALUES (3, 14, 'Nominating', '2026-08-09 21:20:35.532153-03', NULL);


--
-- Data for Name: Nominations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (1, 1, 'Michael', 'Marcello', 'A história da vida de Michael Jackson além da música, traçando sua jornada desde a descoberta de seu talento extraordinário como líder dos Jackson Five até o artista visionário.', 936075, 'https://image.tmdb.org/t/p/w500/gXh43JopeO8BlA661BvlkR6yeqs.jpg', '2026-08-08 11:53:34.331458-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (2, 1, 'Todo Mundo em Pânico', 'Mudt', 'Vinte e seis anos depois de escaparem de um assassino mascarado suspeitosamente familiar, o Quarteto Fantástico está de volta à mira do criminoso.', 1273221, 'https://image.tmdb.org/t/p/w500/y9yJd2qIIwhZcllHeKHsz5eRvNr.jpg', '2026-08-08 11:53:34.331458-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (3, 1, 'The Bride!', 'Yolo', 'Na década de 1930, Frankenstein viaja a Chicago em busca do Dr. Euphronius para ajudá-lo a criar uma companheira.', 1159831, 'https://image.tmdb.org/t/p/w500/vcdnSEcm0f0shJohkJnrOBcCq1m.jpg', '2026-08-08 11:53:34.331458-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (4, 1, 'Backrooms: Um Não-Lugar', 'Evarg', 'Em 1990, o vendedor de móveis Clark descobre em sua loja um portal para os Backrooms, um labirinto infinito de escritórios surreais.', 1083381, 'https://image.tmdb.org/t/p/w500/qEl4BDBTGnhLiadZx0c9nHM8vBF.jpg', '2026-08-08 11:53:34.331458-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (5, 1, 'O Diabo Veste Prada 2', 'Sarnathy', 'Miranda Priestly navega por sua carreira em meio ao declínio das publicações tradicionais de revistas.', 1314481, 'https://image.tmdb.org/t/p/w500/50yWyY981TyUHhoxxSEKwO70FmQ.jpg', '2026-08-08 11:53:34.331458-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (6, 1, 'Peaky Blinders: O Homem Imortal', 'MariaX', 'Após o envolvimento do filho em um complô nazista, o gângster Tommy Shelby precisa deixar el exílio e voltar a Birmingham.', 875828, 'https://image.tmdb.org/t/p/w500/8XLNDeumvz0cXa6sntZJ6p4zfLb.jpg', '2026-08-08 11:53:34.331458-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (7, 1, 'Star Wars: O Mandaloriano e Grogu', 'Pere', 'O maligno Império caiu e os senhores da guerra Imperiais ainda estão espalhados pela galáxia.', 1228710, 'https://image.tmdb.org/t/p/w500/dNwaS0tnwgQRaQFPY5MbGxdmYXr.jpg', '2026-08-08 11:53:34.331458-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (8, 1, 'Boa Sorte, Divirta-se, Não Morra', 'Kebabe', 'Um homem vindo do futuro chega a uma lanchonete em Los Angeles, onde precisa recrutar uma equipe para salvar o mundo de uma IA descontrolada.', 1119449, 'https://image.tmdb.org/t/p/w500/uy9KPHgJpxXHCzn4vPzuGkApzC8.jpg', '2026-08-08 11:53:34.331458-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (10, 2, 'C.I.C. - Central de Inteligência Cearense', 'Kebabe', 'Um agente secreto da Central de Inteligência Cearense é a última esperança do Brasil para recuperar os dados roubados de um projeto ultrassecreto, que ameaça destruir as praias do país.', 1210089, 'https://image.tmdb.org/t/p/w500/pRqry4UIbm3De8kfiDj86r9DlBC.jpg', '2026-08-02 21:22:57.717406-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (11, 2, 'Deus e o Diabo na Terra do Sol', 'Bloom', 'Manuel vive com a esposa Rosa e a mãe, numa vida muito pobre no sertão brasileiro. Numa discussão com o Coronel que controla sua região o rapaz se revolta e mata o poderoso. Sua única opção é fugir deixando o pouco que tem para trás e seguindo o beato Sebastião que promete a bênção de Deus aos seus fiéis. Manuel pode, sem querer, estar novamente entrando em problemas, pois a oligarquia local encomendou a morte de Sebastião e seus seguidores a João das Mortes, com medo que uma situação como a de Canudos se repita.', 67612, 'https://image.tmdb.org/t/p/w500/vBSTJhHcVq5zffTudQ7jMG9vDwI.jpg', '2026-08-02 21:23:14.846182-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (12, 2, 'Copa de Elite', 'Marcello', 'O policial Jorge Capitão é um competente capitão do BOP e um ídolo brasileiro. Só que depois dele salvar de um sequestro o maior craque argentino, às vésperas da Copa, acaba virando o inimigo público número 1 da nação. Expulso da corporação e desacreditado pelo povo, Capitão precisa reaprender a trabalhar em equipe para evitar um atentado contra o Papa na final do torneio. É quando entra em cena a empresária de sex shop Bia Alpinistinha, um médium e sua mãe muito louca.', 243451, 'https://image.tmdb.org/t/p/w500/yKpmi4dotMAENGVRB4yutItNKxQ.jpg', '2026-08-02 21:24:26.065997-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (13, 2, 'Cidade de Deus', 'MariaX', 'Buscapé é um jovem morador da Cidade de Deus que cresce em meio à violência. Com medo de se tornar um bandido, enxerga na fotografia uma oportunidade de ter uma vida digna.', 598, 'https://image.tmdb.org/t/p/w500/gfnXixcGC060QcG6JPxN6AMdVsq.jpg', '2026-08-02 21:25:48.624733-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (14, 2, 'Que Horas Ela Volta?', 'Pere', 'A pernambucana Val (Regina Casé) se mudou para São Paulo a fim de dar melhores condições de vida para sua filha Jéssica. Com muito receio, ela deixou a menina no interior de Pernambuco para ser babá de Fabinho, morando integralmente na casa de seus patrões. Treze anos depois, quando o menino (Michel Joelsas) vai prestar vestibular, Jéssica (Camila Márdila) lhe telefona, pedindo ajuda para ir à São Paulo, no intuito de prestar a mesma prova. Os chefes de Val recebem a menina de braços abertos, só que quando ela deixa de seguir certo protocolo, circulando livremente, como não deveria, a situação se complica.', 310569, 'https://image.tmdb.org/t/p/w500/d5aIZjwdG87YradTjmtmyZtR1dy.jpg', '2026-08-02 21:27:39.075066-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (9, 2, 'Morto Não Fala', 'Sarnathy', 'Stênio é plantonista noturno no necrotério de uma grande e violenta cidade. Em suas madrugadas de trabalho, ele nunca está só, pois possui um dom paranormal de comunicação com os mortos. Quando as confidências que ouve do além, contudo, revelam segredos de sua própria vida, Stênio desencadeia uma maldição que traz perigo e morte para perto de si e de sua família.', 515908, 'https://image.tmdb.org/t/p/w500/wGkro5BxdWDe14NeaJe3iH74joV.jpg', '2026-08-02 21:22:38.849416-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (18, 3, 'Como Cães e Gatos', 'Marcello', 'Cães e gatos têm travado uma guerra secreta desde o começo dos tempos. A vitória dos cães fica cada vez mais próxima quando o Professor Brody inventa uma fórmula capaz de curar a alergia dos humanos a cachorros. Para impedi-la, o líder dos gatos, Sr. Tinkles, decide roubar a vacina, mas primeiro precisa enfrentar o Agente Lou, um cão corajoso que, graças a um erro no sistema, está encarregado de proteger a família Brody.', 10992, 'https://image.tmdb.org/t/p/w500/5UmSAUg8ZwdzGcBFhYHv45VhueM.jpg', '2026-08-09 21:24:05.009445-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (16, 3, 'Ronin', 'Yolo', 'Uma maleta com conteúdo não revelado, procurada por terroristas irlandeses e pela máfia russa, chega às mãos de criminosos. Um agente de ligação irlandês reúne um esquadrão de mercenários, ou “ronin”, e lhes dá a espinhosa tarefa de recuperar a maleta.', 8195, 'https://image.tmdb.org/t/p/w500/AirrhRJjHwytOV0pdLu7YZ4DEyr.jpg', '2026-08-09 21:22:26.587312-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (17, 3, 'Um Espião e Meio', 'Polo', 'Antes de se tornar um agente da CIA, Bob sofria bullying na época do colégio. Já na agência, para resolver um caso ultrassecreto, ele recorre a um antigo colega, popular nos tempos da escola, hoje contador.', 302699, 'https://image.tmdb.org/t/p/w500/j24zrqp8RdDKsuvNDqrAkbBjCxC.jpg', '2026-08-09 21:23:25.466727-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (15, 3, 'Austin Powers: O Agente ‘Bond’ Cama', 'Kebabe', 'Em sua segunda aventura na tela, o super espião britânico Austin Powers retorna a 1969 porque o seu arqui-inimigo Dr. Evil voltou no tempo após ter roubado o mojo de Austin e criado um laser poderoso que está apontado para à Terra. Com a ajuda da bela agente Felicity Shagwell, o recém-solteiro Austin deve agora não só lidar com Dr. Evil, mas também com o maldoso e minúsculo Mini-Me.', 817, 'https://image.tmdb.org/t/p/w500/rVNb3xlaMjEQuDx2mS8c4UZjmg.jpg', '2026-08-09 21:21:56.025633-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (19, 3, 'Queime Depois de Ler', 'Sarnathy', 'Após ter sido despedido, um ex-agente da CIA decide escrever as suas memórias documentando segredos do governo mas, durante as partilhas do divórcio, a sua ex-mulher rouba-lhe um disco com o único exemplar do manuscrito. Por engano, esse mesmo disco cai nas mãos de dois empregados de um ginásio, um homem e uma mulher sem escrúpulos, que tencionam explorar ao máximo a sua descoberta, vendendo a informação de forma a poderem pagar uma cirurgia plástica. É então chamado um agente da CIA para resolver o caso… custe o que custar.', 4944, 'https://image.tmdb.org/t/p/w500/ad12q3VNQZNr1W8e7839GLcpdYA.jpg', '2026-08-09 21:24:39.239459-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (20, 3, 'Kingsman: Serviço Secreto', 'MariaX', 'Eggsy é um jovem com problemas de disciplina que parece perto de se tornar um criminoso. Determinado dia, ele entra em contato com Harry, que lhe apresenta à agência de espionagem Kingsman. O jovem se une a um time de recrutas em busca de uma vaga na agência. Ao mesmo tempo, Harry tenta impedir a ascensão do vilão Valentine.', 207703, 'https://image.tmdb.org/t/p/w500/wDhy1Ga9BoLwkHOI0jJISQem28v.jpg', '2026-08-09 21:25:08.880953-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (21, 3, '007 Contra GoldenEye', 'Poyo', 'James Bond precisa impedir que o controle do poderoso satélite GoldenEye, capaz de causar pane em qualquer equipamento eletrônico do mundo, caia em mãos erradas. Para isso, contará com a ajuda da bela especialista em computação Natalya Siminova.', 710, 'https://image.tmdb.org/t/p/w500/iy2lzurX2whm3AmbQZboYzWHEua.jpg', '2026-08-09 21:27:02.2378-03');
INSERT INTO public."Nominations" ("Id", "CycleId", "Title", "IndicatedBy", "Overview", "TmdbId", "PosterPath", "CreatedAt") VALUES (22, 3, 'Missão: Impossível - Efeito Fallout', 'Pere', 'Em uma perigosa tarefa para recuperar plutônio roubado, Ethan Hunt opta por salvar sua equipe em vez de completar a missão. Com isso, armas nucleares caem nas mãos de agentes altamente qualificados e que pertencem a uma rede mortal que deseja destruir a civilização. Agora, com o mundo em risco, Ethan e sua equipe da IMF são forçados a aliar-se a um obstinado agente da CIA.', 353081, 'https://image.tmdb.org/t/p/w500/i273qQubszItr11lQNMFWnYP4J1.jpg', '2026-08-09 21:28:50.603858-03');


--
-- Name: Categories_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Categories_Id_seq"', 53, true);


--
-- Name: Nominations_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Nominations_Id_seq"', 22, true);


--
-- Name: WeeklyCycles_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."WeeklyCycles_Id_seq"', 3, true);


--
-- PostgreSQL database dump complete
--

\unrestrict WvNTU0YBpsEYxDK3qUcYvPD90hj8nOLj7FK2tmKMlJ5UsRr0TmvcVTMY29TXPnl

