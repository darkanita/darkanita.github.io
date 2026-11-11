// Credenciales, charlas, cursos y servicios. Son datos, no diseño: edítalos libremente.

export type Credential = { title: string; org: string; detail: string; href?: string };

export const credentials: Credential[] = [
  {
    title: 'Líder de comunidad',
    org: 'DB Crew LATAM',
    detail: 'Comunidad abierta de datos e IA en Latinoamérica: grupos de estudio, talleres y meetups.',
    href: 'https://dbcrewlatam.com/',
  },
  {
    title: 'MLflow Ambassador',
    org: 'MLflow',
    detail: 'Divulgo MLOps y GenAIOps con MLflow en español.',
  },
  {
    title: 'Databricks Student Fellow',
    org: 'Databricks',
    detail: 'Acompaño a estudiantes que aprenden datos e IA sobre Databricks.',
  },
  {
    title: 'Databricks Certified Machine Learning Professional',
    org: 'Databricks',
    detail: 'Certificación profesional de ML, aprobada en noviembre de 2026.',
  },
];

export type Talk = { year: number; event: string; title: string; repo?: string };

// TODO: revisa los títulos; están inferidos de los repos de cada charla.
export const talks: Talk[] = [
  {
    year: 2026,
    event: 'Microsoft',
    title: 'Smarter Together: orchestrating multi-agent AI systems with A2A and MCP on containers',
  },
  {
    year: 2026,
    event: 'PyCon Colombia',
    title: 'Taller de GenAIOps con Databricks y MLflow',
    repo: 'https://github.com/databrickscrewlatam/GenAIOps_Pycon2026',
  },
  {
    year: 2025,
    event: 'KubeCon',
    title: 'Sistemas multiagente sobre Kubernetes',
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
    title: 'Taller de MLOps',
    repo: 'https://github.com/darkanita/MLOps_wsPycon2023',
  },
];

export type Course = { name: string; summary: string; length: string };

export const courses: Course[] = [
  {
    name: 'Agentes Zero to Hero',
    summary: 'De cero a agentes de IA en producción, solo con herramientas gratuitas.',
    length: '10 sesiones',
  },
  {
    name: 'Machine Learning e IA',
    summary: 'De la regresión a redes neuronales, visión por computador y automatización.',
    length: '11 sesiones',
  },
  {
    name: 'MLOps en Databricks',
    summary: 'Spark, Delta Lake, MLflow, AutoML y Feature Store con CI/CD en GitHub.',
    length: '5 sesiones',
  },
];

export type Service = { name: string; detail: string };

export const services: Service[] = [
  { name: 'Charlas y keynotes', detail: 'MLOps, GenAIOps, agentes y comunidades de datos.' },
  { name: 'Talleres para equipos', detail: 'Prácticos, con repos listos para usar después.' },
  { name: 'Mentorías', detail: 'Rutas de aprendizaje y certificaciones Databricks y Azure.' },
  { name: 'Patrocinios y colaboraciones', detail: 'Contenido técnico en español para YouTube, Instagram y TikTok.' },
];

// Repos que siempre aparecen, aunque no estén entre los más estrellados.
// El sitio completa estrellas y descripción con la API de GitHub al compilar.
export const featuredRepos = [
  'GenAIOps_Pycon2025',
  'MLOps_wsPycon2023',
  'LLMOps_wsPycon2024',
  'ai-agent-databricks',
  'bakehouse-mlops',
  'bakehouse-genaiops',
  'MultiAgent-AKS-MAF',
  'mlops-zero-to-hero',
  'GenAIOps_Databricks',
];
