import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Badge } from '../../components/ui/Shared';
import { Users, UserPlus, Trash2, Shield, UserCheck, Globe, Calendar, Mail, Key } from 'lucide-react';
import { getSimulatedUsers, saveSimulatedUser, deleteSimulatedUser } from '../../utils/simulatedAuth';

export const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Simular Usuario'
    });

    useEffect(() => {
        setUsers(getSimulatedUsers());
    }, []);

    const handleCreateUser = (e) => {
        e.preventDefault();
        saveSimulatedUser(newUser);
        setUsers(getSimulatedUsers());
        setNewUser({ name: '', email: '', password: '', role: 'Simular Usuario' });
        setShowForm(false);
    };

    const handleDelete = (id) => {
        if (confirm('¿Está seguro de eliminar este usuario?')) {
            deleteSimulatedUser(id);
            setUsers(getSimulatedUsers());
        }
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'Administrador General': return <Badge variant="danger">{role}</Badge>;
            case 'Administrador Por eje': return <Badge variant="warning">{role}</Badge>;
            default: return <Badge variant="info">{role}</Badge>;
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-end border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-slate-900 flex items-center gap-3">
                        <Users className="h-10 w-10 text-brand-primary" />
                        Gestión de Usuarios
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg italic">
                        Módulo de administración simulado para prototipado
                    </p>
                </div>
                <Button 
                    onClick={() => setShowForm(!showForm)}
                    variant={showForm ? "outline" : "primary"}
                    className="flex gap-2"
                >
                    {showForm ? 'Cancelar' : <><UserPlus className="h-4 w-4" /> Crear Usuario</>}
                </Button>
            </div>

            {showForm && (
                <Card className="animate-in fade-in slide-in-from-top-4 duration-300 border-brand-primary/20 bg-brand-primary/5">
                    <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre Completo</label>
                                <Input 
                                    placeholder="Ej. Juan Pérez" 
                                    required 
                                    value={newUser.name}
                                    onChange={e => setNewUser({...newUser, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Correo Electrónico</label>
                                <Input 
                                    icon={Mail}
                                    type="email" 
                                    placeholder="juan@sica.int" 
                                    required 
                                    value={newUser.email}
                                    onChange={e => setNewUser({...newUser, email: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Contraseña</label>
                                <Input 
                                    icon={Key}
                                    type="password" 
                                    placeholder="••••••••" 
                                    required 
                                    value={newUser.password}
                                    onChange={e => setNewUser({...newUser, password: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Rol de Usuario</label>
                                <select 
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm py-2 px-3 border"
                                    value={newUser.role}
                                    onChange={e => setNewUser({...newUser, role: e.target.value})}
                                >
                                    <option>Simular Usuario</option>
                                    <option>Administrador General</option>
                                    <option>Administrador Por eje</option>
                                </select>
                            </div>
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <Button type="submit" className="w-full md:w-auto">
                                Guardar Usuario Simulado
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            <Card className="overflow-hidden p-0 border-none shadow-xl bg-slate-50/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900 text-white">
                                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Usuario</th>
                                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Rol</th>
                                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Metadatos de Acceso</th>
                                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{user.name}</div>
                                                <div className="text-sm text-slate-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getRoleBadge(user.role)}
                                    </td>
                                    <td className="px-6 py-4 space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-slate-600">
                                            <Calendar className="h-3 w-3" />
                                            Creado: {new Date(user.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
                                            <Globe className="h-3 w-3" />
                                            IP: {user.ip}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => handleDelete(user.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                                            title="Eliminar usuario"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500 italic">
                                        No hay usuarios simulados registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="flex flex-col items-center text-center p-8 bg-blue-50 border-blue-100">
                    <Shield className="h-12 w-12 text-brand-primary mb-4" />
                    <h3 className="font-bold text-slate-900">Seguridad Simulada</h3>
                    <p className="text-sm text-slate-600 mt-2">La persistencia se maneja en el almacenamiento local del navegador para demostración.</p>
                </Card>
                <Card className="flex flex-col items-center text-center p-8 bg-green-50 border-green-100">
                    <UserCheck className="h-12 w-12 text-brand-secondary mb-4" />
                    <h3 className="font-bold text-slate-900">Roles Activos</h3>
                    <p className="text-sm text-slate-600 mt-2">Los roles determinan qué módulos son visibles en el portal técnico.</p>
                </Card>
                <Card className="flex flex-col items-center text-center p-8 bg-amber-50 border-amber-100">
                    <Globe className="h-12 w-12 text-amber-600 mb-4" />
                    <h3 className="font-bold text-slate-900">Trazabilidad</h3>
                    <p className="text-sm text-slate-600 mt-2">Se registra automáticamente la IP y fecha de creación de cada cuenta simulada.</p>
                </Card>
            </div>
        </div>
    );
};
