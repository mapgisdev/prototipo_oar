import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { MessageSquare, X, Send, Bot, User, Search, HelpCircle, Database, ChevronUp, ChevronDown, Lightbulb, Wrench, Info, Trash2, WifiOff, ExternalLink } from 'lucide-react';
import { Card, Button, ViewGuideModal } from '../ui/Shared';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

// Carga dinámica de todos los archivos .md en la carpeta answer_ia
const IA_CONTEXT_FILES = import.meta.glob('../../pages/questions/answers/answer_ia/*.md', { query: '?raw', eager: true });

const API_KEY = "8e539cd5095a459a82b5cb805e793fcb.mkCYrEsUv6COyzr3";
const API_URL = "https://api.z.ai/api/paas/v4/chat/completions";
const MODEL = "GLM-4.7-Flash";

const STORAGE_KEY = 'oar-chatbot-messages';
const MAX_HISTORY_MESSAGES = 20; // Máximo de mensajes enviados a la API (últimos 10 pares user/bot)
const API_TIMEOUT_MS = 30000; // 30 segundos de timeout

const DEFAULT_MESSAGE = { id: 1, sender: 'bot', text: 'Hola, soy el asistente IA del OAR. He procesado toda la información institucional para resolver tus dudas de forma clara y formal.' };

/** Fix #2: Escapa caracteres HTML peligrosos para prevenir XSS */
const escapeHtml = (text) => {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

/** Formatea texto plano de la IA a HTML legible con rutas clickeables, negritas y listas */
const formatMessageHtml = (text) => {
    return escapeHtml(text)
        // Negritas
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        // Rutas internas clickeables: detecta /ruta/sub-ruta
        .replace(/(\/(?:preguntas|analisis|strategic|mapa|dashboard|admin)[a-zA-Z0-9\-\/]*)/g,
            '<a class="oar-route-link" data-route="$1" href="#" style="display:inline-flex;align-items:center;gap:4px;background:linear-gradient(135deg,#1e40af15,#3b82f615);color:#1e40af;padding:4px 12px;border-radius:999px;font-size:0.75rem;font-weight:700;margin:4px 0;text-decoration:none;border:1px solid #1e40af30;cursor:pointer;transition:all 0.2s">📍 $1 →</a>'
        )
        // Listas numeradas
        .replace(/^(\d+)\.\s+(.+)$/gm, '<div style="margin-left:1rem;margin-bottom:0.35rem;padding-left:0.5rem;border-left:2px solid #3b82f640">$1. $2</div>')
        // Listas con viñetas
        .replace(/^[-•]\s+(.+)$/gm, '<div style="margin-left:1rem;margin-bottom:0.35rem;padding-left:0.5rem;border-left:2px solid #10b98140">• $1</div>')
        // Saltos de línea
        .replace(/\n/g, '<br>');
};

/** Fix #5: Carga mensajes guardados en localStorage */
const loadMessages = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {
        console.warn('Chatbot: Error al cargar historial:', e);
    }
    return [DEFAULT_MESSAGE];
};

/** Fix #5: Guarda mensajes en localStorage */
const saveMessages = (messages) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
        console.warn('Chatbot: Error al guardar historial:', e);
    }
};

export const Chatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isGuideOpen, setIsGuideOpen] = useState(false);
    const [messages, setMessages] = useState(loadMessages); // Fix #5: carga desde localStorage
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine); // Fix #6: estado de conexión
    const messagesEndRef = useRef(null);
    const abortControllerRef = useRef(null); // Fix #4: referencia para cancelar peticiones
    const inputRef = useRef(null); // Fix #7: referencia al input para focus en móvil
    const navigate = useNavigate();
    const location = useLocation();

    // Cerrar menú al navegar
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Fix #5: Persistir mensajes cuando cambian
    useEffect(() => {
        saveMessages(messages);
    }, [messages]);

    // Fix #6: Detectar cambios en la conexión de red
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Fix #7: Ajustar altura del chat en móvil cuando aparece el teclado virtual
    const [chatHeight, setChatHeight] = useState('70vh');
    useEffect(() => {
        if (!isChatOpen) return;
        const vv = window.visualViewport;
        if (!vv) return;

        const handleResize = () => {
            // Cuando el teclado aparece, la viewport se reduce
            const viewportHeight = vv.height;
            const maxChatHeight = Math.min(viewportHeight - 120, 500); // 120px para el FAB y margen
            setChatHeight(`${Math.max(maxChatHeight, 250)}px`);
        };

        handleResize(); // Calcular al abrir
        vv.addEventListener('resize', handleResize);
        return () => vv.removeEventListener('resize', handleResize);
    }, [isChatOpen]);

    // Fix #4: Cancelar petición pendiente al desmontar
    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isChatOpen) scrollToBottom();
    }, [messages, isTyping, isChatOpen]);

    // Contexto cacheado: se construye UNA SOLA VEZ al montar el componente
    const systemContext = useMemo(() => {
        let contextText = "Eres el Asistente Inteligente del Observatorio Ambiental Regional (OAR).\n";
        contextText += "Tu personalidad es cálida, profesional y cercana. Usas un tono amigable pero informativo.\n";
        contextText += "Tu misión es ayudar a ciudadanos sin conocimientos técnicos a entender información ambiental.\n";
        contextText += "Debes basar tus respuestas EXCLUSIVAMENTE en el catálogo de Respuestas Conceptuales proporcionado.\n\n";
        contextText += "REGLAS DE FORMATO Y ESTILO:\n";
        contextText += "1. Responde siempre en español, con tono profesional pero cercano.\n";
        contextText += "2. Usa emojis temáticos al inicio de tus respuestas para hacerlas visualmente atractivas (🔥🌲💧🌎🏔️📊🐾🌿🛡️📍).\n";
        contextText += "3. Estructura tus respuestas con negritas (**texto**) para resaltar datos clave.\n";
        contextText += "4. Cuando menciones rutas del portal, escríbelas EXACTAMENTE como aparecen (ej: /preguntas/incendios-activos), el sistema las convertirá en enlaces clickeables automáticamente.\n";
        contextText += "5. Siempre que sea relevante, sugiere al usuario visitar una sección del portal incluyendo la ruta.\n";
        contextText += "6. Menciona datos específicos (porcentajes, hectáreas, especies) si están disponibles.\n";
        contextText += "7. Sé conciso pero informativo. Máximo 3-4 párrafos por respuesta.\n";
        contextText += "8. Si el usuario pregunta algo fuera de tu conocimiento, sugiere amablemente temas que sí conoces.\n";
        contextText += "9. Termina tus respuestas con una frase que invite a seguir explorando.\n\n";
        contextText += "CATÁLOGO DE RESPUESTAS CONCEPTUALES:\n";

        Object.entries(IA_CONTEXT_FILES).forEach(([path, content]) => {
            contextText += `\n--- DOCUMENTO: ${path.split('/').pop()} ---\n${content.default || content}\n`;
        });

        console.log("Chatbot: Contexto del sistema cacheado.", contextText.length, "caracteres");
        return contextText;
    }, []);

    // Fix #9: Limpiar conversación y reiniciar
    const handleClearChat = useCallback(() => {
        abortControllerRef.current?.abort();
        setIsTyping(false);
        setMessages([DEFAULT_MESSAGE]);
        setInput('');
    }, []);

    // Intercepta clicks en rutas generadas dinámicamente dentro de los mensajes
    const handleMessageClick = useCallback((e) => {
        const routeLink = e.target.closest('.oar-route-link');
        if (routeLink) {
            e.preventDefault();
            e.stopPropagation();
            const route = routeLink.getAttribute('data-route');
            if (route) {
                navigate(route);
                setIsChatOpen(false);
            }
        }
    }, [navigate]);

    const handleSend = async () => {
        console.log("Chatbot: Intentando enviar mensaje...", { input, isTyping });
        if (!input.trim() || isTyping) return;

        // Fix #6: Verificar conexión antes de intentar enviar
        if (!navigator.onLine) {
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: 'bot',
                text: '⚠️ No tienes conexión a internet. Verifica tu red e intenta nuevamente.'
            }]);
            return;
        }

        const currentInput = input.trim();
        const userMsg = { id: Date.now(), sender: 'user', text: currentInput };

        // Actualizar UI inmediatamente
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Fix #4: Crear AbortController con timeout
        abortControllerRef.current?.abort(); // Cancelar petición anterior si existe
        const controller = new AbortController();
        abortControllerRef.current = controller;
        const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

        try {
            // Fix #3: Limitar historial a los últimos N mensajes para no exceder tokens
            const recentMessages = messages
                .slice(-MAX_HISTORY_MESSAGES)
                .map(m => ({
                    role: m.sender === 'user' ? 'user' : 'assistant',
                    content: m.text
                }));

            console.log("Chatbot: Usando contexto cacheado (", systemContext.length, "chars),", recentMessages.length, "mensajes de historial");
            console.log("Chatbot: Llamando a la API de Z.ai...");

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: [
                        { role: 'system', content: systemContext },
                        ...recentMessages,
                        { role: 'user', content: currentInput }
                    ],
                    temperature: 0.3
                }),
                signal: controller.signal // Fix #4: Señal de cancelación
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Chatbot: Error de API:", response.status, errorData);
                throw new Error(errorData.error?.message || `Error HTTP ${response.status}`);
            }

            const data = await response.json();
            console.log("Chatbot: Respuesta recibida con éxito");
            console.log("Chatbot: Respuesta completa:", JSON.stringify(data, null, 2));
            const botResponse = data.choices?.[0]?.message?.content
                || "No se recibió una respuesta válida de la IA.";

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'bot',
                text: botResponse
            }]);
        } catch (error) {
            // Fix #4: Distinguir entre cancelación/timeout y errores reales
            if (error.name === 'AbortError') {
                console.warn("Chatbot: Petición cancelada o timeout alcanzado");
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: '⏱️ La petición tardó demasiado y fue cancelada. Intenta de nuevo con una pregunta más corta.'
                }]);
            } else {
                console.error("Chatbot: Error en handleSend:", error);
                // Fix #6: Mensaje adaptado según si es error de red
                const isNetworkError = error.message?.includes('fetch') || error.message?.includes('network') || !navigator.onLine;
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: isNetworkError
                        ? '🌐 Error de conexión. Verifica tu internet e intenta nuevamente.'
                        : `Lo siento, hubo un error: ${error.message}. Verifica tu conexión o revisa la consola del navegador (F12).`
                }]);
            }
        } finally {
            clearTimeout(timeoutId);
            abortControllerRef.current = null;
            setIsTyping(false);
        }
    };


    const handleSearchClick = () => {
        window.dispatchEvent(new Event('oar-open-search'));
        setIsMenuOpen(false);
    };

    const menuItems = [
        {
            id: 'search',
            label: 'Búsqueda Global',
            icon: Search,
            color: 'bg-slate-900',
            action: handleSearchClick
        },
        {
            id: 'questions',
            label: 'Preguntas Estratégicas',
            icon: HelpCircle,
            color: 'bg-emerald-600',
            action: () => navigate('/strategic-questions')
        },
        {
            id: 'analysis',
            label: 'Cruce de Variables',
            icon: Database,
            color: 'bg-brand-primary',
            action: () => navigate('/analisis-multidimensional')
        },
        /*
        { 
            id: 'guide', 
            label: 'Guía de esta Vista', 
            icon: Lightbulb, 
            color: 'bg-amber-500', 
            action: () => {
                setIsGuideOpen(true);
                setIsMenuOpen(false);
            } 
        },
        */
        {
            id: 'chat',
            label: 'Asistente IA',
            icon: Bot,
            color: 'bg-blue-600',
            action: () => {
                setIsChatOpen(true);
                setIsMenuOpen(false);
            }
        }
    ];

    return (
        <>
            {/* Multi-Function FAB Menu */}
            <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[950] flex flex-col items-end gap-3">
                {/* Menu Options (Slide up) */}
                <div className={cn(
                    "flex flex-col items-end gap-3 transition-all duration-300 transform",
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                )}>
                    {menuItems.map((item, idx) => (
                        <div key={item.id} className="flex items-center gap-3 group">
                            <span className="bg-white px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold text-slate-700 border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.label}
                            </span>
                            <button
                                onClick={item.action}
                                className={cn(
                                    "p-3 text-white rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center",
                                    item.color
                                )}
                                title={item.label}
                            >
                                <item.icon className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Main Trigger Button (Tools Style) */}
                <button
                    onClick={() => {
                        if (isChatOpen) setIsChatOpen(false);
                        else setIsMenuOpen(!isMenuOpen);
                    }}
                    className={cn(
                        "p-4 text-white rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center",
                        isChatOpen || isMenuOpen ? "bg-slate-800" : "bg-brand-primary"
                    )}
                >
                    {isChatOpen || isMenuOpen ? <X className="h-6 w-6" /> : <Info className="h-6 w-6" />}
                </button>
            </div>

            {/* FAB Left: Guía de esta Vista */}
            <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[950] flex flex-col items-start gap-3">
                <button
                    onClick={() => setIsGuideOpen(true)}
                    className="p-4 bg-amber-500 text-white rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
                    title="Guía de esta Vista"
                >
                    <Lightbulb className="h-6 w-6" />
                    <span className="absolute left-16 bg-white px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold text-slate-700 border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Guía de esta Vista
                    </span>
                </button>
            </div>

            {/* Chat Window — Fix #7: altura adaptable al teclado virtual */}
            {isChatOpen && (
                <div
                    className="fixed bottom-24 right-4 w-[90vw] max-w-sm z-[960] flex flex-col font-sans transition-all duration-300 animate-in fade-in slide-in-from-bottom-8"
                    style={{ height: chatHeight, maxHeight: 'calc(100dvh - 120px)' }}
                >
                    <Card className="h-full flex flex-col shadow-2xl border-0 overflow-hidden rounded-[2rem]">
                        {/* Header — Fix #9: botón limpiar conversación */}
                        <div className="bg-brand-primary p-5 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-xl">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Asistente OAR</h3>
                                    <p className="text-[10px] text-blue-200 flex items-center gap-1">
                                        <span className={cn(
                                            "w-1.5 h-1.5 rounded-full",
                                            isOnline ? "bg-green-400 animate-pulse" : "bg-red-400"
                                        )}></span>
                                        {isOnline ? 'En línea' : 'Sin conexión'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                {/* Fix #9: Botón limpiar conversación */}
                                <button
                                    onClick={handleClearChat}
                                    className="bg-white/10 p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                                    title="Limpiar conversación"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <button onClick={() => setIsChatOpen(false)} className="bg-white/10 p-1.5 rounded-lg hover:bg-white/20 transition-colors">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Fix #6: Banner de sin conexión */}
                        {!isOnline && (
                            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2 text-amber-700 text-xs font-medium">
                                <WifiOff className="h-3.5 w-3.5 flex-shrink-0" />
                                <span>Sin conexión a internet. Los mensajes no se enviarán hasta que vuelvas a conectarte.</span>
                            </div>
                        )}

                        {/* Messages Area — click en rutas delegado al contenedor */}
                        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4" onClick={handleMessageClick}>
                            {messages.map((msg) => (
                                <div key={msg.id} className={cn("flex gap-2", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                                    {msg.sender === 'bot' && (
                                        <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Bot className="h-4 w-4 text-brand-primary" />
                                        </div>
                                    )}

                                    <div className={cn(
                                        "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                                        msg.sender === 'user'
                                            ? "bg-brand-primary text-white rounded-br-none"
                                            : "bg-white text-slate-700 border border-slate-200 rounded-bl-none"
                                    )}>
                                        {/* Fix #2: Texto sanitizado con escapeHtml antes de formatear */}
                                        <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatMessageHtml(msg.text) }}></p>

                                        {msg.action && (
                                            <button
                                                onClick={() => navigate(msg.action.path)}
                                                className="mt-2 text-xs bg-brand-primary/10 text-brand-primary px-3 py-1.5 rounded-full font-bold hover:bg-brand-primary/20 transition-colors w-full text-left"
                                            >
                                                → {msg.action.text}
                                            </button>
                                        )}
                                    </div>

                                    {msg.sender === 'user' && (
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                                            <User className="h-4 w-4 text-slate-500" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-2 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Bot className="h-4 w-4 text-brand-primary" />
                                    </div>
                                    <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                                    placeholder={isOnline ? "Escribe tu pregunta..." : "Sin conexión..."}
                                    disabled={!isOnline}
                                    className="flex-1 bg-slate-100 border-0 rounded-full px-5 py-2.5 text-sm focus:ring-2 focus:ring-brand-primary/20 outline-none disabled:opacity-50"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping || !isOnline}
                                    className="p-2.5 bg-brand-primary text-white rounded-full hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
            {/* View Guide Modal */}
            <ViewGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
        </>
    );
};
