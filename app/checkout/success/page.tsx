import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import type Stripe from "stripe";

type SuccessPageProps = {
    searchParams: {
        session_id?: string;
    }
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
    const { session_id } = searchParams;

    if (!session_id) {
        redirect("/cart");
    }
    let session: Stripe.Checkout.Session;
    try {
        session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items.data.price.product"],
        });
    } catch (error) {
        console.error("Error retrieving session:", error);
        redirect("/cart");
    }
    if (session.payment_status !== "paid") {
        redirect("/cart");
    }

    const total = (session.amount_total ?? 0) / 100;

    return (
        <main className="mx-auto max-w-2xl p-8">
            <section className="mb-6 rounded-lg border-2 border-green-500 bg-green-50 p-6">
                <h1 className="mb-2 text-3xl font-bold text-green-800">Paiment confirme</h1>
                <p className="mb-4 text-green-700">Votre paiement de {''} < strong >{ total . toFixed (2) } $ CAD </ strong > a ete confirme .</p>
            </section>
            <section className="mb-6 rounded-lg border bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">Details de votre commande</h2>
                <dl className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                        <dt className="font-medium">Sous-total :</dt>
                        <dd className="break-all font-mono">{session.id}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt className="text-gray-600">Email :</dt>
                        <dd>{session.customer_details?.email ?? "N/A"}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt className="text-gray-600">Panier :</dt>
                        <dd className="font-mono">{session.metadata?.cartId ?? "-"}</dd>
                    </div>
                </dl>
            </section>

            <Link
                href="/"
                className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                Retour a l'accueil
                </Link>
        </main>
    );
}