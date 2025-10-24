/**
 * Localization Context
 * Manages language switching and translations
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { SupportedLanguage } from '../types';
import { storage } from '../services/storage';

interface LocaleState {
  language: SupportedLanguage;
  isLoading: boolean;
}

type LocaleAction =
  | { type: 'SET_LANGUAGE'; payload: SupportedLanguage }
  | { type: 'SET_LOADING'; payload: boolean };

interface LocaleContextType extends LocaleState {
  changeLanguage: (language: SupportedLanguage) => Promise<void>;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const initialState: LocaleState = {
  language: 'en',
  isLoading: true,
};

const localeReducer = (state: LocaleState, action: LocaleAction): LocaleState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload, isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

// Translation dictionaries
const translations = {
  en: {
    // Welcome Screen
    'welcome.title': 'Simplify Your Parenting Journey',
    'welcome.subtitle': 'The all-in-one app for your family\'s memories and daily schedule.',
    'welcome.getStarted': 'Get Started',
    'welcome.logIn': 'Log In',
    'welcome.journaling': 'Journaling',
    'welcome.calendar': 'Calendar',
    'welcome.toDoLists': 'To-Do Lists',
    
    // Login Screen
    'login.title': 'Your partner in parenting',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.forgotPassword': 'Forgot Password?',
    'login.logIn': 'Log In',
    'login.signUp': 'Sign Up',
    'login.continueWith': 'Or continue with',
    'login.continueAsGuest': 'Continue as Guest',
    'login.terms': 'By continuing, you agree to our',
    'login.termsLink': 'Terms of Service',
    'login.privacyLink': 'Privacy Policy',
    
    // Journal Dashboard
    'journal.timeline': 'Interactive Timeline',
    'journal.growthTrends': 'Growth Trends & Milestones',
    'journal.milestoneSuggestions': 'Milestone Suggestions',
    'journal.readMore': 'Read more',
    'journal.viewSummaries': 'View Summaries',
    'journal.reflectProgress': 'Reflect on Your Progress',
    'journal.aiInsights': 'Get AI-powered insights into your family\'s growth.',
    'journal.celebrateVictories': 'Celebrate small victories, like a new skill learned!',
    'journal.documentMoment': 'Document a funny family moment.',
    
    // New Journal Entry
    'entry.writeAboutDay': 'Write about your day...',
    'entry.saveEntry': 'Save Entry',
    
    // AI Insights
    'insights.title': 'Weekly Insights',
    'insights.learnMore': 'Learn More',
    'insights.seeDetails': 'See Details',
    'insights.noInsights': 'No Insights Yet',
    'insights.checkBack': 'Check back next week for your AI-powered insights!',
    
    // Parent Profile
    'profile.dashboard': 'Parenting Dashboard',
    'profile.edit': 'Edit',
    'profile.name': 'Name',
    'profile.language': 'Language',
    'profile.saveChanges': 'Save Changes',
    
    // Child Profile
    'child.dashboard': 'Dashboard',
    'child.totalPoints': 'Total Points',
    'child.nextReward': 'Next reward at',
    'child.points': 'points!',
    'child.chores': 'Chores',
    'child.completed': 'Completed',
    'child.dragChores': 'Drag chores here to complete!',
    'child.family': 'Family',
    
    // Chores List
    'chores.garden': 'My Garden',
    'chores.all': 'All',
    'chores.mom': 'Mom',
    'chores.dad': 'Dad',
    'chores.child1': 'Child 1',
    'chores.child2': 'Child 2',
    'chores.toGrow': 'To Grow',
    'chores.bloomed': 'Bloomed',
    'chores.gardenProgress': 'Garden Progress',
    'chores.dueToday': 'Due: Today',
    'chores.dueTomorrow': 'Due: Tomorrow',
    
    // Settings
    'settings.title': 'Settings',
    'settings.notifications': 'Notifications',
    'settings.account': 'Account',
    'settings.theme': 'Theme',
    'settings.about': 'About',
    'settings.helpSupport': 'Help & Support',
    'settings.logOut': 'Log Out',
  },
  es: {
    // Welcome Screen
    'welcome.title': 'Simplifica tu Viaje de Paternidad',
    'welcome.subtitle': 'La aplicación todo-en-uno para los recuerdos y horarios diarios de tu familia.',
    'welcome.getStarted': 'Comenzar',
    'welcome.logIn': 'Iniciar Sesión',
    'welcome.journaling': 'Diario',
    'welcome.calendar': 'Calendario',
    'welcome.toDoLists': 'Listas de Tareas',
    
    // Login Screen
    'login.title': 'Tu compañero en la paternidad',
    'login.email': 'Correo Electrónico',
    'login.password': 'Contraseña',
    'login.forgotPassword': '¿Olvidaste tu contraseña?',
    'login.logIn': 'Iniciar Sesión',
    'login.signUp': 'Registrarse',
    'login.continueWith': 'O continuar con',
    'login.continueAsGuest': 'Continuar como Invitado',
    'login.terms': 'Al continuar, aceptas nuestros',
    'login.termsLink': 'Términos de Servicio',
    'login.privacyLink': 'Política de Privacidad',
    
    // Journal Dashboard
    'journal.timeline': 'Línea de Tiempo Interactiva',
    'journal.growthTrends': 'Tendencias de Crecimiento y Hitos',
    'journal.milestoneSuggestions': 'Sugerencias de Hitos',
    'journal.readMore': 'Leer más',
    'journal.viewSummaries': 'Ver Resúmenes',
    'journal.reflectProgress': 'Reflexiona sobre tu Progreso',
    'journal.aiInsights': 'Obtén insights impulsados por IA sobre el crecimiento de tu familia.',
    'journal.celebrateVictories': '¡Celebra pequeñas victorias, como una nueva habilidad aprendida!',
    'journal.documentMoment': 'Documenta un momento divertido familiar.',
    
    // New Journal Entry
    'entry.writeAboutDay': 'Escribe sobre tu día...',
    'entry.saveEntry': 'Guardar Entrada',
    
    // AI Insights
    'insights.title': 'Insights Semanales',
    'insights.learnMore': 'Aprender Más',
    'insights.seeDetails': 'Ver Detalles',
    'insights.noInsights': 'Aún No Hay Insights',
    'insights.checkBack': '¡Vuelve la próxima semana para tus insights impulsados por IA!',
    
    // Parent Profile
    'profile.dashboard': 'Panel de Paternidad',
    'profile.edit': 'Editar',
    'profile.name': 'Nombre',
    'profile.language': 'Idioma',
    'profile.saveChanges': 'Guardar Cambios',
    
    // Child Profile
    'child.dashboard': 'Panel',
    'child.totalPoints': 'Puntos Totales',
    'child.nextReward': 'Próxima recompensa en',
    'child.points': 'puntos!',
    'child.chores': 'Tareas',
    'child.completed': 'Completado',
    'child.dragChores': '¡Arrastra las tareas aquí para completarlas!',
    'child.family': 'Familia',
    
    // Chores List
    'chores.garden': 'Mi Jardín',
    'chores.all': 'Todos',
    'chores.mom': 'Mamá',
    'chores.dad': 'Papá',
    'chores.child1': 'Niño 1',
    'chores.child2': 'Niño 2',
    'chores.toGrow': 'Por Crecer',
    'chores.bloomed': 'Florecido',
    'chores.gardenProgress': 'Progreso del Jardín',
    'chores.dueToday': 'Vence: Hoy',
    'chores.dueTomorrow': 'Vence: Mañana',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.notifications': 'Notificaciones',
    'settings.account': 'Cuenta',
    'settings.theme': 'Tema',
    'settings.about': 'Acerca de',
    'settings.helpSupport': 'Ayuda y Soporte',
    'settings.logOut': 'Cerrar Sesión',
  },
};

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(localeReducer, initialState);

  // Load language preference on mount
  useEffect(() => {
    loadLanguagePreference();
  }, []);

  const loadLanguagePreference = async () => {
    try {
      const savedLanguage = await storage.getLanguage();
      if (savedLanguage) {
        dispatch({ type: 'SET_LANGUAGE', payload: savedLanguage as SupportedLanguage });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const changeLanguage = async (language: SupportedLanguage): Promise<void> => {
    try {
      await storage.storeLanguage(language);
      dispatch({ type: 'SET_LANGUAGE', payload: language });
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const t = (key: string): string => {
    const translation = translations[state.language][key as keyof typeof translations[typeof state.language]];
    return translation || key;
  };

  const value: LocaleContextType = {
    ...state,
    changeLanguage,
    t,
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
