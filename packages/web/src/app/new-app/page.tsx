'use client';

import { useFormState } from 'react-dom';
import { createApp } from './actions';

export default function NewApp() {
  const [state, formAction] = useFormState(createApp, null);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Nouvelle application</h1>
      
      <form action={formAction} className="max-w-md space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom de l&apos;application
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            URL de l&apos;application
          </label>
          <input
            type="url"
            id="url"
            name="url"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
            Icône de l&apos;application
          </label>
          <input
            type="text"
            id="icon"
            name="icon"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Créer l&apos;application
        </button>
      </form>

      {state && state.success && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          Application créée avec succès !
        </div>
      )}
    </main>
  );
} 