import React, { useState } from 'react';
import { Card, Button, Input } from '../../components/ui/Shared';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { authenticateSimulatedUser } from '../../utils/simulatedAuth';

export const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate network latency
        setTimeout(() => {
            const user = authenticateSimulatedUser(formData.email, formData.password);
            
            if (user) {
                onLogin({ 
                    name: user.name, 
                    role: user.role === 'Administrador General' ? 'admin' : 'user', 
                    simulatedRole: user.role,
                    department: "SICA Regional",
                    ip: user.ip,
                    createdAt: user.createdAt
                });
                setLoading(false);
                navigate('/technical/dashboard');
            } else {
                setError('Credenciales inválidas. Verifique su correo y contraseña.');
                setLoading(false);
            }
        }, 1200);
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="text-center">
                    <div className="inline-flex p-4 bg-white rounded-2xl shadow-xl mb-6 transform hover:rotate-3 transition-transform">
                        <span className="text-5xl">🌿</span>
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">
                        Acceso Regional
                    </h2>
                    <p className="mt-2 text-slate-500 font-medium italic">
                        Sistema Regional de Información Ambiental (OAR)
                    </p>
                </div>

                <Card className="mt-8 space-y-6 shadow-2xl border-white/50 backdrop-blur-sm bg-white/80">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-md flex items-center gap-2 text-red-600 text-sm animate-shake">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}
                    
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Correo Institucional
                                </label>
                                <Input 
                                    icon={Mail} 
                                    type="email" 
                                    placeholder="usuario@sica.int" 
                                    required 
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    className="bg-white/50 focus:bg-white transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Contraseña
                                </label>
                                <Input 
                                    icon={Lock} 
                                    type="password" 
                                    placeholder="••••••••" 
                                    required 
                                    value={formData.password}
                                    onChange={e => setFormData({...formData, password: e.target.value})}
                                    className="bg-white/50 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-slate-300 rounded cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer">
                                    Recordarme
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-semibold text-brand-primary hover:text-blue-800 transition-colors">
                                    ¿Olvidó su clave?
                                </a>
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            variant="primary" 
                            className="w-full py-3 text-lg font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all" 
                            isLoading={loading}
                        >
                            {loading ? 'Autenticando...' : 'Ingresar al Portal'}
                        </Button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-3 bg-white text-slate-400 uppercase tracking-widest font-bold">
                                    ID Federado
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full text-xs font-bold border-slate-200 hover:border-brand-primary/50">SICA SSO</Button>
                            <Button variant="outline" className="w-full text-xs font-bold border-slate-200 hover:border-brand-primary/50">M365 AUTH</Button>
                        </div>
                    </div>
                </Card>
                
                <p className="text-center text-xs text-slate-400 mt-8">
                    Uso exclusivo para personal técnico y administrativo autorizado.
                    <br />
                    © 2026 Observatorio Ambiental Regional
                </p>
            </div>
        </div>
    );
};
