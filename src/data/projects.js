/**
 * "Selected Works" entries rendered in the Work section.
 */
export const projects = [
  {
    sector: 'Finance Sector',
    title: 'Legacy Stack to Full Databricks Migration',
    desc: "Migrated an entire finance company's data infrastructure from SSIS, SSRS, SSMS, JAMS, and PowerShell into a single unified Databricks environment. Every business metric delivered accurately. Zero data loss. Zero compromise.",
    tags: ['Databricks', 'SSIS Migration', 'SSRS', 'SSMS', 'Legacy Modernisation'],
    icon: 'bank',
    status: 'Duration: 5 months',
  },
  {
    sector: 'Insurance Agent Management',
    title: 'Unstructured Backend Data to Agent Intelligence',
    desc: 'Databricks pipelines parsing raw unstructured JSON from Firestore and Elastic Search covering agent calls, campaigns, medical records, and insurance mappings. Transformed backend noise into structured analytics that identified top agents and drove subscription growth.',
    tags: ['Databricks', 'Firestore', 'Elastic Search', 'PySpark', 'JSON Parsing'],
    icon: 'shield',
    status: 'Duration: 3 months',
  },
  {
    sector: 'Chemical Manufacturing',
    title: 'SAP ECC to Enterprise Lakehouse Platform',
    desc: 'SAP ECC through Datasphere into Databricks Volumes. Gold and Platinum layers for procurement, plant ops, supply chain, and compliance. DLT for real-time orders, predictive replenishment, row-level SQL alerts, dedicated DQ pipelines, and DAB deployments across environments.',
    tags: ['SAP ECC', 'Datasphere', 'DLT', 'Medallion Architecture', 'SQL Alerts', 'DABs', 'Data Quality'],
    icon: 'flask',
    status: [
      { text: 'Phase 1: 4 months', color: 'ink' },
      { text: 'Phase 2: 5 months', color: 'orange' },
    ],
  },
]
