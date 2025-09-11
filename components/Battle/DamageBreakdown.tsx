import Colors from 'app/foundation/colors';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface DamageBreakdown {
  currentWord: string;
  damageBreakdownNums: { type: string; value: number }[];
}

const _DamageBreakdown: React.FC<DamageBreakdown> = ({
  currentWord,
  damageBreakdownNums
}) => {
  return (
    <>
      {currentWord.length > 3 && (
        <>
          <Text style={styles.damagePreviewWrapper}>
            {damageBreakdownNums.map((item, idx) => (
              <Text
                key={idx}
                style={
                  item.type === 'letter'
                    ? styles.letter
                    : item.type === 'length'
                      ? styles.lengthBonus
                      : styles.modifier
                }>
                {item.value}
                {idx < damageBreakdownNums.length - 1 ? ' + ' : ''}
              </Text>
            ))}
            {` = `}
            <Text style={styles.total}>
              {damageBreakdownNums.reduce((a, b) => a + b.value, 0)}
            </Text>
          </Text>
          <Text style={styles.damagePreviewLabel}>
            <Text style={styles.letter}>Letters</Text>

            {` + `}
            <Text style={styles.lengthBonus}>Length bonus</Text>

            {` + `}
            <Text style={styles.modifier}>Modifier</Text>
          </Text>
        </>
      )}
    </>
  );
};

const DamageBreakdown = React.memo(_DamageBreakdown);
export default DamageBreakdown;

const styles = StyleSheet.create({
  damagePreviewWrapper: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: Colors.blackBg50
  },
  damagePreviewLabel: {
    color: Colors.neutralLight,
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 24,
    backgroundColor: Colors.blackBg50
  },
  letter: {
    color: Colors.textWhite
  },
  lengthBonus: {
    color: Colors.borderBlue
  },
  modifier: {
    color: Colors.borderGold
  },
  total: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 13
  }
});
