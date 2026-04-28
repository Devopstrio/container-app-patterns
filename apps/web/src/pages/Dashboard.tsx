import React from 'react';
import { Box, Layers, Zap, Shield, ExternalLink, RefreshCcw, Target, ChevronRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase">Pattern Catalog</h1>
          <p className="text-slate-400 mt-3 text-xl max-w-2xl font-medium">Production-ready design patterns for high-scale containerized workloads.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-slate-900 border border-slate-800 text-slate-300 px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition flex items-center gap-2">
             <RefreshCcw size={18} /> Update Catalog
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-bold transition shadow-xl shadow-indigo-900/40 flex items-center gap-2">
             <Target size={18} /> Select Pattern
          </button>
        </div>
      </div>

      {/* Pattern Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <PatternCard 
            title="Stateless Web App" 
            category="Core Architecture" 
            complexity="Low"
            icon={<Box className="text-blue-400" />}
            description="The foundational pattern for horizontal scaling and high availability. Includes HPA and Ingress."
         />
         <PatternCard 
            title="Event-Driven Worker" 
            category="Asynchronous" 
            complexity="Medium"
            icon={<Zap className="text-amber-400" />}
            description="Decoupled processing using message brokers and auto-scaling consumer groups."
         />
         <PatternCard 
            title="Sidecar Proxy (Service Mesh)" 
            category="Advanced" 
            complexity="High"
            icon={<Layers className="text-emerald-400" />}
            description="Advanced traffic management, mTLS, and observability using Envoy and Istio."
         />
      </div>

      {/* Comparison Board */}
      <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
           <Layers size={300} />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-10 text-white flex items-center gap-4 italic">
            <span className="w-3 h-10 bg-indigo-600 rounded-full"></span>
            Platform Runtime Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <RuntimeInfo 
                name="Kubernetes (AKS/EKS/GKE)" 
                bestFor="Complex multi-container orchestrations and fine-grained control." 
                complexity="High"
                cost="Operational + Infrastructure"
             />
             <RuntimeInfo 
                name="Serverless (ACA/ECS Fargate)" 
                bestFor="High-velocity teams and request-driven autoscaling." 
                complexity="Low"
                cost="Consumption Based"
             />
          </div>
        </div>
      </div>

      {/* Security Baseline */}
      <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-10 text-white flex items-center gap-3 text-emerald-400 uppercase tracking-widest">
           <Shield size={28} />
           Platform Security Baseline
        </h2>
        <div className="space-y-4">
           <SecurityItem title="Non-Root Execution" status="Enforced" />
           <SecurityItem title="Read-Only Root Filesystem" status="Recommended" />
           <SecurityItem title="Distroless Base Images" status="Standard" />
           <SecurityItem title="Secrets Store CSI Injection" status="Enforced" />
        </div>
      </div>
    </div>
  );
};

const PatternCard = ({ title, category, complexity, icon, description }: any) => (
  <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-indigo-500/30 transition-all group relative overflow-hidden shadow-2xl">
    <div className="flex justify-between items-start mb-6">
       <div className="p-4 bg-slate-950 rounded-2xl w-fit border border-slate-800/50 shadow-inner group-hover:scale-110 transition duration-500">{icon}</div>
       <div className="flex flex-col items-end">
          <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">{category}</span>
          <span className="text-[10px] text-slate-500 font-bold uppercase mt-1">Complexity: {complexity}</span>
       </div>
    </div>
    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-indigo-400 transition">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed mb-8">{description}</p>
    <button className="flex items-center gap-2 text-indigo-400 font-bold text-sm hover:text-white transition">
       View Blueprint <ChevronRight size={16} />
    </button>
  </div>
);

const RuntimeInfo = ({ name, bestFor, complexity, cost }: any) => (
  <div className="p-8 bg-slate-950/50 border border-slate-800 rounded-3xl hover:bg-slate-800/50 transition group">
    <h4 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition">{name}</h4>
    <p className="text-slate-400 text-sm mb-6 font-medium italic">"{bestFor}"</p>
    <div className="flex gap-10">
       <div>
          <p className="text-[10px] font-black uppercase text-slate-600 mb-1">Complexity</p>
          <p className="text-sm font-bold text-slate-200">{complexity}</p>
       </div>
       <div>
          <p className="text-[10px] font-black uppercase text-slate-600 mb-1">Cost Model</p>
          <p className="text-sm font-bold text-slate-200">{cost}</p>
       </div>
    </div>
  </div>
);

const SecurityItem = ({ title, status }: any) => (
  <div className="flex items-center justify-between p-5 bg-slate-950/50 border border-slate-800 rounded-2xl hover:bg-slate-800/50 transition group">
     <div className="flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
        <span className="text-sm font-bold text-slate-100 group-hover:text-indigo-400 transition">{title}</span>
     </div>
     <div className="flex items-center gap-4">
        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{status}</span>
        <ExternalLink size={16} className="text-slate-800 group-hover:text-white transition" />
     </div>
  </div>
);

export default Dashboard;
