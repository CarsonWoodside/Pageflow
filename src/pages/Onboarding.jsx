import { useState } from "react";
import styles from "./Onboarding.module.css";

const vibes = [
  "Cosy evenings",
  "Weekend marathons",
  "Slow and steady",
  "Book club energy",
];
const goals = [6, 12, 24, 36];

export default function Onboarding({ onComplete }) {
  const [name, setName] = useState("");
  const [readingGoal, setReadingGoal] = useState(12);
  const [customGoal, setCustomGoal] = useState("");
  const [vibe, setVibe] = useState(vibes[0]);

  const selectedGoal = customGoal
    ? Math.max(1, Number(customGoal) || 1)
    : readingGoal;

  return (
    <section className={styles.page}>
      <div className={styles.orb} />
      <div className={styles.card}>
        <p className={styles.eyebrow}>📚 Make it yours</p>
        <h1>Welcome to Bookshelf</h1>
        <p className={styles.copy}>
          A quick setup so the app feels a little more personal.
        </p>

        <label className={styles.label}>
          What should we call you?
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
          />
        </label>

        <div className={styles.group}>
          <span className={styles.labelText}>Reading goal this year</span>
          <div className={styles.chips}>
            {goals.map((option) => (
              <button
                key={option}
                className={
                  selectedGoal === option && !customGoal
                    ? styles.chipActive
                    : styles.chip
                }
                onClick={() => {
                  setReadingGoal(option);
                  setCustomGoal("");
                }}
              >
                ✦ {option}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <span className={styles.labelText}>Pick your reading mood</span>
          <div className={styles.chips}>
            {vibes.map((option) => (
              <button
                key={option}
                className={vibe === option ? styles.chipActive : styles.chip}
                onClick={() => setVibe(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          className={styles.primary}
          onClick={() =>
            onComplete({
              name: name.trim() || "Reader",
              readingGoal: selectedGoal,
              vibe,
              accent: "Forest green",
            })
          }
        >
          Start my shelf →
        </button>
      </div>
    </section>
  );
}
