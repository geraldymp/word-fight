import { supabase } from './supabase';

export async function isHighscoreFilled() {
  const { data, error } = await supabase
    .from('high_scores')
    .select('*')
    .order('score', { ascending: false })
    .limit(20);
  if (error) {
    console.error('Failed to get Highscore Data', error);
    return false;
  } else if (data.length < 20) {
    return false;
  } else {
    return true;
  }
}

export async function getLowestHighscore() {
  const { data, error } = await supabase
    .from('high_scores')
    .select('*')
    .order('score', { ascending: true })
    .limit(1);
  if (error) {
    console.error('Failed to get Highscore Limit', error);
    return null;
  } else {
    return data[0].score;
  }
}

export async function submitHighscore(word: string, score: number) {
  const { error } = await supabase
    .from('high_scores')
    .insert([{ word, score }]);

  if (error) {
    console.error('Failed to insert new score:', error);
  } else {
    console.log('New high score submitted!');
  }
}

export async function getHighscore() {
  const { data, error } = await supabase
    .from('high_scores')
    .select('*')
    .order('score', { ascending: false })
    .limit(20);
  if (error) {
    console.error('Failed to get Highscore data', error);
    return [];
  } else {
    return data;
  }
}
