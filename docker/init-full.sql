--
-- PostgreSQL database dump
--

\restrict NevUaBoT8cUQfc9gCVSP41eibdveh56K5esvRa8NDCV5Da9knEnr8uwaUHrp7AO

-- Dumped from database version 15.15
-- Dumped by pg_dump version 15.15

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: api_consumption_orders; Type: TABLE; Schema: public; Owner: tgnl_user
--

CREATE TABLE public.api_consumption_orders (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    api_username character varying(255) NOT NULL,
    order_type character varying(50) NOT NULL,
    amount_trx numeric(18,6) NOT NULL,
    energy integer,
    day integer,
    receiver_address character varying(255),
    status character varying(20) DEFAULT 'completed'::character varying NOT NULL,
    error_message text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.api_consumption_orders OWNER TO tgnl_user;

--
-- Name: api_recharge_orders; Type: TABLE; Schema: public; Owner: tgnl_user
--

CREATE TABLE public.api_recharge_orders (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    api_username character varying(255) NOT NULL,
    payment_address character varying(255) NOT NULL,
    amount_trx numeric(18,6) NOT NULL,
    status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    tx_hash character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    expires_at timestamp with time zone NOT NULL,
    paid_at timestamp with time zone,
    telegram_chat_id bigint,
    telegram_message_id integer,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.api_recharge_orders OWNER TO tgnl_user;

--
-- Name: api_users; Type: TABLE; Schema: public; Owner: tgnl_user
--

CREATE TABLE public.api_users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    balance_micro bigint DEFAULT 0 NOT NULL
);


ALTER TABLE public.api_users OWNER TO tgnl_user;

--
-- Name: bot_configs; Type: TABLE; Schema: public; Owner: tgnl_user
--

CREATE TABLE public.bot_configs (
    id integer NOT NULL,
    bot_username character varying(255) NOT NULL,
    api_username character varying(255),
    config_content text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    bot_notify_url character varying(500)
);


ALTER TABLE public.bot_configs OWNER TO tgnl_user;

--
-- Name: COLUMN bot_configs.bot_notify_url; Type: COMMENT; Schema: public; Owner: tgnl_user
--

COMMENT ON COLUMN public.bot_configs.bot_notify_url IS '机器人系统的通知地址，例如：http://bot-server-ip:8080/api/recharge-notify';


--
-- Name: bot_configs_id_seq; Type: SEQUENCE; Schema: public; Owner: tgnl_user
--

CREATE SEQUENCE public.bot_configs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bot_configs_id_seq OWNER TO tgnl_user;

--
-- Name: bot_configs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tgnl_user
--

ALTER SEQUENCE public.bot_configs_id_seq OWNED BY public.bot_configs.id;


--
-- Name: bots; Type: TABLE; Schema: public; Owner: tgnl_user
--

CREATE TABLE public.bots (
    id character varying(50) NOT NULL,
    name character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    token text NOT NULL,
    status character varying(20) DEFAULT 'offline'::character varying NOT NULL,
    calls integer DEFAULT 0 NOT NULL,
    last_active timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.bots OWNER TO tgnl_user;

--
-- Name: call_logs; Type: TABLE; Schema: public; Owner: tgnl_user
--

CREATE TABLE public.call_logs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    bot_id character varying(50) NOT NULL,
    energy_pool_id character varying(50),
    status character varying(20) NOT NULL,
    response_time integer,
    error_message text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.call_logs OWNER TO tgnl_user;

--
-- Name: client_logs; Type: TABLE; Schema: public; Owner: tgnl_user
--

CREATE TABLE public.client_logs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    api_username character varying(50),
    ip character varying(64) NOT NULL,
    user_agent text,
    endpoint character varying(128) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    bot_username character varying(255)
);


ALTER TABLE public.client_logs OWNER TO tgnl_user;

--
-- Name: downstream_pricing; Type: TABLE; Schema: public; Owner: tgnl_user
--

CREATE TABLE public.downstream_pricing (
    energy_pool_id character varying(50) NOT NULL,
    cost_1hour_trx numeric(10,4) DEFAULT 0 NOT NULL,
    cost_1day_trx numeric(10,4) DEFAULT 0 NOT NULL,
    cost_3day_trx numeric(10,4) DEFAULT 0 NOT NULL,
    cost_30day_trx numeric(10,4) DEFAULT 0 NOT NULL,
    cost_bishu_trx numeric(10,4) DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    auto_follow_upstream boolean DEFAULT false
);


ALTER TABLE public.downstream_pricing OWNER TO tgnl_user;

--
-- Name: energy_pools; Type: TABLE; Schema: public; Owner: tgnl_user
--

CREATE TABLE public.energy_pools (
    id character varying(50) NOT NULL,
    name character varying(255) NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    usage integer DEFAULT 0 NOT NULL,
    total integer DEFAULT 1000 NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    provider_type character varying(50) DEFAULT 'zhangpu'::character varying NOT NULL,
    provider_base_url text DEFAULT 'https://zhangpu.online'::text NOT NULL,
    provider_username character varying(255),
    provider_password character varying(255)
);


ALTER TABLE public.energy_pools OWNER TO tgnl_user;

--
-- Name: server_configs; Type: TABLE; Schema: public; Owner: tgnl_user
--

CREATE TABLE public.server_configs (
    ip character varying(64) NOT NULL,
    remark text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.server_configs OWNER TO tgnl_user;

--
-- Name: upstream_info; Type: TABLE; Schema: public; Owner: tgnl_user
--

CREATE TABLE public.upstream_info (
    id integer NOT NULL,
    energy_pool_id character varying(50) NOT NULL,
    balance_trx numeric(18,6) DEFAULT 0 NOT NULL,
    price_1hour_sun integer,
    price_1day_sun integer,
    price_3day_sun integer,
    price_30day_sun integer,
    price_bishu_trx numeric(10,2),
    cost_1hour_trx numeric(10,4),
    cost_1day_trx numeric(10,4),
    cost_3day_trx numeric(10,4),
    cost_30day_trx numeric(10,4),
    upstream_username character varying(255),
    last_consumption_time timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.upstream_info OWNER TO tgnl_user;

--
-- Name: upstream_info_id_seq; Type: SEQUENCE; Schema: public; Owner: tgnl_user
--

CREATE SEQUENCE public.upstream_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.upstream_info_id_seq OWNER TO tgnl_user;

--
-- Name: upstream_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tgnl_user
--

ALTER SEQUENCE public.upstream_info_id_seq OWNED BY public.upstream_info.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tgnl_user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO tgnl_user;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tgnl_user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO tgnl_user;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tgnl_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: bot_configs id; Type: DEFAULT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.bot_configs ALTER COLUMN id SET DEFAULT nextval('public.bot_configs_id_seq'::regclass);


--
-- Name: upstream_info id; Type: DEFAULT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.upstream_info ALTER COLUMN id SET DEFAULT nextval('public.upstream_info_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: api_consumption_orders; Type: TABLE DATA; Schema: public; Owner: tgnl_user
--

COPY public.api_consumption_orders (id, api_username, order_type, amount_trx, energy, day, receiver_address, status, error_message, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: api_recharge_orders; Type: TABLE DATA; Schema: public; Owner: tgnl_user
--

COPY public.api_recharge_orders (id, api_username, payment_address, amount_trx, status, tx_hash, created_at, expires_at, paid_at, telegram_chat_id, telegram_message_id, updated_at) FROM stdin;
\.


--
-- Data for Name: api_users; Type: TABLE DATA; Schema: public; Owner: tgnl_user
--

COPY public.api_users (id, username, password, status, created_at, updated_at, balance_micro) FROM stdin;
548202fd-40b9-4b73-9eac-c2ed23cf2ca0	api_e27ca5b3	pw_e60a0df0c4c4edd88a11b291	active	2026-02-06 14:36:22.657042+00	2026-02-06 21:45:40.10593+00	-650000
706ed101-416b-4f52-9075-2e2fd4e1b817	api_bdd75fc1	pw_b6b29570f7d0eccc4f4a7de2	active	2026-02-07 04:56:14.816342+00	2026-02-07 05:17:07.958412+00	2010000
a3895720-697a-480c-951c-850b706ee4d3	api_a0494353	pw_201f67cb7241492cb2112983	active	2026-02-07 05:17:34.708702+00	2026-02-07 05:18:21.120188+00	17950000
21f7a802-9723-464f-b0a5-828972c0e517	api_fdb377b6	pw_1697c614174c40b506258111	active	2026-02-07 05:18:54.022787+00	2026-02-07 05:19:11.306759+00	0
\.


--
-- Data for Name: bot_configs; Type: TABLE DATA; Schema: public; Owner: tgnl_user
--

COPY public.bot_configs (id, bot_username, api_username, config_content, created_at, updated_at, bot_notify_url) FROM stdin;
1	HFTGNLTRXbot	api_e27ca5b3	TOKEN=6439974855:AAHO8rhC5UGeZZC0h-dGyAr34XT-azGJRgU\nCUSTOMER_SERVICE_ID=https://t.me/HTTGID\nbot_id=https://t.me/HFTGNLTRXbot\ngroup_link=https://t.me/hgsbhb\ncontrol_address=TKYp9dbDs6kHKtFhFR6srEJvDARNYkq9Qe\nprivateKey=23333344444\nusername=api_e27ca5b3\npassword=pw_e60a0df0c4c4edd88a11b291\nad_time=940\nhuilv_zhekou=0.90\nadmin_id=825512163\nhour_price=2.7\nday_price=9.0\nthree_day_price=7.0\nyucun_price=10\nenergy_pool_api=http://host.docker.internal:3000\nbot_notify_url=http://localhost:8080/api/recharge-notify\nVersionidentifier=APP_VERSION\n\n# 主键盘菜单配置（JSON格式，9个按钮的布局，按行组织）\n# key 固定不变（用于代码逻辑），label 可修改（显示文案）\nmain_menu_buttons_json=[[{"key":"bishu","label":"📦 笔数套餐","chain_id":1}],[{"key":"yucun","label":"💰 预存扣费","chain_id":2},{"key":"usdt2trx","label":"✅ USDT转TRX","chain_id":3}],[{"key":"check_tx","label":"🔍 查交易","chain_id":4},{"key":"trx2energy","label":"⚡ TRX转能量","chain_id":5}],[{"key":"monitored_addresses","label":"📍 已监听地址","chain_id":6},{"key":"toggle_monitor","label":"🔔 开始/结束监听","chain_id":7}],[{"key":"recharge","label":"💳 我要充值","chain_id":8},{"key":"profile","label":"👤 个人中心","chain_id":9}]]	2026-01-06 20:38:12.105051+00	2026-02-06 19:23:44.760798+00	http://localhost:8080/api/recharge-notify
39	TGoolgebot	api_c110325c	TOKEN=6439974855:AAHO8rhC5UGeZZC0h-dGyAr34XT-azGJRgU\nCUSTOMER_SERVICE_ID=https://t.me/HTTGID\nbot_id=https://t.me/HFTGNLTRXbot\ngroup_link=https://t.me/hgsbhb\ncontrol_address=TKYp9dbDs6kHKtFhFR6srEJvDARNYkq9Qe\nprivateKey=23333344444\nusername=api_c110325c\npassword=pw_5d30740c5ed5f3914206dd64\nad_time=940\nhuilv_zhekou=0.90\nadmin_id=825512163\nhour_price=2.7\nday_price=9.0\nthree_day_price=7.0\nyucun_price=10\nenergy_pool_api=http://host.docker.internal:3000\nVersionidentifier=APP_VERSION	2026-02-03 14:10:27.522289+00	2026-02-03 14:10:27.522289+00	http://localhost:8080/api/recharge-notify
\.


--
-- Data for Name: bots; Type: TABLE DATA; Schema: public; Owner: tgnl_user
--

COPY public.bots (id, name, username, token, status, calls, last_active, created_at, updated_at) FROM stdin;
BOT001	客服机器人	@service_bot	dummy_token_1	online	1234	2026-01-02 18:13:57.666645+00	2026-01-02 18:13:57.666645+00	2026-01-02 18:13:57.666645+00
BOT002	通知机器人	@notify_bot	dummy_token_2	online	567	2026-01-02 18:13:57.666645+00	2026-01-02 18:13:57.666645+00	2026-01-02 18:13:57.666645+00
BOT003	工具机器人	@tool_bot	dummy_token_3	offline	89	2026-01-02 17:13:57.666645+00	2026-01-02 18:13:57.666645+00	2026-01-02 18:13:57.666645+00
\.


--
-- Data for Name: call_logs; Type: TABLE DATA; Schema: public; Owner: tgnl_user
--

COPY public.call_logs (id, bot_id, energy_pool_id, status, response_time, error_message, created_at) FROM stdin;
\.


--
-- Data for Name: client_logs; Type: TABLE DATA; Schema: public; Owner: tgnl_user
--

COPY public.client_logs (id, api_username, ip, user_agent, endpoint, created_at, bot_username) FROM stdin;
be0628ba-96c5-4f4e-8c62-5a7ddb6cd1bf	api_e27ca5b3	127.0.0.1	python-requests/2.32.5	/v1/get_api_user_info	2026-02-06 14:36:24.917993+00	HFTGNLTRXbot
9c775423-b741-4435-895a-e3ba9c8abe58	api_e27ca5b3	127.0.0.1	python-requests/2.32.5	/v1/get_api_user_info	2026-02-06 16:15:47.232092+00	HFTGNLTRXbot
87a326a4-21c4-4f49-b03d-58f1e9d566ae	api_e27ca5b3	127.0.0.1	python-requests/2.32.5	/v1/get_api_user_info	2026-02-06 19:23:44.140944+00	HFTGNLTRXbot
47c7ced8-d64b-415f-9abb-09e6dad6fff5	api_e27ca5b3	127.0.0.1	python-requests/2.32.5	/v1/delegate_tran	2026-02-06 20:38:00.627067+00	TGoolgebot
4bd30d78-a129-4533-ad49-0ec326b15580	api_e27ca5b3	127.0.0.1	python-requests/2.32.5	/v1/delegate_tran	2026-02-06 20:57:16.837891+00	TGoolgebot
17e62562-eeca-4489-a59e-1412cd0ed958	api_e27ca5b3	127.0.0.1	curl/8.7.1	/v1/delegate_meal	2026-02-06 21:01:24.300228+00	\N
cebff9fc-b290-4dec-987c-b8103916511b	api_e27ca5b3	127.0.0.1	curl/8.7.1	/v1/delegate_meal	2026-02-06 21:01:42.818387+00	\N
9e2dabf8-7602-43c7-b1da-1611b368dfab	api_e27ca5b3	127.0.0.1	curl/8.7.1	/v1/delegate_meal	2026-02-06 21:02:32.478361+00	test
8b464c32-cd74-40fd-824e-df728e4463bd	api_e27ca5b3	127.0.0.1	python-requests/2.32.5	/v1/delegate_tran	2026-02-06 21:05:25.648834+00	HFTGNLTRXbot
af08801b-c6b6-4a84-8d37-dc5774ecad59	api_e27ca5b3	127.0.0.1	python-requests/2.32.5	/v1/delegate_tran	2026-02-06 21:07:37.780095+00	HFTGNLTRXbot
3a8348a3-4055-4796-9c44-3b95edad2c91	api_e27ca5b3	127.0.0.1	curl/8.7.1	/v1/delegate_meal	2026-02-06 21:10:45.423765+00	test
2bc4287c-0059-4ae9-ad85-c765db2913e5	api_e27ca5b3	127.0.0.1	python-requests/2.32.5	/v1/delegate_tran	2026-02-06 21:13:17.808714+00	HFTGNLTRXbot
0d824413-8b9d-4606-a6ee-8f2c748b8543	api_e27ca5b3	127.0.0.1	python-requests/2.32.5	/v1/delegate_tran	2026-02-06 21:24:16.574478+00	HFTGNLTRXbot
47dac12d-a8d5-4303-9449-32c3c1379377	api_e27ca5b3	127.0.0.1	python-requests/2.32.5	/v1/delegate_tran	2026-02-06 21:39:35.935375+00	HFTGNLTRXbot
2d3f7582-34aa-4be5-ac8c-6f4840e9e189	api_e27ca5b3	127.0.0.1	python-requests/2.32.5	/v1/delegate_tran	2026-02-06 21:45:38.767925+00	TGoolgebot
b59e2313-41e6-4afd-b4b1-47b7607b9fc5	api_e27ca5b3	127.0.0.1	python-requests/2.32.5	/v1/get_api_user_info	2026-02-06 21:45:40.637517+00	\N
68728f5b-523b-4a27-a042-7b8533e733a0	api_e27ca5b3	192.168.65.1	python-requests/2.32.5	/v1/delegate_tran	2026-02-07 05:14:37.163169+00	HFTGNLTRXbot
\.


--
-- Data for Name: downstream_pricing; Type: TABLE DATA; Schema: public; Owner: tgnl_user
--

COPY public.downstream_pricing (energy_pool_id, cost_1hour_trx, cost_1day_trx, cost_3day_trx, cost_30day_trx, cost_bishu_trx, created_at, updated_at, auto_follow_upstream) FROM stdin;
EP001	2.1500	6.7000	5.4000	5.4000	2.6700	2026-01-07 18:44:47.947035	2026-02-07 05:19:35.165975	t
\.


--
-- Data for Name: energy_pools; Type: TABLE DATA; Schema: public; Owner: tgnl_user
--

COPY public.energy_pools (id, name, status, usage, total, created_at, updated_at, provider_type, provider_base_url, provider_username, provider_password) FROM stdin;
EP002	能量池 #2	active	420	1000	2026-01-02 18:13:57.66619+00	2026-01-02 18:13:57.66619+00	zhangpu	https://zhangpu.online	\N	\N
EP003	能量池 #3	inactive	0	1000	2026-01-02 18:13:57.66619+00	2026-01-02 18:13:57.66619+00	zhangpu	https://zhangpu.online	\N	\N
EP004	能量池 #4	active	880	1000	2026-01-02 18:13:57.66619+00	2026-01-02 18:13:57.66619+00	zhangpu	https://zhangpu.online	\N	\N
EP001	能量池 #1	active	650	1000	2026-01-02 18:13:57.66619+00	2026-02-06 21:12:02.95876+00	zhangpu	https://zhangpu.online	hf2333	hfgsjbsja
\.


--
-- Data for Name: server_configs; Type: TABLE DATA; Schema: public; Owner: tgnl_user
--

COPY public.server_configs (ip, remark, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: upstream_info; Type: TABLE DATA; Schema: public; Owner: tgnl_user
--

COPY public.upstream_info (id, energy_pool_id, balance_trx, price_1hour_sun, price_1day_sun, price_3day_sun, price_30day_sun, price_bishu_trx, cost_1hour_trx, cost_1day_trx, cost_3day_trx, cost_30day_trx, upstream_username, last_consumption_time, created_at, updated_at) FROM stdin;
1	EP001	47.350000	30	100	80	80	2.57	2.0500	6.6000	5.3000	5.3000	hf2333	2026-02-07 05:45:40+00	2026-01-07 18:34:54.284332+00	2026-02-07 05:19:35.161897+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tgnl_user
--

COPY public.users (id, username, password, created_at, updated_at) FROM stdin;
1	admin	Apple11.15	2026-01-02 19:34:42.484432+00	2026-01-02 19:34:42.484432+00
\.


--
-- Name: bot_configs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tgnl_user
--

SELECT pg_catalog.setval('public.bot_configs_id_seq', 44, true);


--
-- Name: upstream_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tgnl_user
--

SELECT pg_catalog.setval('public.upstream_info_id_seq', 112, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tgnl_user
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: api_consumption_orders api_consumption_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.api_consumption_orders
    ADD CONSTRAINT api_consumption_orders_pkey PRIMARY KEY (id);


--
-- Name: api_recharge_orders api_recharge_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.api_recharge_orders
    ADD CONSTRAINT api_recharge_orders_pkey PRIMARY KEY (id);


--
-- Name: api_users api_users_pkey; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.api_users
    ADD CONSTRAINT api_users_pkey PRIMARY KEY (id);


--
-- Name: api_users api_users_username_key; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.api_users
    ADD CONSTRAINT api_users_username_key UNIQUE (username);


--
-- Name: bot_configs bot_configs_bot_username_key; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.bot_configs
    ADD CONSTRAINT bot_configs_bot_username_key UNIQUE (bot_username);


--
-- Name: bot_configs bot_configs_pkey; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.bot_configs
    ADD CONSTRAINT bot_configs_pkey PRIMARY KEY (id);


--
-- Name: bots bots_pkey; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.bots
    ADD CONSTRAINT bots_pkey PRIMARY KEY (id);


--
-- Name: call_logs call_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.call_logs
    ADD CONSTRAINT call_logs_pkey PRIMARY KEY (id);


--
-- Name: client_logs client_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.client_logs
    ADD CONSTRAINT client_logs_pkey PRIMARY KEY (id);


--
-- Name: downstream_pricing downstream_pricing_pkey; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.downstream_pricing
    ADD CONSTRAINT downstream_pricing_pkey PRIMARY KEY (energy_pool_id);


--
-- Name: energy_pools energy_pools_pkey; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.energy_pools
    ADD CONSTRAINT energy_pools_pkey PRIMARY KEY (id);


--
-- Name: server_configs server_configs_pkey; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.server_configs
    ADD CONSTRAINT server_configs_pkey PRIMARY KEY (ip);


--
-- Name: upstream_info upstream_info_energy_pool_id_key; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.upstream_info
    ADD CONSTRAINT upstream_info_energy_pool_id_key UNIQUE (energy_pool_id);


--
-- Name: upstream_info upstream_info_pkey; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.upstream_info
    ADD CONSTRAINT upstream_info_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_api_consumption_orders_api_username; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_api_consumption_orders_api_username ON public.api_consumption_orders USING btree (api_username);


--
-- Name: idx_api_consumption_orders_created_at; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_api_consumption_orders_created_at ON public.api_consumption_orders USING btree (created_at DESC);


--
-- Name: idx_api_consumption_orders_order_type; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_api_consumption_orders_order_type ON public.api_consumption_orders USING btree (order_type);


--
-- Name: idx_api_consumption_orders_status; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_api_consumption_orders_status ON public.api_consumption_orders USING btree (status);


--
-- Name: idx_api_recharge_orders_api_username; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_api_recharge_orders_api_username ON public.api_recharge_orders USING btree (api_username);


--
-- Name: idx_api_recharge_orders_created_at; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_api_recharge_orders_created_at ON public.api_recharge_orders USING btree (created_at);


--
-- Name: idx_api_recharge_orders_payment_address; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_api_recharge_orders_payment_address ON public.api_recharge_orders USING btree (payment_address);


--
-- Name: idx_api_recharge_orders_status; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_api_recharge_orders_status ON public.api_recharge_orders USING btree (status);


--
-- Name: idx_api_recharge_orders_tx_hash; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_api_recharge_orders_tx_hash ON public.api_recharge_orders USING btree (tx_hash);


--
-- Name: idx_api_users_balance; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_api_users_balance ON public.api_users USING btree (balance_micro);


--
-- Name: idx_api_users_status; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_api_users_status ON public.api_users USING btree (status);


--
-- Name: idx_api_users_username; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_api_users_username ON public.api_users USING btree (username);


--
-- Name: idx_bot_configs_api_username; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_bot_configs_api_username ON public.bot_configs USING btree (api_username);


--
-- Name: idx_bot_configs_bot_notify_url; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_bot_configs_bot_notify_url ON public.bot_configs USING btree (bot_notify_url);


--
-- Name: idx_bot_configs_bot_username; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_bot_configs_bot_username ON public.bot_configs USING btree (bot_username);


--
-- Name: idx_bots_status; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_bots_status ON public.bots USING btree (status);


--
-- Name: idx_call_logs_bot_id; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_call_logs_bot_id ON public.call_logs USING btree (bot_id);


--
-- Name: idx_call_logs_created_at; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_call_logs_created_at ON public.call_logs USING btree (created_at);


--
-- Name: idx_client_logs_api_username; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_client_logs_api_username ON public.client_logs USING btree (api_username);


--
-- Name: idx_client_logs_bot_username; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_client_logs_bot_username ON public.client_logs USING btree (bot_username);


--
-- Name: idx_client_logs_created_at; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_client_logs_created_at ON public.client_logs USING btree (created_at);


--
-- Name: idx_client_logs_ip; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_client_logs_ip ON public.client_logs USING btree (ip);


--
-- Name: idx_energy_pools_provider_type; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_energy_pools_provider_type ON public.energy_pools USING btree (provider_type);


--
-- Name: idx_energy_pools_status; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_energy_pools_status ON public.energy_pools USING btree (status);


--
-- Name: idx_upstream_info_energy_pool_id; Type: INDEX; Schema: public; Owner: tgnl_user
--

CREATE INDEX idx_upstream_info_energy_pool_id ON public.upstream_info USING btree (energy_pool_id);


--
-- Name: call_logs call_logs_bot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.call_logs
    ADD CONSTRAINT call_logs_bot_id_fkey FOREIGN KEY (bot_id) REFERENCES public.bots(id);


--
-- Name: call_logs call_logs_energy_pool_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.call_logs
    ADD CONSTRAINT call_logs_energy_pool_id_fkey FOREIGN KEY (energy_pool_id) REFERENCES public.energy_pools(id);


--
-- Name: upstream_info upstream_info_energy_pool_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tgnl_user
--

ALTER TABLE ONLY public.upstream_info
    ADD CONSTRAINT upstream_info_energy_pool_id_fkey FOREIGN KEY (energy_pool_id) REFERENCES public.energy_pools(id);


--
-- PostgreSQL database dump complete
--

\unrestrict NevUaBoT8cUQfc9gCVSP41eibdveh56K5esvRa8NDCV5Da9knEnr8uwaUHrp7AO

