// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../lib/supabase';
// import { usePageTitle } from '../hooks/usePageTitle';

// const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

// const LoginPage = () => {
//   usePageTitle('Login');
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setMessage('');

//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) throw error;

//       if (data.user) {
//         if (data.user.email === ADMIN_EMAIL) {
//           navigate('/admin');
//         } else {
//           throw new Error('Sie haben keine Berechtigung für den Admin-Bereich.');
//         }
//       }
//     } catch (error: any) {
//       setMessage(error.message || 'Ein Fehler ist aufgetreten');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setMessage('');

//       if (email !== ADMIN_EMAIL) {
//         throw new Error('Nur der Administrator kann sich registrieren.');
//       }

//       const { error } = await supabase.auth.signUp({
//         email,
//         password,
//       });

//       if (error) throw error;

//       setMessage('Registrierung erfolgreich! Sie können sich jetzt einloggen.');
//     } catch (error: any) {
//       setMessage(error.message || 'Ein Fehler ist aufgetreten');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Admin-Bereich
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleLogin}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 E-Mail Adresse
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="E-Mail Adresse"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Passwort
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Passwort"
//               />
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
//             >
//               {loading ? 'Wird geladen...' : 'Einloggen'}
//             </button>
//             <button
//               type="button"
//               onClick={handleSignUp}
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300"
//             >
//               {loading ? 'Wird geladen...' : 'Registrieren'}
//             </button>
//           </div>
//         </form>

//         {message && (
//           <div className={`mt-4 p-4 rounded ${message.includes('erfolgreich') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
