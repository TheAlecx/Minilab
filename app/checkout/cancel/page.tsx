import Link from "next/link";

export default function CancelPage() {
    return (
        <main className="mx-auto max-w-2xl p-8 text-center">
            <h1 className="mb-4 text-3xl font-bold text-red-600">Paiement Annulé</h1>
            <p className="mb-6 text-gray-700">Votre paiement a été annulé. Vous pouvez réessayer ou revenir à la page d'accueil.</p>
            <Link
                href="/cart"
                className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
                Revenir au panier
            </Link>
        </main>
    );
}