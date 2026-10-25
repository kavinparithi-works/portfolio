/**
 * "Projects Shipped" case studies, newest first. Summary copy for the first
 * three engagements is carried over from v1 of the portfolio; roles, outcomes
 * and numbers come from the resume PDF and the Phase 3 engagement brief.
 * The client behind the chemical manufacturing work is intentionally unnamed.
 *
 * Fields:
 *   short     label for the compact project tabs
 *   summaryShort  overview on every screen; summary appears in the full study
 *   pipeline  ordered stages for the architecture diagram (adjacent stages
 *             are connected automatically)
 *   more      optional one-line extras shown under "Also in this phase"
 *   related   optional pointer to another case study (rendered as a link)
 */
export const projects = [
  {
    id: 'platform-phase-3',
    index: '01',
    sector: 'Chemical Manufacturing · Phase 3',
    short: 'Platform, phase 3',
    title: 'Shared Control Table to Self-Describing Notebooks',
    role: 'Data Platform Engineer, staff augmentation',
    duration: 'Aug 2026 to Aug 2027 · in progress',
    icon: 'layers',
    summary:
      "Phase 3 of the same chemical manufacturing platform, working inside the client's enterprise data and analytics team. Azure Databricks with Unity Catalog across Dev, QA and Prod. SAP ECC arrives through Datasphere CDC into Delta Live Tables, alongside around 13 other sources. 60+ Asset Bundles and about 456 notebooks feed roughly 40 Power BI reports, Genie spaces and AI/BI dashboards.",
    summaryShort:
      'Removed shared control-table calls from Databricks notebooks, preserving their SQL, schemas and hash values.',
    story: {
      problem:
        'Every Gold and Platinum notebook read its target table and merge keys from one shared control table at run time, then wrote its status back. With 10+ report jobs running at once the table became a point of contention, and no notebook could be understood on its own.',
      approach:
        'Wrote Batch_Utilities_v2 (about 2.4k lines): the same API as v1 with every control-table call removed, so each notebook declares its own target table and merge keys. Defined the v2 notebook standard (skipper, transform, audits, primary-key check, TableWriter, data-quality logging) and converted report bundles with no logic change. A custom logic_diff.py, an AST scan for v1 leftovers and row, key and hash comparisons in Dev prove each conversion is byte-identical.',
      result:
        '166 of 456 notebooks converted so far, across 10+ report bundles from the pilot through to Prod, with identical SQL, schema and hash values. The remaining backlog is tracked per report and owner.',
    },
    outcomes: [
      { value: '166', label: 'of 456 notebooks converted' },
      { value: '10+', label: 'report bundles migrated' },
      { value: '~2.4k', label: 'lines in Batch_Utilities_v2' },
      { value: '0', label: 'logic changes, byte-identical' },
    ],
    more: [
      {
        label: 'Platform standards',
        text: 'Job clusters moved to Databricks Runtime 18.x, production alerting cleaned up, and the DAB, CI/CD, DLT, DQ and governance documentation rewritten. Deploy scripts hardened with per-version CLI caching and Terraform pinning, plus a scripted job-schedule inventory and throttling analysis.',
      },
      {
        label: 'Genie and AI/BI',
        text: 'S&OP and inventory Genie spaces deployed through DAB with a dedicated deploy script, and a client-agnostic SOP for promoting Genie spaces across environments, contributed to the zeb Databricks guild.',
      },
      {
        label: 'POCs',
        text: 'Three SAP Business Data Cloud to Databricks integration methods evaluated with a recommendation. Databricks Solution Builder explored for manufacturing use cases.',
      },
      {
        label: 'Ops and root cause',
        text: 'Daily run and DQ monitoring, selective DLT refreshes, SAP re-initialisation reviews. A production Unity Catalog LOCATION_OVERLAP failure was isolated to one query on one cluster spec by eliminating code, deploy, identity, runtime and table-state causes, then fixed with a one-task serverless change and packaged as a Databricks support case.',
      },
      {
        label: 'AI-assisted engineering',
        text: 'Two reusable agent skills for the codebase: a full architecture reference and the conversion procedure with the logic_diff checker, so every migration is done the same way and verified.',
      },
    ],
    tags: ['Unity Catalog', 'Delta Live Tables', 'Databricks Asset Bundles', 'Databricks CLI', 'Azure DevOps', 'Genie', 'PySpark', 'Python AST', 'Terraform', 'Power BI'],
    pipeline: [
      { label: 'Sources', nodes: ['SAP ECC via Datasphere CDC', '13 other systems'] },
      { label: 'Lakehouse', nodes: ['Delta Live Tables', 'Unity Catalog'] },
      { label: 'v2 notebooks', nodes: ['Batch_Utilities_v2', 'Gold', 'Platinum'] },
      { label: 'Delivered', nodes: ['~40 Power BI reports', 'Genie spaces', 'AI/BI dashboards'] },
    ],
    related: { id: 'sap-lakehouse', label: 'Phases 1 & 2' },
  },
  {
    id: 'sap-lakehouse',
    index: '02',
    sector: 'Chemical Manufacturing · Phases 1 & 2',
    short: 'SAP Lakehouse',
    title: 'SAP ECC to Enterprise Lakehouse Platform',
    role: 'Data Engineer',
    duration: 'Phase 1: 4 months · Phase 2: 5 months',
    icon: 'flask',
    summary:
      'SAP ECC through Datasphere into Databricks Volumes. Gold and Platinum layers for procurement, plant ops, supply chain, and compliance. DLT for real-time orders, predictive replenishment, row-level SQL alerts, dedicated DQ pipelines, and DAB deployments across environments.',
    summaryShort:
      'Built a Databricks lakehouse from SAP ECC, with real-time orders, data-quality checks and releases across three environments.',
    story: {
      problem:
        "A chemical manufacturer's operational data sat in SAP ECC: procurement, plant operations, supply chain, compliance. The business needed it in a Lakehouse where analytics, alerts and real-time order tracking could run on top of it.",
      approach:
        'SAP ECC data comes in through Datasphere and lands in Databricks Volumes. Gold and Platinum layers cover seven business domains. Delta Live Tables handle real-time order tracking and predictive replenishment. Row-level SQL alerts and dedicated data-quality pipelines watch the outputs, and Databricks Asset Bundles push releases through three environments.',
      result:
        '50,000+ daily order records processed in near real-time, 83% fewer data-quality incidents, and release time cut by 30%.',
    },
    outcomes: [
      { value: '7', label: 'business domains' },
      { value: '50,000+', label: 'daily order records' },
      { value: '83%', label: 'fewer DQ incidents' },
      { value: '30%', label: 'faster releases' },
    ],
    tags: ['SAP ECC', 'Datasphere', 'DLT', 'Medallion Architecture', 'SQL Alerts', 'DABs', 'Data Quality', 'CI/CD'],
    pipeline: [
      { label: 'Source', nodes: ['SAP ECC'] },
      { label: 'Ingestion', nodes: ['SAP Datasphere', 'Databricks Volumes'] },
      { label: 'Medallion', nodes: ['Bronze', 'Silver', 'Gold', 'Platinum'] },
      { label: 'Delivered', nodes: ['Real-time orders (DLT)', 'Predictive replenishment', 'Row-level SQL alerts'] },
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
