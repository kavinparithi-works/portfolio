/**
 * Career timeline at zeb (Chennai), from the resume PDF and the Phase 3 brief.
 */
export const experience = {
  company: 'zeb',
  location: 'Chennai, India',
  span: 'Sep 2024 to present',
  intro:
    'I joined zeb as an intern in September 2024 and have been there since, moving from training to junior engineer to data engineer, with client work across finance, insurance and manufacturing. Since August 2026 I sit inside a client team as a data platform engineer.',
  roles: [
    {
      title: 'Data Engineer',
      period: 'Oct 2025 to present',
      current: true,
      summary:
        'The chemical manufacturing Lakehouse, now in its third phase. Phases 1 and 2 built the SAP ECC to Databricks platform with DLT, data-quality pipelines and DAB releases. Since Aug 2026, embedded with the client as a data platform engineer: leading the move from a shared control table to self-describing notebooks across 456 notebooks, platform standards and CI/CD, Genie spaces, and production support.',
      highlights: ['SAP ECC to Databricks', 'Delta Live Tables', 'Metadata elimination (v2 standard)', 'Unity Catalog', 'Databricks Asset Bundles', 'Genie spaces'],
    },
    {
      title: 'Junior Data Engineer',
      period: 'Feb 2025 to Sep 2025',
      summary:
        'Two client projects back to back. First the insurance pipelines, parsing raw Firestore and Elasticsearch JSON with PySpark. Then the finance migration, moving five legacy tools into Databricks with zero data loss.',
      highlights: ['Legacy migration', 'Reconciliation pipelines', 'Semi-structured ingestion', 'Notebook templates'],
    },
    {
      title: 'Data Engineering Intern',
      period: 'Sep 2024 to Feb 2025',
      summary:
        'A rotational training programme covering Azure, Databricks, PySpark and SQL. Built small ETL pipelines on internal use cases and picked up Lakehouse and Delta Lake fundamentals from the senior engineers.',
      highlights: ['Azure and Databricks', 'PySpark and SQL', 'Delta Lake fundamentals'],
    },
  ],
}
