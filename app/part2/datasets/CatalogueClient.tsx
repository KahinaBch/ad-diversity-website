"use client";
import { useState, useCallback } from "react";
import DatasetTable from "@/components/DatasetTable";
import CohortCharts from "@/components/CohortCharts";
import DatasetAssistant from "@/components/DatasetAssistant";
import type { Dataset } from "@/lib/catalogue";

export default function CatalogueClient() {
  const [allDatasets, setAllDatasets] = useState<Dataset[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleDataLoad = useCallback((data: Dataset[]) => {
    setAllDatasets(data);
    // Start with all cohorts selected
    setSelectedIds(new Set(data.map((d) => d.id)));
  }, []);

  const selectedDatasets = allDatasets.filter((d) => selectedIds.has(d.id));

  return (
    <>
      <DatasetTable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onDataLoad={handleDataLoad}
      />

      {/* Cohort Dashboard */}
      {allDatasets.length > 0 && (
        <>
          <div className="section-divider my-14" />
          <section className="mb-14" id="cohort-dashboard">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-200 mb-1">Cohort Overview Dashboard</h2>
              <p className="text-sm text-gray-500">
                Visualising the {selectedIds.size} selected cohort{selectedIds.size !== 1 ? "s" : ""}.{" "}
                Use the checkboxes in the table above to update the charts.{" "}
                <button
                  onClick={() => setSelectedIds(new Set(allDatasets.map((d) => d.id)))}
                  className="text-violet-400 underline hover:text-violet-300 transition-colors">
                  Select all
                </button>
                {" · "}
                <button
                  onClick={() => setSelectedIds(new Set())}
                  className="text-pink-400 underline hover:text-pink-300 transition-colors">
                  Clear selection
                </button>
              </p>
            </div>
            <CohortCharts datasets={selectedDatasets} />
          </section>
        </>
      )}

      {/* Research Assistant */}
      {allDatasets.length > 0 && (
        <>
          <div className="section-divider my-14" />
          <section className="mb-14" id="research-assistant">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-200 mb-1">Research Assistant</h2>
              <p className="text-sm text-gray-500">
                Ask practical questions to find relevant cohorts, identify research gaps, or explore the catalogue.
                Responses are rule-based and grounded in the dataset metadata.
              </p>
            </div>
            <DatasetAssistant datasets={allDatasets} />
          </section>
        </>
      )}
    </>
  );
}
