
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, MoreHorizontal } from "lucide-react";

const mockBrands = [
  { id: 1, name: "Vercel", logo: "https://picsum.photos/200/100", visible: true },
  { id: 2, name: "Linear", logo: "https://picsum.photos/200/101", visible: true },
  { id: 3, name: "Supabase", logo: "https://picsum.photos/200/102", visible: false },
];

export default function BrandsPage() {
  const handleAdd = () => {
    alert("Add Brand Modal would open here in production.");
  };

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Brand Partners</h1>
        <button 
          onClick={handleAdd}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Add Brand
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBrands.map((brand) => (
          <motion.div
            key={brand.id}
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col gap-4 relative group"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded">
                <MoreHorizontal size={16} />
              </button>
            </div>
            
            <div className="h-20 flex items-center justify-center bg-gray-50 dark:bg-zinc-950 rounded-lg border border-gray-100 dark:border-zinc-800 overflow-hidden">
               {/* Mock Image */}
               <div className="text-lg font-bold text-gray-400">{brand.name}</div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{brand.name}</h3>
                <span className={`text-xs ${brand.visible ? 'text-green-600' : 'text-gray-400'}`}>
                  {brand.visible ? 'Visible' : 'Hidden'}
                </span>
              </div>
              <button className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
        
        {/* Upload Placeholder Card */}
        <button 
          onClick={handleAdd}
          className="border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors min-h-[160px]"
        >
          <Plus size={24} />
          <span className="text-sm font-medium">Upload New Logo</span>
        </button>
      </div>
    </div>
  );
}
