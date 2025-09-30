'use client';

import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import { useState } from 'react';
import styles from './styles.module.scss';
import type { EmailStandaloneInputStoryblok } from '@/src/generated/sb';

export default function EmailStandaloneInput({ blok }: { blok: EmailStandaloneInputStoryblok }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <div {...storyblokEditable(blok)} className={styles.emailInput}>
      {blok.title && <h4 className={styles.title}>{blok.title}</h4>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={blok.placeholder || 'Enter your email'}
          className={styles.input}
          name="email"
          required
        />
        <button type="submit" className={styles.submitButton}>
          {blok.submitButtonText || 'Submit'}
        </button>
      </form>

      {blok.inputDescription?.[0] && (
        <div className={styles.description}>
          <StoryblokComponent blok={blok.inputDescription[0]} />
        </div>
      )}
    </div>
  );
}
