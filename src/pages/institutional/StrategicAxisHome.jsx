import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    BookOpen, 
    HelpCircle, 
    LayoutDashboard, 
    Map as MapIcon, 
    Trees, 
    Info, 
    ArrowRight,
    Search,
    RefreshCw,
    FileText,
    Activity,
    Globe
} from 'lucide-react';
import { Button, Card } from '../../components/ui/Shared';

const SICA_FACTS = [
    "La región SICA cuenta con 18.1 millones de hectáreas de bosque, de las cuales el 45% se encuentran bajo protección oficial.",
    "Tres países de la región han logrado revertir la tendencia regional y ahora muestran una ganancia neta de cobertura boscosa en 2024.",
    "El stock total de carbono en los bosques de la región SICA alcanza las 3.2 Gigatoneladas, un pilar crítico para la resiliencia climática.",
    "La 'Selva Maya' es el bosque tropical más extenso de Mesoamérica, albergando una biodiversidad única en el mundo.",
    "El carbono orgánico del suelo representa más del 50% del total almacenado en nuestros ecosistemas forestales regionales.",
    "Los sistemas agroforestales de café y cacao en el SICA capturan hasta 40 toneladas de carbono por hectárea anualmente.",
    "La región alberga el 7% de la biodiversidad mundial en apenas el 0.5% de la superficie terrestre del planeta.",
    "Los manglares de la región SICA protegen contra marejadas y almacenan hasta 5 veces más carbono que los bosques terrestres."
];

const ModuleCard = ({ icon: Icon, title, description, path, colorClass, delay }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(path)}
            className={`group relative p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden animate-in fade-in slide-in-from-bottom-4 fill-mode-both`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}>
                <Icon size={128} />
            </div>
            
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500 ${colorClass}`}>
                <Icon className="h-7 w-7 text-white" />
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:text-brand-primary transition-colors">
                {title}
            </h3>
            
            <p className="text-slate-500 leading-relaxed mb-6 font-light">
                {description}
            </p>
            
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-brand-primary transition-colors">
                Ingresar al módulo <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    );
};

export const StrategicAxisHome = ({ axisLine }) => {
    const navigate = useNavigate();
    const [factIndex, setFactIndex] = React.useState(() => Math.floor(Math.random() * SICA_FACTS.length));
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleShuffle = (e) => {
        e.stopPropagation();
        setIsRefreshing(true);
        setTimeout(() => {
            setFactIndex((prev) => {
                let next;
                do {
                    next = Math.floor(Math.random() * SICA_FACTS.length);
                } while (next === prev && SICA_FACTS.length > 1);
                return next;
            });
            setIsRefreshing(false);
        }, 300);
    };

    return (
        <div className="min-h-full bg-slate-50 font-sans">
            {/* Hero Section */}
            <div className="relative pt-16 pb-24 px-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-50/50 to-transparent -z-10"></div>
                
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-wider">
                                <Trees className="h-3 w-3" /> ERAM: Línea Estratégica 4
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif font-black text-slate-900 leading-tight">
                                Bosques y Paisajes <span className="text-emerald-600">Sostenibles</span>
                            </h1>
                            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed font-light">
                                Gestión integral para la protección de los pulmones verdes de la región SICA, impulsando la resiliencia climática y la conectividad biológica mesoamericana.
                            </p>

                            {/* Prominent Search Bar */}
                            <div className="max-w-2xl mt-8">
                                <div className="relative group">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500 transition-colors group-focus-within:text-emerald-600" />
                                    <input 
                                        type="text" 
                                        placeholder="¿Qué información busca sobre este eje?" 
                                        className="w-full bg-white border border-slate-200 rounded-2xl py-5 pl-16 pr-6 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 text-lg transition-all"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-6">
                                            Buscar
                                        </Button>
                                    </div>
                                </div>
                                <p className="mt-3 text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black pl-2">
                                    Búsqueda Integrada: Capas, Reportes y Metadatos
                                </p>
                            </div>
                        </div>
                        
                        {/* Dato del día Card */}
                        <div className="w-full lg:w-96 shrink-0">
                            <div className="bg-emerald-950 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-emerald-950/20 relative overflow-hidden group min-h-[300px] flex flex-col justify-between">
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-700">
                                    <Info className="h-12 w-12" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Dato del día</h4>
                                    </div>
                                    <p className={`text-lg font-serif leading-relaxed italic mb-6 transition-all duration-300 ${isRefreshing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                                        "{SICA_FACTS[factIndex]}"
                                    </p>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="h-1 w-12 bg-emerald-500 rounded-full"></div>
                                            <p className="mt-4 text-[10px] text-emerald-300/60 uppercase tracking-widest font-bold">Observatorio Ambiental Regional (OAR)</p>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={handleShuffle}
                                            className="h-10 w-10 p-0 rounded-full bg-white/5 hover:bg-emerald-500 hover:text-white text-emerald-400 border-none transition-all duration-300 shadow-lg"
                                        >
                                            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Axis Content Inventory - EDUCATIVO/INFORMATIVO */}
            <div className="max-w-7xl mx-auto px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-16">
                        
                        {/* Section 1: Grandes Bosques de la Región */}
                        <section className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-serif font-black text-slate-800">
                                    Grandes Bosques de la <span className="text-emerald-600 italic">Región SICA</span>
                                </h2>
                                <Button 
                                    variant="link" 
                                    className="text-emerald-600 font-bold p-0 flex items-center gap-2"
                                    onClick={() => navigate('/grandes-bosques')}
                                >
                                    Ver catálogo completo <ArrowRight size={16} />
                                </Button>
                            </div>

                            {/* Grid de Bosques - Contenido Educativo */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { name: "Montañas Mayas", country: "Belice", img: "/forests/belize.png", slug: "montanas-mayas" },
                                    { name: "Biosfera Maya", country: "Guatemala", img: "/forests/guatemala.png", slug: "reserva-de-la-biosfera-maya" },
                                    { name: "El Imposible", country: "El Salvador", img: "/forests/el_salvador.png", slug: "parque-nacional-el-imposible" },
                                    { name: "Río Plátano", country: "Honduras", img: "/forests/honduras.png", slug: "reserva-de-la-biosfera-del-rio-platano" }
                                ].map((forest, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative h-48 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
                                        onClick={() => navigate(`/grandes-bosques/historias/${forest.slug}`)}
                                    >
                                        <img
                                            src={forest.img}
                                            alt={forest.name}
                                            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                        <div className="absolute top-4 left-4">
                                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-200 text-[8px] font-black uppercase tracking-widest">
                                                {forest.country}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 left-5 right-4">
                                            <h4 className="text-lg font-bold text-white leading-tight">{forest.name}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div 
                                onClick={() => navigate('/grandes-bosques')}
                                className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center gap-6"
                            >
                                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-emerald-900 mb-1">Bosques Transfronterizos e Iniciativas Regionales</h4>
                                    <p className="text-sm text-emerald-700/70 font-light leading-relaxed">
                                        Acceda a proyectos como la Selva Maya, Trinacional Trifinio y otros corredores biológicos.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Herramientas del Eje */}
                        <section className="space-y-8">
                            <h2 className="text-3xl font-serif font-black text-slate-800">
                                Herramientas de <span className="text-emerald-600 italic">Gestión Forestal</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ModuleCard 
                                    icon={Activity}
                                    title="Análisis Geoespacial"
                                    description="Herramientas de cruce espacial para la detección de cambios."
                                    path="/technical/geo-analysis"
                                    colorClass="bg-emerald-600 shadow-lg shadow-emerald-900/10"
                                    delay={100}
                                />
                                <ModuleCard 
                                    icon={LayoutDashboard}
                                    title="Tablero de KPIs"
                                    description="Seguimiento dinámico de metas ERAM y AFOLU."
                                    path="/technical/dashboard"
                                    colorClass="bg-blue-600 shadow-lg shadow-blue-500/10"
                                    delay={200}
                                />
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Questions Column */}
                    <div className="space-y-10">
                        <Card className="p-8 bg-slate-900 text-white rounded-[2.5rem] border-0 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full"></div>
                            
                            <h3 className="text-2xl font-serif font-black mb-6 relative z-10 flex items-center gap-3">
                                <HelpCircle className="text-emerald-400" /> Preguntas <span className="text-emerald-400">Críticas</span>
                            </h3>

                            <div className="space-y-4 relative z-10">
                                {[
                                    { q: "¿Cuál es el estado de los bosques en la región?", path: "/preguntas/estado-bosques" },
                                    { q: "¿Cuánta cobertura boscosa hemos perdido?", path: "/preguntas/perdida-bosque" },
                                    { q: "¿Cómo van las metas de conservación 30x30?", path: "/preguntas/meta-30x30" },
                                    { q: "¿Cuántos incendios están activos?", path: "/preguntas/incendios-activos" }
                                ].map((item, i) => (
                                    <div 
                                        key={i}
                                        onClick={() => navigate(item.path)}
                                        className="group p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-emerald-500 hover:border-emerald-400 transition-all cursor-pointer"
                                    >
                                        <p className="text-sm font-medium text-emerald-50/80 group-hover:text-white transition-colors">{item.q}</p>
                                    </div>
                                ))}
                            </div>

                            <Button 
                                className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                                onClick={() => navigate('/strategic-questions')}
                            >
                                Ver todas las preguntas
                            </Button>
                        </Card>

                        {/* Resource Library */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <BookOpen size={14} /> Biblioteca Forestal
                            </h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer group">
                                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-emerald-50 transition-colors"><FileText size={18} /></div>
                                    <span className="text-sm font-medium">Reporte FRA 2024 (.pdf)</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer group">
                                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-emerald-50 transition-colors"><MapIcon size={18} /></div>
                                    <span className="text-sm font-medium">Metadatos Capas Bosques</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Divider / Context */}
            <div className="max-w-7xl mx-auto px-8 pb-16">
                <div className="border-t border-slate-200 py-8 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    Observatorio Ambiental Regional (OAR) • Estrategia Regional Ambiental de Centroamérica y República Dominicana
                </div>
            </div>
        </div>
    );
};
