import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterBar } from '../../components/dashboard/FilterBar';
import { KpiCards } from '../../components/dashboard/KpiCards';
import { Charts } from '../../components/dashboard/Charts';
import { Globe, Calendar, ShieldCheck } from 'lucide-react';

export const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const kpiParam = searchParams.get('kpi');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('oar_user');
        if (saved) setUser(JSON.parse(saved));
    }, []);

    const [filters, setFilters] = useState({
        country: "Regional",
        year: 2024,
        sector: "Todos"
    });

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-full">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-slate-800">
                        Dashboard Regional
                    </h1>
                    {user && user.role !== 'public' && (
                        <div className="flex gap-4 mt-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                <Globe className="h-3 w-3" /> IP: {user.ip || 'Localhost'}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                <Calendar className="h-3 w-3" /> Miembro desde: {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 uppercase tracking-tight">
                                <ShieldCheck className="h-3 w-3" /> Sesión Simulada Activa
                            </div>
                        </div>
                    )}
                </div>
                <span className="text-xs text-slate-400">
                    Última actualización: {new Date().toLocaleDateString()}
                </span>
            </div>

            <FilterBar filters={filters} onFilterChange={setFilters} />

            <KpiCards countryCode={filters.country} highlightKey={kpiParam} />

            <Charts />
        </div>
    );
};
