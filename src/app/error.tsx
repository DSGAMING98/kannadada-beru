"use client";
import { useEffect } from "react";
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) { useEffect(() => { console.error(error); }, [error]); return <section className="shell state-page"><p className="eyebrow">Something went wrong</p><h1 lang="kn">ಸ್ವಲ್ಪ ತೊಂದರೆ ಆಯಿತು</h1><p>The page could not be loaded. Your data has not been changed.</p><button className="button button-primary" onClick={reset}>Try again</button></section>; }
