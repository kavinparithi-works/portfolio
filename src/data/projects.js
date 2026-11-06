/**
 * "Projects Shipped" case studies, newest first. The chemical manufacturing
 * studies (phases 1 to 3) follow the engagement summary; the finance and
 * insurance studies carry over from v1 of the portfolio, with roles, outcomes
 * and numbers from the resume PDF.
 * The client behind the chemical manufacturing work is intentionally unnamed.
 *
 * Fields:
 *   short     label for the compact project tabs
 *   summaryShort  overview on every screen; summary appears in the full study
 *   pipeline  ordered stages for the architecture diagram (adjacent stages
 *             are connected automatically)
 *   more      optional one-line extras shown under "Also in this phase"
 *   moreLabel optional heading for the extras (defaults to "Also in this phase")
 *   related   optional pointer to another case study (rendered as a link)
 */
export const projects = [
  {
    id: 'platform-phase-3',
    index: '01',
    sector: 'Chemical Manufacturing · Phase 3',
    short: 'Platform, phase 3',
    title: 'Lakehouse Platform to AI-Powered Analytics',
    role: 'Data Platform Engineer, staff augmentation',
    duration: 'Aug 2026 to Aug 2027 · in progress',
    icon: 'layers',
    summary:
      "Phase 3 of the same chemical manufacturing platform, working inside the client's enterprise data and analytics team. The shift is from building to multiplying: AI-powered analytics on the lakehouse, enabling the client's own engineers and their other vendors to work to the platform's patterns, and continuous modernisation of the runtime, notebook utilities, CI/CD gates and alerting.",
    summaryShort:
      "Leading the Genie and Supervisor Agent implementation, enabling the client's engineers and vendors, and driving platform modernisation.",
    story: {
      problem:
        "With the lakehouse and report portfolio in place, the constraints moved to people and reach. Business users wanted answers without waiting on a report, the client's engineers and other vendors needed to build to the same patterns, permissions model and release process, and the platform needed a documented path from its current state to the target architecture.",
      approach:
        'Packaged Databricks Genie spaces for sales and operations planning (forecast accuracy, daily total orders, on-time-in-full delivery, slow-moving and obsolete inventory, quality notifications, non-optimal freight, product review) as Asset Bundles with environment-independent payloads and a dedicated deploy path through the existing Azure DevOps pipelines. Added a Supervisor Agent that routes business questions to the right space and answers in a consistent, auditable format.',
      result:
        "Business questions route to the right Genie space and come back in a consistent, auditable format. New work from the client's engineers and vendors stays aligned with the platform. The platform runs Databricks Runtime 18, notebooks are migrating to the new utility standard, CI/CD has production permission checks and a QA gate, alerts are standardised, and a prioritised gap register drives remediation.",
    },
    outcomes: [
      { value: '7', label: 'S&OP use cases in Genie spaces' },
      { value: '1', label: 'Supervisor Agent across all spaces' },
      { value: 'DBR 18', label: 'runtime upgrade, platform-wide' },
      { value: '2', label: 'hardened CI/CD gates' },
    ],
    more: [
      {
        label: 'Staff augmentation and knowledge transfer',
        text: "Day to day with the client's data engineers and their other vendors: architecture walkthroughs, code reviews, deployment runbooks and written reference material so new work stays aligned with the platform's patterns, permissions model and release process.",
      },
      {
        label: 'Modernisation',
        text: 'Runtime upgrade to Databricks Runtime 18, migration of notebooks to the new utility standard, hardened CI/CD gates (production permission checks, QA gate), alert standardisation, and a documented architecture gap register with a prioritised remediation plan.',
      },
      {
        label: 'Architecture communication',
        text: 'The platform architecture, assurance and gap-register presentations used with client leadership.',
      },
    ],
    tags: ['Genie', 'Agent Bricks', 'Databricks Asset Bundles', 'Azure DevOps', 'Unity Catalog', 'Delta Live Tables', 'Lakeflow Jobs', 'Databricks Runtime 18', 'PySpark', 'Power BI'],
    pipeline: [
      { label: 'Sources', nodes: ['SAP ECC via Datasphere CDC', '12 other systems'] },
      { label: 'Lakehouse', nodes: ['Delta Live Tables', 'Unity Catalog', 'Gold and Platinum'] },
      { label: 'AI layer', nodes: ['Genie spaces', 'Supervisor Agent'] },
      { label: 'Delivered', nodes: ['Auditable answers', 'Power BI reports', 'Enabled client team'] },
    ],
    related: { id: 'sap-lakehouse', label: 'Phases 1 & 2' },
  },
  {
    id: 'sap-lakehouse',
    index: '02',
    sector: 'Chemical Manufacturing · Phases 1 & 2',
    short: 'SAP Lakehouse',
    title: 'SAP ECC to Lakehouse Platform and Report Portfolio',
    role: 'Data Engineer',
    duration: 'Phase 1: 4 months · Phase 2: 5 months',
    icon: 'flask',
    summary:
      "Phases 1 and 2 of a chemical manufacturer's lakehouse on Azure Databricks. Phase 1 laid the foundation: the medallion architecture, SAP ECC change data capture through Datasphere into Delta Live Tables, Arkieva snapshots, a cross-layer data-quality framework and the first end-to-end report. Phase 2 scaled it from one report to a portfolio across operations, finance, procurement and sales and distribution, and standardised how every notebook is written.",
    summaryShort:
      'Architected and built a medallion lakehouse on Azure Databricks from SAP ECC and 12 further sources, then scaled it from one report to a portfolio.',
    story: {
      problem:
        "A chemical manufacturer's operational data sat in SAP ECC, the Arkieva planning system and a dozen other sources, and its existing Power BI reports needed a governed platform to move onto. The business needed one lakehouse where around 250 SAP tables arrive by change data capture, quality is proven at every layer, and reports are built and released the same way across Dev, QA and Prod.",
      approach:
        'Defined the medallion design (raw landing in Unity Catalog Volumes, append-only Bronze, typed Silver, conformed Gold, report-shaped Platinum) with one catalog per layer per environment, service-principal identities, Key Vault secrets and Asset Bundles as the single deployment unit. Built SAP change data capture from Datasphere into Bronze with Auto Loader and into Silver with DLT apply_changes on 30-minute, 4-hour and 12-hour tiers, then delivered and migrated reports across operations, finance, procurement and sales and distribution on one shared utilities, logging and metadata standard.',
      result:
        'Around 250 SAP tables and 12 further sources land on tiered schedules, so the business pays for freshness only where it needs it. Every Gold and Platinum table is quality-checked on every run, shared dimensions are built once a day and reused by every report, and Power BI reads pre-joined Platinum tables, cutting dataset refresh time and compute cost.',
    },
    outcomes: [
      { value: '~250', label: 'SAP tables via CDC' },
      { value: '13', label: 'source systems' },
      { value: '4', label: 'business areas reported' },
      { value: '30 min', label: 'fastest SAP refresh tier' },
    ],
    moreLabel: 'Also in these phases',
    more: [
      {
        label: 'Phase 1 · Reinit protection',
        text: 'Automation detects when SAP re-initialises a table and triggers a targeted full refresh of Bronze and Silver, so no silent data gaps reach the reports.',
      },
      {
        label: 'Phase 1 · Arkieva extraction',
        text: '6-hourly snapshot ingestion for the supply-chain planning system, parquet into Bronze and Silver through DLT.',
      },
      {
        label: 'Phase 1 · Data quality framework',
        text: 'Nightly SAP reconciliation across raw files, Bronze and Silver (row counts, distinct keys, primary-key integrity, deletes accounted for), logged per table with failures posted to Microsoft Teams. Chosen over DLT expectations on cost and coverage.',
      },
      {
        label: 'Phase 1 · Daily Total Order report',
        text: 'The first end-to-end report on the platform, from source tables through Gold facts to Platinum and a Power BI refresh every four hours.',
      },
      {
        label: 'Phase 2 · Shared utilities library',
        text: 'The common Python module used by every notebook: a table writer with overwrite, merge and incremental-merge strategies and built-in safety rules (an empty input never wipes a table, incremental loads without a key are refused), audit columns with hashed business keys, skip-if-fresh for shared dimensions, data-quality logging, primary-key enforcement and the Power BI refresh trigger with token refresh, retry and polling.',
      },
      {
        label: 'Phase 2 · Logging and metadata',
        text: 'A metadata-driven control plane (one control table driving ingestion and loads) with structured logging around it; later led the move to self-describing notebooks that declare their own target and keys, removing shared-table contention.',
      },
      {
        label: 'Phase 2 · Data quality in every load',
        text: 'Row, null and duplicate counts plus success and failure records built into the standard notebook template, so every Gold and Platinum table is checked on every run.',
      },
      {
        label: 'Phase 2 · Platinum layer',
        text: 'Report-specific Platinum tables so Power BI reads pre-joined, report-shaped data instead of joining Silver and Gold itself, with each dataset refreshed only after its data has fully landed.',
      },
    ],
    tags: ['SAP ECC', 'SAP Datasphere', 'Delta Live Tables', 'Auto Loader', 'Unity Catalog', 'Medallion Architecture', 'Databricks Asset Bundles', 'Azure Key Vault', 'Arkieva', 'Power BI REST API', 'Microsoft Teams webhooks'],
    pipeline: [
      { label: 'Sources', nodes: ['SAP ECC via Datasphere CDC', 'Arkieva snapshots', 'Other sources'] },
      { label: 'Ingestion', nodes: ['Auto Loader', 'DLT apply_changes'] },
      { label: 'Medallion', nodes: ['Raw Volumes', 'Bronze', 'Silver', 'Gold', 'Platinum'] },
      { label: 'Delivered', nodes: ['Nightly reconciliation', 'Teams alerts', 'Power BI reports'] },
    ],
    related: { id: 'platform-phase-3', label: 'Continued in Phase 3' },
  },
  {
    id: 'finance-migration',
    index: '03',
    sector: 'Finance Sector',
    short: 'Finance migration',
    title: 'Legacy Stack to Full Databricks Migration',
    role: 'Junior Data Engineer',
    duration: '5 months',
    icon: 'bank',
    summary:
      "Migrated an entire finance company's data infrastructure from SSIS, SSRS, SSMS, JAMS, and PowerShell into a single unified Databricks environment. Every business metric delivered accurately. Zero data loss. Zero compromise.",
    summaryShort:
      'Moved a legacy finance stack to Databricks, with validation and reconciliation to preserve every business metric.',
    story: {
      problem:
        'The finance data infrastructure ran on five separate tools: SSIS, SSRS, SSMS, JAMS and PowerShell. Each one owned a piece of the pipeline, and all of it had to move to Databricks without changing a single business metric.',
      approach:
        'Moved everything into one Azure Databricks environment. Built validation and reconciliation pipelines that checked every migrated dataset against its source, and wrote parameterised notebook templates so the team could build new pipelines the same way each time.',
      result:
        'All business metrics matched after the migration: 200+ tables, zero data loss. New pipeline development got 33% faster with the templates.',
    },
    outcomes: [
      { value: '200+', label: 'tables migrated' },
      { value: '100%', label: 'metric accuracy' },
      { value: '0', label: 'data loss' },
      { value: '33%', label: 'faster pipeline builds' },
    ],
    tags: ['Databricks', 'SSIS Migration', 'SSRS', 'SSMS', 'JAMS', 'PowerShell', 'Legacy Modernisation'],
    pipeline: [
      { label: 'Legacy sources', nodes: ['SSIS', 'SSRS', 'SSMS', 'JAMS', 'PowerShell'] },
      { label: 'Platform', nodes: ['Azure Databricks'] },
      { label: 'Medallion', nodes: ['Bronze', 'Silver', 'Gold'] },
      { label: 'Delivered', nodes: ['Business metrics', 'Reconciliation checks'] },
    ],
  },
  {
    id: 'agent-intelligence',
    index: '04',
    sector: 'Insurance Agent Management',
    short: 'Agent intelligence',
    title: 'Unstructured Backend Data to Agent Intelligence',
    role: 'Junior Data Engineer',
    duration: '3 months',
    icon: 'shield',
    summary:
      'Databricks pipelines parsing raw unstructured JSON from Firestore and Elastic Search covering agent calls, campaigns, medical records, and insurance mappings. Transformed backend noise into structured analytics that identified top agents and drove subscription growth.',
    summaryShort:
      'Turned Firestore and Elasticsearch JSON into structured Databricks tables for agent and campaign analytics.',
    story: {
      problem:
        'Agent calls, campaigns, medical records and insurance mappings were stored as raw JSON in Firestore and Elasticsearch, in shapes that kept changing. Fine for the application, not usable for analytics.',
      approach:
        'PySpark pipelines on Azure Databricks that parse 10,000+ documents a day. The ingestion is built from 12+ reusable patterns for semi-structured sources, each handling schema evolution so a new field does not break the run.',
      result:
        'Structured tables the business could query. They identified the top-performing agents, which fed a 23% increase in subscription growth, and processing reliability improved by 37%.',
    },
    outcomes: [
      { value: '10,000+', label: 'JSON documents a day' },
      { value: '12+', label: 'ingestion patterns' },
      { value: '23%', label: 'subscription growth' },
      { value: '37%', label: 'reliability gain' },
    ],
    tags: ['Databricks', 'PySpark', 'Firestore', 'Elasticsearch', 'JSON Parsing', 'Schema Evolution'],
    pipeline: [
      { label: 'Raw sources', nodes: ['Firestore', 'Elasticsearch'] },
      { label: 'Ingestion', nodes: ['PySpark parsing', 'Schema evolution'] },
      { label: 'Medallion', nodes: ['Bronze', 'Silver', 'Gold'] },
      { label: 'Delivered', nodes: ['Agent intelligence', 'Campaign analytics'] },
    ],
  },
]
