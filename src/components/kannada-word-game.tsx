"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Gamepad2, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { PronounceButton } from "@/components/pronounce-button";
import { useInterfaceLanguage } from "@/components/interface-language";
import { vocabularyRecords } from "@/lib/vocabulary";
import { createWordGame } from "@/lib/word-game";

const TOTAL_ROUNDS = 10;

export function KannadaWordGame() {
  const language = useInterfaceLanguage();
  const [seed, setSeed] = useState(20261017);
  const [rounds, setRounds] = useState(() => createWordGame(vocabularyRecords, seed, TOTAL_ROUNDS));
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const round = rounds[roundIndex];

  function choose(option: string) {
    if (selected) return;
    setSelected(option);
    if (option === round.answer) {
      const nextStreak = streak + 1;
      setScore((value) => value + 10 + streak * 2);
      setCorrectCount((value) => value + 1);
      setStreak(nextStreak);
      setBestStreak((value) => Math.max(value, nextStreak));
    } else {
      setStreak(0);
    }
  }

  function nextRound() {
    if (roundIndex + 1 >= rounds.length) {
      setFinished(true);
      return;
    }
    setRoundIndex((value) => value + 1);
    setSelected(null);
  }

  function restart() {
    const nextSeed = seed + 1;
    setSeed(nextSeed);
    setRounds(createWordGame(vocabularyRecords, nextSeed, TOTAL_ROUNDS));
    setRoundIndex(0);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setBestStreak(0);
    setSelected(null);
    setFinished(false);
  }

  if (finished) {
    return <section className="shell game-workspace"><div className="game-finish"><Sparkles aria-hidden="true" /><p className="eyebrow">{language === "kn" ? "ಆಟ ಮುಗಿಯಿತು" : "Round complete"}</p><h2>{score} {language === "kn" ? "ಅಂಕಗಳು" : "points"}</h2><p>{language === "kn" ? `ಸರಿಯಾದ ಉತ್ತರಗಳು: ${correctCount}/${rounds.length} · ಅತ್ಯುತ್ತಮ ಸರಣಿ: ${bestStreak}. ಪ್ರತಿಯೊಂದು ಪ್ರಯತ್ನವೂ ಮತ್ತೊಂದು ಪದವನ್ನು ನೆನಪಿನಲ್ಲಿ ಬೇರೂರಿಸುತ್ತದೆ.` : `Correct answers: ${correctCount}/${rounds.length} · Best streak: ${bestStreak}. Every attempt helps another Kannada word take root.`}</p><div className="game-finish-actions"><button className="button button-primary" type="button" onClick={restart}><RotateCcw size={17} />{language === "kn" ? "ಮತ್ತೆ ಆಡಿ" : "Play again"}</button><Link className="text-link" href="/dictionary">{language === "kn" ? "ಪದಸಾಗರ ಅನ್ವೇಷಿಸಿ" : "Explore the dictionary"} <ArrowRight size={16} /></Link></div><small>{language === "kn" ? "ಪ್ರತಿ ಸರಿಯಾದ ಉತ್ತರಕ್ಕೆ 10 ಅಂಕಗಳು; ಮುಂದುವರಿದ ಸರಣಿಗೆ ಹೆಚ್ಚುವರಿ ಅಂಕಗಳು." : "Each correct answer earns 10 points, with bonus points for a continuing streak."}</small></div></section>;
  }

  const isCorrect = selected === round.answer;
  return (
    <section className="shell game-workspace" aria-labelledby="game-question">
      <div className="game-scorebar">
        <div><span>{language === "kn" ? "ಪ್ರಶ್ನೆ" : "Question"}</span><strong>{roundIndex + 1}/{rounds.length}</strong></div>
        <div><span>{language === "kn" ? "ಅಂಕ" : "Score"}</span><strong>{score}</strong></div>
        <div><span>{language === "kn" ? "ಸರಣಿ" : "Streak"}</span><strong>🔥 {streak}</strong></div>
      </div>
      <div className="game-progress" aria-hidden="true"><span style={{ width: `${((roundIndex + 1) / rounds.length) * 100}%` }} /></div>

      <article className="game-card">
        <div className="game-card-heading"><Gamepad2 aria-hidden="true" /><p>{round.direction === "kannada_to_english" ? language === "kn" ? "ಈ ಪದದ ಅರ್ಥ ಯಾವುದು?" : "What does this Kannada word mean?" : language === "kn" ? "ಈ ಅರ್ಥಕ್ಕೆ ಸರಿಯಾದ ಕನ್ನಡ ಪದ ಯಾವುದು?" : "Which Kannada word matches this meaning?"}</p></div>
        <h2 id="game-question" lang={round.direction === "kannada_to_english" ? "kn" : "en"}>{round.prompt}</h2>
        <div className="game-pronunciation"><span>{round.pronunciation}</span><PronounceButton text={round.word} /></div>
        <div className="game-options">
          {round.options.map((option) => {
            const optionIsAnswer = option === round.answer;
            const state = selected ? optionIsAnswer ? "correct" : option === selected ? "wrong" : "muted" : "idle";
            return <button key={option} type="button" className={`game-option game-option-${state}`} onClick={() => choose(option)} disabled={selected !== null}><span>{option}</span>{selected && optionIsAnswer && <CheckCircle2 aria-hidden="true" />}{selected === option && !optionIsAnswer && <XCircle aria-hidden="true" />}</button>;
          })}
        </div>
        {selected && <div className={`game-feedback ${isCorrect ? "game-feedback-correct" : "game-feedback-wrong"}`} role="status"><div><strong>{isCorrect ? language === "kn" ? "ಸರಿಯಾಗಿದೆ!" : "Correct!" : language === "kn" ? "ಒಳ್ಳೆಯ ಪ್ರಯತ್ನ" : "Good try"}</strong><p>{isCorrect ? language === "kn" ? "ಈ ಪದ ನೆನಪಿನಲ್ಲಿ ಉಳಿಯಲಿ." : "Let this word take root." : <>{language === "kn" ? "ಸರಿಯಾದ ಉತ್ತರ: " : "Correct answer: "}<b>{round.answer}</b></>}</p></div><button className="button button-primary" type="button" onClick={nextRound}>{roundIndex + 1 === rounds.length ? language === "kn" ? "ಫಲಿತಾಂಶ" : "Results" : language === "kn" ? "ಮುಂದಿನ ಪದ" : "Next word"}<ArrowRight size={17} /></button></div>}
      </article>
      <p className="source-label">{language === "kn" ? "ಆಟದ ಪದಗಳು: ಕನ್ನಡದ ಬೇರು ಆಯ್ದ Alar ಉಲ್ಲೇಖ ಪದಗಳು · ಸಾಧನದ ಧ್ವನಿ ಮಾನವ ಪ್ರಾದೇಶಿಕ ಧ್ವನಿಮುದ್ರಣವಲ್ಲ." : "Game words: Kannadada Beru's curated Alar reference set · Device speech is not a human regional recording."}</p>
    </section>
  );
}
