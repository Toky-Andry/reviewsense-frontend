"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { AnalysesFilters } from "@/components/analyses/AnalysesFilters";
import { AnalysesTable }   from "@/components/analyses/AnalysesTable";

const ALL_ANALYSES = [
  { id:"1", store:"EcoEssentials.com", source:"Amazon",    date:"Oct 24,\n2023", reviews:1240, score:88, trend: 4,  status:"COMPLETED"  as const },
  { id:"2", store:"TechGadgets.io",    source:"Trustpilot",date:"Oct 23,\n2023", reviews:850,  score:72, trend:-2,  status:"COMPLETED"  as const },
  { id:"3", store:"FashionHub.store",  source:"Google",    date:"Oct 22,\n2023", reviews:2100, score:91, trend: 7,  status:"COMPLETED"  as const },
  { id:"4", store:"HomeDecor.co",      source:"Amazon",    date:"Oct 22,\n2023", reviews:450,  score:65, trend:-5,  status:"COMPLETED"  as const },
  { id:"5", store:"SportsPro.net",     source:"Shopify",   date:"Oct 21,\n2023", reviews:1080, score:78, trend: 1,  status:"PROCESSING" as const },
  { id:"6", store:"BeautyBox.com",     source:"Trustpilot",date:"Oct 21,\n2023", reviews:920,  score:84, trend: 3,  status:"COMPLETED"  as const },
  { id:"7", store:"OutdoorGear.io",    source:"Amazon",    date:"Oct 20,\n2023", reviews:670,  score:69, trend:-3,  status:"COMPLETED"  as const },
  { id:"8", store:"KidsZone.store",    source:"Google",    date:"Oct 20,\n2023", reviews:1450, score:88, trend: 6,  status:"COMPLETED"  as const },
];

const PER_PAGE   = 8;
const TOTAL      = 76;
const TOTAL_PAGES = 3;

export default function AnalysesPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch]   = useState("");
  const [source, setSource]   = useState("All");
  const [status, setStatus]   = useState("All");
  const [sort,   setSort]     = useState("Date");

  const filtered = useMemo(() => {
    return ALL_ANALYSES.filter((a) => {
      const matchSearch = search === "" ||
        a.store.toLowerCase().includes(search.toLowerCase()) ||
        a.source.toLowerCase().includes(search.toLowerCase());
      const matchSource = source === "All" || a.source === source;
      const matchStatus = status === "All" ||
        a.status === status.toUpperCase();
      return matchSearch && matchSource && matchStatus;
    }).sort((a, b) => {
      if (sort === "Score")   return b.score - a.score;
      if (sort === "Reviews") return b.reviews - a.reviews;
      if (sort === "Trend")   return b.trend - a.trend;
      return 0; // Date (already sorted)
    });
  }, [search, source, status, sort]);

  return (
    <div className="space-y-5">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between"
      >
        <div>
          <h2 className="text-3xl font-black text-[#F8FAFC] tracking-tight">
            All Analyses
          </h2>
          <p className="text-sm text-[#94A3B8] mt-0.5">
            {filtered.length > 0
              ? `${TOTAL} completed`
              : "No analyses found"}
          </p>
        </div>
        <button
          onClick={() => router.push("/onboarding")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all"
        >
          <Plus size={16} />
          New Analysis
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <AnalysesFilters
          onSearch={setSearch}
          onSource={setSource}
          onStatus={setStatus}
          onSort={setSort}
        />
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <AnalysesTable
          data={filtered}
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          total={TOTAL}
          perPage={PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </motion.div>

    </div>
  );
}