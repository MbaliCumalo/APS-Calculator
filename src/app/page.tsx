// app/page.tsx
"use client";
import { useState } from 'react';

// Convert percentage to APS points
const convertToPoints = (score: number): number => {
  if (score >= 80) return 7;
  if (score >= 70) return 6;
  if (score >= 60) return 5;
  if (score >= 50) return 4;
  if (score >= 40) return 3;
  if (score >= 30) return 2;
  if (score >= 0) return 1;
  return 0; // For invalid inputs
};

// Determine the Achievement Description
const AchievementDescription = (score: number) => {
  if (score >= 80) return 'Outstanding';
  if (score >= 70) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 50) return 'Average';
  return 'Below Average';
};

const Home = () => {
  const [scores, setScores] = useState<number[]>(Array(7).fill(0));
  const [totalAPS, setTotalAPS] = useState<number>(0);

  const handleScoreChange = (index: number, value: number) => {
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);

    // Calculate the APS score
    const points = newScores.map(convertToPoints).sort((a, b) => b - a).slice(0, 7);
    setTotalAPS(points.reduce((acc, point) => acc + point, 0));
  };

  return (
    <div>
      <h1>APS Score Calculator</h1>
      <form>
        {scores.map((score, index) => (
          <div key={index}>
            <label>Subject {index + 1}:</label>
            <input
              type="number"
              min="0"
              max="100"
              value={score}
              onChange={(e) => handleScoreChange(index, parseInt(e.target.value, 10))}
              style={{ margin: '5px', width: '80px' }}
            />
            <span> {AchievementDescription(score)}</span>
          </div>
        ))}
      </form>
      <h2>Total APS: {totalAPS}</h2>
    </div>
  );
};

export default Home;
