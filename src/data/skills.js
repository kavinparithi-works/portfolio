/**
 * Technical skills, grouped as on the resume PDF and extended with the
 * Phase 3 platform stack. `core` marks the tools used on every engagement.
 */
export const skillGroups = [
  {
    label: 'Cloud platforms',
    items: ['Microsoft Azure', 'Databricks', 'Unity Catalog', 'Azure Data Lake Storage', 'Azure Key Vault', 'SAP Datasphere', 'Databricks Volumes'],
    core: ['Microsoft Azure', 'Databricks', 'Unity Catalog'],
  },
  {
    label: 'Programming',
    items: ['Python', 'PySpark', 'SQL', 'Spark SQL', 'PowerShell'],
    core: ['PySpark', 'SQL'],
  },
  {
    label: 'Big data & streaming',
    items: ['Apache Spark', 'Delta Lake', 'Delta Live Tables', 'CDC ingestion', 'Structured Streaming', 'Batch Processing', 'Spark Optimization'],
    core: ['Delta Lake', 'Delta Live Tables'],
  },
  {
    label: 'Data engineering',
    items: ['Lakehouse Design', 'Data Warehousing', 'Medallion Architecture', 'Data Modeling', 'Schema Enforcement', 'Incremental Processing', 'Shared utility libraries'],
    core: ['Medallion Architecture'],
  },
  {
    label: 'Data quality',
    items: ['Data Quality Pipelines', 'Data Governance', 'Row-Level SQL Alerts', 'Data Observability', 'Data Validation', 'Reconciliation', 'Logic diff & AST checks'],
    core: ['Row-Level SQL Alerts'],
  },
  {
    label: 'ETL & migration',
    items: ['ETL / ELT Pipelines', 'SSIS', 'SSRS', 'SSMS', 'JAMS', 'SAP ECC', 'Firestore', 'Elasticsearch', 'Legacy Modernization'],
    core: [],
  },
  {
    label: 'DevOps & delivery',
    items: ['Databricks Asset Bundles', 'Databricks CLI', 'Azure DevOps Pipelines', 'CI/CD', 'Git', 'Terraform', 'Multi-Environment Deployment', 'Teams webhook alerting'],
    core: ['Databricks Asset Bundles', 'CI/CD'],
  },
  {
    label: 'Analytics & AI/BI',
    items: ['Power BI', 'Power BI REST API', 'Genie spaces', 'AI/BI dashboards', 'Agent skills for codebases'],
    core: ['Genie spaces'],
  },
  {
    label: 'Data formats',
    items: ['JSON', 'Parquet', 'Delta', 'CSV', 'Semi-Structured Data', 'Unstructured Data'],
    core: [],
  },
]

/** Working style, from the resume summary and the way the Phase 3 work was run. */
export const workingStyle = [
  'Design first, then develop. I sketch the architecture before I write the pipeline.',
  'I use AI tools day to day to move faster, without skipping the fundamentals.',
  'Validation, reconciliation and alerts are part of the pipeline, not a follow-up ticket.',
  'I write the docs too: DAB guides, release checklists, DQ decision matrices, PR templates.',
]
