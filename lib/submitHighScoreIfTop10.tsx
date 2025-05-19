import { supabase } from './supabase';

export const submitHighScoreIfTop10 = async (word: string, score: number) => {
  // Fetch current top 10
  const { data: topScores, error: fetchError } = await supabase
    .from('high_scores')
    .select('*')
    .order('score', { ascending: false })
    .limit(10);

  if (fetchError) {
    console.error('Failed to fetch top scores:', fetchError);
    return;
  }

  // Check if we qualify
  if (topScores.length < 10 || score > topScores[topScores.length - 1].score) {
    // If we have 10 entries, remove the lowest one
    if (topScores.length === 10) {
      const lowest = topScores[topScores.length - 1];
      const { error: deleteError } = await supabase
        .from('high_scores')
        .delete()
        .eq('id', lowest.id);

      if (deleteError) {
        console.error('Failed to delete lowest score:', deleteError);
        return;
      }
    }

    // Insert new score
    const { error: insertError } = await supabase
      .from('high_scores')
      .insert([{ word, score }]);

    if (insertError) {
      console.error('Failed to insert new score:', insertError);
    } else {
      console.log('✅ New high score submitted!');
    }
  } else {
    console.log('ℹ️ Score is not high enough for top 10.');
  }
};
