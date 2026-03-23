import React, { useState, useEffect } from 'react';
import { X, Info, CheckCircle2, Database, ExternalLink, Lightbulb } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import guidesData from '../../data/viewGuides.json';
import { Card, Button } from './Shared';

export const ViewGuideModal = ({ isOpen, onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [guide, setGuide] = useState(null);

    useEffect(() => {
        // Find best match for current route
        const currentPath = location.pathname;
        const matchedPath = Object.keys(guidesData).find(path => 
            path === currentPath || (path !== '/' && currentPath.startsWith(path))
        );
        
        setGuide(guidesData[matchedPath] || guidesData['/']);
    }, [location.pathname, isOpen]);

    if (!isOpen || !guide) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 overflow-hidden">
            {/* Backdrop with Ultra-Blur */}
            <div 
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-xl transition-all duration-500 ease-out"
                onClick={onClose}
            />
            
            {/* Modal Content - Senior Balanced Design */}
            <Card className="relative w-full max-w-4xl bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden animate-in zoom-in-95 fade-in slide-in-from-bottom-8 duration-500 ease-out flex flex-col p-0 max-h-[92vh]">
                
                {/* Header Section */}
                <div className="flex-shrink-0 relative h-32 md:h-40 group">
                    <img 
                        src={guide.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"} 
                        alt={guide.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-brand-primary/60 to-transparent"></div>
                    
                    <div className="absolute inset-0 p-6 md:p-10 flex items-center gap-5">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl shrink-0">
                            <Lightbulb className="h-7 w-7 text-amber-300" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-4xl font-black text-white font-serif leading-tight drop-shadow-md">
                                {guide.title}
                            </h2>
                            <div className="flex items-center gap-2 opacity-80 text-blue-100">
                                <span className="text-[10px] uppercase font-bold tracking-widest">Localidad:</span>
                                <code className="text-[10px] font-mono font-bold bg-black/20 px-2 py-0.5 rounded">{location.pathname}</code>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-rose-500 hover:text-white backdrop-blur-md rounded-full text-white transition-all duration-300 z-20 group border border-white/20"
                    >
                        <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
                    </button>
                </div>

                {/* Body Section - Balanced Grid */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        
                        {/* Left: Narrative (Main) */}
                        <div className="lg:col-span-12 p-6 md:p-10 pb-0">
                            <div className="bg-slate-50/80 border-l-4 border-brand-primary p-6 rounded-r-3xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <Info className="h-4 w-4 text-brand-primary" />
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-primary">Narrativa de Contexto</span>
                                </div>
                                <p className="text-slate-600 text-xl font-light italic leading-relaxed">
                                    "{guide.description}"
                                </p>
                            </div>
                        </div>

                        {/* Layout: Capabilities & Meta Sidebar */}
                        <div className="lg:col-span-8 p-6 md:p-10 pt-8">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
                                <div className="h-px flex-1 bg-slate-100"></div>
                                Capacidades de la Vista
                                <div className="h-px flex-1 bg-slate-100"></div>
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {guide.features.map((feature, idx) => (
                                    <div key={idx} className="flex gap-4 items-center p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-primary/20 transition-all duration-300 group">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 group-hover:scale-125 transition-transform"></div>
                                        <span className="text-xs font-bold text-slate-700 leading-tight">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Data Meta Sidebar */}
                        <div className="lg:col-span-4 p-6 md:p-10 lg:pl-0 pt-8">
                            <div className="sticky top-0 space-y-4">
                                <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100 shadow-sm space-y-4 transform hover:-translate-y-1 transition-transform">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-xl shadow-sm">
                                            <Database className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">Integridad de Datos</span>
                                    </div>
                                    <p className="text-xs font-bold text-slate-700 leading-relaxed border-t border-blue-100 pt-3 italic">
                                        {guide.source}
                                    </p>
                                </div>
                                
                                <div className="p-6 rounded-3xl bg-slate-900 shadow-xl group overflow-hidden relative">
                                    <div className="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-150 transition-transform duration-700">
                                        <Lightbulb className="h-24 w-24 text-white" />
                                    </div>
                                    <div className="relative z-10 space-y-2">
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">Observatorio OAR</span>
                                        <p className="text-[10px] text-slate-400 leading-relaxed">
                                            Toda la información presentada se actualiza mediante protocolos estandarizados de la Región SICA.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="flex-shrink-0 p-6 md:px-10 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center p-2">
                            <img src="/logo_oar.png" alt="OAR" className="opacity-50 grayscale" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SICA • Sistema de Información Regional</span>
                            <span className="text-[9px] font-bold text-slate-500 uppercase">Edición 2024 • Observatorio Ambiental</span>
                        </div>
                    </div>
                    
                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto rounded-full px-10 py-4 font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl shadow-brand-primary/30 hover:shadow-brand-primary/40 transition-all hover:-translate-y-0.5"
                        onClick={() => {
                            onClose();
                            if (guide.learnMore.startsWith('http')) {
                                window.open(guide.learnMore, '_blank');
                            } else {
                                navigate(guide.learnMore);
                            }
                        }}
                    >
                        Saber más detalles <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </Card>
        </div>
    );
};
