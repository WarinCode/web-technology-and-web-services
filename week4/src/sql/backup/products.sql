--
-- PostgreSQL database dump
--

\restrict B1LrEjzEV1pM2xTDwUS0wnfAxUDKcbdzfQQtxwqT1TvyCHjsOfeVwgncYhhfwpf

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-12-19 09:04:37

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    "pdId" character varying(50) NOT NULL,
    "pdName" character varying(100),
    "pdPrice" real,
    "pdRemarks" text,
    "pdTypeld" character varying,
    brandid character varying
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 4902 (class 0 OID 16389)
-- Dependencies: 219
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4754 (class 2606 OID 16396)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("pdId");


-- Completed on 2025-12-19 09:04:38

--
-- PostgreSQL database dump complete
--

\unrestrict B1LrEjzEV1pM2xTDwUS0wnfAxUDKcbdzfQQtxwqT1TvyCHjsOfeVwgncYhhfwpf

