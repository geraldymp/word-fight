import { getUsername } from 'app/utils/usernameManager';
import { supabase } from './supabase';

export async function getLowestHighscore(): Promise<number> {
  const { data, error } = await supabase
    .from('high_scores')
    .select('*')
    .order('score', { ascending: false })
    .order('created_at', { ascending: false })
    .range(19, 19);
  if (error) {
    console.error('Failed to get Highscore Limit', error);
    return 0;
  } else {
    return data[0].score;
  }
}

export async function getLowestMonthlyHighscore(): Promise<number> {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const startOfNextMonth = new Date(startOfMonth);
  startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);
  const { data, error } = await supabase
    .from('high_scores')
    .select('*')
    .gte('created_at', startOfMonth.toISOString())
    .lt('created_at', startOfNextMonth.toISOString())
    .order('score', { ascending: false })
    .order('created_at', { ascending: false })
    .range(19, 19);
  if (error) {
    console.error('Failed to get Monthly Highscore Limit', error);
    return 0;
  } else {
    if (data.length === 0) {
      return 0;
    } else {
      return data[0].score;
    }
  }
}

export async function submitHighscore(
  word: string,
  score: number,
  scope: 'all time' | 'monthly'
) {
  const username = await getUsername();
  const { error } = await supabase
    .from('high_scores')
    .insert([{ word, score, submitted_by: username }]);

  if (error) {
    console.error('Failed to insert new score:', error);
  } else {
    console.log(`New ${scope} high score submitted!`, score);
  }
}

export async function getHighscore() {
  const { data, error } = await supabase
    .from('high_scores')
    .select('*')
    .order('score', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) {
    console.error('Failed to get Highscore data', error);
    return [];
  } else {
    return data;
  }
}

export async function getMonthlyHighscore() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const startOfNextMonth = new Date(startOfMonth);
  startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);
  const { data, error } = await supabase
    .from('high_scores')
    .select('*')
    .gte('created_at', startOfMonth.toISOString())
    .lt('created_at', startOfNextMonth.toISOString())
    .order('score', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) {
    console.error('Failed to get Highscore data', error);
    return [];
  } else {
    return data;
  }
}
