import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';

const Home = () => {
  const [color, setColor] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const randomColor = getRandomColor();
      setColor(randomColor);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className={styles.Container}>
      <h1 style={{ color: color }}>Phonebook</h1>
    </div>
  );
};

export default Home;
