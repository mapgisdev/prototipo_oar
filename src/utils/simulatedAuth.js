
const USERS_KEY = 'oar_simulated_users';

export const getSimulatedUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [
        {
            id: 'admin-001',
            email: 'admin@oar.sica',
            name: 'Administrador Maestro',
            role: 'Administrador General',
            createdAt: new Date().toISOString(),
            ip: '192.168.1.1',
            password: 'admin'
        }
    ];
};

export const saveSimulatedUser = (user) => {
    const users = getSimulatedUsers();
    const newUser = {
        ...user,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        ip: `190.23.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
};

export const deleteSimulatedUser = (id) => {
    const users = getSimulatedUsers();
    const filtered = users.filter(u => u.id !== id);
    localStorage.setItem(USERS_KEY, JSON.stringify(filtered));
};

export const authenticateSimulatedUser = (email, password) => {
    const users = getSimulatedUsers();
    return users.find(u => u.email === email && u.password === password);
};
