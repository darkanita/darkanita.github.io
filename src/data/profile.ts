// Credenciales, charlas y catálogo de repos. Son datos, no diseño: edítalos libremente.

export type Credential = { text: string; link?: { label: string; href: string } };

export const credentials: Credential[] = [
  { text: 'Líder de la comunidad', link: { label: 'DB Crew LATAM', href: 'https://dbcrewlatam.com/' } },
  { text: 'MLflow Ambassador y Databricks Student Fellow' },
  { text: 'Databricks Certified Machine Learning Professional' },
];

export type Talk = { year: number; event: string; title: string; repo?: string };

// TODO: revisa los títulos; salen de los README de cada repo.
export const talks: Talk[] = [
  {
    year: 2026,
    event: 'Microsoft',
    title: 'Smarter Together: orquestando sistemas multiagente con A2A y MCP en contenedores',
  },
  {
    year: 2026,
    event: 'PyCon Colombia',
    title: 'Taller de GenAIOps',
    repo: 'https://github.com/databrickscrewlatam/GenAIOps_Pycon2026',
  },
  {
    year: 2025,
    event: 'KubeCon',
    title: 'Sistema multiagente en AKS con Semantic Kernel, A2A y MCP',
    repo: 'https://github.com/darkanita/MultiAgent-kubecon2025',
  },
  {
    year: 2024,
    event: 'PyCon Colombia',
    title: 'Taller de LLMOps',
    repo: 'https://github.com/darkanita/LLMOps_wsPycon2024',
  },
  {
    year: 2023,
    event: 'PyCon Colombia',
    title: 'Taller de MLOps con GitHub Actions y Weights & Biases',
    repo: 'https://github.com/darkanita/MLOps_wsPycon2023',
  },
];

// Catálogo de repos: qué aprende quien lo abre. El orden de los temas es una ruta de aprendizaje.
// Las estrellas se completan solas con la API de GitHub al compilar.
export type RepoEntry = { name: string; teaches: string; owner?: string; featured?: boolean };
export type Topic = { topic: string; repos: RepoEntry[] };

export const catalog: Topic[] = [
  {
    topic: 'Datos',
    repos: [
      { name: 'taller-webscraping-python', teaches: 'Extraer noticias de BBC Mundo con Beautiful Soup y con Selenium, y cuándo usar cada uno.' },
      { name: 'apache-airflow-workshop', teaches: 'Los conceptos de Airflow (DAGs, tareas, operadores, arquitectura) en una presentación interactiva.' },
      { name: 'airflow-etl-dashboard', teaches: 'Un ETL completo con Airflow y Docker que carga datos en SQLite y los muestra en Streamlit.' },
      { name: 'bbc-news-etl-pipeline', teaches: 'Un pipeline que guarda noticias en PostgreSQL en Azure y se ejecuta cada hora con GitHub Actions.' },
    ],
  },
  {
    topic: 'MLOps',
    repos: [
      { name: 'mlops-zero-to-hero', teaches: 'Curso de 20 horas: el ciclo de vida de ML con MLflow, de la experimentación al despliegue.', featured: true },
      { name: 'MLOps_wsPycon2023', teaches: 'Taller de PyCon 2023: pipelines de ML orquestados con GitHub Actions y Weights & Biases.' },
      { name: 'mlops-databricks-github-actions', teaches: 'MLOps solo con herramientas gratuitas: entrenamiento, registro de modelos y CI/CD con Databricks.' },
      { name: 'bakehouse-mlops', teaches: 'Pronóstico de ventas en Databricks Free Edition con feature table, Unity Catalog y CI/CD.' },
    ],
  },
  {
    topic: 'GenAIOps y RAG',
    repos: [
      { name: 'GenAIOps_Pycon2025', teaches: 'Construir, evaluar y automatizar un chatbot RAG sobre PDFs, con un recorrido guiado de 60 a 90 minutos.', featured: true },
      { name: 'GenAIOps_Databricks', teaches: 'Un pipeline RAG en Databricks con LangChain y FAISS, registrado completo en MLflow.' },
      { name: 'bakehouse-genaiops', teaches: 'Un asistente sobre manuales PDF con jueces de MLflow 3 y una puerta de calidad en CI/CD.' },
      { name: 'rag-chatbot-foundry-sk', teaches: 'Un chatbot RAG con Azure AI Foundry, Azure AI Search y Semantic Kernel.' },
      { name: 'genaiops-evaluation-lab', teaches: 'Evaluar calidad, seguridad y agentes en Azure AI Foundry.' },
      { name: 'azure-ai-foundry-observability-demo', teaches: 'Trazas con OpenTelemetry, monitoreo y evaluación continua de agentes en Foundry.' },
    ],
  },
  {
    topic: 'Agentes',
    repos: [
      { name: 'ai-agent-databricks', teaches: 'Un agente con LangGraph, herramientas de Unity Catalog, RAG, evaluación y MCP, en Databricks Free Edition.', featured: true },
      { name: 'ia-para-desarrolladores', teaches: 'Curso de 20 horas con GitHub Copilot y Claude Code: instrucciones, skills, agentes y hooks para un equipo.' },
      { name: 'MultiAgent-kubecon2025', teaches: 'Demo de KubeCon 2025: un asistente de viajes multiagente con Semantic Kernel, A2A y MCP sobre AKS.' },
      { name: 'MultiAgent-AKS-MAF', teaches: 'Orquestación multiagente con Microsoft Agent Framework, A2A y MCP en Kubernetes.' },
    ],
  },
  {
    topic: 'Certificaciones',
    repos: [
      { name: 'AI-102-Azure-AI-Engineer', teaches: 'Preparación para la AI-102 en 6 sesiones, con laboratorios en Codespaces.' },
    ],
  },
];
