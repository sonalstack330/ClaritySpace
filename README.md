# ClaritySpace

> Think it through, then decide.

ClaritySpace is a full-stack web app that helps people work through difficult
choices instead of overthinking them. It gives users a structured workspace to
compare options, map out possible paths, record their assumptions, and later
look back at how a decision actually turned out.

The goal is not to make the decision for the user. It is to make their thinking
clearer and easier to revisit.

## Features

- **Weighted scoring matrix:** rate options against criteria such as cost,
  time, learning, and risk, set an importance weight for each criterion, and
  see a live 0-100 score for every option.
- **Decision tree builder:** an interactive SVG canvas where you add, drag,
  connect, and delete nodes to map out possible paths and outcomes.
- **Assumptions and risks log:** write down what you are assuming and what
  could go wrong, with a risk level for each item.
- **Outcome reviews:** return to a past decision, record what actually
  happened, and see what worked.
- **Dashboard and insights:** active and completed decisions, upcoming
  revisit dates, and metrics computed from your own data, such as how long you
  usually take to decide.
- **AI assistance (optional):** Gemini suggests criteria you may have missed,
  runs a pre-mortem on your chosen option, and summarises a past decision into
  a short lesson. All core features work without it.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React, CSS, SVG |
| Backend | Java, Spring Boot, Spring Data JPA, Spring Security (JWT) |
| Database | PostgreSQL |
| AI | Google Gemini API (called from the backend only) |
| Testing | JUnit |

## How scoring works

Each option's score is the sum of (rating x weight) across all criteria,
normalised to 0-100 against the maximum possible score. The calculation is a
single pure function with unit tests, and scores are computed on the fly so
changing a weight never leaves stale data.

## Architecture

The backend follows a Controller-Service-Repository structure with DTOs and
centralised exception handling. The decision tree is stored as nodes and edges
in PostgreSQL. The AI calls go through a dedicated service on the server, so
the API key is never exposed to the browser.

## Status

In development. See the roadmap below.

## Roadmap

- [ ] Scoring engine with unit tests
- [ ] Scoring matrix UI
- [ ] Decision tree builder
- [ ] REST API and PostgreSQL persistence
- [ ] Authentication
- [ ] Outcome reviews and dashboard insights
- [ ] Gemini-powered suggestions
- [ ] Deployment and screenshots