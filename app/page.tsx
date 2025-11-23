import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Guest from './components/Guests';

export default async function Home() {
  const user = await currentUser();

  // Si el usuario está autenticado, redirigir a /linea1
  if (user) {
    redirect('/linea1');
  }

  // Si no está autenticado, mostrar la página de invitados
  return <Guest />;
}
