// JourneyMapModal.tsx
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { INode } from '../types/INode';

export const JourneyMapModal = ({
  visible,
  onClose,
  journey
}: {
  visible: boolean;
  onClose: () => void;
  journey: INode[][]; // passed as prop
}) => {
  const updatedJourney: INode[][] = [
    [{ name: 'Start', chosen: true, type: 'other' as const }],
    ...journey,
    [{ name: '???', chosen: false, type: 'other' as const }]
  ].reverse();
  const renderNode = (node: INode) => {
    if (node.type === 'enemy') {
      return (
        <Text style={node.chosen ? styles.nodeSelected : styles.nodeUnchosen}>
          {node.name}
        </Text>
      );
    } else if (node.type === 'other') {
      return <Text style={styles.nodeOther}>{node.name}</Text>;
    } else if (node.type === 'booster') {
      return <Text style={styles.nodeBooster}>{node.name}</Text>;
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {updatedJourney.map((level, rowIndex) => {
              const showLine = rowIndex !== 0;
              const justifyContent =
                level.length > 1 ? 'space-between' : 'center';
              const flex = level.length > 1 ? 2 : 0;
              return (
                <View key={rowIndex} style={{ width: '100%' }}>
                  {showLine && (
                    <View
                      style={{
                        height: 20,
                        width: 2,
                        backgroundColor: 'white',
                        alignSelf: 'center'
                      }}
                    />
                  )}
                  <View style={[styles.row, { justifyContent }]}>
                    {level.map((node, colIndex) => {
                      return (
                        <View
                          key={colIndex}
                          style={[styles.nodeWrapper, { flex }]}
                        >
                          <View style={styles.node}>{renderNode(node)}</View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <Text onPress={onClose} style={styles.closeButton}>
            Close
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#1c1c1c',
    padding: 20,
    borderRadius: 12,
    maxHeight: '80%',
    width: '90%'
  },
  scrollContent: {
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    marginVertical: 8,
    position: 'relative',
    gap: 8
  },
  nodeWrapper: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    flex: 2
  },
  node: {
    minWidth: 80,
    alignItems: 'center'
  },
  nodeSelected: {
    color: '#00ffcc',
    fontWeight: 'bold',
    fontSize: 16
  },
  nodeUnchosen: {
    color: '#888',
    fontSize: 16
  },
  nodeOther: {
    color: '#00ffcc',
    fontSize: 16,
    fontStyle: 'italic',
    paddingHorizontal: 12
  },
  nodeBooster: {
    color: '#00ffcc',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
    paddingHorizontal: 12
  },
  verticalLine: {
    position: 'absolute',
    width: 2,
    height: 40,
    backgroundColor: '#00ffcc',
    zIndex: -1
  },
  closeButton: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20
  }
});
