import Link from "next/link";
import { WifiOff } from "lucide-react";

export const metadata = { title: "Offline" };
export default function OfflinePage() { return <section className="shell state-page"><WifiOff aria-hidden="true" /><p className="eyebrow">Offline mode</p><h1 lang="kn">ಸಂಪರ್ಕ ಸಿಗಲಿಲ್ಲ</h1><p>You are offline. Saved pages remain available, while maps and dictionary sections you have not opened yet need a connection.</p><Link className="button button-primary" href="/">Return home</Link></section>; }
